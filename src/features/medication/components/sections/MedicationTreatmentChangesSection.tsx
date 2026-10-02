"use client";

import Image from "next/image";

// Figma: desktop node 11274:1325 (1440 x 1024), mobile node 12306:30580 (402 x 873).
// lg+: `u` scales the 1440 frame to the viewport (fits one screen).
// <lg: `m` scales the 402 frame (capped at 500px wide).
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/medication/treatment";

// desktop timeline markers (x / y inside the 1326 x 166 KPI graph, w = label box width)
const D_MARKERS = [
  { label: "Baseline", date: "Jan 2026", x: 102, y: 77, dot: "dot-baseline.svg", d: 17, gap: 10, w: 68 },
  { label: "Dose increased", date: "Mar 2026", x: 477, y: 0, dot: "dot-baseline.svg", d: 17, gap: 10, w: 119 },
  { label: "Follow up", date: "Jul 2026", x: 936, y: 95, dot: "dot-follow.svg", d: 17, gap: 10, w: 74, medium: true },
  { label: "Physician Review", date: "Oct 2026", x: 1217, y: 34, dot: "dot-review.svg", d: 19, gap: 20, w: 73 },
];

// mobile markers (x / y inside the 362 x 141 graph)
const M_MARKERS = [
  { label: "Dose increased", date: "Mar 2026", x: 87.4, y: 0, w: 88.1, gap: 3.66 },
  { label: "Follow up", date: "Jul 2026", x: 193.84, y: 82.67, w: 55.4, gap: 3.66, medium: true },
  { label: "Baseline", date: "Jan 2026", x: 3.75, y: 85.42, w: 50.5, gap: 3.66 },
  { label: "Physician Review", date: "Oct 2026", x: 267, y: 52.11, w: 95, gap: 7.3 },
];

