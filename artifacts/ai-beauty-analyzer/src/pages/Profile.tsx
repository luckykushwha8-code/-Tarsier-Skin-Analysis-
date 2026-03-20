import { MobileLayout } from "@/components/MobileLayout";
import { TarsierLogo } from "@/components/TarsierLogo";
import { useAuth } from "@/hooks/use-auth";
import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Zap } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  return (
    <MobileLayout>
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />

        <header className="mb-8">
          <h1 className="text-2xl font-serif font-bold gradient-text">Profile</h1>
        </header>

        {/* User Card */}
        <div className="bg-gradient-to-br from-violet-900/40 via-card to-blue-900/20 rounded-3xl border border-primary/20 p-5 mb-7 flex items-center gap-4 shadow-[0_4px_24px_rgba(139,92,246,0.15)]">
          <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_16px_rgba(139,92,246,0.3)] flex-shrink-0" style={{ width: 72, height: 72 }}>
            <img
              src={user?.avatar || `${import.meta.env.BASE_URL}images/avatar.png`}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=tarsier";
              }}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user?.name || "User"}</h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
              <Zap className="w-3 h-3" /> Free Plan
            </div>
          </div>
        </div>

        {/* Skin Profile */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-7">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-foreground">Skin Profile</h3>
            <button className="text-xs text-primary font-semibold hover:opacity-80">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Skin Type</p>
              <p className="font-semibold text-sm">{user?.skinType || "Combination"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Main Concern</p>
              <p className="font-semibold text-sm">Hydration</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <h3 className="font-serif font-bold text-base mb-4">Settings</h3>
        <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col mb-7">
          <Link href="/subscription">
            <div className="flex items-center justify-between p-4 border-b border-border hover:bg-primary/5 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-[0_4px_12px_rgba(139,92,246,0.4)]">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-sm gradient-text">Upgrade to Pro</span>
              </div>
              <ChevronRight className="w-4 h-4 text-primary" />
            </div>
          </Link>

          {[
            { icon: Bell, label: "Notifications", toggle: true },
            { icon: Shield, label: "Privacy & Data", toggle: false },
            { icon: Settings, label: "Preferences", toggle: false },
            { icon: HelpCircle, label: "Help & Support", toggle: false },
          ].map(({ icon: Icon, label, toggle }) => (
            <div
              key={label}
              onClick={() => toast({ title: label + " opened" })}
              className="flex items-center justify-between p-4 border-b last:border-b-0 border-border hover:bg-secondary/30 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-sm">{label}</span>
              </div>
              {toggle ? (
                <div className="w-10 h-6 bg-primary rounded-full relative shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Tarsier branding */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <TarsierLogo size={32} />
          <p className="text-xs text-muted-foreground">Tarsier v1.0 · AI Skin Analysis</p>
        </div>

        <button
          onClick={logout}
          className="w-full p-4 rounded-2xl text-danger font-semibold flex items-center justify-center gap-2 hover:bg-danger/10 transition-colors border border-transparent hover:border-danger/20"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </MobileLayout>
  );
}
