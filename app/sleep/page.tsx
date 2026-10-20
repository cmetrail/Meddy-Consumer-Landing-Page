import type { Metadata } from "next";
import { SleepPage } from "@/features/sleep/routes/sleep";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Sleep — Know How Well Your Body Is Recovering";
const DESCRIPTION =
  "See the quality of your sleep, understand your recovery, and discover what may be helping — or getting in the way.";
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
