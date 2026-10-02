"use client";

import { useState } from "react";
import Image from "next/image";
import CauseEffectCard from "../helper/CauseEffectCard";
import { CAUSE_EFFECT_VARIATIONS } from "../helper/causeEffectVariations";

// lg+: Figma node 11264:9797 (1440 x 1024) scaled by --u
const u = (n: number) => `calc(${n} * var(--u))`;

export default function CauseEffectSection() {
  const [activeId, setActiveId] = useState(CAUSE_EFFECT_VARIATIONS[0].id);
  const active =
    CAUSE_EFFECT_VARIATIONS.find((v) => v.id === activeId) ?? CAUSE_EFFECT_VARIATIONS[0];

  return (
    <section
      id="cause-effect"
      className="relative flex w-full overflow-hidden bg-[#FEFBF1] lg:h-[calc(1024*var(--u))]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.0009765625))" } as React.CSSProperties}
    >
      {/* Background photo (Figma: 172 wider than the frame, centred vertically) */}
      <div className="absolute inset-0 lg:hidden">
        <Image src="/biomarkers/cause-effect-bg.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        style={{ width: `calc(100% + ${u(172)})`, aspectRatio: "1536 / 1024" }}
      >
        <Image src="/biomarkers/cause-effect-bg.png" alt="" fill priority sizes="1700px" className="object-cover" />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-full lg:h-[calc(1010*var(--u))]"
        style={{ background: "linear-gradient(179.29deg, rgba(0,0,0,0) 43.294%, rgba(0,0,0,0.5) 99.133%)" }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-360 flex-col justify-between gap-12 px-5 py-[80px] lg:gap-0 lg:px-10 lg:py-[var(--p120)]"
        style={{ ["--p120" as string]: u(120) }}
      >
        {/* Heading (top-left) */}
        <div className="flex flex-col lg:gap-[var(--g8)]" style={{ ["--g8" as string]: u(8) }}>
          <span
            className="text-[16px] font-medium uppercase leading-[1.416] text-white sm:text-[18px] lg:text-[length:max(14px,var(--d))]"
            style={{ ["--d" as string]: u(20) }}
          >
            Cause &amp; Effect
          </span>
          <h2
            className="text-[34px] leading-[1.416] text-white sm:text-[48px] lg:whitespace-nowrap lg:text-[length:max(32px,var(--d))]"
            style={{ ["--d" as string]: u(60) }}
          >
            Your biomarkers changed.
            <br />
            <span className="comprehensive-serif italic">Understand why.</span>
          </h2>
          <p
            className="text-[16px] leading-[1.416] text-white sm:text-[18px] lg:text-[length:max(14px,var(--d))]"
            style={{ ["--d" as string]: u(20) }}
          >
            Meddy connects changes in your health with the{" "}
            <br className="hidden lg:block" />
            things that happened before them.
          </p>
        </div>

        {/* Glass panel (bottom-right) */}
        <div className="flex flex-col items-end">
          <div
            className="flex w-full flex-col gap-4 rounded-[20px] bg-white/20 p-4 backdrop-blur-[20px] sm:w-auto sm:flex-row sm:gap-6 lg:gap-[var(--g24)] lg:rounded-[var(--r20)] lg:px-[var(--px16)] lg:py-[var(--py32)]"
            style={{ ["--g24" as string]: u(24), ["--r20" as string]: u(20), ["--px16" as string]: u(16), ["--py32" as string]: u(32) }}
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:flex-col lg:gap-0">
              {CAUSE_EFFECT_VARIATIONS.map((v) => {
                const isActive = v.id === activeId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    data-ce-tab
                    onClick={() => setActiveId(v.id)}
                    className={`rounded-[58px] border px-4 py-2 text-center text-[14px] leading-[1.416] text-white transition-colors duration-300 sm:px-8 sm:py-4 lg:px-[var(--px32)] lg:py-[var(--py16)] lg:text-[length:max(13px,var(--d))] ${
                      isActive ? "border-white bg-[#FEFBF1]/10" : "border-transparent"
                    }`}
                    style={{ ["--d" as string]: u(20), ["--px32" as string]: u(32), ["--py16" as string]: u(16) }}
                  >
                    {v.tab}
                  </button>
                );
              })}
            </div>

            {/* Active card variation */}
            <div key={active.id} className="flex items-stretch motion-safe:animate-[meddy-fade_0.4s_ease]">
              <CauseEffectCard variation={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
