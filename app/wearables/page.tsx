import type { Metadata } from "next";
import { WearablesPage } from "@/features/wearables/routes/wearables";
import { buildMetadata, JsonLd, webPageLd, faqLd, type Faq } from "@/lib/seo";

const TITLE = "Wearables — Your Health Data, Seen by Your Physician";
const DESCRIPTION =
  "Connect your Apple Watch, Oura, Fitbit, and more to bring activity, sleep, heart rate, and recovery into one connected picture of your health.";
const PATH = "/wearables";

const FAQS: Faq[] = [
  {
    q: "Which wearables does Meddy support?",
    a: "Apple Health, Apple Watch, Oura Ring, Google Pixel Watch, and Fitbit; more planned over time.",
  },
  {
    q: "Do I need a wearable to use Meddy?",
    a: "No; Meddy works with the data you already have; a wearable adds richer activity, sleep, heart rate, recovery signals.",
  },
  {
    q: "What information can Meddy get from my wearable?",
    a: "Activity, workouts, heart rate, sleep, HRV, and recovery metrics depending on device.",
  },
  {
    q: "Can Meddy combine data from my wearable with my other health information?",
    a: "Yes; wearable data is combined with nutrition, weight, labs, medications, and medical history.",
  },
  {
    q: "Can my physician see my wearable data?",
    a: "Yes; alongside the rest of your history to help inform care.",
  },
  {
    q: "Does Meddy replace the app that came with my wearable?",
    a: "No; keep using the device's app; Meddy connects and adds clinical context.",
  },
  {
    q: "Will Meddy support more devices?",
    a: "Yes; more integrations planned over time.",
  },
  {
    q: "Who can see my wearable data?",
    a: "Only you and your Meddy care team, per your privacy settings.",
  },
  {
    q: "Is my data protected under HIPAA?",
    a: "Yes; protected in accordance with HIPAA.",
  },
  {
    q: "Can I disconnect my wearable or delete my data?",
    a: "Yes, at any time.",
  },
  {
    q: "Does connecting a wearable cost extra?",
    a: "No; included at no additional cost.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "wearables",
    "Apple Watch",
    "Oura",
    "Fitbit",
    "heart rate",
    "sleep tracking",
    "HRV",
  ],
});

export default function Wearables() {
  return (
    <>
      <JsonLd data={webPageLd(TITLE, DESCRIPTION, PATH)} />
      <JsonLd data={faqLd(FAQS)} />
      <WearablesPage />
    </>
  );
}
