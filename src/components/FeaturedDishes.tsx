"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Flame } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { RESTAURANT_CONFIG } from "@/lib/config";

const featuredDishes = [
  {
    id: "dish-1",
    name: "Ember-Kissed Lamb Chops",
    description: "Herb-marinated lamb frenched chops, wood-fire seared, served with chimichurri and smoky potato gratin.",
    price: 1850,
    category: "Mains",
    tag: "Chef's Pick",
    imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: "dish-2",
    name: "Truffle Wild Mushroom Pizza",
    description: "Handcrafted sourdough base, wild mushroom medley, truffle oil, aged parmesan and fresh thyme.",
    price: 1290,
    category: "Mains",
    tag: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dish-3",
    name: "Butter Seared Seabass",
    description: "Pan-seared seabass with saffron velouté, fennel confit, cherry tomatoes and micro herbs.",
    price: 1650,
    category: "Mains",
    tag: "New",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
  },
];

const tagColors: Record<string, string> = {
  "Chef's Pick": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Bestseller: "bg-primary/20 text-primary border-primary/30",
  New: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function FeaturedDishes() {
  const { addItem } = useCartStore();

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1 rounded-full mb-4"
        >
          <Flame className="w-3.5 h-3.5" />
          Signature Creations
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold tracking-tight"
        >
          Featured Dishes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mt-3 max-w-md mx-auto"
        >
          Hand-picked by our head chef — the dishes that define us.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredDishes.map((dish, i) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={dish.imageUrl}
                alt={dish.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              {/* Tag */}
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagColors[dish.tag]}`}>
                {dish.tag}
              </span>
              {/* Category */}
              <span className="absolute top-3 right-3 text-xs text-muted-foreground bg-background/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {dish.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-lg leading-tight">{dish.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{dish.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-primary font-bold text-xl">
                  {RESTAURANT_CONFIG.currency}{dish.price.toLocaleString("en-IN")}
                </span>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() =>
                    addItem({
                      id: dish.id,
                      name: dish.name,
                      price: dish.price,
                      imageUrl: dish.imageUrl,
                    })
                  }
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
