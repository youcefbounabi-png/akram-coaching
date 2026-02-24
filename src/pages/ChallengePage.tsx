import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Zap, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants';
import ProgressRing3D from '../components/3d/ProgressRing3D';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';
import promoCoaching from '../assets/promo-coaching.webp';


export default function ChallengePage() {
    const { t, isRTL } = useLanguage();
    const tc = t.challenge;

    const weeks = [
        { week: tc.w1, title: tc.w1Title, color: 'border-white/20', desc: tc.w1Desc },
        { week: tc.w2, title: tc.w2Title, color: 'border-brand-red/40', desc: tc.w2Desc },
        { week: tc.w3, title: tc.w3Title, color: 'border-orange-400/50', desc: tc.w3Desc },
        { week: tc.w4, title: tc.w4Title, color: 'border-yellow-400/50', desc: tc.w4Desc },
    ];

    const included = tc.includedList;

    const stats = [
        { value: '90', label: tc.statsDays, icon: Zap },
        { value: '+400', label: tc.statsGrads, icon: Trophy },
        { value: '96%', label: tc.statsSuccess, icon: Users },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden text-center md:text-start">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] md:text-[40vw] font-display font-black text-white/[0.025] select-none pointer-events-none leading-none z-0">
                    90
                </div>
                <div className={cn("absolute top-1/4 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none", isRTL ? "-left-32" : "-right-32")} />

                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: isRTL ? 40 : -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8">
                                <Zap size={14} fill="currentColor" aria-hidden="true" />
                                {tc.mostEffective}
                            </div>
                            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9] mb-8 uppercase">
                                {tc.headline}
                                <br />
                                <span className={cn("font-serif italic font-light text-brand-red", isRTL && "lowercase tracking-normal")}>
                                    {tc.headlineItalic}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: tc.descHtml }} />

                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-10" dir="ltr">
                                {stats.map(({ value, label, icon: Icon }) => (
                                    <div key={label} className="group cursor-default">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon size={16} className="text-brand-red" aria-hidden="true" />
                                            <span className="text-3xl font-display font-black group-hover:text-brand-red transition-colors">{value}</span>
                                        </div>
                                        <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/pricing" className="inline-flex items-center justify-center gap-3 bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 red-glow-strong group cursor-pointer">
                                    {tc.joinBtn}
                                </Link>
                                <a href={BRAND.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 glass-panel glass-panel-hover px-10 py-5 rounded-full font-bold text-lg cursor-pointer">
                                    {t.pricing.whatsappAlt}
                                </a>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: isRTL ? -40 : 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative h-auto rounded-[3rem] glass-panel overflow-hidden border-white/10 hidden lg:block group">
                            <img
                                src={promoCoaching}
                                alt="Akram Coaching 90 Day Challenge Promo"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-brand-gray/20 relative overflow-hidden" dir="ltr">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="container max-w-7xl mx-auto px-6" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="text-center mb-16">
                        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4">{tc.roadmapTag}</p>
                        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter">
                            {tc.roadmapTitle}{' '}
                            <span className="font-serif italic font-light text-brand-red">{tc.roadmapItalic}</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {weeks.map((w, i) => (
                            <motion.div key={w.week} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.12 }} viewport={{ once: true }} className={cn(`glass-panel glass-panel-hover rounded-2xl p-8 border-l-2 ${w.color} cursor-default`, isRTL && 'border-l-0 border-r-2')}>
                                <div className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2" dir="ltr">{w.week}</div>
                                <h3 className="text-2xl font-display font-bold mb-4">{w.title}</h3>
                                <p className="text-white/50 text-sm font-light leading-relaxed">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 relative">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center md:text-start">
                            <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4">{tc.includedTag}</p>
                            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 leading-none">
                                {tc.includedTitle}{' '}
                                <span className="font-serif italic font-light text-brand-red">{tc.includedItalic}</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4 text-start">
                                {included.map((item, i) => (
                                    <motion.div key={item} initial={{ opacity: 0, x: isRTL ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.2 }} viewport={{ once: true }} className="flex items-center gap-3 text-sm font-medium text-white/80">
                                        <CheckCircle2 size={18} className="text-brand-red shrink-0" aria-hidden="true" />
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="glass-panel rounded-[2.5rem] p-10 border-brand-red/20">
                            <div className="text-center mb-8">
                                <div className="text-xs font-bold text-brand-red uppercase tracking-widest mb-2">{tc.startingFrom}</div>
                                <div className="text-6xl font-display font-black" dir="ltr">18,000</div>
                                <div className="text-xl text-white/50 font-light" dir="ltr">DZD / {tc.months2}</div>
                            </div>
                            <div className="space-y-3 mb-8" dir="ltr">
                                <div className="flex justify-between text-sm border-b border-white/5 pb-3">
                                    <span className="text-white/60">Standard (2m)</span>
                                    <span className="font-bold">18,000 DZD</span>
                                </div>
                                <div className="flex justify-between text-sm border-b border-white/5 pb-3">
                                    <span className="text-white/60">Premium (3m)</span>
                                    <span className="font-bold text-brand-red">27,000 DZD</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Elite (6m)</span>
                                    <span className="font-bold">50,000 DZD</span>
                                </div>
                            </div>
                            <Link to="/pricing" className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-center hover:bg-brand-red/90 transition-colors block cursor-pointer red-glow">
                                {t.home.seePricing}
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
