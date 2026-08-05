"use client";

import Image from "next/image";
import HeroHeader from "@/components/helper/HeroHeader";

export default function HeroSection() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[radial-gradient(49.4%_83.3%_at_53.93%_56.81%,#2FC380_0%,#1D6B40_100%)]">
      <HeroHeader />

      {/* Big background wordmark */}
      {/* <div className="absolute top-22 left-0 w-full pointer-events-none select-none"> */}
      <div className="max-w-360 px-13 pt-25 w-full mx-auto">
        <span
          className="uppercase -ml-4 font-bold text-[180px] leading-0  tracking-normal text-[#1E1E22] whitespace-nowrap"
          style={{ mixBlendMode: "difference" }}
        >
          PRIMARYCARE
        </span>
        <div className=" flex flex-col gap-7.5 pt-8" >
          {/* Tagline + body */}
          <div className="flex flex-col gap-2.5">
            <p className="text-white uppercase font-normal text-3xl leading-10">
              That actually knows your habit
            </p>
            <p className="text-white font-normal text-xl leading-6.25 max-w-119.25">
              A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.
            </p>
          </div>

          {/* CTA */}
          <button className="flex items-center gap-0 w-59 h-16 bg-[#18181B] rounded-[40px] pl-3.75 pr-1">
            <span className="flex-1 text-[#F4F4F5] font-medium text-[24px] leading-7.5 text-left">
              Get Started
            </span>
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F4F4F5] shrink-0">
              <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#17925A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <Image src="/stats.png" alt="Enrollment stats" width={380} height={257} className="w-95 object-contain pt-3" />
        </div>
      </div>
      {/* </div> */}



 

      {/* Right side — icons + nutrition image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative max-w-360 mx-auto px-13 h-full">

          {/* Icon row */}
          <div className="absolute flex items-center gap-2.5" style={{ top: "58dvh", right: 52 }}>
            {/* Stethoscope — white bg */}
            <div className="flex items-center justify-center w-10 h-10 bg-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4.8 3H7.2C7.64 3 8 3.36 8 3.8V8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8V3.8C16 3.36 16.36 3 16.8 3H19.2" stroke="#585454" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 12V15M12 15C10.34 15 9 16.34 9 18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18" stroke="#585454" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="17" cy="18" r="2" stroke="#585454" strokeWidth="1.5"/>
              </svg>
            </div>
            {/* Utensils */}
            <div className="flex items-center justify-center w-10 h-10 border border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 2V8C3 10.21 4.79 12 7 12V22M7 2V8M11 2V8C11 10.21 12.79 12 15 12V22M21 2C21 2 21 8 18 10C15 12 15 22 15 22" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Dumbbell */}
            <div className="flex items-center justify-center w-10 h-10 border border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 4H8V20H6V4ZM16 4H18V20H16V4ZM4 9H6M18 9H20M4 15H6M18 15H20M8 11H16M2 8H4V16H2V8ZM20 8H22V16H20V8Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Moon-star */}
            <div className="flex items-center justify-center w-10 h-10 border border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.54 20.96 11.08 20.9 10.64C19.92 11.5 18.63 12 17.2 12C14.33 12 12 9.67 12 6.8C12 5.37 12.5 4.08 13.36 3.1C12.92 3.04 12.46 3 12 3Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 2L20 4L22 5L20 6L19 8L18 6L16 5L18 4L19 2Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Nutrition image */}
          <div className="absolute" style={{ top: "72dvh", right: 52 }}>
            <Image src="/nutrition.png" alt="Nutrition" width={240} height={218} className="w-[240px] h-auto" />
          </div>

        </div>
      </div>

      {/* Doctor image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative max-w-360 mx-auto px-13 h-full">
          <Image
            src="/doctor.png"
            alt="Doctor"
            width={715}
            height={954}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[90dvh] w-auto object-cover object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
