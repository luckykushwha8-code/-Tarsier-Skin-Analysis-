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
    { icon: FileText, label: "Report", href: "/report/latest" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="w-full max-w-[430px] bg-background min-h-[100dvh] relative flex flex-col mx-auto overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.08)]">
      <main className={cn("flex-1 overflow-y-auto app-scroll-container pb-24", className)}>
        {children}
      </main>

      {showBottomNav && (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-card/90 backdrop-blur-xl border-t border-border/40 px-8 pb-4 pt-3 flex justify-between items-center z-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location === item.href ||
              (item.href !== "/home" && location.startsWith("/" + item.href.split("/")[1]));

            return (
              <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 group">
                <div
                  className={cn(
                    "p-2.5 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary/20 text-primary shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn("w-5 h-5 transition-all", isActive && "drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]")}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
