export type JourneyStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
};

export const journey: JourneyStep[] = [
  {
    id: "dream",
    step: "01",
    title: "Dream",
    description:
      "It starts with a vision — a campus, a city, a future. We listen first and understand what success looks like for you.",
    icon: "spark",
  },
  {
    id: "counseling",
    step: "02",
    title: "Counseling",
    description:
      "A dedicated counsellor maps your academic background, goals and budget to the right country, course and university.",
    icon: "compass",
  },
  {
    id: "application",
    step: "03",
    title: "Application",
    description:
      "SOP reviews, document prep and university shortlisting — every application polished to maximise your offer rate.",
    icon: "doc",
  },
  {
    id: "visa",
    step: "04",
    title: "Visa",
    description:
      "End-to-end visa guidance, financials coaching and mock interviews so your interview is the easiest part of the journey.",
    icon: "shield",
  },
  {
    id: "departure",
    step: "05",
    title: "Departure",
    description:
      "Pre-departure briefings, accommodation help and airport pickup connections — you land already belonging.",
    icon: "plane",
  },
  {
    id: "graduation",
    step: "06",
    title: "Graduation",
    description:
      "You walk the stage. We stay connected through your studies, every semester, every milestone.",
    icon: "cap",
  },
  {
    id: "career",
    step: "07",
    title: "Career Success",
    description:
      "Post-study work rights, job-search strategy and PR pathways — your global career begins here.",
    icon: "trophy",
  },
];
