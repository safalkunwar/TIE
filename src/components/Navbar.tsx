"use client";

import { useEffect, useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";

const links = [
  { label: "Destinations", href: "#destinations" },
  { label: "Your Journey", href: "#journey" },
  { label: "Success Stories", href: "#stories" },
  { label: "Why TIE", href: "#why" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when the mobile sheet is open
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
              ? "glass-strong shadow-card"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 pl-1"
            aria-label="TIE Nepal home"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-bright to-gold text-ink shadow-glow-gold">
              <span className="font-display text-lg font-extrabold">T</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-wide text-mist">
                TIE Nepal
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                Target Intl. Education
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-mist-muted transition-colors hover:bg-white/5 hover:text-mist"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="tel:+97761585077"
              className="rounded-full px-3 py-2 text-sm font-medium text-mist-muted transition-colors hover:text-mist"
            >
              +977-61-585077
            </a>
            <MagneticButton href="#book" className="px-5 py-2.5 text-sm">
              Book Consultation
              <Icon name="arrow" className="h-4 w-4" />
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-5 bg-mist transition-all ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-mist transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-mist transition-all ${
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
          className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 bg-ink-soft p-7 pt-24 transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3.5 text-lg font-medium text-mist transition-colors hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4"
          >
            Book Free Consultation
            <Icon name="arrow" className="h-4 w-4" />
          </a>
          <a
            href="tel:+97761585077"
            className="mt-2 px-4 text-sm text-mist-muted"
          >
            Call +977-61-585077
          </a>
        </div>
      </div>
    </header>
  );
}
