"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";

const pillars = [
  {
    icon: "shield" as const,
    title: "Government approved",
    desc: "Renewal approved by the Ministry of Education, Government of Nepal.",
  },
  {
    icon: "star" as const,
    title: "ICEF accredited",
    desc: "Recognised internationally as a trusted educational agency.",
  },
  {
    icon: "cap" as const,
    title: "ECAN member",
    desc: "Educational Consultancy Association of Nepal verified practice.",
  },
  {
    icon: "compass" as const,
    title: "Since 2012",
    desc: "13+ years guiding Pokhara's students to global universities.",
  },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="about" className="section relative">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — team photo with floating credential chips */}
          <div ref={imgRef} className="reveal relative">
            <div className="relative overflow-hidden rounded-5xl border border-ink-line bg-white shadow-card">
              <div className="relative aspect-[4/5] sm:aspect-[5/5]">
                <Image
                  src="/gallery/team.jpg"
                  alt="The Target International Education counsellors in Pokhara"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating credential chip — top right */}
            <div className="absolute -right-3 top-8 animate-float rounded-2xl border border-ink-line bg-white/90 px-4 py-3 shadow-card backdrop-blur sm:-right-6">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean/10 text-ocean">
                  <Icon name="star" className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-bold text-ocean-deep">
                    ICEF Accredited
                  </div>
                  <div className="text-[11px] text-mist-muted">Trusted Agency</div>
                </div>
              </div>
            </div>

            {/* Floating chip — bottom left */}
            <div className="absolute -left-3 bottom-10 rounded-2xl border border-ink-line bg-white/90 px-4 py-3 shadow-card backdrop-blur sm:-left-6">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ocean/10 text-ocean">
                  <Icon name="cap" className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-bold text-ocean-deep">
                    Est. {company.foundedYear}
                  </div>
                  <div className="text-[11px] text-mist-muted">Pokhara, Nepal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — story copy */}
          <div ref={ref} className="reveal flex flex-col items-start gap-6">
            <span className="eyebrow">
              <span className="h-px w-6 bg-ocean/50" />
              Why TIE Nepal
            </span>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-ocean-deep sm:text-5xl">
              Pokhara's most trusted{" "}
              <span className="text-gradient-ocean">passport to the world.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-mist-muted sm:text-lg">
              Founded on {company.founded} in {company.location}, Target
              International Education has spent over a decade turning Nepali
              ambition into international achievement. We are approved by the
              Ministry of Education, accredited by ICEF, and a proud member of
              ECAN — credentials that mean your application is in qualified,
              ethical hands.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-mist-muted sm:text-lg">
              <span className="font-semibold text-ocean-deep">
                &ldquo;{company.blurb}&rdquo;
              </span>{" "}
              That is not a slogan — it is how every counsellor here treats every
              student who walks through our doors.
            </p>

            {/* Pillars grid */}
            <div className="mt-2 grid w-full gap-3 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-3 rounded-2xl border border-ink-line bg-white/70 p-4 backdrop-blur transition-transform hover:-translate-y-0.5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-bold text-ocean-deep">
                      {p.title}
                    </div>
                    <div className="text-xs leading-relaxed text-mist-muted">
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
