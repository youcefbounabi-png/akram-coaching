import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { BRAND, ALGERIAN_STATES } from '../constants';

interface IntakeData {
    firstName: string;
    lastName: string;
    phone: string;
    age: string;
    gender: 'male' | 'female' | '';
    state: string;
    district: string;
    deliveryPref: 'desk' | 'home' | '';
    weight: string;
    height: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const inputCls = "w-full bg-white/5 border border-white/10 focus:border-brand-red/60 focus:bg-white/8 outline-none rounded-2xl px-4 py-3.5 text-white placeholder:text-white/25 text-sm transition-all duration-200 font-light";
const selectCls = `${inputCls} appearance-none cursor-pointer`;

function FieldWrapper({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
    return (
        <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">
                {label}{required && <span className="text-brand-red mx-1">*</span>}
            </label>
            {children}
        </div>
    );
}

function RadioGroup({
    value, onChange, options
}: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
    return (
        <div className="grid grid-cols-2 gap-2">
            {options.map(opt => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onChange(opt.value)}
                    className={cn(
                        'px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer text-start',
                        value === opt.value
                            ? 'bg-brand-red/15 border-brand-red text-white'
                            : 'bg-white/3 border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                    )}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

function isStep1Valid(d: IntakeData) {
    return !!d.firstName.trim() && !!d.lastName.trim() && !!d.phone.trim() && !!d.age && !!d.gender;
}

function isStep2Valid(d: IntakeData) {
    return !!d.state && !!d.district.trim() && !!d.deliveryPref && !!d.weight && !!d.height;
}

const initialData: IntakeData = {
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    gender: '',
    state: '',
    district: '',
    deliveryPref: '',
    weight: '',
    height: ''
};

export default function ChallengeIntakeModal({ isOpen, onClose }: Props) {
    const { t, isRTL } = useLanguage();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<IntakeData>(initialData);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    React.useEffect(() => {
        if (isOpen) {
            fetch('https://akram-coaching.onrender.com/api/health').catch(() => { });
        }
    }, [isOpen]);

    const f = t.intake.fields;
    const update = (key: keyof IntakeData, value: string) => setData(d => ({ ...d, [key]: value }));

    const handleChargilyPay = async () => {
        setStatus('loading');
        try {
            const planName = t.nav.challenge;
            const price = 9900;
            const successParams = new URLSearchParams({
                method: 'Chargily',
                plan: planName + ' (Physical)',
                name: `${data.firstName} ${data.lastName}`,
                email: 'no-email@akram-coaching.com',
                amount: price.toString(),
                currency: 'DZD'
            }).toString();

            const res = await fetch('https://akram-coaching.onrender.com/api/chargily/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: price,
                    currency: 'DZD',
                    planName: planName + ' (Physical)',
                    clientName: `${data.firstName} ${data.lastName}`,
                    clientEmail: 'no-email@akram-coaching.com',
                    successUrl: window.location.origin + '/payment-success?' + successParams,
                    failureUrl: window.location.origin + '/challenge'
                })
            });

            const resultData = await res.json();
            if (!res.ok) throw new Error(resultData.error || 'Failed to create payment checkout');
            if (!resultData.checkoutUrl) throw new Error('No checkout URL returned from server.');

            // Fire Meta Pixel InitiateCheckout event
            if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout', {
                    content_name: planName + ' (Physical)',
                    content_category: 'Challenge',
                    value: price,
                    currency: 'DZD'
                });
            }

            setStatus('success');

            // Redirect after a brief moment so they see success message
            setTimeout(() => {
                window.location.href = resultData.checkoutUrl;
            }, 2000);
        } catch (error) {
            console.error('[Challenge] Payment error:', error);
            setStatus('error');
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => { setStep(0); setData(initialData); setStatus('idle'); }, 300);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0,0,0,0.85)' }}
                    onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-[#0d0d0d] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <button
                            onClick={handleClose}
                            className={cn(
                                "absolute top-4 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer",
                                isRTL ? 'left-4' : 'right-4'
                            )}
                        >
                            <X size={16} />
                        </button>

                        <div className="px-8 pt-8 pb-6 border-b border-white/8 shrink-0 text-center">
                            <div className="inline-block bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4">
                                9,900 DZD
                            </div>
                            <h2 className="text-xl font-display font-black tracking-tight mb-1">{t.nav.challenge}</h2>
                            <p className="text-white/40 text-sm font-light">
                                {isRTL ? 'برنامج البدء الجاهز والتوصيل' : 'Ready-made physical program checkout'}
                            </p>

                            {status === 'idle' && (
                                <div className="flex items-center gap-2 mt-5">
                                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-brand-red transition-all duration-300" style={{ width: step === 0 ? '50%' : '100%' }} />
                                    </div>
                                    <span className="text-xs text-brand-red tracking-widest font-bold">STEP {step + 1}</span>
                                </div>
                            )}
                        </div>

                        <div className="overflow-y-auto flex-1 px-8 py-6">
                            <AnimatePresence mode="wait">
                                {status === 'idle' && step === 0 && (
                                    <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FieldWrapper label={f.fullName || "First Name"} required>
                                                <input type="text" className={inputCls} placeholder="e.g. Omar" value={data.firstName} onChange={e => update('firstName', e.target.value)} />
                                            </FieldWrapper>
                                            <FieldWrapper label={f.lastName || "Last Name"} required>
                                                <input type="text" className={inputCls} placeholder="e.g. Benali" value={data.lastName} onChange={e => update('lastName', e.target.value)} />
                                            </FieldWrapper>
                                        </div>
                                        <FieldWrapper label={f.whatsapp || "Phone Number"} required>
                                            <input type="tel" className={inputCls} placeholder="05XX XX XX XX" value={data.phone} onChange={e => update('phone', e.target.value)} />
                                        </FieldWrapper>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FieldWrapper label={f.age || "Age"} required>
                                                <input type="number" min={14} max={80} className={inputCls} placeholder="25" value={data.age} onChange={e => update('age', e.target.value)} />
                                            </FieldWrapper>
                                            <FieldWrapper label={f.gender || "Gender"} required>
                                                <RadioGroup value={data.gender} onChange={v => update('gender', v)} options={[{ value: 'male', label: f.genderM || 'Male' }, { value: 'female', label: f.genderF || 'Female' }]} />
                                            </FieldWrapper>
                                        </div>
                                    </motion.div>
                                )}

                                {status === 'idle' && step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <FieldWrapper label={f.weight || "Weight (Kg)"} required>
                                                <input type="number" className={inputCls} placeholder="80" value={data.weight} onChange={e => update('weight', e.target.value)} />
                                            </FieldWrapper>
                                            <FieldWrapper label={f.height || "Height (cm)"} required>
                                                <input type="number" className={inputCls} placeholder="175" value={data.height} onChange={e => update('height', e.target.value)} />
                                            </FieldWrapper>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <FieldWrapper label={f.state || "State"} required>
                                                <select className={selectCls} value={data.state} onChange={e => update('state', e.target.value)}>
                                                    <option value="" disabled className="bg-brand-dark">Select</option>
                                                    {ALGERIAN_STATES.map(s => <option key={s} value={s} className="bg-[#050505]">{s}</option>)}
                                                </select>
                                            </FieldWrapper>
                                            <FieldWrapper label={f.district || "District"} required>
                                                <input type="text" className={inputCls} placeholder="e.g. Bab Ezzouar" value={data.district} onChange={e => update('district', e.target.value)} />
                                            </FieldWrapper>
                                        </div>
                                        <FieldWrapper label={f.deliveryPref || "Delivery Preference"} required>
                                            <RadioGroup
                                                value={data.deliveryPref}
                                                onChange={v => update('deliveryPref', v)}
                                                options={[{ value: 'desk', label: f.deliveryDesk || 'Stop Desk' }, { value: 'home', label: f.deliveryHome || 'Home Delivery' }]}
                                            />
                                        </FieldWrapper>

                                        <div className="p-4 rounded-xl bg-brand-red/10 border border-brand-red/20 text-center mt-6">
                                            <h4 className="text-sm font-bold text-white mb-1">{t.books.physicalNotice || 'Physical Delivery'}</h4>
                                            <p className="text-white/60 text-xs font-light">{t.books.deliveryNotice || 'Will be delivered in 24-48 hours'}</p>
                                        </div>
                                    </motion.div>
                                )}

                                {status === 'loading' && (
                                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
                                        <Loader2 size={40} className="text-brand-red animate-spin" />
                                        <p className="text-white/60 font-light">{isRTL ? 'جاري التحويل...' : 'Redirecting to checkout...'}</p>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center space-y-4">
                                        <CheckCircle2 size={48} className="text-brand-red mx-auto mb-4" />
                                        <h3 className="text-2xl font-display font-black">Redirecting...</h3>
                                        <p className="text-white/60 font-light text-sm">Transferring you to secure payment.</p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 gap-4">
                                        <AlertCircle size={40} className="text-brand-red" />
                                        <p className="text-white/60 text-sm">Something went wrong. Please try again.</p>
                                        <button onClick={() => setStatus('idle')} className="text-brand-red font-bold text-sm underline cursor-pointer">Go back</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {status === 'idle' && (
                            <div className="px-8 pb-8 pt-4 border-t border-white/8 flex items-center justify-between gap-3 shrink-0">
                                {step > 0 ? (
                                    <button onClick={() => setStep(0)} className="flex items-center gap-2 text-white/50 hover:text-white font-bold text-sm transition-colors cursor-pointer">
                                        {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />} Back
                                    </button>
                                ) : <div />}

                                {step === 0 ? (
                                    <button
                                        onClick={() => setStep(1)}
                                        disabled={!isStep1Valid(data)}
                                        className={cn('flex items-center gap-2 bg-brand-red text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer', isStep1Valid(data) ? 'hover:bg-brand-red/90 hover:scale-105 active:scale-95' : 'opacity-40 cursor-not-allowed')}
                                    >
                                        Next {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleChargilyPay}
                                        disabled={!isStep2Valid(data)}
                                        className={cn('flex items-center gap-2 bg-brand-red text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer red-glow', isStep2Valid(data) ? 'hover:bg-brand-red/90 hover:scale-105 active:scale-95' : 'opacity-40 cursor-not-allowed')}
                                    >
                                        Pay 9,900 DZD {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
