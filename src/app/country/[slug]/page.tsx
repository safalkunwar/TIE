import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";

import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function CountryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const country = await prisma.country.findUnique({
    where: { slug: params.slug },
    include: {
      universities: true,
      countryScholarships: true,
      faqs: true,
      testimonials: true,
    },
  });

  if (!country) {
    notFound();
  }

  // Load all countries for Navbar menu
  const allCountries = await prisma.country.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4F9FF] via-[#E7F1FE] to-[#F4F9FF] text-slate-900">
      <Navbar countries={allCountries} />

      {/* Hero Banner Section */}
      <section className="relative h-[65vh] min-h-[450px] w-full overflow-hidden">
        <Image
          src={country.image || "https://images.pexels.com/photos/243532/pexels-photo-243532.jpeg"}
          alt={country.name}
          fill
          priority
          className="object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-16 left-0 right-0">
          <div className="container-x">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-md shadow-lg mb-4">
              {country.flag}
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              Study in {country.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-200">
              {country.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Fast Facts Grid */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Average Tuition</span>
            <p className="mt-2 text-xl font-bold text-ocean-deep">{country.tuition}</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Intakes</span>
            <p className="mt-2 text-xl font-bold text-ocean-deep">{country.intake}</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Language Req.</span>
            <p className="mt-2 text-xl font-bold text-ocean-deep">{country.language}</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Work rights</span>
            <p className="mt-2 text-xl font-bold text-ocean-deep">{country.workWhileStudying}</p>
          </div>
        </div>
      </section>

      {/* Overview & Visa Section */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Why Study in {country.name}?</h2>
              <p className="text-slate-600 leading-relaxed">
                {country.tagline} Experience high-quality education, immersive international networks, and exceptional post-study work rights options tailored for prospective international students.
              </p>
            </div>

            {/* Visa Pathways */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Visa Pathway & Staying Back</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Post-Study Stay Back rights</h3>
                  <p className="text-slate-600 mt-1">{country.postStudyWork}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="font-semibold text-slate-900 text-lg">Visa Pathway</h3>
                  <p className="text-slate-600 mt-1">{country.visaPathway}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Universities */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Top Partner Universities</h2>
              <ul className="space-y-4">
                {country.universities.map((uni) => (
                  <li key={uni.id} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-ocean" />
                    <span className="font-medium text-slate-700">{uni.name}</span>
                  </li>
                ))}
                {country.universities.length === 0 && (
                  <li className="text-slate-400">No partner universities configured.</li>
                )}
              </ul>
            </div>

            {/* Scholarships */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Scholarships available</h2>
              <p className="text-sm text-slate-600 mb-4">{country.scholarships}</p>
              <ul className="space-y-3">
                {country.countryScholarships.map((sch) => (
                  <li key={sch.id} className="text-sm border-t pt-2 first:border-0 first:pt-0">
                    <span className="font-bold text-slate-800">{sch.name}</span>
                    {sch.description && <p className="text-slate-500 text-xs mt-0.5">{sch.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {country.faqs.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container-x max-w-4xl">
            <h2 className="font-display text-4xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {country.faqs.map((faq) => (
                <div key={faq.id} className="border-b border-slate-100 pb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead CTA */}
      <CTA countries={allCountries} />

      <Footer />
    </div>
  );
}
