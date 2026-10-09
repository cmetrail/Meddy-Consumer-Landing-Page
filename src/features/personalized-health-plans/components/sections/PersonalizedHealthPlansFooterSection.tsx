"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Figma: desktop node 12613:16758 "Footer responsive" (1440 x 744). Full-bleed photo behind the
// shared frosted footer card (FooterItems, same as the other pages).
export default function PersonalizedHealthPlansFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
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
      }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden rounded-t-[22px] text-white">
      <Image
        src="/personalized-health-plans/footer-photo.jpg"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="relative">
        <FooterItems noTopMargin />
      </div>
    </section>
  );
}
