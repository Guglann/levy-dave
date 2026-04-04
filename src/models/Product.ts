import type { ApiProduct } from "../types";
import { getTranslationValue } from "../utils/contentfulValueUtil";
import type { AlbumProductData } from "./AlbumProductData";

export class Product {
	constructor(
		private base: ApiProduct,
		_subtype: null | AlbumProductData,
	) {}

	getName(languageIso: string): string {
		return getTranslationValue(this.base.fields.name, languageIso);
	}

	getShortDescription(languageIso: string): string {
		return getTranslationValue(this.base.fields.shortDescription, languageIso);
	}

	getId(): string {
		return getTranslationValue(this.base.fields.id, "pl");
	}
}
