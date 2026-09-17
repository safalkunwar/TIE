import type { Metadata } from "next";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MobileBottomCTA from "@/components/MobileBottomCTA";
import Navbar from "@/components/Navbar";
import CountryGuide, { type GuideSection } from "@/components/CountryGuide";
import CountryFlag from "@/components/ui/CountryFlag";
import Icon from "@/components/ui/Icon";
import Testimonials from "@/components/Testimonials";
import { getDestinationDetail } from "@/data/destinationDetail";
import { getDestinationImage } from "@/lib/destinationImage";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const country = await prisma.country.findUnique({ where: { slug: params.slug } });
  if (!country?.published) return { title: "Destination not found | TIE Nepal" };
  return { title: `Study in ${country.name}`, description: `Explore courses, student life and application guidance for ${country.name} with Target International Education, Pokhara.` };
}

export default async function CountryDetailPage({ params }: { params: { slug: string } }) {
  const country = await prisma.country.findUnique({
    where: { slug: params.slug },
    include: {
      hero: true,
      universities: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      countryScholarships: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      faqs: { where: { published: true }, orderBy: { sortOrder: "asc" } },
      testimonials: { where: { published: true, visaGranted: true }, orderBy: { sortOrder: "asc" } },
    },
  });
  if (!country?.published) notFound();
  const allCountries = await prisma.country.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
  const detail = getDestinationDetail(country.slug);
  const heroImage = getDestinationImage(country.slug, country.hero?.image || country.image);
  const sections: GuideSection[] = [
    { id: "overview", label: "Overview", intro: `Get to know ${country.name}.`, blocks: [
      { title: "A place for your ambitions", text: detail?.overview || country.tagline },
      { title: "Why study here?", text: detail?.whyStudy },
      { title: "The education system", text: detail?.educationSystem },
      { title: "Popular fields of study", items: detail?.popularCourses },
    ] },
    { id: "costs", label: "Costs & funding", intro: "Build a budget around your study plans.", blocks: [
      { title: "Tuition fees", text: detail?.tuitionFees || country.tuition },
      { title: "Everyday living costs", text: detail?.livingCosts },
      { title: "Scholarship opportunities", text: country.scholarships || detail?.scholarships },
      ...country.countryScholarships.map((scholarship) => ({ title: scholarship.name, text: [scholarship.amount, scholarship.description, scholarship.deadline ? `Deadline: ${scholarship.deadline}` : ""].filter(Boolean).join(" · ") })),
    ] },
    { id: "applications", label: "Applying", intro: "A clearer path from your shortlist to your application.", blocks: [
      { title: "Entry requirements", items: detail?.admissionRequirements },
      { title: "Language requirements", text: detail?.englishRequirements || country.language },
      { title: "What to prepare", items: detail?.requiredDocuments },
      { title: "Study intakes", text: detail?.intakes || country.intake },
      { title: "Your application, step by step", steps: detail?.applicationTimeline },
    ] },
    { id: "life", label: "Student life", intro: "Picture the life beyond your lectures.", blocks: [
      { title: "Life on and off campus", text: detail?.studentLife },
      { title: "Finding your new home", text: detail?.accommodation },
      { title: "Weather & seasons", text: detail?.climate },
      { title: "Working while studying", text: country.workWhileStudying || detail?.workWhileStudying },
    ] },
    { id: "visa", label: "Visas & beyond", intro: "Understand the next steps in your journey.", blocks: [
      { title: "Your student visa pathway", text: country.visaPathway || detail?.visaProcess },
      { title: "Preparing your application", text: detail?.visaProcess },
      { title: "After graduation", text: country.postStudyWork },
      { title: "Longer-term pathways", text: detail?.prOpportunities },
    ] },
  ];
  const stories = country.testimonials.map((story) => ({ name: story.studentName, destination: country.name, slug: country.slug, flag: country.flag, quote: story.quote, image: story.avatar || "", visaGranted: story.visaGranted, sourceUrl: story.sourceUrl }));

  return <div className="country-page">
    <Navbar countries={allCountries} />
    <main className="pb-20 lg:pb-0">
      <section className="country-hero">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="country-breadcrumb"><Link href="/#destinations">Destinations</Link><Icon name="arrow" className="h-3 w-3" /><span aria-current="page">{country.name}</span></nav>
          <div className="country-hero-grid">
            <div className="country-hero-copy">
              <span className="country-eyebrow"><CountryFlag slug={country.slug} name={country.name} flag={country.flag} />YOUR WORLD OF POSSIBILITIES</span>
              <h1>{country.hero?.title && country.hero.title !== `Study in ${country.name}` ? country.hero.title : <>Your future,<br />in <span className="text-gradient-ocean">{country.name}.</span></>}</h1>
              <p className="country-hero-description">{country.hero?.subtitle || country.tagline}</p>
              <div className="country-hero-actions"><Link href="/book" className="btn-primary">Plan my journey<Icon name="arrow" className="h-4 w-4" /></Link><a href="#country-guide" className="country-text-link">Explore the guide<Icon name="arrow" className="h-4 w-4 rotate-90" /></a></div>
              <div className="country-hero-support"><span><Icon name="check" className="h-3.5 w-3.5" />Course guidance</span><span><Icon name="check" className="h-3.5 w-3.5" />Personal support</span></div>
            </div>
            <div className="country-hero-photo">
              <Image src={heroImage} alt={`Discover ${country.name}`} fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
              <div className="country-photo-gradient" aria-hidden />
              <span className="country-photo-tag"><Icon name="compass" className="h-4 w-4" />A new perspective awaits</span>
              <div className="country-boarding-card"><Image src="/gallery/tie-logo.png" alt="TIE Nepal" width={42} height={42} /><div><span>Your journey starts here</span><strong>Nepal <Icon name="plane" className="h-4 w-4" /> {country.name}</strong></div><CountryFlag slug={country.slug} name={country.name} flag={country.flag} /></div>
            </div>
          </div>
          <dl className="country-facts">
            {[{ label: "Tuition guide", value: country.tuition, icon: "cap" as const }, { label: "Main intakes", value: country.intake, icon: "compass" as const }, { label: "Language", value: country.language, icon: "doc" as const }, { label: "While you study", value: country.workWhileStudying, icon: "shield" as const }].map((fact) => <div key={fact.label}><dt><Icon name={fact.icon} className="h-4 w-4" />{fact.label}</dt><dd>{fact.value || "Let’s explore your options"}</dd></div>)}
          </dl>
        </div>
      </section>

      <section id="country-guide" className="country-guide-section container-x">
        <div className="country-section-heading"><span className="eyebrow">THE DESTINATION GUIDE</span><h2>Make yourself <span className="text-gradient-ocean">at home.</span></h2><p>Everything in one place, so you can focus on what comes next.</p></div>
        <div className="country-content-grid">
          <CountryGuide sections={sections} />
          <aside className="country-planner">
            <span className="country-planner-icon"><Icon name="compass" className="h-6 w-6" /></span>
            <span className="eyebrow">YOUR NEXT STEP</span>
            <h2>A little guidance.<br />A world of difference.</h2>
            <p>You bring the ambition. We’ll help you choose the course, prepare your application and plan the journey.</p>
            <ul>{["Talk through your goals", "Find your course & university", "Create your application plan"].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ul>
            <Link href="/book" className="btn-primary w-full">Book a free consultation<Icon name="arrow" className="h-4 w-4" /></Link>
            <span className="country-planner-note">Your next chapter starts with a conversation.</span>
          </aside>
        </div>
      </section>

      {country.universities.length > 0 && <section className="country-universities container-x" id="universities">
        <div className="country-section-heading"><span className="eyebrow">FIND YOUR FIT</span><h2>Big ideas start <span className="text-gradient-ocean">here.</span></h2><p>Explore universities in {country.name} with your TIE counsellor.</p></div>
        <div className="country-university-grid">{country.universities.map((university, index) => <article key={university.id} className="country-university-card"><div className="flex items-center justify-between"><Icon name="cap" className="h-7 w-7 text-ocean" /><span className="text-xs font-semibold text-mist-dim">{String(index + 1).padStart(2, "0")}</span></div><h3>{university.name}</h3>{university.ranking && <p className="text-xs text-ocean">{university.ranking}</p>}{university.description && <p>{university.description}</p>}<Link href="/book">Explore your options<Icon name="arrow" className="h-4 w-4" /></Link></article>)}</div>
      </section>}

      {country.faqs.length > 0 && <section className="country-faq-section container-x" id="questions">
        <div className="country-section-heading"><span className="eyebrow">A LITTLE MORE CLARITY</span><h2>Good questions.<br /><span className="text-gradient-ocean">Clear answers.</span></h2><p>Still wondering about something?<br /><Link href="/book" className="country-text-link mt-4">Let’s talk it through<Icon name="arrow" className="h-4 w-4" /></Link></p></div>
        <div className="country-faqs">{country.faqs.map((faq, index) => <details key={faq.id} className="country-faq"><summary><span className="country-faq-number">{String(index + 1).padStart(2, "0")}</span><h3>{faq.question}</h3><span className="country-faq-plus" aria-hidden>+</span></summary><div className="country-faq-answer"><p>{faq.answer}</p></div></details>)}</div>
      </section>}
      {stories.length > 0 && <Testimonials testimonials={stories} />}
      <section className="country-other container-x"><div><span className="eyebrow">KEEP EXPLORING</span><h2>A world of possibilities.</h2></div><div className="country-other-links">{allCountries.filter((item) => item.slug !== country.slug).map((item) => <Link key={item.slug} href={`/country/${item.slug}`}><CountryFlag slug={item.slug} name={item.name} flag={item.flag} className="!h-4 !w-6" />{item.name}<Icon name="arrow" className="h-3.5 w-3.5" /></Link>)}</div></section>
      <CTA countries={allCountries} />
    </main>
    <Footer /><MobileBottomNav /><MobileBottomCTA />
  </div>;
}
