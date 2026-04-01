"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical System Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-red-500/10 flex items-center justify-center rounded-full mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Connection Failed</h1>
      <p className="text-muted-foreground max-w-lg mb-8">
        We encountered a critical error attempting to reach our secure database. This often occurs during initial automated Vercel deployments when credentials are missing.
      </p>

      {/* Raw Error Details for Debugging */}
      <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-4 rounded-xl text-left font-mono text-sm max-w-2xl w-full overflow-auto mb-8">
        <p className="font-semibold mb-2">Technical Details:</p>
        <p>{error.message || "Unknown Prisma / Database Connection Error"}</p>
        {error.digest && <p className="mt-2 text-xs opacity-70">Digest: {error.digest}</p>}
      </div>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
      >
        <RotateCcw className="w-4 h-4" />
        Retry Connection
      </button>
    </div>
  );
}
