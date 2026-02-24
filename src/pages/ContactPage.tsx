import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, MapPin, Instagram, Youtube, Calendar, Clock, CheckCircle2, Phone } from 'lucide-react';
import { BRAND } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

const TIMES = ['09:00', '10:30', '12:00', '14:00', '16:00', '18:00'];

function getCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = firstDay;
    const days: (number | null)[] = Array(blanks).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
}

type FormState = { name: string; phone: string; goal: string; message: string };

export default function ContactPage() {
    const { t, isRTL } = useLanguage();
    const tc = t.contact;
    const tf = t.intake.fields;

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Default goal should match UI translations if possible, but we handle it via values
    const [form, setForm] = useState<FormState>({ name: '', phone: '', goal: 'muscle', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const calendarDays = getCalendarDays(year, month);
    // basic month name - in a full app we could use Intl.DateTimeFormat with locale
    const monthName = new Date(year, month, 1).toLocaleString(isRTL ? 'ar-SA' : 'en-US', { month: 'long' });

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
        setSelectedDate(null);
    };
    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
        setSelectedDate(null);
    };

    const isPast = (day: number) => {
        const d = new Date(year, month, day);
        return d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!form.name.trim() || !form.phone.trim()) {
            alert(isRTL ? "يرجى ملء الاسم ورقم الهاتف" : "Please fill in your name and phone number");
            return;
        }

        if (selectedDate && !selectedTime) {
            alert(isRTL ? "يرجى اختيار وقت للموعد" : "Please select a time for your appointment");
            return;
        }

        setLoading(true);
        try {
            const isBooking = selectedDate && selectedTime;

            if (isBooking) {
                // Insert into bookings table
                const { error } = await supabase.from('bookings').insert([{
                    client_name: form.name,
                    client_phone: form.phone,
                    booking_date: `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
                    booking_time: selectedTime,
                    goal: form.goal,
                    message: form.message,
                    status: 'pending'
                }]);
                if (error) throw error;
            } else {
                // General contact message
                const { error } = await supabase.from('contact_messages').insert([{
                    name: form.name,
                    email: 'whatsapp@' + form.phone + '.com',
                    subject: form.goal,
                    message: form.message + `\n\nWhatsApp: ${form.phone}`,
                }]);
                if (error) throw error;
            }

            // Trigger Email Automation (Backend)
            const goalLabels: Record<string, string> = {
                'muscle': 'Muscle Gain',
                'fat-loss': 'Fat Loss',
                'recomp': 'Body Recomposition',
                '90-day': '90-Day Challenge',
                'health': 'Health Optimization'
            };

            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    whatsapp: form.phone,
                    goal: goalLabels[form.goal] || form.goal,
                    message: form.message,
                    date: selectedDate ? `${year}-${month + 1}-${selectedDate}` : undefined,
                    time: selectedTime || undefined,
                    type: isBooking ? 'booking' : 'contact'
                }),
            }).catch(() => { });

            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Error sending message. Please try again or WhatsApp me directly.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center pt-20" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="text-center max-w-md mx-auto px-6">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="w-24 h-24 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} className="text-brand-red" />
                    </motion.div>
                    <h2 className="text-4xl font-display font-black mb-4">{tc.successTitle}</h2>
                    <p className="text-white/60 font-light mb-8">
                        {tc.successMsg} <strong className="text-white">{tc.successTime}</strong>.
                    </p>
                    <a href={BRAND.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-brand-red text-white px-8 py-4 rounded-full font-bold hover:bg-brand-red/90 transition-colors cursor-pointer red-glow">
                        <Phone size={16} />
                        {tc.whatsappNow}
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} dir={isRTL ? 'rtl' : 'ltr'}>
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2" />
                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <p className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                            <span className="w-8 h-px bg-brand-red" />
                            {tc.tagline}
                        </p>
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none">
                            {tc.headline}
                            <br />
                            <span className="font-serif italic font-light text-brand-red">{tc.headlineItalic}</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            <section className="py-10 pb-24">
                <div className="container max-w-7xl mx-auto px-6">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Left: Form */}
                            <motion.div initial={{ opacity: 0, x: isRTL ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="glass-panel rounded-[2.5rem] p-8 md:p-10">
                                <h2 className="text-2xl font-display font-bold mb-8">{tc.yourInfo}</h2>

                                <div className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{tc.fullName} *</label>
                                            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red focus:bg-white/8 transition-all font-light text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{tc.phone} *</label>
                                            <input type="tel" required placeholder="+213 ..." value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red transition-all font-light text-sm" dir="ltr" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{tc.primaryGoal}</label>
                                        <select value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red transition-all font-light text-sm appearance-none cursor-pointer">
                                            <option value="muscle" className="bg-[#050505]">{tf.goalMuscle}</option>
                                            <option value="fat-loss" className="bg-[#050505]">{tf.goalFat}</option>
                                            <option value="recomp" className="bg-[#050505]">{tf.goalRecomp}</option>
                                            <option value="90-day" className="bg-[#050505]">{tf.goal90}</option>
                                            <option value="health" className="bg-[#050505]">{tf.goalHealth}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2">{tc.message}</label>
                                        <textarea rows={4} placeholder={tc.messagePlaceholder} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-red transition-all font-light text-sm resize-none" />
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/5 space-y-5">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform shrink-0">
                                            <MessageSquare size={20} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">WhatsApp</div>
                                            <a href={BRAND.socials.whatsapp} className="text-brand-red text-xs hover:underline" dir="ltr">+213 783 76 62 09</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:scale-110 transition-transform shrink-0">
                                            <MapPin size={20} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{tc.locationLabel}</div>
                                            <div className="text-white/50 text-xs">{tc.locationVal}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right: Calendar + Submit */}
                            <div className="space-y-6">
                                <motion.div initial={{ opacity: 0, x: isRTL ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="glass-panel rounded-[2.5rem] p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-display font-bold flex items-center gap-3">
                                            <Calendar size={20} className="text-brand-red" />
                                            {tc.bookConsult}
                                        </h2>
                                        <span className="text-xs text-white/40 uppercase tracking-widest">{tc.optional}</span>
                                    </div>

                                    <div className="flex items-center justify-between mb-5" dir="ltr">
                                        <button type="button" onClick={prevMonth} className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">‹</button>
                                        <span className="font-display font-bold text-sm">{monthName} {year}</span>
                                        <button type="button" onClick={nextMonth} className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/60 hover:text-white">›</button>
                                    </div>

                                    <div className="grid grid-cols-7 mb-2" dir="ltr">
                                        {tc.days.map(d => (
                                            <div key={d} className="text-center text-[10px] font-bold uppercase tracking-widest text-white/30 py-2">{d}</div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-7 gap-1" dir="ltr">
                                        {calendarDays.map((day, idx) => {
                                            if (day === null) return <div key={`blank-${idx}`} />;
                                            const past = isPast(day);
                                            const active = selectedDate === day;
                                            return (
                                                <button key={day} type="button" disabled={past} onClick={() => setSelectedDate(day)} className={`aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all duration-200 cursor-pointer ${past ? 'text-white/15 cursor-not-allowed' : ''} ${active ? 'bg-brand-red text-white shadow-[0_0_15px_rgba(236,54,66,0.4)]' : ''} ${!past && !active ? 'hover:bg-white/10 text-white/70 hover:text-white' : ''}`}>
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {selectedDate && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-6" dir="ltr">
                                            <div className="grid grid-cols-3 gap-2">
                                                {TIMES.map(t => (
                                                    <button key={t} type="button" onClick={() => setSelectedTime(t)} className={`py-2.5 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${selectedTime === t ? 'bg-brand-red/20 border-brand-red text-brand-red' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'}`}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>

                                <motion.button type="submit" disabled={loading} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="w-full bg-brand-red text-white py-6 rounded-2xl font-bold text-lg hover:bg-brand-red/90 active:scale-95 transition-all flex items-center justify-center gap-3 red-glow-strong group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {tc.sendMessage}
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </motion.div>
    );
}
