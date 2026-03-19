import { useState } from "react";
import { Search, Heart, Plus } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { Input } from "@/components/ui/Input";
import { useProducts } from "@/hooks/use-skincare";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Cleanser", "Toner", "Serum", "Moisturizer", "SPF"];

export function Products() {
  const { data: products, isLoading } = useProducts();
  const [activeCat, setActiveCat] = useState("All");
  const { toast } = useToast();

  const filteredProducts = products?.filter(p => activeCat === "All" || p.category === activeCat);

  const handleAdd = (name: string) => {
    toast({ title: "Added to Routine", description: `${name} has been added.` });
  };

  return (
    <MobileLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-foreground">Discover</h1>
          <p className="text-muted-foreground mt-1">Recommended for your skin profile</p>
        </header>

        <div className="mb-6">
          <Input 
            placeholder="Search products..." 
            icon={<Search className="w-5 h-5" />}
            className="bg-muted/50 border-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 -mx-6 px-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeCat === cat 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts?.map(product => (
              <div key={product.id} className="bg-card rounded-2xl p-4 border border-border shadow-sm flex flex-col relative group">
                <button className="absolute top-3 right-3 z-10">
                  <Heart className={`w-5 h-5 ${product.isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground hover:text-accent'}`} />
                </button>
                
                <div className="w-full aspect-square rounded-xl bg-muted/30 mb-4 overflow-hidden mix-blend-multiply">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{product.brand}</span>
                  <h4 className="font-bold text-foreground text-sm leading-tight mt-1 mb-2 line-clamp-2">{product.name}</h4>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-primary">${product.price}</span>
                    <button 
                      onClick={() => handleAdd(product.name)}
                      className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
