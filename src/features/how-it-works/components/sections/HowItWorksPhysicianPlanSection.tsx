"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12688:9490 (1440 x 1027). White section: text column (599px) vertically centred on the left,
// portrait photo (748 wide) flush right and filling the section height. The section is at least one screen tall and
// grows with its content; the photo covers whatever height results. Mobile: node 12765:15287 — photo on top fading to white,
// one 32px paragraph (green serif phrases), intro + button below.
const ease = [0.22, 1, 0.36, 1] as const;

const IMG = "/how-it-works/physician-plan/doctor-plan.png";
const ALT = "Physician reviewing a patient's health plan";

export default function HowItWorksPhysicianPlanSection() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-white">
      {/* Desktop photo: right edge, full section height (cover, anchored to the top so the head is never cut) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] max-w-[748px] lg:block">
        <Image src={IMG} alt={ALT} fill priority sizes="748px" className="object-cover" style={{ objectPosition: "50% 0%" }} />
      </div>

      {/* Mobile photo: full width, takes the spare height (never shorter than 420px so the head stays in), fades to white */}
      <div className="relative min-h-[420px] w-full flex-1 overflow-hidden lg:hidden">
        <Image src={IMG} alt={ALT} fill priority sizes="402px" className="object-cover object-top" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[327px] max-h-full"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 29.59%, #FFFFFF 98.858%)" }}
        />
      </div>

      {/* same container as the header */}
      <div className="relative mx-auto flex w-full max-w-360 flex-col px-5 pb-16 pt-8 lg:px-10 lg:py-[120px]">
        <div className="flex w-full flex-col items-start gap-8 lg:w-[599px] lg:gap-4">
          <div className="flex w-full flex-col items-start" style={{ gap: 24 }}>
            {/* mobile: one paragraph, green serif phrases */}
            <motion.p
              className="w-full text-[32px] font-medium leading-[1.5] text-[#111110] lg:hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              Your <span className="comprehensive-serif italic text-[#17925A]">physician</span> builds the plan.{" "}
              <span className="comprehensive-serif italic text-[#17925A]">Your data. Your labs. Your goals.</span>
            </motion.p>
            <div className="hidden w-full flex-col items-start lg:flex" style={{ gap: 8 }}>
              <motion.h2
                className="w-full whitespace-pre-wrap text-[0px] font-normal leading-[0] text-[#111110]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="block">
                  <span className="text-[32px] font-medium leading-[1.5] lg:text-[56px]">Your</span>
                  <span className="text-[32px] leading-[1.5] lg:text-[55px]"> </span>
                  <span className="comprehensive-serif text-[36px] italic leading-[1.5] text-[#17925A] lg:text-[64px]">physician</span>
                  <span className="text-[32px] leading-[1.5] text-[#17925A] lg:text-[55px]"> </span>
                </span>
                <span className="block text-[32px] font-medium leading-[1.5] lg:text-[56px]">builds the plan</span>
              </motion.h2>

              <motion.p
                className="comprehensive-serif w-full text-[32px] italic leading-[1.5] text-[#17925A] lg:text-[56px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: 0.1 }}
              >
                Your data. Your labs. Your goals.
              </motion.p>
            </div>

            <motion.p
              className="w-full text-[16px] font-normal leading-[1.5] text-[#111110] lg:text-[20px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            >
              Reviewed by a physician who knows you. One <br className="hidden lg:block" />plan that adapts as you do.
            </motion.p>
          </div>

          <motion.button
            type="button"
            className="flex items-center justify-center rounded-[35px] bg-[#17925A] px-5 py-3 text-[16px] lg:px-6 lg:py-4 lg:text-[20px] font-normal leading-[normal] text-white transition-opacity hover:opacity-85"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            Book Free Consultation
          </motion.button>
        </div>

      </div>
    </section>
  );
}
