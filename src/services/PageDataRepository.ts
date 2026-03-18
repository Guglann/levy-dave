import {ContentfulClient, PageData} from "../types";
import {cachedContentfulClient} from "./CachedContentfulClient";

export class PageDataRepository {

    constructor(
        private readonly client: ContentfulClient
    ) {
    }

    async getPageData(): Promise<PageData> {
        const albums = await this.client.getAlbums();
        const pageConfig = await this.client.getPageConfig();
        const pageTranslations = await this.client.getPageTranslations();
        const locales = await this.client.getLocales();

        const defaultLocale = locales.items.find(locale => locale.default);

        return {
            albums,
            pageConfig,
            pageTranslations,
            locales,
            defaultLocale: defaultLocale
        }
    }
}

export const pageDataRepository = new PageDataRepository(cachedContentfulClient);