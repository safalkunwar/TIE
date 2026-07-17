import { destinations } from "@/data/destinations";
import { company } from "@/data/company";
import Icon from "@/components/ui/Icon";

const nav = {
  Company: [
    { label: "About TIE", href: "#about" },
    { label: "Our Journey", href: "#journey" },
    { label: "Success Stories", href: "#stories" },
    { label: "Credentials", href: "#credentials" },
    { label: "Book Consultation", href: "#book" },
  ],
  Services: [
    { label: "Career Counselling", href: "#book" },
    { label: "University Placement", href: "#destinations" },
    { label: "Visa Support", href: "#journey" },
    { label: "Test Prep (IELTS/PTE)", href: "#book" },
  ],
  Reach: [
    { label: company.contact.landlinePrimary, href: `tel:${company.contact.telPrimary}` },
    { label: company.contact.mobile, href: `tel:${company.contact.telMobile}` },
    { label: company.contact.email, href: `mailto:${company.contact.email}` },
    { label: company.location, href: "#book" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line bg-white/60 pt-20 backdrop-blur">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-azure to-ocean text-white">
                <span className="font-display text-lg font-extrabold">T</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-sm font-bold tracking-wide text-ocean-deep">
                  TIE Nepal
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-mist-muted">
                  Target Intl. Education
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-muted">
              Pokhara's trusted, ICEF-accredited study-abroad consultancy since{" "}
              {company.foundedYear}. Turning dreams of global education into
              reality — one student at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "Facebook", href: company.social.facebook, glyph: "f" },
                { label: "Instagram", href: company.social.instagram, glyph: "IG" },
                { label: "Website", href: company.social.website, glyph: "W" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-sky-50 text-ocean transition-colors hover:bg-ocean hover:text-white"
                >
                  <span className="text-xs font-bold">{s.glyph}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(nav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean">
                {heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-mist-muted transition-colors hover:text-ocean-deep"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Destinations ribbon */}
        <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-ink-line pt-8">
          {destinations.map((d) => (
            <a
              key={d.slug}
              href="#destinations"
              className="rounded-full border border-ink-line px-3 py-1.5 text-xs text-mist-muted transition-colors hover:border-azure hover:text-ocean-deep"
            >
              {d.flag} {d.name}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-line py-8 sm:flex-row">
          <p className="text-xs text-mist-muted">
            © {new Date().getFullYear()} {company.name}. ECAN member · ICEF
            accredited. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-mist-muted">
            <Icon name="shield" className="h-4 w-4 text-emerald-500" />
            Govt. of Nepal approved educational consultancy
          </div>
        </div>
      </div>
    </footer>
  );
}
