export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl">
      
      {/* Animated rings + logo */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer spinning ring */}
        <div
          className="absolute w-24 h-24 rounded-full border-4 border-green-100 border-t-green-500"
          style={{ animation: 'spin 1.2s linear infinite' }}
        />
        {/* Inner counter-spinning ring */}
        <div
          className="absolute w-16 h-16 rounded-full border-4 border-emerald-100 border-b-emerald-400"
          style={{ animation: 'spin 0.8s linear infinite reverse' }}
        />
        {/* Center logo */}
        <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
          </svg>
        </div>
      </div>

      {/* Brand name + subtitle */}
      <div className="text-center mb-7">
        <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 tracking-tight mb-1">
          PESAN
        </h2>
        <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Memuat halaman…</p>
      </div>

      {/* Sweeping progress bar */}
      <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden relative">
        <div className="loading-bar absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-400 rounded-full" />
      </div>

      {/* Bouncing dots */}
      <div className="flex items-center gap-2 mt-5">
        <div className="loading-dot-0 w-2 h-2 rounded-full bg-green-400" />
        <div className="loading-dot-1 w-2 h-2 rounded-full bg-emerald-400" />
        <div className="loading-dot-2 w-2 h-2 rounded-full bg-teal-400" />
      </div>
    </div>
  );
}
