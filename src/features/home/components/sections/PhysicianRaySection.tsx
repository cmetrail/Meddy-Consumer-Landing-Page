"use client";

import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Clock, GlobeLock, ClockCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_BADGES = [
  { Icon: ShieldCheck, text: "Board-certified physician" },
  { Icon: Clock, text: "First consultation free" },
  { Icon: GlobeLock, boldPart: "HIPAA", text: " compliant" },
  {
    Icon: ClockCheck,
    text: "Available in 46 states except",
    sub: ["Arkansas", "Massachussetts", "New Mexico", "South Carolina"],
  },
];

export default function PhysicianRaySection() {
  const sectionRef = useRef<HTMLElement>(null);



  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const photo = root.querySelector("[data-reveal]");
      if (photo) {
        gsap.fromTo(photo, { opacity: 0 }, {
          opacity: 1, ease: "none",
          scrollTrigger: { trigger: photo, start: "top 95%", end: "top 60%", scrub: true },
        });
      }

      const copy = root.querySelector("[data-ray-copy]");
      if (copy) {
        const lines = copy.querySelectorAll<HTMLElement>("[data-line]");
        const ctl = gsap.timeline({
          scrollTrigger: { trigger: copy, start: "top 85%", end: "top 40%", scrub: true },
        });
        lines.forEach((el, i) => {
          ctl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, i * 0.15);
        });
      }
      const buttons = root.querySelector("[data-ray-buttons]");
      if (buttons) {
        gsap.fromTo(buttons, { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, ease: "none",
          scrollTrigger: { trigger: buttons, start: "top 92%", end: "top 55%", scrub: true },
        });
      }
      const social = root.querySelector("[data-ray-social]");
      if (social) {
        gsap.fromTo(social, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: social, start: "top 92%", end: "top 55%", scrub: true },
        });
      }
      const badges = root.querySelector("[data-ray-badges]");
      if (badges) {
        gsap.fromTo(badges, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: badges, start: "top 92%", end: "top 55%", scrub: true },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="physician-care"
      className="relative w-full bg-[#1D3A1D] text-white overflow-hidden"
    >
      {/* ambient glow (Figma Group 48095837 — blurred color vectors on the left) */}
      <div className="pointer-events-none absolute -left-[30%] -top-[20%] h-[160%] w-[110%] rotate-[-20deg] rounded-full bg-[#104526] blur-[200px]" />
      <div className="pointer-events-none absolute -left-[20%] -top-[10%] h-[120%] w-[90%] rotate-[-30deg] rounded-full bg-[#184C34] blur-[200px]" />
      <div className="pointer-events-none absolute -left-[15%] top-[10%] h-[80%] w-[60%] rotate-[-25deg] rounded-full bg-[#47652D] blur-[200px]" />
      <div className="pointer-events-none absolute -left-[10%] top-[25%] h-[55%] w-[40%] rotate-[-20deg] rounded-full bg-[#5D985A] blur-[180px]" />
      <div className="pointer-events-none absolute -left-[8%] top-[30%] h-[35%] w-[28%] rotate-[-15deg] rounded-full bg-[#EAFFC2] blur-[140px]" />

      {/* Photo — flush to the left viewport edge (breaks out of the centered container) */}
      <div
        data-reveal
        className="absolute left-0 top-0 h-full w-[47.5%] max-w-[684px] max-xl:hidden"
      >
        <Image
          src="/home/physician-ray.png"
          alt="Dr. Ray, board-certified physician"
          width={684}
          height={1024}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex w-full flex-col lg:min-h-(--dvh) max-w-360 mx-auto px-5 lg:px-10 py-16">
        <div className="relative w-full flex-1 flex flex-col gap-10 lg:justify-between items-start lg:items-end">
          {/* Copy (right-aligned) */}
          <div
            data-ray-copy
            className="text-left lg:text-right"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-7">
                <p
                  data-line
                  className="uppercase leading-[100%] text-[20px] tracking-[0.02em] text-[#F4F4F5]"

                >
                  Limited availability
                </p>
                <div className="flex flex-col gap-0.5">
                  <p
                    data-line
                    className=" font-semibold uppercase lleading-[100%] text-[26px] sm:text-[32px] lg:text-[36px] text-white"

                  >
                    500 spots.
                  </p>
                  <p
                    data-line
                    className="font-extrabold uppercase leading-[100%] text-[34px] sm:text-[44px] lg:text-[64px] text-white"

                  >
                    One physician.
                  </p>
                </div>
                <p
                  data-line
                  className="font-semibold uppercase leading-[100%] text-[18px] sm:text-[22px] lg:text-[24px] tracking-[0.02em] text-white"
                >
                  Your data finally means something.
                </p>
              </div>
            </div>
            {/* Buttons */}

          </div>
          <div data-ray-buttons className=" flex w-full  lg:w-auto flex-col lg:flex-row justify-start lg:justify-end gap-4 sm:gap-8.25 ">
            <button
              className="flex h-12.5 w-full lg:w-50 text-base items-center justify-center rounded-none bg-[#18181B] uppercase text-white whitespace-nowrap px-6 transition-colors duration-300 hover:bg-[#2B2B2F]"

            >
              Get started
            </button>
            <button
              className="flex h-12.5 w-full lg:w-50 text-base items-center justify-center rounded-none border border-white uppercase text-white whitespace-nowrap px-6 transition-colors duration-300 hover:bg-white hover:text-[#18181B]"

            >
              See how it works
            </button>
          </div>
          {/* Social proof card (one-physician.svg) */}
          <div
            data-ray-social
            className="max-w-85"
          >
            <Image
              src="/home/one-physician.svg"
              alt="Now accepting our first 500 patients"
              width={337}
              height={268}
              className="h-auto w-full"
            />
          </div>

          {/* Trust badges */}
          <div
            data-ray-badges
            className="flex  items-start gap-6.25 max-xl:static max-xl:mx-auto max-xl:mt-12 max-xl:w-full max-xl:flex-wrap max-xl:justify-center max-xl:gap-x-[25px] max-xl:gap-y-5"
          >
            {TRUST_BADGES.map(({ Icon, text, boldPart, sub }) => (
              <div key={text} className={`flex shrink-0 gap-2.5 ${sub ? "items-start" : "items-center"}`}>
                <Icon size={24} className="shrink-0 text-white" strokeWidth={1.5} />
                <div className="flex flex-col items-start">
                  <span className="uppercase tracking-[0.02em] leading-[100%] text-white font-medium text-[14px]">
                    {boldPart && <span className="font-extrabold text-[16px]">{boldPart}</span>}
                    {text}
                  </span>
                  {sub && (
                    <span className="mt-1.75 flex items-center gap-1">
                      {sub.map((s, i) => (
                        <span key={s} className="flex items-center gap-1 text-white">
                          {i > 0 && <span className="h-[5px] w-[5px] rounded-full bg-white" />}
                          <span style={{ fontSize: "clamp(9px,0.69vw,10px)", letterSpacing: "0.02em" }}>
                            {s}
                          </span>
                        </span>
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
