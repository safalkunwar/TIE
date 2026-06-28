import { destinations } from "@/data/destinations";
import Icon from "@/components/ui/Icon";

const nav = {
  Company: [
    { label: "About TIE", href: "#why" },
    { label: "Our Journey", href: "#journey" },
    { label: "Success Stories", href: "#stories" },
    { label: "Book Consultation", href: "#book" },
  ],
  Services: [
    { label: "Career Counselling", href: "#book" },
    { label: "University Placement", href: "#destinations" },
    { label: "Visa Support", href: "#journey" },
    { label: "Test Prep (IELTS/PTE)", href: "#book" },
  ],
  Reach: [
    { label: "+977-61-585077", href: "tel:+97761585077" },
    { label: "+977-61-572978", href: "tel:+97761572978" },
    { label: "info@tienepal.com", href: "mailto:info@tienepal.com" },
    { label: "Chippledhunga, Pokhara", href: "#book" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-line pt-20">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-bright to-gold text-ink">
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
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-muted">
              Pokhara's trusted, ICEF-certified study-abroad consultancy since
              2012. Turning dreams of global education into reality — one
              student at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "Facebook", href: "https://facebook.com" },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-mist-muted transition-colors hover:text-mist"
                >
                  <span className="text-xs font-semibold uppercase">
                    {s.label[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(nav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                {heading}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-mist-muted transition-colors hover:text-mist"
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
              className="rounded-full border border-ink-line px-3 py-1.5 text-xs text-mist-muted transition-colors hover:border-white/20 hover:text-mist"
            >
              {d.flag} {d.name}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ink-line py-8 sm:flex-row">
          <p className="text-xs text-mist-dim">
            © {new Date().getFullYear()} Target International Education. ECAN
            member · ICEF certified (IAS 3944). All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-mist-dim">
            <Icon name="shield" className="h-4 w-4 text-mint" />
            Govt. of Nepal approved educational consultancy
          </div>
        </div>
      </div>
    </footer>
  );
}
