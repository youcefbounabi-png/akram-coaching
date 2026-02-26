import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Instagram, MessageCircle, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

const BRAND_RED = '#ec3642';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const [notified, setNotified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const checkoutId = searchParams.get('checkout_id');
    const [verifying, setVerifying] = useState(!!checkoutId);
    const [verifiedData, setVerifiedData] = useState<any>(null);

    // Legacy fallback (for PayPal)
    const method = searchParams.get('method') || 'Unknown';
    const plan = searchParams.get('plan') || 'Coaching';
    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';
    const amount = searchParams.get('amount') || '';
    const currency = searchParams.get('currency') || '';

    useEffect(() => {
        const triggerNotification = async () => {
            // Prevent duplicate triggers
            const txId = checkoutId ? `tx_${checkoutId}` : `notified_${method}_${name}_${amount}`;
            if (localStorage.getItem(txId)) {
                setNotified(true);
                setVerifying(false);
                return;
            }

            try {
                if (checkoutId) {
                    // Chargily Secure Flow
                    const verifyRes = await fetch('https://akram-coaching.onrender.com/api/chargily/verify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ checkoutId })
                    });

                    if (verifyRes.ok) {
                        const data = await verifyRes.json();
                        setVerifiedData(data);
                        setNotified(true);
                        localStorage.setItem(txId, 'true');

                        // Update Supabase with verified data
                        await supabase.from('client_intakes')
                            .update({ payment_status: 'paid', amount_paid: parseFloat(data.amount) || 0 })
                            .eq('email', data.email)
                            .order('submitted_at', { ascending: false })
                            .limit(1);
                    } else {
                        throw new Error('Verification failed. Payment might be pending or canceled.');
                    }
                } else if (name && amount) {
                    // Legacy PayPal Flow
                    const res = await fetch('https://akram-coaching.onrender.com/api/notify-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, plan, amount, currency, method })
                    });
                    if (res.ok) {
                        setNotified(true);
                        localStorage.setItem(txId, 'true');
                    }
                }
            } catch (err: any) {
                console.error('Verification error:', err);
                setError(err.message || 'Verification failed');
            } finally {
                setVerifying(false);
            }
        };

        triggerNotification();
    }, [checkoutId, name, amount]);

    const finalName = verifiedData?.name || name || 'Athlete';
    const finalPlan = verifiedData?.plan || plan;
    const finalAmount = verifiedData?.amount || amount;
    const finalCurrency = verifiedData?.currency || currency;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl w-full glass-panel p-8 md:p-12 text-center relative z-10 border border-white/10 rounded-[2.5rem] shadow-2xl"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mx-auto mb-8"
                >
                    {verifying ? (
                        <div className="w-12 h-12 border-4 border-brand-red border-t-white rounded-full animate-spin" />
                    ) : (
                        <CheckCircle2 size={48} className={cn(error ? "text-white/20" : "text-brand-red")} />
                    )}
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tighter">
                    {verifying ? 'VERIFYING...' : (error ? 'VERIFICATION' : 'PAYMENT')} <span className="text-brand-red">{error ? 'FAILED' : (verifying ? '' : 'SUCCESSFUL')}</span>
                </h1>

                <p className="text-lg text-white/70 font-light mb-8 leading-relaxed">
                    {verifying ? (
                        'Securing your transaction with Chargily...'
                    ) : error ? (
                        <span className="text-brand-red">{error}</span>
                    ) : (
                        <>
                            Welcome to the team, <span className="text-white font-bold">{finalName}</span>!
                            <br />
                            Your <span className="text-white font-bold">{finalPlan}</span> plan is now active.
                        </>
                    )}
                </p>

                {!verifying && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-start">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-[10px] text-white/40 uppercase font-black mb-1">Plan</p>
                            <p className="text-white font-medium">{finalPlan}</p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <p className="text-[10px] text-white/40 uppercase font-black mb-1">Amount</p>
                            <p className="text-white font-medium">{finalAmount} {finalCurrency}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <p className="text-sm text-white/50 mb-6 italic">
                        Coach Akram has been notified. He will contact you on WhatsApp within 24-48 hours.
                    </p>

                    <Link
                        to="/"
                        className="w-full py-4 rounded-2xl bg-brand-red text-white font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95 red-glow"
                    >
                        Back to Home <ArrowRight size={18} />
                    </Link>

                    <div className="pt-8 flex items-center justify-center gap-6 border-t border-white/10 mt-8">
                        <a href="https://instagram.com/dr_akramikni" target="_blank" className="text-white/40 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://wa.me/213783766209" target="_blank" className="text-white/40 hover:text-white transition-colors">
                            <MessageCircle size={20} />
                        </a>
                    </div>
                </div>

                {error && (
                    <p className="mt-6 text-xs text-brand-red/60">{error}</p>
                )}
            </motion.div>
        </div>
    );
}
