import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { privacyPolicy } from "@/features/legal/data/privacy-policy";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Meddy Health LLC collects, uses, and shares information through the Meddy website and mobile app.";
const PATH = "/privacy-policy";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["privacy policy", "data privacy", "HIPAA", "Meddy Health LLC"],
});

export default function PrivacyPolicy() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={privacyPolicy} />
    </>
  );
}
