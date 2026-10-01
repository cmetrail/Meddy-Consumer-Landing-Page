"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyMeddySecondSection() {
  return (
    <section className="relative w-full bg-[#2D2D2D] py-10">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-5 px-5 lg:px-10">
        {/* Heading */}
        <div className="mx-auto w-full max-w-5xl">
          <motion.h2
            className="text-center text-[48px] font-bold leading-[100%] text-white sm:text-[50px] lg:text-[70px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            Your{" "}
            <span className="rounded-md bg-theme-accent/20 px-2">
              <span className="font-normal italic text-[#8CDDA8]">daily habits</span>
            </span>{" "}
            need clinical
          </motion.h2>
          <motion.h2
            className="mt-2 text-center text-[48px] font-bold leading-[100%] text-white sm:text-[50px] lg:text-[70px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            attention.
          </motion.h2>
        </div>

        {/* Single image strip (matches Group 48095806.svg layout) */}
        <motion.div
          className="relative mx-auto w-full max-w-[1315px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <Image
            src="/why-meddy/habits/images.png"
            alt=""
            width={1394}
            height={512}
            sizes="(min-width: 1315px) 1315px, 100vw"
            className="h-auto w-full"
          />
        </motion.div>

        {/* Body text */}
        <motion.p
          className="mx-auto  max-w-245 text-center text-[15px] leading-relaxed text-[#CCCCCC] sm:text-[17px] lg:mt-12 lg:text-[19px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          Nutrition, exercise, sleep, recovery, medications, and lab results aren&apos;t separate parts of
          your health. They&apos;re connected, and understanding those relationships leads to better care.
        </motion.p>
      </div>
    </section>
  );
}
