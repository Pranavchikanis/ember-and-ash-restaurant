import "dotenv/config";
import { seedMenuItems } from "../src/lib/seed";
console.log("Forcing execution of seedMenuItems()...");
seedMenuItems().then(() => console.log("Done!")).catch(console.error);
