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
      <div className="mx-auto flex w-full max-w-360 flex-col px-5 py-12 lg:min-h-[1024px] lg:px-[75px] lg:pb-[70px] lg:pt-[81px]">
        {/* Reach us when something comes up - top center */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2"
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

        {/* Left content */}
        <div className="relative z-10 mt-10 flex max-w-[558px] flex-col gap-[80px] lg:mt-[58px]">
          {/* Heading + phone + paragraph */}
          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-[50px]">
              <motion.h2
                className="leading-[120%] text-[28px] sm:text-[34px] lg:text-[40px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease }}
              >
                <span className="font-medium text-[#A1AAA3]">Your questions don&rsquo;t wait </span>
                <span className="font-medium italic text-[#6E7A72]">for your next appointment</span>
                <span className="font-medium text-[#6E7A72]">.</span>
              </motion.h2>

              <motion.div
                className="flex items-center gap-5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
              >
                <PhoneCall size={48} strokeWidth={2} color="#17925A" className="shrink-0" />
                <span className="font-semibold uppercase leading-[120%] text-[#6E7A72] text-[18px] lg:text-[24px]">
                  Call or message Meddy 24/7.
                </span>
              </motion.div>
            </div>

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
          </div>

          {/* Cards + footer row */}
          <div className="flex flex-col gap-[20px]">
            <motion.div
              className="grid grid-cols-2 gap-5 lg:flex lg:flex-wrap"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.label}
                  className={`flex flex-col items-end gap-[3px] w-full lg:w-[170px] ${i === CARDS.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
                >
                  <div className="relative h-[241px] w-full overflow-hidden rounded-[16px]">
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      sizes="170px"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-medium italic leading-[100%] text-[#A1AAA3] text-[20px]">
                    - {card.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center gap-2"
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
      </div>

      {/* Right: layered phone-in-hand illustration (bottom, bleeds right) */}
      <motion.div
        className="absolute bottom-0 right-[-15%] z-0 hidden lg:block"
        style={{ width: "min(1103px, 76vw)" }}
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
            sizes="1103px"
            className="object-cover"
          />
          <div className="absolute" style={{ left: "23.6%", top: "13.58%", width: "76.4%", height: "86.4%" }}>
            <Image
              src="/247-care/section2-hand-56586a.png"
              alt=""
              fill
              sizes="850px"
              className="object-cover"
            />
          </div>
          <div className="absolute" style={{ left: "21.37%", top: "8.78%", width: "39.53%", height: "61.02%" }}>
            <Image
              src="/247-care/section2-iphone-56586a.png"
              alt=""
              fill
              sizes="440px"
              className="object-cover"
            />
          </div>
          <div className="absolute" style={{ left: "21.27%", top: "8.51%", width: "40.33%", height: "60.58%" }}>
            <Image
              src="/247-care/section2-mockup-56586a.png"
              alt=""
              fill
              sizes="445px"
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
