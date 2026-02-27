import { Metadata } from 'next';
import ChallengeContent from './ChallengeContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as 'en' | 'ar');

    return {
        title: `${t.nav.challenge} | Dr. Akram Ikni`,
        description: t.challenge.subtitle,
        alternates: {
            canonical: `/${lang}/challenge`,
            languages: {
                en: '/en/challenge',
                ar: '/ar/challenge',
            },
        },
        openGraph: {
            title: `${t.nav.challenge} | Dr. Akram Ikni`,
            description: t.challenge.subtitle,
            locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
            type: 'website',
        },
    };
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    return <ChallengeContent />;
}