export default function MedicationTreatmentChangesSection() {
  return (
    <section
      id="treatment"
      className="relative w-full overflow-hidden bg-[#F0FFF2] lg:h-[calc(1024*var(--u))]"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.0009765625))",
          "--m": "calc(min(100vw, 500px) / 402)",
        } as React.CSSProperties
      }
    >
      {/* Desktop (lg+): inside the header container (max-w-360, px-10); equal space above the title and below the card */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-360 px-10">
          <div className="relative h-full">
            {/* Title (left) */}
            <div className="absolute flex flex-col uppercase leading-[normal]" style={{ left: 0, top: u(128), gap: u(10), fontSize: `max(22px, ${u(36)})` }}>
              <span className="whitespace-nowrap text-[#6E7A72]">See what happens</span>
              <span className="whitespace-nowrap font-medium italic text-[#46524B]">when your treatment changes.</span>
            </div>

            {/* Question (right) */}
            <div className="absolute flex flex-col items-end whitespace-nowrap leading-[normal]" style={{ right: 0, top: u(217.5) }}>
              <span className="text-[#6E7A72]" style={{ fontSize: `max(20px, ${u(32)})` }}>A medication changed</span>
              <span className="comprehensive-serif italic text-[#46524B]" style={{ fontSize: `max(22px, ${u(34)})` }}>What happened next?</span>
            </div>

            {/* KPI timeline: spans the container; markers sit at their Figma x (as % of 1326) */}
            <div className="absolute inset-x-0" style={{ top: u(365.5), height: u(166) }}>
              <Image src={`${A}/wave.svg`} alt="" width={1326} height={144} unoptimized className="absolute left-0 w-full max-w-none" style={{ top: u(5.5), height: u(143) }} />
              {D_MARKERS.map((mk) => (
                <div key={mk.label} className="absolute flex -translate-x-1/2 flex-col items-center" style={{ left: `${((mk.x + mk.w / 2) / 1326) * 100}%`, top: u(mk.y), gap: u(mk.gap) }}>
                  <Image src={`${A}/${mk.dot}`} alt="" width={mk.d} height={mk.d} unoptimized style={{ width: u(mk.d), height: u(mk.d) }} />
                  <div className="flex flex-col items-center whitespace-nowrap leading-[normal]" style={{ gap: u(4), fontSize: `max(11px, ${u(16)})`, fontWeight: mk.medium ? 500 : 400 }}>
                    <span className="text-[#8DC8A1]">{mk.label}</span>
                    <span className="text-[#17925A]">{mk.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row: copy (left) */}
            <div className="absolute flex flex-col" style={{ left: 0, top: u(584.2), width: u(562), gap: u(134) }}>
              <p className="leading-[normal] text-[#46524B]" style={{ width: u(545), fontSize: `max(22px, ${u(36)})` }}>
                Meddy can show your health before and after a medication is started, stopped, or adjusted.
              </p>
              <div className="flex items-center" style={{ gap: u(8) }}>
                <Image src={`${A}/bar.svg`} alt="" width={7} height={40} unoptimized className="shrink-0" style={{ width: u(7), height: u(40), transform: "scaleY(-1)" }} />
                <p className="uppercase italic leading-[normal] text-[#6E7A72]" style={{ width: u(547), fontSize: `max(11px, ${u(16)})` }}>
                  Compare medication changes with the health measures they&apos;re intended to improve.
                </p>
              </div>
            </div>

            {/* Bottom row: metric card (right) */}
            <div
              className="absolute border-solid border-white bg-[#83C080] p-[var(--cp)] backdrop-blur-[10px]"
              style={{ right: 0, top: u(581.5), width: u(483), height: u(314.4), borderWidth: u(1.474), borderRadius: u(12.128), ["--cp" as string]: u(24.255) }}
            >
              <div className="flex" style={{ gap: u(35.384), height: u(92) }}>
                {[
                  { l: "Baseline", v: "6.4 %" },
                  { l: "12 weeks follow up", v: "5.9 %" },
                ].map((c) => (
                  <div key={c.l} className="flex flex-1 flex-col border-l border-solid border-white pl-[var(--pl)]" style={{ ["--pl" as string]: u(8) }}>
                    <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: `max(12px, ${u(17.692)})` }}>{c.l}</span>
                    <span className="whitespace-nowrap font-semibold leading-[1.416] text-white" style={{ fontSize: `max(28px, ${u(47.179)})` }}>{c.v}</span>
                  </div>
                ))}
              </div>

              <div className="relative" style={{ marginTop: u(32), width: u(434.5), height: u(141.9) }}>
                <div className="absolute overflow-hidden" style={{ left: 0, top: 0, width: u(209.1), height: u(120.9), transform: "scaleX(-1)" }}>
                  <Image src={`${A}/chart-1.svg`} alt="" width={210} height={122} unoptimized className="absolute max-w-none" style={{ left: "-0.2%", top: "-0.61%", width: "100.2%", height: "100.61%" }} />
                </div>
                <div className="absolute" style={{ left: u(210.03), top: u(85.5), width: u(224.47), height: u(34.65) }}>
                  <Image src={`${A}/chart-2.svg`} alt="" width={225} height={36} unoptimized className="absolute max-w-none" style={{ left: "-0.14%", top: "-1.93%", width: "100.14%", height: "101.93%" }} />
                </div>
                {/* "now" marker: Figma rotates a horizontal line asset 90deg */}
                <Image
                  src={`${A}/line.svg`}
                  alt=""
                  width={50}
                  height={7}
                  unoptimized
                  className="absolute max-w-none"
                  style={{
                    width: u(49.76),
                    height: u(6.84),
                    left: `calc(${u(210.16)} - ${u(24.88)})`,
                    top: `calc(${u(74.53 - 3.42 + 24.88)} - ${u(3.42)})`,
                    transform: "rotate(90deg)",
                  }}
                />
                <div className="absolute inset-x-0 flex items-center justify-between whitespace-nowrap leading-[1.416] text-white" style={{ top: u(120.9), fontSize: `max(10px, ${u(14.743)})` }}>
                  <span>Baseline</span>
                  <span>12 weeks follow up</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet (<lg): Figma node 12306:30580, 1 design px = --m */}
      <div
        className="mx-auto flex max-w-[500px] flex-col px-[var(--p20)] py-[var(--p64)] lg:hidden"
        style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(32) } as React.CSSProperties}
      >
        <div className="flex flex-col" style={{ gap: m(48) }}>
          {/* Title + question */}
          <div className="flex flex-col leading-[normal]" style={{ gap: m(16), width: m(357) }}>
            <div className="flex flex-col uppercase">
              <span className="whitespace-nowrap text-[#A1AAA3]" style={{ fontSize: m(20) }}>See what happens</span>
              <span className="font-medium italic text-[#46524B]" style={{ fontSize: m(32) }}>when your treatment changes.</span>
            </div>
            <div className="flex flex-col items-end whitespace-nowrap" style={{ fontSize: m(20) }}>
              <span className="text-[#6E7A72]">A medication changed</span>
              <span className="comprehensive-serif italic text-[#46524B]">What happened next?</span>
            </div>
          </div>

          {/* KPI graph */}
          <div className="relative" style={{ width: m(362), height: m(141.5) }}>
            <Image src={`${A}/m-wave.svg`} alt="" width={343} height={141} unoptimized className="absolute left-0 max-w-none" style={{ top: m(0.66), width: m(343), height: m(140.8) }} />
            {M_MARKERS.map((mk) => (
              <div key={mk.label} className="absolute flex flex-col items-center" style={{ left: m(mk.x), top: m(mk.y), width: m(mk.w), gap: m(mk.gap) }}>
                <Image src={`${A}/m-dot.svg`} alt="" width={6} height={6} unoptimized style={{ width: m(6.2), height: m(6.2) }} />
                <div className="flex flex-col items-center whitespace-nowrap leading-[normal]" style={{ gap: m(1.46), fontSize: m(10), fontWeight: mk.medium ? 500 : 400 }}>
                  <span className="text-[#8DC8A1]">{mk.label}</span>
                  <span className="text-[#17925A]">{mk.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copy + card + note */}
        <div className="flex flex-col" style={{ gap: m(24) }}>
          <p className="leading-[normal] text-[#46524B]" style={{ fontSize: m(16) }}>
            Meddy can show your health before and after a medication is started, stopped, or adjusted.
          </p>

          <div
            className="flex flex-col items-center justify-center border-solid border-white bg-[#83C080] p-[var(--cp)] backdrop-blur-[10px]"
            style={{ gap: m(16), borderWidth: m(1.474), borderRadius: m(12.128), ["--cp" as string]: m(16) }}
          >
            <div className="flex" style={{ width: m(328) }}>
              {[
                { l: "Baseline", v: "6.4 %" },
                { l: "12 weeks follow up", v: "5.9 %" },
              ].map((c) => (
                <div key={c.l} className="flex flex-1 flex-col border-l border-solid border-white pl-[var(--pl)]" style={{ ["--pl" as string]: m(8) }}>
                  <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: m(12) }}>{c.l}</span>
                  <span className="whitespace-nowrap font-semibold leading-[1.416] text-white" style={{ fontSize: m(20) }}>{c.v}</span>
                </div>
              ))}
            </div>

            <div className="relative" style={{ width: m(328), height: m(134.9) }}>
              <div className="absolute overflow-hidden" style={{ left: 0, top: 0, width: m(152.9), height: m(120.9), transform: "scaleX(-1)" }}>
                <Image src={`${A}/m-chart-1.svg`} alt="" width={154} height={122} unoptimized className="absolute max-w-none" style={{ left: "-0.33%", top: "-0.61%", width: "100.33%", height: "100.61%" }} />
              </div>
              <div className="absolute" style={{ left: m(153.6), top: m(85.5), width: m(164.2), height: m(34.65) }}>
                <Image src={`${A}/m-chart-2.svg`} alt="" width={165} height={36} unoptimized className="absolute max-w-none" style={{ left: "-0.24%", top: "-1.8%", width: "100.24%", height: "101.8%" }} />
              </div>
              <Image
                src={`${A}/m-line.svg`}
                alt=""
                width={50}
                height={7}
                unoptimized
                className="absolute max-w-none"
                style={{
                  width: m(49.76),
                  height: m(6.84),
                  left: `calc(${m(152.16)} - ${m(24.88)})`,
                  top: `calc(${m(74.53 - 3.42 + 24.88)} - ${m(3.42)})`,
                  transform: "rotate(90deg)",
                }}
              />
              <div className="absolute inset-x-0 flex items-center justify-between whitespace-nowrap leading-[1.416] text-white" style={{ top: m(120.9), fontSize: m(10) }}>
                <span>Baseline</span>
                <span>12 weeks follow up</span>
              </div>
            </div>
          </div>

          <div className="flex items-center" style={{ gap: m(8) }}>
            <Image src={`${A}/m-bar.svg`} alt="" width={7} height={30} unoptimized className="shrink-0" style={{ width: m(7), height: m(30), transform: "scaleY(-1)" }} />
            <p className="uppercase italic leading-[normal] text-[#6E7A72]" style={{ fontSize: m(12) }}>
              Compare medication changes with the health measures they&apos;re intended to improve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
