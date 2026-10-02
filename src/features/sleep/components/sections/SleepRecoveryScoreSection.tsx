import Image from "next/image";

// Figma: desktop node 11279:4093 (1440 x 1233), mobile node 12223:24388.
// Section "04": "Recovery" heading + recovery score card over an elliptical photo.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/sleep/recovery/score";
type K = (n: number) => string;

// bar heights in the 86px chart row (34 bars); #28 is the highlighted night
const BAR_H = [76, 66, 76, 76, 62, 76, 76, 76, 76, 76, 76, 86, 76, 76, 76, 76, 66, 76, 76, 76, 76, 62, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76];
const HI = 28;

const Y_LABELS = ["20:00", "00:00", "04:00", "08:00", "12:00"];

/** white recovery card (358 x 278 design px) */
function RecoveryScoreCard({ k }: { k: K }) {
  return (
    <div className="flex flex-col bg-white p-[var(--p)]" style={{ width: k(358), height: k(278), gap: k(16), borderRadius: k(24), ["--p" as string]: k(16) }}>
      <div className="flex flex-col" style={{ gap: k(2) }}>
        <span className="leading-[1.5] text-[#B3B3B3]" style={{ fontSize: `max(calc(8px * var(--fl, 1)), ${k(12)})` }}>Score</span>
        <div className="flex items-center" style={{ gap: k(4) }}>
          <span className="whitespace-nowrap font-semibold leading-[1.2] tracking-[-0.015em] text-[#111110]" style={{ fontSize: `max(calc(18px * var(--fl, 1)), ${k(32)})` }}>93%</span>
          <span className="flex items-center" style={{ gap: k(4) }}>
            <Image src={`${A}/icon-up.svg`} alt="" width={16} height={16} unoptimized style={{ width: k(16), height: k(16), transform: "scaleY(-1)" }} />
            <span className="whitespace-nowrap font-medium leading-[1.5] text-[#17925A]" style={{ fontSize: `max(calc(10px * var(--fl, 1)), ${k(14)})` }}> 10%</span>
          </span>
          <span
            className="flex items-center border border-solid border-[rgba(20,139,213,0.2)] bg-[rgba(20,139,213,0.1)] px-[var(--px)] py-[var(--py)]"
            style={{ gap: k(4), borderRadius: 9999, ["--px" as string]: k(9), ["--py" as string]: k(3) }}
          >
            <span className="whitespace-nowrap leading-[1.5] text-[#148BD5]" style={{ fontSize: `max(calc(8px * var(--fl, 1)), ${k(12)})` }}>Very Stable</span>
            <Image src={`${A}/stable.svg`} alt="" width={16} height={16} unoptimized style={{ width: k(16), height: k(16) }} />
          </span>
        </div>
      </div>

      <div className="flex flex-col pt-[var(--pt)]" style={{ ["--pt" as string]: k(12) }}>
        <div className="relative flex items-end" style={{ gap: k(12), height: k(130) }}>
          {/* y labels */}
          <div className="flex flex-col justify-center font-semibold leading-[1.5]" style={{ width: k(36), gap: k(10), fontSize: `max(calc(8px * var(--fl, 1)), ${k(12)})` }}>
            {Y_LABELS.map((t, i) => (
              <span key={t} className="whitespace-nowrap" style={{ color: i === 0 ? "#B3B3B3" : "#111110" }}>{t}</span>
            ))}
          </div>
          {/* grid + bars */}
          <div className="absolute" style={{ left: k(41), right: 0, top: 0, bottom: 0 }}>
            {[1, 29, 57, 85].map((y) => (
              <Image key={y} src={`${A}/grid.svg`} alt="" width={285} height={18} unoptimized className="absolute max-w-none" style={{ left: 0, top: k(y), width: "100%", height: k(18) }} />
            ))}
            <Image src={`${A}/grid-bottom.svg`} alt="" width={285} height={19} unoptimized className="absolute max-w-none" style={{ left: 0, top: k(111), width: "100%", height: k(19) }} />
            <div className="absolute flex items-center" style={{ left: k(5), top: k(23), width: k(280), height: k(86), gap: k(5) }}>
              {BAR_H.map((h, i) => (
                <span key={i} className="relative block flex-1" style={{ height: k(h), borderRadius: k(1), background: i === HI ? "#6EE7A0" : "#17925A" }}>
                  {i === HI && (
                    <>
                      <Image src={`${A}/marker.svg`} alt="" width={1} height={86} unoptimized className="absolute max-w-none" style={{ left: "50%", top: k(-5), width: 1, height: k(86) }} />
                      <span className="absolute -translate-x-1/2 whitespace-nowrap font-bold leading-[1.5] text-[#111110]" style={{ left: "50%", top: k(-30), fontSize: `max(calc(8px * var(--fl, 1)), ${k(12)})` }}>00:07</span>
                      <span className="absolute -translate-x-1/2 whitespace-nowrap font-bold leading-[1.5] text-[#111110]" style={{ left: "50%", top: k(h + 4), fontSize: `max(calc(8px * var(--fl, 1)), ${k(12)})` }}>8:03</span>
                    </>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* x axis */}
        <div className="flex pl-[var(--pl)]" style={{ ["--pl" as string]: k(36), marginTop: k(2) }}>
          {Array.from({ length: 28 }, (_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center" style={{ gap: k(2) }}>
              <span className="block bg-[#E2E2E2]" style={{ width: 1, height: k(8) }} />
              {i % 2 === 1 && (
                <span className="whitespace-nowrap font-semibold leading-[1.5] text-[#B3B3B3]" style={{ fontSize: `max(calc(8px * var(--fl, 1)), ${k(12)})` }}>{i + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SleepRecoveryScoreSection() {
  return (
    <section
      id="sleep-recovery-score"
      className="relative w-full overflow-hidden bg-[#FAF9F5]"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000811030))",
          "--m": "calc(min(100vw, 500px) / 402)",
        } as React.CSSProperties
      }
    >
      {/* ─── Desktop: Figma 11279:4093, copy inside the header container ─── */}
      <div className="relative hidden md:block" style={{ height: u(1233) }}>
        {/* full-bleed: the ellipse is cropped to its own bounds and stretched to the full section width */}
        <Image src={`${A}/bg-crop.png`} alt="" fill priority sizes="100vw" className="object-fill" />
        <div className="absolute inset-0">
          <div className="mx-auto h-full max-w-360 px-10">
            <div className="relative h-full">
              <span
                className="pointer-events-none absolute left-0 select-none font-bold italic leading-[normal] text-[rgba(216,216,216,0.5)]"
                style={{ top: u(96), fontSize: u(128), letterSpacing: u(2.56), transform: "rotate(-0.31deg)" }}
              >
                04
              </span>
              <div className="absolute left-0 flex flex-col text-[#E6DFDF]" style={{ top: u(330), width: u(618), gap: u(50) }}>
                <h2 className="font-medium uppercase leading-[1.416]" style={{ fontSize: `max(24px, ${u(36)})` }}>
                  Sleep is only part of <span className="font-bold italic">recovery.</span>
                </h2>
                <p className="leading-[1.416]" style={{ fontSize: `max(14px, ${u(20)})` }}>
                  Meddy brings together the signals that help show how your body is <span className="font-bold text-white">responding to stress, activity, and rest.</span>
                </p>
              </div>

              <div className="absolute right-0 flex flex-col items-end" style={{ top: u(93), gap: u(153) }}>
                <div className="flex flex-col items-end text-right uppercase leading-[1.416] text-white" style={{ gap: u(5) }}>
                  <span className="comprehensive-serif whitespace-nowrap italic" style={{ fontSize: `max(52px, ${u(92)})` }}>Recovery</span>
                  <span className="whitespace-nowrap font-medium" style={{ fontSize: `max(15px, ${u(24)})` }}>Know when your body is ready</span>
                </div>
                <RecoveryScoreCard k={u} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile / tablet (<md): Figma 12223:24388 (402 x 876) ─── */}
      <div className="relative mx-auto min-h-[calc(876*var(--m))] max-w-[500px] md:hidden">
        <div className="absolute inset-y-0 overflow-hidden" style={{ left: "calc(50% - 50vw)", right: "calc(50% - 50vw)" }}>
          <Image src={`${A}/m-bg-crop.png`} alt="" width={905} height={1083} priority sizes="500px" className="absolute max-w-none" style={{ left: `calc(50% - ${m(201)} - ${m(223)})`, top: m(-178.6), width: m(905), height: m(1083) }} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: m(788), background: "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 79.18%)" }} />

        <div className="relative flex flex-col px-[var(--p20)] py-[var(--p64)]" style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(48) } as React.CSSProperties}>
          <div className="flex flex-col">
            <span className="select-none font-bold italic leading-none text-[rgba(216,216,216,0.5)]" style={{ fontSize: m(120), letterSpacing: m(2.4), transform: "rotate(-0.31deg)", width: "fit-content", height: m(151.9), display: "flex", alignItems: "center" }}>
              04
            </span>
            <div className="flex flex-col" style={{ gap: m(24) }}>
              <div className="flex flex-col text-right uppercase leading-[1.416] text-white" style={{ gap: m(5) }}>
                <span className="comprehensive-serif italic" style={{ fontSize: m(32) }}>Recovery</span>
                <span className="font-medium" style={{ fontSize: m(20) }}>Know when your body is ready</span>
              </div>
              <div style={{ ["--fl" as string]: 1 } as React.CSSProperties}>
                <RecoveryScoreCard k={m} />
              </div>
            </div>
          </div>

          <div className="flex flex-col" style={{ gap: m(48) }}>
            <p className="font-medium uppercase leading-[1.416] text-white" style={{ fontSize: m(20) }}>
              Sleep is only part of <span className="font-bold italic">recovery.</span>
            </p>
            <p className="leading-[1.416] text-[#E6DFDF]" style={{ fontSize: m(16) }}>
              Meddy brings together the signals that help show how your body is <span className="font-bold text-white">responding to stress, activity, and rest.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
