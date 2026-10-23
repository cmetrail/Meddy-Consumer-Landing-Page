import type { Metadata } from "next";
import { SleepPage } from "@/features/sleep/routes/sleep";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Sleep Tracking & Recovery Insights";
const DESCRIPTION =
  "See the quality of your sleep, understand your recovery, and discover what may be helping or getting in the way, with your physician in the loop.";
const PATH = "/sleep";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "sleep tracking",
    "sleep quality",
    "recovery",
    "sleep architecture",
    "REM",
    "deep sleep",
    "resting heart rate",
  ],
});

export default function Sleep() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <SleepPage />
    </>
  );
}
