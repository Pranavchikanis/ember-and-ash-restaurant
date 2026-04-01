"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore, CartItem } from "@/store/cart";
import Image from "next/image";
import { RESTAURANT_CONFIG } from "@/lib/config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCartStore();
  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      {item.imageUrl ? (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <ShoppingBag className="w-6 h-6 text-muted-foreground" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-primary font-semibold text-sm mt-0.5">
          {RESTAURANT_CONFIG.currency}{(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Plus className="w-3 h-3" />
          </button>
          <button onClick={() => removeItem(item.id)}
            className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, items, total, clearCart } = useCartStore();
  const cartTotal = total();
  const meetsMinimum = cartTotal >= RESTAURANT_CONFIG.minOrderValue;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
          <motion.div key="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-card border-l border-border flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Your Cart</h2>
                {items.length > 0 && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{items.length}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive transition-colors">Clear all</button>
                )}
                <button onClick={closeCart} className="p-1.5 rounded-full hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mt-1">Add items from the menu to get started.</p>
                  </div>
                  <Link href="/menu" onClick={closeCart}
                    className={cn(buttonVariants({ variant: "outline" }))}>
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div>{items.map((item) => <CartItemRow key={item.id} item={item} />)}</div>
              )}
            </div>
            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                {!meetsMinimum && (
                  <p className="text-xs text-muted-foreground text-center">
                    Add {RESTAURANT_CONFIG.currency}{(RESTAURANT_CONFIG.minOrderValue - cartTotal).toFixed(2)} more to meet minimum order
                  </p>
                )}
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary text-lg">{RESTAURANT_CONFIG.currency}{cartTotal.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={cn(
                    buttonVariants(),
                    "w-full rounded-full font-semibold",
                    !meetsMinimum && "pointer-events-none opacity-50"
                  )}
                >
                  Proceed to Checkout
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  Estimated delivery: {RESTAURANT_CONFIG.deliveryEta}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
