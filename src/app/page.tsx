import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Globe from "@/components/Globe";
import DreamJourney from "@/components/DreamJourney";
import Destinations from "@/components/Destinations";
import Testimonials from "@/components/Testimonials";
import SocialProof from "@/components/SocialProof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#globe"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Globe />
        <Destinations />
        <DreamJourney />
        <Testimonials />
        <SocialProof />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
