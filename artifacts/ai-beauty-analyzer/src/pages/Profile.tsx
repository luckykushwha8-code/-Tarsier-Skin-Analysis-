import { MobileLayout } from "@/components/MobileLayout";
import { useAuth } from "@/hooks/use-auth";
import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Crown } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleGeneralClick = (title: string) => {
    toast({ title });
  };

  return (
    <MobileLayout>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Profile</h1>
        </header>

        {/* User Card */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img src={`${import.meta.env.BASE_URL}images/avatar.png`} alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif">{user?.name || 'User'}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-xs font-bold text-primary">
              <Crown className="w-3 h-3" /> Free Member
            </div>
          </div>
        </div>

        {/* Skin Profile */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">Skin Profile</h3>
            <button className="text-sm text-primary font-medium">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Skin Type</p>
              <p className="font-medium">{user?.skinType || 'Combination'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Main Concern</p>
              <p className="font-medium">Hydration</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <h3 className="font-serif font-bold text-lg mb-4">Settings</h3>
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col mb-8">
          
          <Link href="/subscription">
            <div className="flex items-center justify-between p-4 border-b border-border bg-accent/5 hover:bg-accent/10 cursor-pointer transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                  <Crown className="w-4 h-4" />
                </div>
                <span className="font-medium text-accent">Upgrade to Premium</span>
              </div>
              <ChevronRight className="w-5 h-5 text-accent" />
            </div>
          </Link>

          <div className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-medium">Notifications</span>
            </div>
            <div className="w-11 h-6 bg-primary rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div 
            onClick={() => handleGeneralClick("Privacy settings opened")}
            className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-medium">Privacy & Data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div 
            onClick={() => handleGeneralClick("Help & Support opened")}
            className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="font-medium">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full p-4 rounded-2xl text-danger font-medium flex items-center justify-center gap-2 hover:bg-danger/10 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </div>
    </MobileLayout>
  );
}
