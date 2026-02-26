import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, Grid3X3, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';

type Category = 'all' | 'fat-loss' | 'muscle' | 'female' | '90-day';

type Transformation = {
    img: string;
    name: string;
    duration: string;
    result: string;
    category: Category;
};

const BATCH_SIZE = 12;

export default function TransformationsPage() {
    const { t, isRTL } = useLanguage();
    const tt = t.transformations;

    const transformations: Transformation[] = [
        // ── Originals ─────────────────────────────────────────────────────────
        { img: '/books/transformation7mths.png', name: isRTL ? 'وليد' : 'Walid', duration: isRTL ? '7 أشهر' : '7 months', result: isRTL ? 'عضلات وبنية ضخمة' : 'Massive muscle definition', category: 'muscle' },
        { img: '/books/photo_2024-12-28_02-39-43-818x1024 (2).webp', name: isRTL ? 'عمر' : 'Omar', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? 'فقدان دهون وبناء عضل' : 'Fat loss & Lean muscle', category: '90-day' },
        { img: '/books/photo_2024-12-28_02-39-43-818x1024 (1).png', name: isRTL ? 'حسن' : 'Hassan', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? 'لياقة بدنية وقوة' : 'Fitness & Strength', category: 'fat-loss' },
        { img: '/transformations/transformation_1.jpg', name: isRTL ? 'أحمد' : 'Ahmed', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-18 كغ دهون' : '-18kg body fat', category: 'fat-loss' },
        { img: '/transformations/transformation_2.jpg', name: isRTL ? 'كريم' : 'Karim', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? '+8 كغ عضل صافي' : '+8kg lean muscle', category: 'muscle' },
        { img: '/transformations/transformation_3.jpg', name: isRTL ? 'يوسف' : 'Youssef', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? 'إعادة تشكيل كامل للجسم' : 'Full body recomp', category: '90-day' },
        { img: '/transformations/transformation_4.jpg', name: isRTL ? 'مهدي' : 'Mehdi', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-22 كغ إجمالي' : '-22kg total', category: 'fat-loss' },
        { img: '/transformations/transformation_5.jpg', name: isRTL ? 'طارق' : 'Tariq', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? 'جسم مشدود' : 'Lean & toned', category: 'muscle' },
        { img: '/transformations/transformation_6.jpg', name: isRTL ? 'رياض' : 'Riad', duration: isRTL ? '6 أشهر' : '6 months', result: isRTL ? 'تجهيز بطولة' : 'Competition prep', category: 'muscle' },

        // ── New Photos from Akram (WhatsApp, Feb 2026) ──────────────────────────
        { img: '/books/WhatsApp Image 2026-02-25 at 12.27.58 AM.jpeg', name: isRTL ? 'سامي' : 'Sami', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-15 كغ دهون' : '-15kg body fat', category: '90-day' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.27.59 AM.jpeg', name: isRTL ? 'إلياس' : 'Ilyas', duration: isRTL ? '3 أشهر' : '3 months', result: isRTL ? 'إعادة تشكيل كامل' : 'Full recomp', category: 'fat-loss' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.27.59 AM (1).jpeg', name: isRTL ? 'بلال' : 'Bilal', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '+6 كغ عضل صافي' : '+6kg lean muscle', category: '90-day' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.02 AM.jpeg', name: isRTL ? 'أمين' : 'Amine', duration: isRTL ? '4 أشهر' : '4 months', result: isRTL ? 'لياقة بدنية كاملة' : 'Full fitness', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.02 AM (1).jpeg', name: isRTL ? 'خالد' : 'Khaled', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? '-12 كغ' : '-12kg', category: 'fat-loss' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.02 AM (2).jpeg', name: isRTL ? 'طارق' : 'Tariq', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? 'جسم محدد ومشدود' : 'Toned & defined', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.03 AM.jpeg', name: isRTL ? 'سليم' : 'Salim', duration: isRTL ? '3 أشهر' : '3 months', result: isRTL ? '-10 كغ دهون' : '-10kg fat loss', category: 'fat-loss' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.03 AM (1).jpeg', name: isRTL ? 'فريد' : 'Farid', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? 'فقدان دهون مذهل' : 'Amazing fat loss', category: 'fat-loss' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.03 AM (2).jpeg', name: isRTL ? 'مروان' : 'Marwan', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? 'فقدان دهون وعضلات' : 'Fat loss & muscle', category: '90-day' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.03 AM (3).jpeg', name: isRTL ? 'عادل' : 'Adel', duration: isRTL ? '4 أشهر' : '4 months', result: isRTL ? 'قوة ولياقة بدنية' : 'Strength & fitness', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.03 AM (4).jpeg', name: isRTL ? 'آية' : 'Aya', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-20 كغ إجمالي' : '-20kg total', category: 'female' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.04 AM.jpeg', name: isRTL ? 'زياد' : 'Ziad', duration: isRTL ? '5 أشهر' : '5 months', result: isRTL ? 'تجهيز بطولة' : 'Competition prep', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.04 AM (1).jpeg', name: isRTL ? 'رضا' : 'Rida', duration: isRTL ? '3 أشهر' : '3 months', result: isRTL ? '+10 كغ عضل' : '+10kg muscle', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.06 AM.jpeg', name: isRTL ? 'ياسين' : 'Yacine', duration: isRTL ? '6 أشهر' : '6 months', result: isRTL ? 'جسم رياضي' : 'Athletic physique', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.06 AM (1).jpeg', name: isRTL ? 'حمزة' : 'Hamza', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? '-8 كغ دهون' : '-8kg fat', category: 'fat-loss' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.06 AM (2).jpeg', name: isRTL ? 'نادر' : 'Nader', duration: isRTL ? '4 أشهر' : '4 months', result: isRTL ? 'إعادة تشكيل كاملة' : 'Full recomp', category: 'fat-loss' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.07 AM.jpeg', name: isRTL ? 'أسامة' : 'Oussama', duration: isRTL ? '6 أشهر' : '6 months', result: isRTL ? '+12 كغ عضل صافي' : '+12kg lean mass', category: 'muscle' },
        { img: '/books/WhatsApp Image 2026-02-25 at 12.28.07 AM (1).jpeg', name: isRTL ? 'وسيم' : 'Wassim', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-16 كغ' : '-16kg', category: '90-day' },
    ];

    const testimonials = [
        { name: 'Ahmed B.', text: isRTL ? 'الكوتش أكرم غير فهمي للياقة بالكامل. النهج العلمي أحدث فارقاً كبيراً.' : 'Coach Akram completely changed my understanding of fitness. The science-backed approach made all the difference.', rating: 5, program: isRTL ? 'تحدي 90 يومًا' : '90-Day Challenge' },
        { name: 'Yasmine K.', text: isRTL ? 'أفضل استثمار قمت به. خسرت 15 كغ في 3 أشهر واستمتعت بالرحلة.' : 'Best investment I ever made. Lost 15kg in 3 months and I actually enjoyed the process. The nutrition plan was delicious!', rating: 5, program: isRTL ? 'الخطة الممتازة' : 'Premium Plan' },
        { name: 'Mehdi L.', text: isRTL ? 'كطبيب، كنت متشككًا في البداية. لكن المعرفة الصيدلانية خلف كل توصية كانت مذهلة.' : 'As a doctor, I was skeptical at first. But the pharmaceutical knowledge behind every recommendation is incredible.', rating: 5, program: isRTL ? 'خطة النخبة' : 'Elite Plan' },
    ];

    const categories: { key: Category; labelEn: string; labelAr: string }[] = [
        { key: 'all', labelEn: 'All', labelAr: 'الكل' },
        { key: 'fat-loss', labelEn: 'Fat Loss', labelAr: 'فقدان دهون' },
        { key: 'muscle', labelEn: 'Muscle Gain', labelAr: 'بناء العضل' },
        { key: 'female', labelEn: 'Female', labelAr: 'برامج نسائية' },
        { key: '90-day', labelEn: '90-Day', labelAr: 'تحدي 90 يوم' },
    ];

    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const [selected, setSelected] = useState<Transformation | null>(null);

    const filtered = activeCategory === 'all'
        ? transformations
        : transformations.filter(t => t.category === activeCategory);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const handleCategoryChange = (cat: Category) => {
        setActiveCategory(cat);
        setVisibleCount(BATCH_SIZE);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero */}
            <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden text-center md:text-start">
                <div className={cn("absolute top-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[100px] pointer-events-none", isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2")} />
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className={cn("text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-6 flex items-center justify-center md:justify-start gap-4")}>
                            <span className="w-8 h-px bg-brand-red" />
                            {tt.tagline}
                        </p>
                        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tighter leading-none mb-8 uppercase">
                            {tt.headline}
                            <br />
                            <span className={cn("font-serif italic font-light text-brand-red", isRTL && "lowercase tracking-normal")}>{tt.headlineItalic}</span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl font-light leading-relaxed mx-auto md:mx-0" dangerouslySetInnerHTML={{ __html: isRTL ? "أكثر من <strong class='text-white font-medium'>400 رياضي</strong> غيروا حياتهم. هذه قصصهم." : "Over <strong class='text-white font-medium'>400 athletes</strong> have transformed their lives. These are their stories." }} />
                    </motion.div>
                </div>
            </section>

            {/* Gallery with Category Tabs */}
            <section className="py-10 pb-24 relative">
                <div className="container max-w-7xl mx-auto px-6">

                    {/* Category Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-2 flex-wrap mb-10"
                    >
                        <Filter size={14} className="text-white/30 shrink-0" aria-hidden="true" />
                        {categories.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => handleCategoryChange(cat.key)}
                                className={cn(
                                    'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer border',
                                    activeCategory === cat.key
                                        ? 'bg-brand-red text-white border-brand-red shadow-[0_0_16px_rgba(236,54,66,0.4)]'
                                        : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                                )}
                                aria-pressed={activeCategory === cat.key}
                            >
                                {isRTL ? cat.labelAr : cat.labelEn}
                                <span className="ml-2 text-xs opacity-60">
                                    ({cat.key === 'all' ? transformations.length : transformations.filter(t => t.category === cat.key).length})
                                </span>
                            </button>
                        ))}
                        <div className="ml-auto flex items-center gap-1.5 text-white/30 text-xs">
                            <Grid3X3 size={13} aria-hidden="true" />
                            {filtered.length} {isRTL ? 'نتيجة' : 'results'}
                        </div>
                    </motion.div>

                    {/* Masonry Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.4 }}
                            className="columns-2 md:columns-3 gap-4 space-y-4"
                        >
                            {visible.map((item, i) => (
                                <motion.div
                                    key={`${item.img}-${i}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.5) }}
                                    viewport={{ once: true }}
                                    className="break-inside-avoid relative rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/5"
                                    onClick={() => setSelected(item)}
                                >
                                    <img
                                        src={item.img}
                                        alt={`${item.name} transformation`}
                                        className="w-full h-auto object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                        loading="lazy"
                                        onError={(e) => {
                                            // Gracefully hide new placeholder images that haven't been added yet
                                            const el = e.currentTarget.closest('.break-inside-avoid') as HTMLElement;
                                            if (el) el.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-start">
                                            <div className="text-brand-red text-xs font-bold uppercase tracking-widest mb-1">{item.duration}</div>
                                            <div className="text-white font-display font-bold text-lg">{item.name}</div>
                                            <div className="text-white/70 text-sm">{item.result}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Load More */}
                    {hasMore && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center gap-3 mt-14"
                        >
                            <p className="text-white/30 text-sm">
                                {isRTL ? `عرض ${visible.length} من ${filtered.length}` : `Showing ${visible.length} of ${filtered.length}`}
                            </p>
                            <div className="w-40 h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-red rounded-full transition-all duration-500"
                                    style={{ width: `${(visible.length / filtered.length) * 100}%` }}
                                />
                            </div>
                            <button
                                onClick={() => setVisibleCount(v => v + BATCH_SIZE)}
                                className="mt-4 px-10 py-4 rounded-full border border-white/20 font-bold text-sm hover:bg-white hover:text-brand-dark transition-all duration-300 cursor-pointer"
                            >
                                {isRTL ? 'تحميل المزيد' : 'Load More'}
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4" onClick={() => setSelected(null)}>
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="relative max-w-md w-full glass-panel rounded-[2rem] overflow-hidden" onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
                            <img src={selected.img} alt={selected.name} className="w-full h-auto object-cover" />
                            <div className="p-6 text-start">
                                <div className="text-brand-red text-xs font-bold uppercase tracking-widest mb-1" dir="ltr">{selected.duration}</div>
                                <h3 className="text-2xl font-display font-bold mb-1">{selected.name}</h3>
                                <p className="text-white/60">{selected.result}</p>
                            </div>
                            <button className={cn("absolute top-4 w-10 h-10 bg-brand-dark/80 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-brand-red transition-colors cursor-pointer", isRTL ? "left-4" : "right-4")} onClick={() => setSelected(null)} aria-label="Close">×</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Bar */}
            <section className="py-16 bg-brand-gray/20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="container max-w-7xl mx-auto px-6" dir="ltr">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {BRAND.stats.map((stat) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="group cursor-default">
                                <div className="text-4xl font-display font-black group-hover:text-brand-red transition-colors">{stat.value}</div>
                                <div className="text-xs text-white/40 uppercase tracking-widest mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Female Success Videos */}
            <section className="py-24 bg-brand-dark/50 relative overflow-hidden">
                <div className={cn("absolute top-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none", isRTL ? "left-0" : "right-0")} />
                <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="mb-16">
                        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4">{isRTL ? 'القسم النسائي' : "Women's Coaching"}</p>
                        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter">
                            {isRTL ? 'قصص نجاح' : 'FEMALE '} <span className="font-serif italic font-light text-brand-red">{isRTL ? 'ملهمة' : 'Success Stories'}</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { id: 'ZM5jOPmlc38', title: 'Female Success Story 1' },
                            { id: 'Kd9aW2TYtqE', title: 'Female Success Story 2' },
                            { id: 'xtBCk5EV5A4', title: 'Female Success Story 3' }
                        ].map((video, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: true }} className="relative aspect-[9/16] bg-brand-dark rounded-[2rem] overflow-hidden border border-white/10 shadow-lg">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full border-none"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4">{isRTL ? 'آراء العملاء' : 'Client Reviews'}</p>
                        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
                            {isRTL ? 'ماذا قالوا' : 'WHAT THEY '}{' '}
                            <span className="font-serif italic font-light text-brand-red">{isRTL ? 'عنا' : 'Say'}</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((item, i) => (
                            <motion.div key={item.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: true }} className="glass-panel glass-panel-hover rounded-2xl p-8 cursor-default">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: item.rating }).map((_, j) => (
                                        <Star key={j} size={14} fill="currentColor" className="text-brand-red" aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed mb-6 font-light italic text-start">"{item.text}"</p>
                                <div className="text-start">
                                    <div className="font-bold text-white">{item.name}</div>
                                    <div className="text-xs text-brand-red uppercase tracking-widest mt-1" dir="ltr">{item.program}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 pb-24 text-center">
                <div className="container max-w-3xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 uppercase">
                            {isRTL ? 'حان دورك' : 'YOUR TURN TO '}{' '}
                            <span className="font-serif italic font-light text-brand-red">{isRTL ? 'للتحول' : 'Transform'}</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/pricing" className="inline-flex items-center justify-center gap-3 bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all red-glow-strong group cursor-pointer">
                                {isRTL ? 'ابدأ اليوم' : 'Start Today'} <ArrowRight size={20} className={cn("transition-transform", isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1")} aria-hidden="true" />
                            </Link>
                            <Link to="/contact" className="inline-flex items-center justify-center gap-3 glass-panel glass-panel-hover px-10 py-5 rounded-full font-bold text-lg cursor-pointer">
                                {isRTL ? 'احجز استشارة' : 'Book Consultation'}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
