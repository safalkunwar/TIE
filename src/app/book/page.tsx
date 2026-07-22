import type { Metadata } from "next";
import prisma from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConsultation from "@/components/book/BookConsultation";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "Book a Consultation | TIE Nepal",
  description:
    "Book a free consultation with a certified TIE Nepal counselor — online (Zoom), office visit or phone. Get personalized university picks, a scholarship assessment and a clear visa roadmap.",
};

export default async function BookPage() {
  // Countries power the Navbar mega-menu. Kept minimal for this route.
  const dbCountries = await prisma.country.findMany({
    include: { universities: true },
    orderBy: { createdAt: "asc" },
  });

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
        <BookConsultation />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
