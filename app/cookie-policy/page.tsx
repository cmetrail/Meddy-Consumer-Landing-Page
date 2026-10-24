import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { cookiePolicy } from "@/features/legal/data/cookie-policy";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Cookie Policy";
const DESCRIPTION =
  "How Meddy Health LLC uses cookies and similar technologies on getmeddyhealth.com, and how you can control them.";
const PATH = "/cookie-policy";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["cookie policy", "cookies", "analytics", "Meddy Health LLC"],
});

export default function CookiePolicy() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={cookiePolicy} />
    </>
  );
}
