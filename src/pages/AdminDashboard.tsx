import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
    Lock, LogOut, TrendingUp, Users, DollarSign, Percent,
    MessageSquare, Calendar, CheckCircle, Clock, XCircle, Eye, EyeOff, Loader2, RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

// ─── Constants ───────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'akram2024';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Submission {
    id: number | string;
    name: string;
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
    age: string | null;
    gender: string | null;
    country: string | null;
    weight: string | null;
    height: string | null;
    goals: string | null;
    injuries: string | null;
    plan: string;
    type: 'intake' | 'contact' | 'booking';
    date?: string;
    time?: string;
    payment_status?: 'paid' | 'unpaid';
    amount_paid?: number;
    submittedAt: string;
    status: 'pending' | 'contacted' | 'resolved';
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { icon: React.ComponentType<{ size?: number }>, cls: string }> = {
        pending: { icon: Clock, cls: 'text-amber-400 bg-amber-400/10' },
        contacted: { icon: CheckCircle, cls: 'text-emerald-400 bg-emerald-400/10' },
        resolved: { icon: CheckCircle, cls: 'text-brand-red/80 bg-brand-red/10' },
    };
    const cfg = map[status] ?? map.pending;
    const Icon = cfg.icon;
    return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide', cfg.cls)}>
            <Icon size={11} /> {status}
        </span>
    );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('admin_token', 'authenticated');
            onLogin();
        } else {
            setError('Incorrect password. Try again.');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] bg-brand-red/8 rounded-full blur-[160px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-sm mx-4"
            >
                <div className="glass-panel rounded-3xl p-10 border border-white/10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lock className="text-brand-red" size={28} />
                        </div>
                        <h1 className="text-2xl font-display font-black tracking-tight">Admin Access</h1>
                        <p className="text-white/40 text-sm mt-2">Akram Coaching Dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <input
                                type={show ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                placeholder="Enter password"
                                className="w-full bg-white/5 border border-white/10 focus:border-brand-red/60 outline-none rounded-2xl px-4 py-3.5 text-white placeholder:text-white/30 text-sm pr-12 transition-colors"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                aria-label={show ? 'Hide password' : 'Show password'}
                            >
                                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-brand-red text-sm text-center"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            Enter Dashboard
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
    trend,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    sub?: string;
    trend?: string;
}) {
    return (
        <div className="glass-panel rounded-2xl p-4 md:p-6 border border-white/8 hover:border-white/15 transition-all duration-300 cursor-default">
            <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                    <Icon size={16} className="text-brand-red md:w-[18px] md:h-[18px]" />
                </div>
                {trend && (
                    <span className="text-emerald-400 text-[9px] md:text-xs font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        {trend}
                    </span>
                )}
            </div>
            <div className="text-xl md:text-3xl font-display font-black tracking-tight mb-1">{value}</div>
            <div className="text-white/40 text-[9px] md:text-xs uppercase tracking-[0.12em] font-medium leading-tight">{label}</div>
            {sub && <div className="text-white/30 text-[9px] md:text-xs mt-1 md:mt-1 leading-tight">{sub}</div>}
        </div>
    );
}

// ─── Dashboard Content ───────────────────────────────────────────────────────

import { supabase } from '../lib/supabase';

