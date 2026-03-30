import type {
	Entry,
	EntryCollection,
	EntryFieldTypes,
	Locale,
	LocaleCollection,
} from "contentful";

export type RouteParams = {
	languageIso: string;
	id: string;
};

export interface AlbumSkeleton {
	contentTypeId: "album";
	fields: {
		id: EntryFieldTypes.Text;
		title: EntryFieldTypes.Text;
		pagelink: EntryFieldTypes.Text;
		artistname: EntryFieldTypes.Text;
		description: EntryFieldTypes.RichText;
		tracks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
		cover: EntryFieldTypes.AssetLink;
		isAvailableForOrder: EntryFieldTypes.Boolean;
		images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
	};
}

export interface PageConfigSkeleton {
	contentTypeId: "pageConfig";
	fields: {
		purchaseFormUrl: EntryFieldTypes.Text;
		logo: EntryFieldTypes.AssetLink;
		albums: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<AlbumSkeleton>>;
	};
}

export interface PageTranslationsSkeleton {
	contentTypeId: "pageTranslations";
	fields: {
		tracks: EntryFieldTypes.Text;
		back: EntryFieldTypes.Text;
		orderButton: EntryFieldTypes.Text;
		seeAlbum: EntryFieldTypes.Text;
		aboutLabel: EntryFieldTypes.Text;
		shop: EntryFieldTypes.Text;
		oWydawnictwie: EntryFieldTypes.RichText;
		kontakt: EntryFieldTypes.RichText;
		pagelink: EntryFieldTypes.Text;
		kontaktLabel: EntryFieldTypes.Text;
	};
}

export type LocalizedAlbums = EntryCollection<
	AlbumSkeleton,
	"WITH_ALL_LOCALES"
>;

export type LocalizedAlbum = LocalizedAlbums["items"][number];

export type LocalizedPageConfig = Entry<PageConfigSkeleton, "WITH_ALL_LOCALES">;

export type LocalizedPageTranslations = Entry<
	PageTranslationsSkeleton,
	"WITH_ALL_LOCALES"
>;

export interface ContentfulClient {
	getAlbums(): Promise<LocalizedAlbums>;

	getPageConfig(): Promise<LocalizedPageConfig>;

	getPageTranslations(): Promise<LocalizedPageTranslations>;

	getLocales(): Promise<LocaleCollection>;
}

export type PageData = {
	albums: LocalizedAlbums;
	pageConfig: LocalizedPageConfig;
	pageTranslations: LocalizedPageTranslations;
	locales: LocaleCollection;
	defaultLocale: Locale;
};
