"use client";

import Icon from "@/components/ui/Icon";
import type { TestPrepProgram } from "@/data/testPrep";
import { useReveal } from "@/hooks/useReveal";

export default function TestPrepCard({ program }: { program: TestPrepProgram }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal card group relative flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-azure/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ocean/10 text-ocean text-xl">
          {program.glyph}
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-mist">
            {program.name}
          </h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-ocean">
            Test Preparation
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-mist-muted">
        {program.summary}
      </p>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Format
          </dt>
          <dd className="mt-1 text-slate-700">{program.format}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Duration
          </dt>
          <dd className="mt-1 text-slate-700">{program.duration}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Scoring
          </dt>
          <dd className="mt-1 text-slate-700">{program.scoreScale}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Best for
          </dt>
          <dd className="mt-1 text-slate-700">{program.whoFor}</dd>
        </div>
      </dl>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ocean">
          Preparation focus
        </h4>
        <ul className="space-y-2">
          {program.focus.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-mist-muted">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto space-y-3 border-t border-slate-100 pt-4">
        {program.sections.map((s) => (
          <div key={s.heading}>
            <h5 className="text-sm font-bold text-mist">{s.heading}</h5>
            <p className="mt-1 text-sm leading-relaxed text-mist-muted">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
