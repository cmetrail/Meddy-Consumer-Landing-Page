"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

export default function PricingHeroSection() {
  return (
    <section className="relative w-full min-h-dvh pb-10 flex flex-col overflow-hidden bg-[#F1E7D5]">
      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Headline */}
      <div className="relative z-20 w-full max-w-360 mx-auto px-5 lg:px-10 lg:mt-[100px]">
        <motion.div
          className="flex flex-col gap-[15px] max-w-[1049px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[#46524B] font-normal uppercase leading-[100%] text-[40px] md:text-[52px] lg:text-[64px]">
            Choose the level of&nbsp;support
          </h1>
          <p className="text-[#6E7A72] font-bold italic uppercase leading-[100%] text-[22px] md:text-[26px] lg:text-[32px]">
            that&apos;s right for you.
          </p>
        </motion.div>
      </div>

      {/* Hero image — pinned to the bottom */}
      <div className="relative z-10 mt-auto w-full">
        <div className="relative w-full aspect-1966/800 h-auto overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
          >
            <Image
              src="/pricing/dcd5b3da3672f1d43493cb7286e5c90962e36fab.png"
              alt="Meddy pricing hero"
              fill
              priority
              sizes="100vw"
              className="object-cover object-bottom"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
