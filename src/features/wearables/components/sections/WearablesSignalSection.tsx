"use client";

import Image from "next/image";

// Authored in Figma px (node 10865:3600, 1440 wide) and scaled by CSS vars:
//   --u  = min(100vw, 1440px) / 1440   (md+ stage)
//   --cu = px-per-design-px for a card  (= --u on md+, fits the column on mobile)
const u = (n: number) => `calc(${n} * var(--u))`;
const cu = (n: number) => `calc(${n} * var(--cu))`;

const ARROW = 31.304;
const BIG = 41.739;
const UNIT = 27.826;
const SMALL = 17.391;

// ---- card pieces -----------------------------------------------------------

function Text({
  size,
  bold,
  upper,
  color,
  children,
}: {
  size: number;
  bold?: boolean;
  upper?: boolean;
  color?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`leading-[normal] ${bold ? "font-bold" : "font-normal"} ${upper ? "uppercase" : ""}`}
      style={{ fontSize: cu(size), color }}
    >
      {children}
    </span>
  );
}

/** Big number with a lighter unit: <Num n="7" unit="h" /> */
function Num({ n, unit }: { n: string; unit: string }) {
  return (
    <>
      <Text size={BIG} bold color="#fff">{n}</Text>
      <Text size={UNIT} color="#fff">{unit}</Text>
    </>
  );
}

function Delta({ arrow, text, color }: { arrow: string; text: string; color: string }) {
  return (
    <span className="whitespace-nowrap" style={{ color }}>
      <Text size={ARROW} color={color}>{arrow}</Text>
      <Text size={SMALL} color={color}>{` ${text}`}</Text>
    </span>
  );
}

