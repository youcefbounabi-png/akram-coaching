import { Metadata } from 'next';
import ServicesContent from './ServicesContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as 'en' | 'ar');

    return {
        title: `${t.nav.services} | Dr. Akram Ikni`,
        description: t.services.descHtml.replace(/<[^>]*>/g, ''),
        alternates: {
            canonical: `/${lang}/services`,
            languages: {
                en: '/en/services',
                ar: '/ar/services',
            },
        },
        openGraph: {
            title: `${t.nav.services} | Dr. Akram Ikni`,
            description: t.services.descHtml.replace(/<[^>]*>/g, ''),
            locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
            type: 'website',
        },
    };
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    return <ServicesContent />;
}
