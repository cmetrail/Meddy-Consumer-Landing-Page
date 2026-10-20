import type { Metadata } from "next";
import { HowItWorksPage } from "@/features/how-it-works/routes/how-it-works";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "How Meddy Works — Understand Your Health, Not Just Your Data";
const DESCRIPTION =
  "One place to track your everyday health. Meddy surfaces what actually matters, gives you a physician-built plan, and shows measurable progress over time.";
const PATH = "/how-it-works";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "how Meddy works",
    "health tracking",
    "health data",
    "health insights",
    "physician plan",
    "progress tracking",
  ],
});

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <HowItWorksPage />
    </>
  );
}
