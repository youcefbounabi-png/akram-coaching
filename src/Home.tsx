import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import Books from './components/Books';
import { BRAND } from './constants';
import { useLanguage } from './i18n/LanguageContext';

export default function Home() {
  const { t, isRTL } = useLanguage();
  const th = t.home;

  const funnel = [
    {
      icon: '🏋️',
      label: th.training,
      description: th.trainingDesc,
      href: '/services',
    },
    {
      icon: '🥗',
      label: th.nutrition,
      description: th.nutritionDesc,
      href: '/services',
    },
    {
      icon: '⚡',
      label: th.challenge90,
      description: th.challengeDesc,
      href: '/challenge',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Hero />

      {/* Conversion Funnel Teaser */}
      <section className="py-24 relative">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-4">
              <span className="w-8 h-px bg-brand-red" />
              {th.tagline}
              <span className="w-8 h-px bg-brand-red" />
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none">
              {th.headline}{' '}
              <span className="font-serif italic font-light text-brand-red">{th.headlineItalic}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {funnel.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={item.href}
                  className="group glass-panel glass-panel-hover p-8 rounded-[2rem] flex flex-col gap-4 h-full cursor-pointer block"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-brand-red transition-colors">{item.label}</h3>
                    <p className="text-white/50 text-sm font-light">{item.description}</p>
                  </div>
                  <div className={cn("mt-auto flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300", isRTL ? "translate-x-0 group-hover:-translate-x-1" : "translate-x-0 group-hover:translate-x-1")}>
                    {t.common.learnMore} <ArrowRight size={12} className={isRTL ? "rotate-180" : ""} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <ShieldCheck size={14} aria-hidden="true" />
              {th.limitedSpots}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-3 bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 red-glow-strong group cursor-pointer"
              >
                {th.seePricing}
                <ArrowRight size={20} className={cn("transition-transform", isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1")} aria-hidden="true" />
              </Link>
              <Link
                to="/transformations"
                className="inline-flex items-center gap-3 glass-panel glass-panel-hover px-10 py-5 rounded-full font-bold text-lg cursor-pointer"
              >
                {th.viewTransformations}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* E-Books & Resources */}
      <Books />

      {/* Stats Bar */}
      <section className="py-16 border-t border-white/5" dir="ltr">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {BRAND.stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl md:text-5xl font-display font-black text-white group-hover:text-brand-red transition-colors duration-300">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-[0.15em] mt-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// Small helper since I used it above
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
