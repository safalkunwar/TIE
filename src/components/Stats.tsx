"use client";

import { stats } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({
  value,
  suffix,
  prefix,
  decimals,
  label,
  blurb,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  blurb: string;
}) {
  const { value: animated, ref } = useCountUp(value, 2000, decimals ?? 0);
  const display =
    value >= 1000
      ? Math.round(animated).toLocaleString()
      : animated.toFixed(decimals ?? 0);

  return (
    <div className="card group relative overflow-hidden p-4 sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-azure/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <span
        ref={ref}
        className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tightest text-gradient-ocean"
      >
        {prefix}
        {display}
        {suffix}
      </span>
      <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-ocean-deep">
        {label}
      </div>
      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-mist-muted">{blurb}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
