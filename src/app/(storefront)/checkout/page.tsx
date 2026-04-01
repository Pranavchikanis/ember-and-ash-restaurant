"use client";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { RESTAURANT_CONFIG } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, Package, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeItem, orderType, setOrderType, clearCart } = useCartStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const cartTotal = total();
  const meetsMinimum = cartTotal >= RESTAURANT_CONFIG.minOrderValue;

  async function handleOrder() {
    if (!name || !phone || (orderType === "DELIVERY" && !address)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity, price: i.price })),
          totalAmount: cartTotal,
          orderType,
          deliveryAddress: address,
          name,
          phone,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderId(data.order.id);
        clearCart();
        setSuccess(true);
      }
    } catch {
      alert("Error placing order. Try again.");
    }
    setLoading(false);
  }

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Add items from the menu to place an order.</p>
        <Link href="/menu" className={cn(buttonVariants())}>Browse Menu</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold">Order Placed! 🎉</h1>
          <p className="text-muted-foreground mt-2">
            {orderType === "DELIVERY" ? `Estimated delivery: ${RESTAURANT_CONFIG.deliveryEta}` : "Your order will be ready for pickup shortly!"}
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl px-6 py-4 text-sm flex flex-col gap-2 w-full max-w-sm text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-bold text-primary">{orderId.slice(0, 10).toUpperCase()}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>Home</Link>
          <Link href="/menu" className={cn(buttonVariants())}>Order Again</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Checkout</h1>

          {/* Order Type */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Order Type</h2>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setOrderType("DELIVERY")}
                className={`flex items-center gap-2 justify-center py-3 rounded-xl border text-sm font-semibold transition-colors ${orderType === "DELIVERY" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                <Truck className="w-4 h-4" /> Delivery
              </button>
              <button onClick={() => setOrderType("PICKUP")}
                className={`flex items-center gap-2 justify-center py-3 rounded-xl border text-sm font-semibold transition-colors ${orderType === "PICKUP" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                <Package className="w-4 h-4" /> Pickup
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-semibold">Contact Information</h2>
            <div>
              <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Phone *</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            {orderType === "DELIVERY" && (
              <div>
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Delivery Address *</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address" rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>
            )}
          </div>

          {/* Items */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Your Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.imageUrl && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-primary">{RESTAURANT_CONFIG.currency}{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{RESTAURANT_CONFIG.currency}{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="text-emerald-400">{orderType === "DELIVERY" ? `${RESTAURANT_CONFIG.currency}49` : "Free"}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="text-primary">{RESTAURANT_CONFIG.currency}{(cartTotal + (orderType === "DELIVERY" ? 49 : 0)).toLocaleString("en-IN")}</span>
              </div>
            </div>
            {!meetsMinimum && (
              <p className="text-xs text-amber-400 mb-3 text-center">
                Add {RESTAURANT_CONFIG.currency}{(RESTAURANT_CONFIG.minOrderValue - cartTotal).toFixed(0)} more to meet minimum order
              </p>
            )}
            <button
              className={cn(
                buttonVariants(),
                "w-full rounded-full font-semibold",
                (!meetsMinimum || !name || !phone || (orderType === "DELIVERY" && !address) || loading) && "opacity-50 pointer-events-none"
              )}
              onClick={handleOrder}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">💳 Payment on delivery/pickup for now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
