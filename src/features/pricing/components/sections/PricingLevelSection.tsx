"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Tier = {
  name: string;
  color: string;
  img: string;
  objectPosition: string;
  width: number;
  height: number;
  desc: string;
};

const TIERS: Tier[] = [
  {
    name: "Meddy",
    color: "#946540",
    img: "/pricing/d5a6159ea20dca2273c8ef0be548a14188874d3d.jpg",
    objectPosition: "50% 100%",
    width: 367,
    height: 418,
    desc: "For people who want a better way to understand their health.",
  },
  {
    name: "Meddy Care",
    color: "#93734E",
    img: "/pricing/8d0b53e30ac5fddbd6d1a8994f168ce926efd648.jpg",
    objectPosition: "50% 50%",
    width: 404,
    height: 550,
    desc: "For people who want physician guidance, labs, and personalized recommendations.",
  },
  {
    name: "Meddy Complete",
    color: "#84AAA1",
    img: "/pricing/7e86884b65dc9a18f3ffb75d18d81f5e1c4fa052.jpg",
    objectPosition: "50% 50%",
    width: 464,
    height: 805,
    desc: "For people who want an ongoing healthcare relationship built around their data.",
  },
];

const CLIP = "polygon(0% 16.23%, 0% 100%, 100% 100%, 100% 0%, 27.55% 0%)";

const CANVAS_WIDTH = 1440;
const CANVAS_HEIGHT = 1103;

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
      const { width, height } = el.getBoundingClientRect();
      const availW = Math.min(width, CANVAS_WIDTH);
      setScale(Math.min(1, availW / CANVAS_WIDTH, height / CANVAS_HEIGHT));
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#17231D] lg:[height:var(--dvh)]"
    >
      <div className="mx-auto flex h-full w-full max-w-360 flex-col py-8 px-5 lg:px-10">
        <motion.div
          className="flex flex-col lg:h-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={listVariants}
        >
          <motion.h2
            className="font-normal uppercase leading-[130%] text-white text-[24px] md:text-[28px] lg:text-[38px]"
            variants={riseVariants}
          >
            Choose the level of care
            <br />
            <i><b>that fits your goals.</b></i>
          </motion.h2>

          {/* Mobile: vertical stack */}
          <div className="mt-8 flex flex-col gap-10 lg:hidden">
            {TIERS.map((tier) => (
              <motion.div key={tier.name} className="flex flex-col" variants={riseVariants}>
                <div
                  className="relative w-full overflow-hidden max-h-[60vw] sm:max-h-[50vw]"
                  style={{ aspectRatio: `${tier.width}/${tier.height}`, clipPath: CLIP }}
                >
                  <Image
                    src={tier.img}
                    alt={tier.name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    style={{ objectPosition: tier.objectPosition }}
                  />
                  <span
                    className="absolute right-4 top-4 z-10 font-semibold uppercase leading-none text-[18px]"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </span>
                </div>
                <p className="mt-3 text-[14px] font-normal leading-[1.25] text-white">{tier.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: horizontal arc */}
          <div className="mt-auto hidden lg:flex flex-row justify-between items-end gap-6">
            {TIERS.map((tier) => (
              <motion.div key={tier.name} className="flex flex-col" variants={riseVariants}>
                <div
                  className="relative"
                  style={{ width: tier.width * scale, height: tier.height * scale }}
                >
                  <div className="absolute inset-0" style={{ clipPath: CLIP }}>
                    <Image
                      src={tier.img}
                      alt={tier.name}
                      fill
                      sizes="33vw"
                      className="object-cover"
                      style={{ objectPosition: tier.objectPosition }}
                    />
                  </div>
                  <span
                    className="absolute right-4 top-4 z-10 font-semibold uppercase leading-none"
                    style={{ fontSize: 32 * scale, color: tier.color }}
                  >
                    {tier.name}
                  </span>
                </div>
                <p
                  className="mt-4 font-normal leading-[1.25] text-white"
                  style={{ fontSize: 20 * scale, maxWidth: tier.width * scale }}
                >
                  {tier.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
