"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { CircleCheckBig, Crown } from "lucide-react";

type Variant = "free" | "care" | "complete";

type Plan = {
  variant: Variant;
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  priceLabel?: string;
  price?: string;
  featuresHeading?: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    variant: "free",
    name: "Meddy",
    tagline: "Understand your health.",
    description:
      "Everything you need to track nutrition, workouts, sleep, recovery, and progress in one place.",
    priceLabel: "Free",
    features: [
      "AI nutrition tracking",
      "Workout planning and logging",
      "Weight trends",
      "Progress dashboards",
      "Habit and lifestyle tracking",
    ],
    cta: "Join the waitlist",
  },
  {
    variant: "care",
    badge: "Most popular",
    name: "Meddy Care",
    tagline: "Add physician guidance.",
    description:
      "For people who want medical insight, lab interpretation, and personalized recommendations.",
    price: "$169",
    featuresHeading: "Everything in Meddy, plus:",
    features: [
      "Physician access (monthly)",
      "Secure messaging",
      "Phone and video appointments",
      "Quarterly comprehensive lab testing included",
      "Biomarker tracking",
      "Personalized adjustments",
    ],
    cta: "Join the waitlist",
  },
  {
    variant: "complete",
    name: "Meddy Complete",
    tagline: "Your health team.",
    description:
      "For patients who want ongoing physician support and a more comprehensive healthcare experience.",
    price: "$249",
    featuresHeading: "Everything in Meddy care, plus:",
    features: [
      "Physician access (biweekly)",
      "Secure messaging",
      "Unlimited physician-directed lab testing as clinically appropriate",
      "Biomarker tracking",
      "Personalized adjustments",
      "Continuous care coordination",
      "Priority scheduling",
    ],
    cta: "Join the waitlist",
  },
];

const CARD_STYLES: Record<Variant, string> = {
  free: "bg-[#CDCDCD]/20 backdrop-blur-md",
  care: "bg-[#CDCDCD]/20 backdrop-blur-md border-[3.7px] border-[#17925A]",
  complete: "bg-[#17925A]",
};

const TITLE_STYLES: Record<Variant, string> = {
  free: "text-[#8ABE85]",
  care: "text-[#8ABE85]",
  complete: "text-white",
};

const TAGLINE_STYLES: Record<Variant, string> = {
  free: "text-white",
  care: "text-white",
  complete: "text-[#B9FFB3]",
};

const DESC_STYLES: Record<Variant, string> = {
  free: "text-[#DADADA]",
  care: "text-[#DADADA]",
  complete: "text-white",
};

const PRICE_STYLES: Record<Variant, string> = {
  free: "text-white",
  care: "text-white",
  complete: "text-[#B9FFB3]",
};

const CHECK_STYLES: Record<Variant, string> = {
  free: "text-[#8ABE85]",
  care: "text-[#B9FFB3]",
  complete: "text-[#B9FFB3]",
};

const FEATURE_STYLES: Record<Variant, string> = {
  free: "text-[#DADADA]",
  care: "text-white",
  complete: "text-white",
};

const BUTTON_STYLES: Record<Variant, string> = {
  free: "border border-white text-[#DADADA] hover:bg-white/10",
  care: "bg-[#17925A] text-[#DADADA] shadow-[0px_2.96px_2.96px_rgba(0,0,0,0.25)] hover:bg-[#1BA867]",
  complete:
    "bg-white text-[#17925A] shadow-[0px_2.96px_2.96px_rgba(0,0,0,0.25)] hover:bg-white/90",
};

function PlanCard({ plan }: { plan: Plan }) {
  const v = plan.variant;
  return (
    <div
      className={`relative flex h-full flex-col gap-5 rounded-[7.4px] p-6 lg:p-7 ${CARD_STYLES[v]}`}
    >
      {plan.badge && (
        <span className="absolute -top-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.25 bg-[#17925A] px-3.5 py-[3.7px] text-[14.8px] font-medium leading-[100%] text-white">
          <Crown size={22} className="text-white" />
          {plan.badge}
        </span>
      )}

      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-3.75">
          <div className="flex flex-col gap-1.25">
            <h3
              className={`text-[32px] font-medium uppercase leading-[100%] ${TITLE_STYLES[v]}`}
            >
              {plan.name}
            </h3>
            <p
              className={`text-[20px] font-bold leading-[100%] ${TAGLINE_STYLES[v]}`}
            >
              {plan.tagline}
            </p>
           
          </div>
           <p
              className={`text-[14px] font-normal leading-[100%] ${DESC_STYLES[v]}`}
            >
              {plan.description}
            </p>
        </div>

        {plan.priceLabel ? (
          <span
            className={`text-[48px] font-semibold uppercase leading-[100%] ${PRICE_STYLES[v]}`}
          >
            {plan.priceLabel}
          </span>
        ) : (
          <span
            className={`text-[36px] font-semibold uppercase leading-[100%] ${PRICE_STYLES[v]}`}
          >
            {plan.price}{" "}
            <span className="text-[14px] font-normal normal-case">/month</span>
          </span>
        )}

        {plan.featuresHeading && (
          <p className="text-[16px] font-semibold leading-[100%] text-white">
            {plan.featuresHeading}
          </p>
        )}

        <ul className="flex flex-col gap-[14.81px]">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.75">
              <CircleCheckBig
                size={plan.variant === "free" ? 17.77 : 14.81}
                className={`shrink-0 ${CHECK_STYLES[v]}`}
              />
              <span
                className={`text-[14px] leading-[100%] ${FEATURE_STYLES[v]}`}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className={`w-full rounded-[7.4px] py-[7.4px] h-12.25 text-center text-[17.77px] font-semibold leading-[100%] transition-colors duration-200 ${BUTTON_STYLES[v]}`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function PricingPlansSection() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#FFE9D0] py-16">
      <Image src="/home/footer-bg.jpg" alt="" fill priority className="object-cover" />
      <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10">
        <motion.div
          className="grid w-full grid-cols-1 gap-8.75 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <PlanCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
