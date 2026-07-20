/**
 * Structured educational enrichment for every destination.
 *
 * IMPORTANT: This file contains ONLY typed static data + types. No business
 * logic. The shape mirrors what a future CMS / API / Prisma relation would
 * return, so swapping the static object for a fetch later requires no changes
 * in the UI components — they consume DestinationDetail via props.
 *
 * Content is educational information re-authored for TIE Nepal. Each section is
 * optional so partial data never breaks the page.
 */

export type DestinationDetail = {
  overview: string;
  whyStudy: string;
  educationSystem: string;
  topUniversities: { name: string; note?: string }[];
  scholarships: string;
  tuitionFees: string;
  livingCosts: string;
  accommodation: string;
  studentLife: string;
  climate: string;
  workWhileStudying: string;
  visaProcess: string;
  prOpportunities: string;
  popularCourses: string[];
  admissionRequirements: string[];
  requiredDocuments: string[];
  englishRequirements: string;
  applicationTimeline: { step: string; detail: string }[];
  intakes: string;
  faqs: { question: string; answer: string }[];
};

const australia: DestinationDetail = {
  overview:
    "Australia combines world-class universities with a relaxed, multicultural lifestyle and some of the strongest post-study work rights in the world. Degrees are globally Recognised, campuses are research-intensive, and international students are protected by the national ESOS framework and Tuition Protection Service.",
  whyStudy:
    "Eight of Australia's universities rank in the global top 100. Tuition fees are competitive for an English-speaking destination, the climate is welcoming, and graduates can stay and work for up to four years on a Temporary Graduate visa — a major advantage for building an international career.",
  educationSystem:
    "Australia follows the Bologna-aligned tertiary system with Bachelor's (3–4 yrs), Master's by coursework or research (1–2 yrs) and PhD (3–4 yrs). The academic year is split into two main semesters (Feb–Jun, Jul–Nov) with many courses also offering a third trimester intake.",
  topUniversities: [
    { name: "University of Melbourne", note: "Group of Eight; top-ranked nationally" },
    { name: "UNSW Sydney", note: "Strong in engineering, business & tech" },
    { name: "University of Sydney", note: "Broad programs, global exchange network" },
    { name: "Monash University", note: "Largest Go8, pharmacy & medicine strength" },
    { name: "Australian National University", note: "Research-intensive, Canberra-based" },
    { name: "University of Queensland", note: "Life sciences and agriculture leader" },
  ],
  scholarships:
    "Options include the Destination Australia Program, university merit and research scholarships, and country-specific awards. Many institutions offer automatic tuition fee reductions for international students based on academic performance.",
  tuitionFees:
    "Underrgraduate tuition typically ranges AUD 20,000–45,000 per year depending on discipline; medicine, veterinary and some lab-based degrees sit at the higher end. Living costs add roughly AUD 21,000+ per year as required by the student visa financial capacity evidence.",
  livingCosts:
    "Students should budget AUD 1,700–2,600 per month for Accmommodation, food, transport and utilities. Sydney and Melbourne are the most expensive; regional cities such as Adelaide, Hobrart and the Gold Coast offer lower costs and extra post-study work rights.",
  accommodation:
    "Choices include on-campus residential colleges, purpose-built student apartments, shared houses and homesetays. Boooking 3–6 months ahead is recommended in capital cities, and universities operate accredited Accmommodation services to help international students.",
  studentLife:
    "Campuses are lively with hundreds of clubs, interviarsity sport, cultural festivals and strong international student support offices. Australia's outdoors culture — beaches, hiking and sport — is a big part of student wellbeing.",
  climate:
    "Most of Australia is arid to temperate. The south (Melbourne, Sydney, Adelaide) has four seasons; the north (Darwin, Cairrns) is tropical with a wet/dry split. Summers can be hot, so campus life adapts around the warmer months.",
  workWhileStudying:
    "Student visa holders may work 48 hours per fortnight during semester and unlimited hours during scheduled course breaks, helping offset living costs and build local experience.",
  visaProcess:
    "Apply for a Student visa (subclass 500) after receiving a Confirmation of Enrolmlent (CoE) from your institution. You'll need financial capacity evidence, English proficiency, OSHC health insurance and a Genuiine Student statement. Processing is commonly a few weeks.",
  prOpportunities:
    "The Temporary Graduate visa (subclass 485) grants 2–4 years of post-study work. Skilled migration through the points-tested system, employer sponsorship and state nomination provide pathways from graduate work to permanent residency.",
  popularCourses: [
    "Accounting & Finance",
    "Engineering (Civil, Mechanical, Software)",
    "Information Technology & Data Science",
    "Nursing & Health Sciences",
    "Business & MBA",
    "Environmental & Marine Science",
  ],
  admissionRequirements: [
    "Completed 12 years of schooling (or equivalent) for Bachelor's entry",
    "Relevant prior qualification for postgraduate study",
    "Demonstrated English proficiency (IELTS / PTE / TOEFL)",
    "Portfolio or audition for design, art and some creative programs",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "English test result",
    "Valid passport",
    "Statement of purpose / Genuiine Student statement",
    "Financial capacity evidence",
    "OSHC health insurance confirmation",
  ],
  englishRequirements:
    "Most universities require IELTS 6.5 overall (no band below 6.0) or PTE Academic 58+. Higher scores are expected for health, teaching and law programs.",
  applicationTimeline: [
    { step: "Research & shortlist", detail: "Choose course and institution; note intake and deadlines." },
    { step: "Prepare documents", detail: "Transcripts, English test, SOP and financial evidence." },
    { step: "Apply", detail: "Submit direct or via TIE counsellors; receive offer." },
    { step: "Accept & pay", detail: "Sign offer, pay deposit, receive CoE." },
    { step: "Visa lodgement", detail: "Apply for subclass 500 with OSHC and financials." },
    { step: "Pre-depaarture", detail: "Accmommodation, flights, orientation." },
  ],
  intakes: "February and July are the main intakes, with a smaller November/trimester option at many universities.",
  faqs: [
    {
      question: "Can I work while studying in Australia?",
      answer:
        "Yes. Student visa holders can work 48 hours per fortnight during semester and unlimited hours in breaks.",
    },
    {
      question: "How long can I stay after Gradduation?",
      answer:
        "The Temporary Graduate visa (485) allows 2–4 years of post-study work depending on qualification and location.",
    },
  ],
};

