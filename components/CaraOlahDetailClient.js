'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Info, ChevronRight, Sparkles, BookOpen, ShieldAlert, HeartHandshake, Leaf } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function CaraOlahDetailClient({ proses }) {
  const getBenefits = (id, kategori) => {
    switch (id) {
      case 'pengomposan':
        return [
          "Menyuburkan tanah secara alami tanpa bahan kimia",
          "Mengurangi volume sampah di TPA hingga 50%",
          "Meningkatkan daya serap air pada tanah"
        ];
      case 'pembuatan-ecobrick':
        return [
          "Mencegah plastik mencemari lautan dan daratan",
          "Material alternatif murah yang kuat dan tahan lama",
          "Metode zero-cost menangani sampah sachet"
        ];
      case 'daur-ulang-kertas':
        return [
          "1 ton kertas daur ulang menyelamatkan 17 pohon",
          "Menghemat 7.000 galon air dalam proses produksi",
          "Kertas dapat didaur ulang hingga 5-7 kali putaran"
        ];
      case 'daur-ulang-plastik':
        return [
          "Mengurangi jejak karbon dari produksi plastik baru",
          "Mencegah terbentuknya mikroplastik di rantai makanan",
          "Memberikan nilai ekonomi sirkular bagi pengepul"
        ];
      case 'daur-ulang-kaca':
        return [
          "Kaca bisa didaur ulang tanpa batas tanpa turun kualitas",
          "Menghemat energi karena suhu peleburan lebih rendah",
          "1 ton kaca daur ulang hemat 1.2 ton bahan baku alam"
        ];
      case 'pembuatan-paving-block':
        return [
          "Solusi mengolah plastik kresek yang bernilai rendah",
          "Material paving menjadi lebih ringan dan kedap air",
          "Mencegah plastik menyumbat saluran air/sungai"
        ];
      case 'pirolisis-plastik-ke-bbm':
        return [
          "Menghasilkan energi alternatif pengganti solar/minyak",
          "Mengubah tumpukan polutan menjadi sumber energi",
          "Mendorong kemandirian energi skala komunitas"
        ];
      case 'penanganan-b3':
        return [
          "Mencegah keracunan logam berat pada sumber air",
          "Melindungi petugas kebersihan dari paparan racun",
          "Menghindari risiko ledakan/kebakaran di tempat rongsokan"
        ];
      default:
        if (kategori === 'Organik') {
          return ["Mengembalikan nutrisi kembali ke alam", "Mencegah produksi gas metana", "Mendukung ekosistem mikrobia baik"];
        } else if (kategori === 'Anorganik') {
          return ["Mencegah pencemaran jangka panjang", "Menghemat bahan baku tambang alam", "Membuka lapangan kerja sirkular"];
        } else {
          return ["Melindungi kesehatan manusia dan alam", "Mematuhi regulasi pengelolaan limbah nasional"];
        }
    }
  };

  const getTips = (kategori) => {
    if (kategori === 'B3') return "SANGAT PENTING: Gunakan sarung tangan karet, masker, dan kacamata pelindung. Jauhkan dari jangkauan anak-anak dan sumber panas!";
    if (kategori === 'Anorganik') return "TIPS: Pastikan sampah anorganik (plastik/kaca) sudah dicuci bersih dan dikeringkan sebelum diolah agar terhindar dari jamur atau bau sarang penyakit.";
    if (kategori === 'Organik') return "TIPS: Gunakan wadah pengolahan yang memiliki ventilasi udara (aerob) atau wadah kedap (anaerob) sesuai metode agar tidak mengundang lalat dan belatung berlebih.";
    return "TIPS: Lakukan pengolahan di area terbuka atau tempat yang memiliki sirkulasi udara baik.";
  };

  const benefits = getBenefits(proses.id, proses.kategori);
  const tips = getTips(proses.kategori);
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
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse-slow ${
          proses.kategori === 'Organik' ? 'bg-green-200/40' :
          proses.kategori === 'Anorganik' ? 'bg-blue-200/40' : 'bg-orange-200/40'
        }`} />
        <div className={`absolute bottom-[20%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse-slow ${
          proses.kategori === 'Organik' ? 'bg-emerald-200/40' :
          proses.kategori === 'Anorganik' ? 'bg-cyan-200/40' : 'bg-red-200/40'
        }`} style={{ animationDelay: '2s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 max-w-4xl mx-auto"
      >
        <Link href="/cara-olah" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md border border-gray-100 text-gray-700 hover:text-green-600 font-medium transition-all duration-300">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Proses
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 overflow-hidden relative max-w-4xl mx-auto"
      >
        {/* Hero Image Section (Full Width Top) */}
        <motion.div variants={itemVariants} className="relative w-full h-64 sm:h-80 md:h-[400px] overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10" />
          <Image 
            src={proses.gambar} 
            alt={proses.judul} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute top-6 left-6 z-20">
            <CategoryBadge kategori={proses.kategori} className="shadow-lg backdrop-blur-md bg-white/95" />
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
              {proses.judul}
            </h1>
          </div>
        </motion.div>
        
        {/* Content Section (Below Image) */}
        <div className="p-6 sm:p-10 md:p-12">
          
          <motion.div variants={itemVariants}>
            <div className="bg-emerald-50/70 rounded-2xl p-6 sm:p-8 border border-emerald-100/60 mb-8 shadow-inner">
              <p className="text-lg sm:text-xl text-emerald-900 leading-relaxed font-medium">
                {proses.deskripsi}
              </p>
            </div>
            
            {/* Warning / Tips Section */}
            <div className={`rounded-2xl p-6 mb-12 flex items-start gap-4 shadow-sm border ${
              proses.kategori === 'B3' 
                ? 'bg-red-50 border-red-200 text-red-900' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <ShieldAlert className={`w-7 h-7 shrink-0 mt-0.5 ${proses.kategori === 'B3' ? 'text-red-500' : 'text-amber-500'}`} />
              <div>
                <h3 className={`font-bold uppercase tracking-wider text-sm mb-1 ${proses.kategori === 'B3' ? 'text-red-700' : 'text-amber-700'}`}>
                  Persiapan & Keamanan
                </h3>
                <p className="font-medium leading-relaxed">{tips}</p>
              </div>
            </div>
          </motion.div>

          {/* Steps Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b border-gray-100 pb-4">
              <BookOpen className="w-7 h-7 text-emerald-500" />
              Langkah-langkah Pengolahan
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.65rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-300 before:to-transparent">
              {proses.langkah.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-5 group">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 font-bold shrink-0 shadow-sm relative z-10 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-all group-hover:border-emerald-200">
                    <p className="text-gray-700 leading-relaxed font-medium text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Final Result & Benefits */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 border border-blue-100/50 shadow-sm">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                Hasil Akhir
              </h2>
              <p className="text-lg text-blue-800 font-bold bg-white/80 p-5 rounded-2xl border border-white shadow-sm inline-block">
                {proses.hasilAkhir}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50/50 rounded-3xl p-8 border border-green-100/50 shadow-sm">
              <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-green-500" />
                Dampak & Manfaat
              </h2>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-green-800 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* References */}
          {proses.sumberReferensi && proses.sumberReferensi.length > 0 && (
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 p-5 bg-gray-50/80 rounded-2xl border border-gray-100">
              <Info className="w-6 h-6 text-gray-400 shrink-0 mt-0.5 hidden sm:block" />
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 sm:hidden" />
                  Sumber Referensi
                </h3>
                <ul className="space-y-2">
                  {proses.sumberReferensi.map((ref, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0"></div>
                      <a href={ref} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all transition-colors font-medium">
                        {ref}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
