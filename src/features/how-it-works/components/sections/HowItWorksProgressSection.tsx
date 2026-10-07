"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12688:9504 (1440 x 1010). Mirrored full-bleed photo + dark fade rising from the bottom, the
// "Progress is built over time." headline, a glass "Weight" chart card (grid, green trend graphic, milestone labels,
// 205 / 187 lbs pills, month ticks + annotations) and a short right-aligned paragraph bottom-right.
// Mobile: node 12765:15300 (402 x 843) — 32px headline, card pinned 240px lower with a 301px plot, no paragraph.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/how-it-works/progress";

const Y_TICKS = ["210", "200", "190", "180", "0"];
const GRID = ["grid-a.svg", "grid-b.svg", "grid-c.svg", "grid-c.svg", "grid-c.svg"];
const MONTHS = [
  { m: "Jan", a: ["Nutrition plan ", "updated"] },
  { m: "Apr", a: ["Strength training ", "increased"] },
  { m: "Jul", a: ["Sleep ", "Improved"] },
  { m: "Oct", a: ["Medication ", "Adjusted"] },
];
// milestone labels: left as % of the 498px plot, top in px (plot is 316px tall)
const MILESTONES = [
  { left: "20.28%", top: 56.05, a: ["Small ", "Changes"] },
  { left: "50.6%", top: 102.05, a: ["Consistent ", "progress"] },
  { left: "77.91%", top: 152.05, a: ["Better", "health"] },
];
const PILLS = [
  { label: "205 lbs", left: "4.2%", top: 42.39 },
  { label: "187 lbs", left: "89.96%", top: 190.39 },
];

