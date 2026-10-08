"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Figma: desktop node 12688:9067 (1440 x 969). Full-bleed photo + dark fade rising from the bottom, the "See what matters…"
// headline (mixed sizes), then a glass "Nutrition" card (4 readouts + blood-pressure chart) next to a short paragraph.
// The card is drawn from the Figma layers (grid lines, chart graphic, ticks); the plot stretches with the card width.
// Mobile: node 12765:14862 (402 x 845) — 2x2 readouts, 297px-wide plot with a 232px chart graphic, stacked paragraph.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/how-it-works/signal";

const STATS = [
  { label: "Sleep", value: "7.6 hrs", delta: "+ 1.2 hrs", down: false, h: 38 },
  { label: "Nutrition (mg/day)", value: "2,300", delta: "-18% sodium intake", down: true, h: 39 },
  { label: "Activity (steps/day)", value: "8,200", delta: "+ 2,400 daily steps", down: false, h: 37 },
  { label: "Recovery", value: "82", delta: "+ 14 pts", down: false, h: 37 },
];

const Y_TICKS = [180, 160, 140, 120, 100, 80, 60];
const MONTHS = ["Jan", "Apr", "Jul", "Oct"];
// plot grid lines (top one is 19px tall, the rest 18px)
const GRID = ["grid-a.svg", "grid-b.svg", "grid-c.svg", "grid-c.svg", "grid-c.svg", "grid-c.svg", "grid-c.svg"];

// Each branch starts beneath its metric and joins the same graph inlet.
function SignalMetrics({ mobile = false, reducedMotion }: { mobile?: boolean; reducedMotion: boolean }) {
  const height = mobile ? 206 : 140;
  const paths = mobile
    ? ["M25 70 V78 H2 V174 Q2 190 18 190 H54 V206", "M75 70 V78 H98 V174 Q98 190 82 190 H54 V206", "M25 156 V174 Q25 190 41 190 H54 V206", "M75 156 V174 Q75 190 59 190 H54 V206"]
    : [12.5, 37.5, 62.5, 87.5].map(x => `M${x} 90 V106 Q${x} 122 ${x < 53 ? x + 8 : x - 8} 122 H53 V140`);
  const lineTiming = (i: number) => ({ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 1.55 + i * 0.12, ease });

  return (
    <div className="relative w-full" style={{ height }} data-signal-metrics>
      <div className={`grid ${mobile ? "grid-cols-2 gap-x-8 gap-y-4" : "grid-cols-4 gap-x-3"}`}>
        {STATS.map((s, i) => (
          <motion.div key={s.label} className="flex min-w-0 flex-col items-center text-[#111110]"
            style={{ height: mobile ? 70 : 90, gap: 8 }}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : i * 0.15, ease } } }}>
            <div className="flex flex-col items-center">
              <p className={`whitespace-nowrap font-normal leading-[1.416] ${mobile ? "text-[10px]" : "text-[12px]"}`}>{s.label}</p>
              <p className={`whitespace-nowrap font-semibold leading-[1.416] ${mobile ? "text-[20px]" : "text-[32px]"}`}>{s.value}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`relative block shrink-0 ${mobile ? "size-3" : "size-[19.703px]"}`} style={s.down ? { transform: "scaleY(-1)" } : undefined}>
                <Image src={`${A}/${mobile ? "m/trend-up.svg" : "trend.svg"}`} alt="" fill unoptimized />
              </span>
              <p className="whitespace-nowrap text-[10px] font-normal leading-[1.416]">{s.delta}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" fill="none">
        {paths.map((d, i) => (
          <motion.path key={d} d={d} stroke="#d8f3ff" strokeWidth="1" vectorEffect="non-scaling-stroke"
            variants={{ hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 }, show: { clipPath: "inset(0 0 0% 0)", opacity: 0.85, transition: lineTiming(i) } }} />
        ))}
        {STATS.map((s, i) => (
          <motion.ellipse key={s.label} cx={mobile ? (i % 2 === 0 ? 25 : 75) : 12.5 + i * 25} cy={mobile ? (i < 2 ? 70 : 156) : 90} rx={mobile ? 0.8 : 0.4} ry="2.5" fill="#d8f3ff"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: lineTiming(i) } }} />
        ))}
      </svg>
    </div>
  );
}

