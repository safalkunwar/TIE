"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";
import VideoTestimonials from "@/components/VideoTestimonial";
import CredentialCard from "@/components/CredentialCard";

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
          {credentials.map((c, i) => (
            <CredentialCard key={c.title} credential={c} index={i} />
          ))}
        </div>

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
      </div>
    </section>
  );
}
