import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Home,
  ScanFace,
  Sparkles,
  TrendingUp,
  User,
  CreditCard,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/scan", icon: ScanFace, label: "Scan" },
  { href: "/products", icon: Sparkles, label: "Products" },
  { href: "/progress", icon: TrendingUp, label: "Progress" },
];

const bottomNavItems = [
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/subscription", icon: CreditCard, label: "Plan" },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-dark-bg">
      <main className="pb-20 pt-4 px-4">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-surface border-t border-dark-border">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive
                    ? "text-neon-purple"
                    : "text-gray-400 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    isActive && "drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]",
                  )}
                />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
