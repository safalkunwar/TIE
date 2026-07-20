/**
 * Test Preparation programs offered by TIE Nepal.
 *
 * Content-only static data + types. Components consume these via props; no
 * business logic lives here. Shapes are designed to be swapped for a future
 * API / CMS response with minimal changes.
 *
 * Educational information re-authored for TIE Nepal. No HTML/CSS/UI copied
 * from any source.
 */

export type TestSection = {
  heading: string;
  body: string;
};

export type TestPrepProgram = {
  slug: string;
  name: string;
  /** Short glyph/emoji kept as data so it stays CMS-driven. */
  glyph: string;
  /** One-line hook. */
  summary: string;
  /** Icon name from the existing Icon set. */
  icon: "cap" | "doc" | "star" | "compass" | "globe" | "check";
  /** Typical format / structure of the exam. */
  format: string;
  /** Usual total test duration. */
  duration: string;
  /** Scoring scale students should know. */
  scoreScale: string;
  /** Who the program is for. */
  whoFor: string;
  /** Preparation focus areas / tips. */
  focus: string[];
  /** Extra detail sections rendered as small cards. */
  sections: TestSection[];
};

export const testPrepPrograms: TestPrepProgram[] = [
  {
    slug: "ielts",
    name: "IELTS",
    glyph: "📝",
    summary: "The world's most popular English test for study, work and migration.",
    icon: "cap",
    format: "Listening, Reading, Writing and Speaking (Academic or General Training).",
    duration: "2 hours 45 minutes",
    scoreScale: "Band score 0–9, in 0.5 steps.",
    whoFor: "Students applying to English-speaking universities and visa applicants.",
    focus: [
      "Academic vs General Training module selection",
      "Writing Task 1 (graphs/charts) and Task 2 (essay)",
      "Speaking fluency and pronunciation practice",
      "Listening and reading strategy under timed conditions",
    ],
    sections: [
      {
        heading: "Why take IELTS",
        body: "Accepted by 11,000+ institutions across 140+ countries, IELTS is the default proof of English for study in the UK, Australia, Canada, New Zealand and most European programs.",
      },
      {
        heading: "TIE coaching",
        body: "Small-group and one-to-one classes in Pokhara with mock tests, individual feedback and a clear band-improvement plan.",
      },
    ],
  },
  {
    slug: "pte",
    name: "PTE Academic",
    glyph: "💻",
    summary: "Fully computer-based English test with fast, AI-scored results.",
    icon: "doc",
    format: "Speaking & Writing, Reading, and Listening — all delivered on computer.",
    duration: "Around 2 hours",
    scoreScale: "Overall score 10–90, with enabling-skill scores.",
    whoFor: "Students targeting Australia, New Zealand and an increasing number of UK/Canada institutions.",
    focus: [
      "Computer-based speaking and integrated tasks",
      "Repeat-sentence and describe-image techniques",
      "Time management across automatically scored sections",
      "Regular full-length mock exams with score reports",
    ],
    sections: [
      {
        heading: "Why choose PTE",
        body: "Results are typically returned within 48 hours and the test maps cleanly to student-visa English requirements in Australia and New Zealand.",
      },
      {
        heading: "TIE coaching",
        body: "Lab-based practice on the exact test interface, with targeted drills for the speaking and enabling-skill sections.",
      },
    ],
  },
  {
    slug: "toefl",
    name: "TOEFL iBT",
    glyph: "🌐",
    summary: "The established US-standard English test, accepted worldwide.",
    icon: "globe",
    format: "Reading, Listening, Speaking and Writing delivered via internet-based test.",
    duration: "Around 3 hours",
    scoreScale: "Total 0–120 (30 per section).",
    whoFor: "Applicants to US and Canadian universities, and many global programs.",
    focus: [
      "Integrated speaking and writing tasks",
      "Academic reading and lecture-listening strategy",
      "Note-taking for the speaking and writing sections",
      "Full mock tests with section-wise scoring",
    ],
    sections: [
      {
        heading: "Why take TOEFL",
        body: "Preferred by a large share of US universities and widely accepted across North America and Europe.",
      },
      {
        heading: "TIE coaching",
        body: "Structured classes with North-American accent practice and integrated-task drills mirroring the real exam.",
      },
    ],
  },
  {
    slug: "sat",
    name: "SAT",
    glyph: "📐",
    summary: "Undergraduate admissions test for US and some global universities.",
    icon: "star",
    format: "Reading & Writing, and Math (with calculator and no-calculator sections).",
    duration: "Around 3 hours",
    scoreScale: "Total 400–1600 (200–800 per section).",
    whoFor: "Students applying for Bachelor's degrees in the United States.",
    focus: [
      "Evidence-based reading and writing",
      "Algebra, problem-solving and advanced math",
      "Essay (optional at many universities)",
      "Timed section strategy and guessing technique",
    ],
    sections: [
      {
        heading: "Why take the SAT",
        body: "A core requirement for undergraduate admission at most US universities, and used for merit-scholarship consideration.",
      },
      {
        heading: "TIE coaching",
        body: "Diagnostic testing, personalised study plans and regular full-length practice exams with score tracking.",
      },
    ],
  },
  {
    slug: "gre",
    name: "GRE",
    glyph: "🔬",
    summary: "The standard admissions test for graduate and business programs.",
    icon: "compass",
    format: "Analytical Writing, Verbal Reasoning and Quantitative Reasoning.",
    duration: "Around 3 hours 45 minutes",
    scoreScale: "Verbal & Quant 130–170 each; Analytical Writing 0–6.",
    whoFor: "Applicants to Master's, PhD and many MBA programs worldwide.",
    focus: [
      "Quantitative comparison and data interpretation",
      "Text-completion and reading comprehension",
      "Issue and argument essays",
      "Adaptive-section strategy and vocabulary building",
    ],
    sections: [
      {
        heading: "Why take the GRE",
        body: "Accepted by thousands of graduate and business schools globally, and valid for five years.",
      },
      {
        heading: "TIE coaching",
        body: "Topic-wise drills, full-length adaptive mocks and focused coaching on the analytical-writing tasks.",
      },
    ],
  },
  {
    slug: "gmat",
    name: "GMAT",
    glyph: "📊",
    summary: "The leading admissions test for MBA and management programs.",
    icon: "star",
    format: "Quantitative, Verbal, Integrated Reasoning and Analytical Writing.",
    duration: "Around 3 hours 30 minutes",
    scoreScale: "Total 205–805 (section scores 60–90 each).",
    whoFor: "Candidates targeting MBA and specialised master's in management.",
    focus: [
      "Data-sufficiency and problem-solving quant",
      "Critical reasoning and sentence correction",
      "Multi-source integrated reasoning",
      "Argument-analysis essay under time pressure",
    ],
    sections: [
      {
        heading: "Why take the GMAT",
        body: "The primary benchmark for MBA admissions at leading business schools, especially in the US and Europe.",
      },
      {
        heading: "TIE coaching",
        body: "Adaptive-practice engine, sectional mocks and strategy coaching for the quant and integrated-reasoning parts.",
      },
    ],
  },
  {
    slug: "japanese-language",
    name: "Japanese Language",
    glyph: "🗾",
    summary: "Language preparation for study, work and life in Japan.",
    icon: "cap",
    format: "Speaking, listening, reading and writing across JLPT levels N5–N1.",
    duration: "Flexible — term-based and intensive tracks.",
    scoreScale: "JLPT levels N5 (basic) to N1 (advanced).",
    whoFor: "Students heading to Japanese universities and those seeking work or cultural immersion.",
    focus: [
      "Hiragana, Katakana and foundational Kanji",
      "Conversation for daily life and campus",
      "Exam preparation for the JLPT",
      "Reading and writing for academic contexts",
    ],
    sections: [
      {
        heading: "Why learn Japanese",
        body: "Strong Japanese ability unlocks more university programs, part-time work and a smoother life in Japan.",
      },
      {
        heading: "TIE coaching",
        body: "Progressive levels from absolute beginner to JLPT N2/N1, with native-speaker conversation practice.",
      },
    ],
  },
];

export function getTestPrep(slug: string): TestPrepProgram | undefined {
  return testPrepPrograms.find((p) => p.slug === slug);
}
