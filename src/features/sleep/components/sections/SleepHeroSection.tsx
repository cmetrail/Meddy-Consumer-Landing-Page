"use client";

import Image from "next/image";
import Header from "@/components/Header";

// Figma: desktop node 11279:3735 (1440 x 1024), mobile node 12115:22546 (402 x 874).
// lg+: `u` scales the 1440 frame to the viewport (fits one screen). <lg: `m` scales the 402 frame.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/sleep/hero";

type K = (n: number) => string;

/** one cloud layer: c1 = fluffy mass (object-cover), c2 = soft wisp (bottom aligned) */
type CloudSpec = { c: "c1" | "c2" | "big"; x: number; y: number; w: number; h: number };

const CLOUD_SRC = { c1: `${A}/d-cloud1.png`, c2: `${A}/d-cloud2.png`, big: `${A}/m-cloud-a.png` };

function Cloud({ s, k }: { s: CloudSpec; k: K }) {
  return (
    <Image
      src={CLOUD_SRC[s.c]}
      alt=""
      width={800}
      height={492}
      sizes="900px"
      className={`pointer-events-none absolute max-w-none mix-blend-screen ${s.c === "c1" ? "object-cover" : "object-bottom"}`}
      style={{ left: k(s.x), top: k(s.y), width: k(s.w), height: k(s.h) }}
    />
  );
}

/** a three-layer cloud bank, offsets as in Figma */
const bank = (x: number, y: number, w1: number, h1: number, w2: number, h2: number, d2: [number, number], d3: [number, number]): CloudSpec[] => [
  { c: "c1", x, y, w: w1, h: h1 },
  { c: "c2", x: x + d2[0], y: y + d2[1], w: w2, h: h2 },
  { c: "c2", x: x + d3[0], y: y + d3[1], w: w2, h: h2 },
];

// desktop scene (coordinates inside the 2238 x 509 box at x=-398, y=512)
const D_BEHIND: CloudSpec[] = [
  ...bank(34, 37, 840.459, 516.883, 769.353, 416.235, [53.96, 6.47], [37, 0]),
  ...bank(0, 37, 840.459, 516.883, 769.353, 416.235, [53.96, 6.47], [37, 0]),
];
const D_FRONT: CloudSpec[] = [
  ...bank(1379, 43, 840.459, 516.883, 769.353, 416.235, [53.96, 6.47], [37, 0]),
  ...bank(1316, 23, 840.459, 516.883, 769.353, 416.235, [53.96, 6.47], [37, 0]),
  { c: "c1", x: 34, y: 37, w: 840.459, h: 516.883 },
  { c: "c2", x: 71, y: 37, w: 769.353, h: 416.235 },
];

// edge banks, relative to their own box
const EDGE: CloudSpec[] = bank(0, 0, 840.459, 516.883, 769.353, 416.235, [53.96, 6.47], [37, 0]);

// mobile scene (coordinates inside the 699 x 159 frame, centred on the screen)
const M_BEHIND: CloudSpec[] = [
  { c: "big", x: -18.45, y: -24, w: 395, h: 176 },
  ...bank(10.62, 11.56, 262.54, 161.46, 240.33, 130.02, [16.86, 2.02], [11.56, 0]),
  ...bank(0, 11.56, 262.54, 161.46, 240.33, 130.02, [16.85, 2.02], [11.56, 0]),
];
const M_FRONT: CloudSpec[] = [
  ...bank(411.09, 7.18, 840.459, 516.883, 769.353, 416.235, [53.96, 6.47], [37, 0]),
  ...bank(10.62, 11.56, 262.54, 161.46, 240.33, 130.02, [16.86, 2.02], [11.56, 0]),
];

type MetricSpec = {
  id: "hr" | "dur" | "eff";
  label: string;
  value: string;
  unit: string;
  x: number;
  y: number;
};

