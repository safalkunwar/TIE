"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { trustStats, type TrustStat } from "@/data/consultation";

function TrustStatCard({ stat }: { stat: TrustStat }) {
  const { value: animated, ref } = useCountUp(stat.value, 1800, stat.decimals ?? 0);
  const display =
    stat.value >= 1000
      ? Math.round(animated).toLocaleString()
      : animated.toFixed(stat.decimals ?? 0);

  return (
    <div className="glass group relative flex flex-col items-center overflow-hidden rounded-4xl border border-ink-line p-5 text-center shadow-blue-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <span className="text-2xl">{stat.glyph}</span>
      <span
        ref={ref}
        className="mt-2 font-display text-3xl font-bold tracking-tightest text-gradient-ocean"
      >
        {stat.prefix}
        {display}
        {stat.suffix}
      </span>
      <span className="mt-1 text-xs font-semibold leading-tight text-mist-muted">
        {stat.label}
      </span>
    </div>
  );
}

/** Trust-signal strip shown near the booking flow. Data-driven + reusable. */
export default function TrustBuilders() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {trustStats.map((s) => (
        <TrustStatCard key={s.label} stat={s} />
      ))}
    </div>
  );
}
