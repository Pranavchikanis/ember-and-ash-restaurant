import { seedMenuItems } from "../src/lib/seed";

async function main() {
  try {
    await seedMenuItems();
    console.log("Seeding successful!");
  } catch (e) {
    console.error("Seeding failed with error:", e);
  }
}

main();
