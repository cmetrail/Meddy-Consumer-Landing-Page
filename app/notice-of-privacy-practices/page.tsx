import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { noticeOfPrivacyPractices } from "@/features/legal/data/notice-of-privacy-practices";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Notice of Privacy Practices";
const DESCRIPTION =
  "Sameer Aggarwal Medical PLLC Notice of Privacy Practices describing how your protected health information may be used and disclosed.";
const PATH = "/notice-of-privacy-practices";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "notice of privacy practices",
    "HIPAA",
    "protected health information",
    "Sameer Aggarwal Medical PLLC",
  ],
});

export default function NoticeOfPrivacyPractices() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={noticeOfPrivacyPractices} />
    </>
  );
}
