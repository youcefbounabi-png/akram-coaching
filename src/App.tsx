import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FloatingChatbot from './components/FloatingChatbot';
import { supabase } from './lib/supabase';
import Home from './Home';
import About from './components/About';
import ServicesPage from './pages/ServicesPage';
import ChallengePage from './pages/ChallengePage';
import TransformationsPage from './pages/TransformationsPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import PaymentSuccess from './pages/PaymentSuccess';

// Lazy-load the heavy WebGL background — code-splits the Three.js bundle
// so it never blocks the initial page paint
const NebulaBackground = lazy(() => import('./components/3d/NebulaBackground'));



function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  useEffect(() => {
    // Proactively wake up the Render backend server to reduce cold-start delays
    fetch('https://akram-coaching.onrender.com/api/health')
      .catch(() => { /* Silent fail */ });

    // Track site visits (exclude admin)
    if (!isAdmin) {
      supabase.from('site_visits').insert([{ page_path: pathname }])
        .then(({ error }) => {
          if (error) console.error('[Analytics] Failed to track visit:', error);
          else console.log('[Analytics] Visit tracked:', pathname);
        });
    }
  }, [pathname, isAdmin]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-red selection:text-white relative">
      {!isAdmin && (
        <Suspense fallback={<div className="fixed inset-0 z-0 bg-brand-dark" />}>
          <NebulaBackground />
        </Suspense>
      )}
      {!isAdmin && <Header />}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/transformations" element={<TransformationsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTop />}
      {!isAdmin && <FloatingChatbot />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}
