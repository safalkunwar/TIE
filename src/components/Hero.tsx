"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { company } from "@/data/company";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const words = root.current!.querySelectorAll<HTMLElement>("[data-word]");
      if (reduced) {
        gsap.set(words, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(words, { opacity: 0, y: "0.5em", rotateX: -40 });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.2,
      });

      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.7,
      });

      gsap.to("[data-hero-parallax]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !glow.current) return;
    const node = glow.current;
    const move = (e: MouseEvent) => {
      gsap.to(node, {
        x: e.clientX - node.offsetWidth / 2,
        y: e.clientY - node.offsetHeight / 2,
        duration: 0.6,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduced]);

  const headline = "Your Future Has No Borders.";

  return (
    <section
      id="top"
      ref={root}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* === Premium animated gradient mesh background (no photo) === */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-sky-50 via-white to-sky-100" />

      {/* Animated floating gradient orbs */}
      {!reduced && (
        <>
          <div className="absolute -left-32 top-20 -z-10 h-[500px] w-[500px] animate-float rounded-full bg-gradient-to-br from-azure/30 to-ocean/20 blur-[100px]" />
          <div
            className="absolute -right-20 top-40 -z-10 h-[440px] w-[440px] animate-float rounded-full bg-gradient-to-br from-sky-300/40 to-azure/25 blur-[100px]"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-gradient-to-br from-indigo-300/25 to-sky-300/30 blur-[100px]"
            style={{ animationDelay: "4s" }}
          />
        </>
      )}

      {/* Subtle grid texture overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint [background-size:64px_64px] opacity-40" />

      {/* Cursor-follow glow */}
      {!reduced && (
        <div
          ref={glow}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-10 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(43,138,240,0.30), transparent 60%)",
          }}
        />
      )}

      <div className="container-x relative w-full">
        <div className="max-w-4xl">
          {/* Announcement pill */}
          <div data-hero-fade className="mb-7 inline-flex">
            <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-ocean-deep">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure" />
              </span>
              Feb &amp; Sep 2026 intakes — applications now open
            </span>
          </div>

          {/* Headline with per-word reveal — dark text for premium contrast */}
          <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.98] tracking-tightest text-mist [perspective:600px]">
            <span className="block">
              {headline.split(" ").map((word, i) => (
                <span
                  key={i}
                  data-word
                  className={`mr-[0.22em] inline-block ${
                    word === "Borders." ? "text-gradient-ocean" : ""
                  }`}
                  style={
                    word === "Borders."
                      ? { filter: "drop-shadow(0 4px 24px rgba(43,138,240,0.35))" }
                      : undefined
                  }
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-7 max-w-xl text-lg leading-relaxed text-mist-muted sm:text-xl"
          >
            {company.blurb} Turn your dream of studying abroad into reality —
            expert counselling, university placement, visa support and
            career-focused pathways across 8 destinations.{" "}
            <span className="font-semibold text-ocean-deep">
              {company.tagline}.
            </span>
          </p>

          {/* CTAs */}
          <div
            data-hero-fade
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href="#book">Book Free Consultation</MagneticButton>
            <MagneticButton href="#globe" variant="ghost">
              <Icon name="globe" className="h-4 w-4" />
              Explore Destinations
            </MagneticButton>
          </div>

          {/* Floating glass stat chips */}
          <div
            data-hero-fade
            data-hero-parallax
            className="mt-16 flex flex-wrap gap-3"
          >
            {[
              { k: "13+ yrs", v: "Trusted in Pokhara" },
              { k: "97% visa", v: "Success rate" },
              { k: "350+", v: "Partner universities" },
            ].map((chip) => (
              <div
                key={chip.k}
                className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 shadow-blue-soft"
              >
                <span className="font-display text-lg font-bold text-gradient-ocean">
                  {chip.k}
                </span>
                <span className="h-7 w-px bg-mist/15" />
                <span className="text-xs font-medium text-mist-muted">
                  {chip.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <a
          href="#globe"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-muted transition-colors hover:text-ocean-deep md:flex"
          aria-label="Scroll to explore"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-ocean/30 p-1">
            <span className="h-2 w-1 animate-float rounded-full bg-ocean/60" />
          </span>
        </a>
      )}
    </section>
  );
}
