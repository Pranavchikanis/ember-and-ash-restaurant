"use client";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { RESTAURANT_CONFIG } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, Package, CheckCircle2, Minus, Plus, Trash2, CreditCard, Banknote, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, total, updateQuantity, removeItem, orderType, setOrderType, clearCart } = useCartStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Payment Simulation State
  const [paymentMethod, setPaymentMethod] = useState<"CARD" | "CASH">("CARD");
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiry, setCcExpiry] = useState("");
  const [ccCvv, setCcCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // For the simulated loading text
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const cartTotal = total();
  const meetsMinimum = cartTotal >= RESTAURANT_CONFIG.minOrderValue;

  async function handleOrder() {
    if (!name || !phone || (orderType === "DELIVERY" && !address)) return;
    
    // Validate simulated card
    if (paymentMethod === "CARD") {
      if (ccNumber.replace(/\s/g, '').length < 15 || !ccExpiry || ccCvv.length < 3) {
        setErrorMsg("Please enter valid mock credit card details to proceed.");
        return;
      }
    }
    
    setErrorMsg("");
    setLoading(true);

    try {
      if (paymentMethod === "CARD") {
        setPaymentStatus("Connecting to payment gateway...");
        await new Promise(r => setTimeout(r, 800));
        setPaymentStatus("Processing card securely...");
        await new Promise(r => setTimeout(r, 1000));
        setPaymentStatus("Finalizing order...");
      } else {
        setPaymentStatus("Placing your order...");
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity, price: i.price })),
          totalAmount: cartTotal,
          orderType,
          deliveryAddress: address || "Pickup",
          name,
          phone,
        }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setOrderId(data.order.id);
        clearCart();
        setSuccess(true);
      } else {
        throw new Error(data.error || "Failed to place order.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred reaching the server.");
    } finally {
      setLoading(false);
      setPaymentStatus("");
    }
  }

  // Formatting helpers for the simulated card
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 16) val = val.slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCcNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 3) {
      setCcExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setCcExpiry(val);
    }
  };

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
          className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center relative">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 relative z-10" />
          <motion.div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
        </motion.div>
        <div>
          <h1 className="text-3xl font-bold">Payment Successful! 🎉</h1>
          <p className="text-muted-foreground mt-2">
            {orderType === "DELIVERY" ? `Estimated delivery: ${RESTAURANT_CONFIG.deliveryEta}` : "Your order will be ready for pickup shortly!"}
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl px-6 py-4 text-sm flex flex-col gap-2 w-full max-w-sm text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-bold text-primary">{orderId.slice(0, 10).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-semibold text-foreground">{paymentMethod === "CARD" ? "Credit Card ending in " + ccNumber.slice(-4) : "Pay on Delivery / Pickup"}</span>
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
    <div className="min-h-[85vh] pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>

          {/* Order Type & Contact */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4 text-lg">1. Delivery Method & Details</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => setOrderType("DELIVERY")}
                className={cn("flex flex-col items-center gap-2 justify-center py-4 rounded-xl border text-sm font-semibold transition-all", orderType === "DELIVERY" ? "bg-primary/10 text-primary border-primary shadow-[0_0_15px_-3px_rgba(255,90,31,0.2)]" : "border-border text-muted-foreground hover:border-primary/50 bg-background")}>
                <Truck className="w-5 h-5 mb-1" /> Delivery
              </button>
              <button onClick={() => setOrderType("PICKUP")}
                className={cn("flex flex-col items-center gap-2 justify-center py-4 rounded-xl border text-sm font-semibold transition-all", orderType === "PICKUP" ? "bg-primary/10 text-primary border-primary shadow-[0_0_15px_-3px_rgba(255,90,31,0.2)]" : "border-border text-muted-foreground hover:border-primary/50 bg-background")}>
                <Package className="w-5 h-5 mb-1" /> Pickup
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Full Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Phone Number *</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm" />
                </div>
              </div>
              {orderType === "DELIVERY" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Delivery Address *</label>
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Artisan Street, FL 4..." rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm resize-none" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Payment Module */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold mb-4 text-lg">2. Payment Execution (Demo)</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button onClick={() => setPaymentMethod("CARD")}
                className={cn("flex items-center gap-2 justify-center py-3 rounded-xl border text-sm font-semibold transition-all", paymentMethod === "CARD" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary bg-background")}>
                <CreditCard className="w-4 h-4" /> Credit Card
              </button>
              <button onClick={() => setPaymentMethod("CASH")}
                className={cn("flex items-center gap-2 justify-center py-3 rounded-xl border text-sm font-semibold transition-all", paymentMethod === "CASH" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary bg-background")}>
                <Banknote className="w-4 h-4" /> Pay Later
              </button>
            </div>

            <AnimatePresence mode="wait">
              {paymentMethod === "CARD" ? (
                <motion.div key="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="space-y-4 bg-background p-5 rounded-xl border border-border/50 shadow-inner">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-muted-foreground font-medium">Card Information</p>
                    <div className="flex gap-1.5 opacity-50">
                      <div className="w-6 h-4 bg-muted-foreground/30 rounded-sm"></div>
                      <div className="w-6 h-4 bg-muted-foreground/30 rounded-sm"></div>
                      <div className="w-6 h-4 bg-muted-foreground/30 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <input type="text" value={ccNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all tracking-widest font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={ccExpiry} onChange={handleExpiryChange} placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono" />
                    <input type="password" value={ccCvv} onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="CVC"
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono" />
                  </div>
                  <p className="text-[10px] text-muted-foreground opacity-60 text-center uppercase tracking-wider font-semibold pt-2">Powered by Dummy StripE Integration</p>
                </motion.div>
              ) : (
                <motion.div key="cash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="py-6 text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">
                  You will pay via Cash or UPI when your order is delivered/picked up.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary Lateral */}
        <div>
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-28 shadow-xl shadow-black/5">
            <h2 className="font-semibold mb-4 text-lg">Order Summary</h2>
            
            {/* Cart Preview (Compact) */}
            <div className="max-h-48 overflow-y-auto pr-2 space-y-3 mb-6 scrollbar-thin scrollbar-thumb-border">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm gap-4">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-muted-foreground bg-muted px-2 py-0.5 rounded text-xs">{item.quantity}x</span>
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="font-medium shrink-0">{RESTAURANT_CONFIG.currency}{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm mb-6 border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{RESTAURANT_CONFIG.currency}{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes & Fees</span>
                <span>{RESTAURANT_CONFIG.currency}{Math.round(cartTotal * 0.05).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className={orderType === "DELIVERY" ? "" : "text-emerald-500 font-medium"}>
                  {orderType === "DELIVERY" ? `${RESTAURANT_CONFIG.currency}49` : "Free"}
                </span>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{RESTAURANT_CONFIG.currency}{(cartTotal + (orderType === "DELIVERY" ? 49 : 0) + Math.round(cartTotal * 0.05)).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 text-xs text-red-400 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 text-center animate-in fade-in slide-in-from-top-1">
                {errorMsg}
              </div>
            )}

            {!meetsMinimum && (
              <p className="text-xs text-amber-500 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20 mb-4 text-center">
                Add {RESTAURANT_CONFIG.currency}{(RESTAURANT_CONFIG.minOrderValue - cartTotal).toFixed(0)} more to order
              </p>
            )}

            <button
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full rounded-xl font-bold shadow-lg shadow-primary/20 transition-all",
                (!meetsMinimum || !name || !phone || (orderType === "DELIVERY" && !address) || loading) ? "opacity-60 pointer-events-none" : "hover:scale-[1.02]"
              )}
              onClick={handleOrder}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> {paymentStatus || "Processing..."}
                </span>
              ) : (
                paymentMethod === "CARD" ? `Pay ${RESTAURANT_CONFIG.currency}{(cartTotal + (orderType === "DELIVERY" ? 49 : 0) + Math.round(cartTotal * 0.05)).toLocaleString("en-IN")} Structurally` : "Confirm Order"
              )}
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
               🔒 256-bit Secure Demo Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
