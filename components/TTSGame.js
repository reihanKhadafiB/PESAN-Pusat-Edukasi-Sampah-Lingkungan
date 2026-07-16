'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, Trophy, HelpCircle, ArrowRight } from 'lucide-react';
import { playTTSCorrect, playTTSWrong, playWinSound } from '../lib/sound';

const TTS_BANK = [
  { word: "ORGANIK", clue: "Sampah yang bisa membusuk secara alami" },
  { word: "ANORGANIK", clue: "Sampah yang sulit atau tidak bisa terurai alami" },
  { word: "RESIDU", clue: "Sampah sisa yang sulit didaur ulang (contoh: puntung rokok)" },
  { word: "DAURULANG", clue: "Proses mengolah sampah menjadi barang baru (Bahasa Indonesia)" },
  { word: "KOMPOS", clue: "Pupuk yang dihasilkan dari pembusukan sampah organik" },
  { word: "PLASTIK", clue: "Bahan buatan yang butuh ratusan tahun untuk terurai" },
  { word: "KERTAS", clue: "Sampah anorganik dari serat pohon yang sangat mudah didaur ulang" },
  { word: "KACA", clue: "Bahan bening yang bisa pecah, biasanya untuk botol atau cermin" },
  { word: "BATERAI", clue: "Sumber energi portabel, termasuk limbah B3" },
  { word: "REDUCE", clue: "Prinsip 3R: mengurangi jumlah sampah dari sumbernya" },
  { word: "REUSE", clue: "Prinsip 3R: menggunakan kembali barang yang masih layak pakai" },
  { word: "RECYCLE", clue: "Prinsip 3R: mendaur ulang sampah menjadi barang berguna" },
  { word: "LINGKUNGAN", clue: "Segala sesuatu di sekitar manusia yang memengaruhi kehidupannya" },
  { word: "POLUSI", clue: "Masuknya zat berbahaya yang merusak alam (Pencemaran)" },
  { word: "TONG", clue: "Wadah tempat kita membuang benda yang tak terpakai" },
  { word: "SAMPAH", clue: "Barang sisa yang sudah tidak digunakan lagi oleh pemiliknya" },
  { word: "ECOBRICK", clue: "Botol plastik padat berisi sampah plastik fleksibel untuk bahan bangunan" },
  { word: "RACUN", clue: "Zat yang terdapat pada limbah B3 yang berbahaya bagi tubuh" },
  { word: "KALENG", clue: "Wadah dari aluminium yang biasanya dipakai untuk minuman" },
  { word: "KARDUS", clue: "Kotak kemasan yang terbuat dari kertas tebal" }
];

