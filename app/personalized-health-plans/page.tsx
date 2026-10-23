import type { Metadata } from "next";
import { PersonalizedHealthPlansPage } from "@/features/personalized-health-plans/routes/personalized-health-plans";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/personalized-health-plans/faqs";

const TITLE = "Personalized Health Plans Built by Physicians";
const DESCRIPTION =
  "Your nutrition, workouts, sleep, labs, medications, and goals, brought together so your physician can build a plan around how you actually live.";
const PATH = "/personalized-health-plans";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "personalized health plan",
    "custom health plan",
    "physician plan",
    "nutrition",
    "workout",
    "labs",
  ],
});

export default function PersonalizedHealthPlans() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <PersonalizedHealthPlansPage />
    </>
  );
}
