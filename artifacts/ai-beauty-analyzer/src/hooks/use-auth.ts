import { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Fallback user type if api.schemas is not available during dev
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skinType?: string;
}

// In a real app, this would use the generated useLogin from @workspace/api-client-react
// For this frontend artifact, we'll mock the auth state tightly to ensure UI works seamlessly
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
      } catch (e) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    
    // Mock successful login
    const mockUser: User = {
      id: "usr_123",
      name: "Olivia Chen",
      email: email,
      skinType: "Combination",
    };
    
    localStorage.setItem("auth_token", "mock_jwt_token_12345");
    localStorage.setItem("auth_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setLocation("/home");
  };

  const register = async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));
    
    const mockUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
    };
    
    localStorage.setItem("auth_token", "mock_jwt_token_12345");
    localStorage.setItem("auth_user", JSON.stringify(mockUser));
    setUser(mockUser);
    setLocation("/home");
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
    setLocation("/login");
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
