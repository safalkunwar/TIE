"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";

export default function CTA({ countries }: { countries?: any[] }) {
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
                <MagneticButton href="/book">
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
    </section>
  );
}
