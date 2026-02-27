"use client";
import { motion } from 'motion/react';
import { Dumbbell, Utensils, Zap, MessageSquare, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

const services = [
  {
    title: "Custom Training",
    description: "Personalized workout plans tailored to your goals, equipment, and schedule. Evolve your physique with precision.",
    icon: Dumbbell,
    colSpan: "lg:col-span-2",
    delay: 0.1,
  },
  {
    title: "Precision Nutrition",
    description: "Macro-calculated meal plans designed for performance and body composition.",
    icon: Utensils,
    colSpan: "lg:col-span-1",
    delay: 0.2,
  },
  {
    title: "90-Day Challenge",
    description: "Our flagship transformation program for radical changes in 12 weeks.",
    icon: Zap,
    colSpan: "lg:col-span-1",
    delay: 0.3,
  },
  {
    title: "24/7 Support",
    description: "Direct access to Coach Akram for guidance, motivation, and adjustments. Never train alone.",
    icon: MessageSquare,
    colSpan: "lg:col-span-2",
    delay: 0.4,
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="absolute inset-0 bg-brand-gray/30 skew-y-[-2deg] origin-left" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-red uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-red" /> What We Do
            </h2>
            <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none">
              ENGINEERED FOR <br />
              <span className="font-serif italic font-light text-white/80">Results</span>
            </h3>
          </div>
          <p className="text-white/50 max-w-sm text-lg font-light">
            A scientific approach to bodybuilding and health optimization, designed to push you beyond your limits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "group glass-panel glass-panel-hover p-10 rounded-[2rem] flex flex-col justify-between relative overflow-hidden cursor-pointer",
                service.colSpan
              )}
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-brand-red">
                <ArrowUpRight size={32} strokeWidth={1.5} />
              </div>

              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/10 rounded-full blur-[60px] group-hover:bg-brand-red/20 transition-colors duration-700" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-brand-red/50 group-hover:text-brand-red transition-all duration-500">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h4 className="text-2xl font-display font-bold mb-4 tracking-tight">{service.title}</h4>
                <p className="text-white/50 text-base leading-relaxed font-light max-w-sm">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
