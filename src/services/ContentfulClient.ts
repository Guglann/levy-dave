import {ContentfulClientApi, createClient, Entry, EntryCollection, LocaleCollection} from 'contentful';
import {AlbumSkeleton, PageConfigSkeleton, PageTranslationsSkeleton} from "../types";

export class ContentfulClient implements ContentfulClient {

    private client: ContentfulClientApi<'WITH_ALL_LOCALES'>;

    constructor(
        private readonly spaceId: string,
        private readonly token: string
    ) {
        const baseClient = createClient({
            space: this.spaceId,
            accessToken: this.token,
        })

        this.client = baseClient.withAllLocales;
    }

    async getAlbums(): Promise<EntryCollection<AlbumSkeleton, 'WITH_ALL_LOCALES'>> {
        return await this.client.getEntries<AlbumSkeleton>({
            content_type: 'album',
            include: 2
        })
    }

    async getPageConfig(): Promise<Entry<PageConfigSkeleton, 'WITH_ALL_LOCALES'>> {
        const response = await this.client.getEntries<PageConfigSkeleton>({
            content_type: 'pageConfig',
            limit: 1,
            include: 2
        })

        return response.items[0];
    }

    async getPageTranslations(): Promise<Entry<PageTranslationsSkeleton, 'WITH_ALL_LOCALES'>> {
        const response = await this.client.getEntries<PageTranslationsSkeleton>({
            content_type: 'pageTranslations',
            limit: 1,
            include: 2
        })

        return response.items[0];
    }

    async getLocales(): Promise<LocaleCollection> {
        return await this.client.getLocales();
    }
}

export const contentfulClient2 = new ContentfulClient(
    "s0gx44xxmrcg",
    "KWUJeOVdnN909Pxn0O-5R47BKIZs6HRLAytOMvXJiQ0",
);