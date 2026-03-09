import {localStorageClient} from "./LocalStorageClient.js";
import {contentfulApiClient} from "./ContentfulApiClient.js";

class CachedContentfulApiClient {
    constructor(baseApiClient) {
        this.baseApiClient = baseApiClient;
    }

    async getSpaceEntriesByType(contentType) {
        const cacheKey = `cachedContentfulApiClient-getSpaceEntriesByType-${contentType}`;

        const cachedResult = localStorageClient.get(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

        const result = await this.baseApiClient.getSpaceEntriesByType(contentType);

        localStorageClient.persist(cacheKey, result, 3600);

        return result;
    }

    async getSpace() {
        const cacheKey = `cachedContentfulApiClient-getSpace`;

        const cachedResult = localStorageClient.get(cacheKey);

        if (cachedResult) {
            return cachedResult;
        }

        const result = await this.baseApiClient.getSpace();

        localStorageClient.persist(cacheKey, result, 3600);

        return result;
    }
}

export const cachedContentfulApiClient = new CachedContentfulApiClient(
    contentfulApiClient
)