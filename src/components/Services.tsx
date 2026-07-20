"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";
import { useReveal } from "@/hooks/useReveal";

export default function Services() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="services" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              End-to-end support,{" "}
              <span className="text-gradient-ocean">start to success.</span>
            </>
          }
          description="From your first question to your graduation day — these are the six ways our team carries you forward."
        />

        <div ref={ref} className="reveal mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {company.services.map((s) => (
            <div
              key={s.title}
              className="card group relative flex flex-col gap-3 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-azure/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ocean/10 text-ocean">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="font-display text-xs font-bold text-ocean">
                  0{company.services.indexOf(s) + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-mist">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-mist-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
