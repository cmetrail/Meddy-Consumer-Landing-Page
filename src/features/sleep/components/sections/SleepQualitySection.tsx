"use client";

import Image from "next/image";

// Figma: desktop node 11279:3824 (1440 x 1113), mobile node 12115:22799 (402 wide).
// lg+: `u` scales the 1440 frame to the viewport (fits one screen). <lg: `m` scales the 402 frame.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/sleep/quality";
const OVERLAY = "linear-gradient(180deg, rgba(88,59,86,0.4) 0%, rgba(0,0,0,0.55) 100%)";

function Duration() {
  return (
    <>
      7<span className="text-[#A1A1A1]">h</span> 42<span className="text-[#A1A1A1]">m</span>
    </>
  );
}

/** desktop stat: italic label over a value, right aligned, with an optional 110px rule */
function Stat({ label, value, rule }: { label: React.ReactNode; value: React.ReactNode; rule: boolean }) {
  return (
    <div className="flex flex-col items-end" style={{ gap: u(15) }}>
      <div className="flex flex-col items-end" style={{ gap: u(9) }}>
        <span className="text-right font-normal italic uppercase leading-[1.416] text-[#A1A1A1]" style={{ fontSize: `max(11px, ${u(16)})` }}>
          {label}
        </span>
        <span className="whitespace-nowrap font-normal leading-[normal] text-white" style={{ fontSize: `max(20px, ${u(32)})` }}>
          {value}
        </span>
      </div>
      {rule && <div className="border-t border-solid border-[#A1A1A1]" style={{ width: u(110) }} />}
    </div>
  );
}