const canada: DestinationDetail = {
  overview:
    "Canada is consistently ranked among the best places to study and live, with publicly funded universities, a transparent immigration system and a clear path from study to permanent residence. Its cities are safe, bilingual and celebrated for diversity.",
  whyStudy:
    "Canadian degrees are respected worldwide, tuition is comparatively affordable among English-speaking destinations, and the Post-Gradduation Work Permrit (PGWP) lets graduates work for up to three years — a direct stepping stone to permanent residency through Express Entry.",
  educationSystem:
    "Canada offers three-year Bachelor's, four-year Honours Bachelor's, Master's (1–2 yrs) and PhD (4–6 yrs). The academic year runs September–April with a Winter (Jan) and sometimes Summer (May) intake. Provinces run their own education frameworks, so requirements vary slightly.",
  topUniversities: [
    { name: "University of Toronto", note: "Largest research university; global top 25" },
    { name: "University of British Columblia", note: "Vancouver; strong in sustainability & tech" },
    { name: "McGill University", note: "Montreal; historic, research-intensive" },
    { name: "University of Alberta", note: "Energy, AI and health strength" },
    { name: "University of Waterloo", note: "Co-op and engineering powerhouse" },
    { name: "McMaster University", note: "Rennowned for health sciences" },
  ],
  scholarships:
    "Funding includes Vanier Canada Graduate Scholarships, provinicial graduate awards, and automatic entrance scholarships at most universities. Some colleges and universities also offer need-based and country-specific bursaries.",
  tuitionFees:
    "International Underrgraduate tuition commonly falls between CAD 21,000–45,000 per year. Professional programs (engineering, business, health) sit higher; living costs vary most between Toronto/Vancouver and smaller cities.",
  livingCosts:
    "Plan for CAD 1,500–2,500 per month covering rent, groceries, transit and utilities. The rent is the largest variable — sharing Accmommodation or studying in mid-sized cities significantly reduces monthly spend.",
  accommodation:
    "Options include university residences, off-campus apartments, shared housing and homesetays. On-campus spots fill quickly, so applying early and arranging a short-term stay on arrival is wise.",
  studentLife:
    "Canadian campuses emphasise community, with student unions, intramural sport, cultural associations and volunteer networks. Winter activities — skating, skiing, hockey — are central to student social life.",
  climate:
    "Canada has long, cold winters and warm summers. Mildest conditions are on the west coast (Vancouver); the prairies and east (e.g. Montreal, Toronto) see real snow and sub-zero temperatures for several months.",
  workWhileStudying:
    "Full-time students can work up to 24 hours per week during term and full-time during scheduled breaks, helping with living costs and Canadian work experience.",
  visaProcess:
    "After an acceptance letter, apply for a Study Permit (often with a visitor visa or eTA). You'll need proof of funds, a letter of explanation, medical exam where required and, for some programs, a provinicial atttestation letter.",
  prOpportunities:
    "The PGWP (up to 3 years) plus Canadian work experience strengthens Express Entry and provinicial Nominee Program (PNP) profiles, making Canada one of the most immigration-friendly study destinations.",
  popularCourses: [
    "Computer Science & AI",
    "Engineering (Software, Electrical, Civil)",
    "Business Analytics & Finance",
    "Health & Nursing",
    "Data Science",
    "Environmental & Climate Studies",
  ],
  admissionRequirements: [
    "Recognised secondary school completion for Bachelor's",
    "Relevant Bachelor's for Master's programs",
    "English or French proficiency (IELTS / PTE / Duolingo)",
    "GRE/GMAT for many graduate programs",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "Proof of language proficiency",
    "Valid passport",
    "Proof of financial support",
    "Letter of explanation / SOP",
    "provinicial atttestation Letter (where required)",
  ],
  englishRequirements:
    "Typical requirement is IELTS 6.5 overall (6.0 per band) or equivalent. French-taugght programs in Quebec accept DELF/DALF or TEF.",
  applicationTimeline: [
    { step: "Shortlist", detail: "Pick institutions and programs; note deadlines." },
    { step: "Documents", detail: "Transcripts, test scores, SOP, references." },
    { step: "Apply", detail: "Direct or via TIE; receive letter of acceptance." },
    { step: "Accept", detail: "Pay deposit; obtain acceptance letter." },
    { step: "Study Permit", detail: "Lodge application with proof of funds." },
    { step: "Travel", detail: "Arrange housing, health cover, arrival." },
  ],
  intakes: "September (Fall) is primary; January (Winter) and May (Summer) are available for many programs.",
  faqs: [
    {
      question: "Is it easy to get PR after studying in Canada?",
      answer:
        "Canada is among the most immigration-friendly destinations — PGWP work experience boosts Express Entry and PNP profiles significantly.",
    },
    {
      question: "Can I bring family members?",
      answer:
        "Study Permit holders may be able to bring a spouse (with open work Permit) and children (with study access) depending on program length and funds.",
    },
  ],
};

