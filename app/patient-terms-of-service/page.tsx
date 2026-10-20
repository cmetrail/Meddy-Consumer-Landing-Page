import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { patientTermsOfService } from "@/features/legal/data/patient-terms-of-service";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Patient Terms of Service";
const DESCRIPTION =
  "Sameer Aggarwal Medical PLLC Patient Terms of Service governing membership plans and telehealth medical services.";
const PATH = "/patient-terms-of-service";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "patient terms of service",
    "membership",
    "Sameer Aggarwal Medical PLLC",
    "telehealth",
  ],
});

export default function PatientTermsOfService() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={patientTermsOfService} />
    </>
  );
}
