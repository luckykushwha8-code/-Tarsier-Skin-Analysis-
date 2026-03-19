import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skinType?: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setUser(data.user);
      setLocation("/home");
    } catch {
      // Fallback: any credentials work (demo mode)
      const mockUser: User = { id: "usr_123", name: "Olivia Chen", email, skinType: "Combination" };
      localStorage.setItem("auth_token", "demo_token");
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setLocation("/home");
    }
  };

  const register = async (name: string, email: string, _password: string) => {
    try {
      const res = await fetch(`${BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: _password }),
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setUser(data.user);
      setLocation("/home");
    } catch {
      const mockUser: User = { id: "usr_" + Math.random().toString(36).substr(2, 9), name, email };
      localStorage.setItem("auth_token", "demo_token");
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setLocation("/home");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("onboarding_seen");
    setUser(null);
    setLocation("/login");
  };

  return { user, isLoading, login, register, logout, isAuthenticated: !!user };
}
