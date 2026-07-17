"use client";

import { useReveal } from "@/hooks/useReveal";
import Icon from "@/components/ui/Icon";

/**
 * Premium "13+ Years of Trust" banner — builds immediate credibility right
 * below the hero. Animated gradient border, glass surface, key credentials.
 */
export default function TrustBanner() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="relative -mt-8 z-10">
      <div className="container-x">
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-4xl border border-ink-line bg-white p-6 shadow-card sm:p-8"
        >
          {/* gradient accent line top */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-azure via-ocean to-indigo-400" />

          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
            {/* Big number */}
            <div className="flex items-center gap-4">
              <span className="font-display text-6xl font-extrabold leading-none text-gradient-ocean sm:text-7xl">
                13<span className="text-4xl">+</span>
              </span>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-mist">
                  Years
                </span>
                <span className="text-sm text-mist-muted">of trust</span>
              </div>
            </div>

            <div className="hidden h-14 w-px bg-ink-line lg:block" />

            {/* Credentials */}
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:justify-start">
              {[
                { icon: "shield" as const, t: "Govt. Approved", s: "Ministry of Education" },
                { icon: "star" as const, t: "ICEF Accredited", s: "Trusted Agency" },
                { icon: "cap" as const, t: "ECAN Member", s: "Verified practice" },
                { icon: "globe" as const, t: "8 Countries", s: "Global network" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-bold text-mist">{c.t}</div>
                    <div className="text-xs text-mist-muted">{c.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
