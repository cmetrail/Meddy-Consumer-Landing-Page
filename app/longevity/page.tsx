import type { Metadata } from "next";
import { LongevityPage } from "@/features/longevity/routes/longevity";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/longevity/faqs";

const TITLE = "Longevity — Stay Healthier Longer with Preventive Care";
const DESCRIPTION =
  "Meddy brings your biomarkers, nutrition, fitness, sleep, weight, medications, and health history together so you and your physician can act earlier.";
const PATH = "/longevity";

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
