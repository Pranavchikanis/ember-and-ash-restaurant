import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({ url: "file:prisma/dev.db" });
const adapter = new PrismaLibSql({ url: "file:prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function fixImage() {
  const beautifulMeatImg = "https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=2072&auto=format&fit=crop";
  const item = await prisma.menuItem.updateMany({
    where: { name: { contains: "Lamb Chops" } },
    data: { imageUrl: beautifulMeatImg }
  });
  console.log(`Updated ${item.count} items.`);
}

fixImage()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
