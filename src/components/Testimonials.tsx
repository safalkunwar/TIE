"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import CountryFlag from "@/components/ui/CountryFlag";
import Icon from "@/components/ui/Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type TestimonialProp = {
  name: string;
  destination: string;
  slug: string;
  flag: string;
  quote: string;
  image: string;
  visaGranted: boolean;
  sourceUrl?: string | null;
};

export default function Testimonials({ testimonials = [] }: { testimonials?: TestimonialProp[] }) {
  const stories = testimonials.filter((story) => story.visaGranted && story.name.trim() && story.quote.trim());
  const [destination, setDestination] = useState("all");
  const countries = Array.from(new Set(stories.map((story) => story.destination)));
  const currentDestination = countries.includes(destination) ? destination : "all";
  const filtered = stories.filter((story) => currentDestination === "all" || story.destination === currentDestination);
  const rail = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, start: true, end: false });
  const railId = useId();
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    const update = () => {
      const cards = Array.from(node.querySelectorAll<HTMLElement>("[data-visa-card]"));
      const nearest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft - node.scrollLeft) < Math.abs((cards[best]?.offsetLeft ?? 0) - node.scrollLeft) ? index : best, 0);
      setPosition({ index: nearest, start: node.scrollLeft < 8, end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 8 });
    };
    update();
    node.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => { node.removeEventListener("scroll", update); observer.disconnect(); };
  }, [currentDestination, filtered.length]);

  const move = (direction: number) => {
    const node = rail.current;
    const card = node?.querySelector<HTMLElement>("[data-visa-card]");
    if (node && card) node.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: reduced ? "auto" : "smooth" });
  };
  const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    if (event.key === "Home" || event.key === "End") { event.preventDefault(); rail.current?.scrollTo({ left: event.key === "Home" ? 0 : rail.current.scrollWidth, behavior: reduced ? "auto" : "smooth" }); }
  };

  return <section id="stories" className="stories-section section scroll-mt-24">
    <div className="container-x">
      <div className="stories-heading">
        <SectionHeading align="left" eyebrow="Visa success stories" title={<>Their next chapter.<br /><span className="text-gradient-ocean">Your inspiration.</span></>} description="A visa approved. A dream taking flight. Meet the students who started their journey with TIE." />
        <Link href="/book" className="stories-heading-link">Start your own story<Icon name="arrow" className="h-4 w-4" /></Link>
      </div>
      {countries.length > 1 && <div className="stories-filters" role="group" aria-label="Filter visa stories by destination">
        {["all", ...countries].map((country) => <button key={country} type="button" aria-pressed={currentDestination === country} className={`stories-filter ${currentDestination === country ? "is-active" : ""}`} onClick={() => { setDestination(country); rail.current?.scrollTo({ left: 0, behavior: "auto" }); }}>{country === "all" ? "All destinations" : country}</button>)}
      </div>}
      <div ref={rail} id={railId} className="visa-rail" role="region" aria-roledescription="carousel" aria-label="Visa granted students. Scroll sideways for more stories." tabIndex={0} onKeyDown={handleKeys} data-lenis-prevent>
        {filtered.map((story, index) => <article className="visa-card" data-visa-card key={`${story.name}-${story.slug}`} aria-roledescription="slide" aria-label={`${index + 1} of ${filtered.length}: ${story.name}`}>
          <div className="visa-card-portrait">
            <span className="visa-card-edition">TIE STUDENT STORIES</span>
            <span className="visa-card-number" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            <div className="visa-portrait"><StudentPhoto story={story} /></div>
            <span className="visa-stamp"><Icon name="check" className="h-3.5 w-3.5" />Visa granted</span>
          </div>
          <div className="visa-card-body">
            <div className="visa-route"><span>Nepal</span><span className="visa-route-line" /><Icon name="plane" className="h-4 w-4" /><span>{story.destination}</span><CountryFlag slug={story.slug} name={story.destination} flag={story.flag} className="!h-4 !w-6" /></div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ocean-deep">{story.name}</h3>
            <blockquote className="visa-quote">“{story.quote}”</blockquote>
            {story.sourceUrl && /^https?:\/\//.test(story.sourceUrl) && <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="visa-story-link">Read their story<span className="sr-only"> on the TIE website (opens in a new tab)</span><Icon name="arrow" className="h-4 w-4 -rotate-45" /></a>}
          </div>
        </article>)}
        <article className="visa-card visa-invitation" data-visa-card aria-label="Start your study journey">
          <span className="visa-invitation-icon"><Icon name="plane" className="h-7 w-7" /></span>
          <span className="text-[10px] font-bold uppercase tracking-[.2em] text-sky-200">Room for your story</span>
          <h3 className="font-display text-4xl font-semibold leading-tight tracking-tight">Where will<br />your dream<br /><span className="text-[#b8dbff]">take you?</span></h3>
          <p className="max-w-[230px] text-sm leading-relaxed text-sky-100/80">Let’s turn your questions into a plan. Your first conversation is on us.</p>
          <Link href="/book" className="visa-invitation-link">Meet your counsellor<Icon name="arrow" className="h-4 w-4" /></Link>
        </article>
      </div>
      {filtered.length > 0 && <div className="visa-rail-footer">
        <div className="flex items-center gap-3"><span className="visa-scroll-line" aria-hidden><span style={{ width: `${100 / (filtered.length + 1)}%`, transform: `translateX(${position.index * 100}%)` }} /></span><span className="text-[11px] text-mist-muted">Scroll to explore</span></div>
        <div className="flex gap-2">
          <button type="button" className="story-arrow" aria-label="Previous visa stories" aria-controls={railId} disabled={position.start} onClick={() => move(-1)}><Icon name="arrow" className="h-4 w-4 rotate-180" /></button>
          <button type="button" className="story-arrow story-arrow-next" aria-label="Next visa stories" aria-controls={railId} disabled={position.end} onClick={() => move(1)}><Icon name="arrow" className="h-4 w-4" /></button>
        </div>
      </div>}
    </div>
  </section>;
}

function StudentPhoto({ story }: { story: TestimonialProp }) {
  const [failed, setFailed] = useState(false);
  const allowed = (story.image.startsWith("/") && !story.image.startsWith("//")) || /^https:\/\/(images\.pexels\.com|images\.unsplash\.com|plus\.unsplash\.com)\//.test(story.image);
  return <>
    <span className="visa-photo-placeholder" aria-hidden>{story.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("")}</span>
    {story.image && allowed && !failed && <Image src={story.image} alt={`Portrait of ${story.name}`} fill sizes="180px" className="object-cover" onError={() => setFailed(true)} />}
  </>;
}
