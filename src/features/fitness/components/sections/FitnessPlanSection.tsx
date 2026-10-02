"use client";

import Image from "next/image";

// lg+: Figma node 11601:4001 (1440 wide, 1029 tall) scaled by --u so the section fits one viewport:
//   --u = min(100vw, 1440px) / 1440  vs  100dvh / 1029, whichever is smaller
const u = (n: number) => `calc(${n} * var(--u))`;

type Card = { title: string; icon: string; iconW: number; x: number; y: number; w: number };
type Chip = { text: string; x: number; y: number };

// x / y are design px inside the 1222.5 x 601 diagram box
const CARDS: Card[] = [
  { title: "Your Body", icon: "/fitness/plan-icon-body.svg", iconW: 18.063, x: 57.54, y: 90, w: 259.164 },
  { title: "Your Training", icon: "/fitness/plan-icon-dumbbell.svg", iconW: 24, x: 894.83, y: 109, w: 292 },
  { title: "Your Goals", icon: "/fitness/plan-icon-goal.svg", iconW: 24, x: 0, y: 503, w: 259.164 },
  { title: "Your Preferences", icon: "/fitness/plan-icon-pref.svg", iconW: 24, x: 944.5, y: 449, w: 259.164 },
];

const CHIPS: Chip[] = [
  { text: "Joint stress", x: 51.83, y: 30 },
  { text: "Spinal load", x: 306.83, y: 49 },
  { text: "Balance", x: 132.83, y: 160 },
  { text: "Impact", x: 261.83, y: 180 },
  { text: "Injuries", x: 19.83, y: 190 },
  { text: "Mobility", x: 89.83, y: 390 },
  { text: "Weight loss", x: 189.83, y: 440 },
  { text: "Strength", x: 8.42, y: 455 },
  { text: "Cardiovascular fitness", x: 188.83, y: 550 },
  { text: "Session mix", x: 873.83, y: 42 },
  { text: "Progress", x: 1063.83, y: 54 },
  { text: "Muscle Targets", x: 1073.83, y: 192 },
  { text: "Muscle load", x: 843.83, y: 202 },
  { text: "Intensity", x: 973.83, y: 232 },
  { text: "Exercises", x: 913.83, y: 375 },
  { text: "Equipment", x: 1086.83, y: 390 },
  { text: "Circuits", x: 956.83, y: 526 },
  { text: "Cardio", x: 1086.83, y: 556 },
];

// connector curves: box (x, y, w, h) + inner vector size / transform / svg overflow inset (%)
const LINES = [
  { src: "7502", x: 753.33, y: 136, w: 169, h: 100.5, iw: 169, ih: 100.5, t: "scaleX(-1)", inset: [5.31, 3.16] },
  { src: "7501", x: 246.64, y: 394.15, w: 175.129, h: 196.559, iw: 169, ih: 100.5, t: "rotate(-57.78deg)", inset: [5.31, 3.16] },
  { src: "7500", x: 277.83, y: 120.5, w: 169, h: 100.5, iw: 169, ih: 100.5, t: "", inset: [5.31, 3.16] },
  { src: "7503", x: 772.08, y: 370.64, w: 186.753, h: 187.442, iw: 148.967, ih: 115.657, t: "rotate(-134.16deg) scaleY(-1)", inset: [4.61, 3.58] },
];

const CHIP_TEXT = "rounded-[36px] border border-white/20 bg-[#232323] px-4 py-2 shadow-[0px_0px_10px_rgba(0,0,0,0.25)]";

