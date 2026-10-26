import type { Metadata } from "next";
import LegalPage from "@/features/legal/components/LegalPage";
import { howWeUseAI } from "@/features/legal/data/how-we-use-ai";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "How We Use AI";
const DESCRIPTION =
  "How Meddy Health LLC and Sameer Aggarwal Medical PLLC use artificial intelligence to support your care, and how your information is protected.";
const PATH = "/how-we-use-ai";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["how we use AI", "artificial intelligence", "AI", "OpenAI", "Meddy Health LLC"],
});

export default function HowWeUseAI() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH, { type: "WebPage" })} />
      <LegalPage doc={howWeUseAI} showNav={false} />
    </>
  );
}
