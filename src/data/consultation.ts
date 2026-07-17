/**
 * Consultation & lead-generation mock data.
 *
 * IMPORTANT: This file contains ONLY structured mock data + types. No business
 * logic lives here. Every shape is designed to be swapped for a real API
 * response later (Zoom scheduling, Google Calendar, scholarship management)
 * with minimal refactoring — components consume these types, not literals.
 */

/* ------------------------------------------------------------------ */
/* Consultation methods                                               */
/* ------------------------------------------------------------------ */

export type ConsultationMethodId = "online" | "office" | "phone";

export type ConsultationMethod = {
  id: ConsultationMethodId;
  /** Emoji used as the card glyph (kept as data so it can be CMS-driven). */
  glyph: string;
  title: string;
  /** One-line hook shown under the title. */
  summary: string;
  /** Estimated duration label, e.g. "30–45 min". */
  duration: string;
  /** Bullet list of what's included. */
  highlights: string[];
  /** CTA label for the card button. */
  cta: string;
  /**
   * When true the method opens the interactive scheduler. Other methods can be
   * pointed at a phone/office flow later without touching the card component.
   */
  schedulable: boolean;
  /** Optional accent used for subtle per-card theming. */
  accent: "azure" | "gold" | "emerald";
  /** Marketing badge, e.g. "Most popular". Optional. */
  badge?: string;
};

export const consultationMethods: ConsultationMethod[] = [
  {
    id: "online",
    glyph: "🎥",
    title: "Online Consultation",
    summary: "One-on-one Zoom meeting with a certified counselor.",
    duration: "30–45 min",
    highlights: [
      "Meet a certified education counselor",
      "Screen sharing for live university walkthroughs",
      "Personalized university recommendations",
      "Scholarship assessment",
      "Visa guidance",
      "Instant confirmation after booking",
    ],
    cta: "Schedule online meeting",
    schedulable: true,
    accent: "azure",
    badge: "Most popular",
  },
  {
    id: "office",
    glyph: "🏢",
    title: "Office Visit",
    summary: "Face-to-face guidance at your nearest TIE Nepal office.",
    duration: "45–60 min",
    highlights: [
      "Visit the nearest TIE Nepal office",
      "Face-to-face consultation",
      "Document review",
      "University comparison",
      "Application planning",
    ],
    cta: "Plan an office visit",
    schedulable: true,
    accent: "gold",
  },
  {
    id: "phone",
    glyph: "📞",
    title: "Phone Consultation",
    summary: "A quick call for fast answers on the go.",
    duration: "15–20 min",
    highlights: [
      "Quick consultation",
      "Career guidance",
      "Admission questions",
      "Visa overview",
    ],
    cta: "Request a callback",
    schedulable: true,
    accent: "emerald",
  },
];

/* ------------------------------------------------------------------ */
/* Scheduling (Zoom-ready)                                            */
/* ------------------------------------------------------------------ */

export type TimeSlot = {
  /** 24h "HH:MM" — stable machine value for the future API. */
  value: string;
  /** Human label, e.g. "10:00 AM". */
  label: string;
  /** Availability so the UI can disable taken slots (mock for now). */
  available: boolean;
};

export type TimeZoneOption = {
  value: string; // IANA-style id, e.g. "Asia/Kathmandu"
  label: string; // "Nepal (NPT, UTC+5:45)"
};

export const timeZones: TimeZoneOption[] = [
  { value: "Asia/Kathmandu", label: "Nepal — NPT (UTC+5:45)" },
  { value: "Asia/Kolkata", label: "India — IST (UTC+5:30)" },
  { value: "Australia/Sydney", label: "Australia — AEST (UTC+10)" },
  { value: "America/New_York", label: "USA East — EST (UTC−5)" },
  { value: "Europe/London", label: "UK — GMT (UTC+0)" },
  { value: "America/Toronto", label: "Canada East — EST (UTC−5)" },
];

/**
 * Mock slot generator. In production this becomes a call like
 * `GET /api/availability?date=YYYY-MM-DD&tz=Asia/Kathmandu`. The component
 * already treats it as async-shaped data, so swapping is a one-line change.
 */
export function getAvailableSlots(dateISO: string): TimeSlot[] {
  const base: Array<[string, string]> = [
    ["09:00", "9:00 AM"],
    ["10:00", "10:00 AM"],
    ["11:00", "11:00 AM"],
    ["12:00", "12:00 PM"],
    ["14:00", "2:00 PM"],
    ["15:00", "3:00 PM"],
    ["16:00", "4:00 PM"],
    ["17:00", "5:00 PM"],
  ];
  // Deterministic pseudo-availability from the date string so the mock is
  // stable across renders but varies by day (feels real, no randomness churn).
  const seed = dateISO.split("-").reduce((a, p) => a + Number(p), 0);
  return base.map(([value, label], i) => ({
    value,
    label,
    available: (seed + i) % 3 !== 0,
  }));
}

