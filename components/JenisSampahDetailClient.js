'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Banknote, Recycle, CheckCircle2, XCircle, ChevronRight, Info, Lightbulb } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function JenisSampahDetailClient({ item }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 relative min-h-screen">
      {/* Dynamic Background Elements based on category */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse-slow ${
          item.kategoriUtama === 'Organik' ? 'bg-green-200/40' :
          item.kategoriUtama === 'Anorganik' ? 'bg-blue-200/40' :
          item.kategoriUtama === 'B3' ? 'bg-red-200/40' : 'bg-gray-200/40'
        }`} />
        <div className={`absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse-slow ${
          item.kategoriUtama === 'Organik' ? 'bg-emerald-200/40' :
          item.kategoriUtama === 'Anorganik' ? 'bg-cyan-200/40' :
          item.kategoriUtama === 'B3' ? 'bg-orange-200/40' : 'bg-slate-200/40'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link href="/jenis-sampah" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md border border-gray-100 text-gray-700 hover:text-green-600 font-medium transition-all duration-300">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Katalog
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 overflow-hidden relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 p-2 sm:p-4">
          
          {/* Image Section */}
          <motion.div variants={itemVariants} className="relative h-72 sm:h-96 lg:h-full w-full rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image 
              src={item.gambar} 
              alt={item.nama} 
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-6 left-6 z-20">
              <CategoryBadge kategori={item.kategoriUtama} className="shadow-lg backdrop-blur-md bg-white/90" />
            </div>
            <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
               <span className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/30">
                 Kategori: {item.subKategori}
               </span>
            </div>
          </motion.div>
          
          {/* Content Section */}
          <div className="p-6 sm:p-10 lg:p-12 lg:pl-0 flex flex-col justify-center">
            
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                {item.nama}
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed font-light">
                {item.deskripsiSingkat}
              </p>
            </motion.div>

            {/* Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100/50 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-green-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-green-900 mb-1 uppercase tracking-wider">Waktu Terurai</h3>
                <p className="text-2xl font-black text-green-700 mb-1">
                  {item.lamaTerurai.min} {item.lamaTerurai.min !== item.lamaTerurai.max ? `- ${item.lamaTerurai.max}` : ''} {item.lamaTerurai.satuan}
                </p>
                <p className="text-xs text-green-800 opacity-70 mt-2 line-clamp-2">{item.lamaTerurai.catatan}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100/50 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 group">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-blue-600">
                  <Banknote className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-blue-900 mb-1 uppercase tracking-wider">Potensi Ekonomi</h3>
                <p className="text-2xl font-black text-blue-700 mb-1">
                  {item.potensiCuan.hargaPerKg === 'Tidak dijual' || item.potensiCuan.hargaPerKg === 'Tidak diterima' 
                    ? item.potensiCuan.hargaPerKg 
                    : `Rp ${item.potensiCuan.hargaPerKg}`}
                </p>
                <p className="text-xs text-blue-800 opacity-70 mt-2 line-clamp-2">{item.potensiCuan.catatan}</p>
              </div>
            </motion.div>

            {/* Recycling Info */}
            <motion.div variants={itemVariants} className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200/60">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${item.bisaDiDaurUlang ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {item.bisaDiDaurUlang ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Status Daur Ulang</h3>
                  <span className={`text-xl font-bold ${item.bisaDiDaurUlang ? 'text-green-700' : 'text-red-700'}`}>
                    {item.bisaDiDaurUlang ? 'Bisa Didaur Ulang' : 'Tidak / Sulit Didaur Ulang'}
                  </span>
                </div>
              </div>
              
              {item.hasilOlahan && item.hasilOlahan.length > 0 && (
                <div className="mb-6">
                  <h4 className="flex items-center text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    <Recycle className="w-4 h-4 mr-2 text-gray-500" />
                    Potensi Hasil Olahan:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.hasilOlahan.map((hasil, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:border-green-300 hover:text-green-700 transition-colors cursor-default">
                        {hasil}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.prosesId && (
                <div className="mt-8 pt-2">
                  <Link href={`/cara-olah/${item.prosesId}`} className="group relative w-full inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/20 active:scale-[0.98]">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300"></span>
                    <span className="relative flex items-center">
                      Pelajari Cara Mengolahnya
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Edukasi Ekstra */}
            <motion.div variants={itemVariants} className="mt-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 border border-yellow-100 hover:shadow-lg hover:shadow-yellow-100 transition-all duration-300">
              <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Tahukah Kamu?
              </h3>
              <p className="text-yellow-800 leading-relaxed font-medium bg-white/60 p-4 rounded-2xl border border-white">
                {item.kategoriUtama === 'Organik' ? (
                  'Sampah organik yang dibuang ke TPA tanpa diolah akan menghasilkan gas metana, yaitu gas rumah kaca yang 25 kali lebih berbahaya bagi pemanasan global dibandingkan karbon dioksida. Olah menjadi kompos mulai dari rumah!'
                ) : item.kategoriUtama === 'Anorganik' ? (
                  'Plastik dan sampah anorganik lainnya sangat sulit terurai. Bahkan saat hancur, mereka menjadi mikroplastik yang bisa mencemari air dan masuk ke rantai makanan manusia. Yuk, kurangi penggunaannya (Reduce)!'
                ) : item.kategoriUtama === 'B3' ? (
                  'Limbah B3 mengandung zat beracun yang dapat meresap ke dalam tanah dan mencemari sumber air tanah. Pisahkan limbah B3 dari sampah lain dan serahkan ke fasilitas pengolahan khusus!'
                ) : (
                  'Memisahkan sampah dari rumah adalah langkah kecil yang memberikan dampak besar bagi lingkungan dan meringankan beban para pekerja kebersihan.'
                )}
              </p>
            </motion.div>
            
            {/* References */}
            {item.sumberReferensi && item.sumberReferensi.length > 0 && (
              <motion.div variants={itemVariants} className="mt-8 flex gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Sumber Referensi</h3>
                  <ul className="space-y-1.5">
                    {item.sumberReferensi.map((ref, idx) => (
                      <li key={idx}>
                        <a href={ref} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 hover:underline break-all transition-colors">
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
