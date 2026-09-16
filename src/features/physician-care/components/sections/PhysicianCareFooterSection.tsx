"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

const ease = [0.22, 1, 0.36, 1] as const;

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PhysicianCareFooterSection() {
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
        src="/physician-care/b68d00ff4cdc28d5a49a1c8fd12f2dcc8ccc5769.png"
        alt=""
        fill
        className="object-cover"
      />


      <div className="relative mx-auto w-full max-w-360 px-5 min-h-dvh pt-10 lg:px-[74px] lg:pt-[109px]">
        <div className="flex flex-col gap-16 lg:gap-[70px]">
          <motion.div
            className="flex flex-col gap-[10px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-[28px] md:text-[36px] lg:text-[36px] font-medium leading-[45px] text-white">
              Because <span className="italic">better care</span> begins with
            </h2>
            <div className="font-dm-serif text-[64px] md:text-[96px] lg:text-[128px] uppercase leading-[100%] text-white">
              knowing you.
            </div>
          </motion.div>

          <motion.button
            className="flex h-16 lg:h-[85px] w-full max-w-[493px] items-center justify-center rounded-[10px] px-[38px] py-[15px] text-[18px] md:text-[24px] font-medium uppercase leading-[30px] text-white shadow-[6px_7px_5.3px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(130deg, #4D915C 0%, #19995F 100%)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Start Physician Care
          </motion.button>
        </div>
      </div>

      <FooterItems />
    </section>
  );
}
