import { getQuizData } from '../../lib/getData';
import QuizContainer from '../../components/QuizContainer';

export const metadata = {
  title: 'Kuis PESAN | Uji Pengetahuanmu',
  description: 'Uji pengetahuanmu tentang pengelolaan sampah, waktu terurai, dan konsep 3R melalui kuis interaktif.',
};

export default function KuisPage() {
  const quizData = getQuizData();
  
  // In a real app, we might want to shuffle the questions here or in the client
  // but for simplicity we'll just pass them as is.

  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      {/* Creative & Vibrant Header Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] rounded-full bg-emerald-400/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[150%] rounded-full bg-yellow-300/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Uji <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Pengetahuanmu!</span></h1>
          <p className="text-lg md:text-xl text-emerald-50/90 font-light">
            Jawab pertanyaan-pertanyaan berikut dengan benar untuk membuktikan bahwa kamu adalah pahlawan lingkungan sejati.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <QuizContainer quizData={quizData} />
        </div>
      </div>
    </div>
  );
}
