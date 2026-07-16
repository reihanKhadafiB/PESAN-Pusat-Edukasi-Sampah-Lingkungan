'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, BookOpen, Gamepad2, Brain, Sparkles, Activity,
  ShieldCheck, Trees, CircleDollarSign, AlertTriangle, Droplets, Wind,
  Trash2, RefreshCw, Hand, Info, Leaf, CheckCircle2, LayoutGrid, Recycle, Globe, Heart, Sun,
  MapPin, GraduationCap
} from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col bg-gray-50">
      {/* 1. Hero Section */}
      <div className="relative min-h-screen pt-32 pb-24 flex items-center bg-emerald-800 overflow-hidden">
        {/* Animated Background - Creative & Vibrant */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none bg-gradient-to-br from-emerald-600 via-green-600 to-teal-800">
          {/* Decorative glowing abstract shapes */}
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-400/30 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-300/20 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-teal-400/20 blur-[120px]"
          />
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={itemVariants} className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-emerald-50 text-sm font-semibold backdrop-blur-md shadow-sm">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>KKN UBP Karawang - Desa Wancimekar</span>
                </div>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
                Pilah Sampah, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  Ubah Dunia
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-xl md:text-2xl text-emerald-50/90 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
                Cara interaktif dan menyenangkan untuk belajar mengelola sampah, mengenal konsep 3R, dan menyelamatkan bumi kita.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-20 relative z-20">
                <Link href="#belajar" className="group flex items-center justify-center gap-3 px-8 py-4 bg-yellow-400 text-slate-900 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-yellow-400/25">
                  Mulai Petualangan
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/kuis" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-sm hover:-translate-y-1 backdrop-blur-md">
                  <Gamepad2 className="w-5 h-5 text-yellow-300" />
                  Mainkan Game
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating UI Cards for large screens */}
          <div className="hidden xl:block absolute inset-0 pointer-events-none">
            {/* Card 1 */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[-5%] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl shadow-emerald-900/50 w-72 pointer-events-auto hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 text-rose-400 rounded-xl flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-100/70 font-bold uppercase tracking-wider mb-0.5">Mulai dari Diri Sendiri</div>
                  <div className="text-lg font-bold text-white leading-tight">Langkah Kecil, Dampak Besar</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[35%] right-[-5%] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl shadow-emerald-900/50 w-72 pointer-events-auto hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 text-blue-300 rounded-xl flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-100/70 font-bold uppercase tracking-wider mb-0.5">Satu Bumi, Satu Rumah</div>
                  <div className="text-lg font-bold text-white leading-tight">Mari Jaga Bersama</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[15%] right-[-2%] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl shadow-emerald-900/50 w-64 pointer-events-auto hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 text-yellow-300 rounded-xl flex items-center justify-center shrink-0">
                  <Sun className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-100/70 font-bold uppercase tracking-wider mb-0.5">Lingkungan Bersih</div>
                  <div className="text-lg font-bold text-white leading-tight">Kunci Hidup Sehat</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section inside Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10"
          >
            {[
              { num: "50+", label: "Katalog Sampah", icon: LayoutGrid },
              { num: "3R", label: "Reduce, Reuse, Recycle", icon: Recycle },
              { num: "100%", label: "Interaktif & Seru", icon: Brain }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-yellow-300 shadow-inner">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-4xl font-extrabold text-white mb-1">{stat.num}</div>
                <div className="text-emerald-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. Tentang Program */}
      <motion.section
        id="belajar"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="w-full max-w-5xl mx-auto px-4 mb-32 text-center mt-10"
      >
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-6">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Tentang PESAN</h2>
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          <strong>Pusat Edukasi Sampah Lingkungan (PESAN)</strong> adalah platform digital yang didedikasikan untuk membantu masyarakat memahami betapa pentingnya pemilahan dan pengelolaan sampah sejak dari rumah. Ini adalah wujud nyata program kerja mahasiswa KKN Universitas Buana Perjuangan Karawang untuk menciptakan lingkungan yang lebih bersih dan sehat di Desa Wancimekar.
        </p>
      </motion.section>

      {/* 3. Mengapa Pengelolaan Sampah Penting? */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto px-4 mb-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Mengapa Ini Penting?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tiga alasan utama mengapa memilah sampah sangat berdampak bagi kehidupan kita.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", title: "Menjaga Kesehatan", desc: "Mengurangi risiko penyebaran penyakit yang timbul dari tumpukan sampah kotor seperti diare, kolera, dan sarang nyamuk DBD." },
            { icon: Trees, color: "text-green-600", bg: "bg-green-50", title: "Melestarikan Lingkungan", desc: "Mencegah pencemaran air sungai dan tanah, serta menekan produksi gas rumah kaca yang memicu pemanasan global." },
            { icon: CircleDollarSign, color: "text-yellow-600", bg: "bg-yellow-50", title: "Bernilai Ekonomi", desc: "Sampah anorganik yang terpilah rapi dapat dijual ke bank sampah atau didaur ulang menjadi kerajinan bernilai jual tinggi." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-sm border border-white/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. Empat Kategori Utama Sampah */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto px-4 mb-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">4 Kategori Dasar</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Langkah pertama sebelum memilah adalah mengenali jenisnya.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: "organik", name: "Organik", color: "green", desc: "Sisa makanan, daun, bahan alami.", icon: Leaf },
            { id: "anorganik", name: "Anorganik", color: "blue", desc: "Plastik, kertas, botol kaca, logam.", icon: RefreshCw },
            { id: "b3", name: "B3 (Berbahaya)", color: "red", desc: "Baterai, obat, limbah elektronik.", icon: AlertTriangle },
            { id: "residu", name: "Residu", color: "gray", desc: "Popok, puntung rokok, masker.", icon: Trash2 }
          ].map((cat, idx) => (
            <motion.div key={cat.id} variants={itemVariants} className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/50 hover:shadow-2xl overflow-hidden transition-all duration-300 text-center">
              <div className={`absolute inset-0 bg-${cat.color}-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-0`} />
              <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                <div className={`w-16 h-16 mx-auto rounded-full bg-${cat.color}-100 text-${cat.color}-600 flex items-center justify-center mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{cat.name}</h3>
                <p className="text-sm opacity-80">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 5. 4 Langkah Mudah Memilah di Rumah */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="w-full max-w-5xl mx-auto px-4 mb-32"
      >
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50/50 rounded-bl-full -z-10" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight text-center">Cara Memilah di Rumah</h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {[
              { title: "Siapkan Tempat Terpisah", desc: "Sediakan minimal 2 wadah berbeda untuk organik dan anorganik di dalam rumah." },
              { title: "Kenali & Pisahkan", desc: "Pisahkan sisa makanan dengan bungkus plastik atau kertas sebelum dibuang." },
              { title: "Bersihkan Dahulu", desc: "Bilas kemasan plastik/botol/kaleng yang kotor agar tidak menimbulkan bau." },
              { title: "Buang Sesuai Tempatnya", desc: "Konsisten membuang pada wadah yang tepat setiap hari." }
            ].map((step, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 border-4 border-white text-white font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/50 backdrop-blur border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. Dampak Jika Tidak Dikelola */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="w-full max-w-7xl mx-auto px-4 mb-32"
      >
        <div className="bg-gray-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent opacity-50" />

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Dampak Jika Diabaikan</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Kelalaian kecil dalam mengelola sampah hari ini, membawa petaka besar di masa depan.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { icon: AlertTriangle, title: "Penyakit Menular", desc: "Tumpukan sampah menjadi sarang lalat dan nyamuk DBD." },
              { icon: Droplets, title: "Pencemaran Air", desc: "Menyumbat sungai dan mencemari sumber air bersih warga." },
              { icon: Wind, title: "Polusi Udara", desc: "Membakar sampah melepas gas beracun yang memicu ISPA." },
              { icon: Hand, title: "Banjir Bandang", desc: "Selokan mampet mengakibatkan banjir saat musim hujan tiba." }
            ].map((dampak, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur border border-white/10 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <dampak.icon className="w-10 h-10 text-red-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{dampak.title}</h3>
                <p className="text-gray-300 text-sm">{dampak.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 7. Fitur Cards / CTA (Sudah Ada) */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto px-4 mb-32"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Ayo Mulai Belajar!</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Pilih metode belajar yang paling menyenangkan untukmu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            {
              title: "Ensiklopedia Sampah",
              desc: "Katalog 50+ contoh sampah beserta cara penanganan dan waktu urainya.",
              icon: BookOpen,
              color: "green",
              href: "/jenis-sampah"
            },
            {
              title: "Panduan 3R Praktis",
              desc: "Langkah aplikatif Reduce, Reuse, Recycle, dan memahami konsep 3R serta manfaat.",
              icon: Activity,
              color: "blue",
              href: "/konsep-3r"
            },
            {
              title: "Belajar Sambil Bermain",
              desc: "Evaluasi pemahamanmu melalui kuis cerdas dan teka teki silang pada Game Edukasi.",
              icon: Gamepad2,
              color: "purple",
              href: "/game"
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="group h-full">
                <Link href={feature.href} className="block h-full bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 border border-white/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                  <div className={`w-16 h-16 bg-${feature.color}-50 text-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:-translate-y-2 group-hover:rotate-3 transition-all duration-300 shadow-sm`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.desc}</p>
                  <div className={`text-${feature.color}-600 font-bold text-sm inline-flex items-center uppercase tracking-wide mt-auto`}>
                    Jelajahi Sekarang
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* 8. Kontak & Informasi KKN */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="w-full max-w-7xl mx-auto px-4 mb-32"
      >
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Info */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold tracking-widest uppercase mb-6">
              Hubungi Kami
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Kontak &amp; Informasi KKN
            </h2>
            <p className="text-gray-500 leading-relaxed mb-10 max-w-md">
              Ada pertanyaan atau ingin berdiskusi seputar pengelolaan sampah di Desa Wancimekar? Silakan hubungi kami.
            </p>

            {/* Info items */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-0.5">Lokasi</p>
                  <p className="text-gray-500 text-sm">Desa Wancimekar, Kec. Kotabaru, Kab. Karawang, Jawa Barat</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-0.5">Program</p>
                  <p className="text-gray-500 text-sm">KKN — Universitas Buana Perjuangan Karawang</p>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/kkn_wancimekar26?igsh=d3NjZGVib3F6aGZ6"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-pink-500 hover:border-pink-100 transition-all duration-200"
              >
                {/* Instagram icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://vt.tiktok.com/ZSXDUuUbB/"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
              >
                {/* TikTok icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.26 8.26 0 004.83 1.55V7A4.85 4.85 0 0119.59 6.69z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Google Maps embed */}
          <div className="w-full h-72 lg:h-96 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=Desa+Wancimekar,+Kotabaru,+Karawang,+Jawa+Barat&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Desa Wancimekar"
            />
          </div>

        </div>
      </motion.section>
    </div>
  );
}
