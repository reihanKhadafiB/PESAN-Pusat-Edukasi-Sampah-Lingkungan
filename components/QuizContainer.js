'use client';

import { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';
import { Info } from 'lucide-react';

export default function QuizContainer({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Format: { 0: 2, 1: 0, 2: 3 }
  const [showResult, setShowResult] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load high score from local storage
    const savedHighScore = localStorage.getItem('edukasiSampah_highScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    // Initialize 10 random questions for this session
    startNewSession();
  }, [quizData]);

  const startNewSession = () => {
    if (!quizData || quizData.length === 0) return;
    
    // Shuffle the entire pool of questions and pick the first 10
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selected10 = shuffled.slice(0, 10);
    
    setSessionQuestions(selected10);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
    setIsReady(true);
  };

  const handleAnswer = (selectedIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    // Menghitung skor akhir
    let finalScore = 0;
    sessionQuestions.forEach((q, index) => {
      if (answers[index] === q.jawabanBenar) {
        finalScore += 1;
      }
    });

    setShowResult(true);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('edukasiSampah_highScore', finalScore.toString());
    }
  };

  if (!isReady || !sessionQuestions || sessionQuestions.length === 0) {
    return <div className="text-center p-8 bg-white/95 rounded-2xl animate-pulse h-64 flex items-center justify-center font-bold text-slate-500">Menyiapkan kuis...</div>;
  }

  // Hitung skor saat ini untuk dikirim ke QuizResult
  let currentScore = 0;
  sessionQuestions.forEach((q, index) => {
    if (answers[index] === q.jawabanBenar) {
      currentScore += 1;
    }
  });

  if (showResult) {
    return <QuizResult score={currentScore} total={sessionQuestions.length} highScore={highScore} onRetry={startNewSession} />;
  }

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex] !== undefined ? answers[currentQuestionIndex] : null;

  return (
    <div className="relative">
      <QuizQuestion 
        question={currentQuestion} 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={sessionQuestions.length} 
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        onNext={handleNext}
        onPrev={handlePrev}
        onFinish={finishQuiz}
      />
      
      {/* Catatan untuk pengguna */}
      <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm font-medium bg-slate-100/80 py-3 px-4 rounded-full border border-slate-200/60 max-w-lg mx-auto">
        <Info className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-center">Catatan: Progres jawabanmu akan ter-reset jika web ini di-refresh.</span>
      </div>
    </div>
  );
}
