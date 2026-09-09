"use client";

import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Clock, GlobeLock, ClockCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_BADGES = [
  { Icon: ShieldCheck, text: "Board-certified physician", bold: false },
  { Icon: Clock, text: "First consultation free", bold: false },
  { Icon: GlobeLock, text: "HIPAA compliant", bold: true },
  {
    Icon: ClockCheck,
    text: "Available in 46 states except",
    bold: false,
    sub: ["Arkansas", "Massachussetts", "New Mexico", "South Carolina"],
  },
];

export default function PhysicianRaySection() {
  const sectionRef = useRef<HTMLElement>(null);



  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
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
        className="absolute left-0 top-0 h-full w-[44%] max-w-158.75 max-xl:hidden"
      >
        <Image
          src="/home/physician-ray.png"
          alt="Dr. Ray, board-certified physician"
          width={635}
          height={951}
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex w-full flex-col min-h-(--dvh) max-w-360 mx-auto px-5 lg:px-10 py-16">
        <div className="relative w-full flex-1 flex flex-col justify-between items-end">
          {/* Copy (right-aligned) */}
          <div
            data-reveal
            className="text-right"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-7">
                <p
                  className="uppercase leading-[100%] text-[30px] text-[#F4F4F5]"

                >
                  Limited availability
                </p>
                <div className="flex flex-col gap-0.5">
                  <p
                    className=" font-semibold uppercase lleading-[100%] text-[36px] text-white"

                  >
                    500 spots.
                  </p>
                  <p
                    className="font-extrabold uppercase leading-[100%] text-[64px] text-white"

                  >
                    One physician.
                  </p>
                </div>
                <p
                  className="font-semibold uppercase leading-[100%] text-[24px] text-white"
                  style={{ fontSize: "clamp(16px,1.67vw,24px)" }}
                >
                  Your data finally means something.
                </p>
              </div>
            </div>
            {/* Buttons */}

          </div>
          <div className=" flex justify-end gap-8.25 ">
            <button
              className="flex h-12.5 w-50 text-base items-center justify-center rounded-none bg-[#18181B] uppercase text-white transition-colors duration-300 hover:bg-[#2B2B2F] max-sm:w-full"

            >
              Get started
            </button>
            <button
              className="flex h-12.5 w-50 text-base items-center justify-center rounded-none border border-white uppercase text-white transition-colors duration-300 hover:bg-white hover:text-[#18181B] max-sm:w-full"

            >
              See how it works
            </button>
          </div>
          {/* Social proof card (one-physician.svg) */}
          <div
            data-reveal
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
            data-reveal
            className="flex  items-start gap-6.25 max-xl:static max-xl:mx-auto max-xl:mt-12 max-xl:w-full max-xl:flex-wrap max-xl:justify-center max-xl:gap-x-[25px] max-xl:gap-y-5"
          >
            {TRUST_BADGES.map(({ Icon, text, bold, sub }) => (
              <div key={text} className={`flex shrink-0 gap-2.5 ${sub ? "items-start" : "items-center"}`}>
                <Icon size={24} className="shrink-0 text-white" strokeWidth={1.5} />
                <div className="flex flex-col items-start">
                  <span
                    className={`uppercase tracking-[2%] leading-[100%] text-white ${bold ? "font-extrabold text-[14px]" : "font-medium text-[16px]"}`}

                  >
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
