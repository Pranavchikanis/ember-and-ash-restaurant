"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Minus, ShoppingBag, Leaf, Flame } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { RESTAURANT_CONFIG } from "@/lib/config";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  dietaryTags: string;
}

const CATEGORIES = ["All", "Starters", "Mains", "Pizza & Flatbreads", "Seafood", "Desserts", "Beverages"];

const tagIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  Vegetarian: { icon: <Leaf className="w-3 h-3" />, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  Vegan: { icon: <Leaf className="w-3 h-3" />, color: "text-green-400 bg-green-400/10 border-green-400/30" },
  "Gluten-Free": { icon: <span className="text-[10px] font-bold">GF</span>, color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
  Spicy: { icon: <Flame className="w-3 h-3" />, color: "text-red-400 bg-red-400/10 border-red-400/30" },
};

function MenuCard({ item }: { item: MenuItem }) {
  const { addItem, items, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.id === item.id);
  const tags = item.dietaryTags ? item.dietaryTags.split(",").filter(Boolean) : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group bg-card rounded-2xl border overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 ${
        !item.isAvailable ? "opacity-50 pointer-events-none" : "border-border"
      }`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background/80 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-muted-foreground">
              Unavailable
            </span>
          </div>
        )}
      </div>
      {/* Body */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag) => {
            const t = tagIcons[tag];
            if (!t) return null;
            return (
              <span key={tag} className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${t.color}`}>
                {t.icon} {tag}
              </span>
            );
          })}
        </div>
        <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-bold">
            {RESTAURANT_CONFIG.currency}{item.price.toLocaleString("en-IN")}
          </span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold w-4 text-center">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() =>
                addItem({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl })
              }
              className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filtered = items.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const grouped = CATEGORIES.filter((c) => c !== "All").reduce<Record<string, MenuItem[]>>((acc, cat) => {
    const catItems = filtered.filter((i) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-b from-card/80 to-transparent border-b border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Our Menu</h1>
          <p className="text-muted-foreground">Crafted with passion, sourced with care.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-card border border-border text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-semibold px-4 py-2 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border h-72 animate-pulse" />
            ))}
          </div>
        ) : activeCategory === "All" ? (
          Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                {cat}
                <span className="text-sm font-normal text-muted-foreground">({catItems.length})</span>
              </h2>
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {catItems.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </AnimatePresence>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Filter className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No dishes match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
