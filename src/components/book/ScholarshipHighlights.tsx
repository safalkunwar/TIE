"use client";

import Icon from "@/components/ui/Icon";
import StatusBadge from "@/components/ui/StatusBadge";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { scholarships, type Scholarship } from "@/data/consultation";

function formatDeadline(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ScholarshipCard({
  scholarship,
  onCheckEligibility,
}: {
  scholarship: Scholarship;
  onCheckEligibility: () => void;
}) {
  const s = scholarship;
  return (
    <article
      data-reveal
      className="card group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-2xl ring-1 ring-ink-line">
          {s.glyph}
        </span>
        <StatusBadge status={s.status} />
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ocean-deep">
        {s.name}
      </h3>

      {/* Coverage meter */}
      <div className="mt-4">
        <div className="flex items-end justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-mist-dim">
            Coverage
          </span>
          <span className="font-display text-2xl font-bold text-gradient-ocean">
            {s.coveragePct}%
          </span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sky-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-azure to-ocean transition-all duration-700 group-hover:brightness-110"
            style={{ width: `${s.coveragePct}%` }}
          />
        </div>
      </div>

      <dl className="mt-5 space-y-2.5 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-mist-dim">Max award</dt>
          <dd className="font-semibold text-ocean-deep">{s.maxAward}</dd>
        </div>
        <div className="flex items-start justify-between gap-3">
          <dt className="shrink-0 text-mist-dim">Eligible</dt>
          <dd className="text-right font-medium text-ocean-deep">
            {s.eligibleCountries.join(", ")}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-mist-dim">Deadline</dt>
          <dd className="font-semibold text-ocean-deep">{formatDeadline(s.deadlineISO)}</dd>
        </div>
      </dl>

      <p className="mt-4 rounded-2xl bg-sky-50/70 p-3 text-xs leading-relaxed text-mist-muted">
        {s.eligibility}
      </p>

      <button
        type="button"
        onClick={onCheckEligibility}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ocean-deep/5 px-5 py-3 text-sm font-semibold text-ocean-deep transition-all duration-200 hover:bg-ocean-deep hover:text-white"
      >
        Check my eligibility
        <Icon name="arrow" className="h-4 w-4" />
      </button>
    </article>
  );
}

export default function ScholarshipHighlights({
  onCheckEligibility,
}: {
  /** Scrolls/opens the estimator. Owned by parent so this stays reusable. */
  onCheckEligibility: () => void;
}) {
  const gridRef = useGsapReveal<HTMLDivElement>({ selector: "[data-reveal]" });

  return (
    <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {scholarships.map((s) => (
        <ScholarshipCard
          key={s.id}
          scholarship={s}
          onCheckEligibility={onCheckEligibility}
        />
      ))}
    </div>
  );
}
