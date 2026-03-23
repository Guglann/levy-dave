import { fileTypeFromBuffer } from "file-type";
import { IdbStorage } from "./IdbStorage";

/** MIME type/subtype only — used when magic-byte detection has no match (e.g. CSS, JSON). */
function essenceMimeType(contentTypeHeader: string | null): string | null {
	if (!contentTypeHeader) {
		return null;
	}
	const essence = contentTypeHeader.split(";")[0]?.trim().toLowerCase();
	if (!essence) {
		return null;
	}
	if (essence === "image/jpg" || essence === "image/pjpeg") {
		return "image/jpeg";
	}
	return essence;
}

export class AssetCache {
	private readonly storage: IdbStorage;
	private readonly objectUrlByAssetUrl = new Map<string, string>();
	private readonly inFlight = new Map<string, Promise<string>>();

	constructor() {
		this.storage = new IdbStorage("asset-v4");
	}

	private revokeIfPresent(url: string) {
		const prev = this.objectUrlByAssetUrl.get(url);
		if (prev) {
			URL.revokeObjectURL(prev);
			this.objectUrlByAssetUrl.delete(url);
		}
	}

	private objectUrlForBytes(assetUrl: string, mime: string, data: ArrayBuffer) {
		this.revokeIfPresent(assetUrl);
		const objectUrl = URL.createObjectURL(new Blob([data], { type: mime }));
		this.objectUrlByAssetUrl.set(assetUrl, objectUrl);
		return objectUrl;
	}

	/**
	 * Prefer magic-byte detection (many binary formats), then `Content-Type`, then a previously
	 * stored MIME (IDB hit with no header), then octet-stream for opaque bytes.
	 */
	private async resolveMime(
		buffer: ArrayBuffer,
		contentTypeHeader: string | null,
		storedMime: string | null,
	): Promise<string> {
		const detected = await fileTypeFromBuffer(buffer);
		if (detected) {
			return detected.mime;
		}
		const fromHeader = essenceMimeType(contentTypeHeader);
		if (fromHeader) {
			return fromHeader;
		}
		if (storedMime) {
			return storedMime;
		}
		return "application/octet-stream";
	}

	async getAssetSource(url: string): Promise<string> {
		const memo = this.objectUrlByAssetUrl.get(url);
		if (memo) {
			return memo;
		}

		const pending = this.inFlight.get(url);
		if (pending) {
			return pending;
		}

		const load = this.resolveAssetSource(url);
		this.inFlight.set(url, load);
		try {
			return await load;
		} finally {
			this.inFlight.delete(url);
		}
	}

	private async resolveAssetSource(url: string): Promise<string> {
		const cached = await this.storage.retrieveBytes(url);
		if (cached) {
			const mime = await this.resolveMime(cached.data, null, cached.mime);
			if (mime !== cached.mime) {
				await this.storage.storeBytes(url, mime, cached.data, 3600);
			}
			return this.objectUrlForBytes(url, mime, cached.data);
		}

		this.revokeIfPresent(url);

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch asset: ${response.status}`);
		}

		const buffer = await response.arrayBuffer();

		const mime = await this.resolveMime(
			buffer,
			response.headers.get("content-type"),
			null,
		);

		await this.storage.storeBytes(url, mime, buffer, 3600);

		return this.objectUrlForBytes(url, mime, buffer);
	}
}

export const assetCache = new AssetCache();
