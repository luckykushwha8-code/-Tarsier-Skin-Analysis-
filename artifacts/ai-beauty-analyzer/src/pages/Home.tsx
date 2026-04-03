import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Bell, Camera, ListChecks, ShoppingBag, TrendingUp, ChevronRight, Eye, X, CheckCheck, Zap, Droplets, Star, Flame, Lightbulb } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProgressRing } from "@/components/ProgressRing";
import { TarsierLogo } from "@/components/TarsierLogo";
import { useAuth } from "@/hooks/use-auth";
import { useScanHistory } from "@/hooks/use-skincare";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_NOTIFICATIONS = [
  { id: 1, icon: Zap, color: "text-violet-400 bg-violet-500/10 border-violet-500/20", title: "Scan Complete!", body: "Your latest skin analysis is ready. Overall score: 78/100.", time: "Just now", read: false },
  { id: 2, icon: Droplets, color: "text-blue-400 bg-blue-500/10 border-blue-500/20", title: "Hydration Reminder", body: "Don't forget your morning serum and SPF today ☀️", time: "2h ago", read: false },
  { id: 3, icon: Star, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", title: "New Product Match", body: "3 new AI-matched products added for your skin type.", time: "Yesterday", read: false },
  { id: 4, icon: Eye, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", title: "Weekly Progress", body: "Your skin score improved by +7 points this week 🎉", time: "2 days ago", read: true },
  { id: 5, icon: CheckCheck, color: "text-primary bg-primary/10 border-primary/20", title: "Routine Reminder", body: "Time for your night routine! Retinol + moisturizer.", time: "3 days ago", read: true },
];

export function Home() {
  const { user } = useAuth();
  const { data: scans } = useScanHistory();
  const [, setLocation] = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Determine Streak
    let currentStreak = parseInt(localStorage.getItem("tarsier_streak") || "0");
    const lastVisit = localStorage.getItem("tarsier_last_visit");
    const today = new Date().toDateString();
    
    if (lastVisit !== today) {
      if (lastVisit === new Date(Date.now() - 86400000).toDateString()) {
        currentStreak += 1;
      } else {
        currentStreak = currentStreak === 0 ? 1 : currentStreak; // default 1 if starting
      }
      localStorage.setItem("tarsier_streak", currentStreak.toString());
      localStorage.setItem("tarsier_last_visit", today);
    }
    setStreak(currentStreak);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const latestScore = scans?.[0]?.overallScore || 0;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const quickActions = [
    { icon: Camera, label: "New Scan", href: "/scan", gradient: "from-violet-600 to-purple-700", glow: "rgba(139,92,246,0.4)" },
    { icon: ListChecks, label: "My Routine", href: "/routine", gradient: "from-blue-600 to-blue-700", glow: "rgba(59,130,246,0.4)" },
    { icon: ShoppingBag, label: "Products", href: "/products", gradient: "from-indigo-600 to-violet-600", glow: "rgba(99,102,241,0.4)" },
    { icon: TrendingUp, label: "Progress", href: "/progress", gradient: "from-blue-500 to-cyan-600", glow: "rgba(6,182,212,0.4)" },
  ];

  return (
    <MobileLayout>
      <div className="p-6 relative">
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />
        <div className="absolute top-40 left-0 w-40 h-40 rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />

        {/* Header */}
        <header className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_12px_rgba(139,92,246,0.3)] cursor-pointer flex-shrink-0">
                <img
                  src={user?.avatar || `${import.meta.env.BASE_URL}images/avatar.png`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=tarsier";
                  }}
                />
              </div>
            </Link>
            <div>
              <p className="text-xs text-muted-foreground">Good to see you,</p>
              <h2 className="text-lg font-serif font-bold text-foreground">{user?.name?.split(" ")[0] || "Luminous"} 👋</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-10 px-3 bg-card rounded-full flex items-center justify-center border border-border gap-1.5 shadow-sm">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-sm font-bold">{streak}</span>
            </div>
            <button
              onClick={() => setShowNotifs(true)}
              className="w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border relative hover:border-primary/40 transition-colors shadow-sm"
            >
              <Bell className="w-5 h-5 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-background animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Daily Tip Banner */}
        <div className="mb-6 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-2xl p-4 flex gap-3 relative overflow-hidden group">
          <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Daily Tip</h4>
            <p className="text-sm text-foreground/90 font-medium leading-snug">
              Always apply serums to damp skin to lock in maximum hydration.
            </p>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-gradient-to-br from-violet-900/60 via-card to-blue-900/30 rounded-3xl p-6 border border-primary/20 shadow-[0_8px_40px_rgba(139,92,246,0.2)] mb-7 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          <div className="w-full flex justify-between items-center mb-4 z-10">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Skin Score</h3>
            </div>
            <span className="text-xs font-medium px-3 py-1 bg-white/5 border border-border rounded-full text-muted-foreground">
              Latest
            </span>
          </div>

          <div className="my-2 z-10">
            <ProgressRing score={latestScore} size={190} strokeWidth={14} />
          </div>

          <button
            onClick={() => setLocation("/scan")}
            className="btn-neon w-full mt-4 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 z-10"
          >
            <Camera className="w-5 h-5" />
            New Scan
          </button>
        </div>

        {/* Quick Actions */}
        <h3 className="text-base font-bold mb-4 text-foreground">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="bg-card p-4 rounded-2xl border border-border hover:border-primary/30 transition-all flex flex-col items-start gap-3 group"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center group-hover:shadow-lg transition-shadow`}
                  style={{ boxShadow: `0 4px 16px ${action.glow}` }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-sm text-foreground">{action.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Recent Scans */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-bold text-foreground">Recent Analysis</h3>
          <Link href="/progress" className="text-xs text-primary font-medium flex items-center gap-1">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {scans?.slice(0, 3).map((scan: any, i: number) => (
            <Link key={scan.id} href={`/report/${scan.id}`}>
              <div className="bg-card p-4 rounded-2xl border border-border hover:border-primary/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-900/60 to-blue-900/40 flex items-center justify-center font-bold text-primary text-sm border border-primary/20"
                    style={{ boxShadow: "0 0 16px rgba(139,92,246,0.2)" }}
                  >
                    {scan.overallScore}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Analysis #{(scans?.length || 0) - i}</h4>
                    <p className="text-xs text-muted-foreground">{format(new Date(scan.createdAt), "MMM d, yyyy")}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
          {(!scans || scans.length === 0) && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              <TarsierLogo size={48} />
              <p className="mt-3">No scans yet — take your first one above!</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Notification Panel ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {showNotifs && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifs(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl border-t border-border overflow-hidden"
              style={{ maxHeight: "80%" }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <h2 className="font-serif font-bold text-base">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary font-semibold flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                  <button onClick={() => setShowNotifs(false)} className="w-7 h-7 rounded-full bg-secondary/50 flex items-center justify-center">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 100px)" }}>
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Bell className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <motion.div
                          key={n.id}
                          layout
                          initial={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 60 }}
                          className={`flex items-start gap-3 px-5 py-4 transition-colors ${n.read ? "opacity-60" : "bg-primary/[0.02]"}`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${n.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-sm font-semibold text-foreground">{n.title}</p>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>
                            <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
                          </div>
                          <button
                            onClick={() => dismiss(n.id)}
                            className="w-6 h-6 rounded-full hover:bg-secondary/50 flex items-center justify-center flex-shrink-0 transition-colors"
                          >
                            <X className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                <div className="h-6" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
}

