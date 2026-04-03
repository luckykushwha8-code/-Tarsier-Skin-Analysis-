import { useState } from "react";
import { Link } from "wouter";
import { Mail, Lock, User, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { MobileLayout } from "@/components/MobileLayout";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
    } catch {
      toast({ title: "Registration failed", description: "Please try again.", variant: "destructive" });
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
            src="https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=90"
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/95" />
          <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply" />
        </div>

        {/* Neon glows */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-violet-600/25 blur-[70px] z-0 pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-36 h-36 rounded-full bg-blue-600/20 blur-[70px] z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen px-7 py-8">
          <Link href="/login" className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-6">
            <ChevronLeft className="w-5 h-5 text-white" />
          </Link>

          {/* Headline at top */}
          <div className="mb-4">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-1">GlowUp</p>
            <h1 className="text-3xl font-serif font-bold text-white">Glow up starts here ✨</h1>
            <p className="text-white/50 text-sm mt-1.5">Create your account & let AI do the work</p>
          </div>

          {/* Spacer to push form toward bottom */}
          <div className="flex-1" />

          {/* Form card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                icon={<User className="w-5 h-5" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <Input
                type="password"
                placeholder="Confirm Password"
                icon={<Lock className="w-5 h-5" />}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base mt-2 disabled:opacity-50"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>

              <p className="text-center text-white/50 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-violet-300 font-semibold hover:text-violet-200">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
