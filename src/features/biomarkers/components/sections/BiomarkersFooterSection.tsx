"use client";

import { useRef } from "react";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function BiomarkersFooterSection() {
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
    <section ref={sectionRef} className="w-full bg-[#17231D]">
      <FooterItems noTopMargin />
    </section>
  );
}
