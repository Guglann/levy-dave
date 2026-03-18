import {contentfulClient2} from "./ContentfulClient";
import {IdbStorage} from "./IdbStorage";
import {ContentfulClient} from "../types";
import {LocaleCollection} from "contentful";

export class CachedContentfulClient implements ContentfulClient {

    private readonly storage: IdbStorage;

    constructor(
        private readonly baseClient: ContentfulClient
    ) {
        this.storage = new IdbStorage('contentful-client2');
    }

    async getAlbums() {
        const cacheKey = `getAlbums`;

        const cachedResult = await this.storage.retrieve(cacheKey);

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const result = await this.baseClient.getAlbums();

        await this.storage.store(cacheKey, JSON.stringify(result), 3600);

        return result;
    }

    async getPageConfig() {
        const cacheKey = `getPageConfig`;

        const cachedResult = await this.storage.retrieve(cacheKey);

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const result = await this.baseClient.getPageConfig();

        await this.storage.store(cacheKey, JSON.stringify(result), 3600);

        return result;
    }

    async getPageTranslations() {
        const cacheKey = `getPageTranslations`;

        const cachedResult = await this.storage.retrieve(cacheKey);

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const result = await this.baseClient.getPageTranslations();

        await this.storage.store(cacheKey, JSON.stringify(result), 3600);

        return result;
    }

    async getLocales(): Promise<LocaleCollection> {

        const cacheKey = `getLocales`;

        const cachedResult = await this.storage.retrieve(cacheKey);

        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const result = await this.baseClient.getLocales();

        await this.storage.store(cacheKey, JSON.stringify(result), 3600);

        return result;
    }
}


export const cachedContentfulClient = new CachedContentfulClient(contentfulClient2);