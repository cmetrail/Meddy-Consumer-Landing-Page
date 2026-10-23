import type { Metadata } from "next";
import { FitnessPage } from "@/features/fitness/routes/fitness";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/fitness/faqs";

const TITLE = "Fitness Tracking & Physician-Built Workouts";
const DESCRIPTION =
  "Track how you train, understand where you're improving, and get a physician-built workout plan that adapts to your goals and how your body responds.";
const PATH = "/fitness";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "fitness tracking",
    "workout plan",
    "strength training",
    "cardio",
    "heart rate zones",
    "training load",
    "recovery",
    "physician",
  ],
});

export default function Fitness() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <FitnessPage />
    </>
  );
}
