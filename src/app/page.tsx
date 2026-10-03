import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import MobileStats from "@/components/MobileStats";
import About from "@/components/About";
import Services from "@/components/Services";
import Globe from "@/components/Globe";
import Destinations from "@/components/Destinations";
import DreamJourney from "@/components/DreamJourney";
import Testimonials from "@/components/Testimonials";
import SocialProof from "@/components/SocialProof";
import Credentials from "@/components/Credentials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import prisma from "@/lib/db";

export default async function Home() {
  const dbCountries = await prisma.country.findMany({
    where: { published: true },
    include: {
      universities: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      countryScholarships: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      faqs: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      testimonials: { where: { published: true, visaGranted: true }, orderBy: { sortOrder: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });

  // DB-backed video testimonials for the Proof section
  const videoTestimonials = await prisma.videoTestimonial.findMany({
    where: { published: true },
    orderBy: { displayOrder: "asc" },
  });

  // Cast to expected frontend type (Prisma returns nullable fields)
  const videoTestimonialsFormatted = videoTestimonials.map((v) => ({
    ...v,
    personType: (v.personType as "student" | "parent") || "student",
    country: v.country || "Unknown",
    result: v.result ?? undefined,
    university: v.university ?? undefined,
    quote: v.quote ?? undefined,
  }));

  // Map to static destination structure if needed, adding defaults
  const countries = dbCountries.map((c) => ({
    slug: c.slug,
    name: c.name,
    flag: c.flag,
    tagline: c.tagline,
    tuition: c.tuition,
    intake: c.intake,
    language: c.language,
    workWhileStudying: c.workWhileStudying,
    postStudyWork: c.postStudyWork,
    topUniversities: c.universities.map((u) => u.name),
    scholarships: c.scholarships,
    visaPathway: c.visaPathway,
    image: c.image,
    accent: c.accent,
    lat: c.lat || 0,
    lng: c.lng || 0,
  }));

  // DB-backed testimonials for the homepage success stories section
  const testimonials = dbCountries.flatMap((c) =>
    c.testimonials.map((t) => ({
      name: t.studentName,
      destination: c.name,
      slug: c.slug,
      flag: c.flag,
      university: "",
      program: "",
      scholarship: "",
      quote: t.quote,
      image: t.avatar || "",
      visaGranted: t.visaGranted,
      sourceUrl: t.sourceUrl,
    })),
  );

  return (
    <>
      <Navbar countries={countries} />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <MobileStats />
        <Stats />
        <About />
        <Services />
        <Globe countries={countries} />
        <Destinations countries={countries} />
        <DreamJourney />
        <Testimonials testimonials={testimonials} />
        <SocialProof videoTestimonials={videoTestimonialsFormatted} />
        <Credentials />
        <CTA countries={countries} />
      </main>
      <Footer />
      <MobileBottomNav />
      <MobileBottomCTA />
    </>
  );
}
