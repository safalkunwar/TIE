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
    value >= 1000 ? Math.round(animated).toLocaleString() : animated.toFixed(decimals ?? 0);

  return (
    <div className="card group relative overflow-hidden">
      <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
      <span
        ref={ref}
        className="font-display text-5xl font-bold tracking-tightest text-gradient-gold sm:text-6xl"
      >
        {prefix}
        {display}
        {suffix}
      </span>
      <div className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-mist">
        {label}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-mist-muted">{blurb}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative">
      <div className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
