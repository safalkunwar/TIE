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
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "glass-strong shadow-blue-soft"
              : "border border-transparent bg-transparent"
          }`}
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
              className="h-10 w-10 rounded-xl object-contain shadow-blue-soft transition-transform group-hover:scale-105"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-wide text-ocean-deep">
                TIE Nepal
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                Target Intl. Education
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex relative" onMouseLeave={() => setMegaMenuOpen(false)}>
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
                  className="rounded-full px-4 py-2 text-sm font-semibold text-ocean-deep/80 transition-all duration-200 hover:bg-ocean hover:text-white"
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
              className="rounded-full px-3 py-2 text-sm font-semibold text-ocean-deep/80 transition-all duration-200 hover:bg-ocean hover:text-white"
            >
              {company.contact.mobile}
            </a>
            <MagneticButton href="#book" className="px-5 py-2.5 text-sm">
              Book Consultation
              <Icon name="arrow" className="h-4 w-4" />
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full glass-strong lg:hidden"
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
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-white p-7 pt-24 shadow-card transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3.5 text-lg font-medium text-ocean-deep transition-colors hover:bg-sky-50"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#book"
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
