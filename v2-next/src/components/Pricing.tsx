"use client";
import { motion } from 'motion/react';
import { Check, Star } from 'lucide-react';
import { BRAND } from '../constants';
import { cn } from '../lib/utils';

const plans = [
  {
    name: "Standard",
    duration: "2 Months",
    price: "18,000",
    currency: "DZD",
    features: [
      "Custom Nutrition Plan",
      "Detailed Training Program",
      "Cardio Schedule",
      "Goal-Specific Design",
      "Male & Female Friendly"
    ],
    popular: false
  },
  {
    name: "Premium",
    duration: "3 Months",
    price: "27,000",
    currency: "DZD",
    features: [
      "Full 3-Month Coaching",
      "Metabolic Optimization",
      "Weekly Program Updates",
      "Supplement Guidance",
      "24/7 Direct Support",
      "Daily Q&A Access"
    ],
    popular: true
  },
  {
    name: "Elite",
    duration: "6 Months",
    price: "50,000",
    currency: "DZD",
    features: [
      "Long-term Transformation",
      "Advanced Health Monitoring",
      "Full Lifestyle Integration",
      "Priority Support",
      "Monthly Goal Review",
      "All Premium Features"
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-brand-gray/20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-brand-red uppercase tracking-[0.3em] mb-4">Investment</h2>
          <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
            CHOOSE YOUR <br />
            <span className="font-serif italic font-light text-brand-red">Path</span>
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "relative p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col group",
                plan.popular 
                  ? "bg-brand-dark border border-brand-red/50 shadow-[0_0_40px_rgba(236,54,66,0.15)] lg:-translate-y-4" 
                  : "glass-panel glass-panel-hover"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-red to-red-600 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-[0_0_20px_rgba(236,54,66,0.4)]">
                  <Star size={12} fill="currentColor" />
                  Most Popular
                </div>
              )}

              <div className="mb-10 text-center">
                <h4 className={cn(
                  "text-2xl font-display font-bold mb-2",
                  plan.popular ? "text-white" : "text-white/80"
                )}>{plan.name}</h4>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red mb-8">{plan.duration}</div>
                
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-display font-black tracking-tighter">{plan.price}</span>
                  <span className="text-lg font-bold text-white/40">{plan.currency}</span>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 text-sm font-light">
                    <div className={cn(
                      "mt-0.5 p-1 rounded-full",
                      plan.popular ? "bg-brand-red/20 text-brand-red" : "bg-white/5 text-white/60"
                    )}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className={plan.popular ? "text-white/90" : "text-white/70"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={BRAND.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-full py-5 rounded-2xl font-bold text-sm tracking-widest uppercase text-center transition-all duration-300 active:scale-95",
                  plan.popular 
                    ? "bg-brand-red text-white hover:bg-brand-red/90 red-glow" 
                    : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                )}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
