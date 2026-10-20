import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { noticeOfPrivacyPractices } from "@/features/legal/data/notice-of-privacy-practices";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices | Meddy Health",
  description: "Sameer Aggarwal Medical PLLC Notice of Privacy Practices.",
};

export default function NoticeOfPrivacyPractices() {
  return <LegalPage doc={noticeOfPrivacyPractices} />;
}
