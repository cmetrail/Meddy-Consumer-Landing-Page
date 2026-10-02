"use client";

import Image from "next/image";

// Figma: desktop node 11279:4257 (1440 wide), mobile node 12115:22943.
// Section "05" — light "recovery" section: header + person photo ringed by
// green outline ellipses and floating green pills describing what improves.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/sleep/recovery";
const GREEN = "#17925A";

const PILLS = [
  { icon: `${A}/icon-moon.svg`, text: "Bedtime becomes\nmore consistent", x: 0, y: 199 },
  { icon: `${A}/icon-bed.svg`, text: "Sleep duration improves", x: 854.8, y: 404 },
  { icon: `${A}/icon-heart.svg`, text: "Resting heart rate improves", x: 68.27, y: 782 },
  { icon: `${A}/icon-energy.svg`, text: "Readiness increases", x: 943.65, y: 1032 },
];

const GRADIENT =
  "linear-gradient(180deg, rgba(250, 249, 245, 0) 43%, rgba(250, 249, 245, 1) 80%)";

// desktop (Figma 11971:14520): coordinates are inside the 1242 x 705 scene
const D = "/sleep/recovery/plan";
const LINES = [
  { src: "v1", x: 392.14, y: 277.34, w: 426.01, h: 188.07, pw: 442.01, ph: 204.07, anim: "meddy-draw-b", closed: "0 0 100% 0" },
  { src: "v2", x: 392.14, y: 502.3, w: 391.41, h: 129.74, pw: 407.41, ph: 145.74, anim: "meddy-draw-c", closed: "0 100% 0 0" },
  { src: "v3", x: 401.43, y: 142.24, w: 416.71, h: 98.2, pw: 432.71, ph: 114.2, anim: "meddy-draw-a", closed: "0 100% 0 0" },
];
const D_PILLS = [
  { icon: "moon", text: "Bedtime becomes\nmore consistent", x: 261.49, y: 118.43, w: 188, h: 47.61, ix: 24, ts: 52, is: 20, gap: 8 },
  { icon: "bed", text: "Sleep duration improves", x: 733.46, y: 240.44, w: 234, h: 36.9, ix: 24, ts: 64, is: 30, gap: 10 },
  { icon: "heart", text: "Resting heart rate improves", x: 299.51, y: 465.62, w: 242, h: 36.9, ix: 24, ts: 54, is: 20, gap: 10 },
  { icon: "bolt", text: "Readiness increases", x: 782.51, y: 614.19, w: 198, h: 36.9, ix: 24, ts: 54, is: 20, gap: 10 },
];

function DPill({ p }: { p: (typeof D_PILLS)[number] }) {
  return (
    <div className="absolute flex items-center bg-[#17925A] pl-[var(--pl)]" style={{ left: u(p.x), top: u(p.y), width: u(p.w), height: u(p.h), borderRadius: u(66), gap: u(p.gap), ["--pl" as string]: u(p.ix) }}>
      <Image src={`${D}/${p.icon}.svg`} alt="" width={p.is} height={p.is} unoptimized className="shrink-0" style={{ width: u(p.is), height: u(p.is) }} />
      <span className="whitespace-pre leading-[1.2] tracking-[0.02em] text-white" style={{ fontSize: `max(9px, ${u(12)})` }}>{p.text}</span>
    </div>
  );
}

