import Link from "next/link";
import { User, MapPin, ShoppingBag, Settings, CreditCard, ChevronRight } from "lucide-react";

export const metadata = {
  title: "My Account | Ember & Ash",
  description: "Manage your Ember & Ash reservations, orders, and profile.",
};

const MOCK_ORDERS = [
  {
    id: "ord_1a2b3c",
    date: "Mar 20, 2026",
    total: "₹3,450",
    status: "Delivered",
    items: "Ember-Kissed Lamb Chops, Wild Mushroom Risotto",
  },
  {
    id: "ord_9x8y7z",
    date: "Feb 14, 2026",
    total: "₹5,200",
    status: "Delivered",
    items: "Valentine's Special Combo, Sparkling Wine",
  },
];

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AccountPage(props: Props) {
  // In Next 15+, searchParams is a Promise. Let's await it.
  // Next 14 handles it synchronously but 15+ deprecates sync searchParams access. 
  // Next 14 allows both, but typing prefers we handle it gracefully.
  const searchParams = await props.searchParams;
  const activeTab = (searchParams.tab as string) || "orders";

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-28 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Guest User</h2>
                <p className="text-xs text-muted-foreground tracking-wider uppercase font-semibold">Foodie Level 2</p>
              </div>
            </div>

            <nav className="flex flex-col space-y-2">
              <Link 
                href="?tab=orders" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border-l-2 ${activeTab === 'orders' ? 'bg-primary/10 text-primary border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border'}`}
              >
                <ShoppingBag className="w-4 h-4" /> Order History
              </Link>
              <Link 
                href="?tab=addresses" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border-l-2 ${activeTab === 'addresses' ? 'bg-primary/10 text-primary border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border'}`}
              >
                <MapPin className="w-4 h-4" /> Saved Addresses
              </Link>
              <Link 
                href="?tab=payments" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border-l-2 ${activeTab === 'payments' ? 'bg-primary/10 text-primary border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border'}`}
              >
                <CreditCard className="w-4 h-4" /> Payment Methods
              </Link>
              <Link 
                href="?tab=settings" 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors border-l-2 ${activeTab === 'settings' ? 'bg-primary/10 text-primary border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border'}`}
              >
                <Settings className="w-4 h-4" /> Profile Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          
          <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary rounded-r-2xl p-6 mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome to your kitchen.</h1>
            <p className="text-muted-foreground text-sm">Tracking your favorite wood-fired orders and reservations all in one place. Note: Authentication flows are simulated in this preview phase.</p>
          </div>

          {activeTab === 'orders' && (
            <section id="orders">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" /> Recent Orders
                </h2>
              </div>

              <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors shadow-sm cursor-pointer group">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-sm font-bold opacity-80 uppercase">{order.id}</span>
                          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg tracking-tight">{order.total}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center sm:items-end border-t border-border pt-4">
                      <p className="text-sm text-foreground max-w-md truncate pr-4">
                        {order.items}
                      </p>
                      <button className="flex-shrink-0 flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                        View details <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'addresses' && (
            <section id="addresses" className="pt-2 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Delivery Addresses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card border border-primary/40 rounded-xl p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-2 -mt-2"></div>
                  <div className="flex justify-between mb-2">
                    <span className="bg-primary/10 text-primary uppercase text-[10px] font-bold px-2 py-1 rounded-md border border-primary/20">Default</span>
                  </div>
                  <h3 className="font-bold mb-1">Home</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    123 Seaside Boulevard, Apt 4B<br />
                    Bandra West, Mumbai 400050<br />
                    Maharashtra, India
                  </p>
                  <button className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Edit Address</button>
                </div>
                <div className="bg-muted border border-border border-dashed rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/80 transition-colors group min-h-[160px]">
                  <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-xl font-light text-muted-foreground">+</span>
                  </div>
                  <p className="font-medium text-sm">Add New Address</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'payments' && (
            <section id="payments" className="pt-2 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Methods
              </h2>
              <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
                <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-bold mb-2">No linked cards yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">Securely save your credit or debit cards for faster checkout.</p>
                <button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity">
                  Add Payment Method
                </button>
              </div>
            </section>
          )}

          {activeTab === 'settings' && (
            <section id="settings" className="pt-2 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Profile Settings
              </h2>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Display Name</label>
                    <input type="text" defaultValue="Guest User" className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Email Address</label>
                    <input type="email" defaultValue="guest@example.com" disabled className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg text-sm opacity-70 cursor-not-allowed" />
                    <p className="text-xs text-muted-foreground mt-1">Email changes require re-authentication.</p>
                  </div>
                  <div className="pt-4">
                    <button className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity w-full sm:w-auto">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
