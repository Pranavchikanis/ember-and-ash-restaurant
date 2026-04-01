import { prisma } from "@/lib/prisma";

// Idempotent seed: only runs if menu is empty
export async function seedMenuItems() {
  const count = await prisma.menuItem.count();
  if (count > 0) return;

  const items = [
    // Starters
    { name: "Smoked Burrata", description: "Wood-smoked burrata on heirloom tomato salsa, basil oil, sourdough crisps.", price: 690, category: "Starters", imageUrl: "https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian", isAvailable: true },
    { name: "Crispy Calamari", description: "Lightly dusted calamari rings, saffron aioli, lemon zest.", price: 790, category: "Starters", imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80", dietaryTags: "", isAvailable: true },
    { name: "Mezze Platter", description: "House-made hummus, baba ganoush, pita, olives and pickles.", price: 590, category: "Starters", imageUrl: "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian,Vegan", isAvailable: true },
    // Mains
    { name: "Ember-Kissed Lamb Chops", description: "Herb-marinated frenched chops, wood-fire seared, chimichurri, smoky potato gratin.", price: 1850, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=2072&auto=format&fit=crop", dietaryTags: "", isAvailable: true },
    { name: "Butter Seared Seabass", description: "Pan-seared seabass, saffron velouté, fennel confit, cherry tomatoes.", price: 1650, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80", dietaryTags: "Gluten-Free", isAvailable: true },
    { name: "Wild Mushroom Risotto", description: "Arborio, porcini & chanterelle, aged parmesan, truffle oil, chives.", price: 1190, category: "Mains", imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian,Gluten-Free", isAvailable: true },
    // Pizza
    { name: "Truffle Wild Mushroom Pizza", description: "Sourdough base, wild mushroom medley, truffle oil, aged parmesan, fresh thyme.", price: 1290, category: "Pizza & Flatbreads", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian", isAvailable: true },
    { name: "Spicy Nduja & Burrata Pizza", description: "Calabrian nduja, fresh burrata, honey, chilli flakes on tomato base.", price: 1390, category: "Pizza & Flatbreads", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", dietaryTags: "", isAvailable: true },
    // Desserts
    { name: "Burnt Basque Cheesecake", description: "Velvety baked cheesecake, torched to perfection, berry compote.", price: 590, category: "Desserts", imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian", isAvailable: true },
    { name: "Dark Chocolate Fondant", description: "Warm valrhona chocolate fondant, sea salt caramel, vanilla bean ice cream.", price: 650, category: "Desserts", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian", isAvailable: true },
    // Beverages
    { name: "Fresh Lime Soda", description: "Hand-pressed lime, soda water, your choice of sweet or salted.", price: 150, category: "Beverages", imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian,Vegan,Gluten-Free", isAvailable: true },
    { name: "Masala Chai Latte", description: "House spice blend, oat milk, topped with cinnamon.", price: 250, category: "Beverages", imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80", dietaryTags: "Vegetarian", isAvailable: true },
  ];

  for (const item of items) {
    await prisma.menuItem.create({ data: item });
  }
}
