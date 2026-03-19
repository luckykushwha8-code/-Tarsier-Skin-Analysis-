import { useState } from "react";
import { Link } from "wouter";
import { Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MobileLayout } from "@/components/MobileLayout";
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
      toast({ title: "Validation Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      toast({ title: "Error", description: "Invalid credentials", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="flex flex-col min-h-screen p-8 bg-gradient-to-b from-secondary/40 to-background">
        <div className="flex flex-col items-center justify-center pt-12 pb-8">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6">
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your skin journey</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-4">
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
              className="text-sm font-medium text-primary hover:underline"
              onClick={() => toast({ title: "Forgot Password", description: "Reset link sent to your email." })}
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2" isLoading={isLoading}>
            Sign In
          </Button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">or</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => toast({ title: "Coming Soon", description: "Google sign-in is not yet available." })}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </MobileLayout>
  );
}
