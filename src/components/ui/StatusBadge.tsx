import type { AvailabilityStatus } from "@/types";

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  const available = status === "available";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        available ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
      }`}
    >
      {available ? "Available" : "Planned"}
    </span>
  );
}
