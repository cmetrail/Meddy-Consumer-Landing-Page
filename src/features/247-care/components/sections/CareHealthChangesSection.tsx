"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const GRADIENT =
  "linear-gradient(180deg, rgba(250,249,245,1) 35%, rgba(255,255,255,1) 58%, rgba(192,237,179,1) 100%)";

export default function CareHealthChangesSection() {
  return (
    <section className="w-full bg-[#FAF9F5]">
      <div
        className="mx-auto w-full max-w-360 rounded-[15px] px-5 pb-10 pt-16 lg:px-[75px] lg:pb-16 lg:pt-24"
        style={{ background: GRADIENT }}
      >
        {/* Heading + right paragraph */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="font-medium leading-[100%] text-[#6E7A72] text-[32px] sm:text-[48px] lg:text-[64px]">
              Your health changes
            </h2>
            <h3 className="font-dm-serif italic leading-[100%] text-[#46524B] text-[40px] sm:text-[52px] lg:text-[64px]">
              Your physician doesn&rsquo;t.
            </h3>
          </motion.div>

          <motion.div
            className="flex max-w-[504px] flex-col gap-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="font-medium leading-[130%] text-[#A1AAA3] text-[22px] lg:text-[32px]">
              Primary care works better when <em className="italic">your doctor actually knows you</em>.
            </p>
            <p className="text-[#6E7A72] font-normal leading-[140%] text-[16px] lg:text-[20px]">
              Your Meddy physician <b className="font-bold">knows your history, follows your progress,</b>{" "}
              and sees how your health changes over time.
            </p>
          </motion.div>
        </div>

        {/* Panoramic curved image */}
        <motion.div
          className="relative mt-10 overflow-hidden rounded-[15px] lg:mt-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex w-full">
            <div className="relative" style={{ width: "45.4%", aspectRatio: "476 / 589" }}>
              <Image
                src="/247-care/section3-curve-2-33758a.png"
                alt=""
                fill
                sizes="600px"
                className="object-cover"
              />
            </div>
            <div className="relative" style={{ width: "54.6%", aspectRatio: "572 / 589" }}>
              <Image
                src="/247-care/section3-curve-1-78c240.png"
                alt=""
                fill
                sizes="700px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Dashed arc overlay */}
          <Image
            src="/247-care/section3-arc.svg"
            alt=""
            width={1508}
            height={123}
            unoptimized
            className="absolute left-0 top-0 w-full"
          />

          {/* Green dots overlay */}
          <Image
            src="/247-care/section3-decor.svg"
            alt=""
            width={913}
            height={76}
            unoptimized
            className="absolute bottom-[30%] right-[8%] w-[55%]"
          />
        </motion.div>
      </div>
    </section>
  );
}
