"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Pricing } from "./helper/Pricing";
import { FooterItems } from "./helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden text-white">
      <Image src="/home/footer-bg.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-360 mx-auto px-5 lg:px-10 py-16">
        <Pricing />
      </div>
      <FooterItems />
    </section>
  );
}
