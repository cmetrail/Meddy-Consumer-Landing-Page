import type { Metadata } from "next";
import { PhysicianCarePage } from "@/features/physician-care/routes/physician-care";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Physician Care — Primary Care That Knows You";
const DESCRIPTION =
  "Primary care built around how you actually live — the same physician over time, with the full picture of your health between visits.";
const PATH = "/physician-care";

const FAQS: Faq[] = [
  {
    q: "Do you accept insurance? Can I use HSA/FSA funds?",
    a: "Yes, Meddy accepts participating insurance plans; membership price is based on your plan/coverage, shown before enrollment. Copays/coinsurance/deductibles may apply; HSA/FSA funds may be used for eligible expenses; labs, imaging, prescriptions may have separate costs.",
  },
  {
    q: "Can my Meddy physician prescribe medications?",
    a: "Yes, when clinically appropriate, your physician can prescribe and manage medications.",
  },
  {
    q: "What if I have an emergency or need care after hours?",
    a: "For emergencies call 911 or go to the nearest ED; for non-emergency after-hours questions, contact your Meddy care team.",
  },
  {
    q: "Where is Meddy physician care available?",
    a: "Depends on your location; confirm availability in your state when booking your consultation.",
  },
  {
    q: "Can I contact Meddy between appointments?",
    a: "Yes, you can message your care team with questions about care, medications, or health info.",
  },
  {
    q: "What happens during my first consultation?",
    a: "Your physician learns your medical history, medications, health data, and goals; you discuss concerns and next steps together.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "physician care",
    "primary care",
    "doctor",
    "telehealth",
    "insurance",
    "HSA",
    "FSA",
  ],
});

export default function PhysicianCare() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <PhysicianCarePage />
    </>
  );
}
