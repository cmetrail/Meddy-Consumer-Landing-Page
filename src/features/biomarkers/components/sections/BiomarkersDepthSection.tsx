"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { desktopMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Desktop canvas is 1440 x 1024; --u scales it to fit the viewport, locked to
// the same aspect ratio used by the other Biomarkers sections.
const u = (n: number) => `calc(${n} * var(--u))`;

const NUMBER_GRADIENT = (deg: number) =>
  `linear-gradient(${deg}deg, rgba(62, 161, 77, 0.1) 17.036%, rgba(23, 58, 30, 0.1) 68.574%)`;

// progress bar fill height (svg px) at each month, from the four Figma variants
const FILL = [52, 207, 375, 484];

type Tone = "red" | "blue" | "amber" | "green";

type Biomarker = {
  label: string;
  value: string;
  unit: string;
  unitSize: number;
  status: string;
  tone: Tone;
};

type Month = {
  number: string;
  angle: number;
  biomarkers: Biomarker[];
};

const TONE_BG: Record<Tone, string> = {
  red: "rgba(255, 86, 86, 0.5)",
  blue: "rgba(20, 139, 213, 0.5)",
  amber: "rgba(224, 154, 42, 0.5)",
  green: "rgba(23, 146, 90, 0.5)",
};

const MONTHS: Month[] = [
  {
    number: "01",
    angle: 116.42,
    biomarkers: [
      { label: "LDL", value: "142", unit: "mg/dL", unitSize: 18, status: "High", tone: "red" },
      { label: "a1c", value: "6.1", unit: "%", unitSize: 26, status: "Borderline", tone: "blue" },
      { label: "VITAMIN D", value: "21", unit: "ng/mL", unitSize: 18, status: "Insufficient", tone: "amber" },
    ],
  },
  {
    number: "02",
    angle: 120.03,
    biomarkers: [
      { label: "LDL", value: "136", unit: "mg/dL", unitSize: 18, status: "High", tone: "red" },
      { label: "a1c", value: "6.0", unit: "%", unitSize: 26, status: "Borderline", tone: "blue" },
      { label: "VITAMIN D", value: "29", unit: "ng/mL", unitSize: 18, status: "Insufficient", tone: "amber" },
    ],
  },
  {
    number: "03",
    angle: 120.28,
    biomarkers: [
      { label: "LDL", value: "121", unit: "mg/dL", unitSize: 18, status: "Above optimal", tone: "amber" },
      { label: "a1c", value: "6.1", unit: "%", unitSize: 26, status: "Borderline", tone: "blue" },
      { label: "VITAMIN D", value: "38", unit: "ng/mL", unitSize: 18, status: "In range", tone: "green" },
    ],
  },
  {
    number: "04",
    angle: 121.08,
    biomarkers: [
      { label: "LDL", value: "104", unit: "mg/dL", unitSize: 18, status: "Above optimal", tone: "amber" },
      { label: "a1c", value: "5.6", unit: "%", unitSize: 26, status: "In range", tone: "green" },
      { label: "VITAMIN D", value: "44", unit: "ng/mL", unitSize: 18, status: "In range", tone: "green" },
    ],
  },
];

// One month snapshot: 234 x 653 column of three readings (Figma 11942:13550)
function BiomarkerRows({ biomarkers }: { biomarkers: Biomarker[] }) {
  return (
    <div className="flex flex-col items-end" style={{ gap: u(24) }}>
      {biomarkers.map((b, i) => (
        <div
          key={b.label}
          className="flex flex-col items-end"
          style={{ width: u(i === 0 ? 226 : 234), gap: u(i === 0 ? 26 : 36) }}
        >
          <div className="flex flex-col items-end" style={{ gap: u(1) }}>
            <div className="whitespace-nowrap font-medium uppercase leading-[1.416] text-white" style={{ fontSize: u(100) }}>
              {b.value}{" "}
              <span className={b.unitSize === 26 ? "font-medium" : "font-normal"} style={{ fontSize: u(b.unitSize) }}>
                {b.unit}
              </span>
            </div>
            <div className="flex items-center" style={{ gap: u(8) }}>
              <span
                className="rounded-[29px] px-[var(--px)] py-[var(--py)]"
                style={{ background: TONE_BG[b.tone], ["--px" as string]: u(12), ["--py" as string]: u(4) }}
              >
                <span className="whitespace-nowrap leading-[1.5] text-white/60" style={{ fontSize: u(20) }}>
                  {b.status}
                </span>
              </span>
              <span className="whitespace-nowrap uppercase leading-[1.416] text-white/60" style={{ fontSize: u(20) }}>
                {b.label}
              </span>
            </div>
          </div>
          {i < biomarkers.length - 1 && <div className="h-px w-full bg-[#46524B]" />}
        </div>
      ))}
    </div>
  );
}

