import type { Metadata } from "next";
import { FitnessPage } from "@/features/fitness/routes/fitness";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Fitness — See What Workouts Are Doing to Your Body";
const DESCRIPTION =
  "Track how you train, understand where you're improving, and get a physician-built workout plan that adapts to your goals and how your body responds.";
const PATH = "/fitness";

const FAQS: Faq[] = [
  {
    q: "How does Meddy build my workout plan?",
    a: "Meddy considers your goals, recent workouts, training load, exercise intensity, injuries, preferences, session mix, and recovery when building your plan.",
  },
  {
    q: "Can Meddy create both strength and cardio workouts?",
    a: "Yes. Your plan can combine strength, cardio, circuit training, and mobility sessions based on your goals, preferences, and recovery.",
  },
  {
    q: "Does Meddy track which muscles I'm training?",
    a: "Yes. Meddy shows which muscle groups each workout targets and how your training load is spread across your body over time.",
  },
  {
    q: "Which types of cardio can I track?",
    a: "Meddy tracks treadmill, elliptical, cycling, rowing, stair climbing, ski erg, and other cardio sessions, including duration, distance, pace, and heart rate zones.",
  },
  {
    q: "How does Meddy measure workout intensity?",
    a: "Meddy looks at your heart rate zones, load, duration, and effort across each session to estimate how hard a workout was.",
  },
  {
    q: "Does Meddy include rest days?",
    a: "Yes. Scheduled recovery is part of your plan, and Meddy adjusts it based on how strenuous your recent workouts have been.",
  },
  {
    q: "Does Meddy account for injuries?",
    a: "Yes. Your physician can see your injuries and joint, spinal, and impact stress, and adjusts your plan to work around them.",
  },
  {
    q: "Can I still do the workouts I enjoy?",
    a: "Yes. Your plan takes your preferences into account, so you can keep the exercises and training styles you enjoy.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "fitness tracking",
    "workout plan",
    "strength training",
    "cardio",
    "heart rate zones",
    "training load",
    "recovery",
    "physician",
  ],
});

export default function Fitness() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <FitnessPage />
    </>
  );
}
