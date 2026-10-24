"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Pricing.module.css";

export type Plan = {
  variant: "free" | "care" | "complete";
  name: string;
  tagline: string;
  description: string;
  price: string;
  subheader?: string;
  features: string[];
};

export const selfPayPlans: Plan[] = [
  {
    "variant": "free",
    "name": "Meddy",
    "tagline": "Optimize your health.",
    "description": "Personalized guidance to understand your health, improve your habits, and optimize your performance.",
    "price": "99",
    "features": [
      "Unlimited physician messaging",
      "Nutrition & Fitness guidance",
      "Biomarker tracking",
      "Personalized health adjustments"
    ]
  },
  {
    "variant": "care",
    "name": "Meddy Care",
    "tagline": "Your personal physician.",
    "description": "Ongoing physician-led care with regular visits, lab testing, and personalized recommendations.",
    "price": "169",
    "features": [
      "Unlimited physician messaging",
      "Nutrition & Fitness guidance",
      "Biomarker tracking",
      "Personalized health adjustments",
      "Monthly physician visit",
      "Videoconferencing"
    ]
  },
  {
    "variant": "complete",
    "name": "Meddy Complete",
    "tagline": "Your health, fully managed.",
    "description": "High-touch physician care with frequent visits, comprehensive evaluation, and health optimization.",
    "price": "249",
    "features": [
      "Unlimited physician messaging",
      "Nutrition & Fitness guidance",
      "Biomarker tracking",
      "Personalized health adjustments",
      "Biweekly physician visits",
      "Videoconferencing",
      "Physician built weekly fitness plan",
      "Continuous care coordination"
    ]
  }
];

const medicareCore = [
  "Personal health dashboard",
  "Wearable and device syncing",
  "Biomarker tracking and Health Impact insights",
  "Nutrition, activity, and sleep tracking",
  "Video-guided exercise library and workout tracking",
  "Personalized health goals and reminders",
  "Health trends and progress reports",
];

export const medicarePlans: Plan[] = [
  {
    variant: "free",
    name: "Meddy",
    tagline: "Understand your health.",
    description: "Track your health, understand your progress, and stay connected to your care.",
    price: "59",
    subheader: "Your membership includes:",
    features: medicareCore,
  },
  {
    variant: "care",
    name: "Meddy Care",
    tagline: "Your personal physician.",
    description: "Ongoing physician-led care with regular visits, lab testing, and personalized recommendations.",
    price: "79",
    subheader: "A personalized plan for better health:",
    features: [...medicareCore, "Personalized workout programs", "Monthly in-app progress reviews"],
  },
  {
    variant: "complete",
    name: "Meddy Complete",
    tagline: "More structure. More personalized guidance.",
    description: "Stay on track with weekly fitness programming and priority scheduling.",
    price: "99",
    subheader: "Your membership includes:",
    features: [
      ...medicareCore,
      "Everything in Meddy, plus:",
      "Personalized workout programs",
      "Monthly in-app progress reviews",
      "Progress reviews every 2 weeks",
      "Weekly physician-built fitness plans",
      "Priority appointment scheduling",
    ],
  },
];

/** Shown under the Medicare plans (Figma 14959:4551). */
export const medicareNote = {
  heading: "Medical Care Available With Every Membership Billed separately to insurance, when covered:",
  items: [
    "Physician consultations and follow-up visits",
    "Care-team messaging and clinical follow-up",
    "Laboratory testing, imaging, and specialist referrals",
    "Nutrition counseling, weight management, and care coordination",
  ],
  footer: "Medical services are provided based on clinical necessity and insurance coverage. Copayments, deductibles, and coinsurance may apply.",
};

function PlanCard({ plan, medicare }: { plan: Plan; medicare: boolean }) {
  const icons = medicare || plan.variant === "free"
    ? ["9e8b5", "4a8f9"]
    : plan.variant === "care"
      ? ["b1c5d", "c35bc", "b1c5d", "ac77d", "ac77d", "c35bc"]
      : ["c35bc", "c35bc", "c35bc", "c35bc", "ac77d", "c35bc", "c35bc", "c35bc"];

  return (
    <article className={`${styles.card} ${styles[plan.variant]}`} aria-label={plan.name}>
      {!medicare && plan.variant === "care" && (
        <span className={styles.badge}>
          <Image src="/home/pricing/47e2a.svg" width={20} height={20} alt="" />
          Most popular
        </span>
      )}
      <h3 className={styles.name}>{plan.name}</h3>
      <p className={styles.tagline}>{plan.tagline}</p>
      <p className={styles.description}>{plan.description}</p>
      <p className={styles.price}><span>${plan.price}</span> <span>/month</span></p>
      {plan.subheader && <p className={styles.subheader}>{plan.subheader}</p>}
      <ul className={styles.features}>
        {plan.features.map((feature, index) => {
          const large = medicare || plan.variant === "free";
          return (
            <li key={feature}>
              <span className={styles.check}>
                <Image src={`/home/pricing/${icons[index % icons.length]}.svg`} width={large ? 15.7953 : 13.3285} height={large ? 15.7953 : 13.3273} alt="" />
              </span>
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
      <Link href="/book-consultation" className={styles.button}>Book your Free Consultation</Link>
    </article>
  );
}

export function Pricing() {
  const [payment, setPayment] = useState<"self-pay" | "medicare">("self-pay");
  const plansRef = useRef<HTMLDivElement>(null);
  const medicare = payment === "medicare";

  return (
    <>
      <div data-pricing-head className={styles.heading}>
        <div>
          <p data-line>Pricing</p>
          <h2>
            <span data-line>Care designed</span>
            <em data-line>Around you</em>
          </h2>
        </div>
        <p data-line>Simple, transparent plans,<br />physician-guided care that adapts to your life.</p>
      </div>
      <div className={styles.memberships}>
        <div className={styles.paymentSwitch} role="group" aria-label="Payment type">
          {(["self-pay", "medicare"] as const).map((option) => (
            <button key={option} type="button" aria-pressed={payment === option} aria-controls="home-pricing-plans" onClick={() => {
              setPayment(option);
              plansRef.current?.scrollTo({ left: 0 });
            }}>{option === "self-pay" ? "Self - pay" : "Medicare"}</button>
          ))}
        </div>
        <div ref={plansRef} id="home-pricing-plans" className={styles.plans} data-medicare={medicare} role="region" aria-label={`${medicare ? "Medicare" : "Self-pay"} pricing plans`} tabIndex={0}>
          {(medicare ? medicarePlans : selfPayPlans).map((plan) => (
            <div key={plan.variant} data-plan-card><PlanCard plan={plan} medicare={medicare} /></div>
          ))}
        </div>
        {medicare && (
          <div className={styles.medicareNote}>
            <p>{medicareNote.heading}</p>
            <ul>{medicareNote.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>{medicareNote.footer}</p>
          </div>
        )}
      </div>
    </>
  );
}
