import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MenuAvailabilityToggle from "./MenuAvailabilityToggle";
import Image from "next/image";

export default async function AdminMenu() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-auth")?.value !== "true") {
    redirect("/admin/login");
  }

  const items = await prisma.menuItem.findMany({
    orderBy: { category: "asc" },
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menu Items</h1>
        <p className="text-muted-foreground">Toggle availability of dishes on the live website.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {items.length === 0 ? (
          <p className="text-muted-foreground p-8 text-center text-sm">No items configured.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium text-center">Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map(item => (
                  <tr key={item.id} className={`transition-colors ${!item.isAvailable ? "bg-muted/30 opacity-75" : "hover:bg-muted/10"}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {item.imageUrl && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground max-w-sm truncate">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border border-border bg-muted text-muted-foreground">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold tracking-tight">₹{item.price}</td>
                    <td className="px-6 py-4 text-center">
                      <MenuAvailabilityToggle id={item.id} isAvailable={item.isAvailable} />
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
