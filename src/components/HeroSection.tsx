"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays, ShoppingBag, ChevronDown, Star } from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-sm px-4 py-1.5 rounded-full mb-6">
          <Star className="w-3.5 h-3.5 fill-primary" />
          Award-Winning Wood-Fired Cuisine
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Where Fire Meets
          <span className="block text-primary">Flavour</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
          Artisan wood-fired dishes crafted with seasonal produce. Dine-in, takeaway, or get it delivered hot to your door.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reserve"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full font-semibold text-base px-8 gap-2 shadow-lg shadow-primary/25")}>
            <CalendarDays className="w-5 h-5" />
            Reserve a Table
          </Link>
          <Link href="/menu"
            className="inline-flex items-center justify-center gap-2 text-base font-semibold px-8 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-foreground transition-colors">
            <ShoppingBag className="w-5 h-5" />
            Order Online
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-8 mt-14 flex-wrap">
          {[
            { value: "4.9★", label: "Google Rating" },
            { value: "500+", label: "Happy Regulars" },
            { value: "12+", label: "Years of Excellence" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity }} animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground">
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
