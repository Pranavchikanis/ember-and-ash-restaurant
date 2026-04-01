import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, totalAmount, orderType, deliveryAddress } = body;

    if (!items || items.length === 0 || !totalAmount) {
      return NextResponse.json({ error: "Invalid order data." }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        totalAmount,
        orderType,
        deliveryAddress: deliveryAddress || null,
        status: "PENDING",
        orderItems: {
          create: items.map((item: { id: string; quantity: number; price: number }) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            priceAtTime: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Order ID required" }, { status: 400 });

  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: { include: { menuItem: true } } },
  });

  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json(order);
}
