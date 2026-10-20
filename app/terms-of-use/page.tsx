import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { termsOfUse } from "@/features/legal/data/terms-of-use";

export const metadata: Metadata = {
  title: "Terms of Use | Meddy Health",
  description: "Meddy Health LLC Terms of Use.",
};

export default function TermsOfUse() {
  return <LegalPage doc={termsOfUse} />;
}
