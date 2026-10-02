"use client";

import Image from "next/image";

type DayVariant = "dark" | "light" | "white";

type Day = {
  day: string;
  time: string | null;
  icon: string;
  title: string;
  sub: string;
  variant: DayVariant;
};

const DAYS: Day[] = [
  { day: "Mon", time: "45 min", icon: "/fitness/recovery-icon-dumbbell.svg", title: "Strength", sub: "Upper Body", variant: "dark" },
  { day: "Tue", time: "1 hour", icon: "/fitness/recovery-icon-cardio.svg", title: "Cardio", sub: "Zone 2", variant: "dark" },
  { day: "Wed", time: "20 min", icon: "/fitness/recovery-icon-mobility.svg", title: "Mobility", sub: "Flexibility", variant: "dark" },
  { day: "Thu", time: "40 min", icon: "/fitness/recovery-icon-dumbbell.svg", title: "Strength", sub: "Lower body", variant: "dark" },
  { day: "Fri", time: "8 Hour", icon: "/fitness/recovery-icon-heart.svg", title: "Recovery", sub: "Rest", variant: "light" },
  { day: "Sat", time: null, icon: "/fitness/recovery-icon-bedtime.svg", title: "Rest", sub: "Full Recovery", variant: "white" },
  { day: "Sun", time: null, icon: "/fitness/recovery-icon-bedtime.svg", title: "Rest", sub: "Full Recovery", variant: "white" },
];

const VARIANT_CLASS: Record<DayVariant, string> = {
  dark: "bg-white/20 text-white",
  light: "bg-white/40 text-white",
  white: "bg-white text-[#111110]",
};

// md+: Figma node 11271:12343 (1440 x 1025) scaled by --u so the whole section fits one viewport:
//   --u = min(100vw, 1440px) / 1440  vs  100dvh / 1025, whichever is smaller
const u = (n: number) => `calc(${n} * var(--u))`;

export default function FitnessRecoverySection() {
  return (
    <section
      className="relative flex w-full flex-col justify-end overflow-hidden bg-[#171718] md:h-[calc(1025*var(--u))]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000975609))" } as React.CSSProperties}
    >
      {/* mobile: plain cover */}
      <div className="absolute inset-0 md:hidden">
        <Image src="/fitness/fitness-recovery-bg-351fee.png" alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      {/* md+: Figma placement (1875 wide, centred, 275px above the top edge) */}
      <div
        className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block"
        style={{ width: `max(${u(1875)}, 100%)`, aspectRatio: "1875 / 1250", top: u(-275) }}
      >
        <Image src="/fitness/fitness-recovery-bg-351fee.png" alt="" fill priority sizes="2000px" className="object-cover" />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-full md:h-[calc(555*var(--u))]"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(23,23,24,1) 80.323%)" }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-360 flex-col justify-end gap-10 px-5 pb-14 pt-20 md:max-w-[calc(1440*var(--u))] md:gap-[var(--g48)] md:px-[var(--p100)] md:pb-[var(--p120)] md:pt-0"
        style={{ ["--g48" as string]: u(48), ["--p100" as string]: u(100), ["--p120" as string]: u(120) }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2
              className="comprehensive-serif italic leading-none text-white text-[64px] sm:text-[80px] md:text-[length:var(--d)]"
              style={{ ["--d" as string]: `max(48px, ${u(90)})` }}
            >
              Recovery
            </h2>
            <p
              className="leading-[normal] text-white text-[22px] md:text-[length:var(--d)]"
              style={{ ["--d" as string]: `max(18px, ${u(32)})` }}
            >
              is part of progress.
            </p>
          </div>
          <p
            className="max-w-[760px] text-[16px] leading-[1.5] text-white md:max-w-none md:text-[length:var(--d)] md:leading-[normal]"
            style={{ ["--d" as string]: `max(13px, ${u(20)})` }}
          >
            Meddy considers how strenuous your exercises have been, which
            muscles you&apos;ve trained, your overall session mix, and scheduled
            recovery when building what comes next.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[18px] text-white md:text-[length:max(13px,var(--d))]" style={{ ["--d" as string]: u(20) }}>
            Sep 01 - 07
          </span>
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:gap-[var(--g8)]"
            style={{ ["--g8" as string]: u(8), ["--cw" as string]: u(170.29), ["--p32" as string]: u(32), ["--r8" as string]: u(8), ["--ic" as string]: `max(18px, ${u(24)})` }}
          >
            {DAYS.map((d) => (
              <div
                key={d.day}
                className={`flex flex-col gap-2 rounded-[8px] p-6 text-[14px] backdrop-blur-[10px] md:w-[var(--cw)] md:shrink-0 md:gap-[var(--g8)] md:rounded-[var(--r8)] md:p-[var(--p32)] md:text-[length:max(11px,calc(14*var(--u)))] ${VARIANT_CLASS[d.variant]}`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span>{d.day}</span>
                  {d.time && <span>{d.time}</span>}
                </div>
                <div className="flex flex-col gap-2 md:gap-[var(--g8)]">
                  <Image
                    src={d.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 md:h-[var(--ic)] md:w-[var(--ic)]"
                  />
                  <div className="flex flex-col gap-2 md:gap-[var(--g8)]">
                    <span>{d.title}</span>
                    <span>{d.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
