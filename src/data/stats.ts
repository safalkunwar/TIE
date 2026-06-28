export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  /** Decimals to display when animating. */
  decimals?: number;
  blurb: string;
};

export const stats: Stat[] = [
  {
    label: "Years of Trust",
    value: 13,
    suffix: "+",
    blurb: "Guiding students since 2012 from Pokhara to the world.",
  },
  {
    label: "Students Placed",
    value: 5000,
    suffix: "+",
    blurb: "Dreams turned into enrolment letters across 8 countries.",
  },
  {
    label: "Visa Success Rate",
    value: 97,
    suffix: "%",
    blurb: "Meticulous documentation and mock interview prep.",
  },
  {
    label: "Partner Universities",
    value: 350,
    suffix: "+",
    blurb: "Direct institutional relationships, not a directory.",
  },
];
