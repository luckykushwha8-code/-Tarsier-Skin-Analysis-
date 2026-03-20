import { useState } from "react";
import { Link } from "wouter";
import { Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { MobileLayout } from "@/components/MobileLayout";
import { TarsierLogo } from "@/components/TarsierLogo";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
    } catch {
      toast({ title: "Sign in failed", description: "Check your credentials and try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="relative flex flex-col min-h-screen overflow-hidden">
        {/* Background girl image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=90"
            alt=""
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlay — top lighter, bottom full dark for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/95" />
          {/* Purple tint overlay */}
          <div className="absolute inset-0 bg-violet-950/40 mix-blend-multiply" />
        </div>

        {/* Neon ambient glows */}
        <div className="absolute top-10 right-0 w-40 h-40 rounded-full bg-violet-600/25 blur-[70px] z-0 pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-36 h-36 rounded-full bg-blue-600/20 blur-[70px] z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen px-7 py-10">
          {/* Logo + Brand */}
          <div className="flex flex-col items-center pt-10 pb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-full blur-2xl bg-violet-600/40 scale-125" />
              <TarsierLogo size={72} />
            </div>
            <h1 className="text-3xl font-serif font-bold gradient-text tracking-tight">Tarsier</h1>
            <p className="text-white/60 text-sm mt-1">your AI skin bestie ✨</p>
          </div>

          {/* Form card */}
          <div className="mt-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <h2 className="text-xl font-serif font-bold text-white mb-5">Welcome back</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email Address"
                icon={<Mail className="w-5 h-5" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                icon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-violet-300 hover:text-violet-200"
                  onClick={() => toast({ title: "Reset link sent", description: "Check your email inbox." })}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base mt-1 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-white/10" />
                <span className="flex-shrink-0 mx-4 text-white/40 text-xs">or</span>
                <div className="flex-grow border-t border-white/10" />
              </div>

              <button
                type="button"
                onClick={() => toast({ title: "Coming Soon", description: "Google sign-in is on the way." })}
                className="w-full py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white font-medium flex items-center justify-center gap-3 hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <p className="text-center text-white/50 text-sm mt-2">
                No account?{" "}
                <Link href="/register" className="text-violet-300 font-semibold hover:text-violet-200">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
