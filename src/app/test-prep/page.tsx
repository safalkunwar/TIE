import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import SectionHeading from "@/components/ui/SectionHeading";
import TestPrepCard from "@/components/TestPrepCard";
import { testPrepPrograms } from "@/data/testPrep";
import { destinations } from "@/data/destinations";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Test Preparation | TIE Nepal",
  description:
    "IELTS, PTE, TOEFL, SAT, GRE, GMAT and Japanese language coaching by TIE Nepal — small-group and one-to-one classes in Pokhara.",
};

export default function TestPrepPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] via-[#E7F1FE] to-[#F4F9FF] text-slate-900">
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
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testPrepPrograms.map((program) => (
              <TestPrepCard key={program.slug} program={program} />
            ))}
          </div>
        </div>
      </section>

      <CTA countries={destinations} />
      <Footer />
    </div>
  );
}
