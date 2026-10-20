import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing/routes/pricing";
import { buildMetadata, JsonLd, webPageLd, membershipPlansLd } from "@/lib/seo";

const TITLE = "Pricing — Choose Your Level of Physician Support";
const DESCRIPTION =
  "Three levels of physician-led support starting at $99/month. Choose Meddy, Meddy Care, or Meddy Complete to match your needs.";
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
