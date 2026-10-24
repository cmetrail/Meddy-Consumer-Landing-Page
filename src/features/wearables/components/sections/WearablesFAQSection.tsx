"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FaqIcon } from "@/components/FaqIcon";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";
import { FAQS } from "../../faqs";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WearablesFAQSection() {
  const [open, setOpen] = useState<number>(0);
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
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(to right, #151f21 9.479%, #1e2c35 112.39%)",
      }}
    >
      {/* Decorative pattern + person photo (accurate Figma coords, 1440 canvas) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden max-w-360 lg:block">
        <Image
          src="/wearables/faq-pattern.svg"
          alt=""
          width={1203}
          height={1037}
          className="absolute left-[382px] top-[-12px] h-auto w-[1203px] max-w-none mix-blend-overlay"
        />
        {/* Figma: 1605px box, photo (1186.555px square) rotated -28.03deg and centred in it */}
        <div className="absolute flex items-center justify-center" style={{ left: 468.57, top: -139.84, width: 1605.011, height: 1605.011 }}>
          <div className="relative" style={{ width: 1186.555, height: 1186.555, rotate: "-28.03deg" }}>
            <Image src="/wearables/faq-person.png" alt="" fill priority sizes="1187px" className="max-w-none object-cover" />
          </div>
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 mx-auto w-full max-w-360 px-5 pb-16 pt-12 md:px-10 md:pt-16 lg:px-[78px] lg:pt-[93px]">
        <h2 className="text-[40px] font-medium uppercase leading-[1.1] text-white sm:text-[52px] lg:text-[64px]">
          FAQ
        </h2>

        <div className="mt-8 flex flex-col lg:mt-[56px] lg:max-w-[719px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[#585858]">
                <div className="py-[16px] lg:py-[30px]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={`font-medium uppercase leading-[1.3] text-[#F5F5F5] ${
                        isOpen
                          ? "text-[18px] lg:text-[24px]"
                          : "text-[16px] lg:text-[20px]"
                      }`}
                    >
                      {f.q}
                    </span>
                    <FaqIcon open={isOpen} className="text-[#F5F5F5]" />
                  </button>
                  {isOpen && (
                    <p className="mt-[15px] text-[14px] font-medium leading-[1.5] text-[#919191]">
                      {f.a}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer (shared) */}
      <div className="relative z-10">
        <FooterItems mobileReference mobileVariant="wearables" />
      </div>
    </section>
  );
}