export default function FitnessPlanSection() {
  return (
    <section
      className="w-full bg-[#171718] lg:flex lg:min-h-[calc(1029*var(--u))] lg:flex-col lg:justify-end"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000971817))" } as React.CSSProperties}
    >
      <div
        className="mx-auto flex w-full max-w-360 flex-col gap-12 px-5 py-16 lg:max-w-[calc(1440*var(--u))] lg:gap-[var(--g48)] lg:px-[var(--p100)] lg:py-[var(--p100)]"
        style={{ ["--g48" as string]: u(48), ["--p100" as string]: u(100) }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[var(--g48)]">
          <h2 className="flex-1 text-[28px] font-normal leading-[normal] text-white sm:text-[36px] lg:text-[length:max(24px,var(--h))]" style={{ ["--h" as string]: u(44) }}>
            Your workout plan is built by a{" "}
            <em className="comprehensive-serif italic">physician</em> who sees how
            you <em className="comprehensive-serif italic">train.</em>
          </h2>
          <p className="flex-1 text-[16px] leading-[normal] text-white lg:text-[length:max(13px,var(--p))]" style={{ ["--p" as string]: u(20) }}>
            Your Meddy physician sees your workouts, progress, training load,
            injuries, cardiovascular activity, recovery, and health data and
            uses that information to build and adjust your plan.
          </p>
        </div>

        <div className="relative mx-auto hidden w-full lg:block" style={{ height: u(601), maxWidth: u(1222.5), ["--p16" as string]: u(16), ["--p8" as string]: u(8) }}>
          <div className="absolute overflow-hidden opacity-80" style={{ left: u(300.83), top: 0, width: u(601), height: u(601) }}>
            <Image src="/fitness/plan-physician-center-new.png" alt="" fill sizes="700px" className="object-cover" />
          </div>

          {LINES.map((l) => (
            <div key={l.src} className="absolute" style={{ left: u(l.x), top: u(l.y), width: u(l.w), height: u(l.h) }}>
              <div
                className="absolute left-1/2 top-1/2"
                style={{ width: u(l.iw), height: u(l.ih), transform: `translate(-50%, -50%) ${l.t}` }}
              >
                <Image
                  src={`/fitness/plan-vec-${l.src}.svg`}
                  alt=""
                  width={200}
                  height={120}
                  className="absolute max-w-none"
                  style={{
                    left: `-${l.inset[1]}%`,
                    top: `-${l.inset[0]}%`,
                    width: `${100 + 2 * l.inset[1]}%`,
                    height: `${100 + 2 * l.inset[0]}%`,
                  }}
                />
              </div>
            </div>
          ))}

          <div
            className="absolute"
            style={{
              left: u(421.83),
              top: u(511),
              width: u(358),
              height: u(80),
              background: "linear-gradient(180deg, rgba(23,23,24,0) 0%, #171718 80.323%)",
            }}
          />

          {CARDS.map((c) => (
            <div
              key={c.title}
              className="absolute flex items-start border border-white/20 bg-[#111110] p-[var(--p16)] shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
              style={{ left: u(c.x), top: u(c.y), width: u(c.w), gap: u(8), borderRadius: u(12) }}
            >
              <Image
                src={c.icon}
                alt=""
                width={24}
                height={24}
                className="shrink-0"
                style={{ width: u(c.iconW), height: u(24) }}
              />
              <span className="whitespace-nowrap leading-[normal] text-white" style={{ fontSize: `max(12px, ${u(20)})` }}>
                {c.title}
              </span>
            </div>
          ))}

          {CHIPS.map((ch) => (
            <div
              key={ch.text}
              className="absolute whitespace-nowrap rounded-[36px] border border-white/20 bg-[#232323] px-[var(--p16)] py-[var(--p8)] shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
              style={{ left: u(ch.x), top: u(ch.y) }}
            >
              <span className="block italic leading-[normal] text-white" style={{ fontSize: `max(10px, ${u(16)})` }}>
                {ch.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:hidden">
          <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-[20px] opacity-80">
            <Image
              src="/fitness/plan-physician-center.png"
              alt=""
              fill
              sizes="360px"
              className="object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[40%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(23,23,24,0) 0%, rgba(23,23,24,1) 80%)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {CARDS.map((c) => (
              <div
                key={c.title}
                className="flex items-center gap-2 rounded-[12px] border border-white/20 bg-[#111110] p-4 shadow-[0px_0px_10px_rgba(0,0,0,0.25)]"
              >
                <Image
                  src={c.icon}
                  alt=""
                  width={Math.round(c.iconW)}
                  height={24}
                  className="h-6 w-auto shrink-0"
                />
                <span className="text-[15px] text-white">{c.title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {CHIPS.map((ch) => (
              <div key={ch.text} className={CHIP_TEXT}>
                <span className="whitespace-nowrap text-[13px] italic text-white">
                  {ch.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
