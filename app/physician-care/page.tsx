import type { Metadata } from "next";
import { PhysicianCarePage } from "@/features/physician-care/routes/physician-care";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/physician-care/faqs";

const TITLE = "Physician Care — Primary Care That Knows You";
const DESCRIPTION =
  "Primary care built around how you actually live — the same physician over time, with the full picture of your health between visits.";
const PATH = "/physician-care";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "physician care",
    "primary care",
    "doctor",
    "telehealth",
    "insurance",
    "HSA",
    "FSA",
  ],
});

export default function PhysicianCare() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <PhysicianCarePage />
    </>
  );
}
