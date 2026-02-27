import { Metadata } from 'next';
import ContactContent from './ContactContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as 'en' | 'ar');

    return {
        title: `${t.nav.contact} | Dr. Akram Ikni`,
        description: t.contact.headline + ' ' + t.contact.headlineItalic,
        alternates: {
            canonical: `/${lang}/contact`,
            languages: {
                en: '/en/contact',
                ar: '/ar/contact',
            },
        },
        openGraph: {
            title: `${t.nav.contact} | Dr. Akram Ikni`,
            description: t.contact.headline + ' ' + t.contact.headlineItalic,
            locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
            type: 'website',
        },
    };
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    return <ContactContent />;
}
