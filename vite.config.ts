import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React runtime — always cached first
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            // 3D / animation libs — heavy, split separate
            'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
            'vendor-gsap': ['gsap', '@gsap/react'],
            'vendor-motion': ['motion'],
            // Payment SDKs
            'vendor-paypal': ['@paypal/react-paypal-js'],
            // Supabase client
            'vendor-supabase': ['@supabase/supabase-js'],
            // Charts (admin dashboard only)
            'vendor-recharts': ['recharts'],
            // AI
            'vendor-ai': ['@google/genai'],
          },
        },
      },
      // Raise warning threshold slightly since we're now splitting properly
      chunkSizeWarningLimit: 600,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      }
    },
  };
});

