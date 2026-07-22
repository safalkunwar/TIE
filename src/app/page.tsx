import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
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
import prisma from "@/lib/db";

export default async function Home() {
  const dbCountries = await prisma.country.findMany({
    include: {
      universities: true,
      countryScholarships: true,
      faqs: true,
      testimonials: true,
    },
    orderBy: { createdAt: "asc" },
  });

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

  return (
    <>
      <Navbar countries={countries} />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <Stats />
        <About />
        <Globe countries={countries} />
        <Destinations countries={countries} />
        <DreamJourney />
        <Testimonials />
        <SocialProof />
        <Credentials />
        <CTA countries={countries} />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
