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
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&q=80",
    imageAlt:
      "Students collaborating on a university campus, dreaming of their future",
  },
  {
    id: "counseling",
    step: "02",
    title: "Counseling",
    description:
      "A dedicated counsellor maps your academic background, goals and budget to the right country, course and university.",
    icon: "compass",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=640&q=80",
    imageAlt:
      "A counselor guiding a student through academic planning in a meeting",
  },
  {
    id: "application",
    step: "03",
    title: "Application",
    description:
      "SOP reviews, document prep and university shortlisting — every application polished to maximise your offer rate.",
    icon: "doc",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=640&q=80",
    imageAlt:
      "Student working on university application documents at a desk",
  },
  {
    id: "visa",
    step: "04",
    title: "Visa",
    description:
      "End-to-end visa guidance, financials coaching and mock interviews so your interview is the easiest part of the journey.",
    icon: "shield",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=640&q=80",
    imageAlt:
      "Passport and travel documents ready for an international journey",
  },
  {
    id: "departure",
    step: "05",
    title: "Departure",
    description:
      "Pre-departure briefings, accommodation help and airport pickup connections — you land already belonging.",
    icon: "plane",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db56?w=640&q=80",
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
      "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=640&q=80",
    imageAlt:
      "Graduates celebrating at a commencement ceremony, caps in the air",
  },
  {
    id: "career",
    step: "07",
    title: "Career Success",
    description:
      "Post-study work rights, job-search strategy and PR pathways — your global career begins here.",
    icon: "trophy",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=640&q=80",
    imageAlt:
      "Young professionals collaborating in a modern office environment",
  },
];
