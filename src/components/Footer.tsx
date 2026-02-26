import { BRAND } from '../constants';
import { Instagram, Facebook, Youtube, Send, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const tf = t.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark pt-32 pb-12 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Massive Background Text */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center opacity-[0.03]">
        <span className="text-[20vw] font-display font-black leading-[0.7] whitespace-nowrap">AKRAM</span>
      </div>

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <img src={BRAND.logo} alt={BRAND.name} className="h-12 w-auto" />
              <div>
                <span className="block text-2xl font-display font-bold leading-none tracking-tight">AKRAM</span>
                <span className="block text-xs text-brand-red font-bold uppercase tracking-[0.3em]">Coach</span>
              </div>
            </div>
            <p className="text-white/50 max-w-md mb-8 leading-relaxed font-light">
              {tf.desc}
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: BRAND.socials.instagram },
                { icon: Facebook, href: BRAND.socials.facebook },
                { icon: Youtube, href: BRAND.socials.youtube },
                { icon: Send, href: BRAND.socials.telegram },
                { icon: MessageCircle, href: BRAND.socials.whatsapp },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-red hover:border-brand-red hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,54,66,0.3)]"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">{tf.quickLinks}</h4>
            <ul className="space-y-4 text-white/70 font-light">
              <li><Link to="/" className="hover:text-brand-red transition-colors">{tf.links.home}</Link></li>
              <li><Link to="/transformations" className="hover:text-brand-red transition-colors">{tf.links.transformations}</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-red transition-colors">{tf.links.pricing}</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-colors">{tf.links.about}</Link></li>
              <li><Link to="/services" className="hover:text-brand-red transition-colors">{tf.links.services}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">{tf.links.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-8">{tf.contact}</h4>
            <ul className="space-y-6 text-white/70 font-light">
              <li className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">WhatsApp</span>
                <a href={BRAND.socials.whatsapp} className="text-lg hover:text-white transition-colors">+213 783 76 62 09</a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">{tf.location}</span>
                <span className="text-lg">{tf.locationVal}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-white/40 text-sm font-light">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>© {currentYear} {BRAND.name}. {tf.rights}</p>
            <span className="hidden sm:block text-white/20">·</span>
            <p className="text-white/25 text-xs tracking-wide">
              Designed &amp; Built with <span className="text-brand-red/60">♥</span> by{' '}
              <a href="https://www.instagram.com/youcef.dev_" target="_blank" rel="noopener noreferrer" className="text-white/40 font-medium hover:text-brand-red transition-colors duration-300">
                Youcef.dev_
              </a>
            </p>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">{tf.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{tf.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
