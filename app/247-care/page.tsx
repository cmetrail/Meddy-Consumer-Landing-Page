import type { Metadata } from "next";
import { CarePage } from "@/features/247-care/routes/247-care";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "24/7 Care — Primary Care That Doesn't Clock Out";
const DESCRIPTION =
  "See the same physician over time, reach Meddy 24/7, and get help navigating what comes up between appointments.";
const PATH = "/247-care";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "24/7 care",
    "after hours care",
    "primary care",
    "physician messaging",
    "telehealth",
  ],
});

export default function TwentyFourSevenCare() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <CarePage />
    </>
  );
}
