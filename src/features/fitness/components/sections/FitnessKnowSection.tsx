"use client";

import Image from "next/image";

// ---- md+: absolute replica of Figma node 11271:12254 (right block is 752 x 788 design px).
// --u = min(100vw/1440, (100dvh - 80px)/788) so the whole section fits one screen. ----
const u = (n: number) => `calc(${n} * var(--u))`;

// [src, left, top, width, height, inset] — connector lines, positions in the 752x788 block
const LINES: [string, number, number, number, number, string | undefined][] = [
  ["/fitness/fitness-know-deco1.svg", 141.48, 184.58, 148.99, 167.39, "-0.53% -0.3% -1.59% 0"],
  ["/fitness/fitness-know-line1.svg", 411, 478.48, 129.89, 146.02, "-1.83% -2.05%"],
  ["/fitness/fitness-know-line2.svg", 395.62, 87.74, 207.76, 128.3, undefined],
  ["/fitness/fitness-know-deco2.svg", 144.82, 111.74, 116.71, 45.53, undefined],
  ["/fitness/fitness-know-deco3.svg", 167.18, 290.53, 193.69, 197, undefined],
  ["/fitness/fitness-know-deco4.svg", 475, 224, 101.96, 143.85, "-1.85% -2.62%"],
];

type Chip = {
  label: string;
  value: string;
  x: number; // chip left in block
  y: number; // chip top in block
  side: "l" | "r"; // right-column chips are left aligned, left-column chips are right aligned
  labelX: number; labelY: number;
  valueX: number; valueY: number;
  pctX: number; pctY: number;
  fillW: number; fillX: number;
};

const CHIPS: Chip[] = [
  { label: "Back", value: "22", x: 618, y: 36, side: "r", labelX: 17, labelY: 10, valueX: 16, valueY: 19, pctX: 74, pctY: 58, fillW: 39, fillX: 16 },
  { label: "Forearms", value: "14", x: 596, y: 321, side: "r", labelX: 16, labelY: 10, valueX: 16, valueY: 20, pctX: 66, pctY: 59, fillW: 19, fillX: 16 },
  { label: "Triceps", value: "27", x: 586.84, y: 201, side: "r", labelX: 15.16, labelY: 10, valueX: 16, valueY: 20, pctX: 66, pctY: 59, fillW: 36, fillX: 16.16 },
  { label: "Calves", value: "23", x: 559, y: 563, side: "r", labelX: 16, labelY: 7, valueX: 16, valueY: 16, pctX: 72, pctY: 55, fillW: 34, fillX: 16 },
  { label: "Legs", value: "25", x: 551.2, y: 432, side: "r", labelX: 16, labelY: 7, valueX: 16, valueY: 16, pctX: 72, pctY: 55, fillW: 44, fillX: 16 },
  { label: "Shoulders", value: "12", x: 0, y: 63, side: "l", labelX: 51, labelY: 8, valueX: 57, valueY: 17, pctX: 107, pctY: 54, fillW: 14, fillX: 104 },
  { label: "Chest", value: "18", x: 0, y: 191, side: "l", labelX: 79, labelY: 8, valueX: 57, valueY: 16, pctX: 107, pctY: 55, fillW: 23, fillX: 95 },
  { label: "Biceps", value: "11", x: 7, y: 305.42, side: "l", labelX: 73, labelY: 8, valueX: 67, valueY: 16, pctX: 107, pctY: 55, fillW: 15, fillX: 103 },
  { label: "Core", value: "11", x: 44, y: 434, side: "l", labelX: 84, labelY: 4, valueX: 70, valueY: 16, pctX: 107, pctY: 54, fillW: 12, fillX: 106 },
];

