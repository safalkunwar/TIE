"use client";

import { stats } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";

function MiniStat({ label, value, suffix, prefix, decimals }: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const { value: animated, ref } = useCountUp(value, 2000, decimals ?? 0);
  const display =
    value >= 1000
      ? Math.round(animated).toLocaleString()
      : animated.toFixed(decimals ?? 0);

  return (
    <div className="flex shrink-0 flex-col items-center gap-1 px-4">
      <span
        ref={ref}
        className="font-display text-2xl font-bold tracking-tight text-ocean-deep sm:text-3xl"
      >
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-mist-muted">
        {label}
      </span>
    </div>
  );
}

export default function MobileStats() {
  return (
    <div className="lg:hidden">
      <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white/90 px-2 py-4 shadow-sm backdrop-blur-sm">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex w-1/2 shrink-0 snap-center items-center justify-center border-r border-slate-100 last:border-r-0"
            >
              <MiniStat {...s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
