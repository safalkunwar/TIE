"use client";

import { useRef } from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : 360;
    node.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="stories" className="section relative overflow-hidden">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Success stories"
            title={
              <>
                Real students.{" "}
                <span className="text-gradient-gold">Real offers.</span>
              </>
            }
            description="From Pokhara to Perth, Toronto to Tokyo — meet the students whose dreams became addresses."
          />
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scrollBy(-1)}
              className="grid h-11 w-11 place-items-center rounded-full glass text-mist transition-colors hover:bg-white/10"
              aria-label="Previous testimonials"
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="grid h-11 w-11 place-items-center rounded-full glass text-mist transition-colors hover:bg-white/10"
              aria-label="Next testimonials"
            >
              <Icon name="arrow" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12"
        >
          {testimonials.map((t) => (
            <article
              key={t.name}
              data-card
              className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-4xl border border-ink-line bg-ink-card/50 sm:w-[360px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  fill
                  sizes="360px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/20 to-transparent" />
                {/* "Play" — video-style affordance */}
                <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-strong text-gold">
                  <Icon name="play" className="ml-0.5 h-4 w-4" />
                </span>
                <span className="absolute right-4 top-4 glass rounded-full px-3 py-1 text-[11px] font-medium text-mist">
                  {t.flag} {t.destination}
                </span>
              </div>

              <div className="-mt-10 relative p-6">
                <p className="text-sm leading-relaxed text-mist">
                  <span className="text-gold">&ldquo;</span>
                  {t.quote}
                  <span className="text-gold">&rdquo;</span>
                </p>

                <div className="mt-5 border-t border-white/8 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-display text-base font-bold text-mist">
                        {t.name}
                      </div>
                      <div className="text-xs text-mist-muted">
                        {t.program}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-mist-muted">{t.university}</span>
                    <span className="rounded-full bg-mint/10 px-2.5 py-1 font-medium text-mint">
                      {t.scholarship}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {/* trailing spacer so last card snaps cleanly */}
          <div className="w-2 shrink-0 sm:w-12" aria-hidden />
        </div>
      </div>
    </section>
  );
}
