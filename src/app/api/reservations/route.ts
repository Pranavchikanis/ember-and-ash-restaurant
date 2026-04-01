import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, guests, name, phone, specialRequests } = body;

    if (!date || !time || !guests || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Check capacity: sum guests already booked for this date+time
    const existing = await prisma.reservation.findMany({
      where: { date: new Date(date), time },
    });
    const booked = existing.reduce((acc, r) => acc + r.guests, 0);
    const CAPACITY = 40;

    if (booked + Number(guests) > CAPACITY) {
      return NextResponse.json({ error: "No availability for that slot. Please choose another time." }, { status: 409 });
    }

    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        time,
        guests: Number(guests),
        name,
        phone,
        specialRequests: specialRequests || null,
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({ success: true, reservation }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  if (!date || !time) {
    return NextResponse.json({ error: "date and time required" }, { status: 400 });
  }

  const existing = await prisma.reservation.findMany({
    where: { date: new Date(date), time },
  });
  const booked = existing.reduce((acc, r) => acc + r.guests, 0);
  const available = 40 - booked;

  return NextResponse.json({ available, booked, capacity: 40 });
}
