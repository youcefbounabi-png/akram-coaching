import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, translations, TranslationKeys } from './translations';

interface LanguageContextType {
    lang: Lang;
    t: TranslationKeys;
    toggleLang: () => void;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'en',
    t: translations.en,
    toggleLang: () => { },
    isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        return (localStorage.getItem('lang') as Lang) || 'en';
    });

    const isRTL = lang === 'ar';

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        // Add/remove RTL body class for font-family swap
        if (isRTL) {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    }, [lang, isRTL]);

    const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en');

    return (
        <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
