import type { Metadata } from "next";

export const SITE_URL = "https://getmeddyhealth.com";
export const SITE_NAME = "Meddy Health";
export const OG_IMAGE = `${SITE_URL}/opengraph-image`;
export const TWITTER_IMAGE = `${SITE_URL}/twitter-image`;

export const PHONE = "+1-516-925-3997";
export const EMAIL = "support@meddyhealth.ai";
export const CLINIC_EMAIL = "support@getmeddyhealth.com";
export const PHYSICIAN_NAME = "Dr. Sameer Aggarwal";
export const CLINIC_NAME = "Sameer Aggarwal Medical PLLC";

export const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "515 W 38th Street, Apt 11J",
  addressLocality: "New York",
  addressRegion: "NY",
  postalCode: "10018",
  addressCountry: "US",
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Meddy Health`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [TWITTER_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export type Faq = { q: string; a: string };

function titleCaseSegment(segment: string): string {
  return segment
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function breadcrumbFromPath(path: string) {
  const items: object[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ];
  const segments = path.split("/").filter(Boolean);
  let acc = "";
  segments.forEach((segment, i) => {
    acc += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: titleCaseSegment(segment),
      item: `${SITE_URL}${acc}`,
    });
  });
  return items;
}

export function webPageLd(
  name: string,
  description: string,
  path: string,
  opts?: { type?: "WebPage" | "MedicalWebPage" },
) {
  const type = opts?.type ?? "MedicalWebPage";
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbFromPath(path),
    },
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function membershipPlansLd() {
  const plans = [
    {
      name: "Meddy",
      description:
        "Personalized guidance to understand your health, improve your habits, and optimize your performance.",
      price: "99",
    },
    {
      name: "Meddy Care",
      description:
        "Ongoing physician-led care with regular visits, lab testing, and personalized recommendations.",
      price: "169",
    },
    {
      name: "Meddy Complete",
      description:
        "High-touch physician care with frequent visits, comprehensive evaluation, and health optimization.",
      price: "249",
    },
  ];
  return plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    description: plan.description,
    brand: { "@id": `${SITE_URL}/#organization` },
    category: "Physician-led membership primary care",
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing`,
      availability: "https://schema.org/InStock",
    },
  }));
}

export const SITE_GRAPH_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/app-logo.png`,
      description:
        "Meddy Health is physician-guided primary care built around your everyday health data — nutrition, workouts, sleep, and labs.",
      email: EMAIL,
      telephone: PHONE,
      address: ADDRESS,
      areaServed: "US",
    },
    {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic`,
      name: CLINIC_NAME,
      medicalSpecialty: "PrimaryCare",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: ADDRESS,
      telephone: PHONE,
      email: CLINIC_EMAIL,
    },
    {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      name: PHYSICIAN_NAME,
      medicalSpecialty: "InternalMedicine",
      jobTitle: "Physician",
      worksFor: { "@id": `${SITE_URL}/#clinic` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
