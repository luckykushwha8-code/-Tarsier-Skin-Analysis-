import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Heart, Star, ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Gentle Cleanser",
    brand: "CeraVe",
    category: "cleanser",
    price: 1500,
    rating: 4.5,
    image: "🧴",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Hydrating Serum",
    brand: "The Ordinary",
    category: "serum",
    price: 1200,
    rating: 4.8,
    image: "💧",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Daily Moisturizer",
    brand: "Neutrogena",
    category: "moisturizer",
    price: 1800,
    rating: 4.2,
    image: "🧴",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Sunscreen SPF 50",
    brand: "La Roche-Posay",
    category: "sunscreen",
    price: 2500,
    rating: 4.9,
    image: "☀️",
    isFavorite: false,
  },
  {
    id: 5,
    name: "Vitamin C Serum",
    brand: "Skinceuticals",
    category: "serum",
    price: 4500,
    rating: 4.7,
    image: "✨",
    isFavorite: true,
  },
  {
    id: 6,
    name: "Night Cream",
    brand: "CeraVe",
    category: "moisturizer",
    price: 2200,
    rating: 4.3,
    image: "🌙",
    isFavorite: false,
  },
];

const categories = ["All", "Cleanser", "Serum", "Moisturizer", "Sunscreen"];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
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

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-2xl bg-dark-card border border-dark-border"
          >
            {/* Image placeholder */}
            <div className="w-full h-32 rounded-xl bg-dark-surface flex items-center justify-center text-5xl mb-3">
              {product.image}
            </div>

            {/* Favorite button */}
            <button className="absolute top-2 right-2 p-2 rounded-full bg-dark-bg/50">
              <Heart
                className={`w-4 h-4 ${product.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>

            <h3 className="font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{product.brand}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{product.rating}</span>
              </div>
              <span className="font-semibold">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>

            <button className="w-full mt-3 py-2 rounded-lg bg-dark-surface border border-dark-border flex items-center justify-center gap-2 text-sm hover:bg-neon-purple/20 transition-colors">
              <ShoppingBag className="w-4 h-4" />
              Add to Routine
            </button>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No products found</p>
        </div>
      )}
    </div>
  );
}
