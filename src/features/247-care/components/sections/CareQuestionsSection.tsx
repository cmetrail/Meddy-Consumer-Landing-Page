"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const CARDS = [
  { src: "/247-care/call-card.png", label: "Call" },
  { src: "/247-care/message-card.png", label: "Message" },
  { src: "/247-care/video-card-3296f4.png", label: "Video" },
];

export default function CareQuestionsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9F5]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-5 py-16 lg:px-[75px] lg:py-[110px]">
        {/* Left content */}
        <div className="relative z-10 flex max-w-[558px] flex-col gap-8 lg:gap-10">
          <motion.h2
            className="leading-[120%] text-[28px] sm:text-[34px] lg:text-[40px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-medium text-[#A1AAA3]">Your questions don&rsquo;t wait </span>
            <span className="font-medium italic text-[#6E7A72]">for your next appointment</span>
            <span className="font-medium text-[#A1AAA3]">.</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <PhoneCall size={48} strokeWidth={1.6} color="#17925A" className="shrink-0" />
            <span className="font-semibold uppercase leading-[120%] text-[#6E7A72] text-[18px] lg:text-[24px]">
              Call or message Meddy 24/7.
            </span>
          </motion.div>

          <motion.p
            className="max-w-[499px] text-[#6E7A72] font-normal leading-[140%] text-[16px] lg:text-[20px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            Whether you have a question about{" "}
            <b className="font-bold">a symptom, medication, lab result, or your care plan</b>, you
            always have a way to reach us.
          </motion.p>

          {/* 3 cards */}
          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            {CARDS.map((card) => (
              <div key={card.label} className="flex w-[170px] flex-col gap-[10px]">
                <div className="relative h-[241px] w-full overflow-hidden rounded-[16px]">
                  <Image
                    src={card.src}
                    alt={card.label}
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
                <p className="italic leading-[100%] text-[#A1AAA3] text-[20px]">- {card.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            <span className="h-[25px] w-[7px] rounded-[2px] bg-[#17925A]" />
            <span className="font-semibold leading-[120%] text-[#6E7A72] text-[18px] lg:text-[20px]">
              Always a way to reach your care team.
            </span>
          </motion.div>
        </div>
      </div>

      {/* Right: layered phone-in-hand illustration (bleeds right) */}
      <motion.div
        className="absolute right-0 top-1/2 z-0 hidden -translate-y-1/2 lg:block"
        style={{ width: "min(875px, 50vw)" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="relative w-full" style={{ aspectRatio: "1103 / 828" }}>
          <Image
            src="/247-care/section2-background-56586a.png"
            alt=""
            fill
            sizes="875px"
            className="object-cover"
          />
          <div className="absolute" style={{ left: "23.6%", top: "13.58%", width: "76.4%", height: "86.4%" }}>
            <Image
              src="/247-care/section2-hand-56586a.png"
              alt=""
              fill
              sizes="680px"
              className="object-cover"
            />
          </div>
          <div className="absolute" style={{ left: "21.37%", top: "8.78%", width: "39.53%", height: "61.02%" }}>
            <Image
              src="/247-care/section2-iphone-56586a.png"
              alt=""
              fill
              sizes="350px"
              className="object-cover"
            />
          </div>
          <div className="absolute" style={{ left: "21.27%", top: "8.51%", width: "40.33%", height: "60.58%" }}>
            <Image
              src="/247-care/section2-mockup-56586a.png"
              alt=""
              fill
              sizes="350px"
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
