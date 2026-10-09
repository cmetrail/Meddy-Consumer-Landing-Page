"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12613:16219 (1440 x 1047.5). White -> green vertical gradient. Header (serif headline | statement + copy),
// then a 1621.6px row of six app-dashboard cards centred (bleeding off both sides) with a tilted iPhone image over its middle,
// anchored to the section's bottom edge. The card row + phone are fixed-px Figma layers, scaled down below 1440 wide.
// Mobile (node 12721:16151, 402 x 874): centred copy, the same row at ~0.55 scale offset left so the weight / score / nutrients
// cards peek around a ~0.5 scale phone.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/personalized-health-plans/progress";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease, delay },
});

const INK = "#111110";
const SEC = "#7b7b7b";
const BORDER = "#e2e2e2";
const GREEN = "#17925a";

function Svg({ src, className = "" }: { src: string; className?: string }) {
  return <Image src={`${A}/${src}`} alt="" fill unoptimized className={`block max-w-none ${className}`} />;
}

const CARD = "relative flex shrink-0 flex-col rounded-[18px] border-[0.75px] border-solid bg-white p-3";
const CARD_STYLE: React.CSSProperties = { borderColor: BORDER, filter: "drop-shadow(1.98px 2.97px 3.96px rgba(0,0,0,0.2))" };

/* ------------------------------------------------------------- weight / score cards */
function Delta({ down, text, color }: { down?: boolean; text: string; color: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-[3px]">
      <span className="relative block size-[7.5px] shrink-0" style={down ? undefined : { transform: "scaleY(-1)" }}>
        <Svg src={down ? "icon-down.svg" : "icon-up.svg"} />
      </span>
      <p className="whitespace-nowrap text-[7.5px] font-medium leading-[1.5]" style={{ color }}>{text}</p>
    </div>
  );
}

