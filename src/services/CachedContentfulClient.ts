import type { EntryCollection, LocaleCollection } from "contentful";
import type {
	ContentfulClient,
	LocalizedAlbums,
	LocalizedPageConfig,
	LocalizedPageTranslations,
	ProductSkeleton,
} from "../types";
import { contentfulClient2 } from "./ContentfulClient";
import { IdbStorage } from "./IdbStorage";

export class CachedContentfulClient implements ContentfulClient {
	private readonly storage: IdbStorage;

	constructor(private readonly baseClient: ContentfulClient) {
		this.storage = new IdbStorage("contentful-client2");
	}

	async getAlbums() {
		const cacheKey = `getAlbums`;

		const cachedResult = await this.storage.retrieve<LocalizedAlbums>(cacheKey);

		if (cachedResult) {
			return cachedResult;
		}

		const result = await this.baseClient.getAlbums();

		await this.storage.store(cacheKey, result, 3600);

		return result;
	}

	async getProducts() {
		const cacheKey = `getProducts`;

		const cachedResult =
			await this.storage.retrieve<
				EntryCollection<ProductSkeleton, "WITH_ALL_LOCALES">
			>(cacheKey);

		if (cachedResult) {
			return cachedResult;
		}

		const result = await this.baseClient.getProducts();

		await this.storage.store(cacheKey, result, 3600);

		return result;
	}

	async getPageConfig() {
		const cacheKey = `getPageConfig`;

		const cachedResult =
			await this.storage.retrieve<LocalizedPageConfig>(cacheKey);

		if (cachedResult) {
			return cachedResult;
		}

		const result = await this.baseClient.getPageConfig();

		await this.storage.store(cacheKey, result, 3600);

		return result;
	}

	async getPageTranslations() {
		const cacheKey = `getPageTranslations`;

		const cachedResult =
			await this.storage.retrieve<LocalizedPageTranslations>(cacheKey);

		if (cachedResult) {
			return cachedResult;
		}

		const result = await this.baseClient.getPageTranslations();

		await this.storage.store(cacheKey, result, 3600);

		return result;
	}

	async getLocales(): Promise<LocaleCollection> {
		const cacheKey = `getLocales`;

		const cachedResult =
			await this.storage.retrieve<LocaleCollection>(cacheKey);

		if (cachedResult) {
			return cachedResult;
		}

		const result = await this.baseClient.getLocales();

		await this.storage.store(cacheKey, result, 3600);

		return result;
	}
}

export const cachedContentfulClient = new CachedContentfulClient(
	contentfulClient2,
);
