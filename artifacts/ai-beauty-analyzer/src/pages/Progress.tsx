import { motion } from "framer-motion";
import { TrendingUp, Calendar, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const progressData = [
  { date: "Jan", score: 65, hydration: 60, elasticity: 65 },
  { date: "Feb", score: 70, hydration: 68, elasticity: 70 },
  { date: "Mar", score: 75, hydration: 72, elasticity: 75 },
  { date: "Apr", score: 78, hydration: 75, elasticity: 80 },
  { date: "May", score: 82, hydration: 80, elasticity: 85 },
];

const achievements = [
  {
    id: 1,
    title: "First Scan",
    description: "Completed your first skin scan",
    icon: "📸",
    date: "Jan 15",
    unlocked: true,
  },
  {
    id: 2,
    title: "Consistency",
    description: "7-day streak",
    icon: "🔥",
    date: "Jan 22",
    unlocked: true,
  },
  {
    id: 3,
    title: "Improvement",
    description: "10-point score increase",
    icon: "📈",
    date: "Mar 1",
    unlocked: true,
  },
  {
    id: 4,
    title: "Pro User",
    description: "30-day streak",
    icon: "⭐",
    date: "Apr 15",
    unlocked: false,
  },
];

export default function Progress() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Progress</h1>
        <p className="text-gray-400">Track your skin improvement over time</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border text-center">
          <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">+17</p>
          <p className="text-gray-400 text-sm">Score Change</p>
        </div>
        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border text-center">
          <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-gray-400 text-sm">Total Scans</p>
        </div>
        <div className="p-4 rounded-2xl bg-dark-card border border-dark-border text-center">
          <Award className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">3</p>
          <p className="text-gray-400 text-sm">Achievements</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
        <h2 className="font-semibold mb-4">Skin Score Trend</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} domain={[50, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #363654",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#9333ea"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metrics Chart */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
        <h2 className="font-semibold mb-4">Hydration & Elasticity</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <XAxis dataKey="date" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} domain={[50, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #363654",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="hydration"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="elasticity"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm text-gray-400">Hydration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-sm text-gray-400">Elasticity</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="font-semibold mb-3">Achievements</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border flex items-center gap-4 ${
                achievement.unlocked
                  ? "bg-dark-card border-dark-border"
                  : "bg-dark-surface border-dark-border opacity-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-neon-purple/20 to-electric-blue/20"
                    : "bg-dark-border"
                }`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">
                  {achievement.description}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">{achievement.date}</p>
                {achievement.unlocked && (
                  <span className="text-emerald-400 text-xs">Unlocked</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
