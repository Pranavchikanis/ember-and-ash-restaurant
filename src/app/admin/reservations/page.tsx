import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReservationStatusSelect from "./ReservationStatusSelect";
import { CalendarDays, Users, Phone, Clock } from "lucide-react";

export default async function AdminReservations() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-auth")?.value !== "true") {
    redirect("/admin/login");
  }

  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <p className="text-muted-foreground">Manage upcoming table bookings and guest list.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reservations.length === 0 ? (
          <p className="text-muted-foreground p-8 col-span-full">No upcoming reservations.</p>
        ) : (
          reservations.map((res) => (
            <div key={res.id} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4 hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{res.name || "Guest"}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <Phone className="w-3.5 h-3.5" /> {res.phone || "No phone provided"}
                  </div>
                </div>
                <ReservationStatusSelect id={res.id} currentStatus={res.status} />
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1.5 rounded-lg border border-primary/20">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(res.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-500 px-2.5 py-1.5 rounded-lg border border-blue-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  {res.time}
                </span>
                <span className="flex items-center gap-1.5 bg-orange-500/10 text-orange-500 px-2.5 py-1.5 rounded-lg border border-orange-500/20">
                  <Users className="w-3.5 h-3.5" />
                  {res.guests} {res.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>

              {res.specialRequests && (
                <div className="text-sm p-3 bg-muted rounded-lg border border-border">
                  <p className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Requests</p>
                  <p className="text-foreground">{res.specialRequests}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
