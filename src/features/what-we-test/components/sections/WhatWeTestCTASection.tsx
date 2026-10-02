"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhatWeTestCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", sectionRef.current)
          .forEach((el) => {
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
            scrollTrigger: {
              trigger: nav,
              start: "top 92%",
              end: "top 55%",
              scrub: true,
            },
          });
          cols.forEach((el, i) => {
            ftl.fromTo(
              el,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, ease: "none" },
              i * 0.2,
            );
          });
        }
      }),
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end overflow-hidden bg-white pt-[60px] lg:pt-[120px]"
    >
      {/* Background image + overlay */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/what-we-test/what-we-test-cta-bg.png"
          alt=""
          fill
          className="object-cover object-top"
        />
        <Image
          src="/what-we-test/what-we-test-cta-overlay.svg"
          alt=""
          fill
          className="object-cover object-top"
        />
      </div>

      {/* CTA content */}
      <div className="relative z-10 flex flex-col items-center gap-[40px] lg:gap-[59px]">
        <div className="flex flex-col items-center gap-[10px]">
          <div className="flex flex-wrap items-center justify-center gap-[12px] lg:gap-[24px]">
            <span className="text-[40px] leading-none text-white sm:text-[64px] lg:text-[96px]">
              Life is
            </span>
            <span className="font-dm-serif italic text-[40px] leading-none text-white sm:text-[64px] lg:text-[96px]">
              short?
            </span>
          </div>
          <span className="text-[24px] text-white lg:text-[40px]">
            We disagree.
          </span>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-[55px] bg-white py-[15px] text-[14px] font-semibold text-[#626262] lg:text-[16px]"
          style={{ width: 283 }}
        >
          Start Physician Care
        </button>
      </div>

      {/* Footer (shared) */}
      <div className="relative z-10 mt-[60px] lg:mt-[120px]">
        <FooterItems />
      </div>
    </section>
  );
}
