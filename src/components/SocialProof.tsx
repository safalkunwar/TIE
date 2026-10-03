"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";
import VideoTestimonials from "@/components/VideoTestimonial";

type Props = {
  videoTestimonials?: Array<{
    id: string;
    name: string;
    personType: "student" | "parent";
    country: string;
    university?: string;
    result?: string;
    quote?: string;
    videoUrl: string;
    thumbnailUrl: string;
    featured: boolean;
    displayOrder: number;
    published: boolean;
  }>;
};

const affiliationLogos = [
  { src: "/gallery/membership.jpg", alt: "ECAN, ICEF, British Council, IDP, PTE, Duolingo, OET, Government of Nepal" },
];

const credentials = [
  {
    title: "ECAN Member",
    desc: "Educational Consultancies Association of Nepal — verified ethical practice.",
    icon: "shield" as const,
  },
  {
    title: "ICEF Certified",
    desc: "Recognised internationally as a trusted educational agency.",
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

export default function SocialProof({ videoTestimonials = [] }: Props) {
  return (
    <section id="why" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why students trust TIE"
          title={
            <>
              Credentials that mean{" "}
              <span className="text-gradient-ocean">something.</span>
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
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ocean/10 text-ocean">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ocean-deep">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials */}
        <VideoTestimonials videos={videoTestimonials} />

        {/* Partner ribbon */}
        <div className="mt-14 rounded-4xl border border-ink-line bg-white/60 py-8 shadow-blue-soft backdrop-blur">
          <p className="mb-6 text-center text-xs uppercase tracking-[0.25em] text-mist-muted">
            Official partners & affiliations
          </p>
          <div className="overflow-x-auto py-2">
            <div className="flex w-max gap-8 px-4">
              <Image
                src="/gallery/membership.jpg"
                alt="ECAN, ICEF, British Council, IDP, PTE, Duolingo, OET, Government of Nepal"
                width={1600}
                height={200}
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>
        {/* Follow us strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-4xl border border-ink-line bg-gradient-to-br from-sky-100/70 to-sky-200/50 px-7 py-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <div className="font-display text-lg font-bold text-ocean-deep">
              Follow the journey on social
            </div>
            <div className="text-sm text-mist-muted">
              Real admits, scholarship wins & study-abroad tips — daily.
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-5 py-2.5"
            >
              <span className="text-sm font-bold">f</span> Facebook
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-5 py-2.5"
            >
              <span className="text-sm font-bold">IG</span> Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
