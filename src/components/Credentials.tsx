"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

type Cred = {
  src: string;
  title: string;
  caption: string;
  /** Aspect ratio hint for layout. */
  tall?: boolean;
};

const items: Cred[] = [
  {
    src: "/gallery/govt-approval.jpg",
    title: "Government Approval",
    caption:
      "Renewal of service operation approved by the Ministry of Education, Government of Nepal.",
    tall: true,
  },
  {
    src: "/gallery/icef-accredited.png",
    title: "ICEF Trusted Agency",
    caption:
      "Accredited by ICEF as a trusted international education agency.",
  },
  {
    src: "/gallery/icef-workshop.jpg",
    title: "ICEF South Asia, Colombo",
    caption:
      "Our team at the ICEF South Asia Workshop — building direct university relationships.",
    tall: true,
  },
  {
    src: "/gallery/team.jpg",
    title: "The TIE Nepal Team",
    caption:
      "The counsellors who turn your study-abroad dream into a flight ticket.",
    tall: true,
  },
];

export default function Credentials() {
  const [lightbox, setLightbox] = useState<Cred | null>(null);

  return (
    <section id="credentials" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Credentials & approvals"
          title={
            <>
              Proof, not{" "}
              <span className="text-gradient-ocean">promises.</span>
            </>
          }
          description="Anyone can claim to be an expert. These are the real certificates, accreditations and people behind TIE Nepal — verified, official, and yours to inspect."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setLightbox(item)}
              className="reveal group relative flex flex-col overflow-hidden rounded-4xl border border-ink-line bg-white text-left shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
              style={{ transitionDelay: `${(i % 4) * 0.08}s` }}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  item.tall ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-ocean-deep/5 to-transparent" />
                {/* zoom affordance */}
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ocean opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M11 8v6M8 11h6M21 21l-4.3-4.3" />
                  </svg>
                </span>
              </div>
              <div className="relative -mt-12 p-5">
                <h3 className="font-display text-lg font-bold text-white drop-shadow">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-sky-100">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-azure opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View full
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
        >
          <div className="absolute inset-0 bg-ocean-deep/80 backdrop-blur-md" />
          <figure
            className="relative max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-4xl border border-white/20 bg-white shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ocean-deep transition-colors hover:bg-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="relative max-h-[70vh] w-full">
              <Image
                src={lightbox.src}
                alt={lightbox.caption}
                width={1200}
                height={1500}
                className="h-auto max-h-[70vh] w-full object-contain"
              />
            </div>
            <figcaption className="border-t border-ink-line p-5">
              <div className="font-display text-lg font-bold text-ocean-deep">
                {lightbox.title}
              </div>
              <p className="mt-1 text-sm text-mist-muted">{lightbox.caption}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
