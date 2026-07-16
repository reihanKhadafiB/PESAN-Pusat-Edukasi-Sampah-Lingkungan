export default function Loading() {
  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-emerald-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center max-w-4xl mx-auto pt-8 animate-pulse">
          <div className="h-14 bg-white/20 rounded-2xl w-2/3 mx-auto mb-6" />
          <div className="h-6 bg-white/10 rounded w-3/4 mx-auto mb-2" />
          <div className="h-6 bg-white/10 rounded w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mt-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-6 h-[420px] border border-slate-100 shadow-sm">
              <div className="w-full h-48 bg-slate-200 rounded-2xl mb-6" />
              <div className="w-3/4 h-6 bg-slate-200 rounded mb-4" />
              <div className="w-full h-20 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