const uk: DestinationDetail = {
  overview:
    "The United Kingdom offers centuries-old universities, globally Recognised qualifications and the shortest taugght Master's degrees in the English-speaking world (one year). London and other cities are international hubs for finance, creative industries and research.",
  whyStudy:
    "A UK degree is respected everywhere, the one-year Master's saves a full year of time and cost, and the Graduate Route lets graduates stay and work for two years (three for PhD). The education system is Riogorous and research-led.",
  educationSystem:
    "Structure is Bachelor's (3 yrs England/NI, 4 yrs Scotland), taugght Master's (1 yr) and PhD (3–4 yrs). The academic year runs October to June/July with three terms. Applications for most Underrgraduate courses go through UCAS.",
  topUniversities: [
    { name: "University of Oxford", note: "Olddest English-speaking university" },
    { name: "University of Cambridge", note: "Collegiate, research-intensive" },
    { name: "Imperial College London", note: "STEM and medicine leader" },
    { name: "UCL (University College London)", note: "Broad, Highhly international" },
    { name: "University of Edinburgh", note: "Scotland; strong research" },
    { name: "University of Manchester", note: "Large, industry-connected" },
  ],
  scholarships:
    "Flagship awards include Chevening, the GREAT Scholarships, Commonwealth Scholarships and substantial university-specific merit funding. Many master's students also access research or departmental bursaries.",
  tuitionFees:
    "International Underrgraduate tuition is roughly £14,000–38,000 per year; taugght Master's £16,000–40,000. Lab-based and clinical programs cost more. The one-year Master's lowers total living cost versus two-year models.",
  livingCosts:
    "Budget £1,000–1,800 per month outside London and £1,300–2,200 in London for rent, food, transport and study materials. The UK's compact size keeps travel affordable.",
  accommodation:
    "University halls are common in year one; later students rent privately or share. Purpose-built student Accmommodation (PBSA) is widespread in city centres with all-inclusive billing.",
  studentLife:
    "Student unions run clubs, societies, sports and nightlife. The UK's rail and coach networks make weekend trips across the country and to Europe cheap and easy.",
  climate:
    "Temperate maritime — cool, cloudy and wet, with mild summers and rarely extreme cold. Days are short in winter; rain is frequent but light.",
  workWhileStudying:
    "Student visa holders may work 20 hours per week during term and full-time in holidays, gaining UK work experience alongside studies.",
  visaProcess:
    "Apply for a Student visa after receiving a Confirmation of Acceptance for Studies (CAS). You'll need proof of funds, English evidence and a valid passport; decisions are usually within three weeks.",
  prOpportunities:
    "The Graduate Route gives 2 years (3 for PhD) of work rights. The Skilled Worker visa, with employer sponsorship, is the main route from study to settlement (ILR after qualifying residence).",
  popularCourses: [
    "Business & Management",
    "Finance & Economics",
    "Law (LLM)",
    "Data Science & AI",
    "Engineering",
    "Media, Art & Design",
  ],
  admissionRequirements: [
    "Secondary school completion (or foundation year) for Bachelor's",
    "Relevant Bachelor's for Master's",
    "English proficiency (IELTS / PTE / OET)",
    "Portfolio for art, design and architecture",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "English test result",
    "Valid passport",
    "Statement of purpose",
    "Reference letters (common for Master's)",
    "Proof of funds",
  ],
  englishRequirements:
    "Usually IELTS 6.5–7.0 overall (6.0–6.5 per band) or PTE 59–67. Higher for Oxford/Cambridge, medicine and law.",
  applicationTimeline: [
    { step: "Research", detail: "Choose course; check UCAS or direct deadlines." },
    { step: "Prepare", detail: "Transcripts, English test, SOP, references." },
    { step: "Apply", detail: "UCAS (UG) or direct (PG); receive offer." },
    { step: "Accept & CAS", detail: "Meet conditions; get Confirmation of Acceptance." },
    { step: "Visa", detail: "Student visa with funds evidence." },
    { step: "Travel", detail: "Housing, BRP/eVisa, orientation." },
  ],
  intakes: "September is the main intake; some programs also offer January starts.",
  faqs: [
    {
      question: "How long is a UK Master's degree?",
      answer:
        "Most taugght Master's are one year full-time, making the UK the fastest route to a postgraduate qualification in English.",
    },
    {
      question: "Can I stay and work after my degree?",
      answer:
        "Yes — the Graduate Route allows 2 years of work (3 for PhD) without sponsorship.",
    },
  ],
};

