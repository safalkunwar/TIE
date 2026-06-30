"use client";

import Image from "next/image";
import { destinations } from "@/data/destinations";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { useReveal } from "@/hooks/useReveal";

export default function Destinations() {
  return (
    <section id="destinations" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Destination explorer"
          title={
            <>
              Eight countries.{" "}
              <span className="text-gradient-ocean">Infinite possibility.</span>
            </>
          }
          description="Each destination has its own character, cost and visa pathway. Hover to explore — then book a free consultation to get the full picture for your profile."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <DestinationCard key={d.slug} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ index }: { index: number }) {
  const d = destinations[index];
  const ref = useReveal<HTMLAnchorElement>({ threshold: 0.15 });
  const delay = `${(index % 4) * 0.08}s`;

  return (
    <a
      ref={ref}
      href="#book"
      className="reveal group relative block overflow-hidden rounded-4xl border border-ink-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
      style={{ transitionDelay: delay }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={d.image}
          alt={`${d.name} — ${d.tagline.split(",")[0]}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover opacity-90 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/20 to-transparent" />
        <div
          className="absolute inset-x-0 bottom-0 h-1 opacity-80"
          style={{ background: d.accent }}
        />

        {/* Flag + tuition chip */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="glass-strong grid h-9 w-9 place-items-center rounded-xl text-lg shadow-blue-soft">
            {d.flag}
          </span>
        </div>
        <div className="absolute right-4 top-4 glass-strong rounded-full px-3 py-1.5 text-[11px] font-semibold text-ocean-deep shadow-blue-soft">
          {d.tuition.split(" ")[0]}
        </div>
      </div>

      <div className="relative -mt-16 p-5">
        <h3 className="font-display text-2xl font-bold text-white drop-shadow">
          {d.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-sky-100">
          {d.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.topUniversities.slice(0, 2).map((u) => (
            <span
              key={u}
              className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] text-white backdrop-blur"
            >
              {u}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
          Explore pathway
          <Icon
            name="arrow"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </a>
  );
}
