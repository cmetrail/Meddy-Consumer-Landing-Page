import type { Metadata } from "next";
import { WearablesPage } from "@/features/wearables/routes/wearables";
import { buildMetadata, JsonLd, webPageLd, faqLd } from "@/lib/seo";
import { FAQS } from "@/features/wearables/faqs";

const TITLE = "Apple Watch, Oura & Fitbit Health Data";
const DESCRIPTION =
  "Connect your Apple Watch, Oura, Fitbit, and more to bring activity, sleep, heart rate, and recovery into one connected picture of your health.";
const PATH = "/wearables";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "wearables",
    "Apple Watch",
    "Oura",
    "Fitbit",
    "heart rate",
    "sleep tracking",
    "HRV",
  ],
});

export default function Wearables() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <WearablesPage />
    </>
  );
}