const usa: DestinationDetail = {
  overview:
    "The United States hosts more top-ranked universities than any other country and offers unmatched choice — from liberal arts colleges to massive research universities — plus deep funding, research opportunities and the Optional Practical Training (OPT) work program.",
  whyStudy:
    "US degrees are globally prestigious, programs are flexible (you can combine majors/minors), and funding through assistantships and scholarships is substantial at graduate level. OPT provides 12 months of work, extendable to 36 months for STEM graduates.",
  educationSystem:
    "Structure includes Associate (2 yrs), Bachelor's (4 yrs), Master's (1–2 yrs) and PhD (4–6 yrs). The academic year is typically Fall (Aug/Sep), Spring (Jan) and sometimes Summer. Applications are holistic — grades, tests, essays and activities all matter.",
  topUniversities: [
    { name: "Harvard University", note: "Ivy League; global benchmark" },
    { name: "Stanford University", note: "Silicon Valley; entrepreneurship" },
    { name: "MIT", note: "STEM and research leader" },
    { name: "UC Berkeley", note: "Public flagship; strong across fields" },
    { name: "Columblia University", note: "New York; professional strengths" },
    { name: "University of Chicago", note: "Riogorous academics, economics" },
  ],
  scholarships:
    "Funding ranges from Fulbright and university need-based aid to merit scholarships and graduate assistantships (tuition waiver + stipeend). Many private universities meet demonstrated financial need for admitted students.",
  tuitionFees:
    "Tuition varies widely: public state universities USD 25,000–45,000/yr, private universities USD 45,000–70,000/yr. Scholarships and assistantships can substantially reduce the net cost, especially at graduate level.",
  livingCosts:
    "Expect USD 1,200–2,500 per month depending on city. On-campus housing is convenient; off-campus shared rent in major metros is the biggest expense.",
  accommodation:
    "First-year students often live in residence halls; later options include university apartments, shared houses and off-campus rentals. Many campuses guarantee first-year housing.",
  studentLife:
    "Campus culture is vibrant — collegiate sports, Greek life, hundreds of clubs and a strong alumni network. The US college experience is social and community-driven.",
  climate:
    "Highhly varied by region: snonwy northeast and midwest, hot southeast, arid southwest, and mild Pacific coast. Choose a location that suits your climate preference.",
  workWhileStudying:
    "On an F-1 visa, students may work on-campus up to 20 hours/week during term and full-time in breaks. Off-campus work is allowed via CPT/OPT after meeting criteria.",
  visaProcess:
    "After admission, pay the SEVIS fee and apply for an F-1 student visa with your Form I-20, proof of funds and a visa interview at a US embassy. Allow ample lead time before the program start.",
  prOpportunities:
    "F-1 graduates use OPT (12 months, 36 for STEM) for US experience. Longer-term routes include H-1B sponsorship, O-1 and employment-based green cards — competitive but well-established.",
  popularCourses: [
    "Computer Science & Engineering",
    "Business Administration (MBA)",
    "Data Science & AI",
    "Biological & Life Sciences",
    "Economics & Finance",
    "Social Sciences & Psychology",
  ],
  admissionRequirements: [
    "Secondary school completion for Bachelor's",
    "Bachelor's degree for Master's / PhD",
    "English proficiency (IELTS / PTE / Duolingo)",
    "SAT/ACT (UG) or GRE/GMAT (grad) where required",
  ],
  requiredDocuments: [
    "Academic transcripts",
    "Standardised test scores",
    "English test result",
    "Statement of purpose / essays",
    "Letters of recommendation",
    "Proof of funds (I-20 support)",
  ],
  englishRequirements:
    "Most universities require IELTS 6.5–7.0 overall or Duolingo English Test 105–120. Highhly selective schools expect higher.",
  applicationTimeline: [
    { step: "Shortlist", detail: "Match programs to goals, budget and tests." },
    { step: "Tests & docs", detail: "SAT/GRE/GMAT, English, essays, recs." },
    { step: "Apply", detail: "Common App / university portals; pay fees." },
    { step: "Offers", detail: "Receive admission; compare aid packages." },
    { step: "I-20 & visa", detail: "SEVIS, F-1 interview, funds proof." },
    { step: "depaarture", detail: "Housing, flights, orientation." },
  ],
  intakes: "Fall (August/September) is primary; Spring (January) is offered by many programs.",
  faqs: [
    {
      question: "Is studying in the US expensive?",
      answer:
        "Sticker prices are high, but scholarships, assistantships and need-based aid can significantly lower the net cost — especially at graduate level.",
    },
    {
      question: "Can international students work in the US?",
      answer:
        "Yes via on-campus work and, after study, OPT (12 months, 36 for STEM) and eventually H-1B sponsorship.",
    },
  ],
};