/** Absolutely placed block inside a card; `side` picks the edge `x` is measured from. */
function At({
  side,
  x,
  y,
  w,
  children,
}: {
  side: "l" | "r";
  x: number;
  y: number;
  w?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute flex flex-col ${side === "r" ? "items-end text-right" : "items-start"}`}
      style={{ [side === "l" ? "left" : "right"]: cu(x), top: cu(y), width: w ? cu(w) : undefined }}
    >
      {children}
    </div>
  );
}

function StatCard({
  title,
  bg,
  height,
  chart,
  chartH,
  labels,
  labelsBottom,
  labelsLeft,
  labelsW,
  accent,
  children,
}: {
  title: string;
  bg: string;
  height: number;
  chart: string;
  chartH: number;
  labels: [string, string];
  labelsBottom: number;
  labelsLeft: number;
  labelsW: number;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col" style={{ width: cu(403), gap: cu(15) }}>
      <h3
        className="comprehensive-serif italic leading-[normal] text-[#46524B]"
        style={{ fontSize: cu(24), paddingLeft: cu(5) }}
      >
        {title}
      </h3>
      <div className="relative overflow-hidden" style={{ height: cu(height), background: bg, borderRadius: cu(22) }}>
        {children}
        <Image
          src={chart}
          alt=""
          width={404}
          height={chartH}
          unoptimized
          className="absolute bottom-0 left-0 max-w-none"
          style={{ width: cu(404), height: cu(chartH) }}
        />
        <div
          className="absolute flex justify-between italic leading-[normal]"
          style={{ left: cu(labelsLeft), width: cu(labelsW), bottom: cu(labelsBottom), fontSize: cu(12), color: accent }}
        >
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
        </div>
      </div>
    </div>
  );
}

function SleepCard({ style }: { style?: React.CSSProperties }) {
  const c = "#FFE9DA";
  return (
    <div style={style}>
      <StatCard title="Sleep" bg="#96775D" height={353.57} chart="/wearables/sleep-chart.svg" chartH={139} labels={["Caffeine", "Sleep Duration"]} labelsBottom={15} labelsLeft={20.5} labelsW={362} accent={c}>
        <At side="l" x={12} y={16} w={160}>
          <Text size={SMALL} bold upper color={c}>Caffeine</Text>
        </At>
        <At side="l" x={12} y={51}>
          <span className="flex items-end">
            <Text size={BIG} bold color="#fff">2.4</Text>
            <span className="text-center" style={{ width: cu(91.3), paddingBottom: cu(5.2) }}>
              <Text size={SMALL} color={c}>cups /day</Text>
            </span>
          </span>
        </At>
        <At side="l" x={12} y={113.57}>
          <Delta arrow="↓" text="18%" color={c} />
        </At>
        <At side="r" x={12} y={16}>
          <Text size={SMALL} bold upper color={c}>Sleep Duration</Text>
        </At>
        <At side="r" x={12} y={51}>
          <span>
            <Num n="7" unit="h" />
            <Text size={34.783}>{" "}</Text>
            <Num n="42" unit="m" />
          </span>
        </At>
        <At side="r" x={12} y={113.57}>
          <Delta arrow="↑" text="34 min" color={c} />
        </At>
      </StatCard>
    </div>
  );
}

function FitnessCard({ style }: { style?: React.CSSProperties }) {
  const c = "#D0FFF4";
  return (
    <div style={style}>
      <StatCard title="Fitness" bg="#81A886" height={348} chart="/wearables/fitness-chart.svg" chartH={159.17} labels={["Workout time", "Weight"]} labelsBottom={9.8} labelsLeft={9.5} labelsW={381} accent={c}>
        <At side="l" x={12} y={12.83} w={146}>
          <Text size={SMALL} bold upper color={c}>Total workout time</Text>
        </At>
        <At side="l" x={12} y={80.3}>
          <span><Num n="3" unit="h" /><Text size={34.783}>{" "}</Text><Num n="20" unit="m" /></span>
        </At>
        <At side="l" x={12} y={133.35}>
          <Delta arrow="↑" text="42 min" color={c} />
        </At>
        <At side="r" x={12} y={12.83} w={135.65}>
          <Text size={SMALL} bold upper color={c}>Weight</Text>
        </At>
        <At side="r" x={12} y={82.43}>
          <span className="flex items-end" style={{ gap: cu(8.7) }}>
            <Text size={BIG} bold color="#fff">74.2</Text>
            <span style={{ paddingBottom: cu(7.8) }}><Text size={SMALL} color={c}>kg</Text></span>
          </span>
        </At>
        <At side="r" x={12} y={145}>
          <Delta arrow="↓" text="1.8 kg" color={c} />
        </At>
      </StatCard>
    </div>
  );
}

function HealthCard({ style }: { style?: React.CSSProperties }) {
  const c = "#DED0FF";
  return (
    <div style={style}>
      <StatCard title="Health" bg="#9889B2" height={348} chart="/wearables/health-chart.svg" chartH={159.17} labels={["Cardio time", "Resting HR"]} labelsBottom={11} labelsLeft={9.5} labelsW={381} accent={c}>
        <At side="l" x={21.57} y={13.98} w={125}>
          <Text size={SMALL} bold upper color={c}>Total cardio time</Text>
        </At>
        <At side="l" x={21.57} y={83.98}>
          <span className="flex items-end">
            <span><Num n="2" unit="h" /><Text size={34.783}>{" "}</Text><Num n="10" unit="m" /></span>
            <Text size={SMALL} color={c}>{" /week"}</Text>
          </span>
        </At>
        <At side="l" x={21.57} y={137.02}>
          <Delta arrow="↑" text="32 min" color={c} />
        </At>
        <At side="r" x={21.57} y={13.98} w={135.65}>
          <Text size={SMALL} bold upper color={c}>Resting HR</Text>
        </At>
        <At side="r" x={21.57} y={76.98}>
          <span className="flex items-end" style={{ gap: cu(8.7) }}>
            <Text size={BIG} bold color="#fff">58</Text>
            <span style={{ paddingBottom: cu(7.8) }}><Text size={SMALL} color={c}>bpm</Text></span>
          </span>
        </At>
        <At side="r" x={21.57} y={139.5}>
          <Delta arrow="↓" text="4 bpm" color={c} />
        </At>
      </StatCard>
    </div>
  );
}

// ---- copy ------------------------------------------------------------------

function WhyLine({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <p className={`font-medium leading-[normal] text-[#111110] opacity-70 ${className ?? ""}`} style={style}>
      Meddy can help you see{" "}
      <span className="comprehensive-serif mr-[0.15em] italic text-[#17925A]">WHY</span> it changed
    </p>
  );
}

function Footer({ className, style, textClass }: { className?: string; style?: React.CSSProperties; textClass?: string }) {
  return (
    <div className={`flex items-end ${className ?? ""}`} style={style}>
      <Image src="/wearables/signal-accent.svg" alt="" width={9} height={51} className="shrink-0" style={{ width: "var(--fw)", height: "var(--fh)" }} />
      <p className={`font-medium uppercase leading-[normal] text-[#A9A9A9] ${textClass ?? ""}`} style={{ width: "var(--fp)", fontSize: "var(--ft)" }}>
        See how your wearable metrics{" "}
        <em className="italic text-[#46524B]">
          change alongside the behaviors and health changes happening around them.
        </em>
      </p>
    </div>
  );
}

// ---- md+: absolute replica of the Figma frame -------------------------------

function DesktopStage() {
  const cardsTop = 609; // 88 + 521
  const colX = [79, 511.5, 944];
  const own = { "--cu": "var(--u)" } as React.CSSProperties;
  return (
    <div className="relative mx-auto hidden md:block" style={{ width: u(1440), height: u(1024) }}>
      {/* Person + connector line */}
      <div className="pointer-events-none absolute" style={{ left: u(841), top: u(491.7), width: u(340.416), height: u(97.106) }}>
        <Image src="/wearables/signal-line.svg" alt="" width={418} height={175} unoptimized className="absolute max-w-none" style={{ left: "-11.4%", top: "-39.96%", width: "122.8%", height: "179.92%" }} />
      </div>
      <div className="pointer-events-none absolute" style={{ left: u(891.19), top: u(88), width: u(548.381), height: u(522.625) }}>
        <Image src="/wearables/signal-person-601010.png" alt="" fill sizes="548px" className="object-contain" />
      </div>

      {/* Headings */}
      <p
        className="absolute font-medium italic uppercase leading-[normal] text-[#A9A9A9]"
        style={{ left: u(79), top: u(88), width: u(523), fontSize: u(36) }}
      >
        See what your wearable <span className="text-[#46524B]">can&apos;t show you alone.</span>
      </p>
      <div className="absolute flex flex-col" style={{ left: u(79), top: u(303), gap: u(40) }}>
        <div className="flex flex-col" style={{ gap: u(5) }}>
          <h2 className="comprehensive-serif whitespace-nowrap uppercase leading-[normal] text-[#46524B]" style={{ fontSize: u(64) }}>
            Connect the signal
          </h2>
          <p className="font-medium uppercase leading-[normal] text-[#A9A9A9]" style={{ width: u(501), fontSize: u(32) }}>
            to the rest of your health.
          </p>
        </div>
        <div className="flex flex-col" style={{ width: u(558), gap: u(5) }}>
          <p className="font-medium leading-[normal] text-[#9A9A9A]" style={{ fontSize: u(20) }}>
            Your wearable might tell you that your HRV changed.
          </p>
          <WhyLine style={{ fontSize: u(24) }} />
        </div>
      </div>

      {/* Cards */}
      <SleepCard style={{ ...own, position: "absolute", left: u(colX[0]), top: u(cardsTop) }} />
      <FitnessCard style={{ ...own, position: "absolute", left: u(colX[1]), top: u(cardsTop) }} />
      <HealthCard style={{ ...own, position: "absolute", left: u(colX[2]), top: u(cardsTop) }} />
    </div>
  );
}

// ---- <md: stacked ------------------------------------------------------------

function MobileStack() {
  // one card = 403 design px wide; shrink it to fit the column, never grow past 1:1
  const own = { "--cu": "min(1px, calc((100vw - 40px) * 0.002481))" } as React.CSSProperties;
  return (
    <div className="mx-auto flex w-full flex-col px-5 py-12 md:hidden">
      <p className="font-medium italic uppercase leading-[normal] text-[#A9A9A9] text-[24px]">
        See what your wearable <span className="text-[#46524B]">can&apos;t show you alone.</span>
      </p>

      <h2 className="comprehensive-serif mt-8 uppercase leading-[normal] text-[#46524B] text-[40px]">
        Connect the signal
      </h2>
      <p className="mt-[5px] font-medium uppercase leading-[normal] text-[#A9A9A9] text-[22px]">
        to the rest of your health.
      </p>

      <p className="mt-6 font-medium leading-[normal] text-[#9A9A9A] text-[16px]">
        Your wearable might tell you that your HRV changed.
      </p>
      <WhyLine className="mt-[5px] text-[18px]" />

      <div className="relative mt-6 w-full">
        <Image
          src="/wearables/signal-person-601010.png"
          alt=""
          width={511}
          height={487}
          sizes="(max-width: 767px) 100vw, 400px"
          className="pointer-events-none mx-auto h-auto w-full max-w-[420px]"
        />
      </div>

      <div className="mt-8 flex flex-col items-center gap-8">
        <SleepCard style={own} />
        <FitnessCard style={own} />
        <HealthCard style={own} />
      </div>
    </div>
  );
}

export default function WearablesSignalSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAFAFA]"
      style={{ "--u": "calc(min(100vw, 1440px) * 0.000694444)" } as React.CSSProperties}
    >
      <DesktopStage />
      <MobileStack />
    </section>
  );
}
