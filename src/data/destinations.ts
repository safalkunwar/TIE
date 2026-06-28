export type Destination = {
  slug: string;
  name: string;
  flag: string;
  /** Geographic coordinates for placement on the globe. */
  lat: number;
  lng: number;
  tagline: string;
  tuition: string;
  intake: string;
  language: string;
  workWhileStudying: string;
  postStudyWork: string;
  topUniversities: string[];
  scholarships: string;
  visaPathway: string;
  /** Curated royalty-free hero image (Pexels CDN). */
  image: string;
  accent: string;
};

/**
 * All eight destinations TIE Nepal places students in, with coordinates for the
 * interactive globe. Tuition ranges are indicative (USD/year, undergrad) and
 * intended as a guide — verified during counselling.
 */
export const destinations: Destination[] = [
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    lat: -25.27,
    lng: 133.78,
    tagline: "Sun-soaked campuses, world top-100 universities, post-study work rights up to 4 years.",
    tuition: "$20,000 – $45,000 / yr",
    intake: "Feb & Jul",
    language: "English (IELTS / PTE)",
    workWhileStudying: "48 hrs/fortnight",
    postStudyWork: "2–4 yr work visa",
    topUniversities: [
      "University of Melbourne",
      "UNSW Sydney",
      "University of Sydney",
      "Monash University",
    ],
    scholarships: "Destination Australia, university merit awards up to AUD 50,000.",
    visaPathway: "Subclass 500 student visa → Temporary Graduate 485 → PR pathways.",
    image:
      "https://images.pexels.com/photos/243532/pexels-photo-243532.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#F4CF57",
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    lat: 56.13,
    lng: -106.35,
    tagline: "Welcoming immigration policy, PGWP pathway, multicultural campuses.",
    tuition: "$12,000 – $35,000 / yr",
    intake: "Jan, May, Sep",
    language: "English / French (IELTS / PTE / Duolingo)",
    workWhileStudying: "Up to 24 hrs/week",
    postStudyWork: "PGWP up to 3 yr",
    topUniversities: [
      "University of Toronto",
      "UBC",
      "McGill University",
      "University of Alberta",
    ],
    scholarships: "Vanier CGS, university entrance awards, provincial grants.",
    visaPathway: "Study Permit → PGWP → Express Entry / PNP for PR.",
    image:
      "https://images.pexels.com/photos/2506946/pexels-photo-2506946.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#5B8CFF",
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    lat: 55.38,
    lng: -3.44,
    tagline: "Heritage universities, 1-year master's, Graduate Route work visa.",
    tuition: "£14,000 – £38,000 / yr",
    intake: "Jan & Sep",
    language: "English (IELTS / OET)",
    workWhileStudying: "20 hrs/week",
    postStudyWork: "Graduate Route 2 yr",
    topUniversities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "UCL",
    ],
    scholarships: "Chevening, GREAT Scholarships, Commonwealth, university awards.",
    visaPathway: "Student Visa → Graduate Route → Skilled Worker visa.",
    image:
      "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#9B6BFF",
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    lat: 37.09,
    lng: -95.71,
    tagline: "The widest choice of programs, research funding and OPT work experience.",
    tuition: "$25,000 – $55,000 / yr",
    intake: "Fall & Spring",
    language: "English (IELTS / PTE / Duolingo)",
    workWhileStudying: "20 hrs/week on-campus",
    postStudyWork: "OPT 1–3 yr (STEM)",
    topUniversities: [
      "Harvard University",
      "Stanford University",
      "MIT",
      "UC Berkeley",
    ],
    scholarships: "Fulbright, university need-based & merit aid, graduate assistantships.",
    visaPathway: "F-1 Visa → OPT → H-1B / O-1 / EB pathways.",
    image:
      "https://images.pexels.com/photos/2902754/pexels-photo-2902754.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#4ADE80",
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    lat: 36.2,
    lng: 138.25,
    tagline: "Affordable tuition, scholarships for international students, safe living.",
    tuition: "$5,000 – $18,000 / yr",
    intake: "Apr & Oct",
    language: "Japanese / English programs",
    workWhileStudying: "28 hrs/week",
    postStudyWork: "Job-hunting visa",
    topUniversities: [
      "University of Tokyo",
      "Kyoto University",
      "Osaka University",
      "Tohoku University",
    ],
    scholarships: "MEXT (Monbukagakusho), JASSO, university reductions.",
    visaPathway: "Student Visa → Designated Activities → Work / HSP visa.",
    image:
      "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#F472B6",
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    lat: -40.9,
    lng: 174.89,
    tagline: "Post-study work visa up to 3 years, stunning landscapes, small classes.",
    tuition: "$18,000 – $30,000 / yr",
    intake: "Feb & Jul",
    language: "English (IELTS / PTE)",
    workWhileStudying: "20 hrs/week",
    postStudyWork: "Post-Study Work Visa 1–3 yr",
    topUniversities: [
      "University of Auckland",
      "University of Otago",
      "Victoria University of Wellington",
      "Massey University",
    ],
    scholarships: "NZ Excellence Awards, university international scholarships.",
    visaPathway: "Student Visa → Post-Study Work Visa → Skilled Migrant Category.",
    image:
      "https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#2DD4BF",
  },
  {
    slug: "ireland",
    name: "Ireland",
    flag: "🇮🇪",
    lat: 53.41,
    lng: -8.24,
    tagline: "European tech hub — Google, Meta & Apple HQs, generous stay-back option.",
    tuition: "€10,000 – €25,000 / yr",
    intake: "Sep (main)",
    language: "English (IELTS / PTE / Duolingo)",
    workWhileStudying: "Stamp 2 — 20 hrs/week",
    postStudyWork: "Third Level Graduate 1–2 yr",
    topUniversities: [
      "Trinity College Dublin",
      "University College Dublin",
      "University of Galway",
      "DCU",
    ],
    scholarships: "Government of Ireland Scholarships, university merit awards.",
    visaPathway: "Long Stay D Visa → Stamp 1G → Critical Skills Employment Permit.",
    image:
      "https://images.pexels.com/photos/3373097/pexels-photo-3373097.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#F4CF57",
  },
  {
    slug: "denmark",
    name: "Denmark",
    flag: "🇩🇰",
    lat: 56.26,
    lng: 9.5,
    tagline: "Innovative teaching, English-taught degrees, work-life balance by design.",
    tuition: "€8,000 – €15,000 / yr",
    intake: "Sep (main)",
    language: "English (IELTS / PTE)",
    workWhileStudying: "20 hrs/week",
    postStudyWork: "Establishment Card / job-search 3 yr",
    topUniversities: [
      "University of Copenhagen",
      "Aarhus University",
      "DTU",
      "Aalborg University",
    ],
    scholarships: "Danish Government Scholarships, university tuition waivers.",
    visaPathway: "Residence Permit (study) → Establishment Scheme → work permit.",
    image:
      "https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=1400",
    accent: "#5B8CFF",
  },
];
