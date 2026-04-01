import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Users, IndianRupee, Utensils, ShoppingCart } from "lucide-react";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-auth")?.value !== "true") {
    redirect("/admin/login");
  }

  // Get metrics
  const totalOrders = await prisma.order.count();
  const totalReservations = await prisma.reservation.count();
  const totalMenu = await prisma.menuItem.count();
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { orderItems: { include: { menuItem: true } } }
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome to your daily restaurant performance.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">₹0</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <IndianRupee className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">+0% from last month</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">All time delivery & pickup</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reservations</p>
              <p className="text-2xl font-bold">{totalReservations}</p>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Table bookings</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Menu Items</p>
              <p className="text-2xl font-bold">{totalMenu}</p>
            </div>
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Utensils className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Active dishes tracked</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Recent Orders</h2>
        
        {recentOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs">{order.id.slice(-8)}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        {order.orderType}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-semibold">₹{order.totalAmount}</td>
                    <td className="px-4 py-4">
                      {order.status}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
