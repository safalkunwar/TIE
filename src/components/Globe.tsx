"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { destinations, type Destination } from "@/data/destinations";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import CountryFlag from "@/components/ui/CountryFlag";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GlobeScene = dynamic(() => import("@/three/GlobeScene"), {
  ssr: false,
  loading: () => <MapPreview loading />,
});

class GlobeBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function Globe({ countries }: { countries?: Destination[] }) {
  const displayCountries = countries ?? destinations;
  const [selected, setSelected] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [rotating, setRotating] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = wrapper.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    }, { threshold: 0.05, rootMargin: "100px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const active = displayCountries.find((country) => country.slug === selected) ?? displayCountries[0];
  const mapCountries = useMemo(() => displayCountries.filter((country) =>
    Number.isFinite(country.lat) && Number.isFinite(country.lng) &&
    Math.abs(country.lat) <= 90 && Math.abs(country.lng) <= 180 &&
    !(country.lat === 0 && country.lng === 0),
  ), [displayCountries]);

  const selectCountry = (country: Destination) => {
    setSelected(country.slug);
    setRotating(false);
  };

  return (
    <section id="globe" className="section relative scroll-mt-24">
      <div className="container-x">
        <SectionHeading
          eyebrow={`One world. ${displayCountries.length} destinations.`}
          title={<>Spin the globe.<br /><span className="text-gradient-ocean">Find your future.</span></>}
          description="A world of possibilities, with Nepal at the heart. Explore a destination and find the next chapter of your story."
        />

        <div className="globe-explorer mt-12">
          <div ref={wrapper} className="globe-stage">
            <div className="absolute left-5 top-5 z-40 flex items-center gap-2.5 rounded-full border border-white/90 bg-white/90 py-2 pl-2 pr-4 shadow-sm sm:left-7 sm:top-7">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-50"><Image src="/gallery/tie-logo.png" alt="TIE" width={30} height={30} /></span>
              <div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-mist-dim">Your starting point</p><p className="text-xs font-bold text-ocean-deep">Pokhara, Nepal</p></div>
            </div>
            <span aria-hidden className="absolute right-7 top-8 z-40 flex flex-col items-center gap-1 text-[10px] font-bold text-ocean-deep/60"><span>N</span><Icon name="compass" className="h-6 w-6" /></span>
            <div className="globe-shadow" aria-hidden />
            <div className="globe-canvas" role="group" aria-label="Interactive world map. Drag to rotate, or use the destination buttons below.">
              {loaded ? (
                <GlobeBoundary fallback={<MapPreview />}>
                  <GlobeScene
                    countries={mapCountries}
                    selected={selected}
                    onSelect={selectCountry}
                    running={inView && pageVisible}
                    autoRotate={rotating}
                    reducedMotion={reduced}
                    resetKey={resetKey}
                  />
                </GlobeBoundary>
              ) : <MapPreview loading />}
            </div>
            <div className="absolute inset-x-4 bottom-5 z-40 flex flex-wrap items-center justify-center gap-2">
              <button type="button" className="map-control" onClick={() => { setSelected(null); setResetKey((key) => key + 1); }} aria-label="Reset globe to Nepal">
                <Icon name="home" className="h-3.5 w-3.5" /> Recenter
              </button>
              {!reduced && <button type="button" className="map-control" aria-pressed={rotating} onClick={() => {
                if (!rotating) setSelected(null);
                setRotating(!rotating);
              }}><span aria-hidden>{rotating ? "Ⅱ" : "▷"}</span>{rotating ? "Pause spin" : "Auto spin"}</button>}
              <span className="hidden text-[10px] text-mist-muted sm:ml-2 sm:inline">Drag to explore · Tap a pin</span>
            </div>
          </div>

          {active ? <div className="globe-details">
            <div aria-live="polite" aria-atomic="true">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ocean"><span className="h-1.5 w-1.5 rounded-full bg-azure" />{selected ? "Your next chapter" : "Destination spotlight"}</span>
                <Icon name="plane" className="h-5 w-5 text-ocean/50" />
              </div>
              <h3 className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight text-ocean-deep sm:text-4xl"><CountryFlag slug={active.slug} name={active.name} flag={active.flag} />{active.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-muted">{active.tagline}</p>
              <div className="my-6 grid grid-cols-2 gap-3">
                <InfoCell label="Tuition / year" value={active.tuition} icon="cap" />
                <InfoCell label="Main intakes" value={active.intake} icon="compass" />
              </div>
              <dl className="space-y-4 text-sm">
                <DetailRow label="Language" value={active.language} />
                <DetailRow label="While you study" value={active.workWhileStudying} />
                <DetailRow label="After graduation" value={active.postStudyWork} />
              </dl>
              <div className="mt-6 rounded-2xl border border-ocean/10 bg-sky-50/70 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-ocean-deep"><Icon name="spark" className="h-4 w-4" /> Scholarship possibilities</div>
                <p className="mt-2 text-xs leading-relaxed text-mist-muted">{active.scholarships || "Explore available awards with your counsellor."}</p>
              </div>
            </div>
            <Link href={`/country/${active.slug}`} className="btn-primary mt-6 w-full">Explore {active.name}<Icon name="arrow" className="h-4 w-4" /></Link>
            <Link href="/book" className="mt-3 block text-center text-xs font-semibold text-ocean hover:underline">Let’s plan your journey together</Link>
          </div> : <div className="globe-details flex flex-col justify-center">
            <h3 className="font-display text-2xl font-bold text-ocean-deep">Your journey starts with a conversation.</h3>
            <p className="mt-3 text-sm text-mist-muted">Our team can help you explore your study options.</p>
            <Link href="/book" className="btn-primary mt-6">Book a free consultation</Link>
          </div>}
        </div>
        {displayCountries.length > 0 && <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choose a study destination">
          {displayCountries.map((country) => (
            <button
              type="button"
              key={country.slug}
              onClick={() => selectCountry(country)}
              aria-pressed={active?.slug === country.slug}
              className={`destination-chip ${active?.slug === country.slug ? "is-active" : ""}`}
            ><CountryFlag slug={country.slug} name={country.name} flag={country.flag} className="!h-4 !w-5" />{country.name}<Icon name="arrow" className="h-3 w-3" /></button>
          ))}
        </div>}
      </div>
    </section>
  );
}

function InfoCell({ label, value, icon }: { label: string; value: string; icon: "cap" | "compass" }) {
  return <div className="rounded-2xl border border-ocean/10 bg-white p-3.5"><div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-mist-dim"><Icon name={icon} className="h-3.5 w-3.5" />{label}</div><p className="text-sm font-bold text-ocean-deep">{value || "Ask your counsellor"}</p></div>;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[7.5rem_1fr] gap-3"><dt className="text-xs text-mist-dim">{label}</dt><dd className="text-xs font-semibold leading-relaxed text-mist-muted">{value || "Ask your counsellor"}</dd></div>;
}

function MapPreview({ loading = false }: { loading?: boolean }) {
  return <div className="flex h-full flex-col items-center justify-center gap-5 px-5">
    <div className="relative w-full overflow-hidden rounded-3xl border border-white bg-sky-100 shadow-blue-soft">
      <Image src="/maps/world.svg" alt="World map showing the continents" width={1440} height={720} />
      <div className="absolute left-[73.3%] top-[34.3%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-300 bg-white p-1 shadow-md"><Image src="/gallery/tie-logo.png" alt="TIE Nepal" width={28} height={28} /></div>
    </div>
    <p className="text-center text-xs text-mist-muted" role="status">{loading ? "Getting your world ready…" : "Map preview · Choose any destination below to explore."}</p>
  </div>;
}
