"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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

export default function HowItWorksSignalSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* photo: 1722 wide (141px bleed each side), centred; covers the section on mobile */}
      <div className="pointer-events-none absolute top-0 lg:hidden" style={{ left: "calc(50% + 35.5px)", width: 1605, height: 903, transform: "translateX(-50%)" }}>
        <Image src={`${A}/bg.png`} alt="" fill priority sizes="1605px" className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{ left: -141, right: -141, top: "calc(50% + 0.7px)", transform: "translateY(-50%)", aspectRatio: "1672 / 941" }}
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

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-end lg:gap-12">
          {/* Nutrition card */}
          <motion.div
            className="hidden min-w-0 flex-1 flex-col gap-4 rounded-[8.226px] border border-solid border-white bg-white/10 p-[16.452px] backdrop-blur-[25px] lg:flex"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.1 } },
            }}
          >
            {/* readouts */}
            <div className="flex w-full flex-wrap items-center justify-between gap-y-4 lg:flex-nowrap">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col" style={{ gap: 8 }}>
                  <div className="flex flex-col items-start">
                    <p className="whitespace-nowrap text-center text-[12px] font-normal leading-[1.416] text-[#111110]">{s.label}</p>
                    <p className="whitespace-nowrap text-center text-[32px] font-semibold leading-[1.416] text-[#111110]" style={{ height: s.h }}>{s.value}</p>
                  </div>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="relative block size-[19.703px] shrink-0" style={s.down ? { transform: "scaleY(-1)" } : undefined}>
                      <Image src={`${A}/trend.svg`} alt="" fill unoptimized className="max-w-none" />
                    </span>
                    <p className="whitespace-nowrap text-center text-[10px] font-normal leading-[1.416] text-[#111110]">{s.delta}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* chart */}
            <div className="flex w-full flex-col items-start justify-center">
              <p className="whitespace-nowrap text-[12px] font-normal leading-[1.5] text-[#111110]">(mmHg)</p>
              <div className="flex h-[228px] w-full items-end">
                {/* y axis */}
                <div className="flex h-full shrink-0 flex-col items-start justify-center pb-[24px]" style={{ gap: 6 }}>
                  <div className="h-[15px] w-[33px] shrink-0" />
                  <div className="flex h-[189px] flex-col items-center overflow-clip whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]" style={{ gap: 12 }}>
                    {Y_TICKS.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                </div>

                {/* plot */}
                <div className="flex h-full min-w-0 flex-1 flex-col items-start pt-[12px]">
                  <div className="relative flex min-h-px w-full flex-1 flex-col items-start justify-between">
                    {GRID.map((g, i) => (
                      <div key={i} className={`relative w-full shrink-0 ${i === 0 ? "h-[19px]" : "h-[18px]"}`}>
                        <Image src={`${A}/${g}`} alt="" fill unoptimized className="max-w-none" />
                      </div>
                    ))}
                    {/* chart graphic: 480 x 103.5 at (32.5, 71.85) of the 527px plot */}
                    <motion.div
                      className="absolute"
                      style={{ left: "6.18%", top: 71.85, width: "91.2%", height: 103.5 }}
                      variants={{
                        hidden: { clipPath: "inset(0 100% 0 0)" },
                        show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.6, ease: "easeInOut", delay: 0.6 } },
                      }}
                    >
                      <span className="absolute block" style={{ inset: "0 0 -0.42% 0" }}>
                        <Image src={`${A}/chart.svg`} alt="Blood pressure trend from 138/88 to 124/80" fill unoptimized className="max-w-none" />
                      </span>
                    </motion.div>
                    <div className="pointer-events-none absolute inset-0 text-[12px] font-normal leading-[1.5] text-black">
                      <p className="absolute whitespace-nowrap" style={{ left: 15.55, top: 55.84 }}>138/88</p>
                      <p className="absolute right-0 whitespace-nowrap" style={{ top: 73.84 }}>124/80</p>
                    </div>
                  </div>
                  {/* x axis */}
                  <div className="flex w-full shrink-0 items-start justify-between">
                    {MONTHS.map((m) => (
                      <div key={m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                        <span className="block h-[8px] w-px bg-[#111110]" />
                        <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile card (Figma 12765:14963) */}
          <motion.div
            className="flex w-full flex-col gap-2 rounded-[8.226px] border border-solid border-white bg-white/10 p-4 backdrop-blur-[25px] lg:hidden"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.1 } },
            }}
          >
            <div className="grid grid-cols-2 items-start" style={{ columnGap: 8, rowGap: 16 }}>
              {STATS.map((s) => (
                <div key={s.label} className="flex min-w-0 flex-col" style={{ gap: 8 }}>
                  <div className="flex flex-col items-start">
                    <p className="whitespace-nowrap text-[10px] font-normal leading-[1.416] text-[#111110]">{s.label}</p>
                    <p className="whitespace-nowrap text-[20px] font-semibold leading-[1.416] text-[#111110]">{s.value}</p>
                  </div>
                  <div className="flex items-center" style={{ gap: 6 }}>
                    <span className="relative block size-[12px] shrink-0" style={s.down ? { transform: "scaleY(-1)" } : undefined}>
                      <Image src={`${A}/m/trend-up.svg`} alt="" fill unoptimized className="max-w-none" />
                    </span>
                    <p className="whitespace-nowrap text-[10px] font-normal leading-[1.416] text-[#111110]">{s.delta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col items-start justify-center" style={{ gap: 8 }}>
              <p className="whitespace-nowrap text-[12px] font-normal leading-[1.5] text-[#111110]">(mmHg)</p>
              <div className="flex h-[228px] w-full items-end">
                <div className="flex h-full shrink-0 flex-col items-start justify-center pb-[24px]" style={{ gap: 6 }}>
                  <div className="h-[15px] w-[33px] shrink-0" />
                  <div className="flex h-[189px] flex-col items-center overflow-clip whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]" style={{ gap: 12 }}>
                    {Y_TICKS.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                </div>

                <div className="flex h-full min-w-0 flex-1 flex-col items-start pt-[12px]">
                  <div className="relative flex min-h-px w-full flex-1 flex-col items-start justify-between">
                    {GRID.map((g, i) => (
                      <div key={i} className={`relative w-full shrink-0 ${i === 0 ? "h-[19px]" : "h-[18px]"}`}>
                        <Image src={`${A}/m/${g}`} alt="" fill unoptimized className="max-w-none" />
                      </div>
                    ))}
                    <motion.div
                      className="absolute"
                      style={{ left: 32.55, top: 71.85, width: 232, height: 103.5 }}
                      variants={{
                        hidden: { clipPath: "inset(0 100% 0 0)" },
                        show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.6, ease: "easeInOut", delay: 0.6 } },
                      }}
                    >
                      <span className="absolute block" style={{ inset: "0 0 -0.42% 0" }}>
                        <Image src={`${A}/m/chart.svg`} alt="Blood pressure trend from 138/88 to 124/80" fill unoptimized className="max-w-none" />
                      </span>
                    </motion.div>
                    <div className="pointer-events-none absolute inset-0 text-[8px] font-normal leading-[1.5] text-black">
                      <p className="absolute whitespace-nowrap" style={{ left: 15.55, top: 59.84 }}>138/88 mmHg</p>
                      <p className="absolute whitespace-nowrap" style={{ left: 233, top: 78 }}>124/80 mmHg</p>
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 items-start justify-between">
                    {MONTHS.map((m) => (
                      <div key={m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                        <span className="block h-[8px] w-px bg-[#111110]" />
                        <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="min-w-0 flex-1 text-[16px] font-normal leading-[1.5] text-white lg:text-[20px]"
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
