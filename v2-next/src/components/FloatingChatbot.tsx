"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { askGemini } from '@/lib/gemini';

type Message = { role: 'akram' | 'user'; text: string; link?: { label: string; to: string } };

const BOT_INTRO: Message = {
    role: 'akram',
    text: `Salam! 👋 I'm AKBOT — Dr. Akram's AI assistant. I can guide you through the website, answer questions about coaching programs, pricing, and how to get started!`,
};

const QUICK_PROMPTS = [
    "What's the 90-Day Challenge?",
    "How much do plans cost?",
    "How do I start?",
    "Can women join?",
];

const AUTO_RESPONSES: Record<string, { text: string; link?: { label: string; to: string } }> = {
    challenge: {
        text: `The 90-Day Challenge is our flagship program! You get a custom training plan, precision nutrition, weekly check-ins, supplement guidance, and 24/7 WhatsApp support with Coach Akram. It's a complete lifestyle transformation.\n\nتحدي 90 يوم هو برنامجنا الأساسي! ستحصل على خطة تدريب مخصصة، ومتابعة أسبوعية، وتوجيه للمكملات الغذائية، ودعم 24/7 عبر واتساب مع الكابتن أكرم.`,
        link: { label: 'See the Challenge →', to: '/challenge' },
    },
    price: {
        text: `Plans start at 18,000 DZD (2 months) up to 50,000 DZD for the 6-month Elite package. Payment via BaridiMob (Algeria) or PayPal (international).\n\nتبدأ الخطط من 18,000 دج (شهران) وتصل إلى 50,000 دج لباقة النخبة (6 أشهر). الدفع متوفر عبر بريدي موب أو بايبال.`,
        link: { label: 'View Full Pricing →', to: '/pricing' },
    },
    start: {
        text: `Starting is simple — click "Join Now" or message Coach Akram directly on WhatsApp (+213 783 76 62 09). He'll schedule a quick call to understand your goals.\n\nالبدء بسيط — اضغط على "انضم الآن" أو راسل الكابتن أكرم مباشرة على واتساب (+213 783 76 62 09).`,
        link: { label: 'Contact Akram →', to: '/contact' },
    },
    women: {
        text: `Absolutely! Coach Akram has trained hundreds of women. Programs are fully adapted for female physiology, hormones, and goals — whether it's fat loss, toning, or muscle building.\n\nبالتأكيد! درب الكابتن أكرم مئات النساء. البرامج مصممة خصيصاً لتناسب فسيولوجيا وأهداف المرأة.`,
        link: { label: 'See Transformations →', to: '/transformations' },
    },
    services: {
        text: `Akram offers Online Coaching, Nutrition Plans, Supplement Protocols, and Competition Prep. All programs are science-backed by his Pharmacy PhD background.\n\nيقدم أكرم التدريب عن بعد، وخطط التغذية، والمكملات، وتجهيز البطولات. جميع البرامج مبنية على أسس علمية كونه دكتور صيدلي.`,
        link: { label: 'View Services →', to: '/services' },
    },
    akram: {
        text: `Dr. Akram Ikni is a Bodybuilding Champion and Doctor of Pharmacy. With 6+ years of experience and 1200+ athletes trained, he combines elite sports performance with pharmaceutical-grade nutrition science.\n\nد. أكرم إكني بطل كمال أجسام ودكتور صيدلي. يمتلك خبرة لأكثر من 6 سنوات ودرب أكثر من 1200 رياضي.`,
        link: { label: 'Learn More →', to: '/about' },
    },
    results: {
        text: `Akram's clients have achieved incredible results — from -22kg fat loss to full body recomposition. Over 400 documented success stories speak for themselves!\n\nحقق عملاء أكرم نتائج مذهلة — من خسارة 22 كغ دهون إلى إعادة تشكيل الجسم بالكامل. أكثر من 400 قصة نجاح موثقة!`,
        link: { label: 'See Transformations →', to: '/transformations' },
    },
    default: {
        text: `Great question! I'd recommend reaching out to Coach Akram directly on WhatsApp — he replies within hours. You can also explore the website for more details.\n\nسؤال ممتاز! أنصحك بالتواصل مع الكابتن أكرم مباشرة على الواتساب — سيرد عليك في أقرب وقت.`,
        link: { label: 'Contact Page →', to: '/contact' },
    },
};

