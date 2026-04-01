"use client";

import { useState, useTransition } from "react";
import { updateReservationStatus } from "../../actions/admin";

const STATUSES = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"];

export default function ReservationStatusSelect({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateReservationStatus(id, newStatus);
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isPending}
      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border focus:outline-none transition-colors disabled:opacity-50 appearance-none cursor-pointer ${
        currentStatus === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
        currentStatus === "CONFIRMED" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
        currentStatus === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
        "bg-destructive/10 text-destructive border-destructive/20"
      }`}
    >
      {STATUSES.map(s => (
        <option key={s} value={s} className="bg-background text-foreground">{s.replace(/_/g, " ")}</option>
      ))}
    </select>
  );
}
