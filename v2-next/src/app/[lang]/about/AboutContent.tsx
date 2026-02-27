"use client";
import { motion } from 'motion/react';
import { GraduationCap, Trophy, HeartPulse, Award } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Image from 'next/image';

export default function AboutContent() {
    const { t, isRTL } = useLanguage();
    const ta = t.about;

    const credentials = [
        { icon: Trophy, label: ta.c1Label, desc: ta.c1Desc },
        { icon: GraduationCap, label: ta.c2Label, desc: ta.c2Desc },
        { icon: HeartPulse, label: ta.c3Label, desc: ta.c3Desc },
        { icon: Award, label: ta.c4Label, desc: ta.c4Desc },
    ];

    return (
        <div className="pt-32 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-bold text-brand-red uppercase tracking-[0.3em] mb-6">{ta.tag}</h2>
                        <h1 className="text-5xl md:text-7xl font-display font-black mb-8 leading-tight">
                            {ta.headline} <span className="text-brand-red italic">{ta.headlineRed}</span>
                        </h1>
                        <div className="space-y-6 text-white/60 leading-relaxed text-lg">
                            <p>{ta.p1}</p>
                            <p>{ta.p2}</p>
                            <p>{ta.p3}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] w-full"
                    >
                        {/* Main Image (Suit) */}
                        <div className="absolute top-0 right-0 w-[80%] h-[90%] rounded-[3rem] overflow-hidden border border-white/10 z-10 shadow-2xl">
                            <Image
                                src="/books/arkamsuit.png"
                                alt="Dr. Akram Ikni Professional"
                                fill
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                        </div>

                        {/* Overlapping Image (Physique) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute bottom-0 left-0 w-[55%] h-[60%] rounded-[2rem] overflow-hidden border-4 border-brand-dark z-20 shadow-[0_0_40px_rgba(236,54,66,0.15)]"
                        >
                            <Image
                                src="/books/AKRAMBAKI.png"
                                alt="Dr. Akram Ikni Physique"
                                fill
                                className="object-cover object-top"
                            />
                        </motion.div>

                        {/* Credential Badge */}
                        <div className="absolute top-12 -left-8 glass-panel p-6 rounded-3xl max-w-[200px] hidden md:block z-30 animate-float">
                            <div className="text-brand-red font-black text-4xl mb-1">6+</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-white/60">{ta.yearsLabel}</div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {credentials.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-red/30 transition-colors"
                        >
                            <item.icon className="text-brand-red mb-6" size={32} />
                            <h4 className="text-xl font-display font-bold mb-3">{item.label}</h4>
                            <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
