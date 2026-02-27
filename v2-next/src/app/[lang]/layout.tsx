import { Lang } from "@/i18n/translations";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import FloatingChatbot from "@/components/FloatingChatbot";
import { Suspense, lazy } from "react";
import "../globals.css";

const NebulaBackground = lazy(() => import("@/components/3d/NebulaBackground"));

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const validatedLang = (lang === 'ar' ? 'ar' : 'en') as Lang;
    const isRTL = lang === 'ar';

    return (
        <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400;1,600;1,800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col font-sans selection:bg-brand-red selection:text-white relative bg-brand-dark text-white overflow-x-hidden">
                <LanguageProvider lang={validatedLang}>
                    <Suspense fallback={<div className="fixed inset-0 z-0 bg-brand-dark" />}>
                        <NebulaBackground />
                    </Suspense>

                    <Header />

                    <main className="flex-grow relative z-10">
                        {children}
                    </main>

                    <Footer />
                    <BackToTop />
                    <FloatingChatbot />
                </LanguageProvider>
            </body>
        </html>
    );
}
