'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_NAMES = {
  '/':                   { title: 'Beranda',               subtitle: 'Selamat datang di PESAN' },
  '/jenis-sampah':       { title: 'Katalog Sampah',         subtitle: 'Ensiklopedia 50+ contoh sampah' },
  '/cara-olah':          { title: 'Cara Mengolah',          subtitle: 'Panduan daur ulang & pengolahan' },
  '/konsep-3r':          { title: 'Konsep 3R',              subtitle: 'Reduce, Reuse, Recycle' },
  '/kuis':               { title: 'Kuis Interaktif',        subtitle: 'Uji pengetahuanmu tentang sampah' },
  '/game':               { title: 'Mini Game',              subtitle: 'Belajar sambil bermain' },
};

function getPageInfo(pathname) {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  if (pathname.startsWith('/jenis-sampah/')) return { title: 'Detail Sampah', subtitle: 'Informasi lengkap item sampah' };
  if (pathname.startsWith('/cara-olah/'))   return { title: 'Panduan Pengolahan', subtitle: 'Langkah daur ulang spesifik' };
  return { title: 'Memuat Halaman', subtitle: 'PESAN' };
}

export default function PageSplash() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { title, subtitle } = getPageInfo(pathname);

  useEffect(() => {
    // Reset and replay on every navigation
    setVisible(true);
    setProgress(0);

    // Simulate progress filling up
    const steps = [
      { target: 35,  delay: 0   },
      { target: 65,  delay: 200 },
      { target: 85,  delay: 500 },
      { target: 100, delay: 850 },
    ];

    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );

    // Hide after progress reaches 100
    const hideTimer = setTimeout(() => setVisible(false), 1250);

    return () => {
      timers.forEach(id => clearTimeout(id));
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={pathname}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
          style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)',
          }}
        >
          {/* Decorative shapes using basic gradients instead of expensive CSS blur filters to prevent mobile lag */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-green-200 to-transparent opacity-40 pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-emerald-200 to-transparent opacity-40 pointer-events-none" />

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center px-12 py-10"
          >
            {/* Spinning rings + logo */}
            <div className="relative flex items-center justify-center mb-8">
              <div
                className="absolute w-28 h-28 rounded-full border-[3px] border-green-100 border-t-green-500"
                style={{ animation: 'spin 1.4s linear infinite', willChange: 'transform' }}
              />
              <div
                className="absolute w-20 h-20 rounded-full border-[3px] border-emerald-100 border-b-emerald-400"
                style={{ animation: 'spin 0.9s linear infinite reverse', willChange: 'transform' }}
              />
              <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/30">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
            </div>

            {/* Brand */}
            <div className="flex flex-col items-center mb-4">
              <p className="text-sm font-black text-green-600 tracking-[0.3em] uppercase mb-1">
                PESAN
              </p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">
                Pusat Edukasi Sampah Lingkungan
              </p>
            </div>

            {/* Page name */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2 text-center">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mb-10 text-center">{subtitle}</p>

            {/* Progress bar */}
            <div className="w-64 md:w-80">
              <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                <span>Memuat…</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 rounded-full origin-left"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2.5 mt-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full loading-dot-${i}`}
                  style={{ background: ['#22c55e','#10b981','#14b8a6'][i] }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
