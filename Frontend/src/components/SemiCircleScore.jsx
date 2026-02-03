const SemiCircleScore = ({ value = 72 }) => {
  const radius = 90;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative w-[220px] h-[110px]">
      <svg
        viewBox="0 0 200 100"
        className="w-full h-full"
      >
        {/* Background arc */}
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d="M10 100 A90 90 0 0 1 190 100"
          fill="none"
          stroke="#2563EB"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <span className="text-3xl font-bold text-slate-800">
          {value}%
        </span>
        <span className="text-sm text-slate-500">
          Match Score
        </span>
      </div>
    </div>
  );
};

export default SemiCircleScore;
