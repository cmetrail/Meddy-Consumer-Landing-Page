"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// lg+: Figma node 11264:10092 (1440 x 1024) scaled by --u so the section fits one viewport
const u = (n: number) => `calc(${n} * var(--u))`;

type Step = {
  num: string;
  label: string;
  src: string;
  w: number;
  h: number;
  /** image box inside the 295 x 426 card (design px) */
  box: { l: number; t: number; w: number; h: number };
  /** optional crop of the image inside its box (%), otherwise object-cover */
  crop?: { l: number; t: number; w: number; h: number };
};

const STEPS: Step[] = [
  { num: "01", label: "Lab Result", src: "step-1.png", w: 817, h: 1024, box: { l: -135, t: 0, w: 565, h: 510 }, crop: { l: -4.09, t: -21.65, w: 101.79, h: 140.63 } },
  { num: "02", label: "Physician understands it", src: "step-2.png", w: 378, h: 560, box: { l: -7, t: 0.5, w: 302, h: 426 } },
  { num: "03", label: "Adjusts your health plan", src: "step-3.png", w: 768, h: 1024, box: { l: -5, t: -4.5, w: 300, h: 431 } },
  { num: "04", label: "Tests again", src: "step-4.png", w: 1536, h: 1024, box: { l: -5, t: -4.5, w: 300, h: 431 }, crop: { l: -92.23, t: 0.18, w: 215.5, h: 100 } },
  { num: "05", label: "Sees whether it worked", src: "step-5.png", w: 736, h: 1104, box: { l: -5, t: -4.5, w: 300, h: 431 } },
  // ponytail: placeholder copy + reused photos for 06/07, swap when the real steps are designed
  { num: "06", label: "Tracks your trends", src: "step-2.png", w: 378, h: 560, box: { l: -7, t: 0.5, w: 302, h: 426 } },
  { num: "07", label: "Keeps you on course", src: "step-3.png", w: 768, h: 1024, box: { l: -5, t: -4.5, w: 300, h: 431 } },
];

export default function BiomarkersPhysicianLedSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, left: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // touch already scrolls natively
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!dragging || !el) return;
    drag.current.moved = true;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = () => setDragging(false);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.5, behavior: "smooth" });
  };

  return (
    <section
      id="physician-led"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-[#17231D] py-[80px] lg:h-[calc(1024*var(--u))] lg:py-0"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.0009765625))" } as React.CSSProperties}
    >
      <div className="flex flex-col gap-[48px] lg:gap-[var(--g48)]" style={{ ["--g48" as string]: u(48) }}>
        {/* Header (aligned with the nav container) */}
        <div className="mx-auto w-full max-w-360 px-5 lg:px-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[var(--g48)]" style={{ ["--g48" as string]: u(48) }}>
            <div className="flex flex-col gap-2 lg:flex-1 lg:gap-[var(--g10)]" style={{ ["--g10" as string]: u(10) }}>
              <h2
                className="font-medium uppercase leading-[1.416] text-white text-[44px] sm:text-[56px] lg:whitespace-nowrap lg:text-[length:max(40px,var(--d))]"
                style={{ ["--d" as string]: u(64) }}
              >
                Physician-Led
              </h2>
              <p
                className="leading-[1.416] text-[#F4F4F4] text-[16px] sm:text-[20px] lg:whitespace-nowrap lg:text-[length:max(14px,var(--d))]"
                style={{ ["--d" as string]: u(20) }}
              >
                Don&apos;t just get tested. Know what to do next.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-1 lg:justify-between lg:gap-[var(--g)]" style={{ ["--g" as string]: u(4) }}>
              <p
                className="uppercase leading-[1.416] text-[#D2D2D2] text-[24px] sm:text-[28px] lg:text-[length:max(22px,var(--d))]"
                style={{ ["--d" as string]: u(32) }}
              >
                Every result has <span className="font-bold italic text-white">somewhere</span>{" "}
                <span className="italic text-white">to go.</span>
              </p>
              <p
                className="leading-[1.416] text-[#D2D2D2] text-[15px] sm:text-[16px] lg:text-[length:max(12px,var(--d))]"
                style={{ ["--d" as string]: u(16) }}
              >
                Your Meddy physician sees your results alongside your{" "}
                <span className="font-bold text-white">
                  medications, nutrition, exercise, weight, sleep, and health history.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Cards: full-bleed track; first card starts on the container edge, the rest scroll edge to edge */}
        <div className="flex flex-col gap-4 lg:gap-[var(--g16)]" style={{ ["--g16" as string]: u(16) }}>
          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`flex gap-4 ${dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"} overflow-x-auto pl-5 scroll-pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-[var(--g16)] lg:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))] lg:scroll-pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]`}
            style={{ ["--g16" as string]: u(16) }}
          >
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="relative flex h-[400px] w-[280px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[12px] bg-[#FFF8EE] p-4 sm:h-[426px] sm:w-[295px] lg:h-[var(--ch)] lg:w-[var(--cw)] lg:rounded-[var(--r12)] lg:p-[var(--p16)]"
                style={{ ["--ch" as string]: u(426), ["--cw" as string]: u(295), ["--p16" as string]: u(16), ["--r12" as string]: u(12) }}
              >
                {/* image box: Figma offsets are for the 295 x 426 card, so scale them with the card */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    left: `${(step.box.l / 295) * 100}%`,
                    top: `${(step.box.t / 426) * 100}%`,
                    width: `${(step.box.w / 295) * 100}%`,
                    height: `${(step.box.h / 426) * 100}%`,
                  }}
                >
                  <Image
                    src={`/biomarkers/physician-led/${step.src}`}
                    alt={step.label}
                    width={step.w}
                    height={step.h}
                    sizes="320px"
                    draggable={false}
                    className={step.crop ? "absolute max-w-none" : "h-full w-full object-cover"}
                    style={
                      step.crop
                        ? { left: `${step.crop.l}%`, top: `${step.crop.t}%`, width: `${step.crop.w}%`, height: `${step.crop.h}%` }
                        : undefined
                    }
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent to-black" />
                <div className="relative flex flex-col items-start leading-[1.416] text-white">
                  <span className="text-[40px] sm:text-[50px] lg:text-[length:max(38px,var(--d))]" style={{ ["--d" as string]: u(50) }}>
                    {step.num}
                  </span>
                  <span className="text-[16px] sm:text-[20px] lg:text-[length:max(15px,var(--d))]" style={{ ["--d" as string]: u(20) }}>
                    {step.label}
                  </span>
                </div>
              </div>
            ))}
            {/* spacer so the last card can scroll fully into view */}
            <div className="w-1 shrink-0 lg:w-10" aria-hidden="true" />
          </div>

          {/* Arrows */}
          <div className="flex gap-4 pl-5 lg:gap-[var(--g16)] lg:pl-[max(2.5rem,calc((100vw-90rem)/2+2.5rem))]" style={{ ["--g16" as string]: u(16) }}>
            {(["arrow-left", "arrow-right"] as const).map((name, i) => (
              <button
                key={name}
                type="button"
                onClick={() => scrollBy(i === 0 ? -1 : 1)}
                aria-label={i === 0 ? "Previous step" : "Next step"}
                className="relative h-[46px] w-[48px] shrink-0 transition-opacity hover:opacity-70 lg:h-[var(--bh)] lg:w-[var(--bw)]"
                style={{ ["--bh" as string]: u(46), ["--bw" as string]: u(48) }}
              >
                <Image
                  src={`/biomarkers/physician-led/${name}.svg`}
                  alt=""
                  width={50}
                  height={48}
                  unoptimized
                  className="absolute max-w-none"
                  style={{ left: "-2.08%", top: "-2.17%", width: "104.17%", height: "104.35%" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
