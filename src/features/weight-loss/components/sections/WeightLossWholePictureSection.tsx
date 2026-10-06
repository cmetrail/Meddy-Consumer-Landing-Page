"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12593:13009 (1440 x 1323), drawn in fixed px; mobile node 12722:8904 (402 x 874), scaled by `m`.
const ease = [0.22, 1, 0.36, 1] as const;
const m = (n: number) => `calc(${n} * var(--m))`;

const METRICS = [
  { value: "190", unit: "lbs", label: null, title: "Body", sub: "Weight • BMI • Trends" },
  { value: "5.9", unit: "%", label: "A1C", title: "Metabolic health", sub: "Glucose • A1C • Lipids • Other physician-directed biomarkers" },
] as const;

const W = "/weight-loss/whole";

// Figma 12593:13009 — desktop is drawn in fixed px (1440 frame, 1200 content box at x=120, y=120)
const M_GREEN = [
  { icon: "utensils.svg", title: "Nutrition", sub: "Calories • Macros • Hydration", x: 49, y: 331.5, w: 233 },
  { icon: "footprints.svg", title: "Activity", sub: "Workouts • Cardio • Daily activity", x: 117, y: 465.5, w: 253 },
  { icon: "moon.svg", title: "Sleep", sub: "Sleep quality • Consistency • Recovery", x: 39, y: 599.5, w: 286 },
] as const;

const D_GREEN = [
  { icon: "utensils.svg", title: "Nutrition", sub: "Calories • Macros • Hydration", style: { left: "calc(50% - 600px + 733px)", top: 340 }, w: 335, gap: 61 },
  { icon: "footprints.svg", title: "Activity", sub: "Workouts • Cardio • Daily activity", style: { left: "calc(50% - 600px + 857px)", top: 536 }, w: 313, gap: 15 },
  { icon: "moon.svg", title: "Sleep", sub: "Sleep quality • Consistency • Recovery", style: { left: "calc(50% - 600px + 103px)", top: 467 }, w: 352, gap: 15 },
] as const;

function DMetric({ m }: { m: (typeof METRICS)[number] }) {
  const wide = m.title === "Metabolic health";
  return (
    <div className="flex items-center self-stretch overflow-hidden rounded-[26px] border border-white/45 bg-white/20 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-[30px]" style={{ width: wide ? 448 : 396 }}>
      <div className="flex w-full items-center" style={{ gap: 31 }}>
        <div className="relative shrink-0" style={{ width: 126, height: 126 }}>
          <Image src={`${W}/ring.svg`} alt="" width={126} height={126} unoptimized className="absolute inset-0" />
          <div className="absolute flex flex-col items-center justify-center text-center" style={{ left: 17, top: 20, width: 92, height: 85 }}>
            <span className={`font-normal leading-[normal] text-[#F4F4F5] ${m.label ? "whitespace-nowrap" : "w-full"}`}>
              <span className="text-[36px]">{m.value}</span>
              <span className="text-[48px]"> </span>
              <span className="text-[24px] text-[#D2D2D2]">{m.unit}</span>
            </span>
            {m.label && <span className="w-full text-[20px] font-normal leading-[normal] text-[#D2D2D2]">{m.label}</span>}
          </div>
        </div>
        <div className="flex flex-col justify-between leading-[1.5]" style={{ height: 106, width: wide ? 259 : 207 }}>
          <span className="comprehensive-serif text-[32px] italic text-[#F4F4F5]">{m.title}</span>
          <span className="text-[16px] font-normal text-white" style={{ width: wide ? 284 : 207 }}>{m.sub}</span>
        </div>
      </div>
    </div>
  );
}

