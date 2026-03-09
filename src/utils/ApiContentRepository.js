import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import {cachedContentfulApiClient} from "./CachedContentfulApiClient.js";
import {assetCache} from "./AssetCache.js";

class ApiContentRepository {

    constructor(contentfulApiClient, assetCache) {
        this.contentfulApiClient = contentfulApiClient;
        this.assetCache = assetCache;
    }


    async getPageData() {
        const [albums, config, translations, languages] = await Promise.all([
            this.getAlbums(),
            this.getConfig(),
            this.getTranslations(),
            this.getLanguages()
        ])

        return {
            albums,
            config,
            translations,
            languages
        }
    }

    async getAlbums() {
        const response = await this.contentfulApiClient.getSpaceEntriesByType('album');

        const items = response.items;

        const assetToUrlMap = this.buildAssetIdToUrlMapFromIncludes(response.includes.Asset);

        for (const assetUrl of assetToUrlMap.values()) {
            await this.assetCache.fetchAndStore(assetUrl);
        }

        const albums = [];
        for (const item of items) {
            albums.push(await this.createAlbumFromItem(item, assetToUrlMap));
        }

        return albums;
    }

    async getConfig() {
        const response = await this.contentfulApiClient.getSpaceEntriesByType('pageConfig');

        const firstItem = response.items[0];

        const assetToUrlMap = this.buildAssetIdToUrlMapFromIncludes(response.includes.Asset);

        const logoUrl = assetToUrlMap.get(firstItem.fields.logo.en.sys.id);

        await this.assetCache.fetchAndStore(logoUrl);

        const logoSrc = await this.assetCache.retrieveBase64Src(logoUrl);

        return {
            purchaseFormUrl: firstItem.fields.purchaseFormUrl.en,
            logoSrc: logoSrc
        };
    }

    async getTranslations() {
        const response = await this.contentfulApiClient.getSpaceEntriesByType('pageTranslations');

        const firstItem = response.items[0];

        return {
            tracks: this.mapLanguageEntry(firstItem.fields.tracks, (languageIso, value) => value),
            backButton: this.mapLanguageEntry(firstItem.fields.back, (languageIso, value) => value),
            orderButton: this.mapLanguageEntry(firstItem.fields.orderButton, (languageIso, value) => value),
        }
    }

    async getLanguages() {
        const response = await this.contentfulApiClient.getSpace();

        const locales = response.locales;

        return locales.map(locale => ({
            iso: locale.code,
            name: locale.name,
            default: locale.default
        }))
    }

    async createAlbumFromItem(item, assetToUrlMap) {

        const coverUrl = assetToUrlMap.get(item.fields.cover.en.sys.id);

        const coverSrc = await assetCache.retrieveBase64Src(coverUrl)

        return {
            id: item.fields.id.en,
            title: item.fields.title.en,
            description: this.mapLanguageEntry(item.fields.description, (languageIso, value) => documentToHtmlString(value)),
            coverSrc: coverSrc,
            isAvailableForPurchase: item.fields.isAvailableForOrder.en,
            tracks: item.fields.tracks.en.map(name => ({
                name
            }))
        };
    }

    mapLanguageEntry(languageEntry, callable) {
        return Object.fromEntries(
            Object.entries(languageEntry).map(([languageIso, value]) => [languageIso, callable(languageIso, value)])
        );
    }

    buildAssetIdToUrlMapFromIncludes(assets) {
        const result = new Map();

        for (const asset of assets) {
            result.set(
                asset.sys.id,
                asset.fields.file.en.url
            )
        }

        return result;

    }
}

export const contentRepository = new ApiContentRepository(
    cachedContentfulApiClient,
    assetCache
);