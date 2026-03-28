import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ScanFace,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Droplets,
  Activity,
  Scale,
} from "lucide-react";

const recentScans = [
  { id: 1, score: 82, date: "Today", skinAge: 24 },
  { id: 2, score: 78, date: "Yesterday", skinAge: 26 },
];

const quickActions = [
  {
    icon: ScanFace,
    label: "New Scan",
    href: "/scan",
    color: "from-neon-purple to-electric-blue",
  },
  {
    icon: Sparkles,
    label: "Products",
    href: "/products",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    label: "Progress",
    href: "/progress",
    color: "from-emerald-500 to-teal-500",
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const currentScore = 82;
  const skinAge = 24;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Hello, User</h1>
          <p className="text-gray-400">Here's your skin summary</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
      </div>

      {/* Skin Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 border border-dark-border p-6"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-gray-400 mb-2">Your Skin Score</p>
          <div className="flex items-end gap-4">
            <span className="font-display text-6xl font-bold text-gradient">
              {currentScore}
            </span>
            <span className="text-gray-400 mb-2">/ 100</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-400 text-sm flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +4 this week
            </span>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-dark-border"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(currentScore / 100) * 251.2} 251.2`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Skin Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: Droplets,
            label: "Hydration",
            value: "80%",
            color: "text-blue-400",
          },
          {
            icon: Activity,
            label: "Elasticity",
            value: "85%",
            color: "text-purple-400",
          },
          {
            icon: Scale,
            label: "Texture",
            value: "78%",
            color: "text-pink-400",
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-2xl bg-dark-card border border-dark-border"
          >
            <metric.icon className={`w-6 h-6 ${metric.color} mb-2`} />
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-gray-400 text-sm">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => setLocation(action.href)}
              className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} flex flex-col items-center gap-2`}
            >
              <action.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Scans */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Recent Scans</h2>
          <button className="text-neon-purple text-sm flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentScans.map((scan) => (
            <button
              key={scan.id}
              onClick={() => setLocation(`/report/${scan.id}`)}
              className="w-full p-4 rounded-2xl bg-dark-card border border-dark-border flex items-center justify-between hover:border-neon-purple/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 flex items-center justify-center">
                  <ScanFace className="w-6 h-6 text-neon-purple" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Scan #{scan.id}</p>
                  <p className="text-gray-400 text-sm">{scan.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gradient">{scan.score}</p>
                <p className="text-gray-400 text-sm">
                  Skin age: {scan.skinAge}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
