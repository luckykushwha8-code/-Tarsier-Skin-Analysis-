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
      <div className="flex flex-col min-h-screen px-8 py-10 bg-background relative overflow-hidden">
        <div className="absolute top-[-60px] left-[-40px] w-48 h-48 rounded-full bg-violet-600/20 blur-[70px] pointer-events-none" />
        <div className="absolute bottom-[-40px] right-[-40px] w-40 h-40 rounded-full bg-blue-600/20 blur-[70px] pointer-events-none" />

        <Link href="/login" className="w-10 h-10 flex items-center justify-center bg-card rounded-full border border-border mb-8 z-10">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </Link>

        <div className="mb-8 z-10">
          <h1 className="text-3xl font-serif font-bold gradient-text">Create Account</h1>
          <p className="text-muted-foreground mt-2 text-sm">Start your AI skin journey with Tarsier</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4 z-10">
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

          <button type="submit" disabled={isLoading} className="btn-neon w-full py-4 rounded-2xl text-white font-semibold text-base mt-4 disabled:opacity-50">
            {isLoading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-muted-foreground text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:opacity-80">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </MobileLayout>
  );
}
