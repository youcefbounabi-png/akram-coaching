import { Metadata } from 'next';
import AboutContent from './AboutContent';
import { getDictionary } from '@/i18n/dictionaries';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getDictionary(lang as 'en' | 'ar');

  return {
    title: `${t.nav.about} | Dr. Akram Ikni`,
    description: t.about.p1.substring(0, 160),
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        en: '/en/about',
        ar: '/ar/about',
      },
    },
    openGraph: {
      title: `${t.nav.about} | Dr. Akram Ikni`,
      description: t.about.p1.substring(0, 160),
      locale: lang === 'ar' ? 'ar_DZ' : 'en_US',
      type: 'profile',
      firstName: 'Akram',
      lastName: 'Ikni',
      username: 'drakramikni',
      gender: 'male',
    },
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  return <AboutContent />;
}
