import React from "react";

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

  // Determine color based on score
  let colorClass = "text-danger";
  if (score >= 80) colorClass = "text-success";
  else if (score >= 60) colorClass = "text-warning";

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full drop-shadow-md">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="text-muted/50"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-5xl font-serif font-bold text-foreground tracking-tighter">
          {score}
        </span>
        {label && <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{label}</span>}
      </div>
    </div>
  );
}