function DesktopChip({ c }: { c: Chip }) {
  const abs = (x: number, y: number): React.CSSProperties => ({ left: u(x), top: u(y) });
  return (
    <div className="absolute rounded-[10px] bg-black/20" style={{ left: u(c.x), top: u(c.y), width: u(134), height: u(98), borderRadius: u(10) }}>
      <span className="absolute whitespace-nowrap font-bold leading-[normal] text-white" style={{ ...abs(c.labelX, c.labelY), fontSize: u(14) }}>
        {c.label}
      </span>
      <span className="absolute whitespace-nowrap font-semibold leading-[normal] text-white" style={{ ...abs(c.valueX, c.valueY), fontSize: u(48) }}>
        {c.value}
      </span>
      <span className="absolute whitespace-nowrap font-semibold leading-[normal] text-white" style={{ ...abs(c.pctX, c.pctY), fontSize: u(10) }}>
        %
      </span>
      <span className="absolute bg-[rgba(217,217,217,0.6)]" style={{ left: u(16), top: u(76), width: u(102), height: u(6), borderRadius: u(10) }} />
      <span className="absolute bg-[#f9f9f9]" style={{ left: u(c.fillX), top: u(76), width: u(c.fillW), height: u(6), borderRadius: u(10) }} />
    </div>
  );
}

export default function FitnessKnowSection() {
  return (
    <section
      className="w-full bg-white px-5 py-16 md:px-[var(--p100)] md:py-10"
      style={
        {
          // md+: fit one viewport — 788px block + 40px top/bottom padding, never wider than the 1440 design
          "--us": "min(calc(min(100vw, 1440px) * 0.000694444), calc((100dvh - 80px) * 0.001269036))",
          "--u": "var(--us)",
          "--p100": u(100),
        } as React.CSSProperties
      }
    >
      {/* <md follows the 402px mobile frame (node 11911:36606): copy, the same diagram scaled to the column, caption */}
      <div className="mx-auto flex w-full max-w-360 flex-col gap-8 md:flex-row md:gap-[var(--gap48)]" style={{ ["--gap48" as string]: u(48) }}>
        {/* Left text column */}
        <div className="flex flex-col gap-8 md:min-w-0 md:flex-1 md:justify-between md:gap-0">
          <div className="flex flex-col">
            <h2
              className="comprehensive-serif italic leading-none text-[#17925A] text-[32px] md:text-[length:var(--know)]"
              style={{ ["--know" as string]: u(140) }}
            >
              Know
            </h2>
            <p
              className="leading-[normal] text-[#111110] text-[32px] md:text-[length:var(--sub)]"
              style={{ ["--sub" as string]: u(41) }}
            >
              Exactly what you are training for.
            </p>
          </div>
          <p
            className="hidden leading-[1.5] text-[#111110] md:block md:text-[length:max(13px,var(--body))]"
            style={{ ["--body" as string]: u(20) }}
          >
            Instead of simply counting workouts, Meddy measures how much training load you&apos;re
            putting on different areas of your body.
          </p>
        </div>

        {/* Diagram: 752 x 788 design px, scaled to the column on mobile and by --us from md up */}
        <div
          className="relative shrink-0 [--u:calc((100vw_-_40px)*0.0013298)] md:[--u:var(--us)]"
          style={{ width: u(752), height: u(788) }}
        >
          {/* body illustration (+ muscle dots overlay) */}
          <div className="absolute" style={{ left: u(179.59), top: 0, width: u(359.23), height: u(788) }}>
            <Image src="/fitness/fitness-know-body-e5f944.png" alt="Human body, back view" fill sizes="360px" className="object-contain" />
          </div>
          <div className="pointer-events-none absolute" style={{ left: u(187.04), top: u(5.38), width: u(341.85), height: u(774.34) }}>
            <Image src="/fitness/fitness-know-muscle-overlay.svg" alt="" fill unoptimized className="max-w-none" />
          </div>

          {/* connector lines */}
          {LINES.map(([src, l, t, w, h, inset]) => (
            <div key={src} className="pointer-events-none absolute" style={{ left: u(l), top: u(t), width: u(w), height: u(h) }}>
              <div className="absolute" style={{ inset: inset ?? 0 }}>
                <Image src={src} alt="" fill unoptimized className="max-w-none" />
              </div>
            </div>
          ))}

          {/* metric chips */}
          {CHIPS.map((c) => (
            <DesktopChip key={c.label} c={c} />
          ))}
        </div>

        <p className="text-right leading-[1.5] text-[#111110] text-[16px] md:hidden">
          Instead of simply counting workouts, Meddy measures how much training load you&apos;re
          putting on different areas of your body.
        </p>
      </div>
    </section>
  );
}
