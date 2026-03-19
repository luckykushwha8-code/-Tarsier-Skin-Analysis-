import React from "react";
import { Link, useLocation } from "wouter";
import { Home, ScanFace, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
}

export function MobileLayout({ children, showBottomNav = true, className }: MobileLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: ScanFace, label: "Scan", href: "/scan" },
    { icon: FileText, label: "Reports", href: "/report/latest" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="w-full max-w-[430px] bg-background min-h-[100dvh] shadow-2xl relative flex flex-col mx-auto overflow-hidden">
      <main className={cn("flex-1 overflow-y-auto app-scroll-container pb-24", className)}>
        {children}
      </main>

      {showBottomNav && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-border/50 px-6 pb-4 pt-3 flex justify-between items-center z-50 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Handle matching nested routes like /report/123
            const isActive = location === item.href || (item.href !== "/home" && location.startsWith(item.href.split('/')[1]));
            
            return (
              <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 group relative">
                <div className={cn(
                  "p-2 rounded-xl transition-all duration-300",
                  isActive ? "bg-secondary text-primary" : "text-muted-foreground group-hover:bg-muted"
                )}>
                  <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {isActive && (
                  <span className="absolute -bottom-3 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