function generateCrossword(wordBank, targetCount = 10) {
  const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
  const GRID_SIZE = 25;
  
  let bestGrid = null;
  let bestPlaced = [];
  
  for (let attempt = 0; attempt < 100; attempt++) {
    const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const placed = [];
    
    // Shuffle again for each attempt to get different layouts
    const currentBank = [...shuffled].sort(() => Math.random() - 0.5);

    for (const item of currentBank) {
      if (placed.length === targetCount) break;
      const word = item.word.toUpperCase();
      
      if (placed.length === 0) {
        const row = Math.floor(GRID_SIZE / 2);
        const col = Math.floor((GRID_SIZE - word.length) / 2);
        for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
        placed.push({ ...item, word, row, col, isHorizontal: true, num: placed.length + 1 });
        continue;
      }
      
      let bestPlacement = null;
      let maxScore = -1;
      
      for (const p of placed) {
        for (let i = 0; i < word.length; i++) {
          for (let j = 0; j < p.word.length; j++) {
            if (word[i] === p.word[j]) {
              const isHorizontal = !p.isHorizontal;
              const startRow = isHorizontal ? p.row + j : p.row - i;
              const startCol = isHorizontal ? p.col - i : p.col + j;
              
              if (startRow >= 0 && startRow + (isHorizontal ? 0 : word.length) < GRID_SIZE &&
                  startCol >= 0 && startCol + (isHorizontal ? word.length : 0) < GRID_SIZE) {
                
                let isValid = true;
                let intersections = 0;
                
                for (let k = 0; k < word.length; k++) {
                  const r = startRow + (isHorizontal ? 0 : k);
                  const c = startCol + (isHorizontal ? k : 0);
                  
                  if (grid[r][c] === word[k]) {
                    intersections++;
                  } else if (grid[r][c] !== '') {
                    isValid = false; break;
                  } else {
                    const hasTop = r > 0 && grid[r-1][c] !== '';
                    const hasBottom = r < GRID_SIZE - 1 && grid[r+1][c] !== '';
                    const hasLeft = c > 0 && grid[r][c-1] !== '';
                    const hasRight = c < GRID_SIZE - 1 && grid[r][c+1] !== '';
                    
                    if (isHorizontal && (hasTop || hasBottom)) { isValid = false; break; }
                    if (!isHorizontal && (hasLeft || hasRight)) { isValid = false; break; }
                  }
                }
                
                if (isHorizontal) {
                  if (startCol > 0 && grid[startRow][startCol - 1] !== '') isValid = false;
                  if (startCol + word.length < GRID_SIZE && grid[startRow][startCol + word.length] !== '') isValid = false;
                } else {
                  if (startRow > 0 && grid[startRow - 1][startCol] !== '') isValid = false;
                  if (startRow + word.length < GRID_SIZE && grid[startRow + word.length][startCol] !== '') isValid = false;
                }
                
                if (isValid) {
                  const centerDist = Math.abs(startRow - GRID_SIZE/2) + Math.abs(startCol - GRID_SIZE/2);
                  const score = intersections * 10 - centerDist;
                  if (score > maxScore) {
                    maxScore = score;
                    bestPlacement = { row: startRow, col: startCol, isHorizontal };
                  }
                }
              }
            }
          }
        }
      }
      
      if (bestPlacement) {
        const { row, col, isHorizontal } = bestPlacement;
        for (let i = 0; i < word.length; i++) {
          grid[row + (isHorizontal ? 0 : i)][col + (isHorizontal ? i : 0)] = word[i];
        }
        placed.push({ ...item, word, row, col, isHorizontal, num: placed.length + 1 });
      }
    }
    
    if (placed.length > (bestPlaced?.length || 0)) {
      bestPlaced = placed;
      bestGrid = grid;
      if (placed.length === targetCount) break;
    }
  }
  
  // Trim empty rows and columns to fit the bounding box
  let minRow = GRID_SIZE, maxRow = 0, minCol = GRID_SIZE, maxCol = 0;
  for (const p of bestPlaced) {
    minRow = Math.min(minRow, p.row);
    maxRow = Math.max(maxRow, p.row + (p.isHorizontal ? 0 : p.word.length - 1));
    minCol = Math.min(minCol, p.col);
    maxCol = Math.max(maxCol, p.col + (p.isHorizontal ? p.word.length - 1 : 0));
  }
  
  // Add 1 cell padding
  minRow = Math.max(0, minRow - 1);
  maxRow = Math.min(GRID_SIZE - 1, maxRow + 1);
  minCol = Math.max(0, minCol - 1);
  maxCol = Math.min(GRID_SIZE - 1, maxCol + 1);
  
  const finalGrid = [];
  for (let r = minRow; r <= maxRow; r++) {
    finalGrid.push(bestGrid[r].slice(minCol, maxCol + 1));
  }
  
  const finalPlaced = bestPlaced.map((p, idx) => ({
    ...p,
    num: idx + 1,
    row: p.row - minRow,
    col: p.col - minCol
  }));

  return { grid: finalGrid, placed: finalPlaced };
}

