"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroHeader from "@/components/helper/HeroHeader";

gsap.registerPlugin(useGSAP);

const LETTERS = "PRIMARYCARE".split("");

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const doctorRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(doctorRef.current, { yPercent: 100, opacity: 0, duration: 1.8, ease: "power3.out" })
        .from(letterRefs.current, { opacity: 0, y: 30, duration: 0.8, stagger: 0.05 }, "<0.3")
        .from(taglineRef.current, { x: -50, opacity: 0, duration: 1.0 }, "-=0.6")
        .from(bodyRef.current, { x: -50, opacity: 0, duration: 1.0 }, "-=0.7")
        .from(ctaRef.current, { scale: 0.5, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.6")
        .from(statsRef.current, { y: 60, opacity: 0, duration: 1.0, ease: "power3.out" }, "-=0.5")
        .from(iconsRef.current, { x: 50, opacity: 0, duration: 0.9 }, "-=0.8")
        .from(nutritionRef.current, { y: 50, opacity: 0, duration: 0.9 }, "-=0.6");
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative h-dvh w-full overflow-hidden bg-[radial-gradient(49.4%_83.3%_at_53.93%_56.81%,#2FC380_0%,#1D6B40_100%)]">
      <HeroHeader />

      {/* === PRIMARYCARE — top:130, left:60 === */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="relative max-w-360 mx-auto h-full">
          <div
            className="absolute uppercase font-bold leading-none tracking-normal text-[#1E1E22] whitespace-nowrap"
            style={{ top: "11.7dvh", left: "4.17%", fontSize: "clamp(80px, 12.5vw, 180px)", mixBlendMode: "difference" }}
          >
            {LETTERS.map((char, i) => (
              <span key={i} ref={el => { letterRefs.current[i] = el; }}>{char}</span>
            ))}
          </div>
        </div>
      </div>

      {/* === Left content === */}
      <div className="absolute inset-0">
        <div className="relative max-w-360 mx-auto h-full">

          {/* Tagline + body — top:373, left:75 */}
          <div className="absolute flex flex-col gap-2.5" style={{ top: "33.6dvh", left: "5.21%" }}>
            <p ref={taglineRef} className="text-white uppercase font-normal text-[32px] leading-10">
              That actually knows your habit
            </p>
            <p ref={bodyRef} className="text-white font-normal text-[20px] leading-6.25 w-119.25">
              A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.
            </p>
          </div>

          {/* CTA — top:580, left:75 */}
          <div className="absolute" style={{ top: "52.2dvh", left: "5.21%" }}>
            <button ref={ctaRef} className="flex items-center w-59 h-16 bg-[#18181B] rounded-[40px] pl-3.75 pr-[4px]">
              <span className="flex-1 text-[#F4F4F5] font-medium text-[24px] leading-7.5 text-left">
                Get Started
              </span>
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#F4F4F5] shrink-0">
                <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#17925A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats — top:755, left:74 */}
          <div ref={statsRef} className="absolute" style={{ top: "67.9dvh", left: "5.14%" }}>
            <Image src="/stats.png" alt="Enrollment stats" width={380} height={257} className="w-[380px] h-auto" />
          </div>

        </div>
      </div>

      {/* === Right side — icons + nutrition === */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative max-w-360 mx-auto h-full">

          {/* Icons — top:646, right:71 (1440-1179-190=71) */}
          <div ref={iconsRef} className="absolute flex items-center gap-[10px]" style={{ top: "58.1dvh", right: "4.93%" }}>
            <div className="flex items-center justify-center w-10 h-10 bg-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4.8 3H7.2C7.64 3 8 3.36 8 3.8V8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8V3.8C16 3.36 16.36 3 16.8 3H19.2" stroke="#585454" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 12V15M12 15C10.34 15 9 16.34 9 18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18" stroke="#585454" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="17" cy="18" r="2" stroke="#585454" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 2V8C3 10.21 4.79 12 7 12V22M7 2V8M11 2V8C11 10.21 12.79 12 15 12V22M21 2C21 2 21 8 18 10C15 12 15 22 15 22" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 4H8V20H6V4ZM16 4H18V20H16V4ZM4 9H6M18 9H20M4 15H6M18 15H20M8 11H16M2 8H4V16H2V8ZM20 8H22V16H20V8Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border border-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.54 20.96 11.08 20.9 10.64C19.92 11.5 18.63 12 17.2 12C14.33 12 12 9.67 12 6.8C12 5.37 12.5 4.08 13.36 3.1C12.92 3.04 12.46 3 12 3Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 2L20 4L22 5L20 6L19 8L18 6L16 5L18 4L19 2Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Nutrition — top:801, right:63 (1440-1138-239=63) */}
          <div ref={nutritionRef} className="absolute" style={{ top: "72.1dvh", right: "4.38%" }}>
            <Image src="/nutrition.png" alt="Nutrition" width={239} height={218} className="w-[239px] h-auto" />
          </div>

        </div>
      </div>

      {/* === Doctor image === */}
      <div ref={doctorRef} className="absolute inset-0 pointer-events-none">
        <div className="relative max-w-360 mx-auto px-13 h-full">
          <Image
            src="/doctor.png"
            alt="Doctor"
            width={715}
            height={954}
            className="absolute bottom-0 left-[55%] -translate-x-1/2 h-[86dvh] w-auto object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
