import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
}

const DEFAULT_DESCRIPTION = "Coach Akram — Elite performance coaching combining championship-level experience with pharmaceutical science. Transform your body, optimize your health, and push your limits.";

export default function SEO({ title, description = DEFAULT_DESCRIPTION }: SEOProps) {
    useEffect(() => {
        // Update Document Title
        const fullTitle = `${title} | Coach Akram`;
        document.title = fullTitle;

        // Update Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        // Update OpenGraph Title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', fullTitle);
        }

        // Update OpenGraph Description
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', description);
        }

    }, [title, description]);

    return null;
}
