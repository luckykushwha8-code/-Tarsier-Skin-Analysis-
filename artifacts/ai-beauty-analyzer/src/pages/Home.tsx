import { Link, useLocation } from "wouter";
import { Bell, Camera, ListChecks, ShoppingBag, TrendingUp, ChevronRight } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { ProgressRing } from "@/components/ProgressRing";
import { useAuth } from "@/hooks/use-auth";
import { useScanHistory } from "@/hooks/use-skincare";
import { format } from "date-fns";

export function Home() {
  const { user } = useAuth();
  const { data: scans } = useScanHistory();
  const [, setLocation] = useLocation();
  
  const latestScore = scans?.[0]?.overallScore || 0;

  const quickActions = [
    { icon: Camera, label: "New Scan", href: "/scan", color: "bg-blue-100 text-blue-600" },
    { icon: ListChecks, label: "My Routine", href: "/routine", color: "bg-purple-100 text-purple-600" },
    { icon: ShoppingBag, label: "Products", href: "/products", color: "bg-pink-100 text-pink-600" },
    { icon: TrendingUp, label: "Progress", href: "/progress", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <MobileLayout>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <img src={`${import.meta.env.BASE_URL}images/avatar.png`} alt="Profile" className="w-full h-full object-cover" />
                )}
              </div>
            </Link>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Good Morning,</p>
              <h2 className="text-xl font-serif font-bold">{user?.name?.split(' ')[0] || 'Beautiful'} 👋</h2>
            </div>
          </div>
          <button className="w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-sm border border-border relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-accent rounded-full border border-white"></span>
          </button>
        </header>

        {/* Main Score Card */}
        <div className="bg-gradient-to-br from-secondary/80 to-secondary/30 rounded-[2rem] p-6 shadow-lg shadow-secondary/20 mb-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="w-full flex justify-between items-center mb-4 z-10">
            <h3 className="font-semibold text-primary">Your Skin Score</h3>
            <span className="text-xs font-medium px-3 py-1 bg-white/60 rounded-full text-primary">
              Today, 9:41 AM
            </span>
          </div>
          
          <div className="my-4 z-10">
            <ProgressRing score={latestScore} size={200} strokeWidth={16} />
          </div>
          
          <button 
            onClick={() => setLocation('/scan')}
            className="w-full mt-4 bg-primary text-white py-4 rounded-2xl font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors z-10"
          >
            <Camera className="w-5 h-5" />
            Take New Scan
          </button>
        </div>

        {/* Quick Actions */}
        <h3 className="text-lg font-bold mb-4 font-serif">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href} className="bg-card p-4 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-foreground">{action.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Recent Analysis */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold font-serif">Recent Analysis</h3>
          <Link href="/progress" className="text-sm text-primary font-medium flex items-center">
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="flex flex-col gap-3">
          {scans?.map((scan, i) => (
            <Link key={scan.id} href={`/report/${scan.id}`}>
              <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary font-bold">
                    {scan.overallScore}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Analysis #{scans.length - i}</h4>
                    <p className="text-sm text-muted-foreground">{format(new Date(scan.createdAt), 'MMM d, yyyy')}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