/** the plot: Y labels | grid + area + curve + tooltip + dot (all absolute, from the Figma layers) | X axis */
function ScoreChart({ yLabels }: { yLabels: string[] }) {
  return (
    <div className="flex w-full flex-col items-start pt-[9px]">
      <div className="flex w-full flex-col items-center gap-[1.5px]">
        <div className="relative flex w-full items-end gap-[9px]">
          <div className="flex w-[24px] shrink-0 flex-col items-start justify-center gap-[7.5px] text-[9px] font-medium leading-[1.5]" style={{ color: SEC, fontFeatureSettings: '"case" 1' }}>
            {yLabels.map((l, i) => (
              <p key={l} className={i === 0 ? "w-[27px] shrink-0" : "shrink-0"}>{l}</p>
            ))}
          </div>
          <div className="absolute flex flex-col items-end justify-end gap-[7.5px]" style={{ inset: "0 0 0.5px 24px" }}>
            <div className="absolute h-[51px] w-0" style={{ left: 198.75, top: 39.75 }}>
              <div className="absolute" style={{ inset: "0 -0.38px" }}><Svg src="v-dash.svg" /></div>
            </div>
            <div className="relative h-[14.25px] w-full shrink-0"><Svg src="grid-top.svg" /></div>
            <div className="absolute flex flex-col items-start gap-[7.5px]" style={{ inset: "0.75px 0 6.75px 0" }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative h-[13.5px] w-full shrink-0"><Svg src="grid-row.svg" /></div>
              ))}
            </div>
            <div className="absolute size-[13.5px]" style={{ left: 192, top: 46.5 }}><Svg src="dot.svg" /></div>
            <div className="absolute flex flex-col items-center justify-center" style={{ left: 141, top: 1.5 }}>
              <div className="flex flex-col items-start justify-center gap-[1.5px] rounded-[6px] px-[6px] py-[3px] text-[9px] font-semibold leading-[1.5] whitespace-nowrap" style={{ background: BORDER, color: INK }}>
                <p>May 21, 2026</p>
                <p>83</p>
              </div>
              <div className="flex w-full items-center justify-end px-[7.5px]">
                <div className="flex-none rotate-180"><div className="relative h-[3.75px] w-[6.429px]"><Svg src="tip-arrow.svg" /></div></div>
              </div>
            </div>
            <div className="absolute" style={{ left: 0, top: 31.5, width: 198.75, height: 58.875 }}><Svg src="area.svg" /></div>
            <div className="absolute" style={{ left: 0.38, top: 31.5, width: 198.75, height: 23.12 }}>
              <div className="absolute" style={{ inset: "-2.37% 0 -2.43% 0" }}><Svg src="curve.svg" /></div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start justify-between pl-[24px]">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={`flex min-w-px flex-1 flex-col items-center justify-center ${i % 2 === 0 ? "gap-[1.5px]" : ""}`}>
              <div className="h-[6px] w-[0.75px] shrink-0 border-[0.75px] border-solid" style={{ background: BORDER, borderColor: BORDER }} />
              {i % 2 === 0 && <p className="w-full text-center text-[9px] font-semibold leading-[1.5]" style={{ color: SEC }}>{i + 1}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeightCard() {
  return (
    <div className={`${CARD} w-[268.5px] gap-3`} style={CARD_STYLE}>
      <div className="flex w-full flex-col gap-[1.5px]">
        <p className="text-[9px] font-normal leading-[1.5]" style={{ color: SEC }}>Current Weight</p>
        <div className="flex items-center gap-[3px]">
          <div className="flex items-center gap-[6px] whitespace-nowrap text-[24px] font-semibold leading-[1.2] tracking-[-0.36px]">
            <span style={{ color: INK }}>110</span>
            <span style={{ color: SEC }}>lbs</span>
          </div>
          <Delta down text="-20%" color="#ff546b" />
        </div>
      </div>
      <ScoreChart yLabels={["Lbs", "120", "115", "110", "105"]} />
    </div>
  );
}

function ScoreCard() {
  return (
    <div className={`${CARD} w-[268.5px] gap-3`} style={CARD_STYLE}>
      <div className="flex w-full flex-col gap-[1.5px]">
        <p className="text-[9px] font-normal leading-[1.5]" style={{ color: SEC }}>Avg Score</p>
        <div className="flex items-center gap-[3px]">
          <div className="flex items-center gap-[6px] whitespace-nowrap text-[24px] font-semibold leading-[1.2] tracking-[-0.36px]">
            <span style={{ color: INK }}>83</span>
            <span style={{ color: SEC }}>/</span>
            <span style={{ color: SEC }}>100</span>
          </div>
          <Delta text="+ 20%" color={GREEN} />
          <div className="flex shrink-0 items-center gap-[3px] rounded-full border-[0.75px] border-solid px-[6.75px] py-[2.25px]" style={{ background: "rgba(224,154,42,0.1)", borderColor: "rgba(224,154,42,0.2)" }}>
            <p className="whitespace-nowrap text-[9px] font-normal leading-[1.5]" style={{ color: "#e09a2a" }}>Moderate</p>
            <span className="relative block size-[12px] shrink-0"><Svg src="badge-icon.svg" /></span>
          </div>
        </div>
      </div>
      <ScoreChart yLabels={["S", "100", "80", "60", "0"]} />
    </div>
  );
}

/* ------------------------------------------------------------- sleep */
const STAGES = [
  { w: 68.25, c: "#e09a2a", pct: "20%", name: "Awake", on: false, grow: false },
  { w: 0, c: "#148bd5", pct: "30%", name: "Light", on: false, grow: true },
  { w: 36, c: "#c084fc", pct: "15%", name: "Deep", on: false, grow: false },
  { w: 61.5, c: "#ff7043", pct: "35%", name: "REM", on: true, grow: false },
];

function SleepCard() {
  return (
    <div className={`${CARD} w-[268.5px]`} style={CARD_STYLE}>
      <div className="flex w-full flex-col gap-[15px]">
        <div className="flex w-full items-start gap-[1.5px]">
          {STAGES.map((s) => (
            <div key={s.name} className={`flex flex-col items-start justify-center gap-[2.25px] ${s.grow ? "min-w-px flex-1" : "shrink-0"}`} style={s.grow ? undefined : { width: s.w }}>
              <div className="flex h-[45px] w-full items-end gap-[0.75px] pt-[9px]">
                <div className="h-full w-[1.5px] shrink-0" style={{ background: s.c }} />
                <div className="h-full min-w-px flex-1" style={{ background: s.c }} />
              </div>
              <p className="whitespace-nowrap text-[9px] font-bold leading-[1.5]" style={{ color: INK }}>{s.pct}</p>
            </div>
          ))}
        </div>
        <div className="flex h-[24.75px] w-full items-center gap-[6px]">
          {STAGES.map((s) => (
            <div key={s.name} className={`flex min-w-px flex-1 items-center gap-[4.5px] rounded-[4.5px] px-[6px] py-[4.5px] ${s.on ? "" : "opacity-50"}`} style={{ background: "#f8f8f8" }}>
              <span className="block size-[9px] shrink-0 rounded-[1.5px]" style={{ background: s.c }} />
              <p className="whitespace-nowrap text-[10.5px] font-medium leading-[1.5]" style={{ color: SEC }}>{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- A1c trend (172.6 x 150.4, tiny dark-theme card, drawn as in Figma) */
const AT = 4.822;
function A1cCard() {
  const rows = Array.from({ length: 9 }, (_, i) => ({ label: `${16 - i * 2}%`, ty: 18.32 + 13.2575 * i, ly: 20.73 + 13.26 * i, src: i === 4 || i === 8 ? "a-line1.svg" : "a-line.svg" }));
  const ell = [[59.79, 80.05], [72.81, 82.94], [109.46, 88.24], [133.09, 90.66]];
  return (
    <div className="relative h-[150.447px] w-[172.629px] shrink-0 overflow-clip rounded-[18px] border-[0.482px] border-solid bg-white" style={{ borderColor: BORDER }}>
      <p className="absolute whitespace-nowrap text-[6.751px] font-normal leading-[normal] text-white" style={{ left: 7.24, top: 6.27 }}>A1c Trend</p>
      {rows.map((r) => (
        <div key={r.label}>
          <p className="absolute whitespace-nowrap font-normal leading-[1.5]" style={{ left: 3.38, top: r.ty, fontSize: AT, color: "#8a8a82" }}>{r.label}</p>
          <div className="absolute h-0" style={{ left: 20.74, top: r.ly, width: 139.839 }}>
            <div className="absolute" style={{ inset: "-0.24px 0 0 0" }}><Svg src={r.src} /></div>
          </div>
        </div>
      ))}
      <div className="absolute flex items-start" style={{ left: 18.81, top: 130.2, width: 141.768 }}>
        {"JFMAMJJASOND".split("").map((m, i) => (
          <div key={i} className="flex min-w-px flex-1 flex-col items-center justify-center gap-[0.964px]">
            <div className="h-[3.858px] w-[0.482px] shrink-0" style={{ background: "#1f1f21" }} />
            <p className="whitespace-nowrap font-normal leading-[1.5]" style={{ fontSize: AT, color: "#8a8a82" }}>{m}</p>
          </div>
        ))}
      </div>
      <div className="absolute" style={{ left: 21.7, top: 73.77, width: 139.839, height: 20.554 }}>
        <div className="absolute" style={{ inset: "-2.93% 0" }}><Svg src="a-vector.svg" /></div>
      </div>
      <div className="absolute h-0" style={{ left: 20.74, top: 85.87, width: 139.839 }}>
        <div className="absolute" style={{ inset: "-0.48px 0 0 0" }}><Svg src="a-line2.svg" /></div>
      </div>
      <div className="absolute overflow-clip rounded-[1.929px]" style={{ left: 20.44, top: 71.93, width: 34.719, height: 10.608, background: "#d98c0d" }}>
        <p className="absolute whitespace-nowrap font-bold leading-[normal] text-black" style={{ left: 2.89, top: 1.93, fontSize: AT }}>Avg: 6.2%</p>
      </div>
      {ell.map(([l, t]) => (
        <div key={l} className="absolute size-[2.893px]" style={{ left: l, top: t }}><Svg src="a-ell.svg" /></div>
      ))}
      <div className="absolute overflow-clip rounded-[3.858px] border-[0.482px] border-solid" style={{ left: 105.6, top: 64.62, width: 48.22, height: 21.217, background: "#232324", borderColor: "#1f1f21" }}>
        <p className="absolute whitespace-nowrap font-normal leading-[1.5]" style={{ left: 4.34, top: 1.45, fontSize: AT, color: "#999" }}>KPI</p>
        <div className="absolute flex items-center gap-[1.929px]" style={{ left: 4.34, top: 11.09 }}>
          <span className="relative block size-[3.858px] shrink-0"><Svg src="a-ell1.svg" /></span>
          <p className="whitespace-nowrap font-normal leading-[1.5]" style={{ fontSize: AT, color: "#f4f4f5" }}>A1c: 12.8%</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- nutrients */
function NutrientsCard() {
  // 22 amber + 16 grey + 12 green hairlines; the first of each group is the tall one
  const groups = [{ n: 22, c: "#e09a2a" }, { n: 16, c: "#8a8a82" }, { n: 12, c: GREEN }];
  const badge = (letter: string, pct: string, bg: string, left: number) => (
    <div className="absolute flex items-center justify-center gap-[3.352px] whitespace-nowrap rounded-[1.676px] px-[3.352px] py-[2.514px] text-[10.056px] font-bold leading-[1.5] text-white" style={{ left, top: 20.11, background: bg }}>
      <p>{letter}</p>
      <p>{pct}</p>
    </div>
  );
  return (
    <div className="relative flex h-[160.775px] w-[300px] shrink-0 flex-col items-start gap-[13.408px] rounded-[18px] border-[0.838px] border-solid bg-white p-[14.246px]" style={CARD_STYLE}>
      <p className="whitespace-nowrap text-[13.408px] font-semibold leading-[1.5]" style={{ color: INK }}>Nutrients</p>
      <div className="relative flex w-full flex-col items-start justify-center gap-[2.514px] pt-[20.112px]">
        <div className="flex h-[61.173px] w-full items-end justify-between pt-[20.112px]">
          {groups.flatMap((g, gi) => Array.from({ length: g.n }, (_, i) => (
            <div key={`${gi}-${i}`} className="w-[1.676px] shrink-0" style={{ height: i === 0 ? 61.173 : 33.52, background: g.c }} />
          )))}
        </div>
        {badge("P", "40%", "#e09a2a", 5.02)}
        {badge("F", "30%", "#8a8a82", 136.59)}
        {badge("C", "30%", GREEN, 232.13)}
        <div className="flex w-full items-center gap-[2.514px] text-[10.056px] font-bold leading-[1.5]" style={{ color: INK }}>
          <p className="min-w-px flex-1">Protein</p>
          <p className="w-[83.799px] shrink-0">Fats</p>
          <p className="w-[61.173px] shrink-0">Carbs</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- weekly activity */
function ActivityCard() {
  return (
    <div
      className="relative flex h-[100.875px] w-[268.5px] shrink-0 flex-col items-start overflow-clip rounded-[18px] pt-3"
      style={{ backgroundImage: "linear-gradient(167.76deg, rgb(26, 61, 43) 7.735%, rgb(30, 74, 51) 50%, rgb(22, 51, 34) 92.265%)", boxShadow: "1.98px 2.97px 7.921px rgba(0,0,0,0.2)" }}
    >
      <div className="absolute size-[168px] rounded-full" style={{ left: 148.5, top: -64.32, background: "radial-gradient(circle closest-side, rgba(255,255,255,0.06), rgba(0,0,0,0) 70%)" }} />
      <div className="relative flex w-full flex-col items-start gap-[6px]">
        <p className="px-3 text-[7.5px] font-normal leading-[1.5] whitespace-nowrap" style={{ color: "#6ee7a0" }}>WEEKLY ACTIVITY</p>
        <div className="flex w-full items-center border-t-[0.75px] border-solid" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {[{ icon: "icon-steps.svg", v: "6,842", l: "Total steps" }, { icon: "icon-flame.svg", v: "38", l: "Active Energy Burned" }].map((it) => (
            <div key={it.l} className="flex h-[71.625px] min-w-px flex-1 flex-col items-start gap-[1.5px] border-r-[0.75px] border-solid py-3 pl-[18px] pr-[18.75px]" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <span className="relative block size-[12px] shrink-0"><Svg src={it.icon} /></span>
              <p className="whitespace-nowrap text-[13.5px] font-medium leading-[1.5] tracking-[-0.375px] text-white">{it.v}</p>
              <p className="whitespace-nowrap text-[7.5px] font-normal leading-[1.5] text-white">{it.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** scale factor for the fixed 1440px composition on narrower screens (and the mobile layout below lg); hidden until measured */
function useScale() {
  const [st, setSt] = useState({ s: 1, ready: false, mobile: false });
  useEffect(() => {
    const calc = () => setSt({ s: Math.min(1, window.innerWidth / 1440), ready: true, mobile: window.innerWidth < 1024 });
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return st;
}

const ROW_W = 1621.629;

export default function PersonalizedHealthPlansProgressSection() {
  const { s: ds, ready, mobile } = useScale();
  const s = mobile ? 0.55 : ds;
  const phoneS = mobile ? 0.53 : ds;
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowH, setRowH] = useState(213);
  useEffect(() => {
    if (rowRef.current) setRowH(rowRef.current.offsetHeight);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: mobile ? 874 : 1047.5 * s, backgroundImage: "linear-gradient(to bottom, #fffff9 8.713%, #7fbc9f 100.09%, #8db488 179.06%)" }}
    >
      <style>{`
        @keyframes hp-slide { from { transform: translateX(0); } to { transform: translateX(-${ROW_W + 15}px); } }
        .hp-track { animation: hp-slide 45s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .hp-track { animation: none; } }
      `}</style>

      {/* same container as the header */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-[130px] px-5 py-16 lg:gap-[180px] lg:px-10 lg:py-[120px]">
        <div className="flex w-full flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:gap-12 lg:text-left">
          <motion.p className="comprehensive-serif min-w-px text-[32px] font-normal italic leading-[1.5] text-[#46524b] lg:flex-1 lg:text-[40px] lg:text-[#17925a]" {...fade(0)}>
            Your plan changes when you do.
          </motion.p>
          <motion.div className="flex min-w-px flex-col items-center gap-4 lg:flex-1 lg:items-start lg:gap-2 lg:text-[#111110]" {...fade(0.1)}>
            <p className="text-[20px] font-normal leading-[1.5] text-[#6e7a72] lg:text-[32px] lg:font-medium lg:text-[#111110]">
              What worked last month may <span className="comprehensive-serif hidden italic lg:inline">not be what you need next month.</span>
              <span className="lg:hidden">not be </span>
              <span className="font-medium text-[#46524b] lg:hidden">what you need next month.</span>
            </p>
            <p className="text-[14px] font-normal leading-[1.5] text-[#6e7a72] lg:text-[16px] lg:text-[#111110] lg:opacity-80">
              Meddy follows your progress between visits—your <b className="font-bold text-[#46524b] lg:font-normal lg:text-inherit">weight, nutrition, workouts, sleep, recovery, biomarkers</b>, and other health data.
            </p>
          </motion.div>
        </div>

        {/* card row: fixed-px Figma layout, centred so it bleeds off both sides */}
        <div className="relative w-full" style={{ height: rowH * s, visibility: ready ? "visible" : "hidden" }}>
          <div
            ref={rowRef}
            className="absolute top-0 flex items-start gap-[15px]"
            style={
              mobile
                ? { width: ROW_W, left: -245 - 20, transform: `scale(${s})`, transformOrigin: "top left" }
                : { width: ROW_W, left: "50%", transform: `translateX(-50%) scale(${s})`, transformOrigin: "top center" }
            }
          >
            {/* three identical sets slide left one set-width, then jump back (seamless loop) */}
            <div className="hp-track flex shrink-0 items-start gap-[15px]">
              {[0, 1, 2].map((k) => (
                <div key={k} className="flex shrink-0 items-start gap-[15px]" style={{ width: ROW_W }} aria-hidden={k > 0}>
                  <WeightCard />
                  <SleepCard />
                  <A1cCard />
                  <ScoreCard />
                  <NutrientsCard />
                  <ActivityCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* tilted phone over the middle of the row, flush with the section bottom */}
      <div
        className="pointer-events-none absolute bottom-[0.5px] left-1/2 z-20 h-[692px] w-[696px] overflow-hidden"
        style={{ transform: `translateX(-50%) scale(${phoneS})`, transformOrigin: "bottom center", visibility: ready ? "visible" : "hidden" }}
      >
        <Image
          src={`${A}/phone.png`}
          alt="The Meddy app showing a fitness targets screen"
          width={4000}
          height={3000}
          sizes="1420px"
          className="pointer-events-none absolute max-w-none"
          style={{ height: "153.56%", left: "-49.27%", top: "-18.84%", width: "203.56%" }}
        />
      </div>
    </section>
  );
}
