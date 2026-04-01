import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedMenuItems } from "@/lib/seed";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where = category && category !== "All" ? { category: { contains: category } } : {};

    const items = await prisma.menuItem.findMany({
      where,
      orderBy: { category: "asc" },
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("API ROUTE ERROR:", err);
    return NextResponse.json({ error: String(err), stack: err instanceof Error ? err.stack : undefined }, { status: 500 });
  }
}
