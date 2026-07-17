"use client";

import Icon from "@/components/ui/Icon";
import { company } from "@/data/company";
import { consultationMethods, type ConsultationMethodId } from "@/data/consultation";

/**
 * Lightweight flow panel for the office & phone methods. Kept separate from the
 * online scheduler so each method's future backend (callback queue, office
 * calendar) can evolve independently without bloating one component.
 */
export default function ContactMethodPanel({
  methodId,
}: {
  methodId: Exclude<ConsultationMethodId, "online">;
}) {
  const method = consultationMethods.find((m) => m.id === methodId)!;
  const isPhone = methodId === "phone";

  const whatsappLink = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(
    isPhone
      ? "Hi TIE Nepal, I'd like to request a phone consultation."
      : "Hi TIE Nepal, I'd like to plan an office visit.",
  )}`;

  return (
    <div className="glass-strong overflow-hidden rounded-5xl border border-ink-line p-6 shadow-card sm:p-9">
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-2xl shadow-blue-soft ring-1 ring-ink-line">
          {method.glyph}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-ocean-deep">
            {method.title}
          </h3>
          <p className="text-sm text-mist-muted">{method.summary}</p>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {isPhone ? (
          <a
            href={`tel:${company.contact.telMobile}`}
            className="group flex items-center gap-3 rounded-3xl border border-ink-line bg-white/70 p-5 transition-colors hover:border-azure/50"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
              <Icon name="compass" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.16em] text-mist-dim">
                Call us now
              </span>
              <span className="font-semibold text-ocean-deep">{company.contact.mobile}</span>
            </span>
          </a>
        ) : (
          <div className="flex items-center gap-3 rounded-3xl border border-ink-line bg-white/70 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean/10 text-ocean">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.16em] text-mist-dim">
                Visit us
              </span>
              <span className="font-semibold text-ocean-deep">{company.location}</span>
            </span>
          </div>
        )}

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-3xl border border-ink-line bg-white/70 p-5 transition-colors hover:border-azure/50"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-[#25D366]">
            <Icon name="whatsapp" className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs uppercase tracking-[0.16em] text-mist-dim">
              Chat on WhatsApp
            </span>
            <span className="font-semibold text-ocean-deep">Usually replies in minutes</span>
          </span>
        </a>
      </div>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {method.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-mist-muted">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {h}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-mist-dim">
        Prefer a specific time? Request a callback and a counselor will confirm your slot.
      </p>
    </div>
  );
}
