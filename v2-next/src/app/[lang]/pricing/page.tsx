import { Metadata } from 'next';
import PricingContent from './PricingContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const t = await getDictionary(lang as 'en' | 'ar');

    return {
        title: `${t.nav.pricing} | Dr. Akram Ikni`,
        description: t.pricing.subtitle,
        alternates: {
            canonical: `/${lang}/pricing`,
            languages: {
                en: '/en/pricing',
                ar: '/ar/pricing',
            },
        },
        openGraph: {
            title: `${t.nav.pricing} | Dr. Akram Ikni`,
            description: t.pricing.subtitle,
            locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
            type: 'website',
        },
    };
}

export default async function Page({ params }: Props) {
    const { lang } = await params;
    return <PricingContent />;
}
