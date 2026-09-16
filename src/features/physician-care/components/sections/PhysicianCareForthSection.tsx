"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const GRID = "/physician-care/physician-care-grid.png";

export default function PhysicianCareForthSection() {
  return (
    <section
      className="relative min-h-dvh w-full overflow-hidden lg:h-dvh lg:min-h-[1024px]"
      style={{
        background: "linear-gradient(135deg, #5A7C52 0%, #5E7558 100%)",
      }}
    >
      <div className="relative mx-auto flex min-h-dvh w-full max-w-360 flex-col px-5 pb-12 pt-16 lg:h-dvh lg:min-h-[1024px] lg:justify-between lg:px-10 lg:pb-[57px] lg:pt-[115px]">
        {/* Top statement */}
        <motion.h2
          className="max-w-71.25 uppercase leading-[130%] text-white text-[32px] sm:text-[40px] lg:text-[48px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="font-extralight">A physician who </span>
          <em>
            <b>knows your story.</b>
          </em>
        </motion.h2>

        {/* Photo collage — masked image with transparent gutters */}
        <motion.div
          className="relative mt-12 flex justify-end lg:absolute lg:right-[60px] lg:top-[133px] lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <div
            className="relative w-75 lg:w-[686px]"
            style={{ aspectRatio: "1372 / 1617" }}
          >
            <Image
              src={GRID}
              alt=""
              fill
              sizes="(min-width: 1024px) 686px, 300px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Bottom headline */}
        <motion.div
          className="mt-12 flex flex-col lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <p className="uppercase leading-[130%] text-[#B2B2B2] text-[24px] sm:text-[30px] lg:text-[36px]">
            <span className="font-semibold text-white">every decision</span>
            <span> begins with</span>
          </p>
          <h3 className="font-dm-serif uppercase leading-[137%] text-white text-[72px] sm:text-[100px] lg:text-[128px]">
            context
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
