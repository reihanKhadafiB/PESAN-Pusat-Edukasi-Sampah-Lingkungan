'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Clock, Target, ArrowRight, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { playCatchSound, playMissSound, playWaveCompleteSound, playWinSound, playGameOverSound } from '../lib/sound';

const TRASH_DATA = [
  { type: 'organik', emoji: '🍌', name: 'Kulit Pisang' },
  { type: 'organik', emoji: '🍎', name: 'Sisa Apel' },
  { type: 'organik', emoji: '🍂', name: 'Daun Kering' },
  { type: 'organik', emoji: '🐟', name: 'Tulang Ikan' },
  { type: 'anorganik', emoji: '🥤', name: 'Gelas Plastik' },
  { type: 'anorganik', emoji: '🛍️', name: 'Kantong Plastik' },
  { type: 'anorganik', emoji: '🥫', name: 'Kaleng Minuman' },
  { type: 'anorganik', emoji: '📦', name: 'Kardus Bekas' },
  { type: 'b3', emoji: '🔋', name: 'Baterai Bekas' },
  { type: 'b3', emoji: '💡', name: 'Lampu Bohlam' },
  { type: 'b3', emoji: '💊', name: 'Obat Usang' },
  { type: 'b3', emoji: '🧴', name: 'Botol Pestisida' },
  { type: 'residu', emoji: '🧻', name: 'Tisu Bekas' },
  { type: 'residu', emoji: '🚬', name: 'Puntung Rokok' },
  { type: 'residu', emoji: '🧷', name: 'Popok Bayi' }
];

const FallingTrash = ({ item, onMiss }) => {
  return (
    <motion.div
      className="falling-trash absolute top-0 flex flex-col items-center pointer-events-none z-10"
      data-id={item.id}
      style={{ left: item.startX }}
      initial={{ y: -60 }}
      animate={{ y: 600 }}
      transition={{ duration: item.duration, ease: 'linear' }}
      onAnimationComplete={() => onMiss(item.id)}
    >
      <div className="text-4xl sm:text-5xl hover:scale-110 transition-transform">{item.emoji}</div>
      <div className="bg-white/95 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md text-slate-700 mt-1 pointer-events-none text-center whitespace-nowrap border border-slate-100">
        {item.name}
      </div>
    </motion.div>
  );
};

const DraggableBin = memo(({ binRef, containerRef }) => {
  return (
    <motion.div
      ref={binRef}
      drag="x"
      dragConstraints={containerRef}
      dragElastic={0.1}
      dragMomentum={false}
      initial={{ x: 0, y: 390 }}
      className="absolute z-20 w-32 h-28 cursor-grab active:cursor-grabbing flex flex-col items-center justify-end group"
    >
      {/* Bin 3D Visual */}
      <div className="relative w-full h-full transform-style-3d group-active:scale-95 transition-transform duration-100">
        {/* Bin Rim (Top) - Ellipse to simulate 3D perspective */}
        <div className="absolute top-0 w-full h-8 sm:h-10 bg-slate-700 rounded-[50%] border-4 border-slate-800 z-10 shadow-sm" />
        
        {/* Bin Inside Base */}
        <div className="absolute bottom-1 left-[5%] w-[90%] h-6 bg-slate-900 rounded-[50%] z-0" />

        {/* Bin Body (Solid color instead of heavy gradient mesh) */}
        <div 
          className="absolute top-4 sm:top-5 left-[5%] w-[90%] h-[calc(100%-1rem)] rounded-b-[1rem] sm:rounded-b-[1.25rem] border-4 border-t-0 border-slate-800 flex flex-col items-center justify-center overflow-hidden z-0 bg-slate-600 shadow-md"
        >
          {/* Text label */}
          <div className="bg-slate-900 px-3 py-1 rounded-full border border-slate-700 text-slate-100 font-bold text-[10px] tracking-wider shadow-sm">
            GESER
          </div>
        </div>
      </div>
    </motion.div>
  );
});
DraggableBin.displayName = 'DraggableBin';

