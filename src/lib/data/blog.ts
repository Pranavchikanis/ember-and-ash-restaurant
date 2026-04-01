export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Secret to Perfect Wood-Fired Pizza Dough",
    excerpt: "Learn how a 48-hour cold fermentation process transforms simple ingredients into an airy, charred masterpiece.",
    content: "The foundation of an unforgettable wood-fired pizza isn't found in the toppings—it's entirely dictated by the dough. We've spent countless nights running test batches to finalize the precise hydration ratios that result in the perfect crust.\\n\\nOur process begins with high-protein '00' flour milled precisely for intense heat. We opt for a slow, 48-hour cold fermentation that does two critical things: it develops an incredibly complex, slightly sour baseline flavor profile, and it relaxes the gluten matrix allowing for magnificent bubbles (the 'cornicione') once it hits the 800°F hearth.\\n\\nWhen you tear off that blackened, blistered edge, the smoky aroma is intertwined with the yeast's deep complexity. This is the art of patience translated into artisan bread.",
    date: "March 15, 2026",
    author: "Chef Marco",
    category: "Technique",
    imageUrl: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Sourcing Local Truffles in Maharashtra",
    excerpt: "Our journey to find the finest, most aromatic fungi from local foragers to bring directly to your plate.",
    content: "When people think of truffles, their minds instantly travel to the rolling hills of Piedmont or the damp forests of Périgord. But the microclimates of Maharashtra, particularly the forested slopes reaching into the Western Ghats, hold their own secrets.\\n\\nOur culinary team embarked on an expedition with local tribal foragers to unearth these elusive regional fungi. Unlike the pungent white truffles of Italy, these local varieties offer a uniquely earthy, almost petrichor-like aroma that pairs astoundingly well with robust local spices and our wood-smoked dishes.\\n\\nEvery sliver shaved over our Wild Mushroom Risotto tells a story of the deep connection between the rain-drenched soil of the Sahyadris and the plate positioned directly in front of you.",
    date: "February 28, 2026",
    author: "Elena Rossi",
    category: "Ingredients",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Wine Pairing: Demystifying Bold Reds",
    excerpt: "A beginner's guide to pairing robust Cabernets and Syrahs with our signature ember-kissed lamb chops.",
    content: "It's a common misconception that pairing wine requires a sommelier's encyclopedic knowledge. At Ember & Ash, we believe in a simpler philosophy: pair intensity with intensity.\\n\\nTake our signature Ember-Kissed Lamb Chops. The intense marinade is caramelized right into the meat over open flames, resulting in a rich, deeply savory profile laced with herbal char. A delicate Pinot Noir would be instantly crushed by these flavors. Instead, you need the architectural tannins of a bold Cabernet Sauvignon or the peppery, jammy kick of a Syrah.\\n\\nThese robust reds scrub the palate between bites, their inherent acidity slicing through the rich fats of the lamb. The next time you dine with us, ask to see our reserve cellar. We'll find the perfect powerhouse varietal to match your fire-roasted feast.",
    date: "February 10, 2026",
    author: "Julian Vance",
    category: "Beverage",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Why We Cook With Open Fire",
    excerpt: "Exploring the primal instinct and unparalleled flavor profiles that only a true wood-fire hearth can provide.",
    content: "Cooking over an open flame is humanity's oldest culinary technique, yet it remains the most demanding. Unlike an electric flat-top or gas burner—where temperatures are commanded with the twist of a knob—a wood fire is a living, breathing entity.\\n\\nWe decided to build Ember & Ash around a custom-built, multi-tiered wood hearth because fire imports an ingredient logic you simply cannot buy. The type of wood we use (often aged applewood or oak) literally seasons the food as it renders down. The intense conductive heat ensures that proteins sear rapidly, locking in juices while introducing beautiful, bitter char lines that perfectly contrast the sweet interiors of root vegetables.\\n\\nEvery night, managing the coals is a dance of intuition. It requires the chef to feel the heat, listen to the sizzle, and understand the temperament of the glowing embers. It is dangerous, unpredictable, and entirely worth it.",
    date: "January 22, 2026",
    author: "Chef Marco",
    category: "Philosophy",
    imageUrl: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=2070&auto=format&fit=crop",
  },
];
