"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { journey } from "@/data/journey";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DreamJourney() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const ctx = gsap.context(() => {
      if (progress.current) {
        gsap.to(progress.current, {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        });
      }

      const steps = root.current!.querySelectorAll<HTMLElement>("[data-step]");
      steps.forEach((step) => {
        const node = step.querySelector<HTMLElement>("[data-node]");
        const card = step.querySelector<HTMLElement>("[data-card]");
        const img = step.querySelector<HTMLElement>("[data-step-image]");

        gsap.set(card, { opacity: 0, y: 50, scale: 0.96 });
        gsap.set(node, { scale: 0.6, opacity: 0.5 });
        if (img) {
          gsap.set(img, { opacity: 0, x: 60, scale: 0.92 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "bottom 65%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }).to(
          node,
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          "-=0.4",
        );

        if (img) {
          tl.to(
            img,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.6",
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="journey" ref={root} className="section relative overflow-hidden">
      {/* === Background picture (low-opacity, atmospheric) === */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/gallery/team.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.07]"
        />
      </div>
      {/* soft blue tint over the photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(244,249,255,0.7) 0%, rgba(231,241,254,0.6) 50%, rgba(244,249,255,0.85) 100%)",
        }}
      />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="The dream journey"
          title={
            <>
              From <span className="text-gradient-ocean">dream</span> to{" "}
              <span className="text-gradient-azure">career success</span>.
            </>
          }
          description="Seven milestones, one dedicated team. Scroll through the story of how we take you from a napkin sketch to a global career."
        />

        <div className="relative mt-16 pl-4 sm:pl-0">
          {/* Vertical track */}
          <div className="absolute left-[19px] top-2 h-[calc(100%-2rem)] w-px bg-ocean/15 sm:left-1/2 sm:-translate-x-1/2">
            <div
              ref={progress}
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-azure via-ocean to-ocean-deep"
            />
          </div>

          <ol className="space-y-12 sm:space-y-20">
            {journey.map((item, i) => {
              // Strict alternation: even = left, odd = right
              const right = i % 2 === 1;
              return (
                <li
                  key={item.id}
                  data-step
                  className={`relative flex items-start gap-5 sm:grid sm:grid-cols-2 sm:gap-12 ${
                    right ? "sm:[direction:rtl]" : ""
                  }`}
                >
                  {/* Node dot */}
                  <span
                    data-node
                    className="absolute left-0 top-1 z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-azure/40 bg-white text-ocean shadow-card sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <Icon name={item.icon as never} className="h-5 w-5" />
                  </span>

                  {/* Card + Image row */}
                  <div
                    className={`ml-16 sm:ml-0 ${
                      right
                        ? "sm:col-start-2 [direction:ltr]"
                        : "sm:col-start-1 sm:text-right sm:pr-8"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-stretch gap-4">
                      {/* Text card */}
                      <div data-card className="card relative overflow-hidden flex-1 min-w-0">
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-azure to-ocean" />
                        <div
                          className={`flex items-center gap-3 ${
                            right ? "" : "sm:flex-row-reverse"
                          }`}
                        >
                          <span className="font-display text-sm font-bold text-ocean">
                            {item.step}
                          </span>
                          <span className="h-px flex-1 bg-ocean/15" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mist-dim">
                            Step {i + 1} of {journey.length}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-2xl font-bold text-mist">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                          {item.description}
                        </p>
                      </div>

                      {/* Story image — appears on the right of the card */}
                      <div
                        data-step-image
                        className="relative w-full lg:w-48 xl:w-56 flex-shrink-0 aspect-[4/3] lg:aspect-auto rounded-xl overflow-hidden shadow-lg ring-1 ring-ocean/10"
                      >
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 224px"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {/* subtle gradient overlay for polish */}
                        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/20 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* empty grid cell for spacing */}
                  <div className="hidden sm:block" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
