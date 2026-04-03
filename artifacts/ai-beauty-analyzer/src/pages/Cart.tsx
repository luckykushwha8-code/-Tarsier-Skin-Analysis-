import { Link, useLocation } from "wouter";
import { ChevronLeft, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    setLocation("/checkout");
  };

  return (
    <MobileLayout showBottomNav={false}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary/50">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-serif font-bold text-foreground">Your Cart</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative">
          <ShoppingBag className="w-5 h-5 text-primary" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </header>

      <div className="p-5 pb-32">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <div className="w-24 h-24 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-bold mb-2">Cart is empty</h2>
            <p className="text-muted-foreground text-sm mb-8 px-8">Looks like you haven't added any skincare products yet.</p>
            <button onClick={() => setLocation("/products")} className="btn-neon px-8 py-3.5 rounded-full text-white font-semibold">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-card border border-border rounded-2xl p-4 flex gap-4 relative overflow-hidden"
                >
                  <div className="w-20 h-20 bg-secondary/30 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    ) : (
                      <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="text-xs text-primary font-semibold truncate mb-1">{item.brand}</p>
                    <h3 className="text-sm font-bold text-foreground leading-snug mb-2 truncate">{item.name}</h3>
                    
                    <div className="flex items-end justify-between mt-auto">
                      <p className="font-serif font-bold text-base">${item.price.toFixed(2)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-secondary/40 rounded-full px-1 border border-border">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-background/80"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-semibold w-3 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-background border border-border text-foreground hover:bg-secondary/80 shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Item */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-7 h-7 bg-red-500/10 hover:bg-red-500/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Promo Code Mock */}
            <div className="mt-8 flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button className="bg-secondary/80 hover:bg-secondary text-foreground font-semibold px-5 rounded-xl border border-border text-sm transition-colors">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Checkout Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-background border-t border-border/60 z-40 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-muted-foreground font-medium text-sm">Total ({totalItems} items)</span>
            <span className="font-serif font-bold text-xl">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="btn-neon w-full py-4 rounded-2xl text-white font-bold text-[15px] flex items-center justify-center gap-2"
          >
            Checkout Securely <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      )}
    </MobileLayout>
  );
}
