"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        gsap.from(step, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="journey" ref={root} className="section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7fb0ff, transparent 60%)" }}
      />
      <div className="container-x">
        <SectionHeading
          eyebrow="The dream journey"
          title={
            <>
              From <span className="text-gradient-ocean">dream</span> to{" "}
              <span className="text-gradient-azure">career success</span>.
            </>
          }
          description="Seven milestones, one dedicated team. Here's exactly how we take you from a napkin sketch to a global career."
        />

        <div className="relative mt-16 pl-4 sm:pl-0">
          {/* Vertical track */}
          <div className="absolute left-[19px] top-2 h-[calc(100%-2rem)] w-px bg-ocean/15 sm:left-1/2 sm:-translate-x-1/2">
            <div
              ref={progress}
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-azure via-ocean to-ocean-deep"
            />
          </div>

          <ol className="space-y-10 sm:space-y-16">
            {journey.map((item, i) => {
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
                  <span className="absolute left-0 top-1 z-10 grid h-10 w-10 place-items-center rounded-full border border-azure/40 bg-white text-ocean shadow-card sm:left-1/2 sm:-translate-x-1/2">
                    <Icon name={item.icon as never} className="h-5 w-5" />
                  </span>

                  {/* Card */}
                  <div
                    className={`ml-14 sm:ml-0 ${
                      right ? "sm:col-start-2 [direction:ltr]" : "sm:text-right sm:pr-8"
                    }`}
                  >
                    <div className="card reveal">
                      <div
                        className={`flex items-center gap-3 ${
                          right ? "" : "sm:flex-row-reverse"
                        }`}
                      >
                        <span className="font-display text-sm font-bold text-ocean">
                          {item.step}
                        </span>
                        <span className="h-px flex-1 bg-ocean/15" />
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold text-ocean-deep">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer on the opposite side for desktop alternating layout */}
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
