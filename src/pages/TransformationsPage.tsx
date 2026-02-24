import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';

export default function TransformationsPage() {
    const { t, isRTL } = useLanguage();
    const tt = t.transformations;

    const transformations = [
        { img: '/books/transformation7mths.png', name: isRTL ? 'وليد' : 'Walid', duration: isRTL ? '7 أشهر' : '7 months', result: isRTL ? 'عضلات وبنية ضخمة' : 'Massive muscle definition' },
        { img: '/books/photo_2024-12-28_02-39-43-818x1024 (2).webp', name: isRTL ? 'عمر' : 'Omar', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? 'فقدان دهون وبناء عضل' : 'Fat loss & Lean muscle' },
        { img: '/books/photo_2024-12-28_02-39-43-818x1024 (1).png', name: isRTL ? 'حسن' : 'Hassan', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? 'لياقة بدنية وقوة' : 'Fitness & Strength' },
        { img: 'https://akramcoach.com/wp-content/uploads/2024/12/24-819x1024.png', name: isRTL ? 'أحمد' : 'Ahmed', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-18 كغ دهون' : '-18kg body fat' },
        { img: 'https://akramcoach.com/wp-content/uploads/2024/12/17-1-819x1024.png', name: isRTL ? 'كريم' : 'Karim', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? '+8 كغ عضل صافي' : '+8kg lean muscle' },
        { img: 'https://akramcoach.com/wp-content/uploads/2024/12/IMG_0021-2-819x1024.png', name: isRTL ? 'يوسف' : 'Youssef', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? 'إعادة تشكيل كامل للجسم' : 'Full body recomp' },
        { img: 'https://akramcoach.com/wp-content/uploads/2024/12/7-819x1024.png', name: isRTL ? 'مهدي' : 'Mehdi', duration: isRTL ? '90 يومًا' : '90 days', result: isRTL ? '-22 كغ إجمالي' : '-22kg total' },
        { img: 'https://akramcoach.com/wp-content/uploads/2024/12/12345-1-1024x1024.png', name: isRTL ? 'طارق' : 'Tariq', duration: isRTL ? '60 يومًا' : '60 days', result: isRTL ? 'جسم مشدود' : 'Lean & toned' },
        { img: 'https://akramcoach.com/wp-content/uploads/2024/12/IMG_0045-2-1024x1024.png', name: isRTL ? 'رياض' : 'Riad', duration: isRTL ? '6 أشهر' : '6 months', result: isRTL ? 'تجهيز بطولة' : 'Competition prep' },
    ];

    const testimonials = [
        { name: 'Ahmed B.', text: isRTL ? 'الكوتش أكرم غير فهمي للياقة بالكامل. النهج العلمي أحدث فارقاً كبيراً.' : 'Coach Akram completely changed my understanding of fitness. The science-backed approach made all the difference.', rating: 5, program: isRTL ? 'تحدي 90 يومًا' : '90-Day Challenge' },
        { name: 'Yasmine K.', text: isRTL ? 'أفضل استثمار قمت به. خسرت 15 كغ في 3 أشهر واستمتعت بالرحلة. خطة التغذية كانت لذيذة!' : 'Best investment I ever made. Lost 15kg in 3 months and I actually enjoyed the process. The nutrition plan was delicious!', rating: 5, program: isRTL ? 'الخطة الممتازة' : 'Premium Plan' },
        { name: 'Mehdi L.', text: isRTL ? 'كطبيب، كنت متشككًا في البداية. لكن المعرفة الصيدلانية خلف كل توصية كانت مذهلة.' : 'As a doctor, I was skeptical at first. But the pharmaceutical knowledge behind every recommendation is incredible.', rating: 5, program: isRTL ? 'خطة النخبة' : 'Elite Plan' },
    ];

    const [selected, setSelected] = useState<typeof transformations[0] | null>(null);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} dir={isRTL ? 'rtl' : 'ltr'}>
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

            <section className="py-10 pb-24 relative">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="columns-2 md:columns-3 gap-4 space-y-4">
                        {transformations.map((t, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.08 }} viewport={{ once: true, margin: '-60px' }} className="break-inside-avoid relative rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/5" onClick={() => setSelected(t)}>
                                <img src={t.img} alt={`${t.name} transformation`} className="w-full h-auto object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-start">
                                        <div className="text-brand-red text-xs font-bold uppercase tracking-widest mb-1">{t.duration}</div>
                                        <div className="text-white font-display font-bold text-lg">{t.name}</div>
                                        <div className="text-white/70 text-sm">{t.result}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
                            <button className={cn("absolute top-4 w-10 h-10 bg-brand-dark/80 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-brand-red transition-colors cursor-pointer", isRTL ? "left-4" : "right-4")} onClick={() => setSelected(null)} aria-label="Close">
                                ×
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        {testimonials.map((t, i) => (
                            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.1 }} viewport={{ once: true }} className="glass-panel glass-panel-hover rounded-2xl p-8 cursor-default">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, j) => (
                                        <Star key={j} size={14} fill="currentColor" className="text-brand-red" aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed mb-6 font-light italic text-start">"{t.text}"</p>
                                <div className="text-start">
                                    <div className="font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-brand-red uppercase tracking-widest mt-1" dir="ltr">{t.program}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

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
