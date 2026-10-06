"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Figma: desktop node 12593:13250 (1440 x 1021, fixed px, content box 1200 / padding 120). Mobile keeps its earlier layout (no mobile frame supplied).
const ease = [0.22, 1, 0.36, 1] as const;

type DMarker = { icon: string; lines: string[]; tight: boolean; inset?: string; bleed?: string };

// Figma card contents: icons are the exported lucide layers; `tight` cards tuck the icon 7px into the label box.
const D_MARKERS: DMarker[] = [
  { icon: "gauge", lines: ["Weight & BMI"], tight: false, inset: "8.42% 8.42% 8.24% 8.24%", bleed: "-2.5%" },
  { icon: "droplet", lines: ["Blood Sugar", "& A1C"], tight: true },
  { icon: "tubes", lines: ["Cholesterol & Triglycerides"], tight: true },
  { icon: "heart", lines: ["Blood Pressure"], tight: false, inset: "16.6% 8.33% 12.5% 8.33%", bleed: "-2.94% -2.5%" },
  { icon: "foot", lines: ["Activity & Fitness"], tight: true },
  { icon: "moon", lines: ["Sleep & Recovery"], tight: true },
];

function DMarkerCard({ m, mobile = false }: { m: DMarker; mobile?: boolean }) {
  const icon = mobile ? 36 : 48;
  // glass: no fill (blends with the photo), 1px highlight edges + soft inner shadow (dark top-left, light bottom-right)
  return (
    <div
      className={`flex h-[118px] w-[150px] shrink-0 flex-col items-center justify-center overflow-clip rounded-[15px] border border-solid border-b-white/20 border-l-white/30 border-r-white/20 border-t-white/30 shadow-[inset_8px_8px_16px_-4px_rgba(0,0,0,0.14),inset_-8px_-8px_16px_-4px_rgba(255,255,255,0.06)] backdrop-blur-[12px] ${m.tight ? "py-[2px]" : "py-[12px]"}`}
    >
      <div className="flex w-full flex-col items-center">
        <div className={`relative shrink-0 overflow-clip ${m.tight ? "mb-[-7px]" : ""}`} style={{ width: icon, height: icon }}>
          {m.inset ? (
            <span className="absolute block" style={{ inset: m.inset }}>
              <span className="absolute block" style={{ inset: m.bleed }}>
                <Image src={`/weight-loss/markers/icons/${m.icon}.svg`} alt="" fill unoptimized className="max-w-none" />
              </span>
            </span>
          ) : (
            <Image src={`/weight-loss/markers/icons/${m.icon}.svg`} alt="" fill unoptimized className="max-w-none" />
          )}
        </div>
        {/* label wraps onto a new line when it is wider than the card */}
        <div className="flex w-full items-center justify-center p-[10px]">
          <div className={`text-center font-normal text-[#ACACAC] ${mobile ? "text-[14px]" : "text-[16px]"}`}>
            {m.lines.map((l) => (
              <p key={l} className={mobile ? "leading-[1.5]" : "leading-[1.4163]"}>
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeightLossHealthMarkersSection() {
  return (
    <section id="weight-loss-markers" className="relative w-full overflow-hidden bg-[#E4FAE1]">
      {/* Full-bleed photo (Figma: 1440 x 1024 rectangle, 1px above the 1021 frame) */}
      <div className="absolute inset-0 hidden lg:bottom-auto lg:-top-px lg:block lg:h-[1024px]">
        <Image src="/weight-loss/markers/bg.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* ===================== DESKTOP: fixed px, content box 1200 (Figma 12593:13250) ===================== */}
      <div className="relative hidden lg:block">
        <div className="mx-auto w-full max-w-[1200px] py-[120px]">
          <div className="flex flex-col" style={{ gap: 48 }}>
            {/* Header row (272) */}
            <motion.div
              className="flex w-full items-center justify-between"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="flex shrink-0 flex-col leading-[1.5]" style={{ width: 507, gap: 8 }}>
                <div className="flex w-full flex-col items-start whitespace-nowrap">
                  <p className="comprehensive-serif text-[64px] italic text-[#F4F4F5]">Improve the health</p>
                  <p className="text-[40px] font-medium text-[#ACACAC]">behind the number.</p>
                </div>
                <p className="w-full text-[20px] font-normal text-[#ACACAC]">Weight is one measure. Metabolic health is the bigger picture.</p>
              </div>
              <p className="shrink-0 text-right text-[48px] font-extrabold uppercase leading-[1.4163] text-[#F4F4F5]" style={{ width: 266, height: 272 }}>
                More than weight loss.
              </p>
            </motion.div>

            {/* Markers block (522 x 461) */}
            <motion.div
              className="flex flex-col items-start"
              style={{ width: 522, gap: 45 }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              <p className="shrink-0 text-[20px] font-normal leading-[1.4163] text-[#ACACAC]" style={{ width: 476 }}>
                Follow the markers that help you and your physician understand how your health is changing.
              </p>

              <div className="flex w-full flex-col items-start" style={{ gap: 22 }}>
                {[D_MARKERS.slice(0, 3), D_MARKERS.slice(3)].map((row, i) => (
                  <div key={i} className="flex w-full items-center" style={{ gap: 33 }}>
                    {row.map((m) => (
                      <DMarkerCard key={m.icon} m={m} />
                    ))}
                  </div>
                ))}
              </div>

              <Link
                href="/what-we-test"
                className="flex shrink-0 items-center justify-center rounded-[49px] bg-white px-6 py-4 text-[20px] font-normal leading-[normal] text-[#17925A] transition-opacity hover:opacity-90"
              >
                Explore What We Test
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE (<lg): Figma 12722:9118, 402 x 868 ===================== */}
      <div className="relative lg:hidden" style={{ ["--m" as string]: "calc(min(100vw, 500px) / 402)" } as React.CSSProperties}>
        {/* photo: base cover for wide phones + the exact Figma window (1381 x 980 box, 749px off to the left) */}
        <div className="absolute inset-0">
          <Image src="/weight-loss/markers/bg.png" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: "73% 50%" }} />
        </div>
        <div className="absolute overflow-hidden" style={{ left: "calc(-749 * var(--m))", top: "50%", width: "calc(1381 * var(--m))", height: "calc(980 * var(--m))", transform: "translateY(-50%)" }}>
          <Image src="/weight-loss/markers/bg.png" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>

        <div className="relative mx-auto flex w-full max-w-[500px] flex-col px-5 py-16" style={{ gap: 32 }}>
          <div className="flex flex-col" style={{ gap: 24 }}>
            <div className="flex flex-col" style={{ gap: 30 }}>
              <div className="w-[261px] whitespace-pre-wrap italic leading-[1.5] text-[#F4F4F5]">
                <p className="comprehensive-serif whitespace-nowrap text-[32px]">Improve the health </p>
                <p className="text-[24px] font-medium not-italic">Behind the number.</p>
              </div>
              <p className="w-full text-[16px] font-normal leading-[1.5] text-[#F4F4F5]">Weight is one measure. Metabolic health is the bigger picture.</p>
            </div>
            <div className="flex w-full flex-col items-end justify-center">
              <p className="w-[206px] text-right text-[24px] font-bold uppercase leading-[1.5] text-[#F4F4F5]">More than weight loss</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center" style={{ gap: 24 }}>
            <div className="grid grid-cols-[150px_150px] justify-center" style={{ gap: 16 }}>
              {D_MARKERS.map((m) => (
                <DMarkerCard key={m.icon} m={m} mobile />
              ))}
            </div>
            <Link
              href="/what-we-test"
              className="flex shrink-0 items-center justify-center rounded-[49px] bg-white px-5 py-3 text-[16px] font-normal leading-[normal] text-[#17925A] transition-opacity hover:opacity-90"
            >
              Explore What We Test
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
