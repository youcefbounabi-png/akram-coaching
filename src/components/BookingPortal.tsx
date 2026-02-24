import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND } from '../constants';

export default function BookingPortal() {
  const dates = [
    { day: "Mon", date: "24", active: false },
    { day: "Tue", date: "25", active: true },
    { day: "Wed", date: "26", active: false },
    { day: "Thu", date: "27", active: false },
  ];

  const times = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <ShieldCheck size={14} />
              Limited Availability
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter leading-none">
              SECURE YOUR <br />
              <span className="font-serif italic font-light text-brand-red text-glow">Consultation</span>
            </h2>
            
            <p className="text-white/60 text-lg mb-10 font-light leading-relaxed">
              Ready to commit? Book a direct 1-on-1 strategy call with Dr. Akram to map out your exact transformation protocol. Spots are highly limited.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-brand-dark overflow-hidden bg-brand-gray">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover grayscale" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/50">
                <strong className="text-white">400+</strong> athletes transformed
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="holo-panel rounded-[2.5rem] p-8 md:p-10"
          >
            <div className="relative z-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-bold">Select Date</h3>
                <div className="flex items-center gap-2 text-brand-red text-sm font-bold">
                  <Calendar size={16} />
                  February
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-10">
                {dates.map((d, i) => (
                  <div 
                    key={i}
                    className={`p-4 rounded-2xl border text-center cursor-pointer transition-all duration-300 ${
                      d.active 
                        ? "bg-brand-red border-brand-red text-white shadow-[0_0_20px_rgba(236,54,66,0.3)]" 
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xs uppercase tracking-widest mb-1">{d.day}</div>
                    <div className="text-2xl font-display font-bold">{d.date}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-bold">Available Times</h3>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <Clock size={16} />
                  GMT+1
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                {times.map((time, i) => (
                  <div 
                    key={i}
                    className={`py-3 px-4 rounded-xl border text-center text-sm font-bold cursor-pointer transition-all duration-300 ${
                      i === 1 
                        ? "bg-brand-red/20 border-brand-red text-brand-red" 
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {time}
                  </div>
                ))}
              </div>

              <a 
                href={BRAND.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-red/90 transition-all flex items-center justify-center gap-3 red-glow-strong group"
              >
                CONFIRM BOOKING
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
