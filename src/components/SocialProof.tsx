"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import Icon from "@/components/ui/Icon";

const credentials = [
  {
    title: "ECAN Member",
    desc: "Educational Consultancies Association of Nepal — verified ethical practice.",
    icon: "shield" as const,
  },
  {
    title: "ICEF Certified",
    desc: "IAS 3944 — internationally recognised agency quality standard.",
    icon: "star" as const,
  },
  {
    title: "British Council Agent",
    desc: "Authorised counsellors for UK university and English-test pathways.",
    icon: "cap" as const,
  },
  {
    title: "Govt. of Nepal Approved",
    desc: "Licensed educational consultancy under the Ministry of Education.",
    icon: "check" as const,
  },
];

export default function SocialProof() {
  return (
    <section id="why" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why students trust TIE"
          title={
            <>
              Credentials that mean{" "}
              <span className="text-gradient-gold">something.</span>
            </>
          }
          description="We're not just another agency. Our accreditations and 13-year track record mean your application is in qualified hands."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c) => (
            <div
              key={c.title}
              className="reveal card flex flex-col items-start gap-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-mist">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner ribbon */}
        <div className="mt-14 rounded-4xl border border-ink-line bg-ink-card/40 py-8">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-mist-dim">
            Official partners & affiliations
          </p>
          <Marquee
            items={[
              "ECAN",
              "ICEF · IAS 3944",
              "British Council",
              "IDP IELTS",
              "PTE Academic",
              "Govt. of Nepal",
              "Duolingo English Test",
              "OET",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
