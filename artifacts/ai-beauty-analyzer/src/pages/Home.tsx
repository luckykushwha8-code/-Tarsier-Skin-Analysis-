import { Link, useLocation } from "wouter";
import { Bell, Camera, ListChecks, ShoppingBag, TrendingUp, ChevronRight, Eye } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProgressRing } from "@/components/ProgressRing";
import { TarsierLogo } from "@/components/TarsierLogo";
import { useAuth } from "@/hooks/use-auth";
import { useScanHistory } from "@/hooks/use-skincare";
import { format } from "date-fns";

export function Home() {
  const { user } = useAuth();
  const { data: scans } = useScanHistory();
  const [, setLocation] = useLocation();

  const latestScore = scans?.[0]?.overallScore || 0;

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
        <header className="flex justify-between items-center mb-8 relative z-10">
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
          <button className="w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border relative hover:border-primary/40 transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border border-background animate-pulse" />
          </button>
        </header>

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
    </MobileLayout>
  );
}
