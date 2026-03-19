import { useState } from "react";
import { Link } from "wouter";
import { Mail, Lock, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
      toast({ title: "Validation Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    try {
      await register(name, email, password);
    } catch (err) {
      toast({ title: "Error", description: "Registration failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="flex flex-col min-h-screen p-8 bg-background">
        <Link href="/login" className="w-10 h-10 flex items-center justify-center bg-card rounded-full shadow-sm mb-6 border border-border">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Start your personalized skincare journey</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
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
          
          <Button type="submit" size="lg" className="w-full mt-6" isLoading={isLoading}>
            Create Account
          </Button>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </MobileLayout>
  );
}
