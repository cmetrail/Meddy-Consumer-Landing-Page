"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

// Keep the original responsive glass card and plot geometry.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/how-it-works/progress";

const Y_TICKS = ["210", "200", "190", "180", "0"];
const GRID = ["grid-a.svg", "grid-b.svg", "grid-c.svg", "grid-c.svg", "grid-c.svg"];
const MONTHS = [
  { m: "Jan", label: "Small changes", event: "Plan started" },
  { m: "Apr", label: "Consistent progress", event: "Plan adjusted" },
  { m: "Jul", label: "Better health", event: "Labs rechecked" },
  { m: "Oct", label: "Progress reviewed", event: "Progress reviewed" },
];
const CARD_DURATION = 0.35;
const SEGMENT_DURATION = 0.6;
const arrival = (index: number) => CARD_DURATION + index * SEGMENT_DURATION;

function reveal(reduced: boolean | null, delay: number, scale = false): Variants {
  return {
    hidden: { opacity: 0, y: scale ? 4 : 0, scale: scale ? 0.92 : 1 },
    show: { opacity: 1, y: 0, scale: 1, transition: {
      duration: reduced ? 0 : 0.22, delay: reduced ? 0 : delay, ease,
    } },
  };
}

/** All children inherit the card's single viewport trigger and animation clock. */
function ProgressTrend({ mobile, reduced }: { mobile?: boolean; reduced: boolean | null }) {
  const gradient = useId();
  const width = mobile ? 245.667 : 441.667;
  const height = mobile ? 227.333 : 225.333;
  const points = mobile
    ? [[5.333, 5.333], [83.181, 30.559], [161.903, 65.244], [240.333, 90.076]]
    : [[5.333, 5.333], [148.109, 56.333], [292.488, 121.333], [436.333, 152.833]];
  const bottom = mobile ? 146.833 : 224.833;
  const coordinates = points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <div data-progress-trend className="absolute" style={{
      left: mobile ? "10.96%" : "6.63%", top: mobile ? 48.16 : 67.05,
      width: mobile ? "78.07%" : "86.55%", height: 220,
    }}>
      <svg role="img" aria-label="Weight trend from 205 lbs to 187 lbs, January through October" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polygon points={`${coordinates} ${points[3][0]},${bottom} ${points[0][0]},${bottom}`} fill={`url(#${gradient})`}
          variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, show: {
            clipPath: "inset(0 0% 0 0)", transition: {
              duration: reduced ? 0 : SEGMENT_DURATION * 3, delay: reduced ? 0 : CARD_DURATION, ease: "linear",
            },
          } }} />
        {points.slice(1).map(([x, y], i) => (
          <motion.path key={i} data-progress-segment d={`M${points[i][0]} ${points[i][1]} L${x} ${y}`} fill="none" stroke="#17925A" strokeWidth="2"
            variants={{ hidden: { pathLength: 0, opacity: 0 }, show: {
              pathLength: 1, opacity: 1, transition: {
                pathLength: { duration: reduced ? 0 : SEGMENT_DURATION, delay: reduced ? 0 : arrival(i), ease: "linear" },
                opacity: { duration: 0, delay: reduced ? 0 : arrival(i) },
              },
            } }} />
        ))}
        {points.map(([cx, cy], i) => (
          <motion.circle key={i} data-progress-dot cx={cx} cy={cy} r={mobile ? 4 : 5.5} fill="#17925A"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: {
              duration: reduced ? 0 : 0.2, delay: reduced ? 0 : arrival(i), ease: "backOut",
            } } }} />
        ))}
      </svg>
      {MONTHS.map((milestone, i) => (
        <motion.p key={milestone.m} data-progress-label variants={reveal(reduced, arrival(i) + 0.2)}
          className="absolute w-[72px] text-[10px] font-normal leading-tight text-black lg:w-[86px] lg:text-[12px]"
          style={{ left: `calc(${points[i][0] / width * 100}% - ${i === 3 ? (mobile ? 68 : 82) : i === 0 ? 0 : (mobile ? 36 : 43)}px)`,
            top: points[i][1] / height * 220 + (i === 3 ? 30 : i === 0 ? 12 : -34),
            textAlign: i === 3 ? "right" : i === 0 ? "left" : "center",
          }}>
          {milestone.label.split(" ")[0]}<br />{milestone.label.split(" ").slice(1).join(" ")}
        </motion.p>
      ))}
    </div>
  );
}
const PILLS = [
  { label: "205 lbs", left: "4.2%", top: 42.39 },
  { label: "187 lbs", left: "89.96%", top: 190.39 },
];

