// @ts-nocheck
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Album, Config, Language, PageData, Translations } from "../types";
import { type AssetCache, assetCache } from "./AssetCache.js";
import {
	type CachedContentfulApiClient,
	cachedContentfulApiClient,
} from "./CachedContentfulApiClient.js";

type AssetData = {
	contentType: string;
	base64: string;
};

class ApiContentRepository {
	constructor(
		private readonly contentfulApiClient: CachedContentfulApiClient,
		private readonly assetCache: AssetCache,
	) {}

	async getPageData(): Promise<PageData> {
		const [config, translations, languages] = await Promise.all([
			this.getConfig(),
			this.getTranslations(),
			this.getLanguages(),
		]);

		return {
			config,
			translations,
			languages,
		};
	}

	private async getConfig(): Promise<Config> {
		const response =
			await this.contentfulApiClient.getSpaceEntriesByType("pageConfig");

		const firstItem = response.items[0];

		const assetToUrlMap = this.buildAssetIdToUrlMap(response.includes.Asset);

		await this.cacheAllAssets(assetToUrlMap);

		const entryIdToEntryMap = this.buildEntryIdToEntryMap(
			response.includes.Entry,
		);

		const albums: Album[] = [];
		for (const link of firstItem.fields.albums.en) {
			const linkId = link.sys.id;

			const albumItem = entryIdToEntryMap.get(linkId);

			if (!albumItem) {
				throw new Error("Album item not found");
			}

			albums.push(await this.createAlbumFromItem(albumItem, assetToUrlMap));
		}

		const logoUrl = assetToUrlMap.get(firstItem.fields.logo.en.sys.id);

		if (!logoUrl) {
			throw new Error("Logo URL not found");
		}

		const logoSource = await this.assetCache.retrieve(logoUrl);

		if (!logoSource) {
			throw new Error("Logo source not found");
		}

		return {
			purchaseFormUrl: firstItem.fields.purchaseFormUrl.en,
			logoSource: logoSource,
			albums,
		};
	}

	private async getTranslations(): Promise<Translations> {
		const response =
			await this.contentfulApiClient.getSpaceEntriesByType("pageTranslations");

		const firstItem = response.items[0];

		const result = {};
		for (const [name, field] of Object.entries(firstItem.fields)) {
			result[name] = this.mapLanguageEntry(field, ({ value }) => value);
		}

		return result;
	}

	async getLanguages(): Promise<Language[]> {
		const response = await this.contentfulApiClient.getSpace();

		const locales = response.locales as Record<string, string>[];

		return locales.map((locale) => ({
			iso: locale.code,
			name: locale.name,
		}));
	}

	async createAlbumFromItem(
		item: object,
		assetToUrlMap: Map<string, string>,
	): Promise<Album> {
		const coverUrl = assetToUrlMap.get(item.fields.cover.en.sys.id);

		if (!coverUrl) {
			throw new Error("Could not find cover entry");
		}

		const coverSource = await assetCache.retrieve(coverUrl);

		if (!coverSource) {
			throw new Error("Cover source not found");
		}

		return {
			id: item.fields.id.en,
			title: item.fields.title.en,
			description: this.mapLanguageEntry(item.fields.description, ({ value }) =>
				documentToHtmlString(value),
			),
			coverSource: coverSource,
			isAvailableForPurchase: item.fields.isAvailableForOrder.en,
			tracks: item.fields.tracks.en.map((name: string) => ({
				name,
			})),
		};
	}

	mapLanguageEntry(
		languageEntry: Record<string, unknown>,
		callable: (data: { languageIso: string; value: unknown }) => unknown,
	) {
		return Object.fromEntries(
			Object.entries(languageEntry).map(([languageIso, value]) => [
				languageIso,
				callable({ languageIso, value }),
			]),
		);
	}

	buildAssetIdToUrlMap(assets: object[]) {
		const result = new Map<string, object>();

		for (const asset of assets) {
			result.set(asset.sys.id, asset.fields.file.en.url);
		}

		return result;
	}

	buildEntryIdToEntryMap(entries: object[]) {
		const result = new Map<string, object>();

		for (const entry of entries) {
			result.set(entry.sys.id, entry);
		}

		return result;
	}

	private async fetchAsset(url: string): Promise<AssetData> {
		const response = await fetch(url);
		const buffer = await response.arrayBuffer();

		const contentType = response.headers.get("content-type");

		if (!contentType) {
			throw new Error("Could not find content-type");
		}

		const base64 = btoa(
			new Uint8Array(buffer).reduce(
				(data, byte) => data + String.fromCharCode(byte),
				"",
			),
		);

		return {
			contentType,
			base64,
		};
	}

	private buildBase64Source(assetData: AssetData): string {
		return `data:${assetData.contentType};base64,${assetData.base64}`;
	}

	private async cacheAllAssets(assetIdToUrlMap: Map<string, string>) {
		for (const assetUrl of assetIdToUrlMap.values()) {
			const existingStoredAsset = await this.assetCache.retrieve(assetUrl);

			if (existingStoredAsset) {
				continue;
			}

			const assetData = await this.fetchAsset(assetUrl);

			const assetSource = this.buildBase64Source(assetData);

			await this.assetCache.store(assetUrl, assetSource);
		}
	}
}

export const contentRepository = new ApiContentRepository(
	cachedContentfulApiClient,
	assetCache,
);
