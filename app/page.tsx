import type { Metadata } from "next";
import { HomePage } from "@/features/home/routes/home";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Physician-Guided Primary Care";
const DESCRIPTION =
  "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle. Now accepting our first 500 patients.";
const PATH = "/";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "primary care",
    "physician",
    "personalized health plan",
    "telehealth",
    "nutrition",
    "fitness",
    "sleep",
    "labs",
    "biomarkers",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <HomePage />
    </>
  );
}
