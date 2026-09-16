"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const ease = [0.22, 1, 0.36, 1] as const;

function Squiggle({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={93}
      height={67}
      className="inline-block h-[1.1em] w-auto align-middle"
    />
  );
}

export default function PricingHeroSection() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#F1E7D5]">
      {/* Header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Headline + subheading */}
      <div className="relative z-20 mx-auto w-full max-w-360 px-5 lg:px-10 lg:mt-[100px]">
        <motion.div
          className="flex flex-col gap-[50px] lg:gap-[100px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Headline */}
          <h1 className="mx-auto max-w-[1060px] text-center font-normal uppercase leading-[100%] text-[#46524B] text-[28px] sm:text-[38px] lg:text-[48px]">
            Choose{" "}
            <Squiggle src="/pricing/hero/squiggle-1.png" />{" "}
            the level of support{" "}
            <Squiggle src="/pricing/hero/squiggle-2.png" />{" "}
            that&apos;s right{" "}
            <Squiggle src="/pricing/hero/squiggle-3.png" /> for you.
          </h1>

          {/* Subheading — two columns */}
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div className="flex max-w-[316px] flex-col gap-[15px]">
              <p className="font-dm-serif italic leading-[100%] text-[#17925A] text-[30px] lg:text-[40px]">
                Start with Meddy.
              </p>
              <p className="font-medium leading-[100%] text-[#6E7A72] text-[16px] lg:text-[20px]">
                Add physician guidance when you want more clarity.
              </p>
            </div>
            <p className="max-w-[440px] text-left text-[#6E7A72] leading-[115%] text-[16px] sm:text-right sm:text-[18px] lg:text-[24px]">
              Choose{" "}
              <span className="font-bold italic">comprehensive care</span> when
              you want a dedicated healthcare partner.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hero image — pinned to the bottom */}
      <div className="relative z-10 mt-auto w-full">
        <div className="relative aspect-[1966/800] h-auto w-full overflow-hidden">
          <motion.div
            className="relative h-full w-full"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
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
