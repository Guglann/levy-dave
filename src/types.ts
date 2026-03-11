export type Album = {
	id: string;
	title: string;
	description: Record<string, string>;
	coverSource: string;
	isAvailableForPurchase: boolean;
	tracks: {
		name: string;
	}[];
};

export type Config = {
	purchaseFormUrl: string;
	logoSource: string;
	albums: Album[];
};

export type Translations = Record<string, Record<string, string>>;

export type Language = {
	iso: string;
	name: string;
};

export type PageData = {
	translations: Translations;
	config: Config;
	languages: Language[];
};

export type RouteParams = {
	languageIso: string;
	id: string;
};
