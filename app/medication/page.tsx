import type { Metadata } from "next";
import { MedicationPage } from "@/features/medication/routes/medication";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/medication/faqs";

const TITLE = "Medication Management With Your Physician";
const DESCRIPTION =
  "Meddy helps your physician follow what happens before and after a medication starts or changes, so your treatment evolves based on how you respond.";
const PATH = "/medication";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "medication management",
    "prescriptions",
    "medication tracking",
    "dose adjustment",
    "physician",
    "labs",
  ],
});

export default function Medication() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <MedicationPage />
    </>
  );
}
