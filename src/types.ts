import type {
	Entry,
	EntryCollection,
	EntryFieldTypes,
	Locale,
	LocaleCollection,
} from "contentful";
import type { Product } from "./models/Product";

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
		seeProduct: EntryFieldTypes.Text;
	};
}

export interface AlbumProductData {
	contentTypeId: "albumProductSubtype";
	fields: {
		tracks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
	};
}

export type AlbumProductSubtypes = EntryCollection<
	AlbumProductData,
	"WITH_ALL_LOCALES"
>;

export type AlbumProductSubtype = AlbumProductSubtypes["items"][number];

export interface ProductSkeleton {
	contentTypeId: "product";
	fields: {
		id: EntryFieldTypes.Text;
		name: EntryFieldTypes.Text;
		shortDescription: EntryFieldTypes.Text;
		stockQuantity: EntryFieldTypes.Number;
		subtype: EntryFieldTypes.EntryLink<AlbumProductData>;
	};
}

export type ApiProducts = EntryCollection<ProductSkeleton, "WITH_ALL_LOCALES">;

export type ApiProduct = ApiProducts["items"][number];

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

	getProducts(): Promise<EntryCollection<ProductSkeleton, "WITH_ALL_LOCALES">>;
}

export type PageData = {
	albums: LocalizedAlbums;
	pageConfig: LocalizedPageConfig;
	pageTranslations: LocalizedPageTranslations;
	locales: LocaleCollection;
	defaultLocale: Locale;
	products: Product[];
};
