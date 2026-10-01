"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const GRADIENT =
  "linear-gradient(180deg, rgba(250,249,245,1) 35%, rgba(255,255,255,1) 58%, rgba(192,237,179,1) 100%)";

const BLEND_OVERLAY =
  "linear-gradient(180deg, rgba(195,255,206,0) 65%, rgba(247,253,246,1) 100%)";

export default function CareHealthChangesSection() {
  return (
    <section className="w-full bg-[#FAF9F5]">
      <div
        className="relative mx-auto w-full max-w-360 overflow-hidden rounded-[15px] px-5 mb-7 pt-16 lg:px-[75px] lg:pt-24"
        style={{ background: GRADIENT }}
      >
        {/* Heading + right paragraph */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            className="max-w-[650px] self-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-left font-medium leading-[100%] text-[32px] sm:text-[48px] lg:text-[64px]">
              <span className="text-[#6E7A72]">Your health changes </span>
              <span className="font-dm-serif italic text-[#46524B]">Your physician doesn&rsquo;t.</span>
            </p>
          </motion.div>

          <motion.div
            className="flex max-w-[504px] flex-col gap-6 lg:mt-[136px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="font-medium leading-[130%] text-[#A1AAA3] text-[22px] lg:text-[32px]">
              Primary care works better when{" "}
              <em className="italic text-[#6E7A72]">your doctor actually knows you</em>
              <span className="text-[#6E7A72]">.</span>
            </p>
            <p className="text-[#6E7A72] font-normal leading-[140%] text-[16px] lg:text-[20px]">
              Your Meddy physician <b className="font-bold">knows your history, follows your progress,</b>{" "}
              and sees how your health changes over time.
            </p>
          </motion.div>
        </div>

        {/* Dashed arc (full-width, escapes padding) */}
        <motion.div
          className="-mx-5 mt-6 lg:-mx-[75px] lg:mt-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <Image
            src="/247-care/section3-arc.svg"
            alt=""
            width={1508}
            height={123}
            unoptimized
            className="w-full"
          />
        </motion.div>

        {/* Curved panoramic image + overlays */}
        <motion.div
          className="relative -mx-5 mt-2 lg:-mx-[75px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex w-[73%]">
            <div className="relative" style={{ width: "45.4%", aspectRatio: "476 / 589" }}>
              <Image
                src="/247-care/section3-curve-2-33758a.png"
                alt=""
                fill
                sizes="480px"
                className="object-cover"
              />
            </div>
            <div className="relative" style={{ width: "54.6%", aspectRatio: "572 / 589" }}>
              <Image
                src="/247-care/section3-curve-1-78c240.png"
                alt=""
                fill
                sizes="575px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Green dots */}
          <Image
            src="/247-care/section3-decor.svg"
            alt=""
            width={913}
            height={76}
            unoptimized
            className="absolute left-[27%] top-[12%] w-[63%]"
          />

          {/* Small icon bottom-right */}
          <Image
            src="/247-care/section3-icon.svg"
            alt=""
            width={38}
            height={38}
            unoptimized
            className="absolute right-[8%] top-[20%] h-[38px] w-[38px]"
          />

          {/* Bottom gradient overlay to blend the image into the section background */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[37%]"
            style={{ background: BLEND_OVERLAY }}
          />
        </motion.div>
      </div>
    </section>
  );
}
