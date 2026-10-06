"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12593:13061 (1440 x 1341) drawn in fixed px; mobile node 12722:8946 (402 x 875) scaled by `m`. Charts are rebuilt from their Figma layers.
const m = (n: number) => `calc(${n} * var(--m))`;
const ease = [0.22, 1, 0.36, 1] as const;

const A = "/weight-loss/progress";

/** svg filling its (positioned) parent, optionally bleeding out by `inset` (Figma stroke padding) */
function Svg({ src, inset = "0" }: { src: string; inset?: string }) {
  return (
    <span className="absolute block" style={{ inset }}>
      <Image src={`${A}/${src}`} alt="" fill unoptimized loading="eager" className="max-w-none" />
    </span>
  );
}

/** 515px axis line, rotated 90deg exactly like Figma */
function VLine({ src, left }: { src: string; left: number }) {
  return (
    <div className="absolute top-0 flex h-[515px] w-0 items-center justify-center" style={{ left }}>
      <div className="flex-none rotate-90">
        <div className="relative h-0 w-[515px]">
          <Svg src={src} inset="-1px 0 0 0" />
        </div>
      </div>
    </div>
  );
}

// chart reveal: lines/areas wipe in left to right, points + labels pop in as the wipe passes them
const DRAW = 1.8;
const VIEW = { once: true, margin: "-120px" } as const;
const wipe = (delay = 0) => ({
  variants: {
    hidden: { clipPath: "inset(-5% 100% -5% -1%)" },
    show: { clipPath: "inset(-5% -1% -5% -1%)", transition: { duration: DRAW, delay, ease: "easeInOut" as const } },
  },
});
const pop = (x: number) => ({
  variants: {
    hidden: { opacity: 0, scale: 0.4 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.3 + (x / 860) * DRAW, ease } },
  },
});
// one trigger per chart: children animate through variants
const CHART = { initial: "hidden", whileInView: "show", viewport: VIEW } as const;

const PT = "absolute whitespace-nowrap text-right text-[16px] font-normal leading-[1.5] text-[#6E7A72]";
const AX = "whitespace-nowrap text-right text-[16px] font-normal uppercase leading-[1.416] text-[#46524B]";

const LEGEND = ["Calories", "Total Steps", "Total Workout Time", "Sleep Duration", "Insulin"] as const;