export default function WeightLossWholePictureSection() {
  return (
    <section id="weight-loss-whole-picture" className="relative w-full overflow-hidden bg-white">
      {/* ===================== DESKTOP: fixed px, content box 1200 x 1083 ===================== */}
      <div className="relative hidden lg:block">
        {/* full-bleed photo pinned to the bottom (aspect 1672:941) */}
        <div className="absolute inset-x-0 bottom-0" style={{ aspectRatio: "1672 / 941" }}>
          <Image src={`${W}/bg.png`} alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <div className="relative mx-auto w-full max-w-[1200px] py-[120px]">
          <div className="relative" style={{ height: 1083 }}>
            <motion.div
              className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap"
              style={{ top: 0, width: 811, gap: 16 }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="flex flex-col items-center" style={{ gap: 8 }}>
                <h2 className="text-[64px] leading-[1.5]">
                  <span className="comprehensive-serif italic text-[#6E7A72]">See the </span>
                  <span className="comprehensive-serif italic text-[#17925A]">whole picture.</span>
                </h2>
                <p className="text-[32px] font-medium leading-[1.5] text-[#6E7A72]">Your weight doesn&rsquo;t change in isolation.</p>
              </div>
              <p className="text-center text-[20px] font-normal leading-[1.5] text-[#6E7A72]">Meddy brings the factors that influence your progress together in one place.</p>
            </motion.div>

            {D_GREEN.map((g) => (
              <div
                key={g.title}
                className="absolute flex items-center overflow-hidden rounded-[12px] bg-[rgba(23,146,90,0.2)] p-4"
                style={{ ...g.style, height: 99, width: g.w, gap: g.gap }}
              >
                <Image src={`${W}/${g.icon}`} alt="" width={48} height={48} unoptimized className="shrink-0" style={{ width: 48, height: 48 }} />
                <div className="flex flex-col justify-between leading-[1.5] text-[#46524B]" style={{ height: 67 }}>
                  <span className="comprehensive-serif text-[32px] italic">{g.title}</span>
                  <span className="whitespace-nowrap text-[14px] font-normal">{g.sub}</span>
                </div>
              </div>
            ))}

            <div className="absolute left-1/2 flex -translate-x-1/2 items-center" style={{ top: 925, width: 912, gap: 16 }}>
              {METRICS.map((m) => (
                <DMetric key={m.title} m={m} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE (<lg): Figma 12722:8904, 402 x 874 ===================== */}
      <div className="relative overflow-hidden bg-[#F5F5F0] lg:hidden" style={{ "--m": "calc(min(100vw, 500px) / 402)", height: m(874) } as React.CSSProperties}>
        <div className="absolute inset-x-0 bottom-0" style={{ height: m(226) }}>
          <Image src={`${W}/bg.png`} alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <div className="relative mx-auto h-full" style={{ width: m(402) }}>
          <div className="absolute flex flex-col items-center text-center" style={{ left: m(20), top: m(64), width: m(362), gap: m(25) }}>
            <div className="flex w-full flex-col items-center" style={{ gap: m(10) }}>
              <h2 className="w-full leading-[1.5]" style={{ fontSize: m(32) }}>
                <span className="comprehensive-serif italic text-[#6E7A72]">See the </span>
                <span className="comprehensive-serif italic text-[#17925A]">whole picture.</span>
              </h2>
              <p className="w-full leading-[1.5] text-[#6E7A72]" style={{ fontSize: m(18) }}>Your weight doesn&rsquo;t change in isolation.</p>
            </div>
            <p className="w-full leading-[1.5] text-[#6E7A72]" style={{ fontSize: m(14) }}>Meddy brings the factors that influence your progress together in one place.</p>
          </div>

          {M_GREEN.map((g) => (
            <div key={g.title} className="absolute flex items-start bg-[rgba(23,146,90,0.2)] p-[var(--p)]" style={{ left: m(g.x), top: m(g.y), width: m(g.w), height: m(71), gap: m(10), borderRadius: m(12), ["--p" as string]: m(16) }}>
              <Image src={`${W}/${g.icon}`} alt="" width={24} height={24} unoptimized className="shrink-0" style={{ width: m(24), height: m(24) }} />
              <div className="flex flex-col leading-[1.5] text-[#46524B]">
                <span className="comprehensive-serif italic" style={{ fontSize: m(14) }}>{g.title}</span>
                <span className="whitespace-nowrap" style={{ fontSize: m(12) }}>{g.sub}</span>
              </div>
            </div>
          ))}

          {METRICS.map((mt, i) => {
            const wide = i === 1;
            return (
              <div
                key={mt.title}
                className="absolute flex items-center overflow-hidden bg-white/20 p-[var(--p)] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-[11px]"
                style={{ left: wide ? "50%" : m(35), top: m(wide ? 783.5 : 761.5), gap: m(wide ? 8 : 10), borderRadius: m(9.721), ["--p" as string]: m(8) }}
              >
                <div className="relative shrink-0" style={{ width: m(47.112), height: m(47.112) }}>
                  <Image src="/weight-loss/whole/m/ring.svg" alt="" width={48} height={48} unoptimized className="absolute inset-0 h-full w-full" />
                  <div className="absolute flex flex-col items-center justify-center text-center" style={{ left: m(6.356), top: m(7.478), width: m(wide ? 33 : 34.399), height: m(32) }}>
                    <span className={`w-full font-normal leading-[0] text-[#F4F4F5] ${mt.label ? "whitespace-nowrap" : ""}`}>
                      <span style={{ fontSize: m(12), lineHeight: 1.5 }}>{mt.value}</span>
                      <span style={{ fontSize: m(wide ? 13.461 : 17.947) }}> </span>
                      <span className="text-[#D2D2D2]" style={{ fontSize: m(wide ? 8.974 : 8), lineHeight: 1.2 }}>{mt.unit}</span>
                    </span>
                    {mt.label && <span className="w-full font-normal leading-[normal] text-[#D2D2D2]" style={{ fontSize: m(7.478) }}>{mt.label}</span>}
                  </div>
                </div>
                <div className="flex flex-col leading-[1.5]">
                  <span className="comprehensive-serif whitespace-nowrap italic text-[#F4F4F5]" style={{ fontSize: m(12) }}>{mt.title}</span>
                  <span className="font-normal text-white" style={{ fontSize: m(8), width: m(wide ? 106.189 : 62) }}>{mt.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
