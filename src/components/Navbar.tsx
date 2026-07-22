"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";
import { destinations as staticDestinations } from "@/data/destinations";
import DestinationsDropdown from "@/components/DestinationsDropdown";

const links = [
  { label: "About", href: "/#about" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Test Prep", href: "/test-prep" },
  { label: "Services", href: "/services" },
  { label: "Your Journey", href: "/#journey" },
  { label: "Success Stories", href: "/#stories" },
  { label: "Why TIE", href: "/#why" },
];

export default function Navbar({ countries }: { countries?: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const displayCountries = countries || staticDestinations;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="container-x">
        <div
          className={`
            flex items-center justify-between 
            rounded-full 
            px-4 py-2 
            transition-all duration-300 
            mx-auto max-w-[calc(100%-2rem)] sm:max-w-full
            bg-white/82 backdrop-blur-xl 
            border border-white/85 
            shadow-blue-soft
            ${scrolled ? "" : "lg:!bg-transparent lg:!shadow-none lg:!border-transparent lg:!backdrop-blur-none"}
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 pl-1"
            aria-label="TIE Nepal home"
          >
            <Image
              src="/gallery/tie-logo.png"
              alt="Target International Education logo"
              width={42}
              height={42}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl object-contain shadow-blue-soft transition-transform group-hover:scale-105"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[11px] font-bold tracking-wide text-ocean-deep sm:text-sm">
                TIE Nepal
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-mist-muted sm:text-[10px]">
                Target Intl. Education
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul
            className="hidden items-center gap-1 lg:flex relative"
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            {links.map((l) => (
              <li
                key={l.href}
                className={l.label === "Destinations" ? "relative group" : ""}
                onMouseEnter={() => {
                  if (l.label === "Destinations") {
                    setMegaMenuOpen(true);
                  } else {
                    setMegaMenuOpen(false);
                  }
                }}
              >
                <Link
                  href={l.href}
                  className="whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold text-ocean-deep/80 transition-all duration-200 hover:bg-ocean hover:text-white"
                >
                  {l.label}
                </Link>
                {l.label === "Destinations" && (
                  <DestinationsDropdown
                    countries={displayCountries}
                    isOpen={megaMenuOpen}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${company.contact.telMobile}`}
              className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold text-ocean-deep/80 transition-all duration-200 hover:bg-ocean hover:text-white"
            >
              {company.contact.mobile}
            </a>
            <MagneticButton href="/book" className="px-5 py-2.5 text-sm">
              Book Consultation
              <Icon name="arrow" className="h-4 w-4" />
            </MagneticButton>
          </div>

          {/* Mobile phone button */}
          <a
            href={`tel:${company.contact.telMobile}`}
            className="grid h-11 w-11 place-items-center rounded-full glass-strong lg:hidden"
            aria-label="Call TIE Nepal"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a12 12 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full glass-strong lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-5 bg-ocean-deep transition-all ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ocean-deep transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-ocean-deep transition-all ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-ocean-deep/70 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-0 flex flex-col gap-3 bg-white/95 backdrop-blur-lg p-6 pt-24 transition-transform duration-300 lg:hidden ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-4 text-lg font-medium text-ocean-deep transition-colors hover:bg-sky-50 min-h-[44px] flex items-center"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/book"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4"
          >
            Book Free Consultation
            <Icon name="arrow" className="h-4 w-4" />
          </a>
          <div className="mt-4 flex items-center gap-3 px-4">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full bg-sky-50 text-ocean"
            >
              <span className="text-xs font-bold">f</span>
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full bg-sky-50 text-ocean"
            >
              <span className="text-xs font-bold">IG</span>
            </a>
            <a
              href={`tel:${company.contact.telMobile}`}
              className="ml-auto text-sm text-mist-muted"
            >
              {company.contact.mobile}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
