"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Figma: desktop node 12659:29891 (1440 x 1073, #F5F5F0): 579 x 833 rounded photo with five green blocks on the left, "FAQ" +
// an 8-item accordion on the right (+/- icons, light-green rules). Mobile node 12720:15638: no photo, "Frequently Asked Questions"
// heading, chevron rows with dark-green rules and a "Book With Dr. Aggarwal" button. One item open at a time, the first starts open.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/nutrition/faq";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "How does Meddy track my meals?",
    a: "Take a photo of your meal and Meddy automatically identifies what you're eating and estimates its nutritional content. You can review and adjust the meal if needed.",
  },
  {
    q: "What nutrition information does Meddy track?",
    a: "Meddy tracks calories, macronutrients, vitamins, minerals, and hydration, so you can see the full picture of what you're eating.",
  },
  {
    q: "Do I have to enter calories and nutrients manually?",
    a: "No. Snap a photo of your meal and Meddy estimates its nutritional content for you. You can review and adjust any item before it's saved.",
  },
  {
    q: "How does Meddy know if I'm getting enough vitamins and minerals?",
    a: "Meddy compares your tracked intake against recommended daily targets and highlights nutrients you may be missing or getting too much of.",
  },
  {
    q: "Does Meddy tell me what I should eat?",
    a: "Meddy gives you personalized guidance based on your goals, preferences, and health data, but you stay in control of what you choose to eat.",
  },
  {
    q: "Can Meddy help me understand how my diet affects my weight and health?",
    a: "Yes. Meddy connects what you eat to changes in your weight, biomarkers, and overall health over time, so you can see what's working.",
  },
  {
    q: "Can my physician see what I'm eating?",
    a: "Yes. With your permission, your Meddy physician can review your nutrition data to guide your care and adjust your plan.",
  },
  {
    q: "Can Meddy accommodate my dietary preferences and restrictions?",
    a: "Yes. Meddy accounts for your dietary preferences, allergies, and restrictions when giving nutrition guidance.",
  },
];

// green blocks over the photo: left, top, width, height (Figma px inside the 579 x 833 frame)
const BLOCKS = [
  { l: 319, t: 0, w: 130, h: 92.556 },
  { l: 449, t: 92.56, w: 130, h: 92.556 },
  { l: 130, t: 516.09, w: 130, h: 114.769 },
  { l: 0, t: 627.9, w: 130, h: 205.103 },
];

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

function Chevron({ open }: { open: boolean }) {
  return (
    <span className={`relative block size-[20px] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <Image src={`${A}/down.svg`} alt="" fill unoptimized className="block max-w-none" />
    </span>
  );
}

export default function NutritionFaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative w-full bg-[#F5F5F0] max-lg:bg-[#fafafa]">
      {/* same container as the header */}
      <div className="mx-auto flex w-full max-w-360 flex-col gap-12 px-5 py-16 lg:flex-row lg:items-start lg:px-10 lg:py-[120px]">
        {/* photo + blocks (desktop) */}
        <motion.div
          className="relative hidden h-[833px] w-[579px] shrink-0 lg:block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[15px]">
            <Image src={`${A}/photo.jpg`} alt="Healthy food, water and weights on a sunlit table" width={1200} height={1200} sizes="600px" className="pointer-events-none absolute max-w-none" style={{ height: "100%", left: "-21.94%", top: 0, width: "121.93%" }} />
          </div>
          {BLOCKS.map((b, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#69a358]"
              style={{ left: b.l, top: b.t, width: b.w, height: b.h }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.1 }}
            />
          ))}
        </motion.div>

        <div className="flex min-w-px flex-1 flex-col items-start gap-12">
          <motion.h2
            className="hidden h-[60px] items-center text-[48px] font-semibold uppercase leading-[normal] text-[#46524B] lg:flex"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            FAQ
          </motion.h2>
          <motion.h2
            className="text-[32px] leading-[1.5] text-black lg:hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="block font-medium">Frequently Asked</span>
            <span className="comprehensive-serif block font-normal italic text-[#17925a]">Questions</span>
          </motion.h2>

          <motion.div
            className="flex w-full flex-col gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              const last = i === FAQS.length - 1;
              return (
                <div key={f.q} className={`${f.q.startsWith("Can Meddy help") ? "max-lg:hidden " : ""}flex w-full flex-col items-start gap-[30px] border-b border-solid border-[#44905f] pb-4 lg:border-0 lg:pb-0 ${isOpen ? "lg:gap-4" : "lg:gap-[30px]"}`}>
                  <div className="w-full">
                    <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between gap-2 text-left">
                      <span className="min-w-px flex-1 text-[16px] font-normal leading-[1.5] text-[#111110] lg:text-[20px] lg:text-[#46524B]">{f.q}</span>
                      <span className="hidden lg:block"><Icon open={isOpen} /></span>
                      <span className="lg:hidden"><Chevron open={isOpen} /></span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div key="a" className="overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}>
                          <p className="pt-2 text-[14px] font-normal leading-[1.5] text-[#718e7d] lg:pt-[15px] lg:text-[16px]">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {!last && (
                    <div className="relative hidden h-0 w-full shrink-0 lg:block">
                      <div className="absolute" style={{ inset: "-1px 0 0 0" }}>
                        <Image src={`${A}/line.svg`} alt="" fill unoptimized className="block max-w-none" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <button type="button" className="mt-0 w-fit rounded-[35px] bg-[#17925a] px-5 py-3 text-[16px] font-normal leading-[normal] text-white lg:hidden">
              Book With Dr. Aggarwal
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
