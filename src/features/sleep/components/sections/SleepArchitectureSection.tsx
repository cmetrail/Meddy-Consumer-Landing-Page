"use client";

import Image from "next/image";

// Desktop frame is 1440 wide; `u` scales it to the viewport width. Mobile is
// rendered with readable static sizes instead of scaling.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;
// mobile scale of the desktop visual group (362 / 626.7)
const MS = 0.5776;
const km = (n: number) => m(n * MS);

const AWAKE = "#E09A2A";
const LIGHT = "#148BD5";
const DEEP = "#C084FC";
const REM = "#FF7043";

const STAGES = [
  { name: "Awake", color: AWAKE, duration: "38m", pct: "8", delta: "+2%", deltaColor: "#FF546B", icon: "icon-up.svg", flip: true },
  { name: "Light", color: LIGHT, duration: "4h 28m", pct: "56", delta: "+3%", deltaColor: "#17925A", icon: "icon-green.svg", flip: true },
  { name: "Deep", color: DEEP, duration: "1h 36m", pct: "20", delta: "+1%", deltaColor: "#17925A", icon: "icon-green.svg", flip: true },
  { name: "REM", color: REM, duration: "1h 17m", pct: "16", delta: "+4%", deltaColor: "#FF5656", icon: "icon-red.svg", flip: false },
];

// Hypnogram bars (x/y/w/h inside a 183 x 92 plot), colour by dominant stage.
const A = "/sleep/architecture";

// Hypnogram segments (inside the 183 x 92 plot): a coloured step + the vertical joiner to the next stage.
// v = [left, top, length, line asset]
const STEPS: { c: string; x: number; y: number; w: number; h?: number; v?: [number, number, number, number] }[] = [
  { c: LIGHT, x: 27.6, y: 42.43, w: 14.313, v: [41.92, 43.45, 17.891, 1] },
  { c: DEEP, x: 41.92, y: 60.32, w: 15.846, v: [57.76, 61.34, 17.891, 2] },
  { c: REM, x: 57.76, y: 78.21, w: 7.156, v: [64.92, 25.56, 53.673, 3] },
  { c: AWAKE, x: 64.92, y: 24.54, w: 2.556, v: [67.47, 25.56, 17.891, 4] },
  { c: LIGHT, x: 67.47, y: 42.43, w: 19.425, v: [86.9, 43.45, 17.891, 1] },
  { c: DEEP, x: 86.9, y: 60.32, w: 12.268, v: [99.16, 61.34, 17.891, 2] },
  { c: REM, x: 99.16, y: 78.21, w: 8.69, v: [107.86, 43.45, 35.782, 5] },
  { c: LIGHT, x: 107.86, y: 42.43, w: 21.469, v: [129.32, 43.45, 35.782, 6] },
  { c: REM, x: 129.32, y: 78.21, w: 10.223, v: [139.55, 25.56, 53.673, 3] },
  { c: AWAKE, x: 139.55, y: 24.54, w: 2.045, h: 2.045, v: [141.59, 25.56, 17.891, 4] },
  { c: LIGHT, x: 141.59, y: 42.43, w: 15.846, v: [157.44, 43.45, 17.891, 1] },
  { c: DEEP, x: 157.44, y: 60.32, w: 7.156, v: [164.6, 61.34, 17.891, 2] },
  { c: REM, x: 164.6, y: 78.21, w: 11.246, v: [175.84, 43.45, 35.782, 5] },
  { c: LIGHT, x: 175.84, y: 42.43, w: 5.112 },
];

const STAGE_LABELS = [
  { name: "Awake", y: 22.49, line: 25.56 },
  { name: "Light", y: 40.38, line: 43.45 },
  { name: "Deep", y: 58.27, line: 61.34 },
  { name: "REM", y: 76.17, line: 79.23 },
];

const TIMELINE = ["11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM"];

type K = (n: number) => string;

/** trend arrow exported from Figma (pass flip for the mirrored ones) */
function DeltaIcon({ src, k, flip }: { src: string; k: K; flip: boolean }) {
  return (
    <Image src={`${A}/${src}`} alt="" width={7} height={7} unoptimized className="shrink-0" style={{ width: k(7.03), height: k(7.03), transform: flip ? "scaleY(-1)" : undefined }} />
  );
}

