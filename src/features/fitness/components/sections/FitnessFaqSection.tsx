"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Faq = {
  q: string;
  a: string;
};

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

export default function FitnessFaqSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="w-full bg-[#171718]">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-5 py-16 lg:flex-row lg:gap-12 lg:px-[100px] lg:py-[clamp(48px,calc((100dvh-530px)/2),120px)]">
        {/* Left title */}
        <div className="lg:w-[307px] lg:shrink-0">
          <h2 className="text-[32px] font-medium leading-[normal] text-white lg:text-[36px]">
            Frequently Asked <br className="hidden lg:block" />
            <span className="comprehensive-serif font-normal italic">Questions</span>
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:h-[530px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`border-b border-white pb-4 lg:min-h-0 ${isOpen ? "" : "lg:flex-1"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-2 text-left"
                >
                  <span className="text-[18px] font-normal leading-[normal] text-white lg:text-[20px]">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 pr-7 text-[16px] font-light leading-[normal] text-white opacity-60">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
