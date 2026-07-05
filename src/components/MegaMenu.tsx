"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Icon from "@/components/ui/Icon";

type CountryPreview = {
  slug: string;
  name: string;
  flag: string;
  tagline: string;
  tuition: string;
  image: string;
  scholarships: string;
  visaPathway: string;
};

export default function MegaMenu({
  countries,
  isOpen,
  onClose,
}: {
  countries: CountryPreview[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeCountry, setActiveCountry] = useState<CountryPreview | null>(
    countries[0] || null
  );

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: 10,
        scale: 0.98,
        filter: "blur(4px)",
        duration: 0.2,
        ease: "power2.in",
        display: "none",
      });
    }
  }, [isOpen]);

  const handleHover = (country: CountryPreview) => {
    if (activeCountry?.slug === country.slug) return;
    setActiveCountry(country);
  };

  return (
    <div
      ref={menuRef}
      className="absolute left-1/2 top-[calc(100%+10px)] hidden w-[90vw] max-w-[1200px] -translate-x-1/2 transform rounded-3xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-2xl"
      style={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
      onMouseLeave={onClose}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Country Grid */}
        <div className="flex-1 p-8">
          <h3 className="mb-6 text-xl font-semibold text-gray-900">Explore Destinations</h3>
          <div className="grid grid-cols-2 gap-4">
            {countries.map((country) => (
              <Link
                href={`/country/${country.slug}`}
                key={country.slug}
                onMouseEnter={() => handleHover(country)}
                className={`group relative flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 ${
                  activeCountry?.slug === country.slug
                    ? "bg-white shadow-lg scale-[1.03]"
                    : "hover:bg-white/50"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {country.flag}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{country.name}</div>
                  <div className="text-xs text-gray-500">{country.tuition}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="relative w-[400px] shrink-0 overflow-hidden rounded-r-3xl bg-gray-900 p-8 text-white">
          {activeCountry && (
            <div className="absolute inset-0 transition-opacity duration-300">
              <div className="absolute inset-0 opacity-40">
                <Image
                  src={activeCountry.image || "/gallery/icef-workshop.jpg"}
                  alt={activeCountry.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
              
              <div className="relative flex h-full flex-col justify-end">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{activeCountry.flag}</span>
                  <h3 className="text-3xl font-bold">{activeCountry.name}</h3>
                </div>
                
                <p className="mb-6 text-sm text-gray-300 line-clamp-3">
                  {activeCountry.tagline}
                </p>
                
                <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Tuition</div>
                    <div className="font-semibold">{activeCountry.tuition}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Post-Study Work</div>
                    <div className="font-semibold">{activeCountry.visaPathway}</div>
                  </div>
                </div>

                <Link
                  href={`/country/${activeCountry.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-6 py-3 font-semibold text-white transition-all hover:bg-ocean-deep"
                >
                  Explore {activeCountry.name}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
