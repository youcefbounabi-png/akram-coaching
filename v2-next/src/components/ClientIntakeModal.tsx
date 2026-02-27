"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { cn } from '../lib/utils';
import { useLanguage } from '../i18n/LanguageContext';
import { BRAND } from '../constants';
import { supabase } from '../lib/supabase';
import type { TranslationKeys } from '../i18n/translations';

// ─── Types ────────────────────────────────────────────────────────────────────

interface IntakeData {
    // step 1
    name: string; email: string; whatsapp: string; age: string;
    gender: string; country: string;
    // step 2
    weight: string; height: string; injuries: string; goal: string;
    // step 3
    frontPic: string; sidePic: string; backPic: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    planName: string;
    planPrice: string;
    planPriceNumeric: number;
    planCurrency: string;
}

// ─── Field Helpers ────────────────────────────────────────────────────────────

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

const inputCls = "w-full bg-white/5 border border-white/10 focus:border-brand-red/60 focus:bg-white/8 outline-none rounded-2xl px-4 py-3.5 text-white placeholder:text-white/25 text-sm transition-all duration-200 font-light";
const selectCls = `${inputCls} appearance-none cursor-pointer`;
const textareaCls = `${inputCls} resize-none`;

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

function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
                onChange(event.target.result);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            <label className={cn(
                "relative flex flex-col items-center justify-center w-full h-32 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden",
                value ? "border-brand-red bg-brand-red/5" : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
            )}>
                {value ? (
                    <img src={value} alt={label} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                ) : null}
                <div className="z-10 flex flex-col items-center justify-center text-center p-4">
                    {value ? (
                        <div className="bg-brand-red text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Uploaded
                        </div>
                    ) : (
                        <>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-2 text-white/50">
                                +
                            </div>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-white/50">Click to upload</span>
                        </>
                    )}
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
        </div>
    );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ data, update, t }: { data: IntakeData; update: (k: keyof IntakeData, v: string) => void; t: TranslationKeys }) {
    const f = t.intake.fields;
    return (
        <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
                <FieldWrapper label={f.fullName} required>
                    <input type="text" className={inputCls} placeholder="e.g. Omar Benali" value={data.name} onChange={e => update('name', e.target.value)} />
                </FieldWrapper>
                <FieldWrapper label={f.email} required>
                    <input type="email" className={inputCls} placeholder="your@email.com" value={data.email} onChange={e => update('email', e.target.value)} />
                </FieldWrapper>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <FieldWrapper label={f.whatsapp} required>
                    <input type="tel" className={inputCls} placeholder="+213 7XX XXX XXX" value={data.whatsapp} onChange={e => update('whatsapp', e.target.value)} />
                </FieldWrapper>
                <FieldWrapper label={f.age} required>
                    <input type="number" min={14} max={80} className={inputCls} placeholder="25" value={data.age} onChange={e => update('age', e.target.value)} />
                </FieldWrapper>
            </div>
            <FieldWrapper label={f.gender} required>
                <RadioGroup
                    value={data.gender}
                    onChange={v => update('gender', v)}
                    options={[{ value: 'male', label: f.genderM }, { value: 'female', label: f.genderF }]}
                />
            </FieldWrapper>
            <FieldWrapper label={f.country} required>
                <input type="text" className={inputCls} placeholder="Algeria, Qatar, France…" value={data.country} onChange={e => update('country', e.target.value)} />
            </FieldWrapper>
        </div>
    );
}

function Step2({ data, update, t }: { data: IntakeData; update: (k: keyof IntakeData, v: string) => void; t: TranslationKeys }) {
    const f = t.intake.fields;
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <FieldWrapper label={f.weight} required>
                    <input type="number" className={inputCls} placeholder="80" value={data.weight} onChange={e => update('weight', e.target.value)} />
                </FieldWrapper>
                <FieldWrapper label={f.height} required>
                    <input type="number" className={inputCls} placeholder="175" value={data.height} onChange={e => update('height', e.target.value)} />
                </FieldWrapper>
            </div>
            <FieldWrapper label={f.goal} required>
                <select className={selectCls} value={data.goal} onChange={e => update('goal', e.target.value)}>
                    <option value="muscle" className="bg-[#050505]">{f.goalMuscle}</option>
                    <option value="fat-loss" className="bg-[#050505]">{f.goalFat}</option>
                    <option value="recomp" className="bg-[#050505]">{f.goalRecomp}</option>
                    <option value="90-day" className="bg-[#050505]">{f.goal90}</option>
                    <option value="comp-prep" className="bg-[#050505]">{f.goalComp}</option>
                    <option value="general-health" className="bg-[#050505]">{f.goalHealth}</option>
                </select>
            </FieldWrapper>
            <FieldWrapper label={f.injuries}>
                <textarea rows={2} className={textareaCls} placeholder={f.injuriesPlaceholder} value={data.injuries} onChange={e => update('injuries', e.target.value)} />
            </FieldWrapper>
        </div>
    );
}

