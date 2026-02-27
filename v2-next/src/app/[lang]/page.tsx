import { Metadata } from 'next';
import HomeContent from './HomeContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as 'en' | 'ar');

  return {
    title: `${t.hero.line1} ${t.hero.line2} ${t.hero.line3} | Dr. Akram Ikni`,
    description: t.hero.desc.replace(/<[^>]*>/g, ''),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title: t.home.headline,
      description: t.hero.desc.replace(/<[^>]*>/g, ''),
      locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
      type: 'website',
      siteName: 'Akram Coaching',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.home.headline,
      description: t.hero.desc.replace(/<[^>]*>/g, ''),
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang as 'en' | 'ar');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Akram Coaching',
    description: t.hero.desc,
    logo: 'https://akram-coaching.com/logo.png',
    url: 'https://akram-coaching.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Akram Ikni',
      jobTitle: 'Coach & Pharmacist',
    },
    sameAs: [
      'https://www.youtube.com/@Dr_Akramikni',
      'https://www.instagram.com/dr_akramikni/',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
