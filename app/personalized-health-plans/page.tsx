import type { Metadata } from "next";
import { PersonalizedHealthPlansPage } from "@/features/personalized-health-plans/routes/personalized-health-plans";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Personalized Health Plans — A Plan Built Around You";
const DESCRIPTION =
  "Your nutrition, workouts, sleep, labs, medications, and goals, brought together so your physician can build a plan around how you actually live.";
const PATH = "/personalized-health-plans";

const FAQS: Faq[] = [
  {
    q: "What is included in my personalized health plan?",
    a: "Depending on your needs and membership, your plan can include nutrition guidance, workout planning, sleep and recovery goals, laboratory testing, medication management, and other physician-directed recommendations.",
  },
  {
    q: "Who creates my health plan?",
    a: "Your Meddy physician creates and refines your plan based on your goals, biomarkers, and health history—not a one-size-fits-all template.",
  },
  {
    q: "How often does my plan change?",
    a: "Your plan evolves as your data changes. Your physician reviews your progress and adjusts recommendations as your health improves or your goals shift.",
  },
  {
    q: "Is my workout plan personalized too?",
    a: "Yes. Your fitness plan is built around your current fitness level, schedule, and the equipment you have access to.",
  },
  {
    q: "Is my nutrition plan personalized?",
    a: "Yes. Your nutrition guidance accounts for the foods you enjoy, your goals, and your lifestyle so it stays sustainable rather than restrictive.",
  },
  {
    q: "What happens if I'm not making progress?",
    a: "Your physician will review your data, identify what is and isn't working, and adjust your plan—from nutrition and workouts to medications and labs.",
  },
  {
    q: "Can my plan include laboratory testing?",
    a: "Yes. Your physician can order targeted labs to track key biomarkers and guide your recommendations over time.",
  },
  {
    q: "Can my plan include medications?",
    a: "Yes. If appropriate, your physician can prescribe and manage medications as part of your ongoing care.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "personalized health plan",
    "custom health plan",
    "physician plan",
    "nutrition",
    "workout",
    "labs",
  ],
});

export default function PersonalizedHealthPlans() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <PersonalizedHealthPlansPage />
    </>
  );
}
