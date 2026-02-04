
const Loader = () => {
  return (
    <div
      className="absolute inset-0 bg-white/80 backdrop-blur-sm
                 flex flex-col items-center justify-center z-50"
    >
      {/* Sequential Bars */}
      <div className="flex gap-2 mb-6">
        <span className="w-2 h-8 bg-blue-600 rounded animate-scan"></span>
        <span className="w-2 h-12 bg-blue-600 rounded animate-scan [animation-delay:0.15s]"></span>
        <span className="w-2 h-16 bg-blue-600 rounded animate-scan [animation-delay:0.3s]"></span>
        <span className="w-2 h-12 bg-blue-600 rounded animate-scan [animation-delay:0.45s]"></span>
        <span className="w-2 h-8 bg-blue-600 rounded animate-scan [animation-delay:0.6s]"></span>
      </div>

      <h3 className="text-slate-800 font-semibold text-lg">
        Analyzing your resume
      </h3>

      <p className="text-slate-500 text-sm mt-1">
        Scanning • Matching • Scoring
      </p>
    </div>
  );
};

export default Loader;
