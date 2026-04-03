import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search, ShoppingBag, Star } from "lucide-react";
import { isSupabaseReady, supabase } from "../lib/supabase";

type ProductRow = {
  id: string;
  name: string;
  price: string | null;
  image_url: string | null;
  affiliate_link: string | null;
  product_url: string | null;
  category: string | null;
  skin_types: string[] | string | null;
  concerns: string[] | string | null;
};

type SkinProfile = {
  skin_type: string;
  concerns: string[];
};

const normalizeList = (value: string[] | string | null) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((item) => item.trim().toLowerCase()).filter(Boolean);
  }
  const raw = value.trim();
  const cleaned = raw.startsWith("{") && raw.endsWith("}")
    ? raw.slice(1, -1)
    : raw;
  return cleaned
    .split(",")
    .map((item) => item.replace(/\"/g, "").trim().toLowerCase())
    .filter(Boolean);
};

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkinType, setSelectedSkinType] = useState("all");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [hasScanProfile, setHasScanProfile] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [routineItems, setRoutineItems] = useState<string[]>([]);

  const favoritesKey = "favoriteProducts";
  const routineKey = "routineItems";

  useEffect(() => {
    let isActive = true;
    const loadProducts = async () => {
      if (!isSupabaseReady || !supabase) {
        setError("Supabase is not configured yet.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      const { data, error: queryError } = await supabase
        .from("products")
        .select(
          "id,name,price,image_url,affiliate_link,product_url,category,skin_types,concerns",
        )
        .order("name", { ascending: true });

      if (!isActive) return;
      if (queryError) {
        setError("Could not load products. Please try again.");
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setProducts(data ?? []);
      setIsLoading(false);
    };

    loadProducts();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem("skinProfile");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as SkinProfile;
      if (parsed?.skin_type) {
        setSelectedSkinType(parsed.skin_type.toLowerCase());
        setSelectedConcerns(
          (parsed.concerns ?? []).map((item) => item.toLowerCase()),
        );
        setHasScanProfile(true);
      }
    } catch {
      setHasScanProfile(false);
    }
  }, []);

  useEffect(() => {
    const rawFavorites = window.localStorage.getItem(favoritesKey);
    if (rawFavorites) {
      try {
        setFavorites(JSON.parse(rawFavorites));
      } catch {
        setFavorites([]);
      }
    }

    const rawRoutine = window.localStorage.getItem(routineKey);
    if (rawRoutine) {
      try {
        const parsed = JSON.parse(rawRoutine) as { name: string }[];
        setRoutineItems(parsed.map((item) => item.name));
      } catch {
        setRoutineItems([]);
      }
    }
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => {
      if (product.category) {
        set.add(product.category);
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const concernOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((product) => {
      normalizeList(product.concerns).forEach((concern) => set.add(concern));
    });
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (product.category ?? "").toLowerCase() ===
        selectedCategory.toLowerCase();
    const productSkinTypes = normalizeList(product.skin_types);
    const productConcerns = normalizeList(product.concerns);
    const matchesSkinType =
      selectedSkinType === "all" ||
      productSkinTypes.includes("all") ||
      productSkinTypes.includes(selectedSkinType);
    const matchesConcerns =
      selectedConcerns.length === 0 ||
      productConcerns.some((concern) => selectedConcerns.includes(concern));
    return matchesSearch && matchesCategory && matchesSkinType && matchesConcerns;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold">Products</h1>
        <p className="text-gray-400">Recommended for your skin type</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-card border border-dark-border focus:border-neon-purple focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-neon-purple text-white"
                : "bg-dark-card border border-dark-border text-gray-400 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Scan Filters */}
      <div className="rounded-2xl bg-dark-card border border-dark-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Match Your Scan</p>
            <p className="text-gray-400 text-sm">
              Filter products by your skin type and concerns
            </p>
          </div>
          {hasScanProfile && (
            <button
              className="text-sm text-neon-purple"
              onClick={() => {
                const raw = window.localStorage.getItem("skinProfile");
                if (!raw) return;
                try {
                  const parsed = JSON.parse(raw) as SkinProfile;
                  setSelectedSkinType(parsed.skin_type.toLowerCase());
                  setSelectedConcerns(
                    (parsed.concerns ?? []).map((item) => item.toLowerCase()),
                  );
                } catch {
                  setSelectedSkinType("all");
                  setSelectedConcerns([]);
                }
              }}
            >
              Apply Scan
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "oily", "dry", "combination", "sensitive"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedSkinType(type)}
              className={`px-3 py-1.5 rounded-full text-xs uppercase tracking-wide ${
                selectedSkinType === type
                  ? "bg-neon-purple text-white"
                  : "bg-dark-surface text-gray-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {concernOptions.map((concern) => {
            const isSelected = selectedConcerns.includes(concern);
            return (
              <button
                key={concern}
                onClick={() => {
                  setSelectedConcerns((prev) =>
                    isSelected
                      ? prev.filter((item) => item !== concern)
                      : [...prev, concern],
                  );
                }}
                className={`px-3 py-1.5 rounded-full text-xs ${
                  isSelected
                    ? "bg-electric-blue text-white"
                    : "bg-dark-surface text-gray-400"
                }`}
              >
                {concern.replace(/_/g, " ")}
              </button>
            );
          })}
        </div>

        {(selectedSkinType !== "all" || selectedConcerns.length > 0) && (
          <button
            className="text-sm text-gray-400"
            onClick={() => {
              setSelectedSkinType("all");
              setSelectedConcerns([]);
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {isLoading && (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl bg-dark-card border border-dark-border animate-pulse"
            >
              <div className="w-full h-32 rounded-xl bg-dark-surface mb-3" />
              <div className="h-4 bg-dark-surface rounded w-2/3 mb-2" />
              <div className="h-3 bg-dark-surface rounded w-1/2 mb-4" />
              <div className="h-8 bg-dark-surface rounded w-full" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id ?? `${product.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-2xl bg-dark-card border border-dark-border"
            >
              {/* Image */}
              <div className="w-full h-32 rounded-xl bg-dark-surface flex items-center justify-center text-5xl mb-3 overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-3xl text-gray-500">No Image</span>
                )}
              </div>

              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-2">
                {product.category ?? "Skincare"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">4.6</span>
                </div>
                <span className="font-semibold">{product.price ?? "-"}</span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="py-2 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center gap-2 text-sm hover:bg-neon-purple/20 transition-colors"
                  onClick={() => {
                    if (product.affiliate_link) {
                      window.open(product.affiliate_link, "_blank", "noopener");
                    }
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now
                </button>
                <button
                  className="py-2 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center gap-2 text-sm hover:bg-electric-blue/20 transition-colors"
                  onClick={() => {
                    const next = routineItems.includes(product.name)
                      ? routineItems
                      : [...routineItems, product.name];
                    setRoutineItems(next);
                    const stored = next.map((name) => ({
                      name,
                      time: "morning",
                    }));
                    window.localStorage.setItem(
                      routineKey,
                      JSON.stringify(stored),
                    );
                  }}
                >
                  {routineItems.includes(product.name) ? "Added" : "Add"}
                </button>
              </div>

              <button
                className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white"
                onClick={() => {
                  const next = favorites.includes(product.name)
                    ? favorites.filter((name) => name !== product.name)
                    : [...favorites, product.name];
                  setFavorites(next);
                  window.localStorage.setItem(favoritesKey, JSON.stringify(next));
                }}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(product.name)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
                {favorites.includes(product.name)
                  ? "Saved to favorites"
                  : "Save to favorites"}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-12">
          <p className="text-gray-400">{error}</p>
        </div>
      )}

      {!isLoading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No products found</p>
        </div>
      )}
    </div>
  );
}
