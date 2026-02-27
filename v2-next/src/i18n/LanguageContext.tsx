"use client";
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { Lang, translations, TranslationKeys } from './translations';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageContextType {
    lang: Lang;
    t: TranslationKeys;
    toggleLang: () => void;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children, lang }: { children: ReactNode; lang: Lang }) {
    const router = useRouter();
    const pathname = usePathname();

    const isRTL = lang === 'ar';

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'ar' : 'en';
        const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
        router.push(newPath);
    };

    const value = useMemo(() => ({
        lang,
        t: translations[lang],
        toggleLang,
        isRTL
    }), [lang, toggleLang, isRTL]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
}
