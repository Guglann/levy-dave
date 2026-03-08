export class TranslationResolver {

    constructor(config) {
        this.config = config;
    }

    resolve(key, languageIso) {
        return this.config.translations[key][languageIso] ?? `{translation '${key}' for language '${languageIso} not found}`;
    }
}