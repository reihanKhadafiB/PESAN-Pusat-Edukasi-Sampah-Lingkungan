import Link from 'next/link';
import { Leaf, Mail, MapPin, Phone, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-green-500/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 tracking-tight leading-none">
                  PESAN
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Pusat Edukasi Sampah Lingkungan
                </span>
              </div>
            </Link>
            <p className="text-gray-500 mb-6 max-w-sm">
              Platform Edukasi Digital terpadu yang dirancang untuk membantu masyarakat mengelola sampah dengan cerdas, interaktif, dan menyenangkan.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Navigasi Utama</h4>
            <ul className="space-y-3">
              <li><Link href="/jenis-sampah" className="text-gray-500 hover:text-green-600 transition-colors">Katalog Contoh Sampah</Link></li>
              <li><Link href="/cara-olah" className="text-gray-500 hover:text-green-600 transition-colors">Panduan Daur Ulang</Link></li>
              <li><Link href="/konsep-3r" className="text-gray-500 hover:text-green-600 transition-colors">Prinsip 3R</Link></li>
              <li><Link href="/kuis" className="text-gray-500 hover:text-green-600 transition-colors">Kuis Interaktif</Link></li>
              <li><Link href="/game" className="text-gray-500 hover:text-green-600 transition-colors">Mini Game</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span>Desa Wancimekar,<br />Kab. Karawang</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                <span>kknwancimekar23@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                <span>+62 881-8161-728</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Mahasiswa KKN Universitas Buana Perjuangan Karawang. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-green-600 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-green-600 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
