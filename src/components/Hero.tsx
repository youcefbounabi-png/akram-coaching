import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND } from '../constants';
import { ArrowRight, Play, ShieldCheck, X, Youtube } from 'lucide-react';
import FloatingHero from './3d/FloatingHero';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  const th = t.hero;

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-bg-img-container',
      { opacity: 0, x: isRTL ? -100 : 100 },
      { opacity: 1, x: 0, duration: 2, ease: 'power3.out' }, 0)
      .fromTo('.hero-bg-img',
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 0.9, duration: 2.5, ease: 'power2.out' }, 0)
      .fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5)
      .fromTo('.hero-title-line', { opacity: 0, y: 50, rotateX: -45 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.15, ease: 'power4.out' }, 0.7)
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.0)
      .fromTo('.hero-cta', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, 1.2)
      .fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 1.4);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000"
    >
      {/* ── Background Portrait ─────────────────────────────────────────── */}
      {/* English: image anchored RIGHT, fades out on the left edge         */}
      {/* Arabic:  image anchored LEFT,  fades out on the right edge        */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className={cn(
            'absolute top-0 h-full w-[120%] opacity-0 hero-bg-img-container lg:w-[65%]',
            isRTL
              ? '-right-[10%] lg:right-auto lg:left-0 xl:left-[-2.5rem]'   // Arabic: left side
              : '-left-[10%]  lg:left-auto  lg:right-0 xl:right-[-2.5rem]' // English: right side
          )}
          style={{
            // mask fades from the INNER edge (toward text) to transparent
            WebkitMaskImage: `linear-gradient(to ${isRTL ? 'left' : 'right'}, transparent 0%, rgba(0,0,0,0.05) 15%, black 45%, black 100%)`,
            maskImage: `linear-gradient(to ${isRTL ? 'left' : 'right'}, transparent 0%, rgba(0,0,0,0.05) 15%, black 45%, black 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50 z-10" />
          <div className="absolute inset-0 bg-brand-red/20 mix-blend-multiply z-10" />
          <img
            src="/herorenwed.png"
            alt="Dr. Akram Ikni"
            className="w-full h-full object-cover object-center hero-bg-img grayscale mix-blend-luminosity opacity-0"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Ambient glows — mirror to stay near the text side */}
        <div className={cn('absolute top-1/4 w-[600px] h-[600px] ambient-glow opacity-60', isRTL ? '-right-32' : '-left-32')} />
        <div className={cn('absolute bottom-0  w-[800px] h-[800px] ambient-glow opacity-40', isRTL ? 'left-0' : 'right-0')} />
      </div>

      {/* ── 3D Crystal ─────────────────────────────────────────────────── */}
      {/* Crystal floats on the TEXT side (left in EN, right in AR)        */}
      <FloatingHero isRTL={isRTL} />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* max-w-3xl: in LTR aligns left, in RTL aligns right — automatic */}
        <div className="max-w-3xl">

          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-red/30 text-brand-red text-xs font-bold uppercase mb-8 shadow-[0_0_20px_rgba(236,54,66,0.2)]">
            <ShieldCheck size={14} />
            {th.badge}
          </div>

          <h1 className="text-[12vw] lg:text-[8rem] font-display font-black leading-[0.85] mb-8 uppercase [transform-style:preserve-3d]">
            <div className="hero-title-line origin-bottom">{th.line1}</div>
            <div className="hero-title-line origin-bottom">
              <span className={cn('font-serif italic font-light text-brand-red text-glow lowercase', isRTL ? 'pl-4' : 'pr-4')}>
                {th.line2}
              </span>
            </div>
            <div className="hero-title-line origin-bottom">{th.line3}</div>
          </h1>

          <p
            className="hero-desc text-lg md:text-xl text-white/60 max-w-xl mb-12 leading-relaxed font-light"
            dangerouslySetInnerHTML={{
              __html: th.desc
                .replace('3x Bodybuilding Champion', '<strong class="text-white font-medium">3x Bodybuilding Champion</strong>')
                .replace('بطل كمال الأجسام 3 مرات', '<strong class="text-white font-medium">بطل كمال الأجسام 3 مرات</strong>')
                .replace('Doctor of Pharmacy', '<strong class="text-white font-medium">Doctor of Pharmacy</strong>')
                .replace('ودكتور في الصيدلة', '<strong class="text-white font-medium">ودكتور في الصيدلة</strong>'),
            }}
          />

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="#pricing"
              className="hero-cta w-full sm:w-auto bg-brand-red text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all duration-500 hover:scale-105 active:scale-95 red-glow-strong group overflow-hidden relative cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                {th.start}
                <ArrowRight size={20} className={cn('transition-transform', isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1')} />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="hero-cta w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-5 rounded-full glass-panel glass-panel-hover group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(236,54,66,0.5)]">
                <Play size={18} fill="currentColor" className="ml-1" />
              </div>
              <span className="font-bold">{th.watch}</span>
            </button>
          </div>

          {/* Stats — kept dir=ltr so numbers always render left-to-right */}
          <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-8 border-t border-white/10 pt-10" dir="ltr">
            {BRAND.stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="hero-stats group">
                <div className="text-3xl md:text-4xl font-display font-black text-white group-hover:text-brand-red transition-colors duration-300">{stat.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-[0.15em] mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Video Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 md:pt-20 pb-4 bg-black/80 backdrop-blur-xl"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-auto max-h-[90vh] rounded-2xl overflow-hidden glass-panel border border-brand-red/30 shadow-[0_0_50px_rgba(236,54,66,0.15)] flex flex-col"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className={cn('absolute top-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-red hover:border-brand-red transition-colors', isRTL ? 'left-4' : 'right-4')}
              >
                <X size={18} />
              </button>
              <div className="w-full bg-black relative aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/NU3fqbuaxbQ?autoplay=1&mute=0"
                  title="Dr. Akram Ikni - Masterclass"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="bg-brand-dark/95 border-t border-brand-red/20 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className={cn('text-center', isRTL ? 'md:text-right' : 'md:text-left')}>
                  <h4 className="text-white font-display font-bold text-lg md:text-xl">{th.subscribe}</h4>
                  <p className="text-white/60 text-sm font-light">Join the community for elite coaching insights and tutorials.</p>
                </div>
                <a
                  href="https://www.youtube.com/@Dr_Akramikni/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-[#FF0000] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:bg-red-600 transition-colors active:scale-95 whitespace-nowrap"
                >
                  <Youtube size={20} />
                  {th.subscribe}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
