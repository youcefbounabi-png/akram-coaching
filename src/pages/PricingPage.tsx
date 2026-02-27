import { useState, useMemo } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { motion } from 'motion/react';
import { Check, Star, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../constants';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import ClientIntakeModal from '../components/ClientIntakeModal';

type Currency = 'dzd' | 'eur' | 'usd';

interface Plan {
    id: string;
    name: string;
    subName: string;
    duration: string;
    price: Record<Currency, string>;
    priceNumeric: Record<Currency, number>;
    paypalPlanId: string;
    chargelyUrl: string;
    features: string[];
    popular: boolean;
}

export default function PricingPage() {
    const { t, isRTL } = useLanguage();
    const tp = t.pricing;
    const [currency, setCurrency] = useState<Currency>('dzd');
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const currencyLabel: Record<Currency, string> = {
        dzd: 'DZD',
        eur: '€',
        usd: '$',
    };

    const tf = tp.plans.features;

    const plans = [
        {
            id: 'standard',
            name: tp.plans.p1Name,
            subName: tp.plans.p1Sub,
            duration: tp.duration2,
            price: { dzd: '18,000', eur: '110', usd: '120' },
            priceNumeric: { dzd: 18000, eur: 110, usd: 120 },
            paypalPlanId: 'PLAN_STANDARD_ACTIVE',
            chargelyUrl: '#',
            features: [
                tf.dietTailored,
                tf.trainingVideos,
                tf.cardioTiming,
                tf.customGoals,
                tf.maleFemale,
            ],
            popular: false,
        },
        {
            id: 'premium',
            name: tp.plans.p2Name,
            subName: tp.plans.p2Sub,
            duration: tp.duration3,
            price: { dzd: '27,000', eur: '160', usd: '175' },
            priceNumeric: { dzd: 27000, eur: 160, usd: 175 },
            paypalPlanId: 'PLAN_PREMIUM_ACTIVE',
            chargelyUrl: '#',
            features: [
                tf.monitoring3,
                tf.healthChecks,
                tf.onlineFollowup,
                tf.cardioTiming,
                tf.supplements,
                tf.customGoals,
                tf.dailyFollowup,
                tf.maleFemale,
            ],
            popular: true,
        },
        {
            id: 'elite',
            name: tp.plans.p3Name,
            subName: tp.plans.p3Sub,
            duration: tp.duration6,
            price: { dzd: '50,000', eur: '290', usd: '320' },
            priceNumeric: { dzd: 50000, eur: 290, usd: 320 },
            paypalPlanId: 'PLAN_ELITE_ACTIVE',
            chargelyUrl: '#',
            features: [
                tf.monitoring6,
                tf.healthChecks,
                tf.onlineFollowup6,
                tf.cardioTiming,
                tf.supplements,
                tf.customGoals,
                tf.dailyFollowup,
                tf.maleFemale,
            ],
            popular: false,
        },
    ];

    const openModal = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Page Hero */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-4">
                            <span className="w-8 h-px bg-brand-red" />
                            {tp.tagline}
                            <span className="w-8 h-px bg-brand-red" />
                        </p>
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none mb-8">
                            {tp.headline}
                            <br />
                            <span className="font-serif italic font-light text-brand-red">{tp.headlineItalic}</span>
                        </h1>
                        <p className="text-lg text-white/60 max-w-xl mx-auto font-light mb-10">
                            {tp.subtitle}
                        </p>

                        {/* Currency Toggle */}
                        <div className="inline-flex items-center gap-1 glass-panel p-1 rounded-full mb-2">
                            {(['dzd', 'eur', 'usd'] as Currency[]).map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCurrency(c)}
                                    className={cn(
                                        'px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer',
                                        currency === c ? 'bg-brand-red text-white' : 'text-white/60 hover:text-white'
                                    )}
                                >
                                    {c.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Plans Grid */}
            <section className="py-10 pb-24">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {plans.map((plan, i) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                onMouseEnter={() => setHoveredPlan(plan.id)}
                                onMouseLeave={() => setHoveredPlan(null)}
                                className={cn(
                                    'relative p-10 rounded-[2.5rem] flex flex-col transition-all duration-500 cursor-default',
                                    plan.popular
                                        ? 'bg-brand-dark border border-brand-red/50 shadow-[0_0_60px_rgba(236,54,66,0.12)] lg:-translate-y-4'
                                        : 'glass-panel',
                                    hoveredPlan === plan.id && !plan.popular && 'border-white/15 shadow-[0_0_40px_rgba(236,54,66,0.05)]'
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-red to-red-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-[0_0_20px_rgba(236,54,66,0.5)] whitespace-nowrap z-20">
                                        <Star size={10} fill="currentColor" aria-hidden="true" />
                                        {tp.mostPopular}
                                    </div>
                                )}

                                {/* Header */}
                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-display font-bold mb-1">{plan.name}</h2>
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{plan.subName}</div>
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red mb-6">{plan.duration}</div>
                                    <motion.div
                                        key={currency}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-baseline justify-center gap-2"
                                        dir="ltr"
                                    >
                                        <span className="text-5xl font-display font-black tracking-tighter">
                                            {currency !== 'dzd' && currencyLabel[currency]}{plan.price[currency]}
                                        </span>
                                        {currency === 'dzd' && <span className="text-base font-bold text-white/40">DZD</span>}
                                    </motion.div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-4 mb-10 flex-grow" role="list">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-3 text-sm font-light">
                                            <div className={cn(
                                                'mt-0.5 p-1 rounded-full shrink-0',
                                                plan.popular ? 'bg-brand-red/20 text-brand-red' : 'bg-white/5 text-white/50'
                                            )}>
                                                <Check size={11} strokeWidth={3} aria-hidden="true" />
                                            </div>
                                            <span className={plan.popular ? 'text-white/90' : 'text-white/60'}>{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={() => openModal(plan)}
                                        className={cn(
                                            'w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase text-center flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-95',
                                            plan.popular
                                                ? 'bg-brand-red text-white hover:bg-brand-red/90 red-glow'
                                                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                                        )}
                                    >
                                        {tp.startJourney}
                                    </button>
                                    <a
                                        href={BRAND.socials.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 rounded-2xl text-sm text-white/40 hover:text-white text-center transition-colors cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <ArrowRight size={12} aria-hidden="true" className={isRTL ? 'rotate-180' : ''} />
                                        {tp.whatsappAlt}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-16 bg-brand-gray/20">
                <div className="container max-w-4xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: Shield, title: tp.securePayments, desc: tp.secureDesc },
                            { icon: Check, title: tp.satisfaction, desc: tp.satisfactionDesc },
                            { icon: Star, title: tp.clients, desc: tp.clientsDesc },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex flex-col items-center gap-3 cursor-default">
                                <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
                                    <Icon size={20} aria-hidden="true" />
                                </div>
                                <h3 className="font-bold text-white">{title}</h3>
                                <p className="text-white/50 text-sm font-light">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Teaser */}
            <section className="py-12 pb-24">
                <div className="container max-w-3xl mx-auto px-6 text-center">
                    <p className="text-white/50 text-lg font-light">
                        {tp.faqCta}{' '}
                        <Link to="/contact" className="text-brand-red font-bold hover:underline cursor-pointer">
                            {tp.contactUs}
                        </Link>{' '}
                        {tp.faqSuffix}
                    </p>
                </div>
            </section>

            {/* Intake Modal - dynamically pass plan info */}
            {isModalOpen && (
                <PayPalScriptProvider options={{
                    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "Ab57hKkXq-8l773whAGEYYUIwMjAKOSKBpChu0aKn4KYWPr3lHEPWzLvwEplJEORrBl2PQHzM44y4Skd",
                    currency: currency.toUpperCase(),
                    intent: "capture",
                }}>
                    <ClientIntakeModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        planName={selectedPlan?.name || ''}
                        planPrice={selectedPlan ? `${currency !== 'dzd' ? currencyLabel[currency] : ''}${selectedPlan.price[currency]} ${currency === 'dzd' ? 'DZD' : ''}` : ''}
                        planPriceNumeric={selectedPlan?.priceNumeric[currency] || 0}
                        planCurrency={currency.toUpperCase()}
                    />
                </PayPalScriptProvider>
            )}
        </motion.div>
    );
}
