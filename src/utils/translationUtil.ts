import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document as ContentfulDocument } from "@contentful/rich-text-types";

export const getDocumentTranslation = (
	translations: Record<string, ContentfulDocument>,
	languageIso: string,
) => {
	const translationValue = translations[languageIso] ?? null;

	const contentfulDocument = getContentfulDocument(translationValue);

	if (!contentfulDocument) {
		return "{Bad value}";
	}

	return documentToHtmlString(translationValue);
};

export const getStringTranslation = (
	translations: Record<string,string>,
	languageIso: string,
) => {
	const translationValue = translations[languageIso] ?? null;

    if (!translationValue) {
        return "{Bad value}";
    }

	return translationValue;
};

const getContentfulDocument = (obj: object): ContentfulDocument | null => {
	if (
		typeof obj === "object" &&
		obj !== null &&
		"nodeType" in obj &&
		(obj as Record<string, unknown>).nodeType === "document" &&
		"content" in obj &&
		Array.isArray((obj as Record<string, unknown>).content)
	) {
		return obj as unknown as ContentfulDocument;
	}

	return null;
};
