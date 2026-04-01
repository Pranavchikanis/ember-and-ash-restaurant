"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays, ShoppingBag, Clock, MapPin } from "lucide-react";
import { RESTAURANT_CONFIG } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LocationSection() {
  const mapsQuery = encodeURIComponent(RESTAURANT_CONFIG.address);
  const mapsEmbed = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU2Dcg&q=${mapsQuery}`;

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs px-3 py-1 rounded-full mb-4">
              <MapPin className="w-3.5 h-3.5" />
              Find Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Visit Us in<br />
              <span className="text-primary">Bandra West</span>
            </h2>
            <p className="text-muted-foreground">{RESTAURANT_CONFIG.address}</p>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
              <Clock className="w-4 h-4" /> Opening Hours
            </h3>
            {RESTAURANT_CONFIG.openingHours.map((h) => (
              <div key={h.day} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <span className="text-sm font-medium">{h.day}</span>
                <span className="text-sm text-primary font-semibold">{h.time}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <motion.a
              whileTap={{ scale: 0.97 }}
              href={`https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </motion.a>
            <Link
              href="/reserve"
              className="flex items-center gap-2 border border-primary text-primary text-sm font-semibold px-6 py-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="flex items-center gap-2 border border-border text-muted-foreground text-sm font-semibold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Online
            </Link>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border h-[420px] shadow-2xl"
        >
          {/* Fallback styled placeholder since Maps Embed API key is needed */}
          <div className="w-full h-full bg-card flex items-center justify-center relative overflow-hidden">
            {/* Stylized map grid */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Roads */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border" />
              <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-border" />
              <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-border" />
              <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-border/50" />
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-border/50" />
            </div>
            {/* Pin */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border rounded-xl px-5 py-3 text-center shadow-lg">
                <p className="font-bold text-sm">{RESTAURANT_CONFIG.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Bandra West, Mumbai</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
