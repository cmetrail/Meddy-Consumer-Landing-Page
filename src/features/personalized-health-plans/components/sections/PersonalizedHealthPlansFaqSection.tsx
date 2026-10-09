"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Figma: desktop node 12613:16691 (1440 x 961) + mobile node 12721:16619 (402 wide). A thin light band at the top of a blue
// gradient, an 8-item accordion (first open, one open at a time) and a big "F A Q" in soft-light blend on the right
// (desktop) / above the list (mobile).
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/personalized-health-plans/faq";

const FAQS = [
  {
    q: "What is included in my personalized health plan?",
    a: "Depending on your needs and membership, your plan can include nutrition guidance, workout planning, sleep and recovery goals, laboratory testing, medication management, and other physician-directed recommendations.",
  },
  { q: "Who creates my health plan?", a: "Your Meddy physician creates and refines your plan based on your goals, biomarkers, and health history—not a one-size-fits-all template." },
  { q: "How often does my plan change?", a: "Your plan evolves as your data changes. Your physician reviews your progress and adjusts recommendations as your health improves or your goals shift." },
  { q: "Is my workout plan personalized too?", a: "Yes. Your fitness plan is built around your current fitness level, schedule, and the equipment you have access to." },
  { q: "Is my nutrition plan personalized?", a: "Yes. Your nutrition guidance accounts for the foods you enjoy, your goals, and your lifestyle so it stays sustainable rather than restrictive." },
  { q: "What happens if I'm not making progress?", a: "Your physician will review your data, identify what is and isn't working, and adjust your plan—from nutrition and workouts to medications and labs." },
  { q: "Can my plan include laboratory testing?", a: "Yes. Your physician can order targeted labs to track key biomarkers and guide your recommendations over time." },
  { q: "Can my plan include medications?", a: "Yes. If appropriate, your physician can prescribe and manage medications as part of your ongoing care." },
];

// soft white clouds over the seam into the FAQ (Figma "Cloud" 12613:16846, 1477 x 343): left, top, width, height, opacity, all in Figma px
const CLOUDS = [
  { l: 0, t: 0, w: 577.67, h: 320.03, o: 0.7 },
  { l: 349.5, t: 17.89, w: 408.1, h: 226.09, o: 0.7 },
  { l: 843, t: 18.43, w: 393.54, h: 218.03, o: 0.7 },
  { l: 1018.8, t: 65.04, w: 403.36, h: 223.47, o: 0.7 },
  { l: 676.7, t: 62.51, w: 408.1, h: 226.09, o: 1 },
  { l: 327, t: 55, w: 439.41, h: 243.44, o: 0.7 },
  { l: 547, t: 121, w: 340.4, h: 188.59, o: 1 },
  { l: 1069, t: 97, w: 408.1, h: 226.09, o: 1 },
  { l: 747, t: 117, w: 408.1, h: 226.09, o: 1 },
];

function Clouds() {
  return (
    <div className="pointer-events-none absolute -top-[250px] hidden h-[343px] w-[1440px] lg:block" style={{ left: "calc(50% - 720px)" }} aria-hidden>
      {CLOUDS.map((c, i) => (
        <div key={i} className="absolute overflow-hidden mix-blend-screen" style={{ left: c.l, top: c.t, width: c.w, height: c.h, opacity: c.o }}>
          <Image
            src={`/personalized-health-plans/physician/cloud.png`}
            alt=""
            width={1200}
            height={700}
            sizes="440px"
            className="absolute max-w-none"
            style={{ height: "125.73%", left: "-7.31%", top: 0, width: "111.86%" }}
          />
        </div>
      ))}
    </div>
  );
}

function Icon({ open }: { open: boolean }) {
  return open ? (
    <div className="relative h-0 w-[14px] shrink-0">
      <div className="absolute" style={{ inset: "-2px 0 0 0" }}>
        <Image src={`${A}/minus.svg`} alt="" fill unoptimized className="block max-w-none" />
      </div>
    </div>
  ) : (
    <div className="relative size-[14px] shrink-0">
      <Image src={`${A}/plus.svg`} alt="" fill unoptimized className="block max-w-none" />
    </div>
  );
}

export default function PersonalizedHealthPlansFaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <div
      className="relative w-full text-white"
      style={{ backgroundImage: "linear-gradient(to bottom, #f2f6f9 -17.576%, #3e7dae 14.622%, #285c87 65.907%)" }}
    >
      <style>{`@media (min-width: 1024px) { .hp-faq { background-image: linear-gradient(to bottom, #dbece6 0%, #f2f6f9 3.587%, #3e7dae 9.49%, #285c87 107.91%); } }`}</style>
      <div className="hp-faq absolute inset-0 hidden lg:block" aria-hidden />

      {/* same container as the header */}
      <div className="relative mx-auto flex w-full max-w-360 flex-col gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-start lg:gap-12 lg:px-10 lg:pb-[200px] lg:pt-[120px]">
        <motion.p
          className="flex gap-[5px] text-[32px] font-medium leading-[normal] mix-blend-soft-light lg:hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <span>F</span>
          <span>A</span>
          <span>Q</span>
        </motion.p>

        <motion.div
          className="flex w-full flex-col gap-[30px] lg:min-w-px lg:max-w-[976px] lg:flex-1 lg:gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`flex w-full flex-col items-start gap-[30px] ${isOpen ? "lg:gap-4" : ""}`}>
                <div className="w-full">
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between text-left">
                    <span className="min-w-px flex-1 text-[16px] font-normal leading-[1.5] text-white lg:text-[20px]">{f.q}</span>
                    <Icon open={isOpen} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="a" className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                        <p className="pt-2 text-[12px] font-normal leading-[1.5] text-white lg:pt-[15px] lg:text-[16px]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative h-0 w-full shrink-0">
                  <div className="absolute" style={{ inset: "-1px 0 0 0" }}>
                    <Image src={`${A}/line.svg`} alt="" fill unoptimized className="block max-w-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="hidden w-[176px] shrink-0 flex-col items-center gap-[5px] text-[104px] font-normal leading-[1.5] mix-blend-soft-light lg:flex"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <p>F</p>
          <p>A</p>
          <p>Q</p>
        </motion.div>
      </div>
      <Clouds />
    </div>
  );
}
