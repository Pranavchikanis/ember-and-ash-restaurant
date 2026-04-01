import { createClient } from "@libsql/client";
import "dotenv/config";

async function main() {
  const client = createClient({ url: process.env.DATABASE_URL!, authToken: process.env.TURSO_AUTH_TOKEN! });
  const count = await client.execute('SELECT count(*) as c FROM "MenuItem"');
  console.log("Turso Cloud REAL MENU Item Count:", count.rows[0].c);
}

main().catch(console.error);
