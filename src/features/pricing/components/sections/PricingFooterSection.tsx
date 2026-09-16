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
            scrollTrigger: { trigger: el, start: "top bottom", once: true },
          },
        );
      });

      const nav = sectionRef.current?.querySelector("[data-footer-nav]");
      if (nav) {
        const cols = nav.querySelectorAll<HTMLElement>("[data-footer-col]");
        const ftl = gsap.timeline({
          scrollTrigger: { trigger: nav, start: "top 92%", end: "top 55%", scrub: true },
        });
        cols.forEach((el, i) => {
          ftl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, i * 0.2);
        });
      }
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
        <div className="flex flex-col gap-16 lg:gap-24">
          <div className="flex flex-col gap-10 lg:gap-19.75">
            <div className="flex flex-col gap-4 lg:gap-3.75">
              <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-normal uppercase leading-[100%] text-white">
                Your health.
              </h2>
              <div className="flex items-baseline gap-2 lg:gap-7.5">
                <span className="text-[48px] sm:text-[64px] lg:text-[96px] font-medium uppercase leading-[100%] text-white">
                  Your
                </span>
                <span className="text-[48px] sm:text-[64px] lg:text-[96px] font-bold uppercase leading-[100%] text-[#E7F0A3]">
                  pace.
                </span>
              </div>
            </div>

            <ul className="flex flex-col gap-5 lg:gap-7.5">
              <li data-reveal className="flex items-center gap-3.75">
                <Image
                  src="/pricing/footer/bullet-icon.svg"
                  alt=""
                  width={11}
                  height={41}
                  className="h-[41px] w-auto shrink-0"
                />
                <span className="text-[18px] sm:text-[20px] lg:text-[24px] font-medium italic leading-[120%] text-white">
                  Start with Meddy.
                </span>
              </li>
              <li data-reveal className="flex items-center gap-3.75">
                <Image
                  src="/pricing/footer/bullet-icon.svg"
                  alt=""
                  width={11}
                  height={41}
                  className="h-[41px] w-auto shrink-0"
                />
                <span className="text-[18px] sm:text-[20px] lg:text-[24px] italic leading-[120%] text-white">
                  Add support when it makes sense.
                </span>
              </li>
              <li data-reveal className="flex items-center gap-3.75">
                <Image
                  src="/pricing/footer/bullet-icon.svg"
                  alt=""
                  width={11}
                  height={41}
                  className="h-[41px] w-auto shrink-0"
                />
                <span className="max-w-[523px] text-[18px] sm:text-[20px] lg:text-[24px] italic leading-[120%] text-white">
                  Build a healthier future with a system designed to grow with you.
                </span>
              </li>
            </ul>
          </div>

          <button
            data-reveal
            className="flex h-[52px] sm:h-[64px] lg:h-[81px] w-full max-w-[548px] items-center justify-center rounded-[10px] bg-[#17925A] text-[18px] sm:text-[20px] lg:text-[24px] font-semibold uppercase leading-none text-white shadow-[13px_16px_4px_rgba(49,80,44,0.25)] transition-opacity hover:opacity-90"
          >
            Join the Waitlist
          </button>
        </div>
      </div>

      <FooterItems />
    </section>
  );
}
