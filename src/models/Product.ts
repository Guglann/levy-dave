import type { AssetFile } from "contentful";
import type { ApiProduct } from "../types";
import {
	getHtmlString,
	getTranslationValue,
	resolveAsset,
} from "../utils/contentfulValueUtil";
import type { AlbumProductData } from "./AlbumProductData";

export class Product {
	constructor(
		private base: ApiProduct,
		private subtype: null | AlbumProductData,
	) {}

	getName(languageIso: string) {
		return getTranslationValue(this.base.fields.name, languageIso);
	}

	getShortDescription(languageIso: string) {
		return getTranslationValue(this.base.fields.shortDescription, languageIso);
	}

	getId() {
		return getTranslationValue(this.base.fields.id, "pl");
	}

	getSubtype() {
		return this.subtype;
	}

	getCover() {
		return resolveAsset(this.base.fields.cover?.pl);
	}

	getBrand() {
		const field = this.base.fields.brand?.pl;

		if (!field) {
			return null;
		}

		return field;
	}

	getImages() {
		const result: AssetFile[] = [];

		const imagesFields = this.base.fields.images?.pl;

		if (!imagesFields) {
			return result;
		}

		for (const field of imagesFields) {
			const asset = resolveAsset(field);

			if (asset) {
				result.push(asset);
			}
		}

		return result;
	}

	getLongDescription(languageIso: string) {
		const field = this.base.fields.longDescription;

		if (!field) {
			return null;
		}

		return getHtmlString(field, languageIso);
	}

	getGalleryImages() {
		const cover = this.getCover();
		const images = this.getImages();

		if (cover) {
			images.push(cover);
		}

		return images.map((image) => ({
			url: image.url,
			alt: image.fileName,
		}));
	}

	getStockQuantity() {
		const value = this.base.fields.stockQuantity?.pl;

		if (!value) {
			return 0;
		}

		return value;
	}
}
