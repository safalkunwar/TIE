export type JourneyStep = {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
};

export const journey: JourneyStep[] = [
  {
    id: "dream",
    step: "01",
    title: "Dream",
    description:
      "It starts with a vision — a campus, a city, a future. We listen first and understand what success looks like for you.",
    icon: "spark",
    image:
      "/gallery/journey-dream.jpg",
    imageAlt:
      "Students collaborating on a university campus, dreaming of their future",
  },
  {
    id: "counseling",
    step: "02",
    title: "Counselling",
    description:
      "A dedicated counsellor maps your academic background, goals and budget to the right country, course and university.",
    icon: "compass",
    image:
      "/gallery/team.jpg",
    imageAlt:
      "The Target International Education team in Pokhara",
  },
  {
    id: "application",
    step: "03",
    title: "Application",
    description:
      "SOP reviews, document prep and university shortlisting — every application polished to maximise your offer rate.",
    icon: "doc",
    image:
      "/gallery/journey-application.jpg",
    imageAlt:
      "Student working on university application documents at a desk",
  },
  {
    id: "visa",
    step: "04",
    title: "Visa",
    description:
      "Understand the requirements, prepare your financial documents and practise with mock interviews. We help you approach your visa application with confidence.",
    icon: "shield",
    image:
      "/gallery/journey-visa.jpg",
    imageAlt:
      "International aircraft at an airport terminal",
  },
  {
    id: "departure",
    step: "05",
    title: "Departure",
    description:
      "Pre-departure briefings, accommodation help and airport pickup connections — you land already belonging.",
    icon: "plane",
    image:
      "/gallery/journey-departure.jpg",
    imageAlt:
      "Airplane wing view from window during flight at sunset",
  },
  {
    id: "graduation",
    step: "06",
    title: "Graduation",
    description:
      "You walk the stage. We stay connected through your studies, every semester, every milestone.",
    icon: "cap",
    image:
      "/gallery/journey-graduation.jpg",
    imageAlt:
      "Graduates celebrating at a commencement ceremony, caps in the air",
  },
  {
    id: "career",
    step: "07",
    title: "Career Success",
    description:
      "Explore your next steps after graduation, from career planning to understanding post-study opportunities in your chosen destination.",
    icon: "trophy",
    image:
      "/gallery/journey-career.jpg",
    imageAlt:
      "Young professionals collaborating in a modern office environment",
  },
];