export type ConsultationBooking = {
  method: ConsultationMethodId;
  dateISO: string;
  slot: string;
  timeZone: string;
};

/** Deliverables surfaced on the confirmation screen (Zoom-ready placeholders). */
export const bookingDeliverables: { glyph: string; label: string; note: string }[] = [
  { glyph: "🎥", label: "Zoom Meeting", note: "Auto-created when you book" },
  { glyph: "🔒", label: "Secure Meeting Link", note: "Unique & encrypted" },
  { glyph: "🗓️", label: "Calendar Reminder", note: "Google & Outlook invite" },
  { glyph: "✉️", label: "Email Confirmation", note: "Sent instantly" },
];

/* ------------------------------------------------------------------ */
/* Scholarships                                                        */
/* ------------------------------------------------------------------ */

export type ScholarshipStatus = "available" | "limited" | "closing-soon";

export type ScholarshipCategory =
  | "merit"
  | "need-based"
  | "university"
  | "government"
  | "partner";

export type Scholarship = {
  id: string;
  category: ScholarshipCategory;
  glyph: string;
  name: string;
  /** Coverage as a percentage of tuition (0–100). */
  coveragePct: number;
  /** Human award ceiling label, e.g. "AUD 50,000". */
  maxAward: string;
  /** Country slugs / names this applies to. */
  eligibleCountries: string[];
  /** ISO date string for the deadline (machine value). */
  deadlineISO: string;
  /** Short eligibility summary sentence. */
  eligibility: string;
  status: ScholarshipStatus;
};

export const scholarshipCategoryMeta: Record<
  ScholarshipCategory,
  { glyph: string; label: string }
> = {
  merit: { glyph: "🏆", label: "Merit Scholarships" },
  "need-based": { glyph: "💰", label: "Need-Based Scholarships" },
  university: { glyph: "🎓", label: "University Scholarships" },
  government: { glyph: "🌍", label: "Government Scholarships" },
  partner: { glyph: "🤝", label: "Partner Institution Scholarships" },
};

export const scholarshipStatusMeta: Record<
  ScholarshipStatus,
  { label: string; tone: "emerald" | "amber" | "rose" }
> = {
  available: { label: "Available", tone: "emerald" },
  limited: { label: "Limited", tone: "amber" },
  "closing-soon": { label: "Closing Soon", tone: "rose" },
};

export const scholarships: Scholarship[] = [
  {
    id: "merit-global-excellence",
    category: "merit",
    glyph: "🏆",
    name: "Global Excellence Merit Award",
    coveragePct: 50,
    maxAward: "AUD 50,000",
    eligibleCountries: ["Australia", "United Kingdom", "New Zealand"],
    deadlineISO: "2026-03-31",
    eligibility: "GPA 3.5+ / 80%+ with strong academic record.",
    status: "available",
  },
  {
    id: "need-based-access",
    category: "need-based",
    glyph: "💰",
    name: "Access & Opportunity Grant",
    coveragePct: 40,
    maxAward: "USD 20,000",
    eligibleCountries: ["Canada", "United States", "Ireland"],
    deadlineISO: "2026-02-15",
    eligibility: "Demonstrated financial need + admission offer.",
    status: "limited",
  },
  {
    id: "university-vc",
    category: "university",
    glyph: "🎓",
    name: "Vice-Chancellor's International Scholarship",
    coveragePct: 35,
    maxAward: "GBP 15,000",
    eligibleCountries: ["United Kingdom", "Australia"],
    deadlineISO: "2026-01-20",
    eligibility: "Offer holders in eligible postgraduate programs.",
    status: "closing-soon",
  },
  {
    id: "government-destination",
    category: "government",
    glyph: "🌍",
    name: "Destination Australia (Government)",
    coveragePct: 60,
    maxAward: "AUD 15,000 / yr",
    eligibleCountries: ["Australia"],
    deadlineISO: "2026-04-30",
    eligibility: "Enrolling at a participating regional campus.",
    status: "available",
  },
  {
    id: "partner-pathway",
    category: "partner",
    glyph: "🤝",
    name: "Partner Pathway Tuition Waiver",
    coveragePct: 25,
    maxAward: "USD 8,000",
    eligibleCountries: ["United States", "Canada", "New Zealand", "Ireland"],
    deadlineISO: "2026-05-31",
    eligibility: "Applying through a TIE partner institution.",
    status: "available",
  },
];

