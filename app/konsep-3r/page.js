import { getTigaRData } from '../../lib/getData';
import PrinsipCard from '../../components/PrinsipCard';
import FadeIn from '../../components/FadeIn';

export const metadata = {
  title: 'Konsep 3R | PESAN',
  description: 'Kenali prinsip 3R (Reduce, Reuse, Recycle) untuk gaya hidup minim sampah.',
};

export default function Konsep3RPage() {
  const tigaRList = getTigaRData();

  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      {/* Creative & Vibrant Header Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full bg-emerald-400/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[150%] rounded-full bg-yellow-300/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="mb-16 text-center max-w-4xl mx-auto pt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-6 tracking-tight">Konsep 3R</h1>
          <p className="text-xl md:text-2xl text-emerald-50/90 leading-relaxed font-light">
            Pilar utama dalam pengelolaan sampah yang berkelanjutan. Mulailah dari langkah kecil untuk dampak yang besar bagi bumi kita.
          </p>
        </FadeIn>

        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {tigaRList.map((prinsip, index) => (
            <div key={prinsip.id}>
              <PrinsipCard prinsip={prinsip} index={index} />
            </div>
          ))}
          {tigaRList.length === 0 && (
            <div className="text-center py-12 bg-white/60 backdrop-blur-md rounded-2xl border border-white w-full">
              <p className="text-slate-500 text-lg">Data konsep 3R belum tersedia.</p>
            </div>
          )}
        </div>
        
        <div className="mt-20 bg-white/70 backdrop-blur-xl rounded-[3rem] p-8 sm:p-16 text-center border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-bl-full -z-10" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Siap untuk Menguji Pengetahuanmu?</h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-light">
            Setelah mempelajari jenis-jenis sampah, cara pengolahan, dan prinsip 3R, kini saatnya melihat seberapa jauh pemahamanmu!
          </p>
          <a href="/kuis" className="inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-emerald-600 transition-all duration-300 shadow-xl hover:-translate-y-1">
            Mulai Kuis Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}
