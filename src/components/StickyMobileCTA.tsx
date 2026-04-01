"use client";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { CalendarDays, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 400);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-4 right-4 z-40 lg:hidden"
    >
      <div className="flex gap-3 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3 shadow-2xl shadow-black/40">
        <Link
          href="/reserve"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          <CalendarDays className="w-4 h-4" />
          Reserve
        </Link>
        <Link
          href="/menu"
          className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary text-sm font-semibold py-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          Order Now
        </Link>
      </div>
    </motion.div>
  );
}
