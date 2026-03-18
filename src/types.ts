import {Entry, EntryCollection, EntryFieldTypes, Locale, LocaleCollection} from "contentful";

export type RouteParams = {
	languageIso: string;
	id: string;
};

export interface AlbumSkeleton {
	contentTypeId: 'album';
	fields: {
		id: EntryFieldTypes.Text,
		title: EntryFieldTypes.Text,
		description: EntryFieldTypes.RichText,
		tracks: EntryFieldTypes.Text,
		cover: EntryFieldTypes.AssetLink,
		isAvailableForOrder: EntryFieldTypes.Boolean
	}
}

export interface PageConfigSkeleton {
	contentTypeId: 'pageConfig';
	fields: {
		purchaseFormUrl: EntryFieldTypes.Text,
		logo: EntryFieldTypes.AssetLink,
		albums: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AlbumSkeleton>>
	}
}

export interface PageTranslationsSkeleton {
	contentTypeId: 'pageTranslations';
	fields: {
		tracks: EntryFieldTypes.Text,
		back: EntryFieldTypes.Text,
		orderButton: EntryFieldTypes.Text,
		seeAlbum: EntryFieldTypes.Text,
		aboutLabel: EntryFieldTypes.Text,
		shop: EntryFieldTypes.Text,
		oWydawnictwie: EntryFieldTypes.RichText,
	}
}

export interface ContentfulClient {
	getAlbums(): Promise<EntryCollection<AlbumSkeleton, 'WITH_ALL_LOCALES'>>;
	getPageConfig(): Promise<Entry<PageConfigSkeleton, 'WITH_ALL_LOCALES'>>;
	getPageTranslations(): Promise<Entry<PageTranslationsSkeleton, 'WITH_ALL_LOCALES'>>;
	getLocales(): Promise<LocaleCollection>;
}

export type PageData = {
	albums: EntryCollection<AlbumSkeleton, 'WITH_ALL_LOCALES'>,
	pageConfig: Entry<PageConfigSkeleton, 'WITH_ALL_LOCALES'>,
	pageTranslations: Entry<PageTranslationsSkeleton, 'WITH_ALL_LOCALES'>
	locales: LocaleCollection
	defaultLocale: Locale
}