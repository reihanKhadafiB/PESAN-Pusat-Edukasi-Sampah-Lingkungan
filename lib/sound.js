'use client';

// Web Audio API wrapper to generate retro sound effects without needing MP3 files
let audioCtx = null;

function initAudio() {
  if (typeof window !== 'undefined' && !audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playTone(freq, type, duration, vol = 0.1) {
  initAudio();
  if (!audioCtx) return;

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

// -----------------------------------------------------------------
// GAME SOUND EFFECTS
// -----------------------------------------------------------------

export const playCatchSound = () => {
  // A pleasant high-pitched pop
  playTone(600, 'sine', 0.1, 0.15);
  setTimeout(() => playTone(800, 'sine', 0.15, 0.1), 50);
};

export const playMissSound = () => {
  // A low dull thump
  playTone(150, 'sawtooth', 0.2, 0.1);
  setTimeout(() => playTone(100, 'square', 0.3, 0.1), 100);
};

export const playWaveCompleteSound = () => {
  // Ascending arpeggio
  [440, 554, 659, 880].forEach((freq, index) => {
    setTimeout(() => playTone(freq, 'sine', 0.2, 0.1), index * 100);
  });
};

export const playWinSound = () => {
  // Triumphant fanfare
  [440, 440, 440, 554, 659, 880].forEach((freq, index) => {
    setTimeout(() => playTone(freq, 'square', 0.2, 0.1), index * 120);
  });
};

export const playGameOverSound = () => {
  // Descending sad sound
  [440, 392, 349, 329, 293, 261].forEach((freq, index) => {
    setTimeout(() => playTone(freq, 'sawtooth', 0.3, 0.1), index * 150);
  });
};

export const playTTSCorrect = () => {
  // High ping
  playTone(900, 'sine', 0.1, 0.1);
  setTimeout(() => playTone(1200, 'sine', 0.2, 0.1), 50);
};

export const playTTSWrong = () => {
  // Low buzz
  playTone(200, 'sawtooth', 0.2, 0.05);
};
