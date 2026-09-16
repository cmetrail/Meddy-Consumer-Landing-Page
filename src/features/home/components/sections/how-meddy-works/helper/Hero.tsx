"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ICONS = [
  "/home/scattered-1.png",
  "/home/scattered-2.png",
  "/home/scattered-3.png",
  "/home/scattered-4.png",
  "/home/scattered-5.png",
  "/home/scattered-6.png",
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Moving gradient background — slow settle while the section scrolls in.
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      // 2–4. Entrance: phones slide from below → each text line appears singly → nav bar pops up.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", end: "top 30%", scrub: true },
      });

      // Phone slides up from below — triggered on the phone itself so it fades in
      // while actually visible (the tall section trigger finished too early).
      const phone = sectionRef.current?.querySelector("[data-hmw-phone]");
      if (phone) {
        gsap.fromTo(
          phone,
          { opacity: 0, y: 120 },
          { opacity: 1, y: 0, ease: "none", scrollTrigger: { trigger: phone, start: "top 95%", end: "top 50%", scrub: true } },
        );
      }

      const lines = gsap.utils.toArray<HTMLElement>("[data-hmw-line]", sectionRef.current);
      lines.forEach((el, i) => {
        tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, 0.3 + i * 0.15);
      });

      tl.fromTo(
        "[data-hmw-strip]",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: "none" },
        0.3 + lines.length * 0.15,
      );

      // 5. On scroll — illustrations drop one-by-one from above into the nav bar.
      const strip = sectionRef.current?.querySelector("[data-hmw-strip]");
      const icons = gsap.utils.toArray<HTMLElement>("[data-hmw-icon]", sectionRef.current);
      if (strip) {
        const drop = gsap.timeline({
          scrollTrigger: { trigger: strip, start: "top 95%", end: "top 45%", scrub: 0.5 },
        });
        icons.forEach((el, i) => {
          drop.fromTo(
            el,
            { opacity: 0, y: -70, scale: 0.6 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
            i * 0.15,
          );
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="relative overflow-hidden min-h-(--dvh)">
      {/* Curtain background */}
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/home/how-it-work-bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex pt-16 h-full max-w-360 px-5 lg:px-10 mx-auto flex-col">

        {/* Text */}
        <div className="text-center gap-2 sm:gap-5 max-w-214 mx-auto flex flex-col shrink-0">
          <p
            data-hmw-line
            className="uppercase tracking-[0.18em] leading-[100%] text-xl font-bold text-[#ABB1AD]"
          >
            How Meddy Works
          </p>

          <h2 className="flex flex-col gap-5">
            <span
              data-hmw-line
              className="block font-normal text-[50px] leading-[100%] text-[#ABB1AD]"
            >
              Your health system ,
            </span>
            <span
              data-hmw-line
              className="block font-bold text-[50px] leading-[100%] uppercase"
              style={{
                background: "linear-gradient(90deg, #578951 0%, #2F6328 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              All in one place.
            </span>
          </h2>

          <p
            data-hmw-line
            className="text-[#ABB1AD] text-[24px] font-medium"
          >
            Everything you log becomes something your doctor can act on.
          </p>
        </div>
        <div className="relative h-full">
        {/* Phone mockup — single image already contains both phones */}
          <div data-hmw-phone className="flex flex-1 min-h-0 items-end justify-center px-4">
          <Image
            src="/home/iPhone-17.png"
            alt="Meddy app screens"
            width={800}
            height={600}
              className="object-contain object-bottom"
            style={{
              width: "clamp(360px, 100%, 650px)",
              height: "auto",
              maxHeight: "66dvh",
            }}
          />
        </div>

        {/* Icon strip — centered rounded shelf */}
          <div data-hmw-strip className="absolute left-0 right-0 bottom-[8%] max-md:bottom-[8%]">
          <div
            className="mx-auto flex items-center py-3.25 bg-white/10 justify-around px-2 sm:px-6 lg:px-10"
            style={{
              maxWidth: 1018,
              borderRadius: 16,
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {ICONS.map((src) => (
              <div key={src} data-hmw-icon className="relative w-[129px] h-[69px]">
                <Image src={src} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
