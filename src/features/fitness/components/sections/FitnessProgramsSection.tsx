"use client";

import Image from "next/image";

// md+: Figma node 11911:39228 (1440 wide), every size is a multiple of --u (= min(100vw,1440px)/1440)
// so the 3-column layout scales down proportionally to tablet. Below md the cards stack.
const u = (n: number) => `calc(${n} * var(--u))`;
// px at md+ scale with --u (never below `min`), px below md stay fixed
const fs = (mobile: number, design: number, min = 12) =>
  ({ ["--m" as string]: `${mobile}px`, ["--d" as string]: `max(${min}px, ${u(design)})` }) as React.CSSProperties;

// left → right as in the design
const PROGRAMS = [
  {
    title: "STRENGTH",
    image: "/fitness/fitness-programs-strength.png",
    left: ["•Sets", "• Reps", "• Weights"],
    right: ["• Load", "• Workout Duration", "• Muscle Targets"],
    solid: false,
  },
  {
    title: "CARDIO",
    image: "/fitness/fitness-programs-cardio.png",
    left: ["•Duration", "•Distance", "• Pace", "• Incline"],
    right: ["• Resistance", "• Cadence", "• HR Zones", "• Split Time", "• Stroke Rate"],
    solid: true,
  },
  {
    title: "CIRCUIT TRAINING",
    image: "/fitness/fitness-programs-circuit-16ed96.png",
    left: ["•Strength", "• Cardio"],
    right: ["•Yoga", "•Stretch"],
    solid: false,
  },
];

function ProgramCard({ program }: { program: (typeof PROGRAMS)[number] }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-[12px] p-4 md:gap-[var(--gap16)] md:rounded-[var(--r12)] md:p-[var(--gap16)] ${
        program.solid ? "bg-[#515151]" : "bg-[rgba(81,81,81,0.5)] backdrop-blur-[25px]"
      }`}
    >
      <div className="relative h-[200px] shrink-0 overflow-hidden rounded-[8px] bg-[#d9d9d9] sm:h-[245px] md:h-[var(--imgH)] md:rounded-[var(--r8)]">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 md:gap-[var(--gap24)]">
        <div className="flex flex-col gap-2 text-white md:gap-[var(--gap8)]">
          <h3
            className="font-semibold leading-[normal] text-[length:var(--m)] md:text-[length:var(--d)]"
            style={fs(28, 36, 18)}
          >
            {program.title}
          </h3>
          <div
            className="flex justify-between gap-3 leading-[normal] text-[length:var(--m)] md:text-[length:var(--d)]"
            style={fs(16, 20, 12)}
          >
            <ul className="whitespace-nowrap">
              {program.left.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul className="whitespace-nowrap">
              {program.right.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-[49px] bg-white px-5 py-3 text-center text-[16px] font-normal leading-[normal] text-[#17925A] md:py-[var(--btnY)] md:text-[length:var(--btnF)]"
        >
          Start Training
        </button>
      </div>
    </div>
  );
}

export default function FitnessProgramsSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#030c16]"
      style={
        {
          "--u": "calc(min(100vw, 1440px) * 0.000694444)",
          "--gap16": u(16),
          "--gap24": u(24),
          "--gap8": u(8),
          "--r12": u(12),
          "--r8": u(8),
          "--imgH": u(246),
          "--btnY": u(12),
          "--btnF": `max(12px, ${u(16)})`,
        } as React.CSSProperties
      }
    >
      {/* Background photo (centred, 1990:1100, bleeds 353px past each side at 1440) */}
      <div className="pointer-events-none absolute inset-0 md:hidden">
        <Image src="/fitness/fitness-programs-bg-916cd5.png" alt="" fill sizes="100vw" className="-scale-x-100 object-cover object-[65%_center]" priority />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{ width: `max(100%, ${u(2146)})`, aspectRatio: "1990 / 1100" }}
      >
        <Image src="/fitness/fitness-programs-bg-916cd5.png" alt="" fill sizes="2200px" className="-scale-x-100 object-cover" priority />
      </div>

      {/* Dark gradient (bottom) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full md:h-[var(--grad)]"
        style={{
          ["--grad" as string]: u(1102),
          background: "linear-gradient(180deg, rgba(0,0,0,0) 60.157%, #030c16 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-9 px-5 pb-16 pt-12 md:gap-[var(--gap36)] md:px-[var(--pad100)] md:pb-[var(--pad120)] md:pt-[var(--pad100)]"
        style={{ ["--gap36" as string]: u(36), ["--pad100" as string]: u(100), ["--pad120" as string]: u(120) }}
      >
        {/* Heading — right aligned */}
        <div className="flex flex-col items-end gap-6 text-right text-white md:gap-[var(--gap24)]">
          <div className="flex flex-col items-end">
            <h2
              className="comprehensive-serif whitespace-nowrap uppercase leading-none text-[length:var(--m)] md:text-[length:var(--d)]"
              style={fs(64, 128, 48)}
            >
              more than
            </h2>
            <p
              className="uppercase leading-[normal] text-[length:var(--m)] md:text-[length:var(--d)]"
              style={fs(18, 36, 16)}
            >
              sets, reps, and minutes.
            </p>
          </div>
          <p
            className="max-w-[369px] leading-[normal] text-[length:var(--m)] md:max-w-[var(--capW)] md:text-[length:var(--d)]"
            style={{ ...fs(16, 20, 13), ["--capW" as string]: u(369) }}
          >
            Meddy understands how you trained and how your body was challenged.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch md:gap-[var(--gap8)]">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