/** glass pill; sizes differ between the desktop and mobile frames */
function Metric({ s, k, d }: { s: MetricSpec; k: K; d: boolean }) {
  const t = d
    ? { label: 12, val: 24, unit: 14, gap: 5, lgap: 2, icon: s.id === "dur" ? 24 : 30, pr: 28 }
    : { label: 5.952, val: 9.524, unit: 9.524, gap: 2.976, lgap: 1.19, icon: s.id === "eff" ? 16 : 16, pr: 16.667 };
  const box: Record<string, [number, number, number, number]> = d
    ? { hr: [144, 68, 21, 9], dur: [162, 70, 21, 10], eff: [158, 74, 24, 12.5] }
    : { hr: [71.9, 33.6, 9.52, 4.76], dur: [80, 34.7, 9.52, 4.76], eff: [74, 34.7, 9.52, 4.76] };
  const [w, h, px, py] = box[s.id];
  const prefix = d ? "d" : "m";
  const iconSrc =
    s.id === "hr" ? `${A}/${prefix}-wave.svg` : s.id === "dur" ? `${A}/${prefix}-clock.svg` : `${A}/${prefix}-moon.svg`;
  return (
    <div
      className="absolute overflow-hidden border border-white/40 bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-[3px]"
      style={{ left: k(s.x), top: k(s.y), width: k(w), height: k(h), borderRadius: k(t.pr) }}
    >
      <div className="absolute flex flex-col items-start" style={{ left: k(px), top: k(py), gap: k(t.lgap) }}>
        <span className="whitespace-nowrap font-light italic leading-[1.1241] text-[#F9F9F9]" style={{ fontSize: `max(${d ? 9 : 4}px, ${k(t.label)})` }}>
          {s.label}
        </span>
        <div className="flex items-center" style={{ gap: k(t.gap) }}>
          <Image src={iconSrc} alt="" width={t.icon} height={t.icon} unoptimized className="shrink-0" style={{ width: k(t.icon), height: k(t.icon) }} />
          <span className="flex items-baseline whitespace-nowrap lowercase leading-[normal] text-white" style={{ fontSize: `max(${d ? 14 : 6}px, ${k(t.val)})` }}>
            {s.value}
            <span className="text-[#F8F5F5]" style={{ fontSize: `max(${d ? 10 : 6}px, ${k(t.unit)})`, marginLeft: k(d ? 6 : 3) }}>
              {s.unit}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Lines({ k, x, y, w, h }: { k: K; x: number; y: number; w: number; h: number }) {
  return (
    <div className="absolute" style={{ left: k(x), top: k(y), width: k(w), height: k(h) }}>
      <Image src={`${A}/d-lines.svg`} alt="" width={53} height={85} unoptimized className="absolute max-w-none" style={{ left: "-2.5%", top: "-1.49%", width: "105%", height: "101.49%" }} />
    </div>
  );
}

function Person({ k, x, y, w, h }: { k: K; x: number; y: number; w: number; h: number }) {
  return (
    <div className="absolute overflow-hidden" style={{ left: k(x), top: k(y), width: k(w), height: k(h) }}>
      <Image
        src={`${A}/d-person.png`}
        alt=""
        width={850}
        height={640}
        priority
        sizes="1600px"
        className="absolute max-w-none"
        style={{ left: "-0.05%", top: "-83.1%", width: "100.09%", height: "213.36%" }}
      />
    </div>
  );
}

const D_METRICS: MetricSpec[] = [
  { id: "hr", label: "Resting heart rate", value: "46", unit: "BPM", x: 948, y: 174 },
  { id: "dur", label: "Sleep duration", value: "7h 42", unit: "min", x: 1510, y: 43 },
  { id: "eff", label: "Sleep Efficiency", value: "96", unit: "%", x: 741, y: 33 },
];
const M_METRICS: MetricSpec[] = [
  { id: "dur", label: "Sleep duration", value: "7h 42", unit: "min", x: 446.55, y: -31 },
  { id: "hr", label: "Resting heart rate", value: "46", unit: "BPM", x: 286.55, y: 55 },
  { id: "eff", label: "Sleep Efficiency", value: "96", unit: "%", x: 227.55, y: -10 },
];

export default function SleepHeroSection() {
  return (
    <section
      id="sleep-hero"
      className="relative flex min-h-[calc(874*var(--m))] w-full flex-col overflow-hidden text-white lg:block lg:h-[calc(1024*var(--u))] lg:min-h-0"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.0009765625))",
          "--m": "calc(min(100vw, 500px) / 402)",
          background: "linear-gradient(180deg, #2F68A9 0%, #A6D7FF 100%)",
        } as React.CSSProperties
      }
    >
      <div className="relative z-30 shrink-0">
        <Header variant="dark" active="Sleep" />
      </div>

      {/* Desktop (lg+): copy inside the header container; scene on the 1440 frame */}
      <div className="absolute inset-0 hidden lg:block">
        {/* the cloud bed runs edge to edge: extra banks pinned to both screen edges for viewports wider than the 1440 frame */}
        {[0, 70, 150].map((dy) => (
          <div key={`el${dy}`}>
            <div className="absolute" style={{ left: u(-340), top: u(549 + dy), width: u(900), height: u(520) }}>
              {EDGE.map((s, i) => (
                <Cloud key={i} s={s} k={u} />
              ))}
            </div>
            <div className="absolute" style={{ right: u(-340), top: u(535 + dy), width: u(900), height: u(520) }}>
              {EDGE.map((s, i) => (
                <Cloud key={i} s={s} k={u} />
              ))}
            </div>
          </div>
        ))}
        {/* soft cloud floor so the bed reaches the screen edges at any width */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: u(330), background: "linear-gradient(180deg, rgba(246,241,239,0) 0%, rgba(246,241,239,0.92) 55%, #F3EDEA 100%)" }}
        />
        <div className="relative mx-auto h-full" style={{ width: u(1440) }}>
          <div className="absolute" style={{ left: u(-398), top: u(512), width: u(2238), height: u(509) }}>
            {D_BEHIND.map((s, i) => (
              <Cloud key={`b${i}`} s={s} k={u} />
            ))}
            <Person k={u} x={353} y={-12} w={1527} h={539.4} />
            {D_METRICS.map((s) => (
              <Metric key={s.id} s={s} k={u} d />
            ))}
            <Lines k={u} x={514} y={23} w={50} h={83.75} />
            {D_FRONT.map((s, i) => (
              <Cloud key={`f${i}`} s={s} k={u} />
            ))}
          </div>
        </div>

        <div className="absolute inset-0 z-20">
          <div className="mx-auto h-full max-w-360 px-10">
            <div className="relative h-full">
              <h1 className="absolute left-0" style={{ top: u(191) }}>
                <span className="block font-medium uppercase leading-[1.1241] text-[#E2DADA]" style={{ fontSize: `max(22px, ${u(36)})` }}>
                  <span className="block whitespace-nowrap">Know how well</span>
                  <span className="block whitespace-nowrap" style={{ marginTop: u(5) }}>your body is actually</span>
                </span>
              </h1>
              <p className="comprehensive-serif absolute left-0 whitespace-nowrap italic leading-[normal] text-[#D8F5FF]" style={{ top: u(267), fontSize: `max(60px, ${u(120)})` }}>
                recovering.
              </p>
              <p className="absolute right-0 text-right leading-[normal] text-[#E2DADA]" style={{ top: u(342), width: u(418.5), fontSize: `max(13px, ${u(20)})` }}>
                See the <strong className="font-bold text-white">quality of your sleep, understand your recovery,</strong> and discover what may be helping—or getting in the way.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet (<lg) */}
      <div className="relative z-20 mx-auto flex w-full max-w-[500px] flex-col px-[var(--p20)] lg:hidden" style={{ ["--p20" as string]: m(20), gap: m(48), paddingTop: undefined } as React.CSSProperties}>
        <div className="flex flex-col pt-[var(--pt)]" style={{ ["--pt" as string]: m(24) }}>
          <h1 className="font-medium uppercase leading-[1.416] text-[#E2DADA]" style={{ fontSize: m(24) }}>
            Know how well your body is actually
          </h1>
          <p className="comprehensive-serif italic leading-none text-[#D8F5FF]" style={{ fontSize: m(48) }}>recovering.</p>
        </div>
        <p className="text-right leading-[normal] text-[#E2DADA]" style={{ fontSize: m(16) }}>
          See the <strong className="font-bold text-white">quality of your sleep, understand your recovery,</strong> and discover what may be helping—or getting in the way.
        </p>
      </div>
      {/* no transform / z-index here: that would create a stacking context and break mix-blend-screen */}
      <div className="pointer-events-none absolute lg:hidden" style={{ left: `calc(50% - ${m(349.55)})`, top: m(706), width: m(699.1), height: m(159) }}>
        {M_BEHIND.map((s, i) => (
          <Cloud key={`mb${i}`} s={s} k={m} />
        ))}
        <Person k={m} x={110.27} y={-3.75} w={477} h={168.5} />
        {M_METRICS.map((s) => (
          <Metric key={s.id} s={s} k={m} d={false} />
        ))}
        <Lines k={m} x={169.55} y={-63} w={23.28} h={39} />
        {M_FRONT.map((s, i) => (
          <Cloud key={`mf${i}`} s={s} k={m} />
        ))}
      </div>
    </section>
  );
}
