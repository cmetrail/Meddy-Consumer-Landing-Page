"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CareKnowsSection() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      <Image
        src="/247-care/section4-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-360 flex-col justify-center gap-10 px-5 lg:flex-row lg:items-start lg:justify-between lg:px-[71px] lg:pt-[121px]">
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-dm-serif italic leading-[1.371] text-[#548958] text-[36px] sm:text-[52px] lg:text-[64px]">
            Your physician knows
          </h2>
          <p className="font-medium leading-[1.26] text-white text-[24px] sm:text-[32px] lg:text-[40px]">
            what&rsquo;s happening between visits.
          </p>
        </motion.div>

        <motion.p
          className="max-w-[554px] text-left text-[#F4F4F4] font-normal leading-[1.26] text-[16px] lg:text-right lg:text-[20px] lg:mt-[203px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          Your <b className="font-bold">nutrition, fitness, sleep, weight, wearable data, medications, labs,</b>{" "}
          and previous care stay connected.
        </motion.p>
      </div>
    </section>
  );
}
