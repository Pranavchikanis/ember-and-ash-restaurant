import { RESTAURANT_CONFIG } from "@/lib/config";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${RESTAURANT_CONFIG.name}. Call, WhatsApp, or visit us in Bandra West, Mumbai.`,
};

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(RESTAURANT_CONFIG.address);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Get In Touch</h1>
          <p className="text-muted-foreground">We&apos;d love to hear from you. Reserve a table or just say hello.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <a href={`tel:${RESTAURANT_CONFIG.phone}`}
                className="flex items-center gap-4 group hover:text-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Call Us</p>
                  <p className="font-semibold">{RESTAURANT_CONFIG.phone}</p>
                </div>
              </a>

              <a href={`mailto:${RESTAURANT_CONFIG.email}`}
                className="flex items-center gap-4 group hover:text-primary transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Email</p>
                  <p className="font-semibold">{RESTAURANT_CONFIG.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">Address</p>
                  <p className="font-semibold">{RESTAURANT_CONFIG.address}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp}?text=Hi! I'd like to enquire about a reservation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl p-5 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-sm text-white/80">Usually replies within minutes</p>
              </div>
            </a>

            {/* Hours */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                <Clock className="w-4 h-4" /> Opening Hours
              </h3>
              {RESTAURANT_CONFIG.openingHours.map((h) => (
                <div key={h.day} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-semibold text-primary">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden h-[500px] flex flex-col">
            <div className="flex-1 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
                <div className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-xl px-5 py-3">
                  <p className="font-bold text-sm">{RESTAURANT_CONFIG.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Bandra West, Mumbai</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
