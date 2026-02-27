import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, ShoppingCart, Info, X, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { cn } from '../lib/utils';
import { BRAND } from '../constants';

export default function Books() {
    const { t, isRTL } = useLanguage();
    const tb = t.books;
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeBook, setActiveBook] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    const books = [
        {
            title: tb.b1Title,
            desc: tb.b1Desc,
            longDesc: tb.b1LongDesc,
            price: tb.b1Price,
            originalPrice: tb.b1OriginalPrice,
            image: "/books/book-1.png",
            color: "from-brand-red/20 to-transparent",
            delay: 0
        },
        {
            title: tb.b2Title,
            desc: tb.b2Desc,
            longDesc: tb.b2LongDesc,
            price: tb.b2Price,
            originalPrice: tb.b2OriginalPrice,
            image: "/books/book-2.png",
            color: "from-white/10 to-transparent",
            delay: 0.1
        },
        {
            title: tb.b3Title,
            desc: tb.b3Desc,
            longDesc: tb.b3LongDesc,
            price: tb.b3Price,
            originalPrice: tb.b3OriginalPrice,
            image: "/books/book-3.png",
            color: "from-brand-red/10 to-transparent",
            delay: 0.2
        }
    ];

    const getWhatsappLink = (book: typeof books[0]) => {
        const msg = encodeURIComponent(`Hello Coach Akram! I would like to purchase the e-book: "${book.title}" for ${book.price}. How can I proceed with the payment?`);
        return `https://wa.me/${BRAND.socials.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`;
    };

    return (
        <section ref={containerRef} id="e-books" className="py-32 relative overflow-hidden bg-brand-dark" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4 flex items-center gap-4">
                            <span className="w-8 h-px bg-brand-red" />
                            {tb.tagline}
                        </p>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-display font-black tracking-tighter leading-none mb-6 uppercase">
                            {tb.headline} <br />
                            <span className="font-serif italic font-light text-brand-red lowercase tracking-normal text-glow">{tb.headlineItalic}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md"
                    >
                        <p className="text-white/60 text-lg font-light leading-relaxed border-l-2 border-brand-red/30 pl-6">
                            {tb.subtitle}
                        </p>
                    </motion.div>
                </div>

                {/* Mobile: Horizontal scroll snapping sequence. Desktop: 3-column grid */}
                <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 gap-6 md:gap-12 perspective-1000 pb-12 -mx-6 px-6 lg:mx-0 lg:px-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {books.map((book, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50, rotateX: 10, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: book.delay, type: 'spring', stiffness: 100 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group relative h-full flex flex-col shrink-0 snap-center w-[85vw] sm:w-[320px] lg:w-auto"
                        >
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] blur-xl will-change-transform z-0" style={{ backgroundImage: `var(--tw-gradient-stops)` }} />

                            <div className={cn(
                                "relative glass-panel rounded-[2rem] h-full flex flex-col border border-white/10 overflow-hidden bg-gradient-to-b transition-all duration-500 z-10",
                                book.color,
                                "hover:border-brand-red/40 hover:-translate-y-4 hover:shadow-[0_20px_40px_-20px_rgba(236,54,66,0.3)]"
                            )}>

                                {/* Image Container */}
                                <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/50">
                                    <motion.img
                                        whileHover={{ scale: 1.1, rotateZ: isRTL ? -2 : 2 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-brand-red">
                                            <BookOpen size={12} /> {isRTL ? 'كتاب إلكتروني' : 'E-BOOK'}
                                        </div>
                                        <button
                                            onClick={() => setActiveBook(i)}
                                            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-red hover:border-brand-red transition-colors cursor-pointer active:scale-95"
                                            aria-label="View details"
                                        >
                                            <Info size={14} />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6 z-20">
                                        <h3 className="text-2xl md:text-3xl font-display font-black leading-tight text-white group-hover:text-brand-red transition-colors duration-300 drop-shadow-lg">
                                            {book.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col items-start text-start relative bg-brand-dark/40 backdrop-blur-sm">
                                    <p className="text-white/60 text-sm font-light leading-relaxed mb-8 flex-1">
                                        {book.desc}
                                    </p>

                                    <div className="w-full space-y-4 border-t border-white/10 pt-4 mt-auto">
                                        <div className="flex items-end justify-between pb-2">
                                            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">Investment</div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm text-white/40 line-through decoration-brand-red/50 decoration-2 font-bold mb-0.5">{book.originalPrice}</span>
                                                <div className="text-3xl font-display font-black text-white leading-none">{book.price}</div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setActiveBook(i)}
                                            className="w-full py-4 rounded-xl font-bold tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-brand-red text-white hover:bg-red-600 red-glow flex items-center justify-center gap-3 group/btn cursor-pointer"
                                        >
                                            <ShoppingCart size={18} />
                                            {tb.cta}
                                            <ArrowRight size={18} className={cn("transition-transform group-hover/btn:translate-x-1", isRTL && "rotate-180 group-hover/btn:-translate-x-1")} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <a href={BRAND.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 glass-panel glass-panel-hover px-10 py-5 rounded-full font-bold text-lg cursor-pointer group">
                        {isRTL ? 'لديك أسئلة؟ تواصل معنا' : 'Questions? Contact Us'}
                        <ArrowRight size={20} className={cn("text-brand-red transition-transform", isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1")} />
                    </a>
                </motion.div>
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
                {activeBook !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
                        onClick={() => setActiveBook(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl glass-panel rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-white/10 max-h-[90vh] md:max-h-[85vh]"
                        >
                            {/* X Close Button - Now inside the card with standard z-50 */}
                            <button
                                onClick={() => setActiveBook(null)}
                                className={cn(
                                    "absolute top-4 md:top-6 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,54,66,0.4)] hover:scale-110 hover:bg-red-600 transition-all cursor-pointer",
                                    isRTL ? "left-4 md:left-6" : "right-4 md:right-6"
                                )}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-full md:w-1/2 md:aspect-auto h-[35vh] md:h-auto shrink-0 relative">
                                <img src={books[activeBook].image} alt={books[activeBook].title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent md:hidden" />
                            </div>

                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-start bg-brand-dark/90 h-[55vh] md:h-[600px] overflow-y-auto hide-scrollbar">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 text-xs font-bold uppercase tracking-widest text-brand-red mb-4 md:mb-6 w-fit shrink-0">
                                    <BookOpen size={14} /> {isRTL ? 'عرض لفترة محدودة' : 'limited time offer'}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-display font-black mb-4 leading-tight shrink-0">{books[activeBook].title}</h3>

                                {/* Checkout Form State */}
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
    );
}

/**
 * Sub-component for handling the book checkout flow
 */
function BookCheckoutFlow({ book, isRTL, t, onClose }: { book: any, isRTL: boolean, t: any, onClose: () => void }) {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    // Proactively wake up backend when user decides to buy, just in case
    React.useEffect(() => {
        if (showForm) {
            fetch('https://akram-coaching.onrender.com/api/health').catch(() => { });
        }
    }, [showForm]);

    const priceNumeric = parseInt(book.price.replace(/[^0-9]/g, ''), 10);

    const handleChargilyPay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            alert(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const successParams = new URLSearchParams({
                method: 'Baridimob',
                plan: book.title,
                name: formData.name,
                email: formData.email,
                amount: priceNumeric.toString(),
                currency: 'DZD'
            }).toString();

            const res = await fetch('https://akram-coaching.onrender.com/api/chargily/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: priceNumeric,
                    currency: 'DZD',
                    planName: book.title,
                    clientName: formData.name,
                    clientEmail: formData.email,
                    successUrl: window.location.origin + '/payment-success?' + successParams,
                    failureUrl: window.location.origin + '#e-books'
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Checkout failed');

            window.location.href = data.checkoutUrl;
        } catch (err) {
            console.error('[Books] Payment Error:', err);
            alert(isRTL ? 'حدث خطأ أثناء معالجة الدفع' : 'Error processing payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (showForm) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-4"
            >
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs text-brand-red font-bold uppercase tracking-wider mb-4">
                        {isRTL ? 'معلومات الدفع' : 'Payment Information'}
                    </p>
                    <form onSubmit={handleChargilyPay} className="space-y-3">
                        <input
                            required
                            type="text"
                            placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-brand-red outline-none transition-colors text-white"
                        />
                        <input
                            required
                            type="email"
                            placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-brand-red outline-none transition-colors text-white"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase bg-brand-red text-white hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <span className="animate-pulse">{isRTL ? 'جاري التحويل...' : 'Redirecting...'}</span>
                            ) : (
                                <>
                                    <ShoppingCart size={16} />
                                    {isRTL ? 'تأكيد ودفع' : 'Confirm & Pay'}
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="w-full py-2 text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                            {isRTL ? 'رجوع' : 'Go Back'}
                        </button>
                    </form>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6 pl-4 border-l-2 border-brand-red/50 relative z-10">{book.longDesc}</p>

            <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex justify-between items-end mb-6">
                    <div className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Total Investment</div>
                    <div className="flex items-center gap-3">
                        <span className="text-lg text-white/30 line-through decoration-brand-red/40 decoration-2 font-bold">{book.originalPrice}</span>
                        <div className="text-4xl font-display font-black text-brand-red leading-none">{book.price}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 pb-8 md:pb-0">
                    {/* Baridimob / CCP Button */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <ShoppingCart size={16} />
                        {t.payBaridi}
                    </button>
                    {/* WhatsApp Direct Buy */}
                    <a
                        href={`https://wa.me/${BRAND.socials.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Coach Akram! I would like to purchase the e-book: "${book.title}"`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.3)] mb-2"
                    >
                        <MessageCircle size={16} />
                        {t.payWhatsapp}
                    </a>
                    {/* Fallback Close Window Button (Always Visible) */}
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center gap-2 mt-2 cursor-pointer"
                    >
                        <X size={16} />
                        {isRTL ? 'إغلاق النافذة' : 'Close Window'}
                    </button>
                </div>
            </div>
        </>
    );
}
