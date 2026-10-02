"use client";

import Image from "next/image";

// Figma: desktop node 11274:1370 (1440 x 1024), mobile node 12318:30959 (402 x 873).
// lg+: `u` scales the 1440 frame to the viewport (fits one screen).
// <lg: `m` scales the 402 frame (capped at 500px wide), min height = the 873 frame.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/medication/whole";

/** lucide icon exported from Figma; the biceps one sits inset inside its 48px / 32px box */
function Icon({ name, size, px }: { name: "dumbbell" | "utensils" | "biceps" | "moon"; size: number; px: (n: number) => string }) {
  const pre = size === 48 ? "i" : "m";
  const box = { width: px(size), height: px(size) };
  if (name === "biceps") {
    const o = size === 48 ? 2.5 : 3.75; // svg overflow (%)
    return (
      <div className="relative shrink-0 overflow-clip" style={box}>
        <div className="absolute" style={{ inset: "8.33% 8.34% 8.33% 8.37%" }}>
          <Image
            src={`${A}/${pre}-biceps.svg`}
            alt=""
            width={42}
            height={42}
            unoptimized
            className="absolute max-w-none"
            style={{ left: `-${o}%`, top: `-${o}%`, width: `${100 + 2 * o}%`, height: `${100 + 2 * o}%` }}
          />
        </div>
      </div>
    );
  }
  return <Image src={`${A}/${pre}-${name}.svg`} alt="" width={size} height={size} unoptimized className="shrink-0" style={box} />;
}

const NAMES = ["dumbbell", "utensils", "biceps", "moon"] as const;

export default function MedicationWholeResponseSection() {
  return (
    <section
      id="whole"
      className="relative w-full overflow-hidden text-white lg:h-[calc(1024*var(--u))]"
      style={{
        "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000976562))",
        "--m": "calc(min(100vw, 500px) / 402)",
      } as React.CSSProperties}
    >
      {/* Desktop (lg+): photo background + copy inside the header container (max-w-360, px-10) */}
      <div className="hidden lg:block">
        <Image src={`${A}/bg.png`} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 z-10">
          <div className="mx-auto h-full max-w-360 px-10">
            <div className="relative h-full">
              <div className="absolute flex flex-col whitespace-nowrap leading-[normal]" style={{ left: 0, top: u(118) }}>
                <h2 className="comprehensive-serif italic" style={{ fontSize: `max(52px, ${u(92)})` }}>Understand</h2>
                <p className="uppercase" style={{ fontSize: `max(22px, ${u(40)})` }}>the whole response.</p>
              </div>

              <p className="absolute uppercase leading-[normal]" style={{ left: 0, top: u(488), width: u(589), fontSize: `max(26px, ${u(48)})` }}>
                Medication isn&apos;t the only thing affecting your health.
              </p>

              <div className="absolute flex flex-col" style={{ left: 0, top: u(732), width: u(376), gap: u(50) }}>
                <p className="leading-[normal]" style={{ width: u(267), fontSize: `max(12px, ${u(16)})` }}>
                  <span className="font-bold">Weight, nutrition, exercise, sleep, </span>
                  and other changes may be happening at the same time.
                </p>
                <div className="flex items-center" style={{ gap: u(25) }}>
                  {NAMES.map((n) => (
                    <Icon key={n} name={n} size={48} px={u} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet (<lg): blue gradient + cut-out photo, copy pinned to the bottom */}
      <div
        className="relative mx-auto flex min-h-[calc(873*var(--m))] max-w-[500px] flex-col justify-end px-[var(--p20)] py-[var(--p64)] lg:hidden"
        style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64) } as React.CSSProperties}
      >
        {/* full-bleed gradient behind the (500px max) column */}
        <div
          className="absolute inset-y-0 -z-10"
          style={{
            left: "calc(50% - 50vw)",
            right: "calc(50% - 50vw)",
            background: "linear-gradient(180deg, #F0FFF2 0%, #91C5EA 28.553%, #2275CE 100%)",
          }}
        />
        <div className="absolute overflow-hidden" style={{ left: m(20), top: 0, width: m(411), height: m(590) }}>
          <Image
            src={`${A}/m-photo.png`}
            alt=""
            width={2400}
            height={1707}
            priority
            sizes="800px"
            className="absolute max-w-none"
            style={{ left: "-101.97%", top: "-0.02%", width: "201.97%", height: "100.03%" }}
          />
        </div>
        <div
          className="absolute"
          style={{ left: m(1), top: m(300.9), width: m(401), height: m(289), background: "linear-gradient(179.9deg, rgba(136,191,232,0) 29.59%, rgb(81,151,218) 98.858%)" }}
        />

        <div className="relative flex flex-col" style={{ gap: m(16) }}>
          <div className="flex flex-col whitespace-nowrap leading-[normal]">
            <p className="comprehensive-serif italic text-white" style={{ fontSize: m(32) }}>Understand</p>
            <p className="uppercase text-[#F5F5F5]" style={{ fontSize: m(24) }}>the whole response.</p>
          </div>
          <div className="flex flex-col" style={{ gap: m(48) }}>
            <p className="leading-[normal] text-[#F5F5F5]" style={{ fontSize: m(20) }}>Medication isn&apos;t the only thing affecting your health.</p>
            <div className="flex flex-col items-center justify-center" style={{ gap: m(32) }}>
              <p className="leading-[normal] text-[#E4E4E4]" style={{ fontSize: m(16) }}>
                <span className="font-bold text-white">Weight, nutrition, exercise, sleep, </span>
                and other changes may be happening at the same time.
              </p>
              <div className="flex items-center justify-center" style={{ gap: m(25) }}>
                {NAMES.map((n) => (
                  <Icon key={n} name={n} size={32} px={m} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
