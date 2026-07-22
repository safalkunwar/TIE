"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCountUpOnMount } from "@/hooks/useCountUpOnMount";
import { company } from "@/data/company";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function YearsStat() {
  const v = useCountUpOnMount(13, 1800);
  return (
    <div
      data-hero-fade
      className="glass-strong flex items-center gap-3 rounded-2xl px-4 py-3 shadow-blue-soft"
    >
      <span className="font-display text-2xl font-extrabold text-gradient-ocean">
        {Math.round(v)}+
      </span>
      <span className="h-8 w-px bg-mist/15" />
      <span className="text-xs font-medium leading-tight text-mist-muted">
        Years
        <br />
        of Trust
      </span>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Pause playback when offscreen using IntersectionObserver
  useEffect(() => {
    if (!videoRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0 }
    );
    obs.observe(videoRef.current);
    return () => obs.disconnect();
  }, []);

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

      // Cinematic Video Entrance
      if (!reduced && videoContainerRef.current) {
        gsap.set(videoContainerRef.current, {
          x: "-45vw",
          scale: 0.96,
          filter: "brightness(1)",
          opacity: 0,
        });

        const tl = gsap.timeline({ delay: 0.2 });
        tl.to(
          videoContainerRef.current,
          {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          },
          0
        ).to(
          videoContainerRef.current,
          {
            x: "0vw",
            scale: 1,
            filter: "brightness(1.08)",
            duration: 4,
            ease: "power3.inOut",
          },
          0
        );

        // Continuous floating
        tl.to(videoContainerRef.current, {
          y: 8,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
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
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-16 sm:pt-24 lg:pt-28"
    >
      {/* Background covering the full section */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-sky-50 via-white to-sky-100" />

      {/* Cinematic Airplane Video */}
      <div
        ref={videoContainerRef}
        className="absolute bottom-[25%] top-[25%] right-0 z-[-15] w-full sm:w-[90vw] md:bottom-0 md:top-0 md:w-[85vw] lg:w-[65vw] pointer-events-none overflow-hidden will-transform"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 75%)",
        }}
      >
        <video
          ref={videoRef}
          src="/gallery/video1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          style={{ transform: "translate3d(0,0,0)" }}
        />
        {/* Subtle blue haze overlay to match branding */}
        <div className="absolute inset-0 bg-azure/10 mix-blend-overlay" />
      </div>

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

          {/* CTAs + 13+ Years animated stat beside the headline */}
          <div
            data-hero-fade
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton href="/book">Book Free Consultation</MagneticButton>
            <MagneticButton href="#globe" variant="ghost">
              <Icon name="globe" className="h-4 w-4" />
              Explore Destinations
            </MagneticButton>
            <YearsStat />
          </div>

          {/* Mobile trust badges */}
          <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
            {[
              { label: "97% Visa Success" },
              { label: "350+ Partner Universities" },
              { label: "5,000+ Students Placed" },
              { label: "13+ Years" },
            ].map((badge) => (
              <div key={badge.label} className="glass-strong rounded-full px-3 py-2.5 text-center shadow-sm">
                <span className="text-xs font-bold text-ocean-deep">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Scholarships quick link → consultation flow */}
          <div data-hero-fade className="mt-4">
            <a
              href="/book"
              className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-ocean-deep transition-all duration-200 hover:border-gold/70 hover:bg-gold/20"
            >
              <span aria-hidden>🏆</span>
              Scholarships available
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                up to 60%
              </span>
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Floating glass stat chips */}
          <div
            data-hero-fade
            data-hero-parallax
            className="hidden lg:flex mt-16 flex-wrap gap-3"
          >
            {[
              { k: "97%", v: "Visa success rate" },
              { k: "350+", v: "Partner universities" },
              { k: "5,000+", v: "Students placed" },
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
    </section>
  );
}
