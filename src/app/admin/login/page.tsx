import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAdmin } from "../../actions/admin";
import { Lock } from "lucide-react";

export default async function AdminLogin() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-auth")?.value === "true") {
    redirect("/admin");
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full mx-auto mb-6">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Enter the passphrase to access the restaurant operations dashboard.
        </p>

        <form action={loginAdmin} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Passphrase"
            required
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            Access Dashboard
          </button>
        </form>
        <p className="text-xs text-muted-foreground mt-6">
          Hint: try 'admin123'
        </p>
      </div>
    </div>
  );
}