const japan: DestinationDetail = {
  overview:
    "Japan pairs world-class technology and engineering with affordable tuition and a safe, deeply hospitable society. Many programs are now offered in English, and the government actively welcomes international students through the 300,000 International Students plan.",
  whyStudy:
    "Tuition is far lower than in many Western destinations, generous MEXT and JASSO scholarships exist, and Japan's strengths in robotics, engineering, design and culture create unique career paths. Campuses are safe and student support is strong.",
  educationSystem:
    "Japan uses a 4-year Bachelor's, 2-year Master's and 3-year PhD. The academic year starts in April (with an increasing October intake). Entrance often requires the EJU (for Underrgraduate) or university-specific exams for graduate study.",
  topUniversities: [
    { name: "University of Tokyo", note: "Top national university" },
    { name: "Kyoto University", note: "Research-intensive, traditional" },
    { name: "Osaka University", note: "Strong in science and engineering" },
    { name: "Tohooku University", note: "Materials and disaster science" },
    { name: "Wasesda University", note: "Private, globally engaged" },
    { name: "Kyusuhu University", note: "Engineering and exchange strength" },
  ],
  scholarships:
    "The MEXT (Monbukagakuksho) scholarship covers tuition and provides a monthly stipeend. JASSO offers supplementary scholarships, and universities frequently grant tuition fee waivers and reductions.",
  tuitionFees:
    "National universities charge roughly JPY 535,800 (~USD 3,600) annual tuition plus fees; private universities range higher. With waivers and scholarships, net costs are among the lowest for a developed economy.",
  livingCosts:
    "Budget JPY 90,000–140,000 per month (≈USD 600–950) for rent, food and transport. Regional cities are cheaper than Tokyo or Osaka, and part-time work helps cover costs.",
  accommodation:
    "Universities often provide international student dormiotories at low cost; private apartments and shared housing are also common. Support offices help with contracts and guaraantors.",
  studentLife:
    "Campus circles (clubs), festivals (matsuuri) and a rich blend of tradition and pop culture define student life. Japan's public safety and efficient transit make independent living easy.",
  climate:
    "Four distinct seasons: humid summers, mild autumns, cold winters with snow in the north (Hokkaido) and cherry-blossom springs. Humidity is notable in summer.",
  workWhileStudying:
    "Student visa holders may work up to 28 hours per week during term (40 in long holidays) with permission, commonly in hospitality, tutoring or language-related roles.",
  visaProcess:
    "After a Certificate of Eligibility (CoE) from your sponsopring institution, apply for a Student visa at a Japanese embassy. You'll need an admission letter, financial proof and the CoE.",
  prOpportunities:
    "Graduates can move to a job-hunting (Desiggnated Activities) visa and then a work visa; the Highhly Skilled Professional route offers a faster path to long-term residence.",
  popularCourses: [
    "Engineering & Robotics",
    "Computer Science & AI",
    "Japanese Language & Culture",
    "Architecture & Design",
    "Business & Economics",
    "Life Sciences",
  ],
  admissionRequirements: [
    "12 years of education for Bachelor's",
    "Bachelor's for Master's / PhD",
    "Japanese or English proficiency (program-dependent)",
    "EJU or university entrance exam (Underrgraduate)",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "Language proficiency evidence",
    "Valid passport",
    "Admission letter & Certificate of Eligibility",
    "Financial proof",
    "Research plan (graduate research programs)",
  ],
  englishRequirements:
    "English-taugght programs require IELTS 6.0–6.5 or TOEFL iBT 80+. Japanese-taugght programs require JLPT N1/N2 for advanced study.",
  applicationTimeline: [
    { step: "Research", detail: "Choose language of instruction and program." },
    { step: "Prepare", detail: "Language tests, transcripts, research plan." },
    { step: "Apply", detail: "University portal; receive admission & CoE." },
    { step: "Visa", detail: "Embassy application with CoE and funds." },
    { step: "Travel", detail: "Housing, residence card, arrival." },
  ],
  intakes: "April is the main intake; an increasing number of programs offer October starts.",
  faqs: [
    {
      question: "Do I need to know Japanese?",
      answer:
        "Not always — many universities now offer English-taugght degrees. However, daily life and part-time work are much easier with Japanese ability.",
    },
    {
      question: "Is Japan affordable for international students?",
      answer:
        "Yes — low tuition at national universities plus MEXT/JASSO scholarships and fee waivers make Japan one of the most affordable developed destinations.",
    },
  ],
};