export default function BiomarkersDepthSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        const root = rootRef.current;
        if (!root) return;
        const select = gsap.utils.selector(root);
        const snapshots = select<HTMLElement>("[data-depth-snapshot]");
        const numbers = select<HTMLElement>("[data-depth-number]");
        const fill = select<SVGRectElement>("[data-depth-fill]")[0];

        if (snapshots.length < MONTHS.length || numbers.length < MONTHS.length || !fill) {
          return;
        }

        // later months wait slightly below, then glide up as they cross-fade in
        gsap.set([...snapshots.slice(1), ...numbers.slice(1)], { opacity: 0, yPercent: 5 });
        gsap.set(fill, { attr: { height: FILL[0] } });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.querySelector("[data-depth-track]"),
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // each month holds, then one 0.5 long hand-off (fill grows in the same beat)
        for (let i = 1; i < MONTHS.length; i++) {
          const at = i - 0.25;
          const d = 0.5;
          for (const group of [snapshots, numbers]) {
            timeline.to(group[i - 1], { opacity: 0, yPercent: -5, duration: d }, at);
            timeline.to(group[i], { opacity: 1, yPercent: 0, duration: d }, at);
          }
          timeline.to(fill, { attr: { height: FILL[i] }, duration: d }, at);
        }
        timeline.to({}, { duration: 0.5 }); // hold the last month

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      }),
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="depth" className="relative bg-[#17231D]">
      {/* Mobile / fallback: static, stacked, no pinning. */}
      <div className="flex flex-col gap-12 px-5 py-16 lg:hidden">
        <div className="flex flex-col gap-2">
          <h2 className="text-[48px] font-medium uppercase leading-[1.05] text-[#81A972]">
            Depth
          </h2>
          <p className="text-[16px] uppercase leading-[1.42] text-[#46524B]">
            stop looking at isolated results
          </p>
        </div>

        <div className="relative mx-auto aspect-[1200/1376] w-full max-w-[360px] overflow-hidden">
          <Image
            src="/biomarkers/depth/person.png"
            alt="Meddy physician reviewing biomarkers over time"
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-end gap-4 text-right">
          <p className="text-[22px] uppercase leading-[1.42] text-[#46524B]">
            A lab result is a moment.{" "}
            <span className="font-bold text-[#868686]">Your health is a trend.</span>
          </p>
          <p className="text-[16px] leading-[1.42] text-[#6E7A72]">
            Every result becomes part of your longitudinal health record.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {MONTHS.map((month) => (
            <div key={month.number} className="flex flex-col gap-3">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[40px] font-bold leading-none tracking-[0.02em]"
                  style={{
                    backgroundImage: NUMBER_GRADIENT(114),
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {month.number}
                </span>
                <span className="text-[14px] uppercase text-[#46524B]">Months</span>
              </div>
              <div className="flex flex-col divide-y divide-[#46524B]/30">
                {month.biomarkers.map((b) => (
                  <div key={b.label} className="flex items-center justify-between py-3">
                    <div className="text-[28px] font-medium leading-none text-white">
                      {b.value}{" "}
                      <span className="text-[14px] font-normal">{b.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-full px-3 py-1"
                        style={{ background: TONE_BG[b.tone] }}
                      >
                        <span className="text-[14px] leading-[1.5] text-white/60">
                          {b.status}
                        </span>
                      </span>
                      <span className="text-[14px] uppercase text-white/60">{b.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: sticky 1440 x 1024 canvas scrubbed across four months. */}
      <div data-depth-track className="relative hidden h-[400vh] lg:block">
        <div
          className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
          style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.0009765625))" } as React.CSSProperties}
        >
          <div className="relative" style={{ width: u(1440), height: u(1024) }}>
            {/* Left heading */}
            <div className="absolute flex flex-col" style={{ left: u(100), top: u(60), width: u(370) }}>
              <h2 className="whitespace-nowrap font-medium uppercase leading-[1.416] text-[#81A972]" style={{ fontSize: u(64) }}>
                Depth
              </h2>
              <p className="uppercase leading-[1.416] text-[#46524B]" style={{ fontSize: u(20) }}>
                stop looking at isolated results
              </p>
            </div>

            {/* Person: Figma crops a 1200 x 1376 cut-out inside a 700 x 1005 box */}
            <div className="absolute overflow-hidden" style={{ left: u(-140), top: u(276), width: u(700.38), height: u(1005.53) }}>
              <Image
                src="/biomarkers/depth/person.png"
                alt="Meddy physician reviewing biomarkers over time"
                width={1200}
                height={1376}
                sizes="900px"
                priority
                className="absolute max-w-none"
                style={{ left: "-9.49%", top: "-0.01%", width: "125.24%", height: "100.03%" }}
              />
            </div>
            <div
              className="absolute backdrop-blur-[1px]"
              style={{ left: u(208.35), top: u(836), width: u(55.18), height: u(22.24), background: "rgba(243,243,243,0.1)" }}
            />

            {/* Month indicator */}
            <div className="absolute" style={{ left: u(499), top: u(369), width: u(342) }}>
              <div className="flex px-[var(--px)]" style={{ ["--px" as string]: u(15) }}>
                <span className="uppercase leading-[1.416] text-[#46524B]" style={{ fontSize: u(20) }}>
                  Months
                </span>
              </div>
              <div className="relative mix-blend-plus-lighter" style={{ height: u(380) }}>
                {MONTHS.map((month, i) => (
                  <span
                    key={month.number}
                    data-depth-number
                    className="absolute font-bold leading-[normal] will-change-[opacity,transform]"
                    style={{
                      left: u(-1),
                      top: u(1.8),
                      fontSize: u(300),
                      letterSpacing: u(6),
                      opacity: i === 0 ? 1 : 0,
                      backgroundImage: NUMBER_GRADIENT(month.angle),
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                      transform: "rotate(-0.31deg)",
                    }}
                  >
                    {month.number}
                  </span>
                ))}
              </div>
            </div>

            {/* Right heading */}
            <div className="absolute flex flex-col items-end text-right" style={{ right: u(100), top: u(72), width: u(620), gap: u(15) }}>
              <p className="uppercase leading-[1.416] text-[#46524B]" style={{ fontSize: u(32), width: u(499) }}>
                A lab result is a moment.{" "}
                <span className="font-bold text-[#868686]">Your health is a trend.</span>
              </p>
              <p className="leading-[1.416] text-[#6E7A72]" style={{ fontSize: u(20), width: u(297) }}>
                Every result becomes part of your longitudinal health record.
              </p>
            </div>

            {/* Progress track + readings */}
            <div className="absolute flex items-start justify-between" style={{ right: u(100), top: u(301), width: u(432), height: u(653) }}>
              <svg
                viewBox="0 0 33 592"
                fill="none"
                aria-hidden="true"
                className="shrink-0 overflow-visible"
                style={{ width: u(33), height: u(592), marginTop: u(30.5) }}
              >
                <rect x="14" y="42" width="5" height="485" fill="#2A2A2A" />
                <ellipse cx="15.5" cy="14.5" rx="15.5" ry="14.5" fill="white" />
                <rect data-depth-fill x="14" y="42.5" width="5" height={FILL[0]} fill="#D9D9D9" />
                <ellipse cx="17.5" cy="577.5" rx="15.5" ry="14.5" fill="white" />
              </svg>

              <div className="relative" style={{ width: u(234), height: u(653) }}>
                {MONTHS.map((month, i) => (
                  <div
                    key={month.number}
                    data-depth-snapshot
                    className="absolute inset-0 flex justify-end will-change-[opacity,transform]"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <BiomarkerRows biomarkers={month.biomarkers} />
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
