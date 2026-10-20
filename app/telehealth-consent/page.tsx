import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { telehealthConsent } from "@/features/legal/data/telehealth-consent";

export const metadata: Metadata = {
  title: "Telehealth Informed Consent | Meddy Health",
  description: "Sameer Aggarwal Medical PLLC Telehealth Informed Consent.",
};

export default function TelehealthConsent() {
  return <LegalPage doc={telehealthConsent} />;
}
