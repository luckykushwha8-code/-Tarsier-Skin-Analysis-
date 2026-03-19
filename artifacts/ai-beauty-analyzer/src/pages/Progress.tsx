import { MobileLayout } from "@/components/MobileLayout";
import { useProgress } from "@/hooks/use-skincare";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "wouter";

export function Progress() {
  const { data: progress, isLoading } = useProgress();

  if (isLoading || !progress) return <MobileLayout><div className="p-8">Loading...</div></MobileLayout>;

  return (
    <MobileLayout>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Your Journey</h1>
          <p className="text-muted-foreground mt-1">Track your skin's improvement</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl font-bold text-primary">{progress.totalScans}</span>
            <span className="text-xs text-muted-foreground font-medium mt-1">Total Scans</span>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl font-bold text-accent">{progress.streakDays}</span>
            <span className="text-xs text-muted-foreground font-medium mt-1">Day Streak</span>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm">
            <span className="text-2xl font-bold text-success">+14%</span>
            <span className="text-xs text-muted-foreground font-medium mt-1">Improvement</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm mb-8">
          <h3 className="font-serif font-bold text-lg mb-6">Overall Score Trend</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progress.scans} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric Improvements */}
        <h3 className="font-serif font-bold text-lg mb-4">Detailed Metrics</h3>
        <div className="flex flex-col gap-3">
          {progress.improvements.map((imp, i) => (
            <div key={i} className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
              <span className="font-medium">{imp.metric}</span>
              <div className={`flex items-center gap-2 font-bold ${
                imp.trend === 'improving' ? 'text-success' : 
                imp.trend === 'declining' ? 'text-danger' : 'text-warning'
              }`}>
                {imp.trend === 'improving' ? <TrendingUp className="w-4 h-4" /> : 
                 imp.trend === 'declining' ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                {imp.change > 0 ? '+' : ''}{imp.change}%
              </div>
            </div>
          ))}
        </div>

        <Link href="/scan">
          <Button className="w-full mt-8" size="lg">
            <Camera className="w-5 h-5 mr-2" /> Take New Scan
          </Button>
        </Link>
      </div>
    </MobileLayout>
  );
}
