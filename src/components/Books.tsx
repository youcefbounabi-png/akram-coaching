import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BookOpen, ShoppingCart, Info, X, MessageCircle, Truck } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ImmersiveCTA from './ui/ImmersiveCTA';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';
import { BRAND, ALGERIAN_STATES } from '../constants';

interface BooksProps {
    variant?: 'section' | 'full';
}

export default function Books({ variant = 'section' }: BooksProps) {
    const { t, isRTL } = useLanguage();
    const tb = t.books;
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeBook, setActiveBook] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeBook !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [activeBook]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 3 books = 300vw total width
    const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", isRTL ? "66.66%" : "-66.66%"]);

    // Parallax background text
    const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", isRTL ? "-20%" : "20%"]);

    const books = [
        {
            title: tb.b1Title,
            desc: tb.b1Desc,
            longDesc: tb.b1LongDesc,
            price: tb.b1Price,
            originalPrice: tb.b1OriginalPrice,
            image: "/books/book-1.png",
            glow: "rgba(236,54,66,0.3)"
        },
        {
            title: tb.b2Title,
            desc: tb.b2Desc,
            longDesc: tb.b2LongDesc,
            price: tb.b2Price,
            originalPrice: tb.b2OriginalPrice,
            image: "/books/newbook (1).png",
            glow: "rgba(255,255,255,0.15)",
            scale: 0.93
        },
        {
            title: tb.b3Title,
            desc: tb.b3Desc,
            longDesc: tb.b3LongDesc,
            price: tb.b3Price,
            originalPrice: tb.b3OriginalPrice,
            image: "/books/newbook (2).png",
            glow: "rgba(236,54,66,0.15)",
            scale: 0.93
        }
    ];

    return (
        <>
            {/* ── Books Hero Decision ─────────────────────────────────── */}
            {variant === 'full' ? (
                <section className="relative h-[85vh] w-full overflow-hidden bg-brand-dark" id="books-3d-hero">
                    {/* Background Image with Overlay */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
                        style={{
                            backgroundImage: "url('/books/books-hero-bg.png')",
                            filter: "brightness(0.6)"
                        }}
                    />

                    {/* Nebula Background Effect */}
                    <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                                x: [0, 100, 0],
                                y: [0, -50, 0]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-red/20 rounded-full blur-[120px] opacity-30"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, -45, 0],
                                x: [0, -120, 0],
                                y: [0, 80, 0]
                            }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px] opacity-20"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                x: [0, 50, 0],
                                y: [0, 100, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brand-red/10 rounded-full blur-[150px] opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark" />
                    </div>

                    {/* Overlay content - immediately visible without 3D loading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none pt-20"
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <div className="max-w-5xl mx-auto text-center mt-auto pb-12">
                            <p className="text-[10px] font-bold text-brand-red uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-4">
                                <span className="w-10 h-px bg-brand-red" />
                                {tb.tagline || 'Exclusive Collection'}
                                <span className="w-10 h-px bg-brand-red" />
                            </p>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight mb-4 drop-shadow-2xl">
                                {tb.headline || 'Premium Books'} <span className="font-serif italic font-light text-brand-red">{tb.headlineItalic}</span>
                            </h2>
                            <p className="text-white/70 text-base md:text-xl font-light max-w-2xl mx-auto mb-10 drop-shadow-md">
                                {tb.subtitle || 'Explore our handcrafted collection of physical guidebooks.'}
                            </p>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-white/50"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mx-auto"><path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            ) : (
                <section
                    className="pt-24 pb-12 relative overflow-hidden bg-brand-dark"
                    id="books-simple-header"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                    }}
                >
                    <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-4"
                        >
                            <span className="w-8 h-px bg-brand-red" />
                            {tb.tagline}
                            <span className="w-8 h-px bg-brand-red" />
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-none mb-6"
                        >
                            {tb.headline} <span className="font-serif italic font-light text-brand-red">{tb.headlineItalic}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto"
                        >
                            {tb.subtitle}
                        </motion.p>
                    </div>
                </section>
            )}

            {/* ── Horizontal Parallax Book Slides ─────────────────────── */}
            <section ref={containerRef} id="e-books" className="h-[300vh] relative bg-brand-dark" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

                    {/* Global Vignette */}
                    <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(5,5,5,1)]" />

                    {/* Horizontal Scroll Track */}
                    <motion.div
                        style={{ x: xTransform, willChange: 'transform' }}
                        className="flex h-full w-[300vw] relative z-10"
                    >
                        {books.map((book, i) => (
                            <div key={i} className="w-[100vw] h-screen flex items-center justify-center relative px-4 md:px-12 shrink-0">

                                {/* Giant Parallax Background Typography - Hide on mobile for performance */}
                                <motion.div
                                    className="hidden md:block absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-[15vw] md:text-[12vw] font-display font-black uppercase text-transparent whitespace-nowrap pointer-events-none opacity-20"
                                    style={{
                                        WebkitTextStroke: '2px rgba(255,255,255,0.15)',
                                        x: bgTextX,
                                        paddingLeft: isRTL ? 0 : `${i * 30}vw`,
                                        paddingRight: isRTL ? `${i * 30}vw` : 0
                                    }}
                                >
                                    {book.title}
                                </motion.div>

                                {/* ── Book + Info Panel (tightly coupled) ── */}
                                <div className="w-full max-w-5xl mx-auto relative z-30 h-full flex items-center py-16">

                                    {/* The glass panel is the main container */}
                                    <div
                                        className={cn(
                                            "w-full glass-panel p-6 md:p-10 lg:p-12 rounded-[2rem] relative overflow-visible",
                                            isRTL ? "md:mr-0 md:ml-auto md:w-[65%] md:pr-12" : "md:ml-0 md:mr-auto md:w-[65%] md:pl-12"
                                        )}
                                        style={{ backdropFilter: 'blur(20px)' }}
                                    >
                                        {/* Book Image — absolutely positioned, overlapping the panel edge */}
                                        <div className={cn(
                                            "hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-40",
                                            isRTL ? "-left-[240px] lg:-left-[300px] xl:-left-[340px]" : "-right-[240px] lg:-right-[300px] xl:-right-[340px]"
                                        )}>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] blur-[80px] md:blur-[120px] rounded-full pointer-events-none opacity-60 md:opacity-100" style={{ backgroundColor: book.glow }} />

                                            <div
                                                className="relative w-[260px] lg:w-[320px] xl:w-[340px] animate-float cursor-pointer group"
                                                style={{ scale: (book as any).scale || 1 }}
                                                onClick={() => setActiveBook(i)}
                                            >
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-auto rounded-lg shadow-[0_40px_80px_rgba(0,0,0,0.8),_0_0_40px_rgba(255,255,255,0.1)] transition-transform duration-700 group-hover:scale-105"
                                                />
                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-500 flex items-center justify-center ring-1 ring-white/10 group-hover:ring-white/30">
                                                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                                        <Info size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile: Book image inline above the text */}
                                        <div className="flex md:hidden items-center justify-center mb-6">
                                            <div className="relative w-[180px] cursor-pointer group" style={{ scale: (book as any).scale || 1 }} onClick={() => setActiveBook(i)}>
                                                <img src={book.image} alt={book.title} loading="lazy" decoding="async" className="w-full h-auto rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.7),_0_0_20px_rgba(255,255,255,0.1)] ring-1 ring-white/5" />
                                            </div>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 mb-3 w-fit bg-white/5">
                                            <BookOpen size={10} className="text-brand-red" /> {isRTL ? 'كتاب مطبوع' : 'Premium Physical Book'}
                                        </div>

                                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-black leading-tight text-white mb-3 drop-shadow-lg">
                                            {book.title}
                                        </h3>

                                        <p className="text-white/60 text-xs md:text-base font-light leading-relaxed mb-6">
                                            {book.desc}
                                        </p>

                                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-5 border-t border-white/10">
                                            <div className="flex flex-row sm:flex-col items-baseline sm:items-start justify-between sm:justify-center w-full sm:w-auto gap-3">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold mb-1">Investment</span>
                                                <div className="text-3xl lg:text-4xl font-display font-black text-white leading-none drop-shadow-md">{book.price}</div>
                                                {book.originalPrice && (
                                                    <span className="text-sm text-white/30 line-through decoration-brand-red/50 decoration-2 font-medium mt-1">{book.originalPrice}</span>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => setActiveBook(i)}
                                                className="w-full sm:w-auto px-7 py-4 rounded-full font-bold tracking-[0.2em] uppercase text-xs transition-all duration-500 bg-brand-red text-white hover:bg-red-600 red-glow-strong flex items-center justify-center gap-3 cursor-pointer group hover:scale-105 active:scale-95 border border-red-500/50"
                                            >
                                                <ShoppingCart size={16} />
                                                {tb.cta}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </motion.div>

                </div>

                {/* Quick View & Checkout Modal */}
                <AnimatePresence>
                    {activeBook !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-3xl"
                            onClick={() => setActiveBook(null)}
                        >
                            {/* X button — outside overflow-hidden, always fully visible */}
                            <button
                                onClick={() => setActiveBook(null)}
                                className="fixed top-5 right-5 z-[300] w-14 h-14 rounded-full bg-[#111] border-2 border-white/40 text-white flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                                aria-label="Close modal"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-6xl glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row max-h-[95vh] border border-white/10 shadow-[0_0_100px_rgba(236,54,66,0.15)]"
                            >
                                <div className="w-full md:w-[45%] h-[35vh] md:h-auto shrink-0 relative flex items-center justify-center bg-[#050505] overflow-hidden group">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[120px] pointer-events-none opacity-60" style={{ backgroundColor: books[activeBook].glow }} />
                                    <img src={books[activeBook].image} alt={books[activeBook].title} loading="eager" className="w-[75%] h-auto object-contain relative z-10 drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] transform transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20 md:hidden" />
                                </div>

                                <div className="w-full md:w-[55%] p-5 md:p-10 lg:p-14 flex flex-col justify-start bg-gradient-to-br from-[#0a0a0a] to-[#111] h-[65vh] md:h-[80vh] overflow-y-auto hide-scrollbar relative">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-red/30 text-[9px] font-bold uppercase tracking-[0.2em] text-brand-red mb-4 w-fit bg-brand-red/5">
                                        <BookOpen size={10} /> {isRTL ? 'تفاصيل الكتاب' : 'Book Details'}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-display font-black mb-4 leading-tight text-white drop-shadow-md">{books[activeBook].title}</h3>

                                    <BookCheckoutFlow
                                        book={books[activeBook]}
                                        isRTL={isRTL}
                                        t={tb}
                                        onClose={() => setActiveBook(null)}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Quiet, Immersive Global Books CTA (Only on Books Page) */}
            {variant === 'full' && (
                <ImmersiveCTA
                    title={tb.ctaTitle}
                    subtitle={tb.ctaSubtitle}
                    buttonText={tb.ctaButton}
                    showBeams={false}
                    onClick={() => {
                        const el = document.getElementById('e-books');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                />
            )}
        </>
    );
}

/**
 * Sub-component for handling the book checkout flow
 */
function BookCheckoutFlow({ book, isRTL, t, onClose }: { book: any, isRTL: boolean, t: any, onClose: () => void }) {
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '', state: '', district: '', deliveryPref: 'desk', quantity: 1
    });

    React.useEffect(() => {
        if (showForm) fetch('https://akram-coaching.onrender.com/api/health').catch(() => { });
    }, [showForm]);

    const unitPrice = parseInt(book.price.replace(/[^0-9]/g, ''), 10);
    const totalPrice = unitPrice * formData.quantity;

    const inputCls = "w-full bg-black/40 border border-white/10 focus:border-brand-red focus:bg-white/5 outline-none rounded-xl px-5 py-4 text-white placeholder:text-white/30 text-sm transition-all duration-300 font-light shadow-inner";

    const handleChargilyPay = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setShowSuccess(true);

        try {
            const successParams = new URLSearchParams({
                method: 'Baridimob', plan: `${book.title} (Qty: ${formData.quantity})`, name: `${formData.firstName} ${formData.lastName}`, email: 'no-email@akram-coaching.com', amount: totalPrice.toString(), currency: 'DZD'
            }).toString();

            const res = await fetch('https://akram-coaching.onrender.com/api/chargily/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalPrice, currency: 'DZD', planName: `${book.title} (x${formData.quantity})`, clientName: `${formData.firstName} ${formData.lastName}`, clientEmail: 'no-email@akram-coaching.com', successUrl: window.location.origin + '/payment-success?' + successParams, failureUrl: window.location.origin + '/books'
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Checkout failed');

            setTimeout(() => { window.location.href = data.checkoutUrl; }, 3000);
        } catch (err) {
            console.error('[Books] Payment Error:', err);
            setShowSuccess(false);
            setLoading(false);
        }
    };

    if (showForm) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative flex-1 flex flex-col justify-center">
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-brand-dark/95 backdrop-blur-xl rounded-3xl text-center border border-brand-red/30 shadow-[0_0_50px_rgba(236,54,66,0.3)]">
                            <Truck size={48} className="text-brand-red mb-6 animate-bounce drop-shadow-[0_0_15px_rgba(236,54,66,0.6)]" />
                            <h4 className="text-3xl font-display font-black mb-3 text-white">{t.physicalNotice || 'Physical Delivery'}</h4>
                            <p className="text-white/70 font-light text-base mb-8 leading-relaxed max-w-sm">
                                {t.deliveryNotice || 'Will be delivered in 24-48 hours'}
                            </p>
                            <div className="flex gap-3 items-center text-xs font-bold text-brand-red uppercase tracking-[0.2em]">
                                <span className="w-5 h-5 rounded-full border-2 border-brand-red border-t-transparent animate-spin" />
                                {isRTL ? 'جاري التحويل...' : 'Redirecting...'}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleChargilyPay} className="space-y-5">
                    <p className="text-[10px] text-brand-red font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-4 h-px bg-brand-red"></span>
                        {isRTL ? 'معلومات التوصيل' : 'Delivery Details'}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder={isRTL ? 'الاسم' : 'First Name'} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className={inputCls} />
                        <input required type="text" placeholder={isRTL ? 'اللقب' : 'Last Name'} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className={inputCls} />
                    </div>
                    <input required type="tel" placeholder={isRTL ? 'رقم الهاتف' : 'Phone Number'} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
                    <div className="grid grid-cols-2 gap-4">
                        <select required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={cn(inputCls, "appearance-none cursor-pointer text-white/80")}>
                            <option value="" disabled className="bg-brand-dark">{isRTL ? 'الولاية' : 'State'}</option>
                            {ALGERIAN_STATES.map(s => <option key={s} value={s} className="bg-brand-dark">{s}</option>)}
                        </select>
                        <input required type="text" placeholder={isRTL ? 'البلدية' : 'District'} value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} className={inputCls} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {['desk', 'home'].map((pref) => (
                            <button key={pref} type="button" onClick={() => setFormData({ ...formData, deliveryPref: pref })}
                                className={cn("px-4 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 border flex flex-col items-center justify-center gap-2", formData.deliveryPref === pref ? "bg-brand-red/20 border-brand-red text-white red-glow" : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/10 hover:text-white")}>
                                <div className={cn("w-2 h-2 rounded-full", formData.deliveryPref === pref ? "bg-brand-red" : "bg-white/20")} />
                                {pref === 'desk' ? (t.fields?.deliveryDesk || 'Stop Desk') : (t.fields?.deliveryHome || 'Home Delivery')}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between p-5 bg-black/40 rounded-xl border border-white/10 mt-6 shadow-inner">
                        <span className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">{isRTL ? 'الكمية' : 'Quantity'}:</span>
                        <div className="flex items-center gap-6">
                            <button type="button" onClick={() => setFormData(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))} className="text-white/50 hover:text-brand-red transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">-</button>
                            <span className="font-display text-2xl font-black">{formData.quantity}</span>
                            <button type="button" onClick={() => setFormData(f => ({ ...f, quantity: f.quantity + 1 }))} className="text-white/50 hover:text-brand-red transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">+</button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-6 border-t border-white/10 mt-6">
                        <span className="text-xs text-white/50 uppercase tracking-[0.2em] font-bold">{isRTL ? 'المجموع' : 'Total DZD'}</span>
                        <span className="font-display text-4xl font-black text-brand-red drop-shadow-md">{totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <button type="button" onClick={() => setShowForm(false)} className="w-full py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 bg-white/5 border border-white/10 text-white hover:bg-white/10 cursor-pointer order-2 md:order-1">
                            {isRTL ? 'رجوع' : 'Go Back'}
                        </button>
                        <button type="submit" disabled={loading} className="w-full py-4 rounded-xl font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 bg-brand-red text-white hover:bg-red-600 red-glow-strong disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer order-1 md:order-2">
                            <ShoppingCart size={16} />
                            {isRTL ? 'تأكيد' : 'Confirm'}
                        </button>
                    </div>
                </form>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col h-full space-y-8">
            <p className="text-white/70 text-xs md:text-lg font-light leading-relaxed mb-4 border-l-2 border-brand-red/50 pl-6 flex-1 max-h-[25vh] overflow-y-auto pr-4 hide-scrollbar">
                {book.longDesc}
            </p>

            <div className="mt-auto">
                <div className="flex justify-between items-end mb-8 pb-8 border-b border-white/10">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-brand-red font-bold mb-2 flex items-center gap-2">
                        <span className="w-4 h-px bg-brand-red" />
                        Total Value
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-lg text-white/30 line-through decoration-brand-red/50 decoration-2 font-bold mb-1">{book.originalPrice}</span>
                        <div className="text-5xl lg:text-6xl font-display font-black text-white leading-none tracking-tighter drop-shadow-lg">{book.price}</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full py-5 rounded-xl font-bold text-sm tracking-[0.2em] uppercase text-center transition-all duration-300 active:scale-95 bg-brand-red text-white hover:bg-red-600 red-glow flex items-center justify-center gap-3 cursor-pointer group"
                    >
                        <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
                        {t.payBaridi || 'Buy Now (DZD)'}
                    </button>
                    <a
                        href={`https://wa.me/${BRAND.socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Coach Akram! I'm interested in the premium book: "${book.title}"`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-5 rounded-xl font-bold text-sm tracking-[0.2em] uppercase text-center transition-all duration-300 active:scale-95 glass-panel glass-panel-hover text-white flex items-center justify-center gap-3 cursor-pointer group"
                    >
                        <MessageCircle size={18} className="text-[#25D366] group-hover:scale-110 transition-transform" />
                        {isRTL ? 'تواصل معنا' : 'Contact Support'}
                    </a>
                </div>
            </div>
        </div>
    );
}