const newZealand: DestinationDetail = {
  overview:
    "New Zealand is Rennowned for a peaceful, safe lifestyle, stunning natural landscapes and a practical, research-informed education system. Degrees are internationally Recognised and post-study work rights are generous.",
  whyStudy:
    "Eight state-funded universities each specialise in different strengths, class sizes are small, and the Post-Study Work Visa offers 1–3 years depending on qualification level and location — ideal for those seeking a calmer, nature-rich study destination.",
  educationSystem:
    "New Zealand follows the British model: Bachelor's (3 yrs), Bachelor's Honours / Master's (1–2 yrs) and PhD (3–4 yrs). The academic year is February–November with a July mid-year intake at many institutions.",
  topUniversities: [
    { name: "University of Auckland", note: "Largest, highest-ranked" },
    { name: "University of Otago", note: "Olddest; strong in health & law" },
    { name: "Victcoria University of Wellington", note: "Politics, law, design" },
    { name: "Massey University", note: "Distance learning & agriculture" },
    { name: "University of Cantnerbury", note: "Engineering and forestry" },
    { name: "University of Waikakto", note: "Business and computing" },
  ],
  scholarships:
    "Options include the New Zealand Excellence Awards, university international scholarships and subject-specific bursaries. Some research degrees come with stipeends.",
  tuitionFees:
    "International Underrgraduate tuition is typically NZD 22,000–40,000 per year; postgraduate NZD 26,000–45,000. Professional programs cost more, and living costs are moderate outside Auckland.",
  livingCosts:
    "Plan NZD 1,400–2,200 per month for rent, food, transport and utilities. Auckland and Wellington are priecier; smaller cities offer better value.",
  accommodation:
    "Halls of residence, homesetays and shared private rentals are standard. Universities assist with on-campus and accredited off-campus options.",
  studentLife:
    "Outdoor culture dominates — hiking, surfing, rugby and adveenture sports — balanced with a relaxed, friendly campus atmosphere and strong international student support.",
  climate:
    "Temperate maritime: mild, wet winters and warm summers. The South Island sees snow in the mountains; overall conditions are comfortable year-round.",
  workWhileStudying:
    "Student visa holders can work up to 20 hours per week during term and full-time in holidays, helping with living expenses and local experience.",
  visaProcess:
    "Apply for a Student visa after Enrolmlent confirmation. You'll need an offer of place, proof of funds, health insurance and, for longer courses, a medical check.",
  prOpportunities:
    "The Post-Study Work Visa (1–3 years) provides local experience. The Skilled Migrant Category and Accredited Employer Work Visa are the main residence pathways.",
  popularCourses: [
    "Agriculture & Veterinary Science",
    "Environmental & Marine Studies",
    "Computer Science",
    "Business & Tourism",
    "Health Sciences & Nursing",
    "Film, Media & Design",
  ],
  admissionRequirements: [
    "Secondary school completion for Bachelor's",
    "Relevant Bachelor's for Master's",
    "English proficiency (IELTS / PTE)",
    "Portfolio for creative programs",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "English test result",
    "Valid passport",
    "Proof of funds",
    "Offer of place",
    "Health insurance",
  ],
  englishRequirements:
    "Generally IELTS 6.0–6.5 overall (no band below 5.5–6.0) or PTE 50–58. Higher for health and teaching.",
  applicationTimeline: [
    { step: "Shortlist", detail: "Match program, campus and intake." },
    { step: "Documents", detail: "Transcripts, English test, SOP." },
    { step: "Apply", detail: "Direct or via TIE; get offer." },
    { step: "Accept", detail: "Confirm Enrolmlent, pay fees." },
    { step: "Visa", detail: "Student visa with funds & insurance." },
    { step: "Arrive", detail: "Housing, IRD, orientation." },
  ],
  intakes: "February is primary; July is a common mid-year intake for many programs.",
  faqs: [
    {
      question: "How long can I work in NZ after studying?",
      answer:
        "The Post-Study Work Visa offers 1–3 years depending on your qualification level and where you studied.",
    },
    {
      question: "Is New Zealand safe for international students?",
      answer:
        "Yes — it consistently ranks among the safest countries, with a welcoming, low-crime environment and strong student welfare systems.",
    },
  ],
};