export default function HowItWorksProgressSection() {
  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-white">
      {/* mobile photo: 1796 x 1011 box centred 96px left of the middle, 168px above the top, mirrored */}
      <div className="pointer-events-none absolute lg:hidden" style={{ left: "calc(50% - 96.5px)", top: -167.84, width: 1796.4, height: 1011, transform: "translateX(-50%)" }}>
        <div className="absolute inset-0" style={{ transform: "scaleX(-1)" }}>
          <Image src={`${A}/scene.png`} alt="" fill priority sizes="1796px" className="object-cover" />
        </div>
      </div>
      {/* desktop photo: 1791 x 1008 box (175px bleed each side), mirrored, centred */}
      <div className="pointer-events-none absolute hidden lg:block" style={{ left: -175, right: -176, top: "calc(50% + 0.24px)", transform: "translateY(-50%)", aspectRatio: "1672 / 941" }}>
        <div className="absolute inset-0" style={{ transform: "scaleX(-1)" }}>
          <Image src={`${A}/scene.png`} alt="" fill priority sizes="1791px" className="object-cover" />
        </div>
      </div>
      {/* dark fade rising from the bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[813px] opacity-60 lg:h-[964px]"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 57.925%, #030C16 100%)" }}
      />

      {/* same container as the header */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-12 px-5 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-[120px]">
        <div className="flex w-full flex-col items-start justify-center gap-[240px] lg:w-[617px] lg:shrink-0 lg:gap-12">
          <motion.p
            className="w-full max-w-[575px] text-[0px] font-normal leading-[0] text-[#111110]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="comprehensive-serif text-[32px] italic leading-[1.5] text-white lg:text-[64px]">Progress</span>
            <span className="text-[32px] leading-[1.5] lg:text-[96px]"> </span>
            <span className="text-[32px] font-medium leading-[1.5] lg:text-[56px]">is built over time.</span>
          </motion.p>

          {/* Mobile weight card (Figma 12765:15309) */}
          <motion.div
            className="flex h-[380px] w-full flex-col items-start rounded-[12px] border-2 border-solid border-white bg-white/20 p-[9px] backdrop-blur-[15px] lg:hidden"
            style={{ gap: 24 }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.1 } },
            }}
          >
            <div className="flex flex-col items-start justify-center whitespace-nowrap font-normal leading-[1.5] text-black" style={{ gap: 4 }}>
              <p className="text-[16px]">Weight</p>
              <p className="text-[12px] opacity-60">How your weight changes over time</p>
            </div>

            <div className="flex min-h-px w-full flex-1 items-end" style={{ gap: 4 }}>
              <div className="flex h-[292px] w-[39px] shrink-0 items-center justify-between pb-[23px]">
                <div className="flex h-[56px] w-[15px] shrink-0 items-center justify-center">
                  <p className="-rotate-90 flex-none whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#17925A]">Weight (lbs)</p>
                </div>
                <div className="flex h-full shrink-0 flex-col items-center overflow-clip whitespace-nowrap text-[10px] font-normal leading-[1.5]" style={{ gap: 54 }}>
                  {Y_TICKS.map((t, i) => (
                    <p key={t} className={i === 4 ? "text-[#7B7B7B]" : "text-black"}>
                      {t}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex h-full min-w-0 flex-1 flex-col items-start pt-[12px]">
                <div className="relative flex h-[199px] w-full shrink-0 flex-col items-start justify-between">
                  {GRID.slice(0, 5).map((g, i) => (
                    <div key={i} className={`relative w-full shrink-0 ${i === 0 ? "h-[19px]" : "h-[18px]"}`}>
                      <span className="absolute block" style={{ inset: i === 0 ? "0 -0.17%" : "0" }}>
                        <Image src={`${A}/${g}`} alt="" fill unoptimized className="max-w-none" />
                      </span>
                    </div>
                  ))}

                  {[
                    { label: "205 lbs", left: "5.65%", top: 23.16 },
                    { label: "187 lbs", left: "83.39%", top: 139.39 },
                  ].map((p) => (
                    <div key={p.label} className="absolute flex items-center justify-center rounded-[28px] border border-solid border-[#17925A] bg-white px-1 py-[2px]" style={{ left: p.left, top: p.top }}>
                      <p className="whitespace-nowrap text-[8px] font-normal leading-[1.5] text-[#17925A]">{p.label}</p>
                    </div>
                  ))}

                  <motion.div
                    className="absolute"
                    style={{ left: "10.96%", top: 48.16, width: "78.07%", height: 220 }}
                    initial={{ clipPath: "inset(-4% 100% 0 -3%)" }}
                    whileInView={{ clipPath: "inset(-4% -3% 0 -3%)" }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 1.6, ease: "easeInOut", delay: 0.5 }}
                  >
                    <span className="absolute block" style={{ inset: "-3.33% -2.27% 0 -2.27%" }}>
                      <Image src={`${A}/chart-m.svg`} alt="Weight trend from 205 lbs to 187 lbs over the year" fill unoptimized className="max-w-none" />
                    </span>
                  </motion.div>

                  {[
                    { left: "26.91%", top: 26.05, a: ["Small ", "Changes"] },
                    { left: "53.82%", top: 58.05, a: ["Consistent ", "progress"] },
                    { left: "75.75%", top: 92.05, a: ["Better", "health"] },
                  ].map((m) => (
                    <p key={m.a.join("")} className="absolute whitespace-pre text-[10px] font-normal leading-[normal] text-black" style={{ left: m.left, top: m.top }}>
                      {m.a[0]}
                      {"\n"}
                      {m.a[1]}
                    </p>
                  ))}
                </div>

                <div className="flex w-full shrink-0 items-start justify-between">
                  {MONTHS.map((m) => (
                    <div key={m.m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                      <span className="block h-[8px] w-px bg-[#111110]" />
                      <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m.m}</p>
                      <p className="w-full text-center text-[12px] font-medium leading-[1.5] text-[#111110]">{m.a[0]}{m.a[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Weight chart card */}
          <motion.div
            className="hidden w-full flex-col items-start rounded-[12px] border-2 border-solid border-white bg-white/20 p-[17px] backdrop-blur-[15px] lg:flex"
            style={{ gap: 24 }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.1 } },
            }}
          >
            <div className="flex flex-col items-start justify-center whitespace-nowrap font-normal leading-[1.5] text-black" style={{ gap: 4 }}>
              <p className="text-[20px]">Weight</p>
              <p className="text-[16px] opacity-60">How your weight changes over time</p>
            </div>

            <div className="flex w-full items-end" style={{ gap: 4 }}>
              {/* y axis */}
              <div className="flex h-[391px] w-[39px] shrink-0 items-center justify-between pb-[23px]">
                <div className="flex h-[56px] w-[15px] shrink-0 items-center justify-center">
                  <p className="-rotate-90 flex-none whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#17925A]">Weight (lbs)</p>
                </div>
                <div className="flex h-full shrink-0 flex-col items-center overflow-clip whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#7B7B7B]" style={{ gap: 63 }}>
                  {Y_TICKS.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </div>

              {/* plot */}
              <div className="flex min-w-0 flex-1 flex-col items-start pt-[12px]">
                <div className="relative flex h-[316px] w-full flex-col items-start justify-between">
                  {GRID.map((g, i) => (
                    <div key={i} className={`relative w-full shrink-0 ${i === 0 ? "h-[19px]" : "h-[18px]"}`}>
                      <span className="absolute block" style={{ inset: i === 0 ? "0 -0.1%" : "0" }}>
                        <Image src={`${A}/${g}`} alt="" fill unoptimized className="max-w-none" />
                      </span>
                    </div>
                  ))}

                  {PILLS.map((p) => (
                    <div
                      key={p.label}
                      className="absolute flex items-center justify-center rounded-[28px] border border-solid border-[#17925A] bg-white px-1 py-[2px]"
                      style={{ left: p.left, top: p.top }}
                    >
                      <p className="whitespace-nowrap text-[8px] font-normal leading-[1.5] text-[#7B7B7B]">{p.label}</p>
                    </div>
                  ))}

                  {/* trend graphic: wipes in left to right */}
                  <motion.div
                    className="absolute"
                    style={{ left: "6.63%", top: 67.05, width: "86.55%", height: 220 }}
                    initial={{ clipPath: "inset(-3% 100% 0 -2%)" }}
                    whileInView={{ clipPath: "inset(-3% -2% 0 -2%)" }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 1.6, ease: "easeInOut", delay: 0.5 }}
                  >
                    <span className="absolute block" style={{ inset: "-2.42% -1.24% 0 -1.24%" }}>
                      <Image src={`${A}/chart.svg`} alt="Weight trend from 205 lbs to 187 lbs over the year" fill unoptimized className="max-w-none" />
                    </span>
                  </motion.div>

                  {MILESTONES.map((m) => (
                    <p key={m.a.join("")} className="absolute whitespace-pre text-[12px] font-normal leading-[normal] text-black" style={{ left: m.left, top: m.top }}>
                      {m.a[0]}
                      {"\n"}
                      {m.a[1]}
                    </p>
                  ))}
                </div>

                {/* x axis */}
                <div className="flex w-full shrink-0 items-start justify-between">
                  {MONTHS.map((m) => (
                    <div key={m.m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                      <span className="block h-[8px] w-px bg-[#111110]" />
                      <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m.m}</p>
                      <p className="whitespace-pre text-center text-[12px] font-medium leading-[1.5] text-[#111110]">
                        {m.a[0]}
                        {"\n"}
                        {m.a[1]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          className="hidden min-w-0 text-[16px] font-normal leading-[1.5] text-white lg:block lg:w-[573px] lg:shrink-0 lg:whitespace-pre-wrap lg:text-right lg:text-[20px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          You bring the consistency. Your physician <br className="hidden lg:block" />keeps you on course.
        </motion.p>
      </div>
    </section>
  );
}
