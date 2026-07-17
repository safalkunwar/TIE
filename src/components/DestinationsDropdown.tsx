"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Icon from "@/components/ui/Icon";

type CountryPreview = {
  slug: string;
  name: string;
  flag: string;
  tagline: string;
  tuition: string;
  scholarships: string;
  visaPathway: string;
  postStudyWork: string;
  workWhileStudying: string;
  intake: string;
};

const slugToIso: Record<string, string> = {
  "australia": "au",
  "canada": "ca",
  "uk": "gb",
  "usa": "us",
  "japan": "jp",
  "new-zealand": "nz",
  "ireland": "ie",
  "denmark": "dk",
};

export default function DestinationsDropdown({
  countries,
  isOpen,
}: {
  countries: CountryPreview[];
  isOpen: boolean;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryPreview | null>(null);

  // Animate the main dropdown
  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power3.out",
        display: "block",
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.97,
        filter: "blur(8px)",
        duration: 0.2,
        ease: "power2.in",
        display: "none",
      });
      setHoveredCountry(null);
    }
  }, [isOpen]);

  // Animate the preview panel when a country is hovered
  useEffect(() => {
    if (!previewRef.current) return;

    if (hoveredCountry) {
      gsap.killTweensOf(previewRef.current);
      // Set initial state for slide in
      gsap.set(previewRef.current, {
        opacity: 0,
        x: -10,
        display: "block",
      });
      // Animate in
      gsap.to(previewRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      gsap.to(previewRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.2,
        ease: "power2.in",
        display: "none",
      });
    }
  }, [hoveredCountry]);

  return (
    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 z-50">
      {/* Invisible Hover Bridge is handled by the pt-3 padding above which keeps the mouse over the container */}
      
      <div 
        className="relative flex items-start gap-4"
        onMouseLeave={() => setHoveredCountry(null)}
      >
        {/* Main Dropdown List (480px width) */}
        <div
          ref={menuRef}
          className="hidden w-[480px] rounded-[24px] border border-white/40 bg-white/70 p-4 shadow-2xl shadow-blue-900/5 backdrop-blur-xl"
          style={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(8px)" }}
        >
          <div className="flex flex-col gap-1">
            {countries.map((country) => (
              <div
                key={country.slug}
                onMouseEnter={() => setHoveredCountry(country)}
                className="group relative flex cursor-pointer items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-[2px] hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-white/80 hover:shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)]"
              >
                <div className="flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <img 
                    src={`https://flagcdn.com/${slugToIso[country.slug] || 'un'}.svg`} 
                    alt={`${country.name} flag`}
                    className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{country.name}</div>
                  <div className="text-sm text-slate-500 line-clamp-1">{country.tagline}</div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-4">
                  <Icon name="arrow" className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Preview Panel (Appears on the right) */}
        <div
          ref={previewRef}
          className="hidden w-[400px] shrink-0 rounded-[24px] border border-white/40 bg-white/95 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-xl"
          style={{ opacity: 0, x: -10 }}
        >
          {hoveredCountry && (
            <div className="flex h-full flex-col">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <img 
                  src={`https://flagcdn.com/${slugToIso[hoveredCountry.slug] || 'un'}.svg`} 
                  alt={`${hoveredCountry.name} flag`}
                  className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200"
                />
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">{hoveredCountry.name}</h3>
                  <p className="text-sm text-slate-500">{hoveredCountry.tagline}</p>
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-y-5 gap-x-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Top Universities</span>
                  <p className="text-sm font-medium text-slate-800">Available</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Scholarships</span>
                  <p className="text-sm font-medium text-slate-800">{hoveredCountry.scholarships ? "Available" : "Limited"}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tuition Fee</span>
                  <p className="text-sm font-medium text-slate-800">{hoveredCountry.tuition}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Part-time Work</span>
                  <p className="text-sm font-medium text-slate-800">{hoveredCountry.workWhileStudying}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Post Study Work</span>
                  <p className="text-sm font-medium text-slate-800">{hoveredCountry.postStudyWork}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Intake</span>
                  <p className="text-sm font-medium text-slate-800">{hoveredCountry.intake}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Visa Guidance</span>
                  <p className="text-sm font-medium text-slate-800">{hoveredCountry.visaPathway}</p>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <Link
                  href={`/country/${hoveredCountry.slug}`}
                  onClick={() => setHoveredCountry(null)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Explore Destination
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
