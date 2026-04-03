import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skinType?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({ id: session.user.id, name: session.user.user_metadata?.name || "User", email: session.user.email || "" });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({ id: session.user.id, name: session.user.user_metadata?.name || "User", email: session.user.email || "" });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.session) setLocation("/home");
    } catch (err: any) {
      console.error("Login failed", err.message);
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
          data: { name }
        }
      });
      if (error) throw error;
      if (data.session) setLocation("/home");
    } catch (err: any) {
      console.error("Registration failed", err.message);
      throw err;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setLocation("/login");
  };

  return { user, isLoading, login, register, logout, isAuthenticated: !!user };
}
