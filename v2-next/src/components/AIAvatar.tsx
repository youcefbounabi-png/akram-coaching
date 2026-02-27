"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND } from '../constants';
import FitnessAvatar from './3d/FitnessAvatar';
import { Send, Bot, X, Minimize2 } from 'lucide-react';

type Message = { role: 'akram' | 'user'; text: string };

const BOT_INTRO: Message = {
  role: 'akram',
  text: `Salam! I'm AKBOT — Dr. Akram's AI coaching assistant. I can answer your questions about training, nutrition, the 90-Day Challenge, and how to get started. How can I help you today?`,
};

const QUICK_PROMPTS = [
  "What's included in the 90 - Day Challenge?",
  "How do I start?",
  "What are your prices?",
  "Can women join?",
];

const AUTO_RESPONSES: Record<string, string> = {
  challenge: `The 90-Day Challenge is our flagship program — you get a custom training plan, precision nutrition, weekly updates, supplement guidance, and 24/7 WhatsApp support with Coach Akram. It's a complete lifestyle transformation.\n\nتحدي 90 يوم هو برنامجنا الأساسي — ستحصل على خطة تدريب مخصصة، تغذية دقيقة، متابعة أسبوعية، توجيه للمكملات، ودعم 24/7 عبر واتساب مع الكابتن أكرم. إنه تغيير جذري لنمط حياتك.`,
  price: `Plans start at 18,000 DZD (2 months) up to 50,000 DZD for the 6-month Elite package. You can pay via BaridiMob (Algeria) or PayPal (international). Check /pricing for full details!\n\nتبدأ الخطط من 18,000 دج (شهران) حتى 50,000 دج لباقة النخبة (6 أشهر). يمكنك الدفع عبر بريدي موب أو بايبال. تفضل بزيارة صفحة الأسعار للتفاصيل!`,
  start: `Starting is simple: click "Join Now" or message Coach Akram directly on WhatsApp (+213 783 76 62 09). He'll schedule a quick call to understand your goals and build your plan.\n\nالبدء بسيط: اضغط على "انضم الآن" أو راسل الكابتن أكرم مباشرة على واتساب (+213 783 76 62 09). سيقوم بتحديد مكالمة سريعة لفهم أهدافك وبناء خطتك.`,
  women: `Absolutely! Coach Akram has trained hundreds of women. Programs are fully adapted for female physiology, hormones, and goals — whether it's fat loss, toning, or muscle building.\n\nبالتأكيد! درب الكابتن أكرم مئات النساء. البرامج مصممة بالكامل لتناسب فسيولوجيا المرأة وهرموناتها وأهدافها — سواء لحرق الدهون أو الشد أو بناء العضلات.`,
  default: `Great question! For a personalized answer, I recommend reaching out to Coach Akram directly on WhatsApp — he replies within hours. You can also explore the website for more details.\n\nسؤال ممتاز! للحصول على إجابة مخصصة، أنصحك بالتواصل مع الكابتن أكرم مباشرة على الواتساب — سيرد عليك في غضون ساعات. يمكنك أيضاً تصفح الموقع لمعرفة المزيد.`,
};

import { askGemini } from '../lib/gemini';

function getResponse(text: string): string {
  const lower = text.toLowerCase();

  const isChallenge = lower.includes('challenge') || lower.includes('90') || lower.includes('تحدي');
  const isPrice = lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('dzd') || lower.includes('سعر') || lower.includes('بكم') || lower.includes('سومة') || lower.includes('ثمن');
  const isStart = lower.includes('start') || lower.includes('begin') || lower.includes('join') || lower.includes('كيف') || lower.includes('اشتراك') || lower.includes('نبدأ');
  const isWomen = lower.includes('women') || lower.includes('female') || lower.includes('girl') || lower.includes('نساء') || lower.includes('بنات') || lower.includes('امرأة');

  if (isChallenge) return AUTO_RESPONSES.challenge;
  if (isPrice) return AUTO_RESPONSES.price;
  if (isStart) return AUTO_RESPONSES.start;
  if (isWomen) return AUTO_RESPONSES.women;

  return AUTO_RESPONSES.default;
}

