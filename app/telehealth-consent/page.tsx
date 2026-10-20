import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { telehealthConsent } from "@/features/legal/data/telehealth-consent";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Telehealth Informed Consent";
const DESCRIPTION =
  "Sameer Aggarwal Medical PLLC Telehealth Informed Consent for receiving primary care services through telehealth.";
const PATH = "/telehealth-consent";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "telehealth",
    "informed consent",
    "telemedicine",
    "Sameer Aggarwal Medical PLLC",
  ],
});

export default function TelehealthConsent() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={telehealthConsent} />
    </>
  );
}