function Step3({ data, update, t }: { data: IntakeData; update: (k: keyof IntakeData, v: string) => void; t: TranslationKeys }) {
    const f = t.intake.fields;
    return (
        <div className="space-y-5">
            <p className="text-sm text-white/60 font-light mb-4">{f.uploadInstruction}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ImageUpload label={f.frontPic} value={data.frontPic} onChange={v => update('frontPic', v)} />
                <ImageUpload label={f.sidePic} value={data.sidePic} onChange={v => update('sidePic', v)} />
                <ImageUpload label={f.backPic} value={data.backPic} onChange={v => update('backPic', v)} />
            </div>
        </div>
    );
}

// ─── Step Completeness Guards ─────────────────────────────────────────────────

function isStep1Valid(d: IntakeData) {
    return !!d.name.trim() && !!d.email.trim() && !!d.whatsapp.trim() && !!d.age && !!d.gender && !!d.country.trim();
}
function isStep2Valid(d: IntakeData) {
    return !!d.weight && !!d.height && !!d.goal;
}
function isStep3Valid(d: IntakeData) {
    return !!d.frontPic && !!d.sidePic && !!d.backPic;
}
const validators = [isStep1Valid, isStep2Valid, isStep3Valid];

// ─── Main Component ───────────────────────────────────────────────────────────

const initialData: IntakeData = {
    name: '', email: '', whatsapp: '', age: '', gender: '', country: '',
    weight: '', height: '', injuries: '', goal: 'muscle',
    frontPic: '', sidePic: '', backPic: ''
};