export default function TTSGame() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, won
  const [gridData, setGridData] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [selectedNum, setSelectedNum] = useState(null);
  const [selectedIsHorizontal, setSelectedIsHorizontal] = useState(true);
  const [score, setScore] = useState(0);

  const inputRefs = useRef({});

  const startGame = () => {
    const { grid, placed } = generateCrossword(TTS_BANK, 10);
    setGridData({ grid, placed });
    
    // Initialize user inputs
    const initialInputs = {};
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== '') {
          initialInputs[`${r},${c}`] = '';
        }
      }
    }
    setUserInputs(initialInputs);
    setSelectedNum(placed[0]?.num || null);
    setSelectedIsHorizontal(placed[0]?.isHorizontal || true);
    setScore(0);
    setGameState('playing');
  };

  const checkWin = useCallback(() => {
    if (!gridData) return;
    let allCorrect = true;
    let correct = 0;
    let total = 0;
    for (let r = 0; r < gridData.grid.length; r++) {
      for (let c = 0; c < gridData.grid[r].length; c++) {
        const correctChar = gridData.grid[r][c];
        if (correctChar !== '') {
          total++;
          if ((userInputs[`${r},${c}`] || '').toUpperCase() === correctChar) {
            correct++;
          } else {
            allCorrect = false;
          }
        }
      }
    }
    setScore(Math.floor((correct / total) * 100));
    
    if (allCorrect && total > 0) {
      if (gameState !== 'won') {
        playWinSound();
        setGameState('won');
      }
    }
  }, [gridData, userInputs, gameState]);

  // Check win whenever userInputs change
  useEffect(() => {
    if (gameState === 'playing') checkWin();
  }, [userInputs, gameState, checkWin]);

  const getActiveWord = () => {
    if (!gridData || !selectedNum) return null;
    return gridData.placed.find(p => p.num === selectedNum && p.isHorizontal === selectedIsHorizontal) 
        || gridData.placed.find(p => p.num === selectedNum);
  };

  const handleCellClick = (r, c) => {
    // Find words intersecting this cell
    const intersecting = gridData.placed.filter(p => {
      if (p.isHorizontal) {
        return p.row === r && c >= p.col && c < p.col + p.word.length;
      } else {
        return p.col === c && r >= p.row && r < p.row + p.word.length;
      }
    });

    if (intersecting.length === 0) return;

    // If clicking same cell, toggle orientation if multiple words intersect
    if (intersecting.length > 1) {
      const isCurrentlyHorizontal = intersecting.some(p => p.num === selectedNum && p.isHorizontal);
      const next = isCurrentlyHorizontal 
        ? intersecting.find(p => !p.isHorizontal) 
        : intersecting.find(p => p.isHorizontal);
        
      if (next) {
        setSelectedNum(next.num);
        setSelectedIsHorizontal(next.isHorizontal);
      } else {
        setSelectedNum(intersecting[0].num);
        setSelectedIsHorizontal(intersecting[0].isHorizontal);
      }
    } else {
      setSelectedNum(intersecting[0].num);
      setSelectedIsHorizontal(intersecting[0].isHorizontal);
    }
  };

  const handleKeyDown = (e, r, c) => {
    const word = getActiveWord();
    if (!word) return;

    const isHorizontal = word.isHorizontal;
    
    if (e.key === 'Backspace') {
      e.preventDefault();
      setUserInputs(prev => ({ ...prev, [`${r},${c}`]: '' }));
      
      // Move back
      let prevR = r, prevC = c;
      if (isHorizontal && c > word.col) prevC = c - 1;
      else if (!isHorizontal && r > word.row) prevR = r - 1;
      
      inputRefs.current[`${prevR},${prevC}`]?.focus();
    } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
      e.preventDefault();
      const inputChar = e.key.toUpperCase();
      setUserInputs(prev => ({ ...prev, [`${r},${c}`]: inputChar }));
      
      if (inputChar === gridData.grid[r][c]) {
        playTTSCorrect();
      } else {
        playTTSWrong();
      }
      
      // Move forward
      let nextR = r, nextC = c;
      if (isHorizontal && c < word.col + word.word.length - 1) nextC = c + 1;
      else if (!isHorizontal && r < word.row + word.word.length - 1) nextR = r + 1;
      
      inputRefs.current[`${nextR},${nextC}`]?.focus();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      // Allow navigation
      e.preventDefault();
      let nextR = r, nextC = c;
      if (isHorizontal && c < word.col + word.word.length - 1) nextC = c + 1;
      else if (!isHorizontal && r < word.row + word.word.length - 1) nextR = r + 1;
      inputRefs.current[`${nextR},${nextC}`]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      let prevR = r, prevC = c;
      if (isHorizontal && c > word.col) prevC = c - 1;
      else if (!isHorizontal && r > word.row) prevR = r - 1;
      inputRefs.current[`${prevR},${prevC}`]?.focus();
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-4 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-6xl mx-auto w-full">
      {/* Header UI */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-black text-lg shadow-sm border border-emerald-200">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
          Akurasi: {score}%
        </div>
        
        {gameState !== 'menu' && (
          <button 
            onClick={startGame}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-700 px-4 py-2 rounded-full font-bold shadow-sm border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Acak Ulang</span>
          </button>
        )}
      </div>

      <div className="relative w-full min-h-[600px] bg-slate-50 rounded-3xl overflow-hidden border-4 border-slate-100 shadow-inner p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Menu State */}
        <AnimatePresence>
          {gameState === 'menu' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm z-30"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border border-emerald-100">
                <div className="text-6xl mb-4">🧩</div>
                <h3 className="text-3xl font-black text-slate-800 mb-2">Teka Teki Silang</h3>
                <p className="text-slate-500 mb-8 font-medium">
                  Uji pengetahuanmu! Tebak 10 kata rahasia seputar pengelolaan sampah berdasarkan petunjuk. Posisi TTS akan diacak setiap kali kamu bermain!
                </p>
                <button 
                  onClick={startGame}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold rounded-2xl hover:from-emerald-600 hover:to-green-700 text-lg shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-6 h-6 fill-white" />
                  Mulai Main
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Victory State */}
        <AnimatePresence>
          {gameState === 'won' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-900/60 backdrop-blur-md z-30"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border border-emerald-100">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-3xl font-black text-slate-800 mb-1">Hebat!</h3>
                <p className="text-slate-500 mb-6 font-medium">
                  Kamu berhasil menyelesaikan teka-teki silang dengan akurasi 100%!
                </p>
                <button 
                  onClick={startGame}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold rounded-2xl hover:from-emerald-600 hover:to-green-700 text-lg shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-6 h-6" />
                  Main Lagi (Grid Baru)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Layout */}
        {gameState !== 'menu' && gridData && (
          <>
            {/* Grid Area */}
            <div className="flex-1 flex items-center justify-center overflow-auto p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div 
                className="grid gap-[2px] p-2 bg-slate-200 rounded-lg shadow-inner"
                style={{
                  gridTemplateColumns: `repeat(${gridData.grid[0].length}, minmax(0, 1fr))`,
                  width: 'fit-content'
                }}
              >
                {gridData.grid.map((row, r) => (
                  row.map((cell, c) => {
                    if (cell === '') {
                      return <div key={`${r}-${c}`} className="w-8 h-8 sm:w-10 sm:h-10 bg-transparent" />;
                    }

                    // Check if this cell is the start of any word
                    const startsHere = gridData.placed.filter(p => p.row === r && p.col === c);
                    
                    // Check if this cell is currently selected
                    const activeWord = getActiveWord();
                    const isSelected = activeWord && (
                      (activeWord.isHorizontal && r === activeWord.row && c >= activeWord.col && c < activeWord.col + activeWord.word.length) ||
                      (!activeWord.isHorizontal && c === activeWord.col && r >= activeWord.row && r < activeWord.row + activeWord.word.length)
                    );
                    
                    const isCorrect = (userInputs[`${r},${c}`] || '').toUpperCase() === cell;
                    const hasInput = (userInputs[`${r},${c}`] || '') !== '';

                    return (
                      <div 
                        key={`${r}-${c}`} 
                        className={`relative w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-sm flex items-center justify-center text-lg sm:text-xl font-bold uppercase transition-colors
                          ${isSelected ? 'bg-yellow-100 border-2 border-yellow-400 z-10' : 'border border-slate-300'}
                          ${hasInput ? (isCorrect ? 'text-emerald-600' : 'text-red-500') : 'text-slate-800'}
                        `}
                        onClick={() => handleCellClick(r, c)}
                      >
                        {startsHere.length > 0 && (
                          <div className="absolute top-0.5 left-1 text-[8px] sm:text-[10px] font-black text-slate-400 select-none">
                            {startsHere.map(p => p.num).join('/')}
                          </div>
                        )}
                        <input
                          ref={el => inputRefs.current[`${r},${c}`] = el}
                          type="text"
                          maxLength={1}
                          className="w-full h-full text-center bg-transparent outline-none cursor-pointer placeholder-transparent"
                          value={userInputs[`${r},${c}`] || ''}
                          onChange={() => {}} // Handled by onKeyDown to manage focus
                          onKeyDown={(e) => handleKeyDown(e, r, c)}
                          onFocus={() => handleCellClick(r, c)}
                        />
                      </div>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Clues Area */}
            <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-6">
              {/* Mendatar (Horizontal) */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
                  <ArrowRight className="w-5 h-5 text-emerald-500" /> Mendatar
                </h4>
                <ul className="space-y-3 max-h-[250px] lg:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {gridData.placed.filter(p => p.isHorizontal).sort((a,b) => a.num - b.num).map(p => (
                    <li 
                      key={`h-${p.num}`}
                      onClick={() => {
                        setSelectedNum(p.num);
                        setSelectedIsHorizontal(true);
                        inputRefs.current[`${p.row},${p.col}`]?.focus();
                      }}
                      className={`text-sm p-3 rounded-xl cursor-pointer transition-colors border ${
                        selectedNum === p.num && selectedIsHorizontal
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-900 shadow-sm'
                          : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="font-bold mr-2">{p.num}.</span> {p.clue}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Menurun (Vertical) */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex-1">
                <h4 className="font-black text-slate-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
                  <HelpCircle className="w-5 h-5 text-blue-500" /> Menurun
                </h4>
                <ul className="space-y-3 max-h-[250px] lg:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {gridData.placed.filter(p => !p.isHorizontal).sort((a,b) => a.num - b.num).map(p => (
                    <li 
                      key={`v-${p.num}`}
                      onClick={() => {
                        setSelectedNum(p.num);
                        setSelectedIsHorizontal(false);
                        inputRefs.current[`${p.row},${p.col}`]?.focus();
                      }}
                      className={`text-sm p-3 rounded-xl cursor-pointer transition-colors border ${
                        selectedNum === p.num && !selectedIsHorizontal
                          ? 'bg-yellow-50 border-yellow-200 text-yellow-900 shadow-sm'
                          : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span className="font-bold mr-2">{p.num}.</span> {p.clue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
