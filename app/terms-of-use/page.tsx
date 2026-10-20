import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { termsOfUse } from "@/features/legal/data/terms-of-use";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Terms of Use";
const DESCRIPTION =
  "Meddy Health LLC Terms of Use governing your use of the Meddy website, mobile app, and related services.";
const PATH = "/terms-of-use";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["terms of use", "terms and conditions", "Meddy Health LLC", "legal"],
});

export default function TermsOfUse() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={termsOfUse} />
    </>
  );
}
