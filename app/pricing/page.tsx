import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing/routes/pricing";
import { buildMetadata, JsonLd, webPageLd, membershipPlansLd } from "@/lib/seo";

const TITLE = "Membership Pricing: Plans From $59/month";
const DESCRIPTION =
  "Self-pay plans from $99/month and Medicare plans from $59/month. Choose Meddy, Meddy Care, or Meddy Complete for the level of physician support you need.";
const PATH = "/pricing";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "pricing",
    "membership",
    "physician care plans",
    "Meddy",
    "Meddy Care",
    "Meddy Complete",
  ],
});

export default function Pricing() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={membershipPlansLd()} />
      <PricingPage />
    </>
  );
}