function getResponse(text: string) {
    const lower = text.toLowerCase();

    if (lower.includes('challenge') || lower.includes('90') || lower.includes('تحدي')) return AUTO_RESPONSES.challenge;
    if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('dzd') || lower.includes('plan') || lower.includes('سعر') || lower.includes('بكم') || lower.includes('سومة') || lower.includes('ثمن')) return AUTO_RESPONSES.price;
    if (lower.includes('start') || lower.includes('begin') || lower.includes('join') || lower.includes('sign up') || lower.includes('كيف') || lower.includes('اشتراك') || lower.includes('نبدأ')) return AUTO_RESPONSES.start;
    if (lower.includes('women') || lower.includes('female') || lower.includes('girl') || lower.includes('sister') || lower.includes('نساء') || lower.includes('بنات') || lower.includes('امرأة')) return AUTO_RESPONSES.women;
    if (lower.includes('service') || lower.includes('offer') || lower.includes('program') || lower.includes('خدمات') || lower.includes('برنامج')) return AUTO_RESPONSES.services;
    if (lower.includes('akram') || lower.includes('coach') || lower.includes('who') || lower.includes('doctor') || lower.includes('dr') || lower.includes('أكرم') || lower.includes('دكتور') || lower.includes('كابتن')) return AUTO_RESPONSES.akram;
    if (lower.includes('result') || lower.includes('transform') || lower.includes('before') || lower.includes('after') || lower.includes('success') || lower.includes('نتائج') || lower.includes('تحول')) return AUTO_RESPONSES.results;

    return AUTO_RESPONSES.default;
}

export default function FloatingChatbot() {
    const { lang } = useLanguage();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([BOT_INTRO]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [pulse, setPulse] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Pulse the button after 4s to attract attention
    useEffect(() => {
        const t = setTimeout(() => setPulse(true), 4000);
        return () => clearTimeout(t);
    }, []);

    // Auto-scroll to bottom on new message
    useEffect(() => {
        if (open) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping, open]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        setMessages(m => [...m, { role: 'user', text: text.trim() }]);
        setInput('');
        setIsTyping(true);

        const replyText = await askGemini(text, true);
        setIsTyping(false);

        if (replyText) {
            setMessages(m => [...m, { role: 'akram', text: replyText }]);
        } else {
            await new Promise(r => setTimeout(r, 600));
            const res = getResponse(text);
            setMessages(m => [...m, { role: 'akram', text: res.text, link: res.link }]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="w-[340px] max-w-[calc(100vw-2rem)] bg-[#0e0e0e] border border-white/10 rounded-[1.75rem] shadow-2xl overflow-hidden flex flex-col"
                        style={{ maxHeight: '520px' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-brand-red/20 to-transparent shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-brand-red/20 border border-brand-red/50 flex items-center justify-center">
                                    <Bot size={18} className="text-brand-red" />
                                </div>
                                <div>
                                    <div className="font-display font-bold text-sm text-white">AKBOT</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        Dr. Akram's AI
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center cursor-pointer transition-colors"
                                aria-label="Close chat"
                            >
                                <X size={14} className="text-white/60" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'akram' && (
                                        <div className="w-6 h-6 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center shrink-0 mt-1">
                                            <Bot size={11} className="text-brand-red" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] ${msg.role === 'user' ? '' : 'space-y-2'}`}>
                                        <div
                                            className={`px-4 py-2.5 rounded-2xl text-sm font-light leading-relaxed ${msg.role === 'user'
                                                ? 'bg-brand-red text-white rounded-br-sm'
                                                : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-sm'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        {msg.link && msg.role === 'akram' && (
                                            <Link
                                                href={`/${lang}${msg.link.to}`}
                                                onClick={() => setOpen(false)}
                                                className="inline-flex items-center gap-1.5 text-xs text-brand-red font-bold hover:text-brand-red/80 transition-colors pl-1"
                                            >
                                                {msg.link.label}
                                                <ArrowRight size={10} />
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center shrink-0">
                                        <Bot size={11} className="text-brand-red" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                                        {[0, 1, 2].map(i => (
                                            <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Prompts */}
                        {messages.length <= 1 && (
                            <div className="px-4 pb-2 flex gap-2 flex-wrap shrink-0">
                                {QUICK_PROMPTS.map(q => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs bg-white/5 border border-white/10 hover:border-brand-red/50 hover:bg-brand-red/10 hover:text-brand-red text-white/60 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 border-t border-white/10 shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Ask AKBOT anything..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-all font-light text-white placeholder:text-white/30"
                                    aria-label="Chat input"
                                />
                                <button
                                    onClick={() => sendMessage(input)}
                                    disabled={!input.trim()}
                                    className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center hover:bg-brand-red/90 transition-all cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                >
                                    <Send size={15} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => { setOpen(o => !o); setPulse(false); }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                className="relative w-14 h-14 rounded-full bg-brand-red flex items-center justify-center shadow-[0_0_30px_rgba(236,54,66,0.5)] cursor-pointer focus:outline-none"
                aria-label="Open AKBOT chat"
            >
                {/* Pulse ring */}
                {pulse && !open && (
                    <span className="absolute inset-0 rounded-full bg-brand-red/50 animate-ping" />
                )}
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X size={22} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Bot size={22} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