export default function AIAvatar() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([BOT_INTRO]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: 'user', text: text.trim() }]);
    setInput('');
    setIsTyping(true);

    const reply = await askGemini(text, false);
    setIsTyping(false);

    if (reply) {
      setMessages(m => [...m, { role: 'akram', text: reply }]);
    } else {
      await new Promise(r => setTimeout(r, 600));
      setMessages(m => [...m, { role: 'akram', text: getResponse(text) }]);
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-brand-dark border-t border-white/5">
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" aria-hidden="true" />
              AKBOT — Powered by Akram's Knowledge
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 tracking-tighter leading-none">
              MEET YOUR
              <br />
              <span className="font-serif italic font-light text-brand-red">AI Coach</span>
            </h2>
            <p className="text-white/60 text-lg mb-6 font-light leading-relaxed">
              AKBOT is Dr. Akram's personalized AI assistant, trained on his coaching methodology.
              Ask anything about training, nutrition, or the 90-Day Challenge — and get an instant, expert-level response.
            </p>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                Online 24/7
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="text-sm text-white/50">Replies in seconds</div>
              <div className="w-px h-4 bg-white/20" />
              <div className="text-sm text-white/50">Akram's expertise</div>
            </div>

            <button
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-3 bg-brand-red text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 red-glow group cursor-pointer"
              aria-label="Open AI Chat with AKBOT"
            >
              <Bot size={18} aria-hidden="true" />
              Chat with AKBOT
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </button>
          </motion.div>

          {/* Right: 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="h-[550px] relative rounded-[3rem] glass-panel overflow-hidden border-white/10 shadow-[0_0_60px_rgba(236,54,66,0.08)] group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(236,54,66,0.2),_transparent_60%)] opacity-40 group-hover:opacity-80 transition-opacity duration-700 z-0" />
            <FitnessAvatar />

            {/* Status bar */}
            <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl z-20 flex items-center justify-between backdrop-blur-xl border-white/20">
              <div>
                <div className="text-sm font-bold text-white mb-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                  AKBOT Online
                </div>
                <div className="text-xs text-white/40 tracking-widest uppercase">Dr. Akram's AI — Ready to Coach</div>
              </div>
              <button
                onClick={() => setChatOpen(true)}
                className="flex gap-1 items-center cursor-pointer hover:scale-110 transition-transform"
                aria-label="Open chat"
              >
                {[0.8, 1.2, 0.6, 1, 0.7].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-brand-red rounded-full animate-pulse"
                    style={{ height: `${h * 20}px`, animationDelay: `${i * 0.15}s` }}
                    aria-hidden="true"
                  />
                ))}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, x: 60, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, y: 60, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
          >
            <div className="glass-panel rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col" style={{ maxHeight: '70vh' }}>
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-brand-red/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center">
                    <Bot size={18} className="text-brand-red" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm">AKBOT</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Online
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setChatOpen(false)} className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" aria-label="Close chat">
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ minHeight: '250px' }}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'akram' && (
                      <div className="w-6 h-6 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center mr-2 shrink-0 mt-1">
                        <Bot size={12} className="text-brand-red" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-light leading-relaxed ${msg.role === 'user'
                        ? 'bg-brand-red text-white rounded-br-sm'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-sm'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center">
                      <Bot size={12} className="text-brand-red" />
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex gap-2 flex-wrap">
                  {QUICK_PROMPTS.map(q => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs bg-white/5 border border-white/10 hover:border-brand-red/40 hover:bg-brand-red/10 hover:text-brand-red text-white/60 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask AKBOT anything..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-all font-light"
                    aria-label="Chat input"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    className="w-11 h-11 bg-brand-red rounded-xl flex items-center justify-center hover:bg-brand-red/90 transition-colors cursor-pointer shrink-0 red-glow"
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
