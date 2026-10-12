"use client";

import Image from "next/image";
import styles from "./PricingPlansSection.module.css";

import { CircleCheckBig, Crown } from "lucide-react";

type Variant = "free" | "care" | "complete";

type Plan = {
  variant: Variant;
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  price?: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    variant: "free",
    name: "Meddy",
    tagline: "Optimize your health.",
    description:
      "Personalized guidance to understand your health, improve your habits, and optimize your performance.",
    price: "$99",
    features: [
      "24/7 physician messaging",
      "Nutrition & Fitness guidance",
      "Biomarker tracking",
      "Personalized health adjustments",
    ],
    cta: "Book your Free Consultation",
  },
  {
    variant: "care",
    badge: "Most popular",
    name: "Meddy Care",
    tagline: "Your personal physician.",
    description:
      "Ongoing physician-led care with regular visits, lab testing, and personalized recommendations.",
    price: "$169",
    features: [
      "24/7 physician messaging",
      "Nutrition & Fitness guidance",
      "Biomarker tracking",
      "Personalized health adjustments",
      "Monthly physician visit",
      "Videoconferencing",
    ],
    cta: "Book your Free Consultation",
  },
  {
    variant: "complete",
    name: "Meddy Complete",
    tagline: "Your health, fully managed.",
    description:
      "High-touch physician care with frequent visits, comprehensive evaluation, and health optimization.",
    price: "$249",
    features: [
      "24/7 physician messaging",
      "Nutrition & Fitness guidance",
      "Biomarker tracking",
      "Personalized health adjustments",
      "Biweekly physician visits",
      "Videoconferencing",
      "Physician built weekly fitness plan",
      "Continuous care coordination",
    ],
    cta: "Book your Free Consultation",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className={`${styles.card} ${styles[plan.variant]}`} aria-label={plan.name} tabIndex={0}>
      {plan.badge && (
        <span className={styles.badge}>
          <Crown size={20} strokeWidth={1.3} aria-hidden="true" />
          {plan.badge}
        </span>
      )}
      <div className={styles.intro}>
        <h3 className={styles.title}>{plan.name}</h3>
        <p className={styles.tagline}>{plan.tagline}</p>
        <p className={styles.description}>{plan.description}</p>
      </div>
      <p className={styles.price}>
        {plan.price}<span className={styles.period}>/month</span>
      </p>
      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <CircleCheckBig className={styles.check} strokeWidth={1.2} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.button}>{plan.cta}</button>
    </article>
  );
}

export default function PricingPlansSection() {
  return (
    <section className={styles.section} aria-label="Meddy membership plans">
      <Image src="/home/footer-bg.jpg" alt="" fill sizes="100vw" className={styles.background} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.plans}>
        {PLANS.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
      </div>
    </section>
  );
}
