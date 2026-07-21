'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Lightbulb, PenTool, LayoutGrid, Home, Leaf, Menu, X } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Katalog Sampah', href: '/jenis-sampah', icon: LayoutGrid },
    { name: 'Cara Olah', href: '/cara-olah', icon: Recycle },
    { name: 'Konsep 3R', href: '/konsep-3r', icon: Leaf },
    { name: 'Kuis', href: '/kuis', icon: PenTool },
    { name: 'Mini Game', href: '/game', icon: Lightbulb },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 border-b border-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Logo — same design as PageSplash loading screen */}
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/50 group-hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 tracking-tight leading-none">
                PESAN
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:tracking-widest mt-0.5 block line-clamp-1">
                Pusat Edukasi Sampah Lingkungan
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 rounded-full group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-green-50 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={clsx(
                    "flex items-center gap-2 text-sm font-semibold transition-colors duration-200",
                    isActive ? "text-green-700" : "text-gray-600 group-hover:text-green-600"
                  )}>
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </div>
                </Link>
              );
            })}
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white border-b border-gray-200 shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors",
                      isActive ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
