import type { Metadata } from "next";
import { BookConsultationPage } from "@/features/book-consultation/routes/book-consultation";
import { buildMetadata, JsonLd, webPageLd } from "@/lib/seo";

const TITLE = "Book a Free 30-Minute Consultation";
const DESCRIPTION =
  "Book a free 30-minute video visit with a board-certified internal medicine physician. Tell us about you, your goals, and a time that works.";
const PATH = "/book-consultation";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "book consultation",
    "free consultation",
    "video visit",
    "physician",
    "telehealth",
  ],
});

export default function BookConsultation() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <BookConsultationPage />
    </>
  );
}
