"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Split-text reveal + parallax (runs once on mount)
  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Word-by-word reveal of the headline
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

      // Supporting layers fade in after the headline
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.7,
      });

      // Parallax on scroll
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

  // Cursor-follow glow
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
      {/* Background image (campus, cinematic) */}
      <div className="absolute inset-0 -z-20" data-hero-parallax>
        <Image
          src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Students walking across an international university campus at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      {/* Gradient mesh overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
      <div className="absolute inset-0 -z-10 bg-radial-fade" />
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(40% 50% at 18% 30%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(50% 50% at 85% 20%, rgba(91,140,255,0.22), transparent 60%), radial-gradient(45% 55% at 75% 85%, rgba(155,107,255,0.18), transparent 60%)",
        }}
      />

      {/* Cursor-follow glow */}
      {!reduced && (
        <div
          ref={glow}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-10 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.35), transparent 60%)",
          }}
        />
      )}

      <div className="container-x relative w-full">
        <div className="max-w-4xl">
          {/* Announcement pill */}
          <div data-hero-fade className="mb-7 inline-flex">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Feb &amp; Sep 2026 intakes — applications now open
            </span>
          </div>

          {/* Headline with per-word reveal */}
          <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.98] tracking-tightest text-mist">
            <span className="block [perspective:600px]">
              {headline.split(" ").map((word, i) => (
                <span
                  key={i}
                  data-word
                  className={`mr-[0.22em] inline-block ${
                    word === "Borders." ? "text-gradient-aurora" : ""
                  }`}
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
            Turn your dream of studying abroad into reality with expert guidance,
            university placement, visa support and career-focused pathways — across
            8 destinations worldwide.
          </p>

          {/* CTAs */}
          <div
            data-hero-fade
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href="#book">
              Book Free Consultation
              <Icon name="arrow" className="h-4 w-4" />
            </MagneticButton>
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
                className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
              >
                <span className="font-display text-lg font-bold text-gradient-gold">
                  {chip.k}
                </span>
                <span className="h-7 w-px bg-white/10" />
                <span className="text-xs text-mist-muted">{chip.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <a
          href="#globe"
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-muted transition-colors hover:text-mist md:flex"
          aria-label="Scroll to explore"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="flex h-9 w-5 justify-center rounded-full border border-white/20 p-1">
            <span className="h-2 w-1 animate-float rounded-full bg-mist/70" />
          </span>
        </a>
      )}
    </section>
  );
}
