import { useState } from "react";
import { Search, Heart, Plus, ShoppingBag } from "lucide-react";
import { MobileLayout } from "@/components/MobileLayout";
import { useProducts } from "@/hooks/use-skincare";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Cleanser", value: "Facial Cleansers" },
  { label: "Moisturiser", value: "Facial Moisturisers" },
  { label: "Serum", value: "Facial Serums" },
  { label: "Face", value: "Face" },
  { label: "Sun Care", value: "Sun Protection" },
  { label: "Eye Care", value: "Eye Skincare" },
  { label: "Toner", value: "Facial Toners" },
  { label: "Masks", value: "Facial Masks" },
];

export function Products() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const { data: products, isLoading } = useProducts({
    category: activeCat === "All" ? undefined : activeCat,
    search: search.length > 1 ? search : undefined,
    limit: 40,
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = (name: string) => {
    toast({ title: "Added to Routine", description: `${name} has been added to your routine.` });
  };

  return (
    <MobileLayout>
      <div className="p-5">
        <header className="mb-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Products</h1>
              <p className="text-muted-foreground text-xs">
                {products ? `${products.length} products found` : "Loading..."}
              </p>
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-5 -mx-5 px-5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCat(cat.value)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold transition-all ${
                activeCat === cat.value
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-muted/50 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products?.map((product: any) => (
              <div key={product.id} className="bg-card rounded-2xl p-3 border border-border shadow-sm flex flex-col relative group">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm"
                >
                  <Heart className={`w-4 h-4 transition-colors ${
                    favorites.has(product.id) ? "fill-red-400 text-red-400" : "text-muted-foreground"
                  }`} />
                </button>

                {/* Product image */}
                <div className="w-full aspect-square rounded-xl bg-muted/30 mb-3 overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5 truncate">{product.brand}</span>
                  <h4 className="font-semibold text-foreground text-xs leading-tight mb-1 line-clamp-2">{product.name}</h4>
                  {product.size && (
                    <span className="text-[10px] text-muted-foreground mb-1">{product.size}</span>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-bold text-foreground text-sm">
                      {product.price ? `$${parseFloat(product.price).toFixed(2)}` : "—"}
                    </span>
                    <button
                      onClick={() => handleAdd(product.name)}
                      className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="h-6" />
      </div>
    </MobileLayout>
  );
}