export default function SleepRecoverySection() {
  return (
    <section
      id="sleep-recovery"
      className="relative w-full overflow-hidden bg-[#FAF9F5] lg:h-[calc(1074*var(--u))]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000931099))", "--m": "calc(min(100vw, 500px) / 402)" } as React.CSSProperties}
    >
      {/* ─── Desktop: Figma 11971:14520 (1440 x 1074); header copy in the header container, scene centred ─── */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-360 px-10">
          <div className="relative h-full">
            <div className="absolute left-0 flex flex-col" style={{ top: u(73.8), width: u(942), gap: u(8) }}>
              <h2 className="leading-[1.2] text-black" style={{ fontSize: `max(34px, ${u(64)})` }}>
                Find out what’s helping you <span className="comprehensive-serif italic text-[#17925A]">recover</span> and what isn’t
              </h2>
              <p className="leading-[1.416] text-black" style={{ fontSize: `max(14px, ${u(20)})` }}>
                Sleep and recovery don&apos;t happen in isolation. Meddy brings them together with your exercise, nutrition, weight, and other health data to reveal patterns over time.
              </p>
            </div>
            <span
              className="pointer-events-none absolute right-0 select-none font-bold italic leading-none text-[rgba(216,216,216,0.5)]"
              style={{ top: u(85.5), fontSize: u(200), letterSpacing: u(4), transform: "rotate(-0.31deg)" }}
            >
              05
            </span>
          </div>
        </div>

        {/* scene (1242 x 705) centred on the page */}
        <div className="absolute left-1/2 -ml-[calc(621*var(--u))]" style={{ top: u(343.8), width: u(1242), height: u(705.2) }}>
          {LINES.map((l) => (
            <div key={l.src} className="absolute" style={{ left: u(l.x), top: u(l.y), width: u(l.w), height: u(l.h) }}>
              <Image
                src={`${D}/${l.src}.svg`}
                alt=""
                width={Math.round(l.pw)}
                height={Math.round(l.ph)}
                unoptimized
                loading="eager"
                className="absolute max-w-none"
                style={{ left: `${(-8 / l.w) * 100}%`, top: `${(-8 / l.h) * 100}%`, width: `${(l.pw / l.w) * 100}%`, height: `${(l.ph / l.h) * 100}%`, animation: `${l.anim} 5s linear infinite`, ["--closed" as string]: l.closed }}
              />
            </div>
          ))}
          <div className="absolute overflow-hidden" style={{ left: u(369.99), top: 0, width: u(480.58), height: u(656.99) }}>
            <Image src={`${D}/photo.png`} alt="Person recovering, tracked by Meddy" fill priority sizes="520px" className="object-cover" />
          </div>
          <DPill p={D_PILLS[0]} />
          <div className="absolute" style={{ left: u(438.09), top: u(554.08), width: u(327.38), height: u(151.17), background: GRADIENT }} />
          <DPill p={D_PILLS[1]} />
          <DPill p={D_PILLS[2]} />
          <DPill p={D_PILLS[3]} />
        </div>
      </div>

      {/* ─── Mobile / tablet (<lg): Figma 12115:22943 (402 x 838) ─── */}
      <div className="mx-auto flex min-h-[calc(838*var(--m))] max-w-[500px] flex-col items-center px-[var(--p20)] py-[var(--p64)] lg:hidden" style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(48) } as React.CSSProperties}>
        <div className="flex w-full flex-col items-end" style={{ gap: m(8) }}>
          <span className="select-none font-bold italic leading-none text-[rgba(216,216,216,0.5)]" style={{ fontSize: m(120), letterSpacing: m(2.4), transform: "rotate(-0.31deg)", height: m(120.9), display: "flex", alignItems: "center" }}>
            05
          </span>
          <div className="flex w-full flex-col text-black" style={{ gap: m(8) }}>
            <h2 className="leading-[1.2]" style={{ fontSize: m(32) }}>
              Find out what’s helping you <span className="comprehensive-serif italic text-[#17925A]">recover</span> and what isn’t
            </h2>
            <p className="leading-[1.416]" style={{ fontSize: m(16) }}>
              Sleep and recovery don&apos;t happen in isolation. Meddy brings them together with your exercise, nutrition, weight, and other health data to reveal patterns over time.
            </p>
          </div>
        </div>

        <div className="relative" style={{ width: m(234), height: m(319) }}>
          <div className="absolute overflow-hidden" style={{ left: 0, top: 0, width: m(233), height: m(319) }}>
            <Image src={`${D}/m-photo.png`} alt="Person recovering, tracked by Meddy" fill sizes="300px" className="object-cover" />
          </div>
          <div className="absolute" style={{ left: 0, top: m(227), width: m(234), height: m(92), background: GRADIENT }} />
        </div>
      </div>
    </section>
  );
}
