import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://akram-coaching.com';
    const languages = ['en', 'ar'];
    const paths = ['', '/about', '/services', '/challenge', '/transformations', '/pricing', '/contact'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    languages.forEach((lang) => {
        paths.forEach((path) => {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}${path}`,
                lastModified: new Date().toISOString(), // Should ideally be dynamic based on content
                changeFrequency: path === '' ? 'daily' : 'weekly',
                priority: path === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
