"use client";

import Icon from "@/components/ui/Icon";
import type { ServicesData } from "@/data/company";
import { useReveal } from "@/hooks/useReveal";

export default function ServiceCard({ service }: { service: ServicesData }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal card group relative flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-azure/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ocean/10 text-ocean">
          <Icon name={service.icon} className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-ocean">
          {service.title.split(" ")[0]}
        </span>
      </div>
      <h3 className="font-display text-lg font-bold text-mist">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-mist-muted">
        {service.desc}
      </p>
      <ul className="mt-1 space-y-2">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-mist-muted">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm leading-relaxed text-mist-muted">
        {service.detail}
      </p>
    </div>
  );
}
