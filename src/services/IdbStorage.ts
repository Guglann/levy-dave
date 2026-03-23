import { del, get, set } from "idb-keyval";

type StoredBytes = {
	mime: string;
	data: ArrayBuffer;
	expiresAt: Date | null;
};

type StoredEnvelope<T = unknown> = {
	content: T;
	expiresAt: Date | null;
};

export class IdbStorage {
	constructor(private readonly space: string) {}

	private isNotExpired(expiresAt: Date | null): boolean {
		if (!expiresAt) {
			return true;
		}
		return new Date() <= expiresAt;
	}

	/** Structured-clone into IndexedDB (no JSON) — reliable for large binary payloads. */
	async storeBytes(
		key: string,
		mime: string,
		data: ArrayBuffer,
		ttlSeconds?: number,
	) {
		const spaceKey = this.createSpaceKey(key);

		const expiresAt = ttlSeconds
			? new Date(Date.now() + ttlSeconds * 1000)
			: null;

		const record: StoredBytes = { mime, data, expiresAt };
		await set(spaceKey, record);
	}

	async retrieveBytes(
		key: string,
	): Promise<{ mime: string; data: ArrayBuffer } | null> {
		const spaceKey = this.createSpaceKey(key);

		const raw = await get<StoredBytes | string>(spaceKey);

		if (!raw) {
			return null;
		}

		if (typeof raw === "string") {
			return null;
		}

		if (!this.isNotExpired(raw.expiresAt)) {
			await del(spaceKey);
			return null;
		}

		return { mime: raw.mime, data: raw.data };
	}

	/** Structured-clone value into IndexedDB (no JSON envelope). */
	async store<T>(key: string, data: T, ttlSeconds?: number) {
		const spaceKey = this.createSpaceKey(key);

		const expiresAt = ttlSeconds
			? new Date(Date.now() + ttlSeconds * 1000)
			: null;

		const record: StoredEnvelope<T> = { content: data, expiresAt };
		await set(spaceKey, record);
	}

	/**
	 * Returns stored `content`. Supports legacy rows where the whole value was a JSON string
	 * of `{ content: string, expiresAt }` (previous `JSON.stringify` implementation).
	 */
	async retrieve<T = unknown>(key: string): Promise<T | null> {
		const spaceKey = this.createSpaceKey(key);

		const raw = await get<string | StoredEnvelope<T>>(spaceKey);

		if (raw == null) {
			return null;
		}

		if (typeof raw === "string") {
			return this.retrieveLegacyJsonEnvelope<T>(spaceKey, raw);
		}

		if (
			typeof raw !== "object" ||
			raw === null ||
			!("content" in raw) ||
			!("expiresAt" in raw)
		) {
			return null;
		}

		const envelope = raw as StoredEnvelope<T>;
		if (!this.isNotExpired(envelope.expiresAt)) {
			await del(spaceKey);
			return null;
		}

		return envelope.content;
	}

	private async retrieveLegacyJsonEnvelope<T>(
		spaceKey: string,
		json: string,
	): Promise<T | null> {
		try {
			const parsed = JSON.parse(json) as {
				content: unknown;
				expiresAt: string | null;
			};

			const expiresAt = parsed.expiresAt ? new Date(parsed.expiresAt) : null;

			if (!this.isNotExpired(expiresAt)) {
				await del(spaceKey);
				return null;
			}

			const c = parsed.content;
			if (typeof c === "string") {
				return JSON.parse(c) as T;
			}
			return c as T;
		} catch {
			return null;
		}
	}

	async remove(key: string) {
		const spaceKey = this.createSpaceKey(key);

		await del(spaceKey);
	}

	private createSpaceKey(key: string): string {
		return `${this.space}.${key}`;
	}
}
