"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Figma: desktop node 12613:14573 (1440 x 956) + mobile node 12721:18091 (402 wide). Dark green gradient, a 719px FAQ column
// (full width on mobile) and a faint grid pattern blended over the right side. One item open at a time; the first starts open.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/longevity";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "What is preventive health?",
    a: "Preventive health focuses on understanding your current health, identifying risks early, and taking steps intended to reduce the likelihood or impact of future health problems.",
  },
  {
    q: "How is Meddy different from an annual physical?",
    a: "An annual physical is a single moment in time. Meddy tracks your biomarkers, nutrition, sleep, and activity continuously, so you and your physician can spot changes as they happen rather than once a year.",
  },
  {
    q: "What biomarkers can Meddy track?",
    a: "Meddy can track a range of biomarkers, including metabolic markers like glucose, A1C, and lipids, along with other labs your physician orders based on your health history and goals.",
  },
  {
    q: "Can I get comprehensive lab testing?",
    a: "Yes. Your Meddy physician can order clinically appropriate labs to build a full picture of your health and monitor it over time.",
  },
  {
    q: "Does Meddy track cardiovascular fitness?",
    a: "Yes. Meddy can bring in activity and cardiovascular fitness data from your wearable and other sources to help track your fitness alongside your other health measures.",
  },
  {
    q: "Can Meddy show me how my habits affect my health?",
    a: "Yes. Meddy connects your nutrition, sleep, exercise, and other habits to your biomarkers, so you can see how the choices you make each day affect your health.",
  },
  {
    q: "Does a physician review my data?",
    a: "Yes. Your Meddy physician reviews your data and uses it to guide your preventive care and refine your plan over time.",
  },
  {
    q: "What happens if something starts moving in the wrong direction?",
    a: "Your Meddy physician will see the change, and you can work together to understand what's happening and take action earlier.",
  },
];

function Icon({ open }: { open: boolean }) {
  // minus is a 14px-wide hairline (its svg sits 2px above the box), plus is a 14px square
  return open ? (
    <div className="relative h-0 w-[14px] shrink-0">
      <div className="absolute" style={{ inset: "-2px 0 0 0" }}>
        <Image src={`${A}/faq-minus.svg`} alt="" fill unoptimized loading="eager" className="block max-w-none" />
      </div>
    </div>
  ) : (
    <div className="relative size-[14px] shrink-0">
      <Image src={`${A}/faq-plus.svg`} alt="" fill unoptimized loading="eager" className="block max-w-none" />
    </div>
  );
}

function Rule() {
  return (
    <div className="relative h-0 w-full shrink-0">
      <div className="absolute" style={{ inset: "-1px 0 0 0" }}>
        <Image src={`${A}/faq-line.svg`} alt="" fill unoptimized loading="eager" className="block max-w-none" />
      </div>
    </div>
  );
}

export default function LongevityFAQSection() {
  const [open, setOpen] = useState<number>(0);
  const toggle = (i: number) => setOpen(open === i ? -1 : i);

  return (
    <section
      id="faq"
      className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(to right, #15211b 9.479%, #1e3529 112.39%)" }}
    >
      {/* grid pattern, blended over the background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden max-w-360 lg:block" aria-hidden>
        <div className="absolute left-[719px] top-0 h-[1036px] w-[1202.765px] mix-blend-overlay">
          <Image src={`${A}/faq-pattern.svg`} alt="" fill unoptimized priority className="block max-w-none" />
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-1/2 h-[947px] -translate-y-1/2 mix-blend-overlay lg:hidden" style={{ right: -697.44 }} aria-hidden>
        <div className="absolute" style={{ inset: "-0.11% 0 0 0" }}>
          <Image src={`${A}/faq-pattern-m.svg`} alt="" fill unoptimized loading="eager" className="block max-w-none" />
        </div>
      </div>

      {/* same container as the header */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-8 px-5 py-16 lg:gap-6 lg:px-10 lg:py-[120px]">
        <motion.h2
          className="w-full text-[32px] font-medium uppercase leading-[normal] text-white lg:text-[64px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          FAQ
        </motion.h2>

        <div className="flex w-full flex-col gap-[30px] lg:max-w-[719px] lg:gap-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const last = i === FAQS.length - 1;
            return (
              <div key={f.q} className={`flex w-full flex-col items-start ${isOpen ? "gap-[30px] lg:gap-4" : "gap-[30px]"}`}>
                <div className="w-full">
                  <button type="button" onClick={() => toggle(i)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between gap-4 text-left">
                    <span className="min-w-px flex-1 text-[16px] font-normal leading-[1.5] text-[#f5f5f5] lg:text-[20px]">{f.q}</span>
                    <Icon open={isOpen} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <p className="pt-[15px] text-[14px] font-normal leading-[1.5] text-[#919191] lg:text-[16px]">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {!last && <Rule />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
