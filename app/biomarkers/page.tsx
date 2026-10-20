import type { Metadata } from "next";
import { BiomarkersPage } from "@/features/biomarkers/routes/biomarkers";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Biomarkers — Go Beyond the Annual Blood Test";
const DESCRIPTION =
  "Get comprehensive lab testing, track your biomarkers over time, and understand what is actually changing your health and where to focus next.";
const PATH = "/biomarkers";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "biomarkers",
    "lab testing",
    "blood test",
    "A1C",
    "LDL",
    "cholesterol",
    "vitamin D",
    "comprehensive labs",
  ],
});

export default function Biomarkers() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <BiomarkersPage />
    </>
  );
}
