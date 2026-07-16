import { getAllWasteItems } from '../../lib/getData';
import WasteListClient from '../../components/WasteListClient';
import FadeIn from '../../components/FadeIn';

export const metadata = {
  title: 'Katalog Contoh Sampah | PESAN',
  description: 'Kenali berbagai contoh sampah rumah tangga, karakteristiknya, dan berapa lama waktu yang dibutuhkan untuk terurai di alam.',
};

export default function JenisSampahPage() {
  const items = getAllWasteItems();

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
            Katalog <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Contoh Sampah</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/90 font-light">
            Eksplorasi lebih dari 50 contoh sampah, pelajari cara penanganannya yang tepat, serta potensi ekonomi yang bisa dihasilkan.
          </p>
        </FadeIn>

        <WasteListClient initialItems={items} />
      </div>
    </div>
  );
}