export default function ClientIntakeModal({
    isOpen,
    onClose,
    planName,
    planPrice,
    planPriceNumeric,
    planCurrency
}: Props) {
    const { t, isRTL } = useLanguage();
    const [step, setStep] = useState(0);
    const [data, setData] = useState<IntakeData>(initialData);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [intakeId, setIntakeId] = useState<string | number | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'paid'>('unpaid');

    const ti = t.intake;
    const STEPS = [ti.step1, ti.step2, ti.step3];

    const update = (key: keyof IntakeData, value: string) =>
        setData(d => ({ ...d, [key]: value }));

    const handleSubmit = async () => {
        setStatus('loading');
        try {
            const { data: insertedData, error } = await supabase.from('client_intakes').insert([{
                full_name: data.name,
                email: data.email,
                phone: data.whatsapp,
                age: parseInt(data.age) || null,
                gender: data.gender,
                current_weight: parseFloat(data.weight) || null,
                targeted_weight: null, // User is not asked this in the current form step, but it's in the schema just in case
                fitness_goal: data.goal,
                current_diet: '', // Assume text for now, can be updated later
                physical_activity: '',
                medical_conditions: data.injuries,
                status: 'pending'
            }]).select();

            if (error) throw error;
            if (insertedData && insertedData[0]) {
                setIntakeId(insertedData[0].id);
            }

            await fetch('https://akram-coaching.onrender.com/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, plan: planName, type: 'intake' }),
            }).then(r => {
                if (!r.ok) console.warn('[Intake] Email automation might have failed.');
            }).catch(e => console.error('[Intake] Email API unreachable:', e));

            setStatus('success');
        } catch (error) {
            console.error('Error submitting intake form:', error);
            setStatus('error');
        }
    };

    const canProceed = validators[step]?.(data) ?? true;

    // Reset on close
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
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-[#0d0d0d] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className={cn(
                                "absolute top-4 z-10 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer",
                                isRTL ? 'left-4' : 'right-4'
                            )}
                            aria-label="Close modal"
                        >
                            <X size={16} />
                        </button>

                        {/* Header */}
                        <div className="px-8 pt-8 pb-6 border-b border-white/8 shrink-0">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 rounded-full">
                                    {planName} — {planPrice}
                                </div>
                            </div>
                            <h2 className="text-xl font-display font-black tracking-tight mb-1">{ti.title}</h2>
                            <p className="text-white/40 text-sm font-light">{ti.subtitle}</p>

                            {/* Step indicator */}
                            {status === 'idle' && (
                                <div className="flex items-center gap-2 mt-5">
                                    {STEPS.map((label, i) => (
                                        <div key={i} className="flex items-center gap-2 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className={cn(
                                                    'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-all duration-300',
                                                    i < step ? 'bg-brand-red text-white' :
                                                        i === step ? 'bg-brand-red/20 border border-brand-red text-brand-red' :
                                                            'bg-white/5 border border-white/10 text-white/30'
                                                )}>
                                                    {i < step ? '✓' : i + 1}
                                                </div>
                                                <span className={cn(
                                                    'text-[10px] font-bold uppercase tracking-wide hidden sm:block transition-colors',
                                                    i === step ? 'text-white' : 'text-white/30'
                                                )}>
                                                    {label}
                                                </span>
                                            </div>
                                            {i < STEPS.length - 1 && (
                                                <div className={cn('flex-1 h-px transition-all duration-500', i < step ? 'bg-brand-red' : 'bg-white/8')} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Body (scrollable) */}
                        <div className="overflow-y-auto flex-1 px-8 py-6">
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div
                                        key={step}
                                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {step === 0 && <Step1 data={data} update={update} t={t} />}
                                        {step === 1 && <Step2 data={data} update={update} t={t} />}
                                        {step === 2 && <Step3 data={data} update={update} t={t} />}
                                    </motion.div>
                                )}

                                {status === 'loading' && (
                                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 gap-4">
                                        <Loader2 size={40} className="text-brand-red animate-spin" />
                                        <p className="text-white/60 font-light">{ti.submitting}</p>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-6 space-y-8"
                                    >
                                        <div className="text-center">
                                            <motion.div
                                                initial={{ scale: 0.5 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                className="w-20 h-20 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mx-auto mb-6"
                                            >
                                                <CheckCircle2 size={36} className="text-brand-red" />
                                            </motion.div>
                                            <h3 className="text-2xl font-display font-black mb-3">{ti.successTitle}</h3>
                                            <p className="text-white/60 font-light text-sm max-w-md mx-auto leading-relaxed">{ti.successMsg}</p>
                                        </div>

                                        {/* Payment section unlocked */}
                                        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-3">
                                            <div className="text-[11px] font-black uppercase tracking-[0.15em] text-white/30 mb-4">
                                                {planName} Plan — Proceed to Payment
                                            </div>

                                            {/* BaridiMob/Chargily (DZD only) */}
                                            {planCurrency === 'DZD' && (
                                                <div className="mt-4">
                                                    <button
                                                        onClick={async (e) => {
                                                            const btn = e.currentTarget;
                                                            const origText = btn.innerHTML;
                                                            btn.innerHTML = '<span class="animate-pulse flex items-center gap-2"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating Checkout...</span>';
                                                            btn.classList.add('opacity-80', 'cursor-wait', 'pointer-events-none');
                                                            try {
                                                                const successParams = new URLSearchParams({
                                                                    method: 'Chargily',
                                                                    plan: planName,
                                                                    name: data.name,
                                                                    email: data.email,
                                                                    amount: planPriceNumeric.toString(),
                                                                    currency: 'DZD'
                                                                }).toString();

                                                                const res = await fetch('https://akram-coaching.onrender.com/api/chargily/create-checkout', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({
                                                                        amount: planPriceNumeric,
                                                                        currency: 'DZD',
                                                                        planName: planName,
                                                                        clientName: data.name,
                                                                        clientEmail: data.email,
                                                                        successUrl: window.location.origin + '/payment-success?' + successParams,
                                                                        failureUrl: window.location.origin + '?payment=failed'
                                                                    })
                                                                });
                                                                const resultData = await res.json();

                                                                if (!res.ok) throw new Error(resultData.error || 'Failed to create payment checkout');
                                                                if (!resultData.checkoutUrl) throw new Error('No checkout URL returned from server.');

                                                                // Redirect to the Chargily secure checkout
                                                                window.location.href = resultData.checkoutUrl;
                                                            } catch (err) {
                                                                console.error('[chargily-frontend] Error:', err);
                                                                alert(`Payment Error: ${String(err)}\n\nPlease try again or contact Coach Akram.`);
                                                                btn.innerHTML = origText;
                                                                btn.classList.remove('opacity-80', 'cursor-wait', 'pointer-events-none');
                                                            }
                                                        }}
                                                        className="w-full py-4 rounded-2xl bg-brand-red text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-95 red-glow focus:outline-none"
                                                    >
                                                        Pay with EDAHABIA / CIB
                                                    </button>
                                                </div>
                                            )}

                                            {/* PayPal (EUR/USD only) */}
                                            {planCurrency !== 'DZD' && (
                                                <div className="mt-4">
                                                    <PayPalButtons
                                                        style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                                                        createOrder={(_data, actions) => {
                                                            console.log(`[PayPal] Creating order for ${planName}: ${planPriceNumeric} ${planCurrency}`);
                                                            return actions.order.create({
                                                                intent: "CAPTURE",
                                                                purchase_units: [
                                                                    {
                                                                        description: `${planName} Coaching Plan`,
                                                                        amount: {
                                                                            currency_code: planCurrency,
                                                                            value: planPriceNumeric.toString(),
                                                                        },
                                                                    },
                                                                ],
                                                            });
                                                        }}
                                                        onApprove={async (_data, actions) => {
                                                            const details = await actions.order?.capture();
                                                            console.log('[PayPal] Payment completed:', details);

                                                            // Update Database with payment status
                                                            if (intakeId) {
                                                                await supabase.from('client_intakes')
                                                                    .update({
                                                                        payment_status: 'paid',
                                                                        amount_paid: planPriceNumeric
                                                                    })
                                                                    .eq('id', intakeId);
                                                            }

                                                            // Inform server to send email to Akram
                                                            try {
                                                                await fetch('https://akram-coaching.onrender.com/api/notify-payment', {
                                                                    method: 'POST',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({
                                                                        name: data.name,
                                                                        email: data.email,
                                                                        plan: planName,
                                                                        amount: planPriceNumeric,
                                                                        currency: planCurrency,
                                                                        method: 'PayPal'
                                                                    })
                                                                });
                                                            } catch (notifyErr) {
                                                                console.error('[PayPal] Notification error:', notifyErr);
                                                            }

                                                            setPaymentStatus('paid');
                                                            handleClose();
                                                        }}
                                                        onCancel={(data) => {
                                                            console.warn('[PayPal] Payment cancelled:', data);
                                                        }}
                                                        onError={(err) => {
                                                            console.error('[PayPal] Initialization or execution error:', err);
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            <a
                                                href={BRAND.socials.whatsapp}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3 rounded-2xl text-sm text-white/40 hover:text-white text-center transition-colors cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                Or message on WhatsApp
                                            </a>
                                        </div>
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

                        {/* Footer nav */}
                        {status === 'idle' && (
                            <div className="px-8 pb-8 pt-4 border-t border-white/8 flex items-center justify-between gap-3 shrink-0">
                                {step > 0 ? (
                                    <button
                                        onClick={() => setStep(s => s - 1)}
                                        className="flex items-center gap-2 text-white/50 hover:text-white font-bold text-sm transition-colors cursor-pointer"
                                    >
                                        {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                                        {ti.back}
                                    </button>
                                ) : <div />}

                                {step < 2 ? (
                                    <button
                                        onClick={() => setStep(s => s + 1)}
                                        disabled={!canProceed}
                                        className={cn(
                                            'flex items-center gap-2 bg-brand-red text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer',
                                            canProceed ? 'hover:bg-brand-red/90 hover:scale-105 active:scale-95' : 'opacity-40 cursor-not-allowed'
                                        )}
                                    >
                                        {ti.next}
                                        {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!canProceed}
                                        className={cn(
                                            'flex items-center gap-2 bg-brand-red text-white px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer red-glow',
                                            canProceed ? 'hover:bg-brand-red/90 hover:scale-105 active:scale-95' : 'opacity-40 cursor-not-allowed'
                                        )}
                                    >
                                        {ti.submit}
                                        {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
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
