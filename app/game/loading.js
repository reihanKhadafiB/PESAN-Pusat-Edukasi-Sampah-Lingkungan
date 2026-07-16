export default function Loading() {
  return (
    <div className="relative min-h-screen bg-slate-50 pt-32 pb-12 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[350px] bg-emerald-800 rounded-b-[4rem] shadow-xl z-0 overflow-hidden" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 text-center pt-8 animate-pulse">
          <div className="h-14 bg-white/20 rounded-2xl w-1/2 mx-auto mb-6" />
          <div className="h-6 bg-white/10 rounded w-3/4 mx-auto mb-2" />
        </div>
        <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-lg animate-pulse h-[600px] flex flex-col">
          <div className="flex justify-center gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-32 bg-slate-200 rounded-xl" />
            ))}
          </div>
          <div className="flex justify-center mt-auto">
            <div className="w-32 h-32 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
