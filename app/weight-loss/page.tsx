import type { Metadata } from "next";
import { WeightLossPage } from "@/features/weight-loss/routes/weight-loss";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/weight-loss/faqs";

const TITLE = "Weight Management With Physician Guidance";
const DESCRIPTION =
  "Weight loss is more than a number on the scale. Meddy connects your nutrition, activity, sleep, medications, and biomarkers so you know what's working.";
const PATH = "/weight-loss";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "weight loss",
    "weight management",
    "metabolic health",
    "A1C",
    "glucose",
    "nutrition plan",
    "physician",
  ],
});

export default function WeightLoss() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <WeightLossPage />
    </>
  );
}
