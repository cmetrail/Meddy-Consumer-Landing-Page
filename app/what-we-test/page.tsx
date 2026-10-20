import type { Metadata } from "next";
import { WhatWeTestPage } from "@/features/what-we-test/routes/what-we-test";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "What We Test — Labs Your Physician Orders";
const DESCRIPTION =
  "Your physician orders labs based on your health, history, and goals. Browse the tests we most often use to understand your health.";
const PATH = "/what-we-test";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "lab tests",
    "blood work",
    "biomarkers",
    "diagnostic testing",
    "comprehensive labs",
  ],
});

export default function WhatWeTest() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <WhatWeTestPage />
    </>
  );
}