export default function WeightLossProgressSection() {
  return (
    <section id="weight-loss-progress" className="relative w-full overflow-hidden">
      {/* Full-bleed gradient (Figma #203C31 → #56A284: 118.26deg desktop, 102.95deg mobile) */}
      <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(118.26deg, rgb(32, 60, 49) 0.17%, rgb(86, 162, 132) 99.83%)" }} />
      <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(102.95deg, rgb(32, 60, 49) 0.17%, rgb(86, 162, 132) 99.83%)" }} />

      {/* ===================== DESKTOP: fixed px, content box 1200 ===================== */}
      <div className="relative hidden lg:block">
        <div className="mx-auto w-full max-w-[1200px] py-[120px]">
          <div className="flex flex-col items-center" style={{ gap: 48 }}>
            {/* Header row (164) */}
            <motion.div
              className="flex w-full items-start"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="flex flex-1 flex-col whitespace-nowrap leading-[1.5]">
                <p className="text-[32px] font-medium text-[#D2D2D2]">Know whether you&rsquo;re actually</p>
                <p className="comprehensive-serif text-[64px] italic text-[#F4F4F5]">making progress.</p>
              </div>
              <div className="flex flex-1 flex-col items-end text-right text-[#F4F4F5]" style={{ gap: 8 }}>
                <div className="w-full whitespace-pre-wrap text-[32px] font-medium leading-[1.5]">
                  <p>Look beyond today&rsquo;s </p>
                  <p>number on the scale.</p>
                </div>
                <p className="w-full text-[20px] font-normal leading-[1.5]">
                  See your weight, energy balance, activity, and metabolic markers change over weeks and months—not just day to day.
                </p>
              </div>
            </motion.div>

            {/* Chart card (1213 x 661, 6.5px wider than the content box on each side) */}
            <div className="flex w-[1213px] shrink-0 flex-col items-center justify-center overflow-clip rounded-[8px] bg-[#F8F8F2] p-8" style={{ gap: 16 }}>
              <div className="flex w-[1111.038px] items-center" style={{ height: 30 }}>
                <div className="flex items-center whitespace-nowrap text-[20px] font-medium leading-[1.5] text-[#46524B]" style={{ gap: 10 }}>
                  <p>Weight Progress</p>
                  <p>(16 weeks)</p>
                </div>
              </div>

              <div className="flex items-start justify-center" style={{ gap: 64 }}>
                <div className="flex items-end" style={{ gap: 8 }}>
                  <p className="whitespace-nowrap text-right text-[40px] font-medium leading-[1.5] text-[#46524B]">-20</p>
                  <div className="flex flex-col items-center justify-center py-3">
                    <p className="whitespace-nowrap text-right text-[32px] font-normal leading-[1.416] text-[#46524B]">lbs</p>
                  </div>
                </div>

                <div className="flex items-center" style={{ gap: 8 }}>
                  <div className="flex h-[79px] w-[21px] items-center justify-center">
                    <p className="-rotate-90 whitespace-nowrap text-right text-[14px] font-normal leading-[1.5] text-[#456E52]">Weight (lbs)</p>
                  </div>

                  {/* plot group 928 x 551 — every layer positioned like the Figma grid */}
                  <div className="relative" style={{ width: 928, height: 551 }}>
                    <div className={`${AX} absolute flex items-center`} style={{ left: 37.31, top: 528, gap: 165 }}>
                      <p>Start</p>
                      <p>week 4</p>
                      <p>week 8</p>
                      <p>week 16</p>
                    </div>
                    <VLine src="line74.svg" left={0} />
                    <div className="absolute" style={{ left: 8.72, top: 50, width: 860.953, height: 465 }}>
                      <Svg src="chart-line.svg" inset="-0.22% 0 0 0" />
                    </div>

                    {/* Chart (origin 5.54, 10) */}
                    <motion.div className="absolute" style={{ left: 5.54, top: 10, width: 856.717, height: 416 }} {...CHART}>
                      <motion.p className={PT} style={{ left: 0, top: 0, width: 78.365, height: 29 }} {...pop(0)}>214 lbs</motion.p>
                      <motion.p className={PT} style={{ left: 245.68, top: 86, width: 75.188, height: 29 }} {...pop(245.68)}>207 lbs</motion.p>
                      <motion.p className={PT} style={{ left: 470.19, top: 188, width: 80.483, height: 28 }} {...pop(470.19)}>201 lbs</motion.p>
                      <motion.p className={PT} style={{ left: 779.41, top: 318, width: 77.306, height: 29 }} {...pop(779.41)}>194 lbs</motion.p>
                      <motion.div className="absolute" style={{ left: 44.64, top: 34.09, width: 787.607, height: 352.923 }} {...wipe()}>
                        <Svg src="vector7425.svg" />
                      </motion.div>
                      <motion.div className="absolute" style={{ left: 39.06, top: 34.94, width: 793.505, height: 337.236 }} {...wipe()}>
                        <Svg src="vector7424.svg" inset="-0.74% -0.14% -0.67% 0" />
                      </motion.div>
                      {(
                        [
                          [37.96, 29, 11, "dot-a.svg", "-45.45%"],
                          [255.96, 111, 12, "dot-b.svg", "-45.45% -41.67%"],
                          [488.96, 220, 11, "dot-a.svg", "-45.45%"],
                          [824.96, 364, 11, "dot-a.svg", "-45.45%"],
                        ] as const
                      ).map(([x, y, w, f, inset]) => (
                        <motion.div key={x} className="absolute" style={{ left: x, top: y, width: w, height: 11 }} {...pop(x)}>
                          <Svg src={f} inset={inset} />
                        </motion.div>
                      ))}
                      {/* orange graph sits above the green one */}
                      <motion.div className="absolute" style={{ left: 31.77, top: 88, width: 803.189, height: 328 }} {...wipe(0.15)}>
                        <Svg src="orange.svg" inset="-1.52% -0.62%" />
                      </motion.div>
                    </motion.div>

                    <VLine src="line76.svg" left={871.79} />
                    {[
                      [40, "2300"],
                      [413, "1950"],
                    ].map(([y, t]) => (
                      <div key={t} className="absolute flex items-center" style={{ left: 872.52, top: y as number, gap: 5 }}>
                        <div className="relative h-0 w-[10px] shrink-0">
                          <Svg src="tick.svg" inset="-1px 0 0 0" />
                        </div>
                        <p className="whitespace-nowrap text-right text-[14px] font-normal uppercase leading-[1.416] text-[#B78860]">{t}</p>
                      </div>
                    ))}
                    <div className="absolute flex h-[124px] w-[21px] items-center justify-center" style={{ left: 883.5, top: 191 }}>
                      <p className="rotate-90 whitespace-nowrap text-right text-[14px] font-normal leading-[1.5] text-[#B78860]">Calories (kcal/day)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row (180) */}
            <div className="flex w-full items-end" style={{ gap: 48 }}>
              <div className="flex flex-1 flex-col" style={{ gap: 20 }}>
                <p className="whitespace-nowrap text-[32px] font-medium leading-[1.5] text-[#F4F4F5]">What changed alongside?</p>
                <div className="flex items-center" style={{ gap: 8 }}>
                  {LEGEND.map((item, i) => (
                    <Fragment key={item}>
                      {i > 0 && (
                        <span className="relative block size-2 shrink-0">
                          <Svg src="bullet.svg" />
                        </span>
                      )}
                      <p className="whitespace-nowrap text-[16px] font-normal leading-[1.5] text-[#F4F4F5]">{item}</p>
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-col" style={{ gap: 16 }}>
                <div className="flex flex-col" style={{ gap: 8 }}>
                  <p className="whitespace-nowrap text-[20px] font-normal leading-[1.5] text-[#D2D2D2]">Calories</p>
                  <div className="flex items-center" style={{ gap: 8 }}>
                    <p className="whitespace-nowrap text-[64px] font-medium leading-[1.5] text-[#F4F4F5]">2,300</p>
                    <span className="relative block size-12 shrink-0">
                      <Svg src="arrow.svg" />
                    </span>
                    <p className="whitespace-nowrap text-[64px] font-medium leading-[1.5] text-[#F4F4F5]">1,950</p>
                  </div>
                </div>
                <p className="whitespace-nowrap text-[20px] font-normal leading-[1.5] text-[#D2D2D2]">Kcal/day across the same 16 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE (<lg): Figma 12722:8946, 402 x 875 ===================== */}
      <div className="relative lg:hidden" style={{ "--m": "calc(min(100vw, 500px) / 402)", minHeight: m(875) } as React.CSSProperties}>
        <div
          className="mx-auto flex w-full max-w-[500px] flex-col justify-center px-[var(--p20)] py-[var(--p64)]"
          style={{ minHeight: m(875), gap: m(32), ["--p20" as string]: m(20), ["--p64" as string]: m(64) } as React.CSSProperties}
        >
          <motion.div className="flex flex-col" style={{ gap: m(16) }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 0.8, ease }}>
            <p className="w-full font-medium text-[#D2D2D2]" style={{ fontSize: m(24), lineHeight: 1.5 }}>
              Know whether you&rsquo;re actually <span className="comprehensive-serif italic text-[#F4F4F5]">making progress.</span>
            </p>
            <p className="leading-[1.5] text-[#F4F4F5]" style={{ fontSize: m(14), width: m(344) }}>
              See your weight, energy balance, activity, and metabolic markers change over weeks and months not just day to day.
            </p>
          </motion.div>

          <div className="flex flex-col" style={{ gap: m(24) }}>
            <div className="flex flex-col bg-[#F8F8F2] p-[var(--p)]" style={{ gap: m(16), borderRadius: m(12), ["--p" as string]: m(16) } as React.CSSProperties}>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center whitespace-nowrap text-right font-normal leading-[1.5] text-[#46524B]" style={{ gap: m(4), fontSize: m(12) }}>
                  <p>Weight Progress</p>
                  <p>(16 weeks)</p>
                </div>
                <p className="whitespace-nowrap text-right font-bold leading-[0] text-[#46524B]" style={{ fontSize: m(32) }}>
                  <span className="font-medium leading-[1.5]">-20</span>
                  <span className="leading-[1.416]"> </span>
                  <span className="font-normal leading-[1.416]">lbs</span>
                </p>
              </div>

              <div className="flex w-full items-center" style={{ gap: m(8) }}>
                <div className="flex shrink-0 items-center justify-center" style={{ width: m(12), height: m(45) }}>
                  <p className="-rotate-90 whitespace-nowrap text-right font-normal leading-[1.5] text-[#456E52]" style={{ fontSize: m(8) }}>Weight (lbs)</p>
                </div>

                <div className="relative shrink-0" style={{ width: m(310), height: m(283) }}>
                  <div className="absolute flex items-center justify-between whitespace-nowrap text-right font-normal uppercase leading-[1.416] text-[#46524B]" style={{ left: 0, top: m(270.78), width: m(266.79), height: m(12.221), fontSize: m(8) }}>
                    <p>Start</p>
                    <p>week 4</p>
                    <p>week 8</p>
                    <p>week 16</p>
                  </div>
                  <div className="absolute" style={{ left: 0, top: m(30.12), width: m(266.6), height: m(236.788) }}>
                    <Svg src="m/chart-line.svg" inset="-0.42% 0 0 0" />
                  </div>
                  <div className="absolute top-0 flex w-0 items-center justify-center" style={{ left: m(266.6), height: m(267.436) }}>
                    <div className="flex-none rotate-90" style={{ width: m(267.436) }}>
                      <div className="relative h-0 w-full">
                        <Svg src="m/line76.svg" inset="-1px 0 0 0" />
                      </div>
                    </div>
                  </div>
                  {(
                    [
                      [35.89, "2300"],
                      [241.46, "1950"],
                    ] as const
                  ).map(([y, t]) => (
                    <div key={t} className="absolute flex items-center" style={{ left: m(266.6), top: m(y), height: m(10.386), gap: m(5) }}>
                      <div className="relative h-0 shrink-0" style={{ width: m(10) }}>
                        <Svg src="m/tick.svg" inset="-1px 0 0 0" />
                      </div>
                      <p className="whitespace-nowrap text-right font-normal uppercase leading-[1.416] text-[#B78860]" style={{ fontSize: m(10) }}>{t}</p>
                    </div>
                  ))}

                  {/* Chart (origin 1.89, 83; 263.03 wide) */}
                  <motion.div className="absolute" style={{ left: m(1.89), top: m(83), width: m(263.03), height: m(167.1) }} {...CHART}>
                    {(
                      [
                        ["214 lbs", 0, 0, 34.43, 12],
                        ["207 lbs", 70.62, 35, 37.07, 11],
                        ["201 lbs", 140.35, 79, 35.31, 12],
                        ["194 lbs", 229.5, 139, 33.54, 12],
                      ] as const
                    ).map(([t, x, y, w, h]) => (
                      <motion.p key={t} className="absolute whitespace-nowrap text-right font-normal leading-[1.5] text-[#6E7A72]" style={{ left: m(x), top: m(y), width: m(w), height: m(h), fontSize: m(8) }} {...pop((x / 263) * 860)}>
                        {t}
                      </motion.p>
                    ))}
                    <motion.div className="absolute" style={{ left: m(13.57), top: m(14.69), width: m(237.27), height: m(149.993) }} {...wipe()}>
                      <Svg src="m/vector7425.svg" />
                    </motion.div>
                    <motion.div className="absolute" style={{ left: m(11.92), top: m(15.03), width: m(239.04), height: m(141.83) }} {...wipe()}>
                      <Svg src="m/vector7424.svg" inset="-0.74% -0.23% -0.63% 0" />
                    </motion.div>
                    {(
                      [
                        [10.6, 12.65],
                        [77.15, 45.3],
                        [146.93, 89.17],
                        [247.07, 154.14],
                      ] as const
                    ).map(([x, y]) => (
                      <motion.div key={x} className="absolute" style={{ left: m(x), top: m(y), width: m(4.2), height: m(4.422) }} {...pop((x / 263) * 860)}>
                        <Svg src="m/dot.svg" inset="-47.32% -49.83%" />
                      </motion.div>
                    ))}
                    <motion.div className="absolute" style={{ left: m(9.7), top: m(19.49), width: m(243.17), height: m(147.613) }} {...wipe(0.15)}>
                      <Svg src="m/orange.svg" inset="-1.42% -0.86%" />
                    </motion.div>
                  </motion.div>

                  <div className="absolute flex items-center justify-center" style={{ left: m(274), top: m(111), width: m(12), height: m(53) }}>
                    <p className="rotate-90 whitespace-nowrap text-right font-normal leading-[1.5] text-[#B78860]" style={{ fontSize: m(8) }}>Calories (kcal)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center" style={{ gap: m(8) }}>
              <p className="whitespace-nowrap font-normal leading-[1.5] text-[#D2D2D2]" style={{ fontSize: m(16) }}>Calories</p>
              <div className="flex items-center" style={{ gap: m(8) }}>
                <p className="whitespace-nowrap font-medium leading-[1.5] text-[#F4F4F5]" style={{ fontSize: m(32) }}>2,300</p>
                <span className="relative block shrink-0" style={{ width: m(26), height: m(11) }}>
                  <Svg src="m/arrow.svg" inset="-9.09% -3.85%" />
                </span>
                <p className="whitespace-nowrap font-medium leading-[1.5] text-[#F4F4F5]" style={{ fontSize: m(32) }}>1,950</p>
              </div>
              <p className="whitespace-nowrap font-normal leading-[1.5] text-[#D2D2D2]" style={{ fontSize: m(16) }}>Kcal/day across the same 16 weeks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
