"use client";

import Image from "next/image";

// Figma: desktop node 11279:4039 "Desktop - 357" (1440 x 1024), mobile node 12223:24116 (402 wide).
// Section "03" — three cards: 30-day score, consistency photo card, bed/wake schedule.
const u = (n: number) => `calc(${n} * var(--u))`;

const A = "/sleep/consistency";

const BARS: [number, number][] = [[83, 41], [93, 26], [105, 12], [103, 11], [102, 12], [102, 12], [102, 15], [102, 25], [102, 44], [102, 60], [102, 70], [102, 78], [102, 83], [102, 81], [102, 78], [102, 73], [102, 68], [102, 63], [102, 54], [102, 36], [102, 17], [102, 9], [102, 0], [102, 0], [102, 3], [102, 9], [102, 20], [102, 25], [102, 36]];

const GREEN = "#81A972";
const DARK = "#4D3131";

function Score94() {
  return (
    <span className="flex items-baseline gap-[10px] text-white">
      <span className="text-[64px] uppercase leading-none lg:text-[length:max(40px,var(--d64))]" style={{ ["--d64" as string]: u(64) }}>
        94
      </span>
      <span className="text-[48px] uppercase leading-none lg:text-[length:max(32px,var(--d48))]" style={{ ["--d48" as string]: u(48) }}>
        %
      </span>
    </span>
  );
}

function Time({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="flex items-baseline gap-[6px] text-white">
      <span className="text-[32px] uppercase leading-none lg:text-[length:max(24px,var(--d40))]" style={{ ["--d40" as string]: u(40) }}>
        {value}
      </span>
      <span className="text-[24px] leading-none text-[#DFDFDF] lg:text-[length:max(16px,var(--d24))]" style={{ ["--d24" as string]: u(24) }}>
        {unit}
      </span>
    </span>
  );
}

