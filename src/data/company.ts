/**
 * Centralized company facts for TIE Nepal.
 * Sourced from the official website (tienepal.com), the public Facebook page
 * (facebook.com/targetintl) and Instagram (@targetintl).
 */

export type ServicesData = {
  title: string;
  desc: string;
  /** Icon name from the existing Icon set. */
  icon: "compass" | "cap" | "doc" | "shield" | "plane" | "star";
  /** Bullet points rendered on the Services page. */
  bullets: string[];
  /** Extended detail copy for the Services page. */
  detail: string;
};

// Services the company actually offers (from tienepal.com)
export const servicesData: ServicesData[] = [
  {
    title: "Career Counselling",
    desc: "Personalized guidance to match your background, goals and budget with the right country and course.",
    icon: "compass",
    bullets: [
      "Aptitude and interest profiling",
      "Country & course shortlisting",
      "Budget and scholarship mapping",
      "Long-term career pathway planning",
    ],
    detail:
      "Our counsellors sit with you one-to-one to understand your academic background, budget and ambitions, then build a realistic study-abroad roadmap — not a generic list.",
  },
  {
    title: "Test Preparation",
    desc: "Expert coaching for IELTS, PTE, OET and Duolingo English Test in our Pokhara classrooms.",
    icon: "cap",
    bullets: [
      "IELTS, PTE, TOEFL, SAT, GRE, GMAT",
      "Japanese language classes",
      "Weekly mock tests with feedback",
      "Flexible weekday and weekend batches",
    ],
    detail:
      "Small-group and one-to-one coaching with regular full-length mocks and individual score reports helps you hit the band or score your offer requires.",
  },
  {
    title: "University Selection & Application",
    desc: "Shortlisting, SOP reviews and end-to-end application handling across 350+ partner universities.",
    icon: "doc",
    bullets: [
      "350+ partner universities",
      "SOP / motivation letter reviews",
      "Portfolio and transcript guidance",
      "End-to-end application submission",
    ],
    detail:
      "We handle the paperwork end to end — from shortlisting and document checks to SOP edits and final submission — so nothing slips through.",
  },
  {
    title: "Visa Processing",
    desc: "Complete documentation support, financials coaching and mock interviews for a 97% success rate.",
    icon: "shield",
    bullets: [
      "Document checklist & verification",
      "Financial-capacity coaching",
      "Mock visa interviews",
      "97% visa success rate",
    ],
    detail:
      "Our team prepares your visa file, coaches you on the financials and runs mock interviews so you walk into the embassy confident.",
  },
  {
    title: "Pre-Departure Briefing",
    desc: "Accommodation help, cultural orientation and airport pickup connections so you land prepared.",
    icon: "plane",
    bullets: [
      "Accommodation guidance",
      "Cultural & climate orientation",
      "Airport pickup connections",
      "Pre-departure checklist",
    ],
    detail:
      "Before you fly, we cover accommodation, what to pack, cultural norms and arrival logistics — including airport pickup connections.",
  },
  {
    title: "Ongoing Support",
    desc: "We stay connected through your studies — every semester, every milestone, until graduation.",
    icon: "star",
    bullets: [
      "Semester check-ins",
      "Renewal & extension help",
      "Part-time work guidance",
      "Alumni community access",
    ],
    detail:
      "Support does not stop at departure. We check in each semester, help with renewals and keep you connected to the TIE alumni network.",
  },
];

export const company = {
  name: "Target International Education",
  shortName: "TIE Nepal",
  tagline: "Study Abroad with Confidence",
  blurb:
    "Take the first step towards your international education and global career.",
  founded: "February 8, 2012",
  foundedYear: 2012,
  location: "Chipledhunga, Pokhara, Nepal",

  leadership: {
    md: "Bhuwan Chhetri",
    director: "Laxmi Kunwar Chhetri",
  },

  mission:
    "To provide reliable, high-quality guidance and comprehensive support to students who want to study abrroad — making the journey from dream to degree seamless, ethical and successful.",
  vision:
    "To be Nepal's most trusted bridge between ambitious students and world-class international education.",

  // Services the company actually offers (from tienepal.com)
  services: servicesData,

  contact: {
    landlinePrimary: "+977-61-585077",
    landlineSecondary: "+977-61-572978",
    mobile: "+977 9856032278",
    telPrimary: "+97761585077",
    telSecondary: "+97761572978",
    telMobile: "+9779856032278",
    email: "info@tienepal.com",
    whatsapp: "9779856032278",
  },

  social: {
    facebook: "https://www.facebook.com/targetintl/",
    instagram: "https://www.instagram.com/targetintl/",
    website: "https://tienepal.com",
  },

  credentials: [
    "Approved by the Ministry of Education, Government of Nepal",
    "ECAN — Educational Consultancy Association of Nepal member",
    "ICEF accredited trusted agency",
  ],
};
