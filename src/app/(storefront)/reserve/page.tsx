"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Users, User, Phone, MessageSquare, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESTAURANT_CONFIG } from "@/lib/config";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

type Step = "date" | "time" | "details" | "success";

export default function ReservePage() {
  const [step, setStep] = useState<Step>("date");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [requests, setRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState("");

  const stepIndex = ["date", "time", "details", "success"].indexOf(step);

  async function handleSubmit() {
    if (!date || !time || !name || !phone) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString(), time, guests, name, phone, specialRequests: requests }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      setConfirmId(data.reservation.id);
      setStep("success");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  const steps = [
    { id: "date", label: "Date & Guests" },
    { id: "time", label: "Time" },
    { id: "details", label: "Details" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center py-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Reserve a Table</h1>
          <p className="text-muted-foreground">Book your experience in a few simple steps.</p>
        </div>

        {step !== "success" && (
          <>
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                    stepIndex >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`ml-1.5 text-xs font-medium hidden sm:inline ${stepIndex >= i ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {i < steps.length - 1 && <div className={`w-8 h-px mx-3 ${stepIndex > i ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Date + Guests */}
          {step === "date" && (
            <motion.div key="date" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-semibold flex items-center gap-2 mb-4">
                  <CalendarDays className="w-5 h-5 text-primary" /> Select Date
                </h2>
                <div className="flex justify-center">
                  <style>{`
                    .rdp { --rdp-accent-color: hsl(var(--primary)); --rdp-background-color: hsl(var(--muted)); }
                    .rdp-day_selected, .rdp-day_selected:focus-visible, .rdp-day_selected:hover { background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
                    .rdp { color: hsl(var(--foreground)); }
                    .rdp-day:hover { background-color: hsl(var(--muted)); }
                  `}</style>
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={{ before: new Date() }}
                    showOutsideDays={false}
                  />
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-semibold flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" /> Number of Guests
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {GUEST_OPTIONS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGuests(g)}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-colors ${
                        guests === g ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {g} {g === 1 ? "Guest" : "Guests"}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full rounded-full font-semibold"
                disabled={!date}
                onClick={() => setStep("time")}
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: Time */}
          {step === "time" && (
            <motion.div key="time" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="font-semibold flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-primary" /> Select a Time Slot
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {date?.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {guests} guest{guests > 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-3 rounded-xl text-sm font-semibold border transition-colors ${
                        time === slot ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => setStep("date")}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button className="flex-1 rounded-full font-semibold" disabled={!time} onClick={() => setStep("details")}>
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Details */}
          {step === "details" && (
            <motion.div key="details" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6">
              {/* Summary */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-primary font-semibold">
                  <CalendarDays className="w-4 h-4" />
                  {date?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
                <span className="flex items-center gap-1.5 text-primary font-semibold">
                  <Clock className="w-4 h-4" /> {time}
                </span>
                <span className="flex items-center gap-1.5 text-primary font-semibold">
                  <Users className="w-4 h-4" /> {guests} guest{guests > 1 ? "s" : ""}
                </span>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h2 className="font-semibold">Contact Details</h2>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Special Requests (optional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      placeholder="Allergies, celebrations, seating preferences..."
                      rows={3}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => setStep("time")}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 rounded-full font-semibold"
                  disabled={!name || !phone || loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold">Table Reserved! 🎉</h2>
                <p className="text-muted-foreground mt-2">
                  We&apos;ve confirmed your booking for{" "}
                  <strong>{guests} guest{guests > 1 ? "s" : ""}</strong> on{" "}
                  <strong>{date?.toLocaleDateString("en-IN", { day: "numeric", month: "long" })}</strong> at{" "}
                  <strong>{time}</strong>.
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 text-left space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confirmation ID</span>
                  <span className="font-mono font-semibold text-primary">{confirmId.slice(0, 10).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{phone}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=Hi! My reservation confirmation ID is ${confirmId.slice(0, 10).toUpperCase()}. Looking forward to dining with you!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Share via WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
