"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { destinations, type Destination } from "@/data/destinations";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// 3D scene only on the client — keeps the bundle out of SSR and avoids
// window-less execution of three.js.
const GlobeScene = dynamic(() => import("@/three/GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="h-32 w-32 animate-spin-slow rounded-full border border-white/10 border-t-gold/60" />
    </div>
  ),
});

export default function Globe() {
  const [selected, setSelected] = useState<Destination | null>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Only render the WebGL canvas while the section is on-screen → saves GPU.
  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Tab visibility → pause
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const active = selected ?? destinations[0];

  return (
    <section id="globe" className="section relative overflow-hidden">
      {/* soft background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,140,255,0.5), transparent 60%)",
        }}
      />

      <div className="container-x">
        <SectionHeading
          eyebrow="One world. Eight destinations."
          title={
            <>
              Spin the globe.{" "}
              <span className="text-gradient-aurora">Find your future.</span>
            </>
          }
          description="Drag to explore. Tap a glowing pin to see universities, scholarships and visa pathways for each country."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Globe canvas */}
          <div
            ref={wrapper}
            className="relative aspect-square w-full max-w-[640px] place-self-center sm:aspect-[5/4]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.06),transparent_60%)]" />
            {inView && !paused && !reduced ? (
              <GlobeScene
                selected={selected?.slug ?? null}
                onSelect={setSelected}
              />
            ) : (
              <ReducedGlobe
                onSelect={setSelected}
                selected={selected?.slug ?? null}
              />
            )}
            {!reduced && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-mist-dim">
                Drag to rotate
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="glass-strong rounded-4xl p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-3xl leading-none">{active.flag}</span>
                  <span className="eyebrow !text-mist-muted">
                    {selected ? "Selected" : "Featured"} destination
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold text-mist">
                  {active.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-mist-muted">
                  {active.tagline}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <InfoCell label="Tuition" value={active.tuition} />
              <InfoCell label="Intake" value={active.intake} />
              <InfoCell label="Language" value={active.language} />
              <InfoCell label="Work" value={active.workWhileStudying} />
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <DetailRow icon="star" label="Top universities" value={active.topUniversities.slice(0, 2).join(", ")} />
              <DetailRow icon="shield" label="Post-study work" value={active.postStudyWork} />
              <DetailRow icon="cap" label="Scholarships" value={active.scholarships} />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {destinations.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => setSelected(d)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    (selected ?? destinations[0]).slug === d.slug
                      ? "bg-gold text-ink"
                      : "glass text-mist-muted hover:text-mist"
                  }`}
                >
                  {d.flag} {d.name}
                </button>
              ))}
            </div>

            <a href="#book" className="btn-primary mt-7 w-full">
              Plan my path to {active.name}
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-mist-dim">
        {label}
      </div>
      <div className="mt-1 font-medium text-mist">{value}</div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: "star" | "shield" | "cap";
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-mist-dim">
          {label}
        </div>
        <div className="text-mist">{value}</div>
      </div>
    </div>
  );
}

/** CSS-only fallback globe for reduced-motion / off-screen / low power. */
function ReducedGlobe({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (d: Destination) => void;
}) {
  return (
    <div className="relative grid h-full w-full place-items-center">
      <div
        className="relative grid h-[78%] aspect-square place-items-center rounded-full border border-white/10"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #14213f, #070b14 70%)",
          boxShadow: "inset 0 0 80px rgba(91,140,255,0.25)",
        }}
      >
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-grid-faint [background-size:28px_28px] opacity-30" />
        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <div className="text-5xl">{destinations.find((d) => d.slug === selected)?.flag ?? "🌍"}</div>
          <div className="text-xs uppercase tracking-[0.25em] text-mist-muted">
            {destinations.find((d) => d.slug === selected)?.name ?? "Explore"}
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {destinations.map((d) => (
          <button
            key={d.slug}
            onClick={() => onSelect(d)}
            className={`rounded-full px-3 py-1.5 text-xs transition-all ${
              (selected ?? destinations[0].slug) === d.slug
                ? "bg-gold text-ink"
                : "glass text-mist-muted hover:text-mist"
            }`}
          >
            {d.flag}
          </button>
        ))}
      </div>
    </div>
  );
}