function Hypnogram({ k, floor = 5 }: { k: K; floor?: number }) {
  return (
    <div className="w-full">
      <div className="relative" style={{ height: k(92.01) }}>
        {STAGE_LABELS.map((s) => (
          <div key={s.name}>
            <span className="absolute left-0 block whitespace-nowrap leading-[1.5] text-[#A6A6A6]" style={{ top: k(s.y), fontSize: `max(calc(${floor}px * var(--fl, 1)), ${k(5.112)})` }}>
              {s.name}
            </span>
            <Image src={`${A}/grid.svg`} alt="" width={158} height={1} unoptimized className="absolute max-w-none" style={{ left: k(22.49), top: k(s.line), width: k(158.46), height: k(0.51) }} />
          </div>
        ))}
        {STEPS.map((st, i) => (
          <div key={i}>
            <span className="absolute block" style={{ left: k(st.x), top: k(st.y), width: k(st.w), height: k(st.h ?? 2.045), background: st.c, borderRadius: k(1.022) }} />
            {st.v && (
              // Figma rotates a horizontal line asset 90deg
              <Image
                src={`${A}/l${st.v[3]}.svg`}
                alt=""
                width={18}
                height={1}
                unoptimized
                className="absolute max-w-none"
                style={{
                  width: k(st.v[2]),
                  height: k(1.53),
                  left: `calc(${k(st.v[0])} - ${k(st.v[2] / 2)})`,
                  top: `calc(${k(st.v[1] + st.v[2] / 2)} - ${k(0.77)})`,
                  transform: "rotate(90deg)",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between pl-[var(--pl)]" style={{ ["--pl" as string]: k(22.49), marginTop: k(4.09) }}>
        {TIMELINE.map((t) => (
          <span key={t} className="whitespace-nowrap leading-[1.5] text-[#A6A6A6]" style={{ fontSize: `max(calc(${floor}px * var(--fl, 1)), ${k(5.112)})` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SleepSummaryCard({ k }: { k: K }) {
  return (
    <div
      className="flex flex-col bg-white/5 p-[var(--p)] backdrop-blur-[6px]"
      style={{ width: k(201.375), gap: k(9), borderRadius: k(13.5), ["--p" as string]: k(9) }}
    >
      <div className="flex flex-col" style={{ gap: k(1.125) }}>
        <span className="leading-[1.5] text-[#C3C3C3]" style={{ fontSize: `max(calc(6px * var(--fl, 1)), ${k(6.75)})` }}>Sleep</span>
        <div className="flex items-center" style={{ gap: k(2.25) }}>
          <span className="whitespace-nowrap font-semibold leading-[1.2] tracking-[-0.015em] text-white" style={{ fontSize: `max(calc(13px * var(--fl, 1)), ${k(18)})` }}>7 hr 42 min</span>
          <span
            className="flex items-center border-solid px-[var(--px)] py-[var(--py)]"
            style={{ gap: k(2.25), background: "rgba(20,139,213,0.1)", borderColor: "rgba(20,139,213,0.2)", borderWidth: k(0.563), borderRadius: 9999, ["--px" as string]: k(5.063), ["--py" as string]: k(1.688) }}
          >
            <span className="whitespace-nowrap leading-[1.5] text-[#148BD5]" style={{ fontSize: `max(calc(6px * var(--fl, 1)), ${k(6.75)})` }}>Very Stable</span>
            <Image src={`${A}/stable.svg`} alt="" width={9} height={9} unoptimized style={{ width: k(9), height: k(9) }} />
          </span>
        </div>
      </div>
      <Hypnogram k={k} />
    </div>
  );
}

const STAGE_COLS = [
  { w: 22, flex: false },
  { w: 129, flex: false },
  { w: 0, flex: true },
  { w: 32, flex: false },
];

function Current30DaysCard({ k }: { k: K }) {
  return (
    <div
      className="flex flex-col bg-[rgba(23,35,29,0.55)] p-[var(--p)] backdrop-blur-[8px]"
      style={{ width: k(251.72), borderRadius: k(16.875), ["--p" as string]: k(11.25) }}
    >
      <span className="leading-[1.5] text-[#F4F4F5]" style={{ fontSize: `max(calc(7px * var(--fl, 1)), ${k(8.438)})` }}>Current 30 Days</span>
      <div className="flex flex-col" style={{ gap: k(12) }}>
        <div className="flex w-full" style={{ gap: k(1.406) }}>
          {STAGES.map((s, i) => (
            <div key={s.name} className="flex min-w-0 flex-col justify-center" style={{ gap: k(2.109), width: STAGE_COLS[i].flex ? undefined : k(STAGE_COLS[i].w), flex: STAGE_COLS[i].flex ? "1 0 0" : "0 0 auto" }}>
              <div className="flex items-end pt-[var(--pt)]" style={{ gap: k(0.703), height: k(42.188), ["--pt" as string]: k(8.438) }}>
                <span className="block h-full shrink-0" style={{ width: k(1.406), background: s.color }} />
                <span className="block h-full flex-1" style={{ background: s.color }} />
              </div>
              <span className="font-bold leading-[1.5] text-[#F4F4F5]" style={{ fontSize: `max(calc(7px * var(--fl, 1)), ${k(8.438)})` }}>{s.pct}%</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center" style={{ gap: k(5.625), width: k(229.2) }}>
          {STAGES.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between bg-[#F8F8F8] px-[var(--px)] py-[var(--py)]"
              style={{ borderRadius: k(4.219), ["--px" as string]: k(5.625), ["--py" as string]: k(4.219) }}
            >
              <div className="flex items-center" style={{ gap: k(4.219) }}>
                <span className="block" style={{ width: k(8.438), height: k(8.438), background: s.color, borderRadius: k(1.406) }} />
                <span className="flex items-end" style={{ gap: k(4) }}>
                  <span className="font-medium leading-[1.5] text-[#111110]" style={{ fontSize: `max(calc(8px * var(--fl, 1)), ${k(9.844)})` }}>{s.name}</span>
                  <span className="leading-[1.5] text-[#111110] opacity-70" style={{ fontSize: `max(calc(7px * var(--fl, 1)), ${k(8)})` }}>{s.duration}</span>
                </span>
              </div>
              <div className="flex items-center" style={{ gap: k(4.219) }}>
                <span className="flex items-center text-[#111110]" style={{ gap: k(1.406), fontSize: `max(calc(8px * var(--fl, 1)), ${k(9.844)})` }}>
                  <span className="font-semibold leading-[1.5]">{s.pct}</span>
                  <span className="font-medium leading-[1.5]">%</span>
                </span>
                <span className="flex items-center" style={{ gap: k(2.813) }}>
                  <DeltaIcon src={s.icon} k={k} flip={s.flip} />
                  <span className="font-medium leading-[1.5]" style={{ fontSize: `max(calc(6px * var(--fl, 1)), ${k(7.031)})`, color: s.deltaColor }}>{s.delta}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SleepArchitectureSection() {
  return (
    <section
      id="sleep-architecture"
      className="relative w-full overflow-hidden bg-[#DAD7CF] lg:h-[calc(1060*var(--u))]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000943396))" } as React.CSSProperties}
    >
      {/* Background photo (object-cover, as in Figma) */}
      <div className="absolute inset-0">
        <Image src="/sleep/architecture/d-bg.png" alt="" fill sizes="100vw" className="object-cover" />
      </div>

      {/* ─── Desktop: inside the header container (max-w-360, px-10) ──── */}
      <div className="absolute inset-0 z-10 hidden lg:block">
        <span
          className="pointer-events-none absolute select-none font-bold italic leading-[normal] text-white/[0.16] mix-blend-plus-lighter"
          style={{ left: `calc(max(0px, (100% - 90rem) / 2) + 2.5rem + ${u(33)})`, top: u(95.7), fontSize: u(96), letterSpacing: u(1.92) }}
        >
          02
        </span>

        <div className="mx-auto h-full max-w-360 px-10">
          <div className="relative h-full">
            <div className="absolute inset-x-0 flex flex-col items-center text-center uppercase leading-[1.416]" style={{ top: u(120), gap: u(5) }}>
              <h2 className="comprehensive-serif whitespace-nowrap italic text-[#E6DFDF]" style={{ fontSize: `max(30px, ${u(46)})` }}>Sleep Architecture</h2>
              <p className="whitespace-nowrap text-[#A1A1A1]" style={{ fontSize: `max(16px, ${u(24)})` }}>See what happens while you sleep</p>
            </div>

            {/* left visual group */}
            <div className="absolute left-0" style={{ top: u(333.5), width: u(626.72), height: u(606.5) }}>
              <div className="absolute overflow-hidden" style={{ left: u(8), top: u(39.5), width: u(492), height: u(567) }}>
                <Image src="/sleep/architecture/d-person.png" alt="Person asleep, tracked by Meddy" fill sizes="520px" className="object-cover" />
              </div>
              <div className="absolute left-0 top-0">
                <SleepSummaryCard k={u} />
              </div>
              <div className="absolute" style={{ left: u(375), top: u(392.5) }}>
                <Current30DaysCard k={u} />
              </div>
            </div>

            {/* right copy */}
            <div className="absolute right-0 flex flex-col justify-between text-right" style={{ top: u(333), width: u(515), height: u(607) }}>
              <p className="uppercase leading-[1.416] text-[#A1A1A1]" style={{ fontSize: `max(22px, ${u(32)})` }}>
                See your night <em className="italic text-white">beneath the surface.</em>
              </p>
              <p className="leading-[1.416] text-[#A1A1A1]" style={{ fontSize: `max(14px, ${u(20)})` }}>
                <strong className="font-bold text-white">Understand how your sleep is distributed</strong> across the stages your body moves through each night.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile / tablet (<lg): Figma 12243:25057 — the desktop visual group scaled to 362 wide ─── */}
      <div className="relative lg:hidden" style={{ ["--m" as string]: "calc(min(100vw, 500px) / 402)" } as React.CSSProperties}>
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/sleep/architecture/m-bg.png" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative mx-auto flex max-w-[500px] flex-col px-[var(--p20)] py-[var(--p64)]" style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(48) } as React.CSSProperties}>
          <span className="select-none font-bold italic leading-none text-[rgba(216,216,216,0.5)]" style={{ fontSize: m(120), letterSpacing: m(2.4), transform: "rotate(-0.31deg)", width: "fit-content" }}>
            02
          </span>

          <div className="flex flex-col" style={{ gap: m(48) }}>
            <div className="flex flex-col" style={{ gap: m(32) }}>
              <div className="flex flex-col items-center text-center uppercase leading-[1.416]" style={{ gap: m(5) }}>
                <h2 className="comprehensive-serif italic text-[#E6DFDF]" style={{ fontSize: m(32) }}>Sleep Architecture</h2>
                <p className="text-[#A1A1A1]" style={{ fontSize: m(20) }}>See what happens while you sleep</p>
              </div>

              {/* visual group: same pieces as desktop, every size x 0.5776 */}
              <div className="relative" style={{ width: m(362), height: m(350.3), ["--fl" as string]: 0 } as React.CSSProperties}>
                <div className="absolute overflow-hidden" style={{ left: m(8 * MS), top: m(39.5 * MS), width: m(492 * MS), height: m(567 * MS) }}>
                  <Image src="/sleep/architecture/d-person.png" alt="Person asleep, tracked by Meddy" fill sizes="300px" className="object-cover" />
                </div>
                <div className="absolute left-0 top-0">
                  <SleepSummaryCard k={km} />
                </div>
                <div className="absolute" style={{ left: m(375 * MS), top: m(392.5 * MS) }}>
                  <Current30DaysCard k={km} />
                </div>
              </div>
            </div>

            <div className="flex flex-col text-right" style={{ gap: m(16) }}>
              <p className="uppercase leading-[1.416] text-[#A1A1A1]" style={{ fontSize: m(20) }}>
                See your night <em className="italic text-white">beneath the surface.</em>
              </p>
              <p className="leading-[1.416] text-[#A1A1A1]" style={{ fontSize: m(16) }}>
                <strong className="font-bold text-white">Understand how your sleep is distributed</strong> across the stages your body moves through each night.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
