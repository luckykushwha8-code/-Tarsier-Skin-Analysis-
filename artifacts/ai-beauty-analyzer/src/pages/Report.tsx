import { useParams } from "wouter";
import { motion } from "framer-motion";
import {
  Droplets,
  Activity,
  Scale,
  Sun,
  ChevronLeft,
  Share2,
  Heart,
} from "lucide-react";

const metrics = [
  {
    icon: Droplets,
    label: "Hydration",
    score: 80,
    status: "Good",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
  },
  {
    icon: Activity,
    label: "Elasticity",
    score: 85,
    status: "Excellent",
    color: "text-purple-400",
    bgColor: "bg-purple-400/20",
  },
  {
    icon: Scale,
    label: "Texture",
    score: 78,
    status: "Good",
    color: "text-pink-400",
    bgColor: "bg-pink-400/20",
  },
  {
    icon: Sun,
    label: "Sun Protection",
    score: 88,
    status: "Excellent",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/20",
  },
];

const recommendations = [
  "Continue using your current hydrating serum",
  "Apply sunscreen every 2 hours when outdoors",
  "Consider adding retinol to your evening routine",
  "Stay hydrated - aim for 8 glasses of water daily",
];

export default function Report() {
  const params = useParams<{ scanId: string }>();
  const overallScore = 82;
  const skinAge = 24;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-lg bg-dark-card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold">Skin Report</h1>
          <p className="text-gray-400 text-sm">Scan #{params.scanId}</p>
        </div>
        <button className="p-2 rounded-lg bg-dark-card">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 border border-dark-border p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1">Overall Score</p>
            <div className="flex items-end gap-2">
              <span className="font-display text-6xl font-bold text-gradient">
                {overallScore}
              </span>
              <span className="text-gray-400 mb-2">/ 100</span>
            </div>
            <p className="text-gray-400 mt-2">
              Your skin age:{" "}
              <span className="text-white font-semibold">{skinAge} years</span>
            </p>
          </div>

          {/* Circular Progress */}
          <div className="w-28 h-28">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-dark-border"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                stroke="url(#gradient2)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(overallScore / 100) * 301.6} 301.6`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#9333ea" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div>
        <h2 className="font-semibold mb-3">Detailed Analysis</h2>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-2xl bg-dark-card border border-dark-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <span className={`text-sm font-medium ${metric.color}`}>
                  {metric.status}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{metric.score}%</p>
              <p className="text-gray-400 text-sm">{metric.label}</p>

              {/* Progress bar */}
              <div className="mt-3 h-2 bg-dark-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className={`h-full rounded-full ${metric.bgColor.replace("/20", "")}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="font-semibold mb-3">Recommendations</h2>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-dark-card border border-dark-border flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-neon-purple text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-300">{rec}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full py-4 rounded-xl bg-dark-card border border-dark-border font-semibold flex items-center justify-center gap-2">
        <Heart className="w-5 h-5" />
        Save Report
      </button>
    </div>
  );
}
