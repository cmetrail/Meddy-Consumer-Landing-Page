"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_GRADIENT =
  "linear-gradient(227deg, rgba(80,142,91,1) 0%, rgba(122,167,135,1) 64%, rgba(89,130,106,1) 86%, rgba(150,170,139,1) 100%)";

function ChatReply({ text }: { text: string }) {
  return (
    <div className="flex items-start">
      <svg width="6" height="6" viewBox="0 0 6 6" className="shrink-0" aria-hidden="true">
        <path d="M0.254639 1.27546C-0.256412 0.837417 0.0533687 0 0.726463 0L5.7666 0L5.7666 6L0.254639 1.27546Z" fill="#FFFFFF" />
      </svg>
      <div className="flex w-[219px] flex-col gap-[3px] rounded-[9px] rounded-tl-[0px] bg-white px-[9px] py-[6px]">
        <span className="text-[10.5px] leading-[1.5] text-[#111110]">{text}</span>
        <span className="text-right text-[9px] font-semibold leading-[1.5] text-[#7B7B7B]">5:45 PM</span>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div
      className="relative h-[279px] w-[555px] overflow-hidden rounded-[44px]"
      style={{ background: "rgba(255,254,237,0.42)" }}
    >
      {/* Samsung phone */}
      <div className="absolute left-[39px] top-[30px] h-[249px] w-[203px] overflow-hidden rounded-[20px]">
        <Image
          src="/247-care/hero-phone-d58c1b.png"
          alt="Meddy app"
          fill
          sizes="203px"
          className="object-cover"
        />
      </div>

      {/* User message (green, right) */}
      <div className="absolute left-[303px] top-[47px] flex items-start">
        <div className="flex w-[219px] flex-col gap-[3px] rounded-[9px] rounded-tr-[0px] bg-[#4B875F] px-[9px] py-[6px]">
          <span className="text-[10.5px] leading-[1.5] text-white">
            Okay. Are there any side effects I should watch for?
          </span>
          <span className="text-right text-[9px] font-semibold leading-[1.5] text-white">5:43 PM</span>
        </div>
        <svg width="6" height="6" viewBox="0 0 6 6" className="shrink-0" aria-hidden="true">
          <path d="M5.51196 1.27546C6.02301 0.837417 5.71323 0 5.04014 0L0 0L0 6L5.51196 1.27546Z" fill="#4B875F" />
        </svg>
      </div>

      {/* Replies (white, left) */}
      <div className="absolute left-[268px] top-[129px] flex flex-col gap-[6px]">
        <ChatReply text="Okay, let me review this..." />
        <ChatReply text="Understood. I recommend you check your blood pressure and let me know the readings." />
      </div>
    </div>
  );
}

export default function CareHeroSection() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden" style={{ background: HERO_GRADIENT }}>
      {/* Header */}
      <div className="relative z-30">
        <Header active="pHYSICIAN CARE" variant="dark" />
      </div>

      {/* Doctor image — right */}
      <motion.div
        className="absolute right-0 top-[61px] z-0 hidden lg:block"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.1 }}
      >
        <div
          className="relative"
          style={{ width: "min(762px, 53vw)", aspectRatio: "762 / 1027" }}
        >
          <Image
            src="/247-care/hero-doctor-77e094.png"
            alt="Meddy physician"
            fill
            priority
            sizes="762px"
            className="object-cover object-bottom"
          />
        </div>
      </motion.div>

      {/* Text content */}
      <div className="relative z-20 mx-auto flex w-full max-w-360 flex-1 flex-col px-5 pb-10 lg:px-[75px]">
        <motion.div
          className="mt-8 flex max-w-[721px] flex-col lg:mt-[95px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1 className="flex flex-col">
            <span className="whitespace-nowrap font-dm-serif italic leading-[1] text-[#D8FFE5] text-[64px] sm:text-[96px] lg:text-[128px]">
              Primary care
            </span>
            <span className="whitespace-nowrap font-medium uppercase leading-[1] text-white text-[24px] sm:text-[36px] lg:text-[48px]">
              that doesn&rsquo;t clock out.
            </span>
          </h1>

          <p className="mt-10 max-w-[687px] text-[#DFDFDF] font-normal leading-[1.4] text-[16px] sm:text-[18px] lg:text-[20px]">
            See the same <b className="font-bold text-white">physician over time</b>, reach{" "}
            <b className="font-bold text-white">Meddy 24/7,</b> and get help navigating what comes
            up between appointments.
          </p>

          <button className="mt-12 inline-flex w-fit items-center justify-center rounded-[10px] bg-[#17925A] px-[30px] py-[15px] font-normal leading-[1.42em] text-[#F4F4F4] text-[18px] lg:text-[20px] shadow-[1px_4px_5.4px_rgba(149,154,149,0.25)] transition-opacity hover:opacity-90 lg:mt-[118px]">
            Start Physician Care→
          </button>
        </motion.div>

        {/* Chat mockup — below CTA (desktop) */}
        <motion.div
          className="mt-10 hidden lg:mt-[66px] lg:block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}
