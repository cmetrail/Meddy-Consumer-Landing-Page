"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PricingPlansSection.module.css";

import { CircleCheckBig, Crown } from "lucide-react";
import { medicarePlans, selfPayPlans, type Plan } from "@/features/home/components/sections/helper/Pricing";

const CTA = "Book your Free Consultation";

function PlanCard({ plan, popular }: { plan: Plan; popular: boolean }) {
  return (
    <article className={`${styles.card} ${styles[plan.variant]}`} aria-label={plan.name} tabIndex={0}>
      {popular && (
        <span className={styles.badge}>
          <Crown size={20} strokeWidth={1.3} aria-hidden="true" />
          Most popular
        </span>
      )}
      <div className={styles.intro}>
        <h3 className={styles.title}>{plan.name}</h3>
        <p className={styles.tagline}>{plan.tagline}</p>
        <p className={styles.description}>{plan.description}</p>
      </div>
      <p className={styles.price}>
        ${plan.price}<span className={styles.period}>/month</span>
      </p>
      {plan.subheader && <p className={styles.subheader}>{plan.subheader}</p>}
      <ul className={styles.features}>
        {plan.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <CircleCheckBig className={styles.check} strokeWidth={1.2} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/book-consultation" className={styles.button}>{CTA}</Link>
    </article>
  );
}

export default function PricingPlansSection() {
  const [payment, setPayment] = useState<"self-pay" | "medicare">("self-pay");
  const medicare = payment === "medicare";

  return (
    <section className={styles.section} aria-label="Meddy membership plans">
      <Image src="/home/footer-bg.jpg" alt="" fill sizes="100vw" className={styles.background} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.switch} role="group" aria-label="Payment type">
          {(["self-pay", "medicare"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={payment === option}
              onClick={() => setPayment(option)}
            >
              {option === "self-pay" ? "Self - pay" : "Medicare"}
            </button>
          ))}
        </div>
        <div className={styles.plans} data-medicare={medicare}>
          {(medicare ? medicarePlans : selfPayPlans).map((plan) => (
            <PlanCard key={plan.name} plan={plan} popular={!medicare && plan.variant === "care"} />
          ))}
        </div>
      </div>
    </section>
  );
}
