import type { Metadata } from "next";
import { NutritionPage } from "@/features/nutrition/routes/nutrition";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Nutrition — See What You Eat Is Doing to Your Body";
const DESCRIPTION =
  "Track calories, macros, vitamins, minerals, and hydration. See how changes in what you eat connect to changes in your body over time.";
const PATH = "/nutrition";

const FAQS: Faq[] = [
  {
    q: "How does Meddy track my meals?",
    a: "Take a photo of your meal and Meddy automatically identifies what you're eating and estimates its nutritional content. You can review and adjust the meal if needed.",
  },
  {
    q: "What nutrition information does Meddy track?",
    a: "Meddy tracks calories, macronutrients, vitamins, minerals, and hydration, so you can see the full picture of what you're eating.",
  },
  {
    q: "Do I have to enter calories and nutrients manually?",
    a: "No. Snap a photo of your meal and Meddy estimates its nutritional content for you. You can review and adjust any item before it's saved.",
  },
  {
    q: "How does Meddy know if I'm getting enough vitamins and minerals?",
    a: "Meddy compares your tracked intake against recommended daily targets and highlights nutrients you may be missing or getting too much of.",
  },
  {
    q: "Does Meddy tell me what I should eat?",
    a: "Meddy gives you personalized guidance based on your goals, preferences, and health data, but you stay in control of what you choose to eat.",
  },
  {
    q: "Can Meddy help me understand how my diet affects my weight and health?",
    a: "Yes. Meddy connects what you eat to changes in your weight, biomarkers, and overall health over time, so you can see what's working.",
  },
  {
    q: "Can my physician see what I'm eating?",
    a: "Yes. With your permission, your Meddy physician can review your nutrition data to guide your care and adjust your plan.",
  },
  {
    q: "Can Meddy accommodate my dietary preferences and restrictions?",
    a: "Yes. Meddy accounts for your dietary preferences, allergies, and restrictions when giving nutrition guidance.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "nutrition tracking",
    "meal tracking",
    "macros",
    "calories",
    "vitamins",
    "minerals",
    "hydration",
    "diet",
  ],
});

export default function Nutrition() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <NutritionPage />
    </>
  );
}
