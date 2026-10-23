import type { Metadata } from "next";
import { WhyMeddyPage } from "@/features/why-meddy/routes/why-meddy";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Why Meddy: Care Built Around Your Life";
const DESCRIPTION =
  "Healthcare wasn't designed to see everyday life. Meddy gives your physician the connected picture of your habits for less fragmented, better-informed care.";
const PATH = "/why-meddy";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "why Meddy",
    "personalized healthcare",
    "physician",
    "everyday health",
    "connected care",
    "fragmented healthcare",
  ],
});

export default function WhyMeddy() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <WhyMeddyPage />
    </>
  );
}
