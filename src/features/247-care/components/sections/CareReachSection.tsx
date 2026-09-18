"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CareReachSection() {
  return (
    <section className="w-full bg-[#FAF9F5]">
      <div className="mx-auto w-full max-w-360 px-5 py-16 lg:px-[75px] lg:py-24">
        <motion.div
          className="flex flex-wrap items-baseline gap-x-8 gap-y-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="font-dm-serif italic leading-[100%] text-[#46524B] text-[40px] sm:text-[52px] lg:text-[64px]">
            Reach us
          </span>
          <span className="font-medium leading-[110%] text-[#6E7A72] text-[28px] sm:text-[38px] lg:text-[48px]">
            when something comes up.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
