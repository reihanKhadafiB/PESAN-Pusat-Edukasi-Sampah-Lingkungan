'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Puzzle, ArrowLeft, Gamepad2, Volume2, VolumeX, Music } from 'lucide-react';
import GameCanvas from './GameCanvas';
import TTSGame from './TTSGame';

export default function GameHub() {
  const [activeGame, setActiveGame] = useState(null); // 'hujan-sampah' or 'tts'
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Autoplay music when a game is selected if not already playing
  // and stop it when returning to menu
  useEffect(() => {
    if (activeGame) {
      if (audioRef.current) {
        audioRef.current.load(); // Force load new src
        if (!isMusicPlaying) {
          audioRef.current.play().then(() => {
            setIsMusicPlaying(true);
          }).catch(e => {
            console.error("Autoplay prevented:", e);
          });
        }
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset track to start
        setIsMusicPlaying(false);
      }
    }
  }, [activeGame]);

  const audioSrc = activeGame === 'tts' ? '/audio/bgm_tts.ogg' : '/audio/bgm.ogg';

  return (
    <div className="w-full relative z-10">
      {/* Hidden Audio Player */}
      <audio ref={audioRef} src={audioSrc} loop />

      {/* Global Music Toggle - Only visible when inside a game */}
      {activeGame && (
        <div className="absolute -top-16 right-0 z-50">
          <button 
            onClick={toggleMusic}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-md transition-all duration-300 border ${
              isMusicPlaying 
                ? 'bg-yellow-400 text-yellow-900 border-yellow-500 hover:bg-yellow-300' 
                : 'bg-white/95 text-slate-500 border-slate-200 hover:bg-white'
            }`}
            title="Toggle Background Music"
          >
            <Music className="w-4 h-4" />
            {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!activeGame ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Game 1: Hujan Sampah */}
              <button
                onClick={() => setActiveGame('hujan-sampah')}
                className="group relative bg-white/95 border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/10 group-hover:to-teal-400/10 transition-colors duration-500" />
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <span className="text-5xl filter drop-shadow-md">🌧️🗑️</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">Hujan Sampah</h3>
                <p className="text-slate-500 font-medium">
                  Uji ketangkasanmu! Geser tong sampah dan tangkap semua sampah yang berjatuhan sebelum waktu habis.
                </p>
                <div className="mt-8 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-full font-bold border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Mainkan Sekarang
                </div>
              </button>

              {/* Game 2: TTS */}
              <button
                onClick={() => setActiveGame('tts')}
                className="group relative bg-white/95 border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center overflow-hidden hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/10 group-hover:to-indigo-400/10 transition-colors duration-500" />
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <span className="text-5xl filter drop-shadow-md">🧩📝</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">Teka Teki Silang</h3>
                <p className="text-slate-500 font-medium">
                  Uji wawasanmu! Pecahkan 10 kata rahasia acak seputar lingkungan dan pengelolaan sampah, jangan lihat google kalau berani!
                </p>
                <div className="mt-8 px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-bold border border-blue-100 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <Puzzle className="w-5 h-5" />
                  Mulai Pecahkan
                </div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
            className="w-full flex flex-col items-center"
          >
            <button
              onClick={() => setActiveGame(null)}
              className="mb-6 flex items-center gap-2 px-5 py-2.5 bg-white/95 rounded-full shadow-sm hover:shadow-md border border-gray-100 text-slate-700 hover:text-emerald-600 font-bold transition-all duration-300 self-start lg:self-auto lg:mr-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Menu Game
            </button>

            <div className="w-full">
              {activeGame === 'hujan-sampah' && <GameCanvas />}
              {activeGame === 'tts' && <TTSGame />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
