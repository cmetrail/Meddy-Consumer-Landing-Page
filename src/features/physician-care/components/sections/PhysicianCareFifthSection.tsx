"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareFifthSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto relative min-h-dvh w-full max-w-360 px-5 py-10 lg:px-10 lg:py-20">
        {/* Top-left heading (on white background) */}
        {/* <div className="h-40"></div> */}
        <motion.div
          className="flex flex-col absolute top-[4%]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="uppercase leading-tight text-[#46524B] text-[24px] sm:text-[30px] lg:text-[36px]">
            Care that
          </p>
          <h2 className="font-dm-serif uppercase leading-[1.05] text-[#46524B] text-[48px] sm:text-[64px] lg:text-[78px]">
            Grows
            <br />
            with you
          </h2>
        </motion.div>

        {/* Full image below heading */}
        <motion.div
          className="relative mx-auto mt-8 w-full max-w-329.25 overflow-hidden rounded-[25px] lg:mt-14"
          style={{ aspectRatio: "1317 / 917" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <Image
            src="/physician-care/Subtract.png"
            alt=""
            fill
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-cover object-center"
          />

          {/* Bottom-right tagline overlaid on image */}
          <motion.div
            className="absolute right-[0%] bottom-[0%] z-10 flex flex-col items-end text-right"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            <p className="uppercase leading-tight text-[#46524B] text-[18px] sm:text-[21px] lg:text-[24px]">
              Your health changes.
            </p>
            <p className="uppercase leading-tight  font-medium text-[#46524B] italic text-[20px] sm:text-[28px] lg:text-[36px]">
              So should your care.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
