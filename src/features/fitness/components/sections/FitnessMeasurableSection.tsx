"use client";

import Image from "next/image";
import FitnessProgressCard from "../helper/FitnessProgressCard";

export default function FitnessMeasurableSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ "--u": "calc(min(100vw, 1440px) * 0.000694444)" } as React.CSSProperties}
    >
      {/* mobile: plain cover */}
      <div className="pointer-events-none absolute left-[-104%] top-0 w-[342%] lg:hidden" style={{ aspectRatio: "1536 / 1024" }}>
        <Image src="/fitness/fitness-measurable-bg.png" alt="" fill priority sizes="342vw" className="object-cover" />
      </div>
      {/* lg+: Figma placement (1991 wide, 445px off the left, anchored to the top so the head stays in view) */}
      <div
        className="pointer-events-none absolute left-1/2 hidden lg:block"
        style={{
          width: "max(calc(1991 * var(--u)), calc(100% + 340 * var(--u)))",
          aspectRatio: "1536 / 1024",
          top: "calc(-113 * var(--u))",
          transform: "translateX(calc(-50% - 170 * var(--u)))",
        }}
      >
        <Image src="/fitness/fitness-measurable-bg.png" alt="" fill priority sizes="2000px" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col items-stretch gap-8 px-5 py-16 lg:flex-row lg:items-end lg:gap-12 lg:px-[clamp(40px,6.94vw,100px)] lg:py-[clamp(32px,calc((100dvh-631px)/2),120px)]">
        <div className="flex flex-1 flex-col justify-center gap-6">
          <div className="flex flex-col">
            <span className="text-[18px] leading-tight text-white sm:text-[24px] lg:text-[clamp(24px,2.22vw,32px)]">
              Progress should be
            </span>
            <span className="comprehensive-serif italic text-[42px] leading-none text-white sm:text-[80px] lg:text-[clamp(64px,6.25vw,90px)]">
              Measurable
            </span>
          </div>
          <p className="max-w-[480px] text-[16px] leading-[1.5] text-white lg:text-[20px] lg:leading-[normal]">
            Compare your performance across weeks, months, or any period you
            choose.
          </p>
        </div>

        <div className="w-full lg:flex-1">
          <FitnessProgressCard />
        </div>
      </div>
    </section>
  );
}
