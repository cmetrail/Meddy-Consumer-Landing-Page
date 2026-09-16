"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", sectionRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden text-white">
      <Image
        src="/pricing/footer-bg.png"
        alt=""
        fill
        className="object-cover"
      />

      <div className="relative mx-auto w-full max-w-360 px-5 lg:px-10 py-10">
        <div className="flex flex-col gap-16 lg:gap-70.25">
          <div className="flex flex-col gap-10 lg:gap-20">
            <div className="flex flex-col gap-4 lg:gap-4.25">
              <h2 className="text-[28px] md:text-[36px] lg:text-[48px] xl:text-[64px] font-normal uppercase leading-none text-white">
                Your health.
              </h2>
              <div className="flex items-baseline gap-3 lg:gap-4">
                <span className="text-[40px] md:text-[64px] lg:text-[96px] xl:text-[128px] font-medium uppercase leading-none text-white">
                  Your
                </span>
                <span className="text-[40px] md:text-[64px] lg:text-[96px] xl:text-[128px] font-bold uppercase leading-none text-[#E7F0A3]">
                  pace.
                </span>
              </div>
            </div>

            <button
              data-reveal
              className="flex h-14 md:h-16 lg:h-20 xl:h-24 w-full max-w-[548px] items-center justify-center rounded-[10px] bg-[#17925A] text-[16px] md:text-[20px] lg:text-[28px] xl:text-[36px] font-bold uppercase leading-none text-white shadow-[10px_16px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
            >
              Join the waitlist
            </button>
          </div>

          <p
            data-reveal
            className="max-w-220 text-[16px] md:text-[18px] lg:text-[32px] font-normal leading-normal text-[#E5E5E5]"
          >
            Start with Meddy. Add support when it makes sense. Build a healthier
            future with a system designed to grow with you.
          </p>
        </div>
      </div>

      <FooterItems />
    </section>
  );
}
