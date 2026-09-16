"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Tier = {
  name: string;
  color: string;
  img: string;
  width: number;
  height: number;
  descWidth: number;
  lead: string;
  bold: string;
};

const TIERS: Tier[] = [
  {
    name: "Meddy",
    color: "#946540",
    img: "/pricing/level-meddy.png",
    width: 367,
    height: 418,
    descWidth: 343,
    lead: "For people who want ",
    bold: "personalized guidance to improve their health.",
  },
  {
    name: "Meddy Care",
    color: "#93734E",
    img: "/pricing/level-care.png",
    width: 404,
    height: 557,
    descWidth: 413,
    lead: "For people who want ",
    bold: "regular physician care with labs and personalized guidance.",
  },
  {
    name: "Meddy Complete",
    color: "#84AAA1",
    img: "/pricing/level-complete.png",
    width: 464,
    height: 757,
    descWidth: 464,
    lead: "For people who want ",
    bold: "high-touch physician care with comprehensive, continuous support.",
  },
];

const CANVAS_WIDTH = 1440;

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const riseVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PricingLevelSection() {
  const [scale, setScale] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;
      const { width } = el.getBoundingClientRect();
      setScale(Math.min(1, Math.min(width, CANVAS_WIDTH) / CANVAS_WIDTH));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#17231D]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-5 pt-12 pb-16 lg:px-10 lg:pt-[69px] lg:pb-[47px]">
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={listVariants}
        >
          <motion.h2
            variants={riseVariants}
            className="text-left font-normal uppercase leading-[115%] text-[24px] md:text-[32px] lg:text-[48px]"
          >
            <span className="text-[#D5D6D6]">Choose the level of care that</span>
            <br />
            <span className="font-bold italic text-white">fits your goals.</span>
          </motion.h2>

          {/* Mobile: vertical stack */}
          <div className="mt-8 flex flex-col gap-10 lg:hidden">
            {TIERS.map((tier) => (
              <motion.div key={tier.name} className="flex flex-col" variants={riseVariants}>
                <div
                  className="relative w-full"
                  style={{ aspectRatio: `${tier.width}/${tier.height}` }}
                >
                  <Image
                    src={tier.img}
                    alt={tier.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <span
                    className="absolute right-4 top-4 z-10 font-semibold uppercase leading-none text-[18px]"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </span>
                </div>
                <p className="mt-3 text-[14px] font-normal leading-[1.25] text-white">
                  {tier.lead}
                  <b>{tier.bold}</b>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: horizontal, bottom-aligned */}
          <div className="mt-8 hidden lg:-mt-[60px] lg:flex lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            {TIERS.map((tier) => (
              <motion.div key={tier.name} className="flex flex-col" variants={riseVariants}>
                <div
                  className="relative"
                  style={{ width: tier.width * scale, height: tier.height * scale }}
                >
                  <Image
                    src={tier.img}
                    alt={tier.name}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                  <span
                    className="absolute right-4 top-4 z-10 font-semibold uppercase leading-none"
                    style={{ fontSize: 32 * scale, color: tier.color }}
                  >
                    {tier.name}
                  </span>
                </div>
                <p
                  className="mt-4 font-normal leading-[1.25] text-white"
                  style={{ fontSize: 20 * scale, maxWidth: tier.descWidth * scale }}
                >
                  {tier.lead}
                  <b>{tier.bold}</b>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
