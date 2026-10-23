"use client";

import Image from "next/image";
import Header from "@/components/Header";
import buttonStyles from "./CareButton.module.css";
import motionStyles from "./CareHeroMotion.module.css";
import { useCareHeroMotion } from "./useCareHeroMotion";

const HERO_GRADIENT =
  "linear-gradient(227deg, rgba(80,142,91,1) 0%, rgba(122,167,135,1) 64%, rgba(89,130,106,1) 86%, rgba(150,170,139,1) 100%)";

function ChatReply({ text }: { text: string }) {
  return (
    <div data-care-message className="flex items-start">
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        className="shrink-0"
        aria-hidden="true"
      >
        <path
          d="M0.254639 1.27546C-0.256412 0.837417 0.0533687 0 0.726463 0L5.7666 0L5.7666 6L0.254639 1.27546Z"
          fill="#FFFFFF"
        />
      </svg>
      <div className="flex w-[219px] flex-col gap-[3px] rounded-[9px] rounded-tl-[0px] bg-white px-[9px] py-[6px]">
        <span className="text-[10.5px] leading-[1.5] text-[#111110]">
          {text}
        </span>
        <span className="text-right text-[9px] font-semibold leading-[1.5] text-[#7B7B7B]">
          5:45 PM
        </span>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div
      data-care-float
      className="relative h-[279px] w-[555px] overflow-hidden rounded-[44px]"
      style={{ background: "rgba(255,254,237,0.42)" }}
    >
      {/* Samsung phone */}
      <div data-care-phone className="absolute left-[39px] top-[30px] h-[249px] w-[203px] overflow-hidden rounded-[20px]">
        <Image
          src="/247-care/hero-phone-d58c1b.png"
          alt="Meddy app"
          fill
          loading="eager"
          sizes="203px"
          className="object-cover"
        />
      </div>

      {/* User message (green, right) */}
      <div data-care-message className="absolute left-[303px] top-[47px] flex items-start">
        <div className="flex w-[219px] flex-col gap-[3px] rounded-[9px] rounded-tr-[0px] bg-[#4B875F] px-[9px] py-[6px]">
          <span className="text-[10.5px] leading-[1.5] text-white">
            Okay. Are there any side effects I should watch for?
          </span>
          <span className="text-right text-[9px] font-semibold leading-[1.5] text-white">
            5:43 PM
          </span>
        </div>
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            d="M5.51196 1.27546C6.02301 0.837417 5.71323 0 5.04014 0L0 0L0 6L5.51196 1.27546Z"
            fill="#4B875F"
          />
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
  const sectionRef = useCareHeroMotion();

  return (
    <section
      ref={sectionRef}
      className={`${motionStyles.hero} relative flex min-h-dvh w-full flex-col overflow-hidden`}
      style={{ background: HERO_GRADIENT }}
    >
      <div aria-hidden="true" className={motionStyles.atmosphere}>
        <div data-care-glow className={motionStyles.glow} />
      </div>
      {/* Header */}
      <div className={`${motionStyles.header} relative z-30`}>
        <Header variant="dark" hideMobileConsultation />
      </div>

      {/* Doctor image — right */}
      <div
        data-care-depth
        className={motionStyles.portraitPlacement}
      >
        <div data-care-pointer>
          <div
            data-care-portrait
            className={motionStyles.portrait}
          >
            <Image
              src="/247-care/hero-doctor-77e094.png"
              alt="Meddy physician"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1440px) 762px, (min-width: 1024px) 53vw, 101vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className={`${motionStyles.content} relative z-20 mx-auto flex w-full max-w-360 flex-none flex-col px-5 pb-10 lg:flex-1 lg:px-10`}>
        <div
          data-care-copy
          className="mt-8 flex max-w-[721px] flex-col lg:mt-10"
        >
          <h1 className="flex flex-col">
            <span className={motionStyles.lineMask}>
              <span data-care-line className="block whitespace-nowrap font-dm-serif italic leading-[1] text-[#D8FFE5] text-[44px] sm:text-[72px] lg:text-[128px]">
                Primary care
              </span>
            </span>
            <span className={motionStyles.lineMask}>
              <span data-care-line className="block whitespace-nowrap font-medium leading-[1] text-white text-[18px] sm:text-[28px] lg:text-[48px]">
                that doesn&rsquo;t clock out.
              </span>
            </span>
          </h1>

          <p data-care-description className="mt-10 max-w-[687px] text-[#DFDFDF] font-normal leading-[1.4] text-[16px] sm:text-[18px] lg:text-[20px]">
            See the same{" "}
            <b className="font-bold text-white">physician over time</b>, reach{" "}
            <b className="font-bold text-white">Meddy 24/7,</b> and get help
            navigating what comes up between appointments.
          </p>

          <button data-care-cta className={`${buttonStyles.button} ${buttonStyles.hero} ${motionStyles.button}`}>
            <span data-care-shine aria-hidden="true" className={motionStyles.shine} />
            <span className={motionStyles.buttonLabel}>Start Physician Care</span>
          </button>
        </div>

        {/* Chat mockup — below CTA (desktop) */}
        <div
          data-care-chat
          className="mt-8 hidden lg:mt-10 lg:block"
        >
          <ChatMockup />
        </div>

        <p
          data-care-disclaimer
          className={`${motionStyles.disclaimer} mt-[24px] max-w-[549px] text-[14px] italic leading-[1.5] text-[#DFDFDF]`}
        >
          Your physician replies to clinical messages during business hours.
          After hour messages are replied to within 1 business day. For
          emergencies,{" "}
          <a
            href="tel:911"
            className="font-bold underline transition-colors duration-200 hover:text-white"
          >
            call 911.
          </a>
        </p>
      </div>
      <div className={motionStyles.mobileChat}>
        <ChatMockup />
      </div>
    </section>
  );
}
