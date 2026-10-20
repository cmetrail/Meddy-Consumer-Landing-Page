import type { Metadata } from "next";
import { LongevityPage } from "@/features/longevity/routes/longevity";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Longevity — Stay Healthier Longer with Preventive Care";
const DESCRIPTION =
  "Meddy brings your biomarkers, nutrition, fitness, sleep, weight, medications, and health history together so you and your physician can act earlier.";
const PATH = "/longevity";

const FAQS: Faq[] = [
  {
    q: "What is preventive health?",
    a: "Preventive health focuses on understanding your current health, identifying risks early, and taking steps to reduce the likelihood or impact of future health problems.",
  },
  {
    q: "How is Meddy different from an annual physical?",
    a: "An annual physical is a single moment in time; Meddy tracks biomarkers, nutrition, sleep, and activity continuously so changes are spotted as they happen.",
  },
  {
    q: "What biomarkers can Meddy track?",
    a: "Metabolic markers like glucose, A1C, and lipids, plus other labs your physician orders based on your health history and goals.",
  },
  {
    q: "Can I get comprehensive lab testing?",
    a: "Yes — your Meddy physician can order clinically appropriate labs to build a full picture of your health and monitor it over time.",
  },
  {
    q: "Does Meddy track cardiovascular fitness?",
    a: "Yes — Meddy can bring in activity and cardiovascular fitness data from your wearable and other sources.",
  },
  {
    q: "Can Meddy show me how my habits affect my health?",
    a: "Yes — Meddy connects nutrition, sleep, exercise, and other habits to your biomarkers to show how daily choices affect health.",
  },
  {
    q: "Does a physician review my data?",
    a: "Yes — your Meddy physician reviews your data and uses it to guide preventive care and refine your plan.",
  },
  {
    q: "What happens if something starts moving in the wrong direction?",
    a: "Your Meddy physician will see the change and you can work together to understand and act earlier.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "longevity",
    "preventive care",
    "preventive health",
    "biomarkers",
    "aging well",
    "healthspan",
    "physician",
  ],
});

export default function Longevity() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <LongevityPage />
    </>
  );
}
