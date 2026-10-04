"use client";

import Image from "next/image";

// Scale the section artwork and heading independently of the readable card layout.
const u = (n: number) => `calc(${n} * var(--u))`;
// px at md+ scale with --u (never below `min`), px below md stay fixed
const fs = (mobile: number, design: number, min = 12) =>
  ({ ["--m" as string]: `${mobile}px`, ["--d" as string]: `max(${min}px, ${u(design)})` }) as React.CSSProperties;

// left → right as in the design
const PROGRAMS = [
  {
    title: "STRENGTH",
    image: "/fitness/fitness-programs-strength.png",
    left: ["Sets", "Reps", "Weights"],
    right: ["Load", "Workout Duration", "Muscle Targets"],
  },
  {
    title: "CARDIO",
    image: "/fitness/fitness-programs-cardio.png",
    left: ["Duration", "Distance", "Pace", "Incline"],
    right: ["Resistance", "Cadence", "HR Zones", "Split Time", "Stroke Rate"],
  },
  {
    title: "CIRCUIT TRAINING",
    image: "/fitness/fitness-programs-circuit-16ed96.png",
    left: ["Strength", "Cardio"],
    right: ["Yoga", "Stretch"],
  },
];

function ProgramCard({ program }: { program: (typeof PROGRAMS)[number] }) {
  return (
    <article className="group relative flex min-w-0 flex-col gap-7 overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-b from-[#435047]/95 via-[#303833]/95 to-[#202a25]/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.32),0_2px_10px_rgba(255,255,255,0.08)_inset] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#b6e7c9]/45 hover:shadow-[0_32px_80px_rgba(0,0,0,0.48),0_2px_14px_rgba(255,255,255,0.12)_inset] sm:p-6">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#d1f3dc]/70 to-transparent" />
      <div className="relative aspect-[3/2] shrink-0 overflow-hidden rounded-2xl bg-[#d9d9d9] shadow-[0_14px_30px_rgba(0,0,0,0.28)] ring-1 ring-black/20">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 1023px) 90vw, 30vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-9">
        <div className="flex flex-col gap-5 text-white">
          <h3 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.025em] xl:text-[28px]">
            {program.title}
          </h3>
          <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-x-5 text-[15px] leading-relaxed text-white/85 sm:text-base lg:text-[15px] xl:text-base">
            <ul className="list-disc space-y-2.5 pl-4 marker:text-[#9ad8b6]">
              {program.left.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <ul className="list-disc space-y-2.5 pl-4 marker:text-[#9ad8b6]">
              {program.right.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="min-h-12 w-full rounded-full bg-white px-5 py-3.5 text-center text-[15px] font-semibold leading-5 text-[#137447] shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition duration-200 hover:bg-[#e6f4ec] hover:shadow-[0_10px_26px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9ad8b6]"
        >
          Start Training
        </button>
      </div>
    </article>
  );
}

export default function FitnessProgramsSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#030c16]"
      style={
        {
          "--u": "calc(min(100vw, 1440px) * 0.000694444)",
          "--gap24": u(24),
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
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 xl:gap-8">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
