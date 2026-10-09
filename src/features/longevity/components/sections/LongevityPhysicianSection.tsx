"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12613:14544 (1440 x 1197, #FAFFF9, 120px padding). A square background image bleeds 32px off the left,
// the centred two-line heading sits on top, and the row below (left headline | right copy) is centred in the leftover height.
// The physician photo (549 x 928, top at 266px so the head stays put; the section is 157px shorter than the frame and the fade hides the cut feet; centre at 54.17% - 19.5px) and a 323px white fade are drawn over the text,
// exactly like the layer order in the design.
const ease = [0.22, 1, 0.36, 1] as const;

const FADE = "linear-gradient(183.68deg, rgba(250,249,245,0) 25.455%, rgb(248,248,248) 74.781%)";

export default function LongevityPhysicianSection() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-[#FAF9F5] lg:min-h-[1040px] lg:bg-[#FAFFF9]">
      {/* background ("image 212"): 1:1, 32px off the left, 28.75px off the top */}
      <div className="pointer-events-none absolute hidden lg:block" style={{ left: -32, right: 0, top: -28.75, aspectRatio: "1 / 1", minHeight: "100%" }}>
        <Image src="/longevity/physician-bg-v2.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* content: same container as the header */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-1 flex-col items-center gap-12 px-5 pb-0 pt-16 lg:px-10 lg:py-[120px]">
        <motion.p
          className="w-full text-center text-[32px] font-medium leading-[1.5] text-[#A1AAA3] lg:hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          Prevention guided by a physician <span className="text-[#46524B]">who sees the whole picture.</span>
        </motion.p>
        <div className="hidden flex-col items-center text-center leading-[1.5] lg:flex">
          <motion.p
            className="whitespace-nowrap text-[24px] font-medium text-[#A1AAA3] lg:text-[40px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            Prevention guided by a physician
          </motion.p>
          <motion.p
            className="comprehensive-serif whitespace-nowrap text-[32px] italic text-[#46524B] lg:text-[40px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            who sees the whole picture.
          </motion.p>
        </div>

        <div className="flex w-full flex-col gap-4 lg:flex-1 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <motion.h2
            className="text-[24px] font-medium leading-[1.5] text-[#46524B] lg:w-[458px] lg:shrink-0 lg:text-[40px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            Your long-term <br className="hidden lg:block" />health deserves more <br className="hidden lg:block" />than an annual <br className="hidden lg:block" />checkup.
          </motion.h2>
          <motion.p
            className="text-[14px] font-normal leading-[1.5] text-[#6E7A72] lg:w-[384px] lg:text-[16px] lg:shrink-0 lg:text-right"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
          >
            Your Meddy physician can follow your <b className="font-bold lg:font-normal">biomarkers, nutrition, exercise, sleep, weight, medications, and health history</b> together—and use that information to continually refine your preventive care.
          </motion.p>
        </div>
      </div>

      {/* physician photo: 549 x 928 box, the image is drawn 112.76% wide x 100.06% tall, shifted left 12.76% (as in Figma) */}
      <div
        className="pointer-events-none absolute z-20 hidden overflow-hidden lg:block"
        style={{ left: "calc(54.17% - 19.5px)", top: 266.25, width: 548.992, height: 928.003, transform: "translateX(-50%)" }}
      >
        <Image
          src="/longevity/physician-photo-v2.png"
          alt="Meddy physician"
          width={1600}
          height={2400}
          sizes="620px"
          className="absolute max-w-none"
          style={{ height: "100.06%", left: "-12.76%", top: "-0.03%", width: "112.76%" }}
        />
      </div>

      {/* mobile photo (node 12721:18065): 324 x 548 box centred at 66.67% - 28.81px, overlapping the copy by 70px, with its own 191px fade */}
      <div className="relative -mt-[70px] h-[516px] w-full overflow-hidden lg:hidden">
        <div className="absolute top-0 h-[548.324px] w-[324.38px] overflow-hidden" style={{ left: "calc(66.67% - 28.81px)", transform: "translateX(-50%)" }}>
          <Image
            src="/longevity/physician-photo-v2.png"
            alt="Meddy physician"
            width={1600}
            height={2400}
            sizes="365px"
            className="absolute max-w-none"
            style={{ height: "100.06%", left: "-12.76%", top: "-0.03%", width: "112.76%" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[190.789px]" style={{ background: "linear-gradient(179.34deg, rgba(250,249,245,0) 17.492%, rgb(250,249,245) 79.827%)" }} />
        </div>
      </div>

      {/* fade over the photo's feet */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-[323px] lg:block" style={{ background: FADE }} />
    </section>
  );
}
