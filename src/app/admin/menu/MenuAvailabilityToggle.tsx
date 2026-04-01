"use client";

import { useTransition } from "react";
import { toggleMenuItem } from "../../actions/admin";

export default function MenuAvailabilityToggle({ id, isAvailable }: { id: string, isAvailable: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleMenuItem(id, !isAvailable);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 ${
        isAvailable ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span className="sr-only">Toggle availability</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isAvailable ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
