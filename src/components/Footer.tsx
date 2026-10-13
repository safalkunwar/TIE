import { destinations } from "@/data/destinations";
import { company } from "@/data/company";
import Link from "next/link";
import Image from "next/image";
import CountryFlag from "@/components/ui/CountryFlag";
import Icon from "@/components/ui/Icon";

const nav = {
  Company: [
    { label: "About TIE", href: "/#about" },
    { label: "Our Journey", href: "/#journey" },
    { label: "Success Stories", href: "/#stories" },
    { label: "Credentials", href: "/#why" },
    { label: "Book Consultation", href: "/book" },
  ],
  Services: [
    { label: "Career Counselling", href: "/book" },
    { label: "University Placement", href: "/#destinations" },
    { label: "Visa Support", href: "/#journey" },
    { label: "Test Prep (IELTS/PTE)", href: "/test-prep" },
  ],
  Reach: [
    { label: company.contact.landlinePrimary, href: `tel:${company.contact.telPrimary}` },
    { label: company.contact.mobile, href: `tel:${company.contact.telMobile}` },
    { label: company.contact.email, href: `mailto:${company.contact.email}` },
    { label: company.location, href: "/book" },
  ],
};

export default function Footer() {
  return (
    <footer className="hidden lg:block relative overflow-hidden border-t border-ink-line bg-white/60 pt-12 backdrop-blur">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center gap-2.5 pl-1" aria-label="TIE Nepal home">
              <Image
                src="/gallery/tie-logo.png"
                alt="Target International Education logo"
                width={42}
                height={42}
                className="h-8 w-8 rounded-xl object-contain transition-transform group-hover:scale-105"
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
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-mist-muted">
              Pokhara's trusted, ICEF-accredited study-abroad consultancy since{" "}
              {company.foundedYear}. Turning dreams of global education into
              reality — one student at a time.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-sky-50 text-ocean transition-colors hover:bg-ocean hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.397 2v.675c-.015.075-.03.15-.045.225h-1.8v-.225c0-.45.03-.675.06-.75h2.145v3.375h-2.4v2.7h2.25l.3-.6h.6v.6l-.3 2.7h-2.85V22h-3.3v-6.9h-2.4v-2.7h2.4v-1.8c0-2.7 1.35-4.5 4.05-4.5z" />
                </svg>
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full bg-sky-50 text-ocean transition-colors hover:bg-ocean hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={company.social.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="grid h-9 w-9 place-items-center rounded-full bg-sky-50 text-ocean transition-colors hover:bg-ocean hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(nav).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-ocean">
                {heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-xs text-mist-muted transition-colors hover:text-ocean-deep"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Destinations ribbon */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-ink-line pt-6">
          {destinations.map((d) => (
            <Link
              key={d.slug}
              href={`/country/${d.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-line px-2.5 py-1 text-xs text-mist-muted transition-colors hover:border-azure hover:text-ocean-deep"
            >
              <CountryFlag slug={d.slug} name={d.name} flag={d.flag} className="!h-3.5 !w-5" />{d.name}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ink-line py-5 sm:flex-row">
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