export default function HowItWorksProgressSection() {
  const reduced = useReducedMotion();
  const [triggerInset, setTriggerInset] = useState(288);
  useEffect(() => {
    // IntersectionObserver percentage margins use width; pixels track viewport height.
    const updateInset = () => setTriggerInset(window.innerHeight * 0.32);
    updateInset();
    window.addEventListener("resize", updateInset);
    return () => window.removeEventListener("resize", updateInset);
  }, []);
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : CARD_DURATION, ease } },
  };
  return (
    <section className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-white">
      {/* mobile photo: 1796 x 1011 box centred 96px left of the middle, 168px above the top, mirrored */}
      <div className="pointer-events-none absolute lg:hidden" style={{ left: "calc(50% - 96.5px)", top: -167.84, width: 1796.4, height: 1011, transform: "translateX(-50%)" }}>
        <div className="absolute inset-0" style={{ transform: "scaleX(-1)" }}>
          <Image src={`${A}/scene.png`} alt="" fill priority sizes="1796px" className="object-cover" />
        </div>
      </div>
      {/* desktop photo: 1791 x 1008 box (175px bleed each side), mirrored, centred */}
      <div className="pointer-events-none absolute hidden lg:block" style={{ left: -175, right: -176, top: "calc(50% + 0.24px)", transform: "translateY(-50%)", aspectRatio: "1672 / 941", minHeight: "100%" }}>
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
            viewport={{ once: true, amount: 0, margin: `0px 0px -${triggerInset}px 0px` }}
            variants={cardVariants}
            data-progress-card
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
                    <motion.div variants={reveal(reduced, arrival(p.label === "205 lbs" ? 0 : 3) + 0.2)} key={p.label} className="absolute flex items-center justify-center rounded-[28px] border border-solid border-[#17925A] bg-white px-1 py-[2px]" style={{ left: p.left, top: p.top }}>
                      <p className="whitespace-nowrap text-[8px] font-normal leading-[1.5] text-[#17925A]">{p.label}</p>
                    </motion.div>
                  ))}

                  <ProgressTrend mobile reduced={reduced} />
                </div>

                <div className="flex w-full shrink-0 items-start justify-between">
                  {MONTHS.map((m, i) => (
                    <div key={m.m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                      <span className="block h-[8px] w-px bg-[#111110]" />
                      <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m.m}</p>
                      <motion.p data-progress-event variants={reveal(reduced, arrival(i) + 0.22, true)} className="w-full text-center text-[12px] font-medium leading-[1.5] text-[#111110]">{m.event}</motion.p>
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
            viewport={{ once: true, amount: 0, margin: `0px 0px -${triggerInset}px 0px` }}
            variants={cardVariants}
            data-progress-card
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
                    <motion.div
                      variants={reveal(reduced, arrival(p.label === "205 lbs" ? 0 : 3) + 0.2)}
                      key={p.label}
                      className="absolute flex items-center justify-center rounded-[28px] border border-solid border-[#17925A] bg-white px-1 py-[2px]"
                      style={{ left: p.left, top: p.top }}
                    >
                      <p className="whitespace-nowrap text-[8px] font-normal leading-[1.5] text-[#7B7B7B]">{p.label}</p>
                    </motion.div>
                  ))}

                  <ProgressTrend reduced={reduced} />
                </div>

                {/* x axis */}
                <div className="flex w-full shrink-0 items-start justify-between">
                  {MONTHS.map((m, i) => (
                    <div key={m.m} className="flex w-[65.667px] flex-col items-center justify-center" style={{ gap: 2 }}>
                      <span className="block h-[8px] w-px bg-[#111110]" />
                      <p className="whitespace-nowrap text-[10px] font-normal leading-[1.5] text-[#111110]">{m.m}</p>
                      <motion.p data-progress-event variants={reveal(reduced, arrival(i) + 0.22, true)} className="text-center text-[12px] font-medium leading-[1.5] text-[#111110]">
                        {m.event}
                      </motion.p>
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
