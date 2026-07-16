export default function QuizResult({ score, total, highScore, onRetry }) {
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  if (percentage === 100) message = "Luar Biasa! Ahli Lingkungan!";
  else if (percentage >= 70) message = "Bagus Sekali! Pengetahuanmu hebat.";
  else if (percentage >= 40) message = "Lumayan, tapi masih bisa ditingkatkan.";
  else message = "Ayo belajar lagi tentang pengelolaan sampah!";

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Kuis Selesai!</h2>
      <p className="text-xl text-gray-600 mb-8">{message}</p>
      
      <div className="bg-gray-50 rounded-2xl p-8 mb-10 max-w-sm mx-auto">
        <div className="text-5xl font-black text-green-600 mb-2">
          {score} <span className="text-2xl text-gray-400">/ {total}</span>
        </div>
        <p className="text-gray-500 font-medium">Skor Kamu ({percentage}%)</p>
        
        {highScore > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Skor Tertinggi: {highScore}</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={onRetry}
          className="px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Coba Lagi
        </button>
        <a 
          href="/jenis-sampah"
          className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-full font-bold text-lg hover:bg-green-50 transition-colors"
        >
          Belajar Lagi
        </a>
      </div>
    </div>
  );
}
