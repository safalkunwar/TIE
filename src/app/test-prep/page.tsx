import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import SectionHeading from "@/components/ui/SectionHeading";
import TestPrepCard from "@/components/TestPrepCard";
import Testimonials from "@/components/Testimonials";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import Image from "next/image";
import { testPrepPrograms } from "@/data/testPrep";
import { destinations } from "@/data/destinations";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test Preparation | TIE Nepal",
  description:
    "IELTS, PTE, TOEFL, SAT, GRE, GMAT and Japanese language coaching by TIE Nepal — small-group and one-to-one classes in Pokhara.",
};

const credentials = [
  { logo: "/gallery/govt-approval.jpg", title: "Govt. Approved", desc: "Ministry of Education, Nepal" },
  { logo: "/gallery/icef-accredited.png", title: "ICEF Accredited", desc: "Trusted agency (IAS 3944)" },
  { logo: "/gallery/ecan-logo.svg", title: "ECAN Member", desc: "Educational Consultancy Association of Nepal" },
  { logo: "/gallery/british-council-logo.svg", title: "British Council Agent", desc: "Authorised UK education partner" },
] as const;

export default async function TestPrepPage() {
  const dbTestimonials = await prisma.testimonial.findMany({
    where: { published: true, visaGranted: true },
    include: { country: true },
    orderBy: { sortOrder: "asc" },
  });

  const testimonials = dbTestimonials.map((t) => ({
    name: t.studentName,
    destination: t.country?.name ?? "",
    slug: t.country?.slug ?? "",
    flag: t.country?.flag ?? "",
    quote: t.quote,
    image: t.avatar || "",
    visaGranted: t.visaGranted,
    sourceUrl: t.sourceUrl,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] via-[#E7F1FE] to-[#F4F9FF] text-slate-900 pb-20 lg:pb-0">
      <Navbar countries={destinations} />

      <section className="relative pt-32 pb-12">
        <div className="container-x">
          <SectionHeading
            eyebrow="Test preparation"
            title={
              <>
                Hit your target score with{" "}
                <span className="text-gradient-ocean">expert coaching.</span>
              </>
            }
            description="Structured, counsellor-led programs for every major admissions and language test — with weekly mock exams and individual feedback."
            align="left"
          />

          {/* Mobile: horizontal chip row for quick test reference */}
          <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar lg:hidden">
            {["IELTS", "PTE", "TOEFL", "SAT", "GRE", "GMAT"].map((name) => (
              <span
                key={name}
                className="whitespace-nowrap rounded-full bg-ocean/10 px-4 py-2 text-xs font-bold text-ocean-deep"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Trusted & accredited"
            title={
              <>
                Backed by recognised{" "}
                <span className="text-gradient-ocean">accreditations.</span>
              </>
            }
            description="TIE Nepal is a government-approved, ECAN-member and ICEF-certified consultancy — so your preparation and onward application are in professional, ethical hands."
            align="center"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <div key={c.title} className="reveal card flex flex-col items-start gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ocean/10 overflow-hidden">
                  <Image
                    src={c.logo}
                    alt={c.title}
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ocean-deep">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-24">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testPrepPrograms.map((program) => (
              <TestPrepCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

      <CTA countries={destinations} />
      <Footer />
      <MobileBottomNav />
      <MobileBottomCTA />
    </div>
  );
}
