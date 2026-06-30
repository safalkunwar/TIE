"use client";

import { useEffect, useState } from "react";
import { destinations } from "@/data/destinations";
import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";

export default function CTA() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production this would POST to the existing Firebase backend.
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(
    "Hi TIE Nepal, I'd like to ask about studying abroad.",
  )}`;

  return (
    <section id="book" className="section relative overflow-hidden">
      {/* Gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, rgba(43,138,240,0.18), transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(30,95,180,0.18), transparent 60%)",
        }}
      />

      <div className="container-x">
        <div className="relative overflow-hidden rounded-5xl border border-ink-line bg-gradient-to-br from-white to-sky-100 p-8 shadow-card sm:p-14">
          {/* grid texture */}
          <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:46px_46px] opacity-50" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="eyebrow">
                <span className="h-px w-6 bg-ocean/50" />
                Start your journey today
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tightest text-ocean-deep sm:text-5xl md:text-6xl">
                Your free consultation is{" "}
                <span className="text-gradient-ocean">one click away.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-mist-muted sm:text-lg">
                Book a 30-minute session with a senior counsellor. We'll review
                your profile, shortlist universities and map your visa pathway —
                no obligation, no cost.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MagneticButton onClick={() => setOpen(true)}>
                  Book Free Consultation
                  <Icon name="arrow" className="h-4 w-4" />
                </MagneticButton>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Icon name="whatsapp" className="h-4 w-4 text-[#25D366]" />
                  WhatsApp us
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-mist-muted">
                <span className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-emerald-500" /> Free,
                  no obligation
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-emerald-500" />{" "}
                  30-min expert session
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 text-emerald-500" /> In
                  Pokhara or online
                </span>
              </div>
            </div>

            {/* Contact quick-card */}
            <div className="glass-strong rounded-4xl p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-ocean-deep">
                Prefer to reach us directly?
              </h3>
              <div className="mt-5 space-y-4 text-sm">
                <a
                  href={`tel:${company.contact.telPrimary}`}
                  className="flex items-center gap-3 text-mist-muted transition-colors hover:text-ocean-deep"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name="globe" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-mist-muted">
                      Landline
                    </span>
                    {company.contact.landlinePrimary}
                    <span className="text-mist-muted">
                      {" "}
                      / {company.contact.landlineSecondary}
                    </span>
                  </span>
                </a>
                <a
                  href={`tel:${company.contact.telMobile}`}
                  className="flex items-center gap-3 text-mist-muted transition-colors hover:text-ocean-deep"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name="compass" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-mist-muted">
                      Mobile / WhatsApp
                    </span>
                    {company.contact.mobile}
                  </span>
                </a>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center gap-3 text-mist-muted transition-colors hover:text-ocean-deep"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name="doc" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-mist-muted">
                      Email
                    </span>
                    {company.contact.email}
                  </span>
                </a>
                <div className="flex items-center gap-3 text-mist-muted">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ocean/10 text-ocean">
                    <Icon name="shield" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-mist-muted">
                      Visit
                    </span>
                    {company.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book a free consultation"
        >
          <div
            className="absolute inset-0 bg-ocean-deep/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg overflow-hidden rounded-4xl border border-ink-line bg-white p-7 shadow-card sm:p-9">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-sky-50 text-mist-muted transition-colors hover:text-ocean-deep"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                  <Icon name="check" className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-ocean-deep">
                  Request received!
                </h3>
                <p className="mt-2 max-w-xs text-sm text-mist-muted">
                  A counsellor will reach out within one business day to confirm
                  your slot. Check your email and WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setOpen(false);
                  }}
                  className="btn-ghost mt-6"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-ocean-deep">
                  Book your free consultation
                </h3>
                <p className="mt-1.5 text-sm text-mist-muted">
                  Tell us a little about you — we'll handle the rest.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Aarati S." required />
                    <Field
                      label="Phone / WhatsApp"
                      name="phone"
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      required
                    />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-mist-muted">
                        Destination of interest
                      </label>
                      <select
                        name="destination"
                        className="w-full rounded-xl border border-ink-line bg-sky-50/60 px-4 py-3 text-sm text-ocean-deep outline-none transition-colors focus:border-azure"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Choose a country
                        </option>
                        {destinations.map((d) => (
                          <option key={d.slug} value={d.slug}>
                            {d.flag} {d.name}
                          </option>
                        ))}
                        <option value="undecided">Still deciding</option>
                      </select>
                    </div>
                    <Field
                      label="Preferred date"
                      name="date"
                      type="date"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary mt-2 w-full">
                    Confirm booking
                    <Icon name="arrow" className="h-4 w-4" />
                  </button>
                  <p className="text-center text-xs text-mist-muted">
                    We'll confirm by email & WhatsApp. No spam, ever.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-mist-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-ink-line bg-sky-50/60 px-4 py-3 text-sm text-ocean-deep outline-none transition-colors placeholder:text-mist-dim focus:border-azure"
      />
    </div>
  );
}