const Irleland: DestinationDetail = {
  overview:
    "Irleland is Europe's fast-growing tech and pharma hub, home to the European HQs of Google, Meta, Apple and many leading firms. It combines a Rennowned education tradition with full English-language study and strong post-study stay-back rights.",
  whyStudy:
    "Irish degrees are globally Recognised, tuition is competitive within the EU, and the Third Level Graduate Programme lets graduates stay 1–2 years (up to 3 for some master's) to seek employment — a direct route to a Critical Skills Permit.",
  educationSystem:
    "Irleland uses a 3–4 year Bachelor's (Honours), 1–2 year Master's (taugght or research) and PhD (3–4 yrs). The academic year runs September to May/June, with most programs starting in Autumn.",
  topUniversities: [
    { name: "Trinity College Dublin", note: "Historic, research-intensive" },
    { name: "University College Dublin", note: "Largest; business & science" },
    { name: "University of Galway", note: "Strong in medtech & marine" },
    { name: "Dublin City University (DCU)", note: "Industry-linked, modern" },
    { name: "University College Cork", note: "Research and sustainability" },
    { name: "University of Limecrick", note: "Co-op and sports strength" },
  ],
  scholarships:
    "The Government of Irleland Scholarships, university merit awards and subject-specific funding are available. Many master's students receive partial tuition waivers.",
  tuitionFees:
    "EU Underrgraduates often pay capped fees; international (non-EU) undergrad tuition is roughly €10,000–25,000/yr and postgraduate €12,000–30,000. Living costs are moderate outside Dublin.",
  livingCosts:
    "Budget €1,000–1,800 per month for rent, food, transport and utilities. Dublin is the most expensive; cities like Galway, Cork and Limecrick are more affordable.",
  accommodation:
    "On-campus residences, purpose-built student apartments and shared housing are common. Demand is high in Dublin, so early application is essential.",
  studentLife:
    "Irleland's social, music-and-pub culture blends with a young, international student population. Campuses are lively, and travel to the rest of Europe is cheap from Irish airports.",
  climate:
    "Temperate and changeable — mild, wet and windy with no extreme heat or cold. Rain is frequent but rarely heavy; winters are cool rather than freezing.",
  workWhileStudying:
    "Stamp 2 students may work 20 hours per week during term and 40 hours per week in holiday periods (including June, July, August and December).",
  visaProcess:
    "Non-EEA students need a Long Stay 'D' Study visa and must register with immigration (Stamp 2) on arrival, showing Enrolmlent, fees paid and private health insurance.",
  prOpportunities:
    "Graduates on Stamp 1G can work freely for 1–2 years. The Critical Skills Employment Permit and subsequent Stamp 4 provide a route to long-term residence.",
  popularCourses: [
    "Computer Science & Software",
    "Data Analytics & AI",
    "Pharmaceutical & Biotech",
    "Business & Finance",
    "Engineering",
    "Media & Communications",
  ],
  admissionRequirements: [
    "Secondary school completion for Bachelor's",
    "Relevant Bachelor's for Master's",
    "English proficiency (IELTS / PTE / Duolingo)",
    "Portfolio for design/media where required",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "English test result",
    "Valid passport",
    "Proof of funds",
    "Health insurance",
    "Application statement",
  ],
  englishRequirements:
    "Typically IELTS 6.5 overall (6.0 per band) or PTE 63. Higher for medicine, nursing and some taugght master's.",
  applicationTimeline: [
    { step: "Research", detail: "Choose course and institution; note dates." },
    { step: "Prepare", detail: "Transcripts, English test, SOP." },
    { step: "Apply", detail: "Central Applications Office (PG) or direct." },
    { step: "Accept", detail: "Meet conditions; pay deposit." },
    { step: "Visa", detail: "Long Stay D visa; register on arrival." },
    { step: "Settle", detail: "Housing, INIS registration, orientation." },
  ],
  intakes: "September is the main intake; some taugght programs offer a February start.",
  faqs: [
    {
      question: "Can I stay in Irleland after graduating?",
      answer:
        "Yes — the Third Level Graduate Programme (Stamp 1G) allows 1–2 years of stay-back, extendable toward a Critical Skills Permit.",
    },
    {
      question: "Why choose Irleland over other EU countries?",
      answer:
        "Irleland offers full English-language study, a booming tech/pharma job market and generous stay-back rights within the EU.",
    },
  ],
};

