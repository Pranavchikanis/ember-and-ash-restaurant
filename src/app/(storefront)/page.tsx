import HeroSection from "@/components/HeroSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import ReviewsSection from "@/components/ReviewsSection";
import LocationSection from "@/components/LocationSection";
import { RESTAURANT_CONFIG } from "@/lib/config";

export default function HomePage() {
  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT_CONFIG.name,
    description: RESTAURANT_CONFIG.description,
    telephone: RESTAURANT_CONFIG.phone,
    email: RESTAURANT_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12, Linking Road",
      addressLocality: "Bandra West",
      addressRegion: "Maharashtra",
      postalCode: "400050",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "12:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "12:00",
        closes: "22:00",
      },
    ],
    priceRange: "₹₹₹",
    servesCuisine: ["Wood-Fired", "Continental", "Modern Indian"],
    hasMenu: "/menu",
    acceptsReservations: true,
    sameAs: [
      RESTAURANT_CONFIG.socialLinks.instagram,
      RESTAURANT_CONFIG.socialLinks.facebook,
    ],
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <HeroSection />
      <FeaturedDishes />
      {/* Category Preview Strip */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scrollbar-hide">
            {[
              { label: "Starters", emoji: "🥗", href: "/menu?category=starters" },
              { label: "Wood-Fired Mains", emoji: "🔥", href: "/menu?category=mains" },
              { label: "Pizza & Flatbreads", emoji: "🍕", href: "/menu?category=pizza" },
              { label: "Seafood", emoji: "🐟", href: "/menu?category=seafood" },
              { label: "Desserts", emoji: "🍮", href: "/menu?category=desserts" },
              { label: "Beverages", emoji: "🍷", href: "/menu?category=beverages" },
            ].map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="snap-start flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className="w-20 h-20 rounded-2xl bg-card border border-border group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 flex items-center justify-center text-3xl">
                  {cat.emoji}
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                  {cat.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <ReviewsSection />
      <LocationSection />
    </>
  );
}
