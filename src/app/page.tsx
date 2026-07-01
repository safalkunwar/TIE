import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Globe from "@/components/Globe";
import Destinations from "@/components/Destinations";
import DreamJourney from "@/components/DreamJourney";
import Testimonials from "@/components/Testimonials";
import SocialProof from "@/components/SocialProof";
import Credentials from "@/components/Credentials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#globe"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ocean focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Globe />
        <Destinations />
        <DreamJourney />
        <Testimonials />
        <SocialProof />
        <Credentials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
