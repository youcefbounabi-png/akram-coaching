import { motion } from 'motion/react';
import { BRAND } from '../constants';
import { Send, MessageSquare, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="glass-panel rounded-[3rem] p-12 md:p-20 relative overflow-hidden border-white/10"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-sm font-bold text-brand-red uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-brand-red" /> Get in Touch
              </h2>
              <h3 className="text-5xl md:text-7xl font-display font-black mb-8 leading-none tracking-tighter">
                READY TO <br />
                <span className="font-serif italic font-light text-brand-red">Evolve?</span>
              </h3>
              <p className="text-white/60 text-lg mb-12 max-w-md font-light">
                Don't wait for the perfect moment. Take the first step today and let's build the best version of you.
              </p>

              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:scale-110 group-hover:border-brand-red/50 transition-all duration-500">
                    <MessageSquare size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">WhatsApp Support</h4>
                    <p className="text-white/50 mb-3 font-light">Direct chat for inquiries and coaching.</p>
                    <a href={BRAND.socials.whatsapp} className="text-brand-red font-bold hover:underline tracking-wide">Chat with us &rarr;</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:scale-110 group-hover:border-brand-red/50 transition-all duration-500">
                    <MapPin size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Global Presence</h4>
                    <p className="text-white/50 font-light">Operating in Algeria & Qatar. Coaching worldwide.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] rounded-[2.5rem] p-10 border border-white/10 backdrop-blur-md">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+213 ..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Select Goal</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light appearance-none">
                    <option className="bg-brand-dark">Muscle Building</option>
                    <option className="bg-brand-dark">Fat Loss</option>
                    <option className="bg-brand-dark">90-Day Challenge</option>
                    <option className="bg-brand-dark">General Health</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your goals..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red focus:bg-white/10 transition-all font-light resize-none"
                  />
                </div>

                <button className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-red/90 transition-all flex items-center justify-center gap-3 red-glow-strong group mt-4">
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
