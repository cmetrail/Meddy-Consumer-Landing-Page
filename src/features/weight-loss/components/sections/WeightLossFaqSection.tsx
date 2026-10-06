"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Figma: desktop node 12593:13307 "Desktop - 431" (1440 x 877), cream bg #FFFEF2.
const ease = [0.22, 1, 0.36, 1] as const;

type Faq = { q: string; a: string };

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

export default function WeightLossFaqSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="weight-loss-faq" className="relative w-full overflow-hidden bg-[#FFFEF2]">
      {/* ===================== DESKTOP: fixed px, content box 1200 ===================== */}
      <div className="relative hidden lg:block">
        <div className="mx-auto w-full max-w-[1200px] py-[120px]">
          <motion.h2
            className="text-[104px] font-normal leading-[1.19] text-[#6E7A72]"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            FAQ
          </motion.h2>

          <div className="mt-[16px] flex flex-col">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-[#A0A0A0]">
                  <div className="py-[16px]">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-[20px] font-normal leading-[1.5] text-[#46524B]">
                        {f.q}
                      </span>
                      <Plus
                        className={`h-[14px] w-[14px] shrink-0 text-[#BFBFBF] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-[15px] max-w-[960px] text-[20px] font-normal leading-[1.5] text-[#46524B]/80">
                        {f.a}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================== MOBILE (<lg) ===================== */}
      <div className="lg:hidden">
        <div className="mx-auto flex w-full max-w-[500px] flex-col gap-8 px-5 py-16">
          <h2 className="text-[48px] font-normal leading-[1.1] text-[#6E7A72]">FAQ</h2>
          <div className="flex flex-col">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-[#A0A0A0]">
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-[18px] font-normal leading-[1.4] text-[#46524B]">
                        {f.q}
                      </span>
                      <Plus
                        className={`h-[14px] w-[14px] shrink-0 text-[#BFBFBF] transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-[16px] font-normal leading-[1.5] text-[#46524B]/80">
                        {f.a}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