function DashboardContent({ onLogout }: { onLogout: () => void }) {
    const [activeSection, setActiveSection] = useState<'overview' | 'bookings' | 'messages'>('overview');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [totalVisits, setTotalVisits] = useState(0);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<number | string | null>(null);

    const fetchSubmissions = async () => {
        try {
            // Fetch Intakes
            const { data: intakesData, error: intakesError } = await supabase
                .from('client_intakes')
                .select('*')
                .order('created_at', { ascending: false });

            if (intakesError) throw intakesError;

            // Fetch Contact Messages
            const { data: messagesData, error: messagesError } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (messagesError) throw messagesError;

            // Fetch Bookings
            const { data: bookingsData, error: bookingsError } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (bookingsError) throw bookingsError;

            // Fetch Visits
            const { count: visitsCount, error: visitsError } = await supabase
                .from('site_visits')
                .select('*', { count: 'exact', head: true });

            if (visitsError) throw visitsError;
            setTotalVisits(visitsCount || 0);

            // Map Intakes
            const intakes: Submission[] = (intakesData || []).map((item) => ({
                id: item.id,
                name: item.full_name,
                email: item.email,
                phone: item.phone,
                whatsapp: item.phone,
                age: item.age?.toString() || null,
                gender: item.gender,
                country: null,
                weight: item.current_weight?.toString() || null,
                height: null,
                goals: item.fitness_goal,
                injuries: item.medical_conditions,
                plan: 'Standard',
                type: 'intake',
                payment_status: item.payment_status,
                amount_paid: item.amount_paid,
                submittedAt: new Date(item.created_at).toLocaleString(),
                status: item.status as any,
            }));

            // Map Contacts
            const contacts: Submission[] = (messagesData || []).map((item) => ({
                id: item.id,
                name: item.name,
                email: item.email,
                phone: null,
                whatsapp: null,
                age: null,
                gender: null,
                country: null,
                weight: null,
                height: null,
                goals: item.subject,
                injuries: null,
                plan: 'None',
                type: 'contact',
                submittedAt: new Date(item.created_at).toLocaleString(),
                status: item.is_read ? 'resolved' : 'pending',
            }));

            // Map Bookings
            const appointments: Submission[] = (bookingsData || []).map((item) => ({
                id: item.id,
                name: item.client_name,
                email: item.client_email || null,
                phone: item.client_phone,
                whatsapp: item.client_phone,
                age: null,
                gender: null,
                country: null,
                weight: null,
                height: null,
                goals: item.goal,
                injuries: null,
                plan: 'Booking',
                type: 'booking',
                payment_status: item.payment_status,
                amount_paid: item.amount_paid || 0,
                date: item.booking_date,
                time: item.booking_time,
                submittedAt: new Date(item.created_at).toLocaleString(),
                status: item.status as any,
            }));

            // Combine and sort by date descending
            const combined = [...intakes, ...contacts, ...appointments].sort(
                (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
            );

            setSubmissions(combined);
        } catch (err) {
            console.error('Failed to fetch submissions from Supabase:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleUpdateStatus = async (id: number | string, status: string, type: 'intake' | 'contact' | 'booking') => {
        setUpdating(id);
        try {
            if (type === 'intake') {
                const { error } = await supabase
                    .from('client_intakes')
                    .update({ status })
                    .eq('id', id);
                if (error) throw error;
            } else if (type === 'contact') {
                const { error } = await supabase
                    .from('contact_messages')
                    .update({ is_read: status === 'resolved' || status === 'contacted' })
                    .eq('id', id);
                if (error) throw error;
            } else if (type === 'booking') {
                const { error } = await supabase
                    .from('bookings')
                    .update({ status })
                    .eq('id', id);
                if (error) throw error;
            }

            // Update local state
            setSubmissions(prev => prev.map(s =>
                s.id === id ? { ...s, status: status as any } : s
            ));
        } catch (err) {
            console.error('Failed to update status in Supabase:', err);
        } finally {
            setUpdating(null);
        }
    };

    const challengeIntakes = submissions.filter(s => s.type === 'intake');
    const consultationBookings = submissions.filter(s => s.type === 'booking');
    const displayBookings = [...challengeIntakes, ...consultationBookings].sort(
        (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    const messages = submissions.filter(s => s.type === 'contact' || s.type === 'booking');
    const unread = messages.filter((m) => m.status === 'pending').length;

    // Derived Stats
    const totalRevenueCalculated = submissions.reduce((acc, s) => acc + (s.amount_paid || 0), 0);
    const paidClientsCount = submissions.filter(s => s.payment_status === 'paid').length;

    const planCounts = challengeIntakes.reduce((acc, s) => {
        acc[s.plan] = (acc[s.plan] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const planDistribution = [
        { name: 'Standard', value: planCounts['Standard'] || 0, color: '#6b7280' },
        { name: 'Premium', value: planCounts['Premium'] || 0, color: '#ec3642' },
        { name: 'Elite', value: planCounts['Elite'] || 0, color: '#f97316' },
    ].filter(p => p.value > 0);

    // Normalize for Pie Chart percentages
    const totalPlans = planDistribution.reduce((acc, p) => acc + p.value, 0);
    const planDistributionPerc = planDistribution.map(p => ({
        ...p,
        perc: totalPlans > 0 ? Math.round((p.value / totalPlans) * 100) : 0
    }));

    const funnelData = [
        { stage: 'Visits', count: totalVisits },
        { stage: 'Leads', count: submissions.length },
        { stage: 'Sales', count: paidClientsCount },
        { stage: 'Resolved', count: submissions.filter(s => s.status === 'resolved').length },
    ];

    // Calculate Trend Data (Last 14 Days)
    const trendData = useMemo(() => {
        const last14Days = Array.from({ length: 14 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (13 - i));
            return d.toISOString().split('T')[0];
        });

        return last14Days.map(date => {
            const dayLeads = submissions.filter(s => s.submittedAt.includes(date.split('-').reverse().join('/')) || s.submittedAt.includes(date)).length;
            const dayRevenue = submissions
                .filter(s => (s.submittedAt.includes(date.split('-').reverse().join('/')) || s.submittedAt.includes(date)) && s.payment_status === 'paid')
                .reduce((acc, s) => acc + (s.amount_paid || 0), 0);

            return {
                date: date.split('-').slice(1).join('/'), // MM/DD
                leads: dayLeads,
                revenue: dayRevenue / 1000 // In K
            };
        });
    }, [submissions]);

    const tooltipStyle = {
        backgroundColor: '#111',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '12px',
    };

    return (
        <div className="min-h-screen bg-brand-dark text-white">
            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-brand-dark/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-display font-black tracking-tight">Akram Coaching</h1>
                        <p className="text-white/40 text-xs">Admin Dashboard</p>
                    </div>

                    {/* Nav Tabs */}
                    <nav className="flex items-center gap-1 glass-panel rounded-full p-1 overflow-x-auto hide-scrollbar max-w-[50%] md:max-w-none">
                        {(['overview', 'bookings', 'messages'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setActiveSection(s)}
                                className={cn(
                                    'px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative whitespace-nowrap',
                                    activeSection === s ? 'bg-brand-red text-white' : 'text-white/50 hover:text-white'
                                )}
                            >
                                {s}
                                {s === 'messages' && unread > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red rounded-full text-[9px] font-black flex items-center justify-center border border-brand-dark">
                                        {unread}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </header>

            {/* Body */}
            <main className="max-w-7xl mx-auto px-6 py-10">
                <AnimatePresence mode="wait">
                    {activeSection === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                            {/* Stat Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard icon={DollarSign} label="Verified Revenue" value={`${(totalRevenueCalculated).toLocaleString()} DZD`} sub="From paid clients" />
                                <StatCard icon={Users} label="Total Leads" value={submissions.length.toString()} sub="All time" />
                                <StatCard icon={Percent} label="Conversion Rate" value={`${totalVisits > 0 ? ((paidClientsCount / totalVisits) * 100).toFixed(1) : 0}%`} sub={`Based on ${totalVisits} visits`} />
                                <StatCard icon={TrendingUp} label="Total Sales" value={paidClientsCount.toString()} sub="Confirmed payments" />
                            </div>

                            {/* Activity Trend Chart */}
                            <div className="glass-panel rounded-2xl p-6 border border-white/8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 text-left">Activity Trend — Last 14 Days</h2>
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand-red" /> Leads</div>
                                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Revenue (K)</div>
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height={260}>
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ec3642" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#ec3642" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                        <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <ChartTooltip contentStyle={tooltipStyle} />
                                        <Area type="monotone" dataKey="leads" name="New Leads" stroke="#ec3642" fill="url(#gLeads)" strokeWidth={2} />
                                        <Area type="monotone" dataKey="revenue" name="Revenue (K)" stroke="#34d399" fill="url(#gRevenue)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Acquisition Funnel + Plan Dist */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Acquisition Funnel */}
                                <div className="glass-panel rounded-2xl p-6 border border-white/8">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Client Acquisition Funnel</h2>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={funnelData} layout="vertical" barSize={18}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                                            <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                                            <YAxis type="category" dataKey="stage" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                                            <ChartTooltip contentStyle={tooltipStyle} />
                                            <Bar dataKey="count" name="Count" radius={[0, 8, 8, 0]}>
                                                {funnelData.map((_, index) => (
                                                    <Cell key={index} fill={`rgba(236,54,66,${1 - index * 0.18})`} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Plan Distribution */}
                                <div className="glass-panel rounded-2xl p-6 border border-white/8">
                                    <h2 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Plan Distribution</h2>
                                    <div className="flex items-center gap-6">
                                        <ResponsiveContainer width="50%" height={200}>
                                            <PieChart>
                                                <Pie
                                                    data={planDistributionPerc}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={55}
                                                    outerRadius={80}
                                                    paddingAngle={3}
                                                    dataKey="value"
                                                >
                                                    {planDistributionPerc.map((entry, index) => (
                                                        <Cell key={index} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <ChartTooltip contentStyle={tooltipStyle} formatter={(v: number) => [v]} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="space-y-3 flex-1">
                                            {planDistributionPerc.map((p) => (
                                                <div key={p.name} className="flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                                                        <span className="text-xs font-medium text-white/60">{p.name}</span>
                                                    </div>
                                                    <span className="text-xs font-black text-white">{p.perc}%</span>
                                                </div>
                                            ))}
                                            {planDistributionPerc.length === 0 && (
                                                <div className="text-xs text-white/20 italic">No bookings yet</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'bookings' && (
                        <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-brand-red" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Recent Bookings</h2>
                            </div>

                            <div className="glass-panel rounded-2xl border border-white/8 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                {['Client', 'Date', 'Plan', 'Status', 'Actions'].map((h) => (
                                                    <th key={h} className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.15em] text-white/30">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayBookings.map((b, i) => (
                                                <motion.tr
                                                    key={b.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                                                >
                                                    <td className="px-6 py-4 font-medium">
                                                        {b.name}
                                                        {b.type === 'booking' && (
                                                            <div className="text-[9px] text-brand-red font-bold uppercase mt-0.5">Consultation {b.date} @ {b.time}</div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-white/50 font-mono text-xs">{b.submittedAt.split(',')[0]}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={cn(
                                                            'px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide',
                                                            b.plan === 'Elite' ? 'bg-orange-500/15 text-orange-400' :
                                                                b.plan === 'Premium' ? 'bg-brand-red/15 text-brand-red' :
                                                                    b.plan === 'Booking' ? 'bg-emerald-500/15 text-emerald-400' :
                                                                        'bg-white/8 text-white/50'
                                                        )}>
                                                            {b.plan}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {b.status === 'pending' && (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(b.id, 'contacted', b.type)}
                                                                    disabled={updating === b.id}
                                                                    className="text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full transition-all cursor-pointer"
                                                                >
                                                                    Mark Contacted
                                                                </button>
                                                            )}
                                                            {b.status !== 'resolved' && (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(b.id, 'resolved', b.type)}
                                                                    disabled={updating === b.id}
                                                                    className="text-[10px] font-bold uppercase tracking-wider bg-brand-red/10 text-brand-red hover:bg-brand-red/20 px-3 py-1 rounded-full transition-all cursor-pointer"
                                                                >
                                                                    Resolve
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                            {displayBookings.length === 0 && (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-12 text-center text-white/20 italic">No bookings found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'messages' && (
                        <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                            <div className="flex items-center gap-3">
                                <MessageSquare size={18} className="text-brand-red" />
                                <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">Message Inbox</h2>
                                {unread > 0 && (
                                    <span className="bg-brand-red text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                                        {unread} NEW
                                    </span>
                                )}
                            </div>

                            <div className="space-y-3">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className={cn(
                                            'glass-panel rounded-2xl p-5 border transition-all duration-300 cursor-pointer hover:border-white/15 hover:scale-[1.01]',
                                            msg.status !== 'pending' ? 'border-white/6 opacity-70' : 'border-brand-red/20'
                                        )}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                                            <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                                                <div className={cn(
                                                    'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm',
                                                    msg.type === 'booking' ? 'bg-emerald-500/15 text-emerald-400' :
                                                        msg.status !== 'pending' ? 'bg-white/5 text-white/40' : 'bg-brand-red/15 text-brand-red'
                                                )}>
                                                    {msg.type === 'booking' ? '📅' : msg.name[0]}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center flex-wrap gap-2 mb-0.5">
                                                        <span className={cn('font-bold text-sm tracking-wide', msg.status !== 'pending' ? 'text-white/60' : 'text-white')}>
                                                            {msg.name}
                                                        </span>
                                                        {msg.type === 'booking' && (
                                                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-black uppercase tracking-tighter">Consultation</span>
                                                        )}
                                                        {msg.status === 'pending' && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                                                        )}
                                                    </div>
                                                    <div className="text-white/30 text-xs mb-1">
                                                        {msg.email || msg.phone}
                                                        {msg.type === 'booking' && <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2 mt-0.5 sm:mt-0 text-[10px] sm:text-xs">Scheduled: {msg.date} @ {msg.time}</span>}
                                                    </div>
                                                    <div className={cn('text-xs sm:text-sm mt-2 leading-relaxed', msg.status !== 'pending' ? 'text-white/40' : 'text-white/80')}>
                                                        {msg.goals && <span className="opacity-60 block text-[10px] uppercase tracking-wider mb-0.5">Goal</span>}
                                                        {msg.goals || 'General Inquiry'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 border-t sm:border-0 border-white/5 pt-3 sm:pt-0 mt-2 sm:mt-0 w-full sm:w-auto">
                                                <span className="text-white/25 text-[10px] sm:text-xs">{msg.submittedAt.split(',')[1] || msg.submittedAt}</span>
                                                {msg.status === 'pending' && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleUpdateStatus(msg.id, 'contacted', msg.type); }}
                                                        className="text-[10px] font-black uppercase tracking-wider bg-brand-red text-white px-3 py-1.5 sm:px-2 sm:py-0.5 rounded active:scale-95 transition-transform"
                                                    >
                                                        Mark Done
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {messages.length === 0 && (
                                    <div className="text-center py-12 text-white/20 italic">No messages found</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div >
    );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const [authenticated, setAuthenticated] = useState(
        () => localStorage.getItem('admin_token') === 'authenticated'
    );

    const handleLogin = useCallback(() => setAuthenticated(true), []);
    const handleLogout = useCallback(() => {
        localStorage.removeItem('admin_token');
        setAuthenticated(false);
    }, []);

    return authenticated
        ? <DashboardContent onLogout={handleLogout} />
        : <LoginScreen onLogin={handleLogin} />;
}
