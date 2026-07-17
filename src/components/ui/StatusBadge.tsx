import { scholarshipStatusMeta, type ScholarshipStatus } from "@/data/consultation";

const toneClasses: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

/**
 * Small pill communicating scholarship availability. Purely presentational —
 * status meta (label + tone) is data-driven so it can come from an API later.
 */
export default function StatusBadge({ status }: { status: ScholarshipStatus }) {
  const meta = scholarshipStatusMeta[status];
  const dotClass =
    meta.tone === "emerald"
      ? "bg-emerald-500"
      : meta.tone === "amber"
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneClasses[meta.tone]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dotClass} ${
          meta.tone === "rose" ? "animate-pulse" : ""
        }`}
      />
      {meta.label}
    </span>
  );
}
