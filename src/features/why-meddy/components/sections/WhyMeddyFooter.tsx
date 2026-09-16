"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhyMeddyFooterSection() {
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
        src="/why-meddy/6c4544264640d72d349c7f77f7eb2856c08a65eb.jpg"
        alt=""
        fill
        className="object-cover object-top"
      />

      <div className="relative mx-auto w-full max-w-360 px-5 min-h-[50dvh] lg:px-10 py-10" />

      <FooterItems />
    </section>
  );
}
