import { getAllProses } from '../../lib/getData';
import ProsesCard from '../../components/ProsesCard';
import FadeIn from '../../components/FadeIn';

export const metadata = {
  title: 'Cara Olah Sampah | PESAN',
  description: 'Pelajari berbagai proses pengolahan dan daur ulang sampah dari rumah tangga.',
};

export default function CaraOlahPage() {
  const prosesList = getAllProses();

  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      {/* Creative & Vibrant Header Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full bg-emerald-400/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[150%] rounded-full bg-yellow-300/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="mb-12 text-center max-w-4xl mx-auto pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Cara Olah & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Daur Ulang</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/90 font-light">
            Setiap jenis sampah memiliki potensi untuk diolah menjadi sesuatu yang lebih bermanfaat. 
            Temukan langkah-langkah praktisnya di bawah ini.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prosesList.map(proses => (
            <ProsesCard key={proses.id} proses={proses} />
          ))}
          {prosesList.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white/60 backdrop-blur-md rounded-2xl border border-white">
              <p className="text-slate-500 text-lg">Data proses belum tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
