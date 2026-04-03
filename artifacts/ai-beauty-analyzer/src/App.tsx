import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { CartProvider } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";

// Pages
import { Onboarding } from "@/pages/Onboarding";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Home } from "@/pages/Home";
import { Scan } from "@/pages/Scan";
import { Report } from "@/pages/Report";
import { Routine } from "@/pages/Routine";
import { Products } from "@/pages/Products";
import { Progress } from "@/pages/Progress";
import { Subscription } from "@/pages/Subscription";
import { Profile } from "@/pages/Profile";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/login");
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return isAuthenticated ? <Component /> : null;
}

function Router() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (location === "/" && !isLoading) {
      if (isAuthenticated) {
        setLocation("/home");
      } else {
        const hasSeenOnboarding = localStorage.getItem("onboarding_seen");
        if (hasSeenOnboarding) setLocation("/login");
      }
    }
  }, [location, setLocation, isAuthenticated, isLoading]);

  return (
    <Switch>
      <Route path="/" component={Onboarding} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Protected Routes */}
      <Route path="/home" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/scan" component={() => <ProtectedRoute component={Scan} />} />
      <Route path="/report/:id" component={() => <ProtectedRoute component={Report} />} />
      <Route path="/routine" component={() => <ProtectedRoute component={Routine} />} />
      <Route path="/products" component={() => <ProtectedRoute component={Products} />} />
      <Route path="/progress" component={() => <ProtectedRoute component={Progress} />} />
      <Route path="/subscription" component={() => <ProtectedRoute component={Subscription} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
      <Route path="/cart" component={() => <ProtectedRoute component={Cart} />} />
      <Route path="/checkout" component={() => <ProtectedRoute component={Checkout} />} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
