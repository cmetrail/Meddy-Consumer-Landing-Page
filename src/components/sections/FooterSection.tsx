"use client";

import { useRef } from "react";
import Image from "next/image";
import { Check, Crown, Apple } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAV_LINKS = ["How it works", "Why meddy", "Physician care", "Pricing", "FAQ"];

function PlanCard({
  name,
  tagline,
  price,
  period,
  features,
  cta,
  highlighted = false,
  badge,
}: {
  name: string;
  tagline: string;
  price?: string;
  period?: string;
  features: { text: string; highlight?: boolean }[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-xl p-8 ${
        highlighted ? "border-[5px] border-[#17925A] bg-[#D9D9D9]/20 lg:-translate-y-6" : "bg-[#CDCDCD]/20"
      }`}
    >
      {badge && (
        <span className="absolute -top-4 left-8 inline-flex items-center gap-1.5 rounded-full bg-[#17925A] px-4 py-1.5 text-white" style={{ fontSize: 14 }}>
          <Crown size={15} /> {badge}
        </span>
      )}

      <h3 className="text-white font-semibold" style={{ fontSize: 48 }}>{name}</h3>
      <p className="text-white mt-1" style={{ fontSize: 24 }}>{tagline}</p>

      {price && (
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-white" style={{ fontSize: 20 }}>$</span>
          <span className="text-white font-bold leading-none" style={{ fontSize: 64 }}>{price}</span>
          {period && <span className="text-white/80 font-semibold" style={{ fontSize: 18 }}>{period}</span>}
        </div>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f) => (
          <li key={f.text} className="flex items-start gap-2.5">
            <Check size={20} className={f.highlight ? "text-[#E1FF8D]" : "text-white"} strokeWidth={2.5} />
            <span
              className={f.highlight ? "text-[#E1FF8D] font-bold" : "text-white"}
              style={{ fontSize: f.highlight ? 20 : 18 }}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 rounded-lg py-3.5 w-full text-white text-center ${
          highlighted
            ? "bg-[#17925A] shadow-[3px_4px_4px_rgba(78,191,68,0.25)]"
            : "border border-white"
        }`}
        style={{ fontSize: 24 }}
      >
        {cta}
      </button>
    </div>
  );
}

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden text-white">
      <Image src="/home/footer-bg.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-360 mx-auto px-6 lg:px-13 pt-20 lg:pt-28">
        {/* Header */}
        <div data-reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="text-[#F4F4F5] font-medium uppercase tracking-[0.02em]" style={{ fontSize: 24 }}>
              Pricing
            </p>
            <p className="text-white font-semibold" style={{ fontSize: 48 }}>
              Care designed
            </p>
            <p className="text-white font-semibold leading-none" style={{ fontSize: 96 }}>
              Around you
            </p>
          </div>
          <p className="text-white lg:text-right max-w-md lg:pb-4" style={{ fontSize: 24 }}>
            Simple transparent plans, physician-guided care that adapts to your life.
          </p>
        </div>

        {/* Plans */}
        <div className="mt-20 grid lg:grid-cols-3 gap-8 lg:gap-6 items-start">
          <div data-reveal>
            <PlanCard
              name="Free"
              tagline="Track your health. Build better habits"
              features={[
                { text: "Track your Nutrition" },
                { text: "Workouts" },
                { text: "Sleep" },
                { text: "Progress in One Place" },
              ]}
              cta="Start for free"
            />
          </div>
          <div data-reveal>
            <PlanCard
              name="Meddy Care"
              tagline="Track your health. Build better habits"
              price="249"
              period="/Month"
              badge="Premium Plan"
              highlighted
              features={[
                { text: "Unlimited Labs", highlight: true },
                { text: "Bi-weekly Physician Access" },
                { text: "Secure Messaging" },
                { text: "Your Health Team" },
              ]}
              cta="Choose Care"
            />
          </div>
          <div data-reveal>
            <PlanCard
              name="Complete"
              tagline="Track your health. Build better habits"
              price="169"
              period="/Month"
              features={[
                { text: "Add Physician Guidance" },
                { text: "Secure Messaging" },
                { text: "Quarterly Labs" },
              ]}
              cta="Choose complete"
            />
          </div>
        </div>

        {/* Footer bar */}
        <div data-reveal className="mt-20 rounded-t-[22px] bg-white/10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            <div className="max-w-md">
              <Image src="/app-logo.png" alt="Meddy Health" height={45} width={69} className="mb-4" />
              <p className="text-[#F4F4F5]" style={{ fontSize: 20 }}>
                Calories, workouts, sleep, labs… Most people manage them separately. Meddy connects them and puts a physician in charge of what they mean.
              </p>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-2">
              {NAV_LINKS.map((link) => (
                <a key={link} href="#" className="text-white font-medium uppercase tracking-[0.02em] hover:opacity-70" style={{ fontSize: 20 }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-t border-white/10 pt-8">
            <p className="text-white/80" style={{ fontSize: 12 }}>
              © 2026 Meddy · Physician services available in all 50 states except: South Carolina, Arkansas, Rhode Island.
            </p>

            <div className="flex gap-3">
              <button className="flex items-center gap-2.5 rounded-lg bg-black/20 px-5 py-2.5 text-left">
                <Apple size={26} className="text-white" />
                <span>
                  <span className="block text-white/70" style={{ fontSize: 10 }}>Download on the</span>
                  <span className="block text-white font-semibold leading-none" style={{ fontSize: 16 }}>App Store</span>
                </span>
              </button>
              <button className="flex items-center gap-2.5 rounded-lg bg-black/20 px-5 py-2.5 text-left">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                  <path d="M4 3.5v17l9-8.5-9-8.5z" fill="#fff" />
                  <path d="M15.5 10.5l-2.5-2.4 7-6.6c.5-.5 1.3-.1 1.3.6v19.8c0 .7-.8 1.1-1.3.6l-7-6.6 2.5-2.4z" fill="#fff" opacity="0.8" />
                </svg>
                <span>
                  <span className="block text-white/70" style={{ fontSize: 10 }}>Get it on</span>
                  <span className="block text-white font-semibold leading-none" style={{ fontSize: 16 }}>Google Play</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
