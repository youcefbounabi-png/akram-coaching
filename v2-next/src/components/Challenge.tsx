"use client";
import { motion } from 'motion/react';
import { BRAND } from '../constants';
import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import ProgressRing3D from './3d/ProgressRing3D';

export default function Challenge() {
  const benefits = [
    "Customized Nutrition Protocol",
    "Advanced Training Methodology",
    "Weekly Progress Audits",
    "Direct WhatsApp Access",
    "Supplement Optimization",
    "Mindset & Habit Coaching"
  ];

  return (
    <section id="challenge" className="py-32 relative overflow-hidden">
      {/* Massive Background Number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-black text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter z-0">
        90
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel rounded-[3rem] overflow-hidden border-white/10 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-12 md:p-20 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-red/10 to-transparent opacity-50" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-brand-red font-bold uppercase tracking-[0.2em] text-xs mb-8">
                  <Zap size={16} fill="currentColor" />
                  Most Effective Program
                </div>
                
                <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                  The 90-Day <br />
                  <span className="font-serif italic font-light text-brand-red lowercase tracking-normal">Challenge</span>
                </h2>
                
                <p className="text-white/60 text-lg mb-12 leading-relaxed font-light">
                  Our flagship program designed for those who are serious about radical transformation. We don't just change your body; we re-engineer your lifestyle using science and championship experience.
                </p>

                <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4 mb-14">
                  {benefits.map((benefit, i) => (
                    <motion.div 
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm font-medium text-white/80"
                    >
                      <CheckCircle2 size={20} className="text-brand-red shrink-0" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <a 
                  href={BRAND.socials.whatsapp}
                  className="inline-flex items-center gap-3 bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 red-glow-strong group"
                >
                  APPLY FOR CHALLENGE
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="relative min-h-[500px] lg:min-h-full overflow-hidden bg-brand-dark/50">
              <ProgressRing3D />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-dark/90 lg:via-brand-dark/20 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
