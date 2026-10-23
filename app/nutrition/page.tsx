import type { Metadata } from "next";
import { NutritionPage } from "@/features/nutrition/routes/nutrition";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/nutrition/faqs";

const TITLE = "Nutrition Tracking: Macros, Vitamins & Labs";
const DESCRIPTION =
  "Track calories, macros, vitamins, minerals, and hydration. See how changes in what you eat connect to changes in your body over time.";
const PATH = "/nutrition";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "nutrition tracking",
    "meal tracking",
    "macros",
    "calories",
    "vitamins",
    "minerals",
    "hydration",
    "diet",
  ],
});

export default function Nutrition() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <NutritionPage />
    </>
  );
}
