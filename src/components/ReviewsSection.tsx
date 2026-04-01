"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    rating: 5,
    text: "Absolutely breathtaking food. The lamb chops were cooked to perfection and the ambiance is unlike any other restaurant in Mumbai. Will definitely be back!",
    avatar: "AS",
    date: "2 weeks ago",
    source: "Google",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    rating: 5,
    text: "We celebrated our anniversary here and it was magical. The truffle mushroom pizza is worth every rupee. Staff was incredibly attentive without being intrusive.",
    avatar: "RM",
    date: "1 month ago",
    source: "Google",
  },
  {
    id: 3,
    name: "Priya Kapoor",
    rating: 5,
    text: "The best dining experience I've had in years. Online ordering was seamless—food arrived hot and packed beautifully. The seabass is an absolute must-try.",
    avatar: "PK",
    date: "3 weeks ago",
    source: "Google",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-card/50 border-y border-border">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-amber-400 mb-4"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            What Our Guests Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-3"
          >
            4.9 stars across 300+ reviews on Google
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date} · {review.source}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
