export default function Loading() {
  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-emerald-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center pt-8 animate-pulse">
          <div className="h-14 bg-white/20 rounded-2xl w-1/2 mx-auto mb-6" />
          <div className="h-6 bg-white/10 rounded w-3/4 mx-auto mb-2" />
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-[2rem] p-8 md:p-10 shadow-lg animate-pulse h-[500px]">
          <div className="flex justify-between items-center mb-8">
            <div className="w-1/3 h-4 bg-slate-200 rounded" />
            <div className="w-1/4 h-4 bg-slate-200 rounded" />
          </div>
          <div className="w-full h-8 bg-slate-200 rounded mb-10" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-16 bg-slate-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
