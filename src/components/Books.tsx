import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowRight, ShoppingCart, Info, X } from 'lucide-react';
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
                                <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-6 pl-4 border-l-2 border-brand-red/50 relative z-10">{books[activeBook].longDesc}</p>

                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-end mb-6">
                                        <div className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Total Investment</div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg text-white/30 line-through decoration-brand-red/40 decoration-2 font-bold">{books[activeBook].originalPrice}</span>
                                            <div className="text-4xl font-display font-black text-brand-red leading-none">{books[activeBook].price}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 pb-8 md:pb-0">
                                        {/* Baridimob / CCP Button */}
                                        <a
                                            href={BRAND.socials.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={16} />
                                            {tb.payBaridi}
                                        </a>
                                        {/* WhatsApp Direct Buy */}
                                        <a
                                            href={getWhatsappLink(books[activeBook])}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-[#25D366] text-white hover:bg-[#20bd5a] flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,211,102,0.3)] mb-2"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 2.00018C6.47708 2.00018 2.00012 6.47714 2.00012 12.0002C2.00012 13.8841 2.52092 15.6465 3.42488 17.1519L2.00012 22.0002L6.96803 20.5975C8.43577 21.4503 10.1609 22.0002 12.0001 22.0002C17.5231 22.0002 22.0001 17.5232 22.0001 12.0002C22.0001 6.47714 17.5231 2.00018 12.0001 2.00018ZM11.1396 7.42371L10.9706 7.48398C10.7481 7.5756 10.457 7.74906 10.1601 8.01918C9.57723 8.5492 8.94826 9.53059 9.17294 10.8846C9.37346 12.0931 10.1068 13.5132 11.2338 14.6394C12.3592 15.7641 13.7844 16.49 14.9922 16.6811C16.3421 16.8943 17.3117 16.2731 17.8443 15.6946C18.1147 15.3995 18.288 15.1119 18.3796 14.8914L18.4377 14.7397C18.5273 14.4939 18.5539 14.2882 18.5376 14.1557L18.524 14.078C18.4907 13.9174 18.3846 13.8058 18.271 13.7483C18.2709 13.7482 18.2708 13.7482 18.2706 13.7481L16.2333 12.7206L16.0353 12.6315C15.8239 12.5446 15.617 12.5574 15.4674 12.6517C15.4665 12.6523 15.4656 12.6528 15.4647 12.6534L14.3644 13.3646C14.0706 13.5544 13.7259 13.5658 13.4146 13.4258L13.2505 13.3496L13.1611 13.3C12.3541 12.8252 11.666 12.1382 11.1895 11.3323L11.1396 11.2427L11.0664 11.0858C10.9254 10.7787 10.9413 10.4367 11.1332 10.1423L11.8385 9.04353C11.8392 9.04239 11.84 9.04123 11.8407 9.04006C11.9365 8.89112 11.9515 8.68598 11.8665 8.476L11.7779 8.27878L10.7607 6.24355C10.6698 6.06176 10.5188 5.92215 10.3344 5.86729C10.2073 5.8294 10.0537 5.82283 9.87836 5.86438L9.73602 5.90809C9.73586 5.90814 9.73569 5.90819 9.73552 5.90825L9.62016 5.94539C9.57523 5.96057 9.53982 5.97505 9.52042 5.9839C9.52019 5.98401 9.51998 5.98412 9.51977 5.98422L9.46766 6.00844C9.2842 6.08226 9.09459 6.20593 8.918 6.3683C8.61529 6.64669 8.24151 7.15243 8.44855 8.23235C8.65342 9.30089 9.36696 10.3957 10.4636 11.6025C11.6214 12.8767 13.0645 14.1542 15.0232 15.1741C16.3276 15.8587 17.5843 16.3359 18.5714 16.4807C18.6756 16.4955 18.7753 16.5055 18.8686 16.5106C19.6433 16.5513 20.3168 16.1497 20.6179 15.8239L20.62 15.8217C20.9168 15.4952 21.1444 14.9576 20.9547 14.281L20.8718 13.9856C20.85 13.8829 20.8252 13.8402 20.8179 13.8315C20.817 13.8304 20.816 13.8291 20.8149 13.828L20.7259 13.743L19.4623 12.5358C19.227 12.3115 18.9119 12.28 18.6669 12.4334L18.6662 12.4338L17.7018 13.0374C17.3879 13.2338 16.9922 13.1795 16.6698 12.9863C16.6692 12.986 16.6686 12.9856 16.668 12.9853L16.2721 12.7554C15.1969 12.1311 14.2324 11.2339 13.4357 10.1264L13.3039 9.94318C13.0483 9.58807 13.0336 9.17292 13.2435 8.7848L13.2435 8.78477L13.7915 7.77161C13.9616 7.4571 13.9576 7.07997 13.7153 6.81803L13.7151 6.81781L12.5925 5.60467L12.5924 5.60458C12.3789 5.37397 12.0305 5.31952 11.7225 5.46736C11.536 5.55683 11.2882 5.72704 11.1009 5.92348C10.7416 6.30798 10.4578 6.78474 10.4284 7.2917C10.4144 7.5334 10.5183 7.76634 10.7481 7.91508C10.978 8.06383 11.2825 8.05831 11.4552 7.91428L11.4553 7.9142L11.5323 7.84992C11.5835 7.80718 11.6601 7.74149 11.7485 7.64893C11.8841 7.50694 11.9702 7.41908 12.0526 7.37956C12.1268 7.34399 12.1528 7.349 12.193 7.38883L13.3275 8.61394C13.3989 8.69113 13.3958 8.77353 13.3541 8.85055L12.8093 9.85703C12.4497 10.5215 12.4208 11.3069 12.866 11.9257L12.9922 12.1011C13.8863 13.3444 14.9709 14.3533 16.1824 15.0567L16.551 15.2707C17.1565 15.6224 17.9103 15.7176 18.524 15.3335L19.4678 14.7423C19.5309 14.7028 19.6425 14.7554 19.7126 14.8211L20.9707 16.0242C21.0427 16.0928 21.043 16.1852 20.0001 16.4891Z" />
                                            </svg>
                                            {tb.payWhatsapp}
                                        </a>
                                        {/* Fallback Close Window Button (Always Visible) */}
                                        <button
                                            onClick={() => setActiveBook(null)}
                                            className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase text-center transition-all duration-300 active:scale-95 bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center gap-2 mt-2"
                                        >
                                            <X size={16} />
                                            {isRTL ? 'إغلاق النافذة' : 'Close Window'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
