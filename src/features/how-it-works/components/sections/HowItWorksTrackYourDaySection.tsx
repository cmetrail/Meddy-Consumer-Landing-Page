"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12688:9057 (1440 x 1196), mobile node 12765:14834 (402 x 875); fixed px, same photo on both.
// Heading + intro on top, "Track your day" card (4-pill rail + glass panel) at the bottom; the pills switch the panel copy.
const ease = [0.22, 1, 0.36, 1] as const;

type Tab = { label: string; title: string; body: string; tags: string };

const TABS: Tab[] = [
  {
    label: "Nutrients",
    title: "Nutrients",
    body: "Understand what you eat, monitor your nutrition, and build healthier eating habits.",
    tags: "Calories · Macros · Micronutrients · Hydration",
  },
  {
    label: "Fitness",
    title: "Fitness",
    body: "Track your training, exercise performance, and progress over time.",
    tags: "Workouts · Training load · Muscles trained · Heart rate zones",
  },
  {
    label: "Sleep",
    title: "Sleep",
    body: "Monitor your sleep patterns, duration, and quality to understand how well you're recovering overnight.",
    tags: "Duration · Efficiency · Sleep stages · Consistency",
  },
  {
    label: "Recovery",
    title: "Recovery",
    body: "Keep an eye on rest, readiness, and recovery so you know when to push harder or take it easier.",
    tags: "HRV · Resting heart rate · Readiness · Rest days",
  },
];

export default function HowItWorksTrackYourDaySection() {
  const [active, setActive] = useState<number>(0);
  const current = TABS[active];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Mobile backdrop: 1318 x 879 photo starting 450px left of the page + dark fade over the lower part */}
      <div className="pointer-events-none absolute lg:hidden" style={{ left: -450, top: "calc(50% - 1.5px)", width: 1318, height: 879, transform: "translateY(-50%)" }}>
        <Image src="/how-it-works/track-your-day/track-day.png" alt="" fill priority sizes="1318px" className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 opacity-60 lg:hidden"
        style={{ bottom: -4, height: 832, background: "linear-gradient(180deg, rgba(0,0,0,0) 73.742%, #030C16 100%)" }}
      />
      {/* Desktop backdrop: Figma box (1794 x 1196, 63px bleed at 1440 wide) that grows with the page; its left edge drifts right with width so the woman keeps the Figma position relative to the headline */}
      <div className="pointer-events-none absolute hidden lg:block" style={{ left: "calc(8% - 178px)", width: "calc(100% + 354px)", top: "50%", aspectRatio: "1536 / 1024", minHeight: "100%", transform: "translateY(-50%)" }}>
        <Image src="/how-it-works/track-your-day/track-day.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* same container as the header; on mobile the title block grows and the card sits at the bottom (322px apart in the frame) */}
      <div className="relative mx-auto flex min-h-dvh w-full max-w-360 flex-col px-5 py-16 lg:min-h-0 lg:px-10 lg:py-[120px]" style={{ gap: 0 }}>
        <div className="flex flex-1 flex-col lg:flex-none" style={{ gap: 8 }}>
          <motion.h2
            className="flex items-center whitespace-nowrap text-[40px] font-medium leading-[1.5] lg:gap-[10px] lg:text-[104px] lg:font-normal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="comprehensive-serif italic text-[#17925A]">Track</span>
            <span className="ml-[10px] text-[#F5F5F0] lg:ml-0">Your Day</span>
          </motion.h2>

          <motion.p
            className="w-full text-[16px] font-normal leading-[1.5] text-[#111110] lg:w-[472px] lg:text-[20px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            One place to understand your everyday health and wellness. Track the habits and activities that influence how you feel and perform throughout the day.
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          className="mt-[322px] flex flex-row items-end justify-between lg:mt-[266px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          {/* Tab rail */}
          <div className="flex w-[165px] shrink-0 flex-col items-start gap-[10px] lg:w-auto">
            <div className="flex w-fit flex-col gap-[10px]">
            {TABS.map((t, i) => {
              const isActive = active === i;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`flex w-full items-center justify-center whitespace-nowrap p-4 text-[14px] font-normal leading-[1.5] backdrop-blur-[50px] transition-colors lg:p-[24px] lg:text-[32px] lg:font-medium ${
                    isActive
                      ? "rounded-[62px] bg-white/50 text-[#111110]"
                      : "rounded-[12px] bg-white/20 text-white lg:rounded-[23px]"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
            </div>
          </div>

          {/* Glass panel */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 self-stretch rounded-[12px] bg-white/20 p-4 backdrop-blur-[50px] lg:w-[459px] lg:flex-none lg:shrink-0 lg:gap-0 lg:rounded-[23px] lg:p-[24px]">
            <motion.h3
              key={`title-${active}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease }}
              className="text-[20px] font-bold leading-[1.5] text-white lg:w-[307px] lg:text-[56px] lg:font-medium"
            >
              {current.title}
            </motion.h3>

            <div className="flex flex-1 flex-col gap-2 lg:flex-none lg:gap-4">
              <motion.p
                key={`body-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.05 }}
                className="flex-1 text-[14px] font-normal leading-[1.5] text-white lg:flex-none lg:text-[20px]"
              >
                {current.body}
              </motion.p>

              <motion.p
                key={`tags-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.1 }}
                className="comprehensive-serif italic text-[12.5px] leading-[1.5] text-[#111110] lg:text-[20px]"
              >
                {current.tags}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
