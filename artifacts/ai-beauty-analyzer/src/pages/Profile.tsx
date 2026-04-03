import { useState } from "react";
import { MobileLayout } from "@/components/MobileLayout";
import { GlowUpLogo } from "@/components/GlowUpLogo";
import { useAuth } from "@/hooks/use-auth";
import {
  Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight,
  Zap, X, Moon, BarChart2, BookOpen, Mail, MessageCircle, ExternalLink,
  Check, Camera,
} from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

type Panel = "notifications" | "privacy" | "preferences" | "help" | "edit" | null;

const SKIN_TYPES = ["Normal", "Oily", "Dry", "Combination", "Sensitive"];
const CONCERNS = ["Acne", "Hydration", "Pigmentation", "Oiliness", "Wrinkles", "Sensitivity", "Dark Spots", "Dark Circles"];

// ── Shared BottomSheet ─────────────────────────────────────────────────────
function BottomSheet({
  open, onClose, title, children,
}: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            key="sheet"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl border-t border-border"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h2 className="font-serif font-bold text-base">{title}</h2>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-secondary/50 flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="px-5 py-5 overflow-y-auto" style={{ maxHeight: "65vh" }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Toggle component ───────────────────────────────────────────────────────
function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 ${on ? "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-secondary/60"}`}
    >
      <motion.div
        animate={{ x: on ? 22 : 2 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export function Profile() {
  const { user, logout } = useAuth();
  const [panel, setPanel] = useState<Panel>(null);

  // ── Edit profile state ──
  const [editName, setEditName] = useState(user?.name || "Luminous User");
  const [editEmail, setEditEmail] = useState(user?.email || "demo@glowup.ai");
  const [editSkinType, setEditSkinType] = useState(user?.skinType || "Combination");
  const [editConcern, setEditConcern] = useState("Hydration");
  const [editAge, setEditAge] = useState("25");
  const [saving, setSaving] = useState(false);

  const saveProfile = () => {
    setSaving(true);
    const updated = {
      id: (user as any)?.id || "usr_demo",
      name: editName.trim() || "Luminous User",
      email: editEmail.trim() || "demo@glowup.ai",
      skinType: editSkinType,
    };
    localStorage.setItem("auth_user", JSON.stringify(updated));
    if (!localStorage.getItem("auth_token")) localStorage.setItem("auth_token", "demo-token");
    setTimeout(() => {
      setSaving(false);
      setPanel(null);
      window.location.reload();
    }, 700);
  };

  // ── Notification prefs ──
  const [notifPrefs, setNotifPrefs] = useState({
    scanComplete: true,
    routineReminders: true,
    productMatches: false,
    weeklyProgress: true,
  });

  // ── App preferences ──
  const [prefs, setPrefs] = useState({
    darkMode: true,
    analytics: true,
    weeklyTips: true,
    advancedMetrics: false,
  });

  const togglePref = (obj: any, setObj: any, key: string) =>
    setObj((prev: any) => ({ ...prev, [key]: !prev[key] }));

  const settingsItems = [
    { icon: Bell, label: "Notifications", panel: "notifications" as Panel },
    { icon: Shield, label: "Privacy & Data", panel: "privacy" as Panel },
    { icon: Settings, label: "Preferences", panel: "preferences" as Panel },
    { icon: HelpCircle, label: "Help & Support", panel: "help" as Panel },
  ];

  return (
    <MobileLayout>
      <div className="p-6 relative">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />

        <header className="mb-8">
          <h1 className="text-2xl font-serif font-bold gradient-text">Profile</h1>
        </header>

        {/* User Card */}
        <div className="bg-gradient-to-br from-violet-900/40 via-card to-blue-900/20 rounded-3xl border border-primary/20 p-5 mb-7 flex items-center gap-4 shadow-[0_4px_24px_rgba(139,92,246,0.15)]">
          <div
            className="relative flex-shrink-0 cursor-pointer"
            onClick={() => setPanel("edit")}
          >
            <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_16px_rgba(139,92,246,0.3)]">
              <img
                src={`${import.meta.env.BASE_URL}images/avatar.png`}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=glowup"; }}
              />
            </div>
            {/* Camera overlay */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background shadow-sm">
              <Camera className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-foreground truncate">{editName}</h2>
            <p className="text-muted-foreground text-sm truncate">{editEmail}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
              <Zap className="w-3 h-3" /> Free Plan
            </div>
          </div>
          <button
            onClick={() => setPanel("edit")}
            className="flex-shrink-0 text-xs text-primary font-semibold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            Edit
          </button>
        </div>

        {/* Skin Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-7">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-foreground">Skin Profile</h3>
            <button
              onClick={() => setPanel("edit")}
              className="text-xs text-primary font-semibold hover:opacity-80 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Skin Type</p>
              <p className="font-semibold text-sm">{editSkinType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Main Concern</p>
              <p className="font-semibold text-sm">{editConcern}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Age</p>
              <p className="font-semibold text-sm">{editAge} yrs</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Name</p>
              <p className="font-semibold text-sm truncate">{editName}</p>
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

          {settingsItems.map(({ icon: Icon, label, panel: p }) => (
            <button
              key={label}
              onClick={() => setPanel(p)}
              className="flex items-center justify-between p-4 border-b last:border-b-0 border-border hover:bg-secondary/30 cursor-pointer transition-colors w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-sm">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Branding */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <GlowUpLogo size={32} />
          <p className="text-xs text-muted-foreground">GlowUp v1.0 · AI Skin Analysis</p>
        </div>

        <button
          onClick={logout}
          className="w-full p-4 rounded-2xl text-red-400 font-semibold flex items-center justify-center gap-2 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
           EDIT PROFILE SHEET
      ══════════════════════════════════════════════════════════ */}
      <BottomSheet open={panel === "edit"} onClose={() => setPanel(null)} title="Edit Profile">
        <div className="space-y-5">
          {/* Avatar hint */}
          <div className="flex items-center gap-4 p-3 bg-secondary/20 rounded-2xl border border-border">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=glowup"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Profile Photo</p>
              <p className="text-xs text-muted-foreground">Tap to change (coming soon)</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-secondary/20 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)] transition-all"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Email</label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full bg-secondary/20 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)] transition-all"
              placeholder="your@email.com"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Age</label>
            <input
              type="number"
              min="12"
              max="90"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
              className="w-full bg-secondary/20 border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(139,92,246,0.2)] transition-all"
              placeholder="e.g. 25"
            />
          </div>

          {/* Skin Type */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Skin Type</label>
            <div className="flex flex-wrap gap-2">
              {SKIN_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setEditSkinType(t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    editSkinType === t
                      ? "bg-primary/20 border-primary text-primary shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Main Concern */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Main Concern</label>
            <div className="flex flex-wrap gap-2">
              {CONCERNS.map((c) => (
                <button
                  key={c}
                  onClick={() => setEditConcern(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    editConcern === c
                      ? "bg-accent/20 border-accent text-accent shadow-[0_0_12px_rgba(96,165,250,0.3)]"
                      : "bg-card border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving...</>
            ) : (
              <><Check className="w-5 h-5" /> Save Profile</>
            )}
          </button>
        </div>
      </BottomSheet>

      {/* ══ NOTIFICATIONS ══════════════════════════════════════════════════ */}
      <BottomSheet open={panel === "notifications"} onClose={() => setPanel(null)} title="Notifications">
        <p className="text-xs text-muted-foreground mb-5">Choose which notifications you want to receive from GlowUp.</p>
        <div className="space-y-4">
          {[
            { key: "scanComplete", label: "Scan Complete", desc: "When your AI analysis is ready" },
            { key: "routineReminders", label: "Routine Reminders", desc: "Morning & night skincare alerts" },
            { key: "productMatches", label: "Product Matches", desc: "New products matched to your skin" },
            { key: "weeklyProgress", label: "Weekly Progress", desc: "Your weekly skin score digest" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <Toggle
                on={notifPrefs[key as keyof typeof notifPrefs]}
                onToggle={() => togglePref(notifPrefs, setNotifPrefs, key)}
              />
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* ══ PRIVACY ════════════════════════════════════════════════════════ */}
      <BottomSheet open={panel === "privacy"} onClose={() => setPanel(null)} title="Privacy & Data">
        <div className="space-y-4">
          {[
            { title: "Data We Collect", body: "GlowUp collects your skin scan images and analysis results locally on your device. No images are stored on our servers without your explicit consent." },
            { title: "How We Use It", body: "Your data is used exclusively to power your personalised skin reports and routine recommendations. It is never sold to third parties." },
            { title: "Your Rights", body: "You can delete all your data at any time by signing out and clearing app data. All stored information is removed permanently." },
          ].map(({ title, body }) => (
            <div key={title} className="bg-secondary/20 rounded-2xl p-4 border border-border">
              <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
          <button className="w-full py-3 rounded-2xl border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-colors">
            Delete All My Data
          </button>
        </div>
      </BottomSheet>

      {/* ══ PREFERENCES ════════════════════════════════════════════════════ */}
      <BottomSheet open={panel === "preferences"} onClose={() => setPanel(null)} title="Preferences">
        <div className="space-y-5">
          {[
            { key: "darkMode", icon: Moon, label: "Dark Mode", desc: "Use dark theme (recommended)" },
            { key: "analytics", icon: BarChart2, label: "Usage Analytics", desc: "Help improve GlowUp with anonymous usage data" },
            { key: "weeklyTips", icon: BookOpen, label: "Weekly Skincare Tips", desc: "Receive curated tip emails every Monday" },
            { key: "advancedMetrics", icon: Zap, label: "Advanced Metrics", desc: "Show detailed breakdowns in scan reports" },
          ].map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
              <Toggle
                on={prefs[key as keyof typeof prefs]}
                onToggle={() => togglePref(prefs, setPrefs, key)}
              />
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* ══ HELP ═══════════════════════════════════════════════════════════ */}
      <BottomSheet open={panel === "help"} onClose={() => setPanel(null)} title="Help & Support">
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email Support", sub: "support@glowup.ai", href: "mailto:support@glowup.ai" },
            { icon: MessageCircle, label: "Live Chat", sub: "Typically replies in < 1 hour", href: "#" },
            { icon: BookOpen, label: "Knowledge Base", sub: "Guides, tips, and FAQs", href: "https://glowup.ai/help" },
            { icon: ExternalLink, label: "Terms of Service", sub: "glowup.ai/terms", href: "https://glowup.ai/terms" },
          ].map(({ icon: Icon, label, sub, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-secondary/20 rounded-2xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">GlowUp v1.0.0 · Built with ❤️ for your skin</p>
      </BottomSheet>
    </MobileLayout>
  );
}
