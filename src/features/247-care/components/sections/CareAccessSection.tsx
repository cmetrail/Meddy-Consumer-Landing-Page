"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

const ease = [0.22, 1, 0.36, 1] as const;

const LIST_ITEMS = [
  "24/7 response",
  "Same physician",
  "Phone & video appointments",
  "Secure messaging",
  "Ongoing care",
];

const HEADLINE_IMAGES = [
  { src: "/247-care/section5-img-1-104627.png", alt: "Access" },
  { src: "/247-care/section5-img-2-5751bf.png", alt: "You" },
  { src: "/247-care/section5-img-3-778c76.png", alt: "Continuity" },
];

function HeadlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative inline-block h-[48px] w-[66px] shrink-0 overflow-hidden rounded-[6px] sm:h-[64px] sm:w-[88px] lg:h-[81px] lg:w-[112px]">
      <Image src={src} alt={alt} fill sizes="112px" className="object-cover" />
    </span>
  );
}

function HeadlineWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium uppercase leading-[100%] text-[#46524B] text-[32px] sm:text-[48px] lg:text-[64px]">
      {children}
    </span>
  );
}

export default function CareAccessSection() {
  return (
    <section className="w-full bg-[#FAF9F5]">
      <div className="mx-auto w-full max-w-360 px-5 pt-16 lg:px-[75px] lg:pt-24">
        {/* Top-right -Meddy */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="font-dm-serif italic leading-[100%] text-[#46524B] text-[24px] lg:text-[32px]">
            -Meddy
          </span>
        </motion.div>

        {/* Headline + numbered list */}
        <div className="mt-10 flex flex-col gap-14 lg:mt-14 lg:flex-row lg:justify-between">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center gap-4 lg:gap-6">
              <HeadlineWord>Access</HeadlineWord>
              <HeadlineImage {...HEADLINE_IMAGES[0]} />
              <HeadlineWord>when</HeadlineWord>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
              <HeadlineWord>You</HeadlineWord>
              <HeadlineImage {...HEADLINE_IMAGES[1]} />
              <HeadlineWord>Need it.</HeadlineWord>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
              <HeadlineWord>Continuity</HeadlineWord>
              <HeadlineImage {...HEADLINE_IMAGES[2]} />
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
              <HeadlineWord>when</HeadlineWord>
              <HeadlineWord>You</HeadlineWord>
              <HeadlineWord>Don&rsquo;t.</HeadlineWord>
            </div>
          </motion.div>

          {/* Numbered list */}
          <motion.div
            className="flex w-full flex-col lg:w-[535px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {LIST_ITEMS.map((label, i) => (
              <div key={label}>
                <div className="flex items-center justify-between py-4 lg:py-5">
                  <span className="w-[27px] text-center text-[#A1AAA3] text-[18px] lg:text-[24px] leading-[100%]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-dm-serif italic text-right text-[#6E7A72] text-[24px] lg:text-[32px] leading-[100%]">
                    {label}
                  </span>
                </div>
                <div className="h-px w-full bg-[#D4D4D4]" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom row: italic + paragraph (left), CTA (right) */}
        <div className="mt-16 flex flex-col gap-10 pb-16 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
          <motion.div
            className="flex max-w-[670px] flex-col gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="italic leading-[120%] text-[#6E7A72] text-[24px] lg:text-[32px]">
              Appointments are only one part of your care.
            </p>
            <p className="max-w-[302px] text-[#6E7A72] font-normal leading-[150%] text-[16px]">
              <b className="font-bold">Meddy combines 24/7 access with a physician</b> who follows
              your health over time—so you have somewhere to turn when something changes and someone
              who already knows your story.
            </p>
          </motion.div>

          <motion.button
            className="flex w-full max-w-[535px] items-center justify-center rounded-[10px] bg-[#17925A] px-[30px] py-[15px] font-medium uppercase leading-[30px] text-white text-[18px] lg:text-[20px] shadow-[1px_4px_5.4px_rgba(149,154,149,0.25)] transition-opacity hover:opacity-90"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Start Physician Care →
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative w-full overflow-hidden text-white">
        <Image
          src="/247-care/footer-bg-c974ec.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <FooterItems />
      </div>
    </section>
  );
}
