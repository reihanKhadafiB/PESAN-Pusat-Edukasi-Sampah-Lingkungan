import GameHub from '../../components/GameHub';

export const metadata = {
  title: 'Pusat Game Edukasi | PESAN',
  description: 'Mainkan berbagai game interaktif seputar pengelolaan sampah, mulai dari Hujan Sampah hingga Teka Teki Silang!',
};

export default function GamePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      {/* Creative & Vibrant Header Background */}
      <div className="absolute top-0 left-0 w-full h-[350px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full bg-emerald-400/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[150%] rounded-full bg-yellow-300/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Game Edukasi</span></h1>
          <p className="text-lg md:text-xl text-emerald-50/90 max-w-2xl mx-auto font-light">
            Belajar mengelola sampah jadi lebih seru! Pilih game interaktif yang ingin kamu mainkan hari ini.
          </p>
        </div>

        <GameHub />
      </div>
    </div>
  );
}
