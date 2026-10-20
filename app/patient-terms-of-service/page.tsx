import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { patientTermsOfService } from "@/features/legal/data/patient-terms-of-service";

export const metadata: Metadata = {
  title: "Patient Terms of Service | Meddy Health",
  description: "Sameer Aggarwal Medical PLLC Patient Terms of Service.",
};

export default function PatientTermsOfService() {
  return <LegalPage doc={patientTermsOfService} />;
}