/* ------------------------------------------------------------------ */
/* Scholarship estimator options                                      */
/* ------------------------------------------------------------------ */

export type EstimatorOption = { value: string; label: string; weight: number };

export type EstimatorFieldId =
  | "education"
  | "gpa"
  | "country"
  | "course"
  | "englishTest"
  | "budget";

export type EstimatorField = {
  id: EstimatorFieldId;
  label: string;
  glyph: string;
  options: EstimatorOption[];
};

/**
 * The `weight` values feed a transparent, non-authoritative preview score.
 * Real qualification logic will live behind an API; the component only sums
 * weights and never encodes business rules beyond a display estimate.
 */
export const estimatorFields: EstimatorField[] = [
  {
    id: "education",
    label: "Current education",
    glyph: "🎓",
    options: [
      { value: "high-school", label: "High school (+2)", weight: 12 },
      { value: "bachelors", label: "Bachelor's", weight: 18 },
      { value: "masters", label: "Master's", weight: 20 },
    ],
  },
  {
    id: "gpa",
    label: "GPA / percentage",
    glyph: "📊",
    options: [
      { value: "low", label: "Below 60%", weight: 6 },
      { value: "mid", label: "60–74%", weight: 12 },
      { value: "high", label: "75–84%", weight: 18 },
      { value: "top", label: "85%+", weight: 24 },
    ],
  },
  {
    id: "country",
    label: "Preferred country",
    glyph: "🌍",
    options: [
      { value: "australia", label: "Australia", weight: 16 },
      { value: "uk", label: "United Kingdom", weight: 15 },
      { value: "canada", label: "Canada", weight: 15 },
      { value: "usa", label: "United States", weight: 14 },
      { value: "other", label: "Still deciding", weight: 10 },
    ],
  },
  {
    id: "course",
    label: "Preferred course",
    glyph: "📚",
    options: [
      { value: "stem", label: "STEM / Engineering / IT", weight: 18 },
      { value: "business", label: "Business / Management", weight: 15 },
      { value: "health", label: "Health / Nursing", weight: 16 },
      { value: "arts", label: "Arts / Humanities", weight: 12 },
    ],
  },
  {
    id: "englishTest",
    label: "English test",
    glyph: "🗣️",
    options: [
      { value: "none", label: "Not taken yet", weight: 6 },
      { value: "band6", label: "IELTS 6.0 / PTE 50", weight: 12 },
      { value: "band65", label: "IELTS 6.5 / PTE 58", weight: 18 },
      { value: "band7", label: "IELTS 7.0+ / PTE 65+", weight: 24 },
    ],
  },
  {
    id: "budget",
    label: "Estimated yearly budget",
    glyph: "💵",
    options: [
      { value: "low", label: "Under USD 15k", weight: 16 },
      { value: "mid", label: "USD 15k–30k", weight: 12 },
      { value: "high", label: "USD 30k+", weight: 8 },
    ],
  },
];

/**
 * Pure, side-effect-free estimate. Kept out of components so it can be replaced
 * by an API response mapper without UI changes. Returns a clamped percentage.
 */
export function estimateScholarshipPct(
  answers: Partial<Record<EstimatorFieldId, string>>,
): number | null {
  const answered = estimatorFields.filter((f) => answers[f.id]);
  if (answered.length < estimatorFields.length) return null;

  const total = answered.reduce((sum, field) => {
    const opt = field.options.find((o) => o.value === answers[field.id]);
    return sum + (opt?.weight ?? 0);
  }, 0);

  const maxTotal = estimatorFields.reduce(
    (sum, f) => sum + Math.max(...f.options.map((o) => o.weight)),
    0,
  );

  // Normalize to a friendly 20–90% preview band.
  const ratio = total / maxTotal;
  return Math.round(20 + ratio * 70);
}

/* ------------------------------------------------------------------ */
/* Trust builders                                                      */
/* ------------------------------------------------------------------ */

export type TrustStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  glyph: string;
};

export const trustStats: TrustStat[] = [
  { label: "Students Successfully Placed", value: 5000, suffix: "+", glyph: "🎓" },
  { label: "Visa Success Rate", value: 97, suffix: "%", glyph: "🛂" },
  { label: "Partner Universities", value: 350, suffix: "+", glyph: "🏛️" },
  { label: "Scholarships Awarded", value: 1200, suffix: "+", glyph: "🏆" },
  { label: "Avg. Response Time", value: 2, suffix: " hrs", glyph: "⚡" },
  { label: "Google Rating", value: 4.9, decimals: 1, suffix: "★", glyph: "⭐" },
];
