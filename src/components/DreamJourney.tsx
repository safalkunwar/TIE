"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey, type JourneyStep } from "@/data/journey";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function DreamJourney() {
  const timeline = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!timeline.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(progress.current, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: timeline.current, start: "top 60%", end: "bottom 65%", scrub: 0.4 },
      });
      timeline.current!.querySelectorAll<HTMLElement>("[data-journey-step]").forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step, start: "top 60%",
          onEnter: () => setActiveStep(index),
          onLeaveBack: () => setActiveStep(Math.max(0, index - 1)),
        });
      });
    }, timeline);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="journey" className="journey-section section relative isolate scroll-mt-24">
      <div className="journey-backdrop" aria-hidden>
        <Image src="/gallery/journey-graduation.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="container-x relative">
        <SectionHeading
          eyebrow="The dream journey"
          title={<>From dream to<br /><span className="text-gradient-ocean">career success.</span></>}
          description="Big ambitions become real through small, confident steps. From your first conversation to life abroad, we’re here for every chapter."
        />
        <div className="mx-auto mt-7 flex w-fit items-center gap-3 rounded-full border border-ocean/10 bg-white/80 px-5 py-2.5 text-xs font-medium text-mist-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ocean/10 text-ocean"><Icon name="compass" className="h-3.5 w-3.5" /></span>
          Seven milestones. One dedicated team.
        </div>
        <ol ref={timeline} className="journey-timeline" aria-label="Your seven steps to studying abroad">
          <li className="journey-track" aria-hidden><div ref={progress} className="journey-progress" /></li>
          {journey.map((item, index) => (
            <li key={item.id} data-journey-step className={`journey-step ${index % 2 === 1 ? "journey-step-right" : ""} ${activeStep === index ? "is-current" : ""} ${index <= activeStep ? "is-reached" : ""}`}>
              <span className="journey-node" aria-hidden>{index < activeStep ? <Icon name="check" className="h-4 w-4" /> : item.step}</span>
              <JourneyCard item={item} index={index} />
            </li>
          ))}
        </ol>
        <div className="journey-finish relative mx-auto mt-10 max-w-2xl rounded-3xl border border-white bg-white/90 p-7 text-center shadow-blue-soft sm:p-9">
          <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500"><Icon name="plane" className="h-6 w-6" /></span>
          <h3 className="font-display text-xl font-bold text-ocean-deep sm:text-2xl">Your first step starts right here.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist-muted">Bring your questions, your ideas, and your ambitions. Let’s make a plan that feels right for you.</p>
          <Link href="/book" className="btn-primary mt-6">Book a free consultation<Icon name="arrow" className="h-4 w-4" /></Link>
          <p className="mt-3 text-[11px] text-mist-dim">A friendly conversation. A clearer path forward.</p>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ item, index }: { item: JourneyStep; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="journey-card" aria-labelledby={`journey-title-${item.id}`}>
      <div className="journey-card-image relative">
        <Image src={imageFailed ? "/gallery/team.jpg" : item.image} alt={imageFailed ? "The Target International Education team" : item.imageAlt} fill sizes="(min-width: 768px) 160px, 30vw" className="object-cover" onError={() => setImageFailed(true)} />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/40 to-transparent" aria-hidden />
        <span className="absolute bottom-3 left-3 grid h-9 w-9 place-items-center rounded-xl border border-white/50 bg-white/90 text-ocean"><Icon name={item.icon as never} className="h-5 w-5" /></span>
      </div>
      <div className="journey-card-copy">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ocean">Chapter {item.step} <span className="ml-2 text-mist-dim">/ 07</span></p>
        <h3 id={`journey-title-${item.id}`} className="mt-3 font-display text-xl font-bold tracking-tight text-ocean-deep sm:text-2xl">{item.title}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-mist-muted">{item.description}</p>
        <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold text-mist-dim"><span className="h-px w-5 bg-ocean/25" />{["Your ambition, our starting point", "A plan built around you", "Put your best foot forward", "Prepare with confidence", "Ready for your next chapter", "Celebrate how far you’ve come", "Build what comes next"][index]}</div>
      </div>
    </article>
  );
}
