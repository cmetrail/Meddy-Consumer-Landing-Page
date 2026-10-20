import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { privacyPolicy } from "@/features/legal/data/privacy-policy";

export const metadata: Metadata = {
  title: "Privacy Policy | Meddy Health",
  description: "Meddy Health LLC Privacy Policy.",
};

export default function PrivacyPolicy() {
  return <LegalPage doc={privacyPolicy} />;
}
