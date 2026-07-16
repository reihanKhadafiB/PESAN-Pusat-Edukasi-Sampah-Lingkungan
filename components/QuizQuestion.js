import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QuizQuestion({ 
  question, 
  currentQuestionIndex, 
  totalQuestions, 
  onAnswer,
  selectedAnswer,
  onNext,
  onPrev,
  onFinish
}) {
  if (!question) return null;

  const isAnswered = selectedAnswer !== null && selectedAnswer !== undefined;
  
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-slate-200/50 border border-white p-6 sm:p-10 relative overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <span className="text-xs sm:text-sm font-extrabold text-emerald-700 bg-emerald-100/80 px-4 py-2 rounded-full uppercase tracking-widest backdrop-blur-sm border border-emerald-200/50">
          Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
        </span>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8 leading-snug">
        {question.pertanyaan}
      </h2>
      
      <div className="space-y-4 mb-10">
        {question.opsi.map((opsi, index) => {
          let buttonClass = "w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all font-semibold text-lg flex items-center group ";
          let letterClass = "w-10 h-10 rounded-xl flex items-center justify-center mr-4 font-extrabold transition-colors shrink-0 shadow-sm ";
          
          if (!isAnswered) {
            buttonClass += "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 bg-white hover:shadow-md hover:-translate-y-0.5";
            letterClass += "bg-slate-100 group-hover:bg-emerald-200 group-hover:text-emerald-800 text-slate-500";
          } else {
            // Sudah dijawab
            if (index === question.jawabanBenar) {
               // Benar
               buttonClass += "border-green-500 bg-green-50 text-green-800 shadow-sm";
               letterClass += "bg-green-500 text-white";
            } else if (index === selectedAnswer && index !== question.jawabanBenar) {
               // Salah dipilih
               buttonClass += "border-red-500 bg-red-50 text-red-800 shadow-sm";
               letterClass += "bg-red-500 text-white";
            } else {
               // Tidak dipilih dan bukan jawaban benar
               buttonClass += "border-slate-100 bg-white/50 opacity-60 text-slate-400";
               letterClass += "bg-slate-50 text-slate-300";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <span className={letterClass}>
                {String.fromCharCode(65 + index)}
              </span>
              <span>{opsi}</span>
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className={`p-6 rounded-2xl mb-10 shadow-sm ${
          selectedAnswer === question.jawabanBenar 
            ? 'bg-green-100/90 border border-green-200 text-green-800' 
            : 'bg-amber-100/90 border border-amber-200 text-amber-900'
        }`}>
          <p className="font-extrabold mb-2 text-lg">
            {selectedAnswer === question.jawabanBenar ? '✅ Tepat Sekali!' : '❌ Kurang Tepat!'}
          </p>
          <p className="font-medium text-sm sm:text-base leading-relaxed">{question.penjelasan}</p>
        </div>
      )}

      {/* Navigasi Kuis */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200/60">
        <button 
          onClick={onPrev}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold transition-all text-sm sm:text-base ${
            currentQuestionIndex === 0 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50' 
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:-translate-x-1 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button 
            onClick={onNext}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-bold transition-all text-sm sm:text-base ${
              !isAnswered 
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-70' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:translate-x-1 shadow-lg shadow-emerald-600/30'
            }`}
            disabled={!isAnswered}
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <span className="sm:hidden">Lanjut</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={onFinish}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-extrabold transition-all text-sm sm:text-base ${
              !isAnswered 
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed opacity-70' 
                : 'bg-yellow-400 text-slate-900 hover:bg-yellow-300 hover:-translate-y-1 shadow-lg shadow-yellow-400/40'
            }`}
            disabled={!isAnswered}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="hidden sm:inline">Selesaikan Kuis</span>
            <span className="sm:hidden">Selesai</span>
          </button>
        )}
      </div>
    </div>
  );
}
