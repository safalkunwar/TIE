"use client";

import { forwardRef, useMemo, useState } from "react";
import Icon from "@/components/ui/Icon";
import {
  estimatorFields,
  estimateScholarshipPct,
  type EstimatorFieldId,
} from "@/data/consultation";

type Answers = Partial<Record<EstimatorFieldId, string>>;

/**
 * Personalized scholarship estimator (preview only).
 *
 * Reusable + backend-ready: it collects answers and delegates the calculation
 * to `estimateScholarshipPct` (a pure data helper). Swap that helper for an API
 * mapper later and this component is unchanged. Exposes a ref so the parent can
 * scroll to it from the scholarship "Check my eligibility" buttons.
 */
const ScholarshipEstimator = forwardRef<HTMLDivElement, { onBook?: () => void }>(
  function ScholarshipEstimator({ onBook }, ref) {
    const [answers, setAnswers] = useState<Answers>({});
    const [revealed, setRevealed] = useState(false);

    const answeredCount = Object.keys(answers).length;
    const progress = Math.round((answeredCount / estimatorFields.length) * 100);
    const estimate = useMemo(() => estimateScholarshipPct(answers), [answers]);

    const select = (field: EstimatorFieldId, value: string) => {
      setAnswers((prev) => ({ ...prev, [field]: value }));
      setRevealed(false);
    };

    return (
      <div
        ref={ref}
        className="glass-strong overflow-hidden rounded-5xl border border-ink-line p-6 shadow-card sm:p-9"
      >
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Questions */}
          <div>
            <div className="flex items-center justify-between">
              <span className="eyebrow">
                <span className="h-px w-6 bg-ocean/50" />
                Quick estimate
              </span>
              <span className="text-xs font-semibold text-mist-muted">
                {answeredCount}/{estimatorFields.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sky-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-azure to-ocean transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-6 space-y-5">
              {estimatorFields.map((field) => (
                <fieldset key={field.id}>
                  <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-ocean-deep">
                    <span className="text-base">{field.glyph}</span>
                    {field.label}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {field.options.map((opt) => {
                      const active = answers[field.id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => select(field.id, opt.value)}
                          aria-pressed={active}
                          className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                            active
                              ? "border-azure bg-azure text-white shadow-blue-soft"
                              : "border-ink-line bg-white/70 text-ocean-deep hover:border-azure/50 hover:bg-white"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>

          {/* Result panel */}
          <div className="flex flex-col rounded-4xl border border-ink-line bg-gradient-to-br from-white to-sky-100 p-6">
            <h3 className="font-display text-lg font-bold text-ocean-deep">
              Your estimate
            </h3>
            <p className="mt-1 text-sm text-mist-muted">
              A quick preview based on your answers.
            </p>

            <div className="my-6 flex flex-1 flex-col items-center justify-center text-center">
              {revealed && estimate !== null ? (
                <>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-mist-dim">
                    You may qualify for up to
                  </span>
                  <span className="mt-2 font-display text-6xl font-bold tracking-tightest text-gradient-ocean">
                    {estimate}%
                  </span>
                  <span className="text-sm font-medium text-ocean-deep">
                    scholarship coverage
                  </span>
                  <p className="mt-3 max-w-[16rem] text-xs text-mist-dim">
                    This is an estimate only. A counselor confirms your exact
                    eligibility during your consultation.
                  </p>
                </>
              ) : (
                <>
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-3xl shadow-blue-soft">
                    🎯
                  </span>
                  <p className="mt-4 max-w-[16rem] text-sm text-mist-muted">
                    {estimate === null
                      ? "Answer all questions to reveal your personalized estimate."
                      : "Tap the button to reveal your personalized estimate."}
                  </p>
                </>
              )}
            </div>

            {!revealed ? (
              <button
                type="button"
                disabled={estimate === null}
                onClick={() => setRevealed(true)}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reveal my estimate
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            ) : (
              <button type="button" onClick={onBook} className="btn-primary w-full">
                Book a consultation
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default ScholarshipEstimator;
