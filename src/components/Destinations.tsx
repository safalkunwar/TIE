"use client";

import Image from "next/image";
import Link from "next/link";
import { destinations as staticDestinations } from "@/data/destinations";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { useReveal } from "@/hooks/useReveal";

export default function Destinations({ countries }: { countries?: any[] }) {
  const displayCountries = countries || staticDestinations;

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
          {displayCountries.map((d, i) => (
            <DestinationCard key={d.slug} country={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ country, index }: { country: any; index: number }) {
  const d = country;
  const ref = useReveal<HTMLAnchorElement>({ threshold: 0.15 });
  const delay = `${(index % 4) * 0.08}s`;

  return (
    <Link
      ref={ref}
      href={`/country/${d.slug}`}
      className="reveal group relative block overflow-hidden rounded-4xl border border-ink-line bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
      style={{ transitionDelay: delay }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={d.image}
          alt={`${d.name} — ${d.tagline?.split(",")[0] || ""}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/25 to-transparent" />
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
          {d.tuition?.split(" ")[0]}
        </div>

        {/* Country name over the image bottom */}
        <h3 className="absolute inset-x-0 bottom-4 px-5 font-display text-2xl font-bold text-white drop-shadow-lg">
          {d.name}
        </h3>
      </div>

      {/* Card body — dark text on the white card so it's always readable */}
      <div className="p-5">
        <p className="text-sm leading-relaxed text-mist-muted">
          {d.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.topUniversities?.slice(0, 2).map((u: string) => (
            <span
              key={u}
              className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-ocean-deep ring-1 ring-ink-line"
            >
              {u}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-ocean transition-all duration-300 group-hover:gap-3">
          Explore pathway
          <Icon
            name="arrow"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
