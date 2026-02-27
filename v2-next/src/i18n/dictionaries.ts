import { translations, Lang } from './translations';

export const getDictionary = async (lang: Lang) => {
    return translations[lang] || translations.en;
};
