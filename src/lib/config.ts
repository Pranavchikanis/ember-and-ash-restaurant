// Restaurant Configuration — update these values for your restaurant
export const RESTAURANT_CONFIG = {
  name: "Ember & Ash",
  tagline: "Wood-Fired Artisan Cuisine",
  description:
    "A premium dining experience where fire meets flavour. Reserve a table or order online for delivery.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@emberandash.in",
  address: "12, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
  openingHours: [
    { day: "Monday – Thursday", time: "12:00 PM – 11:00 PM" },
    { day: "Friday – Saturday", time: "12:00 PM – 12:00 AM" },
    { day: "Sunday", time: "12:00 PM – 10:00 PM" },
  ],
  socialLinks: {
    instagram: "https://instagram.com/emberandash",
    facebook: "https://facebook.com/emberandash",
    twitter: "https://twitter.com/emberandash",
  },
  reservationCapacity: 40, // total seats at any time slot
  minOrderValue: 299,       // in INR
  deliveryEta: "30–45 mins",
  currency: "₹",
  currencyCode: "INR",
};

export type RestaurantConfig = typeof RESTAURANT_CONFIG;
