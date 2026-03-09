import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../i18n/LanguageContext';
import { BackgroundBeams } from './BackgroundBeams';

interface ImmersiveCTAProps {
    title: string;
    subtitle: string;
    buttonText: string;
    href?: string;
    onClick?: () => void;
    showBeams?: boolean;
}

const Content = memo(({ title, subtitle, buttonText, onClick, isRTL }: any) => (
    <div className="relative z-10 flex flex-col items-center text-center">
        {/* Poignant, tracked-out subtitle */}
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-bold text-brand-red uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-4"
        >
            <span className="w-12 h-[1px] bg-brand-red/50" />
            {subtitle}
            <span className="w-12 h-[1px] bg-brand-red/50" />
        </motion.p>

        {/* High Impact Title */}
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 leading-tight mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
            {title}
        </motion.h2>

        {/* Magnetic/Glowing Button */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
        >
            <button
                onClick={onClick}
                className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 rounded-full bg-brand-dark overflow-hidden border border-white/20 transition-all duration-500 hover:border-brand-red/80 hover:shadow-[0_0_60px_rgba(236,54,66,0.4)] hover:-translate-y-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                style={{ willChange: 'transform, box-shadow' }}
            >
                {/* Sweeping Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-12" style={{ willChange: 'transform' }} />

                {/* Hover internal glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red/0 via-brand-red/20 to-brand-red/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" style={{ willChange: 'transform' }} />

                <span className="relative z-10 text-white font-bold tracking-[0.2em] uppercase text-sm md:text-base drop-shadow-md">
                    {buttonText}
                </span>

                <ArrowRight
                    size={20}
                    className={cn(
                        "relative z-10 text-brand-red transition-transform duration-300",
                        isRTL ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"
                    )}
                />
            </button>
        </motion.div>
    </div>
));

const ImmersiveCTA = memo(({ title, subtitle, buttonText, href, onClick, showBeams = true }: ImmersiveCTAProps) => {
    const { isRTL } = useLanguage();

    return (
        <section
            className="relative py-32 md:py-48 overflow-hidden bg-transparent"
            dir={isRTL ? 'rtl' : 'ltr'}
            style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                willChange: 'mask-image'
            }}
        >
            {/* Deep immersive background effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle redshift glow */}
                <motion.div
                    animate={{
                        opacity: [0.15, 0.3, 0.15],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-brand-red/15 blur-[120px] rounded-full"
                    style={{ willChange: 'transform, opacity' }}
                />

                {/* Grid minimal texture */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
            </div>

            <div className="container max-w-5xl mx-auto px-6 relative z-10 flex justify-center">
                {/* Glass panel container for the "quiet but effective" framing */}
                <div className="w-full relative rounded-[3rem] p-10 md:p-20 overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-red/5 before:to-transparent before:opacity-50">

                    {/* Contained Meteors / Beams strictly inside the box */}
                    {showBeams && (
                        <div className="absolute inset-0 z-0 text-brand-red">
                            <BackgroundBeams className="opacity-100 mix-blend-screen mix-blend-lighten" />
                        </div>
                    )}

                    {/* Glowing animated border effect - optimized to use opacity */}
                    <div className="absolute inset-0 rounded-[3rem] border border-brand-red/20 pointer-events-none z-10 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 border border-brand-red/40 rounded-[3rem]"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ willChange: 'opacity' }}
                        />
                    </div>

                    {/* Internal subtle lighting on the glass edge */}
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none rounded-[3rem] z-10" />
                    <div className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-2xl rounded-[3rem] z-0 pointer-events-none" />

                    {href ? (
                        <Link to={href} className="block w-full h-full relative z-20 no-underline text-inherit group/link">
                            <Content title={title} subtitle={subtitle} buttonText={buttonText} onClick={onClick} isRTL={isRTL} />
                        </Link>
                    ) : (
                        <Content title={title} subtitle={subtitle} buttonText={buttonText} onClick={onClick} isRTL={isRTL} />
                    )}
                </div>
            </div>
        </section>
    );
});

ImmersiveCTA.displayName = 'ImmersiveCTA';
export default ImmersiveCTA;
