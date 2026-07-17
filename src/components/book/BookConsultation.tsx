"use client";

import { useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ConsultationMethods from "@/components/book/ConsultationMethods";
import OnlineScheduler from "@/components/book/OnlineScheduler";
import ContactMethodPanel from "@/components/book/ContactMethodPanel";
import ScholarshipHighlights from "@/components/book/ScholarshipHighlights";
import ScholarshipEstimator from "@/components/book/ScholarshipEstimator";
import TrustBuilders from "@/components/book/TrustBuilders";
import { scholarshipCategoryMeta, type ConsultationMethodId } from "@/data/consultation";

/**
 * Orchestrates the full "Book Consultation" lead-generation experience.
 *
 * State is intentionally minimal (selected method) and everything below is
 * composed from reusable, data-driven components so real APIs (Zoom, calendar,
 * email, scholarship management) plug in behind the data/service layer without
 * touching this layout.
 */
export default function BookConsultation() {
  const [selectedMethod, setSelectedMethod] = useState<ConsultationMethodId | null>(
    "online",
  );

  const schedulerRef = useRef<HTMLDivElement>(null);
  const estimatorRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: ConsultationMethodId) => {
    setSelectedMethod(id);
    requestAnimationFrame(() =>
      schedulerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const scrollToEstimator = () =>
    estimatorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const scrollToMethods = () =>
    methodsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="pt-28 sm:pt-32">
      {/* Consultation methods — shown first so the three options are visible immediately */}
      <section ref={methodsRef} className="section pb-10 pt-4 sm:pb-12">
        <div className="container-x">
          <SectionHeading
            eyebrow="Choose your method"
            as="h1"
            title={
              <>
                Three ways to <span className="text-gradient-ocean">connect</span>
              </>
            }
            description="Pick the format that suits you best. You can switch anytime."
          />
          <div className="mt-12">
            <ConsultationMethods selectedId={selectedMethod} onSelect={handleSelect} />
          </div>
        </div>
      </section>

      {/* Active method flow */}
      <section ref={schedulerRef} className="section pt-0">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            {selectedMethod === "online" && <OnlineScheduler methodId="online" />}
            {selectedMethod === "office" && <ContactMethodPanel methodId="office" />}
            {selectedMethod === "phone" && <ContactMethodPanel methodId="phone" />}
          </div>
        </div>
      </section>

      {/* Hero / intro — moved below the options */}
      <section className="section pt-4">
        <div className="container-x">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="eyebrow">
              <span className="h-px w-6 bg-ocean/50" />
              Free · No obligation
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-ocean-deep sm:text-5xl md:text-6xl">
              Book your <span className="text-gradient-ocean">consultation</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-mist-muted sm:text-lg">
              Choose how you&rsquo;d like to meet a certified TIE Nepal counselor.
              Get personalized university picks, a scholarship assessment and a
              clear visa roadmap — on your schedule.
            </p>
          </div>

          <div className="mt-10">
            <TrustBuilders />
          </div>
        </div>
      </section>

      {/* Scholarship highlights */}
      <section className="section pt-4">
        <div className="container-x">
          <SectionHeading
            eyebrow="Scholarship highlights"
            title={
              <>
                Funding built for <span className="text-gradient-ocean">ambition</span>
              </>
            }
            description="Explore live scholarship opportunities across our destinations — then check what you may qualify for."
          />

          {/* Category legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {Object.values(scholarshipCategoryMeta).map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ocean-deep"
              >
                <span>{c.glyph}</span>
                {c.label}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <ScholarshipHighlights onCheckEligibility={scrollToEstimator} />
          </div>
        </div>
      </section>

      {/* Scholarship estimator */}
      <section className="section pt-4">
        <div className="container-x">
          <SectionHeading
            eyebrow="Personalized estimator"
            title={
              <>
                See what you may <span className="text-gradient-ocean">qualify for</span>
              </>
            }
            description="Answer a few quick questions for an instant, no-obligation scholarship estimate."
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <ScholarshipEstimator ref={estimatorRef} onBook={scrollToMethods} />
          </div>
        </div>
      </section>
    </main>
  );
}
