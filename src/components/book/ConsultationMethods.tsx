"use client";

import Icon from "@/components/ui/Icon";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import {
  consultationMethods,
  type ConsultationMethod,
  type ConsultationMethodId,
} from "@/data/consultation";

const accentRing: Record<ConsultationMethod["accent"], string> = {
  azure: "group-hover:ring-azure/40",
  gold: "group-hover:ring-gold/40",
  emerald: "group-hover:ring-emerald-400/40",
};

const accentGlow: Record<ConsultationMethod["accent"], string> = {
  azure: "bg-azure/15",
  gold: "bg-gold/15",
  emerald: "bg-emerald-400/15",
};

const accentText: Record<ConsultationMethod["accent"], string> = {
  azure: "text-azure",
  gold: "text-gold",
  emerald: "text-emerald-600",
};

type Props = {
  selectedId: ConsultationMethodId | null;
  onSelect: (id: ConsultationMethodId) => void;
};

/**
 * Interactive consultation-method cards. Presentational + selection only — the
 * parent owns what happens next (opens scheduler, etc.), so this stays reusable.
 */
export default function ConsultationMethods({ selectedId, onSelect }: Props) {
  const gridRef = useGsapReveal<HTMLDivElement>({ selector: "[data-method-card]" });

  return (
    <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
      {consultationMethods.map((method) => {
        const active = selectedId === method.id;
        return (
          <button
            key={method.id}
            type="button"
            data-method-card
            onClick={() => onSelect(method.id)}
            aria-pressed={active}
            className={`group relative flex flex-col overflow-hidden rounded-4xl border p-7 text-left transition-all duration-300 focus-visible:outline-none ${
              active
                ? "border-azure/60 bg-white shadow-card-hover ring-2 ring-azure/50"
                : "border-ink-line glass shadow-blue-soft hover:-translate-y-1.5 hover:shadow-card-hover"
            }`}
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className={`pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${accentGlow[method.accent]} ${
                active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />

            {method.badge && (
              <span className="absolute right-5 top-5 rounded-full bg-ocean-deep px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                {method.badge}
              </span>
            )}

            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-blue-soft ring-1 ring-ink-line transition-all duration-300 ${accentRing[method.accent]}`}
            >
              {method.glyph}
            </span>

            <h3 className="mt-5 font-display text-xl font-bold text-ocean-deep">
              {method.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">
              {method.summary}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-ocean-deep">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {method.duration}
            </div>

            <ul className="mt-5 space-y-2.5">
              {method.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-mist-muted">
                  <Icon
                    name="check"
                    className={`mt-0.5 h-4 w-4 shrink-0 ${accentText[method.accent]}`}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <span
              className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-azure to-ocean text-white shadow-blue-soft"
                  : "bg-ocean-deep/5 text-ocean-deep group-hover:bg-ocean-deep group-hover:text-white"
              }`}
            >
              {active ? "Selected" : method.cta}
              <Icon name="arrow" className="h-4 w-4" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
