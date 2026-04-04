import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import type { Asset, UnresolvedLink } from "contentful";
import type { LocalizedAlbum } from "../types";

type LocalizedMaybeAsset = Record<
	string,
	UnresolvedLink<"Asset"> | Asset<"WITH_ALL_LOCALES", string> | undefined
>;

type LocalizedTranslation = Record<string, string | undefined>;

export const asLocalizedAsset = (
	localizedMaybeAsset: LocalizedMaybeAsset,
	languageIso: string,
) => {
	if (!localizedMaybeAsset) {
		throw new Error("Not asset");
	}

	const maybeAsset = localizedMaybeAsset[languageIso];

	if (!maybeAsset) {
		throw new Error("Not asset");
	}

	if (!("fields" in maybeAsset)) {
		throw new Error("Not asset");
	}

	return maybeAsset;
};

export const getAssetUrl = (localizedAsset: LocalizedMaybeAsset): string => {
	try {
		const asset = asLocalizedAsset(localizedAsset, "en");

		const assetFile = asset.fields.file?.pl;

		if (!assetFile) {
			return "";
		}

		return assetFile.url;
	} catch (_error) {
		return "";
	}
};

export const getTranslationValue = (
	localizedTranslation: LocalizedTranslation,
	languageIso: string,
): string => {
	return localizedTranslation?.[languageIso] ?? "";
};

export const getHtmlString = (
	localizedDocument: Record<string, Document | undefined>,
	languageIso: string,
): string => {
	const document = localizedDocument[languageIso] ?? null;

	if (!document) {
		return "";
	}

	return documentToHtmlString(document);
};

export const getAlbumImages = (album: LocalizedAlbum) => {
	const images: { url: string; alt: string }[] = [];

	const coverAsset = asLocalizedAsset(album.fields.cover, "en");

	const coverFile = coverAsset.fields.file?.pl;

	const coverUrl = coverFile?.url;

	if (!coverUrl) {
		return images;
	}

	images.push({
		url: coverUrl,
		alt: coverFile?.fileName ?? "",
	});

	const imagesField = album.fields.images?.pl;

	if (!imagesField) {
		return images;
	}

	for (const image of imagesField) {
		if (!("fields" in image)) {
			continue;
		}

		const imageFile = image.fields.file?.pl;

		if (!imageFile) {
			continue;
		}

		const fileUrl = imageFile?.url;

		if (!fileUrl) {
			continue;
		}

		images.push({
			url: fileUrl,
			alt: imageFile?.fileName ?? "",
		});
	}

	return images;
};
