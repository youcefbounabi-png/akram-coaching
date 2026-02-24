import { motion } from 'motion/react';
import { Dumbbell, Utensils, Zap, MessageSquare, Heart, Brain, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

export default function ServicesPage() {
    const { t, isRTL } = useLanguage();
    const ts = t.services;

    const services = [
        {
            icon: Dumbbell,
            title: ts.s1Title,
            description: ts.s1Desc,
            features: ts.s1Features,
            accent: 'from-brand-red/20 to-transparent',
        },
        {
            icon: Utensils,
            title: ts.nutrition,
            description: ts.nutritionDesc,
            features: ts.s2Features,
            accent: 'from-orange-500/10 to-transparent',
        },
        {
            icon: Zap,
            title: ts.s3Title,
            description: ts.s3Desc,
            features: ts.s3Features,
            accent: 'from-yellow-500/10 to-transparent',
            featured: true,
        },
        {
            icon: MessageSquare,
            title: ts.s4Title,
            description: ts.s4Desc,
            features: ts.s4Features,
            accent: 'from-blue-500/10 to-transparent',
        },
        {
            icon: Heart,
            title: ts.s5Title,
            description: ts.s5Desc,
            features: ts.s5Features,
            accent: 'from-pink-500/10 to-transparent',
        },
        {
            icon: Brain,
            title: ts.s6Title,
            description: ts.s6Desc,
            features: ts.s6Features,
            accent: 'from-purple-500/10 to-transparent',
        },
    ];

    const process = [
        { step: '01', title: ts.p1Step, desc: ts.p1Desc },
        { step: '02', title: ts.p2Step, desc: ts.p2Desc },
        { step: '03', title: ts.p3Step, desc: ts.p3Desc },
        { step: '04', title: ts.p4Step, desc: ts.p4Desc },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center md:text-start">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className={cn("text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-6 flex items-center justify-center md:justify-start gap-4")}>
                            <span className="w-8 h-px bg-brand-red" />
                            {ts.tagline}
                        </p>
                        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tighter leading-none mb-8 uppercase">
                            {ts.headline}{' '}
                            <span className={cn("font-serif italic font-light text-brand-red block md:inline", isRTL && "lowercase")}>{ts.headlineItalic}</span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-2xl font-light leading-relaxed mx-auto md:mx-0" dangerouslySetInnerHTML={{ __html: ts.descHtml }}></p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 relative">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.08 }} viewport={{ once: true, margin: '-80px' }} className={cn('group glass-panel rounded-[2rem] p-8 flex flex-col gap-6 relative overflow-hidden cursor-default transition-all duration-500 hover:border-white/15', service.featured && 'border-brand-red/30 shadow-[0_0_40px_rgba(236,54,66,0.08)]')}>
                                {service.featured && (
                                    <div className={cn("absolute top-6 bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full", isRTL ? "left-6" : "right-6")}>
                                        {ts.mostPopular}
                                    </div>
                                )}
                                <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700', service.accent)} />
                                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-brand-red group-hover:border-brand-red/30 transition-all duration-500">
                                    <service.icon size={24} strokeWidth={1.5} aria-hidden="true" />
                                </div>
                                <div className="relative z-10">
                                    <h2 className="text-xl font-display font-bold mb-3 group-hover:text-brand-red transition-colors duration-300">{service.title}</h2>
                                    <p className="text-white/50 text-sm leading-relaxed font-light">{service.description}</p>
                                </div>
                                <ul className="relative z-10 space-y-2 mt-auto">
                                    {service.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3 text-xs text-white/60">
                                            <CheckCircle2 size={14} className="text-brand-red shrink-0" aria-hidden="true" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-brand-gray/5 relative overflow-hidden" dir="ltr">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="container max-w-7xl mx-auto px-6 relative">
                    <div className="text-center mb-24" dir={isRTL ? 'rtl' : 'ltr'}>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-bold text-white/40 uppercase tracking-[0.4em] mb-4"
                        >
                            {ts.processTag}
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none"
                        >
                            {ts.processTitle}{' '}
                            <span className="font-serif italic font-light text-brand-red">{ts.processItalic}</span>
                        </motion.h2>
                    </div>

                    <div className="relative grid md:grid-cols-4 gap-6 lg:gap-8 items-start" dir={isRTL ? 'rtl' : 'ltr'}>
                        {/* THE ENERGY PATH (Desktop) - Highly Visible Red Stream */}
                        <div className="hidden md:block absolute top-[6rem] left-[10%] right-[10%] h-px z-0">
                            <svg className="w-full h-4 overflow-visible">
                                <motion.path
                                    d={isRTL ? "M 100% 2 L 0 2" : "M 0 2 L 100% 2"}
                                    fill="none"
                                    stroke="url(#energy-gradient)"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    whileInView={{ pathLength: 1, opacity: 0.8 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                                <defs>
                                    <linearGradient id="energy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ec3642" stopOpacity="0" />
                                        <stop offset="50%" stopColor="#ec3642" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#ec3642" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {/* Moving Glowing Thick Pulse */}
                            <motion.div
                                className="absolute top-[1px] w-32 h-[3px] bg-gradient-to-r from-transparent via-brand-red to-transparent blur-[2px]"
                                animate={{
                                    left: isRTL ? ["100%", "-20%"] : ["-20%", "100%"],
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: 1.5
                                }}
                            />
                        </div>

                        {process.map((p, i) => {
                            // Funnel Scaling: Gradually decrease size and padding
                            const scales = [1.05, 1.0, 0.95, 0.9];
                            const paddings = ["p-10 lg:p-12", "p-9 lg:p-11", "p-8 lg:p-10", "p-7 lg:p-9"];
                            const opacities = ["opacity-100", "opacity-90", "opacity-80", "opacity-70"];

                            return (
                                <motion.div
                                    key={p.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: i * 0.25 }}
                                    viewport={{ once: true }}
                                    className={cn("relative z-10 group", opacities[i])}
                                    style={{ transform: `scale(${scales[i]})` }}
                                >
                                    <div className={cn(
                                        "glass-panel rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-700 hover:border-brand-red/20 hover:shadow-[0_0_60px_rgba(236,54,66,0.05)] group-hover:-translate-y-2",
                                        paddings[i]
                                    )}>
                                        <div className="relative mb-8 text-center">
                                            <div className="text-[10px] font-black text-brand-red/40 uppercase tracking-[0.4em] mb-2 group-hover:text-brand-red/60 transition-colors">
                                                STAGE
                                            </div>
                                            <div className="text-6xl font-display font-black text-brand-red/30 group-hover:text-brand-red/60 transition-colors duration-500 leading-none tracking-tighter select-none">
                                                {p.step}
                                            </div>
                                        </div>

                                        <h3 className="text-xl lg:text-2xl font-display font-bold mb-4 group-hover:text-white transition-colors duration-300">
                                            {p.title}
                                        </h3>
                                        <p className="text-white/40 text-sm font-light leading-relaxed max-w-[200px]">
                                            {p.desc}
                                        </p>

                                        {/* Mobile Indicator */}
                                        {i < process.length - 1 && (
                                            <div className="md:hidden flex justify-center py-8">
                                                <motion.div
                                                    animate={{ y: [0, 10, 0], opacity: [0.2, 0.6, 0.2] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <ArrowRight className="rotate-90 text-white/30" size={20} />
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-24 text-center">
                <div className="container max-w-4xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6 uppercase">
                            {ts.readyTitle}{' '}
                            <span className="font-serif italic font-light text-brand-red">{ts.readyItalic}</span>
                        </h2>
                        <p className="text-white/60 text-lg mb-10 font-light">{ts.readyDesc}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/pricing" className="inline-flex items-center gap-3 bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 red-glow-strong group cursor-pointer">
                                {t.home.seePricing}
                                <ArrowRight size={20} className={cn("transition-transform", isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1")} aria-hidden="true" />
                            </Link>
                            <a href={BRAND.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 glass-panel glass-panel-hover px-10 py-5 rounded-full font-bold text-lg cursor-pointer">
                                {t.pricing.whatsappAlt}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
