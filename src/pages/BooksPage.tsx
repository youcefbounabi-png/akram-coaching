import { motion } from 'motion/react';
import Books from '../components/Books';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';

export default function BooksPage() {
    const { isRTL } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <SEO
                title="The Knowledge Vault | Training & Nutrition Books"
                description="Get exclusive access to the scientific protocols and methodologies used by Dr. Akram Ikni to build elite physiques. Handcrafted guidebooks for the modern athlete."
            />
            <div className="pb-12">
                <Books variant="full" />
            </div>
        </motion.div>
    );
}
