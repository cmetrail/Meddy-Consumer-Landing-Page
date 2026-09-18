"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Figma #10580:2137 — "Section 2 (The Problem)". Frame is 1437×1024.
   Heading GROUP #10580:2140 at (87,70) 777×222. 6 Photoroom photos
   placed absolutely inside the full frame. Node px → % of 1437×1024. */
const HEADING = { left: "6.05%", top: "6.84%", width: "54.08%" };

const IMAGES = [
  { src: "/home/scattered-1.png", left: "33.68%", top: "51.76%", width: "22.2%", mobileLeft: "5%", mobileTop: "32%", mobileWidth: "40%", ar: 1.865 },
  { src: "/home/scattered-2.png", left: "8.56%", top: "32.13%", width: "21.16%", mobileLeft: "55%", mobileTop: "33%", mobileWidth: "40%", ar: 1.912 },
  { src: "/home/scattered-4.png", left: "66.87%", top: "49.61%", width: "24.57%", mobileLeft: "50%", mobileTop: "50%", mobileWidth: "42%", ar: 2.166 },
  { src: "/home/scattered-5.png", left: "52.82%", top: "31.25%", width: "21.16%", mobileLeft: "5%", mobileTop: "49%", mobileWidth: "40%", ar: 1.81 },
  { src: "/home/scattered-6.png", left: "48.3%", top: "73.93%", width: "25.68%", mobileLeft: "55%", mobileTop: "68%", mobileWidth: "40%", ar: 1.883 },
  { src: "/home/scattered-3.png", left: "17.88%", top: "77.64%", width: "21.43%", mobileLeft: "5%", mobileTop: "66%", mobileWidth: "38%", ar: 1.949 },
];

const BRAND = "#17925A";
const HEADLINE = "#18181B";
const EYEBROW = "#1E1E22";

/* Doc "Section 1→2": the 6 photos come from different directions, then float. */
const DIRECTIONS = [
  { x: -60, y: -60, r: -8 },
  { x: -90, y: 30, r: -6 },
  { x: 0, y: -90, r: 6 },
  { x: -70, y: 90, r: -4 },
  { x: 30, y: 100, r: 8 },
  { x: 100, y: -20, r: 6 },
];

/* Straight green underline — sits under "health" only (Figma LINE #10580:2146,
   strokeWeight 4.215px, width 251.52). */
function StraightUnderline() {
  return (
    <span
      aria-hidden
      className="absolute left-0 w-full h-[4px] bg-theme-accent -bottom-[4px] rounded-full"
    />
  );
}



function Heading() {
  return (
    <div data-problem-heading>
      <p
        className="uppercase font-normal text-[clamp(16px,1.95vw,28px)] leading-[1.245] mb-[clamp(10px,1.04vw,15px)]"
        style={{ color: EYEBROW }}
      >
        The problem
      </p>
      <h2
        className="font-bold uppercase text-[clamp(26px,3.47vw,50px)] leading-[1.26]"
        style={{ color: HEADLINE }}
      >
        <span className="block pb-[clamp(4px,0.5vw,7px)]">
          Your <span className="relative inline-block">health<StraightUnderline /></span>
        </span>
        <span
          className="block w-fit ml-[35%] mt-[clamp(6px,0.83vw,12px)] pb-[clamp(14px,1.9vw,27px)] origin-left"
          style={{ transform: "rotate(-4.22deg)" }}
        >
          is{" "}
          <span className="relative inline-block">
            scattered.
            <StraightUnderline />
          </span>
        </span>
      </h2>
    </div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const photos = gsap.utils.toArray<HTMLElement>("[data-scatter]", root);

      /* Idle float — started when the entrance finishes, killed when the section
         is scrolled back out so the entrance can replay cleanly. */
      let floats: gsap.core.Tween[] = [];
      const startFloat = () => {
        killFloat();
        photos.forEach((el, i) => {
          floats.push(
            gsap.to(el, {
              y: "+=12",
              duration: 2.2 + (i % 3) * 0.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              delay: (i % 4) * 0.35,
            }),
          );
        });
      };
      const killFloat = () => {
        floats.forEach((t) => t.kill());
        floats = [];
      };

      /* Plays forward on enter, reverses when scrolled back out — so it replays
         every time you come back to the section. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onLeaveBack: killFloat,
        },
      });

      photos.forEach((el, i) => {
        const d = DIRECTIONS[i % DIRECTIONS.length];
        tl.fromTo(
          el,
          { x: d.x, y: d.y, rotate: d.r, opacity: 0 },
          { x: 0, y: 0, rotate: 0, opacity: 1, duration: 1.1, ease: "power3.out" },
          0.1 + i * 0.09,
        );
      });

      const settled = 0.1 + photos.length * 0.09 + 1.1;
      tl.fromTo(
        "[data-problem-heading]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        settled,
      );

      tl.eventCallback("onComplete", startFloat);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative w-full overflow-hidden bg-problem-gradient"
    >
      <div className="relative mx-auto h-(--dvh) w-full max-w-360 lg:h-auto lg:aspect-[1437/1024]">
        <div
          className="absolute z-10 max-md:left-[5%] max-md:top-[5%] max-md:w-[90%]"
          style={{ left: HEADING.left, top: HEADING.top, width: HEADING.width }}
        >
          <Heading />
        </div>

        {IMAGES.map((p) => (
          <div
            key={p.src}
            data-scatter
            className="absolute overflow-hidden w-(--img-w) max-md:w-(--img-w-md) max-md:left-(--img-left-md) max-md:top-(--img-top-md)"
            style={{ left: p.left, top: p.top, aspectRatio: p.ar, "--img-w": p.width, "--img-w-md": p.mobileWidth, "--img-left-md": p.mobileLeft, "--img-top-md": p.mobileTop } as CSSProperties}
          >
            <Image src={p.src} alt="" fill sizes="500px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
