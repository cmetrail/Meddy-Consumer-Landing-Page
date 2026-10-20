import type { Metadata } from "next";
import { WeightLossPage } from "@/features/weight-loss/routes/weight-loss";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Weight Loss — Understand What's Moving Your Weight";
const DESCRIPTION =
  "Weight loss is more than a number on the scale. Meddy connects your nutrition, activity, sleep, medications, and biomarkers so you know what's working.";
const PATH = "/weight-loss";

const FAQS: Faq[] = [
  {
    q: "Do I have to count calories?",
    a: "No. Meddy brings your nutrition into one place and shows your energy balance, so you can understand your progress without logging every single calorie.",
  },
  {
    q: "Does Meddy create a nutrition plan?",
    a: "Yes. Meddy builds a nutrition plan around your goals, preferences, and metabolic health, and adjusts it as you make progress.",
  },
  {
    q: "Can Meddy track whether my metabolic health is improving?",
    a: "Yes. Meddy tracks metabolic markers like glucose, A1C, and lipids alongside your weight and activity, so you can see your metabolic health change over time.",
  },
  {
    q: "Does Meddy offer weight-loss medications?",
    a: "Yes. When clinically appropriate, your Meddy physician can direct weight-loss medication alongside nutrition, activity, and sleep.",
  },
  {
    q: "What if my weight stops changing?",
    a: "Meddy helps you look beyond the scale. If your weight plateaus, your care team can review your energy balance, activity, sleep, and metabolic markers and adjust your plan.",
  },
  {
    q: "Can my physician see my nutrition and workouts?",
    a: "Yes. Your physician can see your nutrition, activity, sleep, and lab data alongside the rest of your health history, so it can inform your care.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "weight loss",
    "weight management",
    "metabolic health",
    "A1C",
    "glucose",
    "nutrition plan",
    "physician",
  ],
});

export default function WeightLoss() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <WeightLossPage />
    </>
  );
}
