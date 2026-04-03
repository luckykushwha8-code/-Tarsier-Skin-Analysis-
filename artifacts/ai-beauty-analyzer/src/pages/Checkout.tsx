import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, CheckCircle2, ShieldCheck, CreditCard, Apple, Lock } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"form" | "processing" | "success">("form");

  // Prevent accessing checkout if cart is empty
  useEffect(() => {
    if (items.length === 0 && step === "form") {
      setLocation("/cart");
    }
  }, [items, setLocation, step]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      clearCart();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#3b82f6', '#ec4899', '#14b8a6']
      });
    }, 2000);
  };

  if (step === "success") {
    return (
      <MobileLayout showBottomNav={false}>
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-green-500/50"
          >
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </motion.div>
          
          <h1 className="text-3xl font-serif font-bold mb-3">Order Confirmed!</h1>
          <p className="text-muted-foreground text-sm max-w-[250px] mb-8">
            Your personalised skincare routine is being prepared and will ship soon.
          </p>

          <div className="bg-card w-full rounded-2xl border border-border p-5 text-left mb-8 shadow-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Order Details</p>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">Order Number</span>
              <span className="text-sm font-bold opacity-80">#TS-{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm font-medium">Total Paid</span>
              <span className="text-sm font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Est. Delivery</span>
              <span className="text-sm font-bold">2-4 Business Days</span>
            </div>
          </div>

          <button 
            onClick={() => setLocation("/home")}
            className="btn-neon w-full py-3.5 rounded-2xl text-white font-bold"
          >
            Back to Home
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout showBottomNav={false}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-center relative">
        <button onClick={() => window.history.back()} className="absolute left-4 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary/50">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-green-500" /> Secure Checkout
        </h1>
      </header>

      <div className="p-5 pb-32">
        <form onSubmit={handlePayment} className="space-y-6">
          
          {/* Shipping Address */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Shipping Information</h2>
            <div className="space-y-3">
              <input required type="text" placeholder="Full Name" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
              <input required type="email" placeholder="Email Address" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
              <input required type="text" placeholder="Street Address" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="text" placeholder="City" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
                <input required type="text" placeholder="Zip Code" className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 mt-8">Payment Method</h2>
            
            <div className="flex gap-3 mb-4">
              <label className="flex-1 border-2 border-primary bg-primary/5 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                <CreditCard className="w-6 h-6 text-primary" />
                <span className="text-xs font-bold">Card</span>
              </label>
              <label className="flex-1 border border-border bg-card rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-all">
                <Apple className="w-6 h-6" />
                <span className="text-xs font-bold">Apple Pay</span>
              </label>
            </div>

            <div className="space-y-3 relative overflow-hidden rounded-xl bg-card border border-border p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold capitalize">Credit details</span>
                <div className="flex gap-1">
                  <div className="w-6 h-4 bg-blue-600 rounded flex items-center justify-center text-[6px] font-bold text-white italic">VISA</div>
                  <div className="w-6 h-4 bg-orange-500 rounded flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full mix-blend-multiply flex-shrink-0 relative -right-1" />
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mix-blend-multiply flex-shrink-0" />
                  </div>
                </div>
              </div>
              <input required type="text" placeholder="Card Number" pattern="[\d\s]+" maxLength={19} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary font-mono tracking-widest placeholder:tracking-normal transition-colors" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary font-mono transition-colors" />
                <input required type="text" placeholder="CVC" maxLength={4} className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary font-mono transition-colors" />
              </div>
            </div>
          </section>

          {/* Checkout Action */}
           <div className="fixed bottom-0 left-0 right-0 p-5 bg-background border-t border-border/60 z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Subtotal</span>
              <span className="font-semibold text-sm">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-4">
              <span className="text-muted-foreground text-sm">Express Shipping</span>
              <span className="font-semibold text-sm text-green-500">Free</span>
            </div>
            <div className="flex items-center justify-between mb-5">
              <span className="font-bold">Total</span>
              <span className="font-serif font-bold text-2xl text-primary">${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              type="submit"
              disabled={step === "processing"}
              className="btn-neon w-full py-4 rounded-2xl text-white font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:filter-none"
            >
              {step === "processing" ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : (
                <><Lock className="w-4 h-4" /> Pay ${totalPrice.toFixed(2)}</>
              )}
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-muted-foreground text-xs">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL encrypted
            </div>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
}