export default function HowItWorksSignalSection() {
  const reducedMotion = useReducedMotion();
  const timing = (duration: number, delay: number) => ({
    duration: reducedMotion ? 0 : duration,
    delay: reducedMotion ? 0 : delay,
    ease,
  });
  // Four metrics connect before the shared trend and result appear.
  const expansion = {
    hidden: { height: 0, marginTop: 0 },
    show: { height: "auto", marginTop: 0, transition: timing(0.8, 0.8) },
  };
  const scaffold = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: timing(0.8, 2.2) },
  };
  const chart = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    show: { clipPath: "inset(0 0% 0 0)", transition: { ...timing(1.7, 3.0), ease: "linear" as const } },
  };
  const result = {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: timing(0.45, 4.8) },
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* photo: 1722 wide (141px bleed each side), centred; covers the section on mobile */}
      <div className="pointer-events-none absolute top-0 lg:hidden" style={{ left: "calc(50% + 35.5px)", width: 1605, height: 903, transform: "translateX(-50%)" }}>
        <Image src={`${A}/bg.png`} alt="" fill priority sizes="1605px" className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{ left: -141, right: -141, top: "calc(50% + 0.7px)", transform: "translateY(-50%)", aspectRatio: "1672 / 941", minHeight: "100%" }}
      >
        <Image src={`${A}/bg.png`} alt="" fill priority sizes="1722px" className="object-cover" />
      </div>
      {/* dark fade rising from the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[828px] opacity-60 lg:h-[969px]"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 15.937%, #030C16 100%)" }}
      />

      {/* same container as the header */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-8 px-5 py-16 lg:gap-12 lg:px-10 lg:py-[120px]">
        <motion.h2
          className="w-full max-w-[787px] whitespace-pre-wrap font-normal leading-[0] text-[#111110]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="block text-[0px]">
            <span className="text-[32px] font-medium leading-[1.5] lg:text-[56px]">See what</span>
            <span className="text-[32px] leading-[normal] lg:text-[96px]"> </span>
            <span className="comprehensive-serif text-[32px] italic leading-[1.5] text-white lg:text-[104px] lg:leading-[1.288]">matters</span>
            <span className="comprehensive-serif text-[32px] italic leading-[normal] text-white lg:text-[96px]"> </span>
            <span className="text-[32px] font-medium leading-[1.5] lg:text-[56px]">with less noise and more </span>
          </span>
          <span className="block text-[32px] font-medium leading-[1.5] lg:text-[56px]">signal</span>
        </motion.h2>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-end lg:gap-12">
          {/* Nutrition card */}
          <motion.div
            className="hidden min-w-0 flex-1 flex-col rounded-[8.226px] border border-solid border-white bg-white/10 p-[16.452px] backdrop-blur-[25px] lg:flex"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1 },
            }}
          >
            <SignalMetrics reducedMotion={!!reducedMotion} />

            {/* chart */}
            <motion.div className="relative w-full overflow-hidden" variants={expansion}>
              <motion.span aria-hidden="true" variants={scaffold} className="pointer-events-none absolute top-0 h-[42px] border-l border-dashed border-[#d8f3ff]" style={{ left: "53%" }} />
              <div className="flex w-full flex-col items-start justify-center">
                <motion.p variants={scaffold} className="whitespace-nowrap text-[12px] font-normal leading-[1.5] text-[#111110]">Blood pressure (mmHg)</motion.p>
                <div className="flex h-[228px] w-full items-end">
                  {/* y axis */}
                  <motion.div variants={scaffold} className="flex h-full shrink-0 flex-col items-start justify-center pb-[24px]" style={{ gap: 6 }}>
                    <div className="h-[15px] w-[33px] shrink-0" />
                    <div className="flex h-[189px] flex-col items-center overflow-clip whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]" style={{ gap: 12 }}>
                      {Y_TICKS.map((t) => (
                        <p key={t}>{t}</p>
                      ))}
                    </div>
                  </motion.div>
  
                  {/* plot */}
                  <div className="flex h-full min-w-0 flex-1 flex-col items-start pt-[12px]">
                    <div className="relative flex min-h-px w-full flex-1 flex-col items-start justify-between">
                      {GRID.map((g, i) => (
                        <motion.div variants={scaffold} key={i} className={`relative w-full shrink-0 ${i === 0 ? "h-[19px]" : "h-[18px]"}`}>
                          <Image src={`${A}/${g}`} alt="" fill unoptimized className="max-w-none" />
                        </motion.div>
                      ))}
                      <motion.svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 192" preserveAspectRatio="none" fill="none" variants={scaffold}>
                        <path d="M50.3 0 V87" stroke="#d8f3ff" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                      </motion.svg>
                      {/* chart graphic: 480 x 103.5 at (32.5, 71.85) of the 527px plot */}
                      <motion.div
                        className="absolute"
                        style={{ left: "6.18%", top: 71.85, width: "91.2%", height: 103.5 }}
                        variants={chart}
                      >
                        <span className="absolute block" style={{ inset: "0 0 -0.42% 0" }}>
                          <Image src={`${A}/chart.svg`} alt="Blood pressure trend from 138/88 to 124/80" fill unoptimized className="max-w-none" />
                        </span>
                      </motion.div>
                      <div className="pointer-events-none absolute inset-0 text-[12px] font-normal leading-[1.5] text-black">
                        <motion.p variants={scaffold} className="absolute whitespace-nowrap" style={{ left: 15.55, top: 55.84 }}>138/88</motion.p>
                        <motion.p variants={result} className="absolute right-0 whitespace-nowrap origin-right" style={{ top: 73.84 }}>124/80 mmHg</motion.p>
                      </div>
                    </div>
                    {/* x axis */}
                    <div className="flex w-full shrink-0 items-start justify-between">
                      {MONTHS.map((m, i) => (
                        <motion.div variants={{
                          hidden: { opacity: 0, y: 3 },
                          show: { opacity: 1, y: 0, transition: timing(0.35, 2.2 + i * 0.18) },
                        }} key={m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                          <span className="block h-[8px] w-px bg-[#111110]" />
                          <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile card (Figma 12765:14963) */}
          <motion.div
            className="flex w-full flex-col rounded-[8.226px] border border-solid border-white bg-white/10 p-4 backdrop-blur-[25px] lg:hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1 },
            }}
          >
            <SignalMetrics mobile reducedMotion={!!reducedMotion} />

            <motion.div className="relative w-full overflow-hidden" variants={expansion}>
              <motion.span aria-hidden="true" variants={scaffold} className="pointer-events-none absolute top-0 h-[42px] border-l border-dashed border-[#d8f3ff]" style={{ left: "54%" }} />
              <div className="flex w-full flex-col items-start justify-center" style={{ gap: 8 }}>
                <motion.p variants={scaffold} className="whitespace-nowrap text-[12px] font-normal leading-[1.5] text-[#111110]">Blood pressure (mmHg)</motion.p>
                <div className="flex h-[228px] w-full items-end">
                  <motion.div variants={scaffold} className="flex h-full shrink-0 flex-col items-start justify-center pb-[24px]" style={{ gap: 6 }}>
                    <div className="h-[15px] w-[33px] shrink-0" />
                    <div className="flex h-[189px] flex-col items-center overflow-clip whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]" style={{ gap: 12 }}>
                      {Y_TICKS.map((t) => (
                        <p key={t}>{t}</p>
                      ))}
                    </div>
                  </motion.div>
  
                  <div className="flex h-full min-w-0 flex-1 flex-col items-start pt-[12px]">
                    <div className="relative flex min-h-px w-full flex-1 flex-col items-start justify-between">
                      {GRID.map((g, i) => (
                        <motion.div variants={scaffold} key={i} className={`relative w-full shrink-0 ${i === 0 ? "h-[19px]" : "h-[18px]"}`}>
                          <Image src={`${A}/m/${g}`} alt="" fill unoptimized className="max-w-none" />
                        </motion.div>
                      ))}
                      <motion.svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 192" preserveAspectRatio="none" fill="none" variants={scaffold}>
                        <path d="M48.5 0 V87" stroke="#d8f3ff" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                      </motion.svg>
                      <motion.div
                        className="absolute"
                        style={{ left: "10.96%", top: 71.85, width: "78.12%", height: 103.5 }}
                        variants={chart}
                      >
                        <span className="absolute block" style={{ inset: "0 0 -0.42% 0" }}>
                          <Image src={`${A}/m/chart.svg`} alt="Blood pressure trend from 138/88 to 124/80" fill unoptimized className="max-w-none" />
                        </span>
                      </motion.div>
                      <div className="pointer-events-none absolute inset-0 text-[8px] font-normal leading-[1.5] text-black">
                        <motion.p variants={scaffold} className="absolute whitespace-nowrap" style={{ left: 15.55, top: 59.84 }}>138/88 mmHg</motion.p>
                        <motion.p variants={result} className="absolute right-0 whitespace-nowrap origin-right" style={{ top: 78 }}>124/80 mmHg</motion.p>
                      </div>
                    </div>
                    <div className="flex w-full shrink-0 items-start justify-between">
                      {MONTHS.map((m, i) => (
                        <motion.div variants={{
                          hidden: { opacity: 0, y: 3 },
                          show: { opacity: 1, y: 0, transition: timing(0.35, 2.2 + i * 0.18) },
                        }} key={m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                          <span className="block h-[8px] w-px bg-[#111110]" />
                          <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            className="min-w-0 flex-1 lg:self-end text-[16px] font-normal leading-[1.5] text-white lg:text-[20px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            Complex data doesn&apos;t have to be confusing. You and your physician see what&apos;s really driving your numbers.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