export default function GameCanvas() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, waveComplete, gameover
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState([]);
  
  const containerRef = useRef(null);
  const binRef = useRef(null);
  const requestRef = useRef(null);

  const startGame = (startWave = 1, resetScore = true) => {
    setWave(startWave);
    if (resetScore) setScore(0);
    setTimeLeft(30);
    setLives(3);
    setItems([]);
    setGameState('playing');
  };

  // Lives logic
  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('gameover_life');
      setItems([]);
      playGameOverSound();
    }
  }, [lives, gameState]);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      if (wave < 3) {
        setGameState('waveComplete');
        playWaveCompleteSound();
      } else {
        setGameState('gameover');
        playWinSound();
      }
      setItems([]);
    }
  }, [gameState, timeLeft, wave]);

  // Spawning logic
  useEffect(() => {
    if (gameState !== 'playing') return;

    let spawnTimeout;
    const spawnItem = () => {
      const containerWidth = containerRef.current?.clientWidth || 300;
      const itemWidth = 60; 
      const randomTrash = TRASH_DATA[Math.floor(Math.random() * TRASH_DATA.length)];
      
      const baseDuration = 4 - (wave * 0.7); // W1: 3.3s, W2: 2.6s, W3: 1.9s
      const duration = baseDuration + Math.random() * 0.8;

      const newItem = {
        id: Math.random().toString(),
        ...randomTrash,
        startX: Math.random() * (containerWidth - itemWidth),
        duration
      };
      
      setItems(prev => [...prev, newItem]);
      
      const spawnRate = 1200 - (wave * 250); // W1: 950ms, W2: 700ms, W3: 450ms
      spawnTimeout = setTimeout(spawnItem, spawnRate);
    };

    spawnTimeout = setTimeout(spawnItem, 500);
    return () => clearTimeout(spawnTimeout);
  }, [gameState, wave]);

  // Collision logic
  const handleCatch = useCallback((id) => {
    setItems(prev => {
      if (!prev.find(i => i.id === id)) return prev;
      setScore(s => s + 10);
      playCatchSound();
      return prev.filter(i => i.id !== id);
    });
  }, []);

  const handleMiss = useCallback((id) => {
    setItems(prev => {
      if (!prev.find(i => i.id === id)) return prev;
      playMissSound();
      return prev.filter(i => i.id !== id);
    });
    setLives(l => l - 1);
  }, []);

  const checkCollisions = useCallback(() => {
    if (gameState !== 'playing') return;
    
    const binNode = binRef.current;
    if (binNode) {
      const binRect = binNode.getBoundingClientRect();
      const currentItems = document.querySelectorAll('.falling-trash');
      
      currentItems.forEach(node => {
        const rect = node.getBoundingClientRect();
        // AABB Collision Detection with generous padding to make it fun
        if (
          rect.bottom > binRect.top + 20 && // Requires it to fall slightly into the bin
          rect.top < binRect.bottom &&
          rect.right > binRect.left - 10 &&
          rect.left < binRect.right + 10
        ) {
          handleCatch(node.dataset.id);
        }
      });
    }
  }, [gameState, handleCatch]);

  useEffect(() => {
    if (gameState === 'playing') {
      // Throttle collision checks to 20 times per second instead of 60 FPS
      // This massively saves mobile CPU and prevents lag!
      requestRef.current = setInterval(checkCollisions, 50);
    }
    return () => clearInterval(requestRef.current);
  }, [gameState, checkCollisions]);

  return (
    <div className="bg-white/95 rounded-[2rem] p-4 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-4xl mx-auto w-full select-none touch-none">
      {/* Header UI */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-black text-lg shadow-sm border border-emerald-200">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          Skor: {score}
        </div>
        
        {gameState !== 'menu' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white px-3 py-1 sm:py-1.5 rounded-full shadow-sm border border-slate-100">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${i < lives ? 'text-red-500 fill-red-500' : 'text-slate-200 fill-slate-200'}`} />
              ))}
            </div>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1.5 sm:py-2 rounded-full font-bold shadow-sm border border-blue-200">
              Wave {wave}/3
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-black text-lg shadow-sm border transition-colors ${timeLeft <= 5 ? 'bg-red-100 text-red-800 border-red-200 animate-pulse' : 'bg-slate-100 text-slate-800 border-slate-200'}`}>
              <Clock className="w-5 h-5" />
              {timeLeft}s
            </div>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div 
        ref={containerRef}
        className="relative w-full h-[500px] bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 rounded-3xl overflow-hidden border-4 border-slate-100 shadow-inner"
      >
        {/* State: Menu */}
        <AnimatePresence>
          {gameState === 'menu' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-30"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border border-emerald-100">
                <div className="text-6xl mb-4">🌧️🗑️</div>
                <h3 className="text-3xl font-black text-slate-800 mb-2">Hujan Sampah</h3>
                <p className="text-slate-500 mb-8 font-medium">
                  Geser tong sampah untuk menangkap semua sampah yang berjatuhan! Terdapat 3 Wave menantang.
                </p>
                <button 
                  onClick={() => startGame(1, true)}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold rounded-2xl hover:from-emerald-600 hover:to-green-700 text-lg shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-6 h-6 fill-white" />
                  Mulai Bermain
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State: Wave Complete */}
        <AnimatePresence>
          {gameState === 'waveComplete' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-blue-900/80 z-30"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border border-blue-100">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-1">Wave {wave} Selesai!</h3>
                <p className="text-slate-500 mb-6 font-medium">
                  Persiapkan dirimu, hujan sampah akan semakin deras di wave berikutnya.
                </p>
                <button 
                  onClick={() => startGame(wave + 1, false)}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-extrabold rounded-2xl hover:from-blue-600 hover:to-indigo-700 text-lg shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Lanjut Wave {wave + 1}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State: Game Over / Victory */}
        <AnimatePresence>
          {gameState === 'gameover' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-30"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border border-emerald-100">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-black text-slate-800 mb-1">Luar Biasa!</h3>
                <p className="text-slate-500 mb-6 font-medium">
                  Kamu berhasil melewati semua wave! Total sampah yang berhasil diamankan menghasilkan skor:
                  <span className="text-5xl font-black text-emerald-600 mt-3 block">{score}</span>
                </p>
                <button 
                  onClick={() => startGame(1, true)}
                  className="w-full py-4 bg-slate-100 text-slate-800 font-extrabold rounded-2xl hover:bg-slate-200 text-lg transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Main Lagi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* State: Game Over (Lives) */}
        <AnimatePresence>
          {gameState === 'gameover_life' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/80 z-30"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border border-red-100">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 mb-1">Yah, Hati Habis!</h3>
                <p className="text-slate-500 mb-6 font-medium">
                  Terlalu banyak sampah yang lolos. Jangan menyerah, coba lagi dari Wave {wave}!
                </p>
                <button 
                  onClick={() => startGame(wave, false)}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-extrabold rounded-2xl hover:from-red-600 hover:to-red-700 text-lg shadow-lg shadow-red-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-6 h-6" />
                  Ulangi Wave {wave}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Falling Trash Items */}
        {gameState === 'playing' && items.map(item => (
          <FallingTrash 
            key={item.id} 
            item={item} 
            onMiss={handleMiss} 
          />
        ))}

        <DraggableBin binRef={binRef} containerRef={containerRef} />
        
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-emerald-600 shadow-[0_-2px_15px_rgba(16,185,129,0.3)] z-10" />
      </div>
    </div>
  );
}
