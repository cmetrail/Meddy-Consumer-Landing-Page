"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Figma: desktop node 10940:2975 (1440 x 1024, #FFFFF9) — four variants of one frame. Top: "-MEDDY" (hairline removed) + right-aligned italic
// subtitle. Left: uppercase statement and, pinned lower, three/four green-tab bullets that change with the selected word.
// Right: four 96px italic serif words; the selected one is dark (#46524b), the rest light grey. Click / hover a word to switch.
// No mobile frame yet: it stacks with smaller words.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/personalized-health-plans/one-plan";

const ITEMS = [
  { label: "Nutrition", bullets: ["Meals", "Calories", "Macros", "Nutritional targets"] },
  { label: "Fitness", bullets: ["Strength", "Cardio", "Mobility", "Rest"] },
  { label: "Sleep & Recovery", bullets: ["Sleep goals", "Consistency", "Recovery"] },
  { label: "Medical Care", bullets: ["Labs", "Medications", "Monitoring", "Follow-up"] },
];

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease, delay },
});

export default function PersonalizedHealthPlansOnePlanSection() {
  const [active, setActive] = useState(0);
  const current = ITEMS[active];

  return (
    <section className="w-full bg-[#FFFFF9] lg:min-h-[1024px]">
      {/* same container as the header */}
      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-5 py-16 lg:gap-[40px] lg:px-10 lg:py-[100px]">
        <motion.div className="flex w-full flex-col items-end" {...reveal(0)}>
          <div className="flex w-full flex-col items-start">
            <p className="w-full whitespace-nowrap text-right text-[20px] font-normal uppercase leading-[normal] text-[#46524b]">-Meddy</p>
          </div>
          <h2 className="comprehensive-serif w-full text-right text-[28px] font-normal italic leading-[normal] text-[#46524B] lg:text-[36px]">One plan for the way you actually live.</h2>
        </motion.div>

        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:gap-[27px]">
          {/* left: statement + the selected word's bullets */}
          <motion.div className="relative flex w-full flex-col items-start py-8 lg:w-[515px] lg:shrink-0 lg:self-stretch" {...reveal(0.1)}>
            <div className="flex w-full flex-col items-start leading-[normal]">
              <p className="w-full text-[24px] font-normal uppercase text-[#a1aaa3] lg:w-[450px] lg:text-[32px]">Nutrition, exercise, sleep, and medical care</p>
              <p className="text-[24px] font-medium italic uppercase text-[#46524b] lg:whitespace-nowrap lg:text-[32px]">shouldn&rsquo;t be separate plans.</p>
            </div>

            <div className="mt-10 min-h-[145px] w-full lg:absolute lg:left-0 lg:top-[381px] lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="flex flex-col items-start gap-[15px]"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.07 } },
                    exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease } },
                  }}
                >
                  {current.bullets.map((b) => (
                    <motion.div
                      key={b}
                      className="flex items-center gap-2"
                      variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } } }}
                    >
                      <span className="relative block h-[25px] w-[7px] shrink-0 -scale-y-100">
                        <Image src={`${A}/bar.svg`} alt="" fill unoptimized className="block max-w-none" />
                      </span>
                      <p className="whitespace-nowrap text-[16px] font-normal uppercase leading-[normal] text-[#6e7a72] lg:text-[20px]">{b}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* right: the four words */}
          <motion.div className="flex min-w-px flex-col items-end gap-[10px] lg:flex-1" {...reveal(0.15)}>
            {ITEMS.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.label}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-pressed={on}
                  className={`comprehensive-serif cursor-pointer whitespace-nowrap text-right text-[44px] font-normal italic leading-[normal] transition-colors duration-500 lg:text-[96px] ${on ? "text-[#46524b]" : "text-[#d2d2d2]"}`}
                >
                  {it.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
