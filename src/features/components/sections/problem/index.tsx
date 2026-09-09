"use client";

import type { CSSProperties } from "react";

import Image from "next/image";

/* Figma #2232:11761 — Frame 2147225694 is 1437×1329.
   Heading + 6 Photoroom photos are placed absolutely inside it.
   Node px → % of the 1437×1329 frame. */
const HEADING = { left: "6.05%", top: "5.27%", width: "54.08%" };

const IMAGES = [
  { src: "/home/scattered-1.png", left: "3.9%", mobileLeft: "0%", top: "2%", mobileTop: "5%", width: "26.03%", mobileWidth: "36%", ar: 1.918 },
  { src: "/home/scattered-2.png", left: "24.36%", mobileLeft: "26%", top: "35.5%", mobileTop: "38.65%", width: "25.68%", mobileWidth: "34%", ar: 1.864 },
  { src: "/home/scattered-3.png", left: "46.49%", mobileLeft: "48%", top: "5.13%", mobileTop: "8.37%", width: "24.5%", mobileWidth: "32%", ar: 1.805 },
  { src: "/home/scattered-4.png", left: "6.05%", mobileLeft: "0%", top: "73.88%", mobileTop: "77.35%", width: "24.77%", mobileWidth: "34%", ar: 1.945 },
  { src: "/home/scattered-5.png", left: "41.27%", mobileLeft: "42%", top: "68.38%", mobileTop: "72.3%", width: "29.72%", mobileWidth: "36%", ar: 1.881 },
  { src: "/home/scattered-6.png", left: "62.77%", mobileLeft: "60%", top: "32.38%", mobileTop: "38.65%", width: "28.46%", mobileWidth: "34%", ar: 2.176 },
];

const BRAND = "#17925A";
const HEADLINE = "#18181B";
const EYEBROW = "#1E1E22";

/* Straight green underline — sits under "health" only (Line 24) */
function StraightUnderline() {
  return (
    <span
      aria-hidden
      className="absolute  w-[96%] left-[50%] h-[0.0625em]  bg-theme-accent bottom-0 translate-x-[-50%] rounded-full"
   
    />
  );
}

/* Straight green underline — sits under "is scattered." only (Line 25) */
function CurvedUnderline() {
  return (
    <span
      aria-hidden
      className="absolute  w-[90%] bg-theme-accent left-[50%] translate-x-[-50%] bottom-0  h-[0.0625em] rounded-full"
    />
  );
}

function Heading() {
  return (
    <div>
      <p
        className="uppercase font-normal text-[clamp(14px,1.4vw,20px)] leading-[1.245] mb-[clamp(8px,1.04vw,15px)]"
        style={{ color: EYEBROW }}
      >
        The problem
      </p>
      <h2
        className="font-bold uppercase text-[clamp(30px,3.3vw,48px)] leading-[1.26]"
        style={{ color: HEADLINE }}
      >
        <span className="block">
          Your <span className="relative inline-block">health<StraightUnderline /></span>
        </span>
        <span className="block w-fit rotate-[-4.22deg] ml-[20%] mt-1.75">
          is{" "}
          <span className="relative inline-block">
            scattered.
            <CurvedUnderline />
          </span>
        </span>
      </h2>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-problem-gradient"
      style={{ height: "var(--dvh)" }}
    >
      <div className="mx-auto h-full w-full max-w-360 px-5 lg:px-10 py-16 flex flex-col">
        <div className="shrink-0">
          <Heading />
        </div>
        <div className="relative flex-1 min-h-0 w-full">
          {IMAGES.map((p) => (
            <div
              key={p.src}
              className="absolute overflow-hidden w-(--img-w) max-md:w-(--img-w-md) max-md:left-(--img-left-md) max-md:top-(--img-top-md)"
              style={{ left: p.left, top: p.top, aspectRatio: p.ar, "--img-w": p.width, "--img-w-md": p.mobileWidth, "--img-left-md": p.mobileLeft, "--img-top-md": p.mobileTop } as CSSProperties}
            >
              <Image src={p.src} alt="" fill sizes="500px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
