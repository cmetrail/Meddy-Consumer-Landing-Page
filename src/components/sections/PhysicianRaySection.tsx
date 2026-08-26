"use client";

import { useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Clock, GlobeLock, ClockCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_BADGES = [
  { Icon: ShieldCheck, text: "Board-certified physician" },
  { Icon: Clock, text: "First consultation free" },
  { Icon: GlobeLock, text: "HIPAA compliant" },
  { Icon: ClockCheck, text: "Available in 46 states except · Arkansas · Massachussetts · New Mexico · South Carolina" },
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
    <section ref={sectionRef} className="relative w-full bg-[#1D3A1D] text-white overflow-hidden">
      <div className="absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#6EE7A0]/10 blur-[120px]" />

      <div className="relative max-w-360 mx-auto px-6 lg:px-13 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div data-reveal className="relative flex justify-center">
            <Image
              src="/home/physician-ray.png"
              alt="Dr. Ray, board-certified physician"
              width={418}
              height={626}
              className="object-contain"
            />
          </div>

          {/* Copy */}
          <div data-reveal className="text-center lg:text-right">
            <p className="text-[#F4F4F5] uppercase tracking-[0.02em]" style={{ fontSize: 20 }}>
              Limited availability
            </p>
            <p className="mt-5 text-white font-semibold uppercase" style={{ fontSize: 36 }}>
              500 spots.
            </p>
            <p className="text-white font-extrabold uppercase leading-none mt-1" style={{ fontSize: "clamp(44px, 5vw, 64px)" }}>
              One physician.
            </p>
            <p className="mt-5 text-white font-semibold uppercase" style={{ fontSize: 24 }}>
              Your data finally means something.
            </p>

            <div className="mt-9 flex justify-center lg:justify-end gap-4">
              <button className="rounded-[10px] bg-[#18181B] px-8 py-3.5 text-white uppercase tracking-[0.02em]" style={{ fontSize: 16 }}>
                Get started
              </button>
              <button className="rounded-[10px] border border-white px-8 py-3.5 text-white uppercase tracking-[0.02em]" style={{ fontSize: 16 }}>
                See how it works
              </button>
            </div>

            {/* Social proof card */}
            <div className="mt-10 inline-block rounded-xl bg-white p-5 text-left shadow-lg">
              <p className="text-[#0C683E] font-medium uppercase tracking-[0.02em]" style={{ fontSize: 14 }}>
                Now accepting our first 500 patients
              </p>
              <p className="mt-1 text-[#0C683E] font-bold uppercase" style={{ fontSize: 34 }}>
                327 <span className="text-base font-medium">Remaining spots</span>
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div data-reveal className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {TRUST_BADGES.map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <Icon size={18} className="text-white/90" strokeWidth={2} />
              <span className="text-white font-medium uppercase" style={{ fontSize: 13 }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
