import type { Metadata } from "next";

const SITE_URL = "https://tienepal.com";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Target International Education",
  alternateName: "TIE Nepal",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Target International Education (TIE) is a Government of Nepal approved, ECAN-member and ICEF-certified educational consultancy in Pokhara helping students study abroad in Japan, Denmark, the UK, Ireland, Australia, New Zealand, the USA and Canada.",
  foundingDate: "2012-02-08",
  email: "info@tienepal.com",
  telephone: "+977-61-585077",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chippledhunga",
    addressLocality: "Pokhara",
    addressCountry: "NP",
  },
  areaServed: [
    "Japan",
    "Denmark",
    "United Kingdom",
    "Ireland",
    "Australia",
    "New Zealand",
    "United States",
    "Canada",
  ],
  sameAs: [
    "https://www.facebook.com/",
    "https://www.instagram.com/",
    "https://www.linkedin.com/",
  ],
};

export const homeMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TIE Nepal — Your Future Has No Borders | Study Abroad Experts",
    template: "%s · TIE Nepal",
  },
  description:
    "Turn your dream of studying abroad into reality with expert counselling, university placement, visa support and career pathways. TIE Nepal — Pokhara's trusted, ICEF-certified consultancy since 2012.",
  keywords: [
    "study abroad Nepal",
    "study in Australia",
    "study in Canada",
    "study in UK",
    "study in USA",
    "study in Japan",
    "IELTS Pokhara",
    "PTE",
    "student visa Nepal",
    "TIE Nepal",
    "educational consultancy Pokhara",
  ],
  authors: [{ name: "Target International Education" }],
  creator: "Target International Education",
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: SITE_URL,
    siteName: "TIE Nepal",
    title: "Your Future Has No Borders — TIE Nepal",
    description:
      "Expert counselling, university placement, visa support and career pathways for students in Nepal. Study in 8 destinations worldwide.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TIE Nepal — Your Future Has No Borders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Future Has No Borders — TIE Nepal",
    description:
      "Study abroad with Pokhara's ICEF-certified experts. 8 destinations, full visa support, 13+ years of trust.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};
