import { motion } from 'motion/react';
import { BRAND } from '../constants';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { t, lang, toggleLang, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/services' },
    { name: t.nav.challenge, href: '/challenge' },
    { name: t.nav.transformations, href: '/transformations' },
    { name: t.nav.pricing, href: '/pricing' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        scrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.2)]' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Coach Akram Home">
          <img
            src={BRAND.logo}
            alt={BRAND.name}
            className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
          />
          <div className="hidden sm:block">
            <span className="block text-lg font-display font-bold leading-none tracking-tight">AKRAM</span>
            <span className="block text-[10px] text-brand-red font-bold uppercase tracking-[0.3em]">Coach</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-xs font-bold uppercase tracking-[0.15em] transition-colors relative group py-2 cursor-pointer',
                isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white'
              )}
            >
              {link.name}
              <span className={cn(
                'absolute bottom-0 left-0 h-px bg-brand-red transition-all duration-300',
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              )} />
            </Link>
          ))}

          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-white/50 hover:text-white px-3 py-1.5 rounded-full border border-white/10 glass-panel transition-all text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <a
            href={BRAND.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-red hover:bg-brand-red/90 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(236,54,66,0.4)] cursor-pointer"
            aria-label="Join Now via WhatsApp"
          >
            <Phone size={14} aria-hidden="true" />
            {t.nav.joinNow}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-brand-dark/98 backdrop-blur-xl border-b border-white/10 p-6 md:hidden shadow-2xl"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-xl font-display font-bold transition-colors cursor-pointer',
                  isActive(link.href) ? 'text-brand-red' : 'text-white hover:text-brand-red'
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={BRAND.socials.whatsapp}
              className="bg-brand-red text-white p-4 rounded-xl text-center font-bold text-lg mt-4 hover:bg-brand-red/90 transition-colors cursor-pointer"
            >
              {t.nav.joinNow}
            </a>

            <button
              onClick={() => { toggleLang(); setIsOpen(false); }}
              className="glass-panel text-white p-4 rounded-xl text-center font-bold text-sm mt-2 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Globe size={16} />
              {t.nav.switchToAlt}
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