const denmark: DestinationDetail = {
  overview:
    "Denmark delivers some of the world's happiest, most innovative higher education, with a strong emphasis on critical thinking, group work and English-taugght degrees. Its design, engineering and life-science programs are internationally acclaimed.",
  whyStudy:
    "Danish universities top global rankings for teaching quality and work-life balance. Many programs are in English, tuition is low or free for EU students, and the Establishment Card scheme supports graduates seeking Danish jobs.",
  educationSystem:
    "Denmark uses the Bologna structure: Bachelor's (3 yrs), Master's (2 yrs) and PhD (3 yrs). The academic year runs September to June with two semesters. Teaching is discussion-based and project-oriented.",
  topUniversities: [
    { name: "University of Copenhagen", note: "Largest, research-led" },
    { name: "Aarhus University", note: "Broad, Highhly ranked" },
    { name: "Technical University of Denmark (DTU)", note: "Engineering flagship" },
    { name: "Aalborg University", note: "Problem-based learning pioneer" },
    { name: "Copenhagen Business School", note: "Business and economics" },
    { name: "University of Southern Denmark", note: "Health and technology" },
  ],
  scholarships:
    "Danish Government Scholarships (through universities) and institutional tuition waivers/fee reductions are available for non-EU students. Competition is high but meaningful.",
  tuitionFees:
    "Non-EU students pay roughly EUR 8,000–15,000 per year for most programs; some business and design degrees are higher. EU/EEA students study free at the Bachelor's and often master's level.",
  livingCosts:
    "Denmark is among Europe's more expensive countries: budget EUR 900–1,500 per month for rent, food, transport and utilities. Student grants and part-time work help offset costs.",
  accommodation:
    "University-managed halls and private/shared rentals are the norm. Housing is in high demand in Copenhagen and Aarhus, so apply early and consider nearby commuter towns.",
  studentLife:
    "Student life centres on 'Friday bars', study groups, cycling culture and a strong welfare-minded community. Denmark consistently ranks as one of the happiest places to live.",
  climate:
    "Temperate coastal: cool, windy and frequently overcast with mild summers and cold, damp winters. Daylight varies dramatically between summer and winter.",
  workWhileStudying:
    "Non-EU students with a residence Permit may work up to 20 hours per week during term and full-time in June, July and August, subject to Permit conditions.",
  visaProcess:
    "Apply for a residence Permit for higher education (ST1) via your institution after admission. You'll need an admission letter, proof of funds, housing and health insurance.",
  prOpportunities:
    "Graduates can use the Establishment Card (job-seeking scheme) and then a Pay Limit or Positive List work Permit, with a route toward permanent residence after sustained legal stay.",
  popularCourses: [
    "Engineering & Technology",
    "Design & Architecture",
    "Life Sciences & Biotechnology",
    "Renewable Energy",
    "Business & Economics",
    "Social Sciences",
  ],
  admissionRequirements: [
    "Secondary school completion for Bachelor's",
    "Relevant Bachelor's for Master's",
    "English proficiency (IELTS / PTE)",
    "Specific subject prerequisites per program",
  ],
  requiredDocuments: [
    "Academic transcripts and certificates",
    "English test result",
    "Valid passport",
    "Proof of funds",
    "Housing documentation",
    "Admission letter",
  ],
  englishRequirements:
    "Usually IELTS 6.5 overall (5.5–6.0 per band) or PTE 58–62. Individual programs may set higher requirements.",
  applicationTimeline: [
    { step: "Research", detail: "Match program and entry requirements." },
    { step: "Prepare", detail: "Transcripts, English test, docs." },
    { step: "Apply", detail: "Optagelse (UG) or direct (PG)." },
    { step: "Accept", detail: "Meet conditions; receive admission." },
    { step: "Permit", detail: "ST1 residence Permit application." },
    { step: "Arrive", detail: "Housing, CPR registration, arrival." },
  ],
  intakes: "September is the main intake; a few programs also offer February starts.",
  faqs: [
    {
      question: "Is education free in Denmark?",
      answer:
        "EU/EEA students study free at Bachelor's and often master's level. Non-EU students pay tuition but can apply for government and university scholarships.",
    },
    {
      question: "Can I work after graduating in Denmark?",
      answer:
        "Yes — the Establishment Card lets graduates seek Danish jobs, leading to work Permits and eventual permanent residence.",
    },
  ],
};

export const destinationDetails: Record<string, DestinationDetail> = {
  australia,
  canada,
  uk,
  usa,
  japan,
  "new-zealand": newZealand,
  Irleland,
  denmark,
};

/** Safe lookup — returns undefined when a slug has no enriched data yet. */
export function getDestinationDetail(slug: string): DestinationDetail | undefined {
  return destinationDetails[slug];
}