export default function SleepConsistencySection() {
  return (
    <section
      id="sleep-consistency"
      className="relative w-full bg-[#FAF9F5]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.001005025))" } as React.CSSProperties}
    >
      {/* ─── Desktop: Figma 11279:4039 (1440 x 995); cards sit in the header container ─── */}
      <div className="relative hidden overflow-hidden lg:block" style={{ height: u(995) }}>
        <div className="mx-auto h-full max-w-360 px-10">
          <div className="relative pt-[var(--pt)]" style={{ ["--pt" as string]: u(200) }}>
            <span
              className="pointer-events-none absolute select-none font-bold italic leading-[normal] text-[rgba(216,216,216,0.5)]"
              style={{ left: u(-20), top: u(30), fontSize: u(180), letterSpacing: u(3.6), transform: "rotate(-0.31deg)" }}
            >
              03
            </span>

            <div className="relative flex" style={{ height: u(675), gap: u(15) }}>
              {/* Card 1 — 30-day score */}
              <div className="relative flex-1 overflow-hidden" style={{ background: GREEN, borderRadius: u(15) }}>
                {[
                  [220, 93, "d-line83.svg", 101],
                  [312, 93, "d-line83.svg", 101],
                  [406, 93, "d-line83.svg", 101],
                  [406, 211, "d-line86.svg", 219],
                ].map(([top, len, src, w], i) => (
                  <Image
                    key={i}
                    src={`${A}/${src}`}
                    alt=""
                    width={Number(w)}
                    height={16}
                    unoptimized
                    className="absolute max-w-none"
                    style={{
                      width: u(Number(w)),
                      height: u(16),
                      left: `calc(${u(37)} - ${u(Number(w) / 2)})`,
                      top: `calc(${u(Number(top) + Number(w) / 2)} - ${u(8)})`,
                      transform: "rotate(90deg)",
                    }}
                  />
                ))}
                <div className="absolute flex flex-col uppercase" style={{ left: u(24), top: u(41) }}>
                  <span className="whitespace-nowrap font-medium italic leading-[1.416] text-[#DFDFDF]" style={{ fontSize: `max(14px, ${u(20)})` }}>30 days</span>
                  <span className="whitespace-nowrap font-normal text-white" style={{ lineHeight: 1.416 }}>
                    <span style={{ fontSize: `max(40px, ${u(64)})` }}>94</span>
                    <span style={{ fontSize: `max(30px, ${u(48)})` }}>%</span>
                  </span>
                </div>
              </div>

              {/* Card 2 — photo */}
              <div className="relative flex-1 overflow-hidden" style={{ background: DARK, borderRadius: u(15) }}>
                <div className="absolute left-0 top-0 overflow-hidden" style={{ width: u(743), height: u(675) }}>
                  <Image src={`${A}/d-photo.png`} alt="Woman resting in bed with a book" width={820} height={1024} sizes="760px" className="absolute max-w-none" style={{ left: "-10.41%", top: "-18.79%", width: "100%", height: "137.46%" }} />
                </div>
                <Image src={`${A}/d-line82.svg`} alt="" width={256} height={2} unoptimized className="absolute max-w-none" style={{ width: u(256), height: u(2), left: `calc(${u(52)} - ${u(128)})`, top: `calc(${u(224 + 128)} - ${u(1)})`, transform: "rotate(90deg)" }} />

                <div className="absolute flex flex-col text-white" style={{ left: u(31), right: u(31), top: u(18) }}>
                  <h3 className="comprehensive-serif text-right italic uppercase leading-[1.416]" style={{ fontSize: `max(30px, ${u(50)})` }}>Consistency</h3>
                  <p className="text-center font-medium uppercase leading-[1.416]" style={{ fontSize: `max(14px, ${u(20)})` }}>
                    <span className="text-[#F2F2F2]">Your body </span>
                    <strong className="font-bold">keeps a schedule</strong>
                  </p>
                </div>
                <div className="absolute flex flex-col items-center text-center text-[#E6DFDF]" style={{ left: u(42), right: u(42), top: u(492), gap: u(14) }}>
                  <p className="font-medium uppercase leading-[1.416]" style={{ fontSize: `max(16px, ${u(24)})`, maxWidth: u(320) }}>Good sleep isn&apos;t just about one good night.</p>
                  <p className="leading-[1.416]" style={{ fontSize: `max(12px, ${u(16)})`, maxWidth: u(320) }}>
                    See how consistently you&apos;re sleeping and waking—and <strong className="font-bold text-white">whether your sleep patterns are improving over time.</strong>
                  </p>
                </div>
              </div>

              {/* Card 3 — bed / wake schedule */}
              <div className="relative flex-1 overflow-hidden" style={{ background: GREEN, borderRadius: u(15) }}>
                <div className="absolute" style={{ left: u(17), right: u(17), top: u(43) }}>
                  <div className="flex items-center justify-between">
                    {[
                      { l: "Bed time", t: "6:42", ap: "pm", end: false },
                      { l: "Wake time", t: "8:05", ap: "am", end: true },
                    ].map((x) => (
                      <div key={x.l} className={`flex flex-col whitespace-nowrap ${x.end ? "items-end" : "items-start"}`}>
                        <span className="font-medium uppercase italic leading-[1.416] text-[#DFDFDF]" style={{ fontSize: `max(14px, ${u(20)})`, marginBottom: u(-15) }}>{x.l}</span>
                        <span className="text-white" style={{ lineHeight: 1.416 }}>
                          <span style={{ fontSize: `max(26px, ${u(40)})` }}>{x.t}</span>
                          <span style={{ fontSize: `max(40px, ${u(64)})` }}> </span>
                          <span className="text-[#DFDFDF]" style={{ fontSize: `max(16px, ${u(24)})` }}>{x.ap}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* waveform of bars, spread across the card */}
                  <div className="relative" style={{ marginTop: u(124), height: u(185) }}>
                    {BARS.map(([h, top], i) => (
                      <span
                        key={i}
                        className="absolute block"
                        style={{
                          left: `${((i * 13.0282) / 370.0003) * 100}%`,
                          top: u(top + 0),
                          width: u(5.211),
                          height: u(h),
                          borderRadius: u(47),
                          background: i < 20 ? "#ADB9A4" : "#FFFFFF",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="absolute leading-[1.416] text-white" style={{ left: u(17), right: u(17), top: u(591), fontSize: `max(11px, ${u(14)})` }}>
                  This is where your <strong className="font-bold">circadian/consistency scoring becomes tangible.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile ──────────────────────────────────────────────── */}
      <div className="relative flex flex-col gap-[16px] py-[64px] lg:hidden">
        <span className="pointer-events-none select-none pl-5 text-[120px] font-bold italic leading-none text-[rgba(216,216,216,0.5)]">
          03
        </span>

        <div className="flex snap-x snap-mandatory gap-[15px] overflow-x-auto px-5 pb-2">
          {/* Card 1 */}
          <div className="relative h-[675px] w-[362px] shrink-0 snap-center overflow-hidden rounded-[15px] p-[24px]" style={{ background: GREEN }}>
            <span className="text-[20px] font-medium italic uppercase leading-[1.42] text-[#DFDFDF]">
              30 days
            </span>
            <div className="mt-[16px]">
              <Score94 />
            </div>
            <Image
              src={`${A}/score-chart.svg`}
              alt=""
              width={16}
              height={405}
              unoptimized
              className="absolute"
              style={{ left: 37, top: 220, width: 16, height: 405 }}
            />
          </div>

          {/* Card 2 */}
          <div className="relative h-[675px] w-[362px] shrink-0 snap-center overflow-hidden rounded-[15px] p-[24px]" style={{ background: DARK }}>
            <Image src={`${A}/consistency-photo-78fd6d.png`} alt="" fill sizes="400px" className="object-cover" />
            <div className="relative flex h-full flex-col">
              <h3 className="comprehensive-serif italic text-[32px] uppercase leading-[1.42] text-white">
                Consistency
              </h3>
              <p className="text-center text-[20px] uppercase leading-[1.42] text-white">
                <span className="text-[#F2F2F2]">Your body </span>
                <strong className="font-bold">keeps a schedule</strong>
              </p>
              <div className="mt-auto flex flex-col gap-[14px] text-center">
                <p className="text-[20px] font-medium uppercase leading-[1.42] text-[#E6DFDF]">
                  Good sleep isn&apos;t just about one good night.
                </p>
                <p className="text-[16px] leading-[1.42] text-[#E6DFDF]">
                  See how consistently you&apos;re sleeping and waking—and{" "}
                  <strong className="font-bold text-white">
                    whether your sleep patterns are improving over time.
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative h-[675px] w-[362px] shrink-0 snap-center overflow-hidden rounded-[15px] p-[24px]" style={{ background: GREEN }}>
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[20px] font-medium italic uppercase leading-[1.42] text-[#DFDFDF]">
                    Bed time
                  </span>
                  <Time value="6:42" unit="pm" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[20px] font-medium italic uppercase leading-[1.42] text-[#DFDFDF]">
                    Wake time
                  </span>
                  <Time value="8:05" unit="am" />
                </div>
              </div>
              <Image
                src={`${A}/schedule-chart.svg`}
                alt=""
                width={370}
                height={185}
                unoptimized
                className="h-auto w-full"
              />
              <p className="text-[14px] leading-[1.42] text-white">
                This is where your{" "}
                <strong className="font-bold">circadian/consistency scoring becomes tangible.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
