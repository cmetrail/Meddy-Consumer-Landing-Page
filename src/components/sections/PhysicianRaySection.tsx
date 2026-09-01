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
        className="absolute left-0 top-0 h-full w-[44%] max-w-[635px] max-xl:hidden"
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

      <div className="relative max-w-360 mx-auto px-4 py-10 md:py-16 xl:px-0 xl:py-0">
        <div className="relative w-full aspect-1442/942 max-xl:aspect-auto">
          {/* Copy (right-aligned) */}
          <div
            data-reveal
            className="absolute left-[57.28%] top-[4.99%] w-[37.31%] text-right max-xl:static max-xl:w-full max-xl:text-center"
          >
            <p
              className="uppercase leading-[1.25] tracking-[0.02em] text-[#F4F4F5]"
              style={{ fontSize: "clamp(14px,1.39vw,20px)" }}
            >
              Limited availability
            </p>
            <p
              className="mt-[34px] font-semibold uppercase leading-[1.25] text-white"
              style={{ fontSize: "clamp(24px,2.5vw,36px)" }}
            >
              500 spots.
            </p>
            <p
              className="mt-[5px] font-extrabold uppercase leading-[1.26] text-white"
              style={{ fontSize: "clamp(40px,4.44vw,64px)" }}
            >
              One physician.
            </p>
            <p
              className="mt-[13px] font-semibold uppercase leading-[1.25] tracking-[0.02em] text-white"
              style={{ fontSize: "clamp(16px,1.67vw,24px)" }}
            >
              Your data finally means something.
            </p>

            {/* Buttons */}
            <div className="mt-[95px] flex justify-end gap-[33px] max-xl:mt-10 max-xl:justify-center max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
              <button
                className="flex h-[50px] w-[200px] items-center justify-center rounded-none bg-[#18181B] uppercase text-white max-sm:w-full"
                style={{ fontSize: "clamp(12px,1.11vw,16px)" }}
              >
                Get started
              </button>
              <button
                className="flex h-[50px] w-[200px] items-center justify-center rounded-none border border-white uppercase text-white max-sm:w-full"
                style={{ fontSize: "clamp(12px,1.11vw,16px)" }}
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Social proof card (one-physician.svg) */}
          <div
            data-reveal
            className="absolute left-[71.22%] top-[53.18%] w-[23.31%] max-xl:static max-xl:mx-auto max-xl:mt-12 max-xl:w-full max-xl:max-w-[340px]"
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
            className="absolute left-[22.05%] top-[92.46%] flex w-[73.44%] items-start gap-[25px] max-xl:static max-xl:mx-auto max-xl:mt-12 max-xl:w-full max-xl:flex-wrap max-xl:justify-center max-xl:gap-x-[25px] max-xl:gap-y-5"
          >
            {TRUST_BADGES.map(({ Icon, text, bold, sub }) => (
              <div key={text} className={`flex shrink-0 gap-2.5 ${sub ? "items-start" : "items-center"}`}>
                <Icon size={24} className="shrink-0 text-white" strokeWidth={1.5} />
                <div className="flex flex-col items-start">
                  <span
                    className={`uppercase text-white ${bold ? "font-extrabold" : "font-medium"}`}
                    style={{
                      fontSize: bold ? "clamp(12px,1.11vw,16px)" : "clamp(11px,0.97vw,14px)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {text}
                  </span>
                  {sub && (
                    <span className="mt-[7px] flex items-center gap-1">
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
