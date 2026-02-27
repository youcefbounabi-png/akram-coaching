import { Metadata } from 'next';
import TransformationsContent from './TransformationsContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as 'en' | 'ar');

    return {
        title: `${t.nav.transformations} | Dr. Akram Ikni`,
        description: t.transformations.subtitle,
        alternates: {
            canonical: `/${lang}/transformations`,
            languages: {
                en: '/en/transformations',
                ar: '/ar/transformations',
            },
        },
        openGraph: {
            title: `${t.nav.transformations} | Dr. Akram Ikni`,
            description: t.transformations.subtitle,
            locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
            type: 'website',
        },
    };
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    return <TransformationsContent />;
}
