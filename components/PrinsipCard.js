'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';

export default function PrinsipCard({ prinsip, index }) {
  const themes = [
    { bg: 'bg-green-50/50', border: 'border-green-100', text: 'text-green-800', iconBg: 'bg-green-500', shadow: 'hover:shadow-green-500/10' },
    { bg: 'bg-blue-50/50', border: 'border-blue-100', text: 'text-blue-800', iconBg: 'bg-blue-500', shadow: 'hover:shadow-blue-500/10' },
    { bg: 'bg-amber-50/50', border: 'border-amber-100', text: 'text-amber-800', iconBg: 'bg-amber-500', shadow: 'hover:shadow-amber-500/10' },
    { bg: 'bg-purple-50/50', border: 'border-purple-100', text: 'text-purple-800', iconBg: 'bg-purple-500', shadow: 'hover:shadow-purple-500/10' },
    { bg: 'bg-teal-50/50', border: 'border-teal-100', text: 'text-teal-800', iconBg: 'bg-teal-500', shadow: 'hover:shadow-teal-500/10' }
  ];
  
  const theme = themes[index % themes.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className={`rounded-3xl p-8 md:p-10 border ${theme.border} ${theme.bg} ${theme.shadow} backdrop-blur-sm relative overflow-hidden h-full flex flex-col shadow-sm transition-all duration-300`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full -z-10 blur-xl" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="flex items-center gap-5 mb-8">
            <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} text-white flex items-center justify-center font-black text-2xl shadow-lg rotate-3`}>
              {index + 1}
            </div>
            <h2 className={`text-3xl md:text-4xl font-extrabold ${theme.text} tracking-tight`}>{prinsip.judul}</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-8 font-medium text-lg">{prinsip.deskripsi}</p>
          
          {prinsip.fakta && (
            <div className={`mb-8 lg:mb-0 p-5 rounded-2xl bg-white/70 border border-white shadow-sm flex items-start gap-4`}>
              <Lightbulb className={`w-6 h-6 shrink-0 mt-0.5 ${theme.text}`} />
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${theme.text}`}>Fakta Menarik</span>
                <p className="text-gray-800 font-medium italic leading-relaxed">{prinsip.fakta}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {prinsip.manfaat && (
            <div className="bg-white/40 p-6 sm:p-8 rounded-2xl border border-white/50">
              <h3 className={`font-bold mb-4 uppercase text-xs tracking-widest ${theme.text} flex items-center gap-2`}>
                <TrendingUp className="w-5 h-5" />
                Manfaat Utama
              </h3>
              <ul className="space-y-4">
                {prinsip.manfaat.map((item, idx) => (
                  <li key={idx} className="flex items-start text-[15px] text-gray-700 font-medium">
                    <CheckCircle2 className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${theme.text}`} />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-auto bg-white/60 p-6 sm:p-8 rounded-2xl border border-white/50 shadow-inner h-full">
            <h3 className={`font-bold mb-4 uppercase text-xs tracking-widest ${theme.text} flex items-center gap-2`}>
              <Sparkles className="w-5 h-5" />
              Contoh Penerapan Praktis
            </h3>
            <ul className="space-y-4">
              {prinsip.contoh.map((item, idx) => (
                <li key={idx} className="flex items-start text-[15px] text-gray-700 font-medium">
                  <span className={`mr-3 mt-2 w-2 h-2 rounded-full ${theme.iconBg} flex-shrink-0`} />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
