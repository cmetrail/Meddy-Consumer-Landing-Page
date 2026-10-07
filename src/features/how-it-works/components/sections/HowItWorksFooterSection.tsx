"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Figma: desktop node 12688:9585 (1440 x 1093). The shared site footer (FooterItems, same as the other pages) sits on a
// photo: a 1440 x 1106 box at the top with the image drawn 167% wide / 121% tall and shifted like the design, so the
// photo shows above the frosted footer panel.
export default function HowItWorksFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]", sectionRef.current).forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top bottom", once: true } },
          );
        });

        const nav = sectionRef.current?.querySelector("[data-footer-nav]");
        if (nav) {
          const cols = nav.querySelectorAll<HTMLElement>("[data-footer-col]");
          const ftl = gsap.timeline({ scrollTrigger: { trigger: nav, start: "top 92%", end: "top 55%", scrub: true } });
          cols.forEach((el, i) => {
            ftl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, i * 0.2);
          });
        }
      }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white lg:pt-[488px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" style={{ aspectRatio: "1440 / 1106" }}>
        <Image
          src="/how-it-works/footer/footer-photo.png"
          alt=""
          width={2752}
          height={1536}
          priority
          sizes="2400px"
          className="absolute max-w-none"
          style={{ height: "121.42%", left: "-32.38%", top: "-21.35%", width: "167.09%" }}
        />
      </div>
      <div className="relative">
        <FooterItems noTopMargin />
      </div>
    </section>
  );
}
