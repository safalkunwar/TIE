"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import {
  getAvailableSlots,
  timeZones,
  bookingDeliverables,
  consultationMethods,
  type ConsultationMethodId,
} from "@/data/consultation";
import { createBooking, type BookingConfirmation } from "@/lib/bookingService";

/** Build the next `count` selectable days starting today (client-local). */
function buildDays(count: number) {
  const days: { iso: string; weekday: string; day: string; month: string }[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
    days.push({
      iso,
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return days;
}

type Step = "select" | "confirming" | "confirmed";

export default function OnlineScheduler({
  methodId,
}: {
  methodId: ConsultationMethodId;
}) {
  const method = consultationMethods.find((m) => m.id === methodId)!;
  const days = useMemo(() => buildDays(14), []);

  const [dateISO, setDateISO] = useState<string>(days[0].iso);
  const [slot, setSlot] = useState<string | null>(null);
  const [timeZone, setTimeZone] = useState<string>(timeZones[0].value);
  const [step, setStep] = useState<Step>("select");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const slots = useMemo(() => getAvailableSlots(dateISO), [dateISO]);
  const canConfirm = Boolean(dateISO && slot);

  const handleConfirm = async () => {
    if (!canConfirm || !slot) return;
    setStep("confirming");
    // Delegates to the service seam (Zoom/Calendar/email plug in there later).
    const result = await createBooking({ method: methodId, dateISO, slot, timeZone });
    setConfirmation(result);
    setStep("confirmed");
  };

  const reset = () => {
    setStep("select");
    setSlot(null);
    setConfirmation(null);
  };

  if (step === "confirmed" && confirmation) {
    return <Confirmation confirmation={confirmation} onReset={reset} />;
  }

  const selectedDay = days.find((d) => d.iso === dateISO);
  const selectedSlotLabel = slots.find((s) => s.value === slot)?.label;

  return (
    <div className="glass-strong overflow-hidden rounded-5xl border border-ink-line p-6 shadow-card sm:p-9">
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-2xl shadow-blue-soft ring-1 ring-ink-line">
          {method.glyph}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-ocean-deep">
            Schedule your {method.title.toLowerCase()}
          </h3>
          <p className="text-sm text-mist-muted">
            Pick a date, time and time zone. Confirmation is instant.
          </p>
        </div>
      </div>

      {/* Date picker */}
      <fieldset className="mt-8">
        <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ocean-deep">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-azure/10 text-[11px] text-azure">
            1
          </span>
          Choose a date
        </legend>
        <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1">
          {days.map((d) => {
            const active = d.iso === dateISO;
            return (
              <button
                key={d.iso}
                type="button"
                onClick={() => {
                  setDateISO(d.iso);
                  setSlot(null);
                }}
                aria-pressed={active}
                className={`flex min-w-[68px] flex-col items-center rounded-2xl border px-3 py-3 transition-all duration-200 ${
                  active
                    ? "border-azure bg-gradient-to-b from-azure to-ocean text-white shadow-blue-soft"
                    : "border-ink-line bg-white/70 text-ocean-deep hover:border-azure/50 hover:bg-white"
                }`}
              >
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${active ? "text-white/80" : "text-mist-dim"}`}>
                  {d.weekday}
                </span>
                <span className="mt-0.5 text-xl font-bold">{d.day}</span>
                <span className={`text-[11px] ${active ? "text-white/80" : "text-mist-dim"}`}>
                  {d.month}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Time slots */}
      <fieldset className="mt-8">
        <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ocean-deep">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-azure/10 text-[11px] text-azure">
            2
          </span>
          Available time slots
        </legend>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {slots.map((s) => {
            const active = s.value === slot;
            return (
              <button
                key={s.value}
                type="button"
                disabled={!s.available}
                onClick={() => setSlot(s.value)}
                aria-pressed={active}
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  !s.available
                    ? "cursor-not-allowed border-ink-line bg-ink-line/20 text-mist-dim line-through"
                    : active
                      ? "border-azure bg-azure text-white shadow-blue-soft"
                      : "border-ink-line bg-white/70 text-ocean-deep hover:border-azure/50 hover:bg-white"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Time zone */}
      <fieldset className="mt-8">
        <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ocean-deep">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-azure/10 text-[11px] text-azure">
            3
          </span>
          Time zone
        </legend>
        <div className="relative">
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full appearance-none rounded-xl border border-ink-line bg-white/70 px-4 py-3 pr-10 text-sm font-medium text-ocean-deep outline-none transition-colors focus:border-azure"
          >
            {timeZones.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </fieldset>

      {/* Deliverables preview (Zoom-ready placeholders) */}
      <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {bookingDeliverables.map((d) => (
          <div
            key={d.label}
            className="rounded-2xl border border-ink-line bg-white/60 p-3 text-center"
          >
            <span className="text-lg">{d.glyph}</span>
            <p className="mt-1 text-xs font-semibold text-ocean-deep">{d.label}</p>
            <p className="text-[10px] text-mist-dim">{d.note}</p>
          </div>
        ))}
      </div>

      {/* Summary + confirm */}
      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-ink-line bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm">
          <p className="font-semibold text-ocean-deep">
            {selectedDay ? `${selectedDay.weekday}, ${selectedDay.month} ${selectedDay.day}` : "Select a date"}
            {selectedSlotLabel ? ` · ${selectedSlotLabel}` : ""}
          </p>
          <p className="text-mist-muted">
            {slot ? "You're all set to confirm." : "Choose an available time slot to continue."}
          </p>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm || step === "confirming"}
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {step === "confirming" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Confirming…
            </>
          ) : (
            <>
              Confirm booking
              <Icon name="arrow" className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Confirmation screen                                                 */
/* ------------------------------------------------------------------ */

function Confirmation({
  confirmation,
  onReset,
}: {
  confirmation: BookingConfirmation;
  onReset: () => void;
}) {
  const { booking, meetingCode, meetingUrl } = confirmation;
  const day = new Date(booking.dateISO).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="glass-strong overflow-hidden rounded-5xl border border-ink-line p-7 text-center shadow-card sm:p-11">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
        <Icon name="check" className="h-8 w-8" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-bold text-ocean-deep">
        Your meeting is booked!
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-mist-muted">
        {day}. A confirmation with your secure link and calendar invite is on its way.
      </p>

      <div className="mx-auto mt-6 max-w-sm rounded-3xl border border-ink-line bg-white/70 p-5 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-mist-muted">Meeting code</span>
          <span className="font-mono font-bold text-ocean-deep">{meetingCode}</span>
        </div>
        <div className="mt-3 border-t border-ink-line pt-3">
          {bookingDeliverables.map((d) => (
            <div key={d.label} className="flex items-center gap-2.5 py-1.5 text-sm">
              <Icon name="check" className="h-4 w-4 shrink-0 text-emerald-500" />
              <span className="text-ocean-deep">{d.label}</span>
              <span className="ml-auto text-xs text-mist-dim">Ready</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {/* Placeholder join link — becomes the real Zoom URL post-integration. */}
        <a
          href={meetingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          aria-label="Open placeholder meeting link"
        >
          <Icon name="play" className="h-4 w-4" />
          Join link (placeholder)
        </a>
        <button type="button" onClick={onReset} className="btn-ghost">
          Book another slot
        </button>
      </div>
      <p className="mt-4 text-xs text-mist-dim">
        Backend integration pending — Zoom, calendar and email are simulated for now.
      </p>
    </div>
  );
}
