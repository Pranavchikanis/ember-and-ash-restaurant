"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;
  
  // Hardcoded simple admin password for phase 2.
  if (password === "admin123") {
    (await cookies()).set("admin-auth", "true", { path: "/", secure: true, httpOnly: true });
    redirect("/admin");
  }
  throw new Error("Invalid password.");
}

export async function logoutAdmin() {
  (await cookies()).delete("admin-auth");
  redirect("/admin/login");
}

export async function updateOrderStatus(orderId: string, status: string) {
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  revalidatePath("/admin/orders");
}

export async function updateReservationStatus(id: string, status: string) {
  await prisma.reservation.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/reservations");
}

export async function toggleMenuItem(id: string, isAvailable: boolean) {
  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable },
  });
  revalidatePath("/admin/menu");
  revalidatePath("/menu"); // Revalidate public menu too
}
