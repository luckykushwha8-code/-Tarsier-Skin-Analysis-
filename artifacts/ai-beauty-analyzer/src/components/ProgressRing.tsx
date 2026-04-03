interface ProgressRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({ score, size = 180, strokeWidth = 14, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const gradId = `glowup-grad-${size}`;

  const scoreLabel =
    label ||
    (score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 55 ? "Fair" : "Needs Care");

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full" style={{ filter: "drop-shadow(0 0 12px rgba(139,92,246,0.4))" }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="rgba(255,255,255,0.06)"
          fill="transparent"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke={`url(#${gradId})`}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-serif font-bold text-foreground tracking-tighter" style={{ fontSize: size * 0.26 }}>
          {score}
        </span>
        <span className="text-muted-foreground font-medium uppercase tracking-wider mt-0.5" style={{ fontSize: size * 0.07 }}>
          {scoreLabel}
        </span>
      </div>
    </div>
  );
}
