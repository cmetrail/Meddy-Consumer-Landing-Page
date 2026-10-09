"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12613:14556 (1440 x ~791, #FAFFF9) + mobile node 12721:18074 (402 wide, #FAF9F5).
// Desktop: left column (label + title on top, copy + button at the bottom) | right column (vertical rule + photo + caption).
// Mobile: label + title, rule + photo + caption, then the copy with a green tab and the button. The left column uses
// `contents` on mobile so its two blocks reorder around the photo.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/longevity";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease, delay },
});

/** the rotated 143px rule with its diamond end; `m` = mobile (thinner) variant */
function Rule({ m }: { m?: boolean }) {
  return (
    <div className="flex h-[143px] w-0 shrink-0 items-center justify-center">
      <div className="flex-none rotate-90">
        <div className="relative h-0 w-[143px]">
          <div className="absolute" style={{ inset: m ? "-5.77px -4.04% -5.77px 0" : "-14.43px -10.09% -14.43px 0" }}>
            <Image src={`${A}/${m ? "prev-line-m" : "prev-line"}.svg`} alt="" fill unoptimized className="block max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LongevityPhysicianPreventionSection() {
  return (
    <section className="w-full bg-[#FAF9F5] lg:bg-[#FAFFF9]">
      {/* same container as the header */}
      <div className="mx-auto flex w-full max-w-360 flex-col gap-8 px-5 py-16 lg:flex-row lg:items-start lg:gap-12 lg:px-10 lg:py-[120px]">
        <div className="contents lg:flex lg:min-w-px lg:flex-1 lg:flex-col lg:items-start lg:justify-between lg:self-stretch">
          {/* label + title */}
          <motion.div className="order-1 flex w-full flex-col items-start gap-4 lg:order-none lg:w-[428px] lg:gap-5" {...reveal()}>
            <div className="flex items-center gap-2 lg:gap-2.5">
              <span className="block size-5 shrink-0 bg-[#17925A] lg:size-[22px]" />
              <p className="whitespace-nowrap text-[14px] font-normal leading-[1.5] text-[#6E7A72]">Longitudinal doctor care</p>
            </div>
            <h2 className="comprehensive-serif w-full text-[32px] font-normal italic leading-[1.5] text-[#46524B] lg:text-[64px]">Physician prevention</h2>
          </motion.div>

          {/* copy + button */}
          <motion.div className="order-3 flex w-full flex-col items-start gap-8 lg:order-none lg:gap-6" {...reveal(0.1)}>
            <div className="flex w-full items-start gap-[13px] lg:gap-0">
              <div className="relative w-2 shrink-0 self-stretch lg:hidden">
                <Image src={`${A}/prev-bar-m.svg`} alt="" fill unoptimized className="block max-w-none" />
              </div>
              <div className="min-w-px flex-1 whitespace-pre-wrap text-[20px] font-medium leading-[1.5] lg:text-[32px]">
                <p className="text-[#6E7A72]">{"Prevention isn't one visit. "}</p>
                <p className="comprehensive-serif font-normal italic text-[#17925A]">{"It's an ongoing process."}</p>
              </div>
            </div>
            <button type="button" className="rounded-[35px] bg-[#17925A] px-6 py-4 text-[20px] font-normal leading-[normal] text-white transition-opacity hover:opacity-85">
              Start Preventive Care
            </button>
          </motion.div>
        </div>

        {/* rule + photo + caption */}
        <div className="order-2 flex w-full items-start justify-center gap-[26px] lg:order-none lg:min-w-px lg:flex-1 lg:justify-start lg:gap-12">
          <div className="lg:hidden">
            <Rule m />
          </div>
          <div className="hidden lg:block">
            <Rule />
          </div>
          <motion.div className="flex min-w-px flex-1 flex-col items-start gap-2 lg:gap-4" {...reveal(0.15)}>
            <div className="relative h-[341px] w-full shrink-0 overflow-hidden rounded-[10px] lg:h-[487px]">
              <Image src={`${A}/prev-photo-m.jpg`} alt="A physician talking with a patient" fill sizes="402px" className="pointer-events-none object-cover lg:hidden" />
              <Image src={`${A}/prev-photo.jpg`} alt="A physician talking with a patient" fill sizes="(min-width: 1024px) 640px, 402px" className="pointer-events-none hidden object-cover lg:block" />
            </div>
            <p className="comprehensive-serif w-full text-[20px] font-normal italic leading-[1.5] text-[#6E7A72] lg:text-[32px]">Understand your risks</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
