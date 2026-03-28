import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginSchema } from "@workspace/api-zod";
import { cn } from "@/lib/utils";

const loginSchema = LoginSchema;

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Simulate login - in real app would call API
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark-bg px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue flex items-center justify-center glow-eyes">
            <span className="text-2xl">👁</span>
          </div>
          <span className="font-display text-2xl font-bold text-gradient">
            Tarsier
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-8">
          Sign in to continue your skin journey
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className={cn(
                "w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border focus:border-neon-purple focus:outline-none transition-colors",
                errors.email && "border-red-500",
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border focus:border-neon-purple focus:outline-none transition-colors pr-12",
                  errors.password && "border-red-500",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-electric-blue font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => setLocation("/register")}
            className="text-neon-purple hover:underline"
          >
            Sign up
          </button>
        </p>

        {/* Demo hint */}
        <div className="mt-8 p-4 rounded-xl bg-dark-card border border-dark-border">
          <p className="text-sm text-gray-400 text-center">
            Demo: Use any email/password to login
          </p>
        </div>
      </div>
    </div>
  );
}
