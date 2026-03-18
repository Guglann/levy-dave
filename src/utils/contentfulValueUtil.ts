import {Asset, UnresolvedLink} from "contentful";

type LocalizedAsset = Record<string, UnresolvedLink<"Asset"> | Asset<"WITH_ALL_LOCALES", string> | undefined>;

type LocalizedTranslation = Record<string, string|undefined>

export const getAssetUrl = (localizedAsset: LocalizedAsset): string => {
    if (!localizedAsset) {
        return "";
    }

    const maybeAsset = localizedAsset['en'];

    if (!maybeAsset) {
        return "";
    }

    if (!('fields' in maybeAsset)) {
        return "";
    }

    const assetFile = maybeAsset.fields.file?.['en'];

    if (!assetFile) {
        return "";
    }

    return assetFile.url;
}

export const getTranslationValue = (localizedTranslation: LocalizedTranslation, languageIso: string): string => {
    return localizedTranslation?.[languageIso] ?? '';
}