"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

// Figma: desktop node 12688:9039 (1440 x 1024), mobile node 12765:14816 (402 x 875), both fixed px.
// Layers (same assets on both): tiled "M" pattern (multiply, 40%), mirrored photo pinned bottom-right,
// white fade over the bottom, then the nav + headline + intro on top.
const ease = [0.22, 1, 0.36, 1] as const;

export default function HowItWorksHeroSection() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-white lg:min-h-[1024px]">
      {/* Mobile layers (<lg): 926 x 603 pattern centred at the top, 810 x 456 photo at right -146 / bottom -10.5, 127px fade */}
      <div className="lg:hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 opacity-40 mix-blend-multiply"
          style={{ width: 926, height: 603, transform: "translateX(-50%)" }}
        >
          <Image src="/how-it-works/hero/pattern.png" alt="" fill priority sizes="926px" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute" style={{ right: -146, bottom: -10.5, width: 810, height: 456, transform: "scaleX(-1)" }}>
          <Image src="/how-it-works/hero/woman.png" alt="Woman checking her health data on her phone" fill priority sizes="810px" className="object-cover" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 opacity-60"
          style={{ bottom: -0.5, height: 127, background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 78.469%)" }}
        />
      </div>

      {/* Desktop layers (lg+): pattern 91px wider than the page each side, photo 1563 x 880 at right -123 / bottom -74, 449px fade */}
      <div className="hidden lg:block">
        <div
          className="pointer-events-none absolute opacity-40 mix-blend-multiply"
          style={{ left: -91.39, right: -91.39, top: "calc(50% + 3.5px)", transform: "translateY(-50%)", aspectRatio: "740 / 482", minHeight: "100%" }}
        >
          <Image src="/how-it-works/hero/pattern.png" alt="" fill priority sizes="1630px" className="object-cover" />
        </div>
        <div className="pointer-events-none absolute" style={{ right: -123, bottom: -74, width: 1563, height: 880, transform: "scaleX(-1)" }}>
          <Image src="/how-it-works/hero/woman.png" alt="Woman checking her health data on her phone" fill priority sizes="1563px" className="object-cover" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 opacity-60"
          style={{ height: 449, background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 78.469%)" }}
        />
      </div>

      {/* Header */}
      <div className="relative z-30">
        <Header active="How it works" />
      </div>

      {/* Content: same container as the header; mobile sits right under the nav, desktop centres in the space below it */}
      <div className="relative z-20 mx-auto flex w-full max-w-360 flex-1 flex-col px-5 pb-16 pt-[26px] lg:justify-center lg:px-10 lg:pb-[120px] lg:pt-0">
        <motion.h1
          className="flex flex-col items-start text-left text-[40px] font-medium leading-[1.5] text-[#46524B] lg:text-[104px] lg:font-normal"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="block">
            Understand <br className="lg:hidden" />
            <span className="comprehensive-serif italic text-[#17925A]">your health.</span>
          </span>
          <span className="block">not just your</span>
          <span className="comprehensive-serif block italic text-[#17925A]">Data.</span>
        </motion.h1>

        <motion.p
          className="mt-4 w-full text-[16px] font-normal leading-[1.5] text-[#111110] lg:ml-auto lg:mt-0 lg:max-w-[472px] lg:text-left lg:text-[20px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        >
          One place to understand your everyday health and wellness. Track the habits and activities that influence how you feel and perform throughout the day.
        </motion.p>
      </div>
    </section>
  );
}
