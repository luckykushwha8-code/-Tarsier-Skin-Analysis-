import { MobileLayout } from "@/components/MobileLayout";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles, ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function Subscription() {
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({ title: "Coming Soon", description: "Payment integration is under development." });
  };

  return (
    <MobileLayout showBottomNav={false}>
      <div className="bg-background min-h-screen">
        <header className="p-6 flex items-center">
          <Link href="/profile" className="p-2 bg-card rounded-full shadow-sm border border-border mr-4">
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </Link>
          <h1 className="text-xl font-serif font-bold">Lumière Premium</h1>
        </header>

        <div className="px-6 pb-10">
          <div className="text-center mb-10 mt-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Unlock Your Best Skin</h2>
            <p className="text-muted-foreground px-4">Get clinical-grade analysis and personalized expert recommendations.</p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Free Plan */}
            <div className="bg-card rounded-3xl p-6 border-2 border-border opacity-70">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">Basic</h3>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                </div>
                <div className="text-xl font-bold">Free</div>
              </div>
              <ul className="space-y-3 mt-6">
                <li className="flex items-center gap-3 text-sm text-muted-foreground"><Check className="w-4 h-4 text-success" /> 2 Scans per month</li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground"><Check className="w-4 h-4 text-success" /> Basic skin scoring</li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground"><Check className="w-4 h-4 text-success" /> Standard product recs</li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-primary/30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="absolute top-0 right-6 bg-accent text-white text-xs font-bold px-3 py-1 rounded-b-lg">
                MOST POPULAR
              </div>

              <div className="flex justify-between items-end mb-6 z-10 relative">
                <div>
                  <h3 className="text-2xl font-bold font-serif">Premium</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">$9.99<span className="text-sm font-normal opacity-80">/mo</span></div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 z-10 relative">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-accent" /> Unlimited AI skin scans</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-accent" /> Dermatologist-level reports</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-accent" /> Ingredient safety analysis</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-accent" /> Routine progress tracking</li>
              </ul>

              <Button className="w-full bg-white text-primary hover:bg-white/90" size="lg" onClick={handleUpgrade}>
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
