import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import MobileBottomNav from "@/components/MobileBottomNav";
import { servicesData } from "@/data/company";
import { destinations } from "@/data/destinations";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Services | TIE Nepal",
  description:
    "End-to-end study-abroad support — career counselling, test preparation, university applications, visa processing, pre-departure briefing and ongoing support.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] via-[#E7F1FE] to-[#F4F9FF] text-slate-900 pb-20 lg:pb-0">
      <Navbar countries={destinations} />

      <section className="relative pt-32 pb-12">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Every step,{" "}
                <span className="text-gradient-ocean">handled for you.</span>
              </>
            }
            description="From your first question to graduation day — these are the ways our team carries you forward, end to end."
            align="left"
          />
        </div>
      </section>

      <section className="pb-24 lg:pb-24">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTA countries={destinations} />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
