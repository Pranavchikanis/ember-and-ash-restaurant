import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, LayoutDashboard, ShoppingBag, CalendarDays, UtensilsCrossed } from "lucide-react";
import { logoutAdmin } from "../actions/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin-auth")?.value === "true";

  // Navigation Links
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Reservations", href: "/admin/reservations", icon: CalendarDays },
    { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Sidebar - only show if logged in */}
      {isAdmin && (
        <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border p-6 flex flex-col pt-10">
          <div className="mb-8 hidden md:block">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Admin Portal</h2>
            <p className="text-sm text-muted-foreground mt-1">Ember & Ash operations</p>
          </div>
          
          <nav className="flex-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <form action={logoutAdmin} className="mt-auto hidden md:block">
            <button className="flex items-center gap-3 text-sm font-medium text-destructive hover:bg-destructive/10 w-full px-4 py-3 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