export default function SleepQualitySection() {
  return (
    <section
      id="sleep-quality"
      className="relative w-full overflow-hidden bg-[#DAD7CF] lg:h-[calc(1113*var(--u))]"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000898472))",
          "--m": "calc(min(100vw, 500px) / 402)",
        } as React.CSSProperties
      }
    >
      {/* ───────── Desktop (lg+) ───────── */}
      <div className="hidden lg:block">
        <Image src={`${A}/d-bg.png`} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 backdrop-blur-[2.5px]" style={{ background: OVERLAY }} />

        {/* big watermark number */}
        <span
          className="pointer-events-none absolute select-none font-bold italic leading-[normal] text-white/[0.16] mix-blend-plus-lighter"
          style={{ left: `calc(max(0px, (100% - 90rem) / 2) + 2.5rem + ${u(33)})`, top: u(48), fontSize: u(96), letterSpacing: u(1.92) }}
        >
          01
        </span>

        <div className="absolute inset-0">
          <div className="mx-auto h-full max-w-360 px-10">
            <div className="relative h-full">
              {/* left copy */}
              <div className="absolute left-0 flex flex-col justify-between" style={{ top: u(390), width: u(346), height: u(472) }}>
                <p className="uppercase leading-[1.416] text-[#A1A1A1]" style={{ fontSize: `max(20px, ${u(32)})` }}>
                  Understand how well you&apos;re <em className="font-bold italic text-white">actually sleeping.</em>
                </p>
                <p className="leading-[1.416] text-[#A1A1A1]" style={{ fontSize: `max(12px, ${u(16)})` }}>
                  A single sleep score brings together the different <strong className="font-bold text-white">dimensions of your sleep.</strong>
                </p>
              </div>

              {/* centre: title + photo, centred on the page */}
              <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center" style={{ top: u(120), width: u(525), gap: u(30) }}>
                <div className="flex flex-col items-center text-center uppercase leading-[1.416]" style={{ gap: u(5), width: u(436) }}>
                  <h2 className="comprehensive-serif whitespace-nowrap italic text-[#E6DFDF]" style={{ fontSize: `max(28px, ${u(46)})` }}>Sleep Quality</h2>
                  <p className="text-[#A1A1A1]" style={{ fontSize: `max(14px, ${u(24)})` }}>More than Just - hours in bed</p>
                </div>
                <div className="relative w-full overflow-hidden" style={{ height: u(605) }}>
                  <Image src={`${A}/d-photo.png`} alt="Woman sleeping peacefully" width={2000} height={1328} sizes="560px" className="absolute max-w-none" style={{ left: "-22.22%", top: 0, width: "173.07%", height: "100%" }} />
                </div>
              </div>

              {/* right: score + stats, flush with the header's right edge */}
              <div className="absolute right-0 flex flex-col items-end" style={{ top: u(342), gap: u(50) }}>
                <div className="flex flex-col items-end" style={{ gap: u(21) }}>
                  <div className="flex flex-col items-end uppercase" style={{ gap: u(4) }}>
                    <span className="italic leading-[1.416] text-[#A1A1A1]" style={{ fontSize: `max(13px, ${u(20)})` }}>Sleep Score</span>
                    <span className="font-normal leading-[normal] text-white" style={{ fontSize: `max(52px, ${u(96)})` }}>84</span>
                  </div>
                  <div className="border-t border-solid border-[#A1A1A1]" style={{ width: u(174) }} />
                </div>
                <div className="flex flex-col items-end" style={{ gap: u(25) }}>
                  <Stat label="Duration" value={<Duration />} rule />
                  <Stat label="Efficiency" value="91%" rule />
                  <Stat label="Consistency" value="86%" rule={false} />
                </div>
              </div>

              {/* architecture */}
              <div className="absolute inset-x-0 flex flex-col items-center text-center uppercase leading-[1.416]" style={{ top: u(926), gap: u(10) }}>
                <span className="italic text-[#A1A1A1]" style={{ fontSize: `max(12px, ${u(16)})` }}>Sleep Architecture</span>
                <span className="font-medium text-white" style={{ fontSize: `max(16px, ${u(24)})` }}>Light • Deep • REM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Mobile / tablet (<lg) ───────── */}
      <div className="relative lg:hidden" style={{ background: OVERLAY }}>
        <div className="absolute inset-0 overflow-hidden">
          <Image src={`${A}/m-bg.png`} alt="" fill sizes="100vw" className="-scale-y-100 object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: OVERLAY }} />

        <div
          className="relative mx-auto flex max-w-[500px] flex-col px-[var(--p20)] py-[var(--p64)]"
          style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(48) } as React.CSSProperties}
        >
          <span
            className="select-none font-bold italic leading-none text-[rgba(216,216,216,0.5)]"
            style={{ fontSize: m(120), letterSpacing: m(2.4), transform: "rotate(-0.31deg)", width: "fit-content" }}
          >
            01
          </span>

          <div className="flex flex-col" style={{ gap: m(24) }}>
            <div className="flex flex-col" style={{ gap: m(48) }}>
              <div className="flex flex-col items-center" style={{ gap: m(16) }}>
                <div className="flex w-full flex-col" style={{ gap: m(32) }}>
                  <div className="flex flex-col items-center text-center uppercase leading-[1.416]" style={{ gap: m(5) }}>
                    <h2 className="comprehensive-serif whitespace-nowrap italic text-[#E6DFDF]" style={{ fontSize: m(32) }}>Sleep Quality</h2>
                    <p className="text-[#A1A1A1]" style={{ fontSize: m(20) }}>More than Just - hours in bed</p>
                  </div>
                  <div className="relative w-full overflow-hidden" style={{ height: m(417) }}>
                    <Image src={`${A}/m-photo.png`} alt="Woman sleeping peacefully" width={2000} height={1328} sizes="500px" className="absolute max-w-none" style={{ left: "-22.22%", top: 0, width: "173.07%", height: "100%" }} />
                  </div>
                </div>
                <div className="flex flex-col items-center text-center uppercase leading-[1.416]" style={{ gap: m(10) }}>
                  <span className="italic text-[#A1A1A1]" style={{ fontSize: m(16) }}>Sleep Architecture</span>
                  <span className="font-medium text-white" style={{ fontSize: m(20) }}>Light • Deep • REM</span>
                </div>
              </div>

              <div className="flex flex-col text-center" style={{ gap: m(16) }}>
                <p className="uppercase leading-[1.416] text-[#A1A1A1]" style={{ fontSize: m(20) }}>
                  Understand how well you&apos;re <em className="font-bold italic text-white">actually sleeping.</em>
                </p>
                <p className="leading-[1.416] text-[#A1A1A1]" style={{ fontSize: m(16) }}>
                  A single sleep score brings together the different <strong className="font-bold text-white">dimensions of your sleep.</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center" style={{ gap: m(16) }}>
              <div className="flex flex-col items-center uppercase" style={{ gap: m(8) }}>
                <span className="italic leading-[1.416] text-[#A1A1A1]" style={{ fontSize: m(12) }}>Sleep Score</span>
                <span className="font-bold leading-[normal] text-white" style={{ fontSize: m(32) }}>84</span>
              </div>
              <div className="flex w-full" style={{ gap: m(25) }}>
                {[
                  { l: "Duration", v: <Duration /> },
                  { l: "Efficiency", v: "91%" },
                  { l: "Consistency", v: "86%" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-1 flex-col items-end border-l border-solid border-[#A1A1A1]" style={{ gap: m(8) }}>
                    <span className="whitespace-nowrap italic uppercase leading-[1.416] text-[#A1A1A1]" style={{ fontSize: m(12) }}>{s.l}</span>
                    <span className="whitespace-nowrap leading-[normal] text-white" style={{ fontSize: m(20) }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
