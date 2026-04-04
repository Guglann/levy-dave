import { AlbumProductData } from "../models/AlbumProductData";
import { Product } from "../models/Product";
import type {
	ApiProduct,
	ApiProducts,
	ContentfulClient,
	PageData,
} from "../types";
import { cachedContentfulClient } from "./CachedContentfulClient";

export class PageDataRepository {
	constructor(private readonly client: ContentfulClient) {}

	async getPageData(): Promise<PageData> {
		const [albums, pageConfig, pageTranslations, locales, apiProducts] =
			await Promise.all([
				await this.client.getAlbums(),
				await this.client.getPageConfig(),
				await this.client.getPageTranslations(),
				await this.client.getLocales(),
				await this.client.getProducts(),
			]);

		const defaultLocale = locales.items.find((locale) => locale.default);

		if (!defaultLocale) {
			throw new Error("No default locale found.");
		}

		return {
			albums,
			pageConfig,
			pageTranslations,
			locales,
			products: this.createProducts(apiProducts),
			defaultLocale: defaultLocale,
		};
	}

	private createProducts(data: ApiProducts): Product[] {
		const result: Product[] = [];

		for (const item of data.items) {
			const subtype = this.createProductSubtype(item);

			result.push(new Product(item, subtype));
		}

		return result;
	}

	private createProductSubtype(data: ApiProduct) {
		const subtype = data.fields.subtype?.pl;

		if (!subtype || !("metadata" in subtype)) {
			return null;
		}

		const contentType =
			"contentType" in subtype.sys ? subtype?.sys.contentType : null;

		if (!contentType) {
			return null;
		}

		if (contentType.sys.id === "albumProductSubtype") {
			return new AlbumProductData(subtype);
		}

		return null;
	}
}

export const pageDataRepository = new PageDataRepository(
	cachedContentfulClient,
);
