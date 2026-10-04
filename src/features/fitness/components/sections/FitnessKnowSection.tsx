"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ---- md+: absolute replica of Figma node 11271:12254 (right block is 752 x 788 design px).
// --u = min(100vw/1440, (100dvh - 80px)/788) so the whole section fits one screen. ----
const u = (n: number) => `calc(${n} * var(--u))`;

// Each path starts beside its label and ends at the corresponding muscle.
// Split the original grouped SVGs so every label has an independent draw.
const CONNECTORS = [
  { label: "Shoulders", points: [[147.31, 114.23], [195.44, 113.81], [259.33, 154.89]], width: 2 },
  { label: "Back", points: [[601.13, 90.23], [573.37, 89.81], [398.11, 213.7]], width: 2 },
  { label: "Chest", points: [[143.97, 238.9], [184.43, 238.9], [290.51, 185.47]], width: 2 },
  { label: "Triceps", points: [[568.33, 250.66], [538.79, 250.66], [475.02, 226.68]], width: 1 },
  { label: "Biceps", points: [[146.48, 354.73], [179.51, 350.25], [247.53, 257.22]], width: 1 },
  { label: "Forearms", points: [[577.53, 371.32], [547.99, 371.32], [487.24, 325.96]], width: 1 },
  { label: "Core", points: [[169.66, 485.05], [234.22, 484.63], [358.38, 292.6]], width: 2 },
  { label: "Legs", points: [[536.29, 481.16], [460.23, 481.16], [413.68, 521.47]], width: 1 },
  { label: "Calves", points: [[544.12, 612.72], [468.07, 612.72], [421.21, 627.8]], width: 1 },
];

type Chip = {
  label: string;
  value: string;
  x: number; // chip left in block
  y: number; // chip top in block
  fillW: number;
};

const CHIPS: Chip[] = [
  {
    label: "Back",
    value: "13",
    x: 618,
    y: 36,
    fillW: 39,
  },
  {
    label: "Forearms",
    value: "9",
    x: 596,
    y: 321,
    fillW: 19,
  },
  {
    label: "Triceps",
    value: "17",
    x: 586.84,
    y: 201,
    fillW: 36,
  },
  {
    label: "Calves",
    value: "14",
    x: 559,
    y: 563,
    fillW: 34,
  },
  {
    label: "Legs",
    value: "15",
    x: 551.2,
    y: 432,
    fillW: 44,
  },
  {
    label: "Shoulders",
    value: "7",
    x: 0,
    y: 63,
    fillW: 14,
  },
  {
    label: "Chest",
    value: "11",
    x: 0,
    y: 191,
    fillW: 23,
  },
  {
    label: "Biceps",
    value: "7",
    x: 7,
    y: 305.42,
    fillW: 15,
  },
  {
    label: "Core",
    value: "11",
    x: 44,
    y: 434,
    fillW: 12,
  },
];

function DesktopChip({ c }: { c: Chip }) {
  return (
    <div
      className="absolute bg-[#cecece] font-normal text-white"
      data-muscle-label={c.label}
      style={{
        left: u(c.x),
        top: u(c.y),
        width: u(134),
        height: u(110),
        borderRadius: u(10),
      }}
    >
      <span
        className="absolute whitespace-nowrap leading-[1.2]"
        style={{ left: u(12), top: u(16), fontSize: u(21) }}
      >
        {c.label}
      </span>
      <span
        className="absolute flex items-baseline whitespace-nowrap leading-none"
        style={{ right: u(12), bottom: u(24), gap: u(5) }}
      >
        <span style={{ fontSize: u(34) }}>{c.value}</span>
        <span style={{ fontSize: u(21) }}>%</span>
      </span>
      <span
        className="absolute bg-[#d9d9d9]"
        style={{
          left: u(12),
          right: u(16),
          bottom: u(12),
          height: u(6),
          borderRadius: u(10),
        }}
      >
        <span
          className="absolute right-0 top-0 h-full bg-[#f9f9f9]"
          style={{ width: u(c.fillW), borderRadius: u(10) }}
        />
      </span>
    </div>
  );
}

export default function FitnessKnowSection() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const body = diagram.querySelectorAll("[data-muscle-body]");
      gsap.set(body, { opacity: 0 });
      gsap.set(diagram.querySelectorAll("[data-muscle-label]"), {
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center center",
      });
      gsap.set(diagram.querySelectorAll("[data-connector-path]"), { strokeDashoffset: 1 });
      gsap.set(diagram.querySelectorAll("circle"), { opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: diagram,
          start: "top 90%",
          once: true,
        },
      });
      timeline.to(body, { opacity: 1, duration: 0.18, ease: "power1.out" }, 0);

      CONNECTORS.forEach(({ label }, index) => {
        const start = 0.22 + index * 0.15;
        const connector = diagram.querySelector(`[data-muscle-connector="${label}"]`)!;
        timeline
          .to(diagram.querySelector(`[data-muscle-label="${label}"]`), {
            opacity: 1,
            scale: 1,
            duration: 0.26,
            ease: "power2.out",
          }, start)
          .to(connector.querySelector("[data-connector-start]"), {
            opacity: 1, duration: 0.1,
          }, start)
          .to(connector.querySelector("path"), {
            strokeDashoffset: 0, duration: 0.32, ease: "power1.inOut",
          }, start)
          .to(connector.querySelector("[data-connector-end]"), {
            opacity: 1, duration: 0.08,
          }, start + 0.28);
      });
    });
    return () => media.revert();
  }, { scope: diagramRef });

  return (
    <section
      className="w-full bg-white px-5 py-16 md:px-[var(--p100)] md:py-10"
      style={
        {
          // md+: fit one viewport — 788px block + 40px top/bottom padding, never wider than the 1440 design
          "--us":
            "min(calc(min(100vw, 1440px) * 0.000694444), calc((100dvh - 80px) * 0.001269036))",
          "--u": "var(--us)",
          "--p100": u(100),
        } as React.CSSProperties
      }
    >
      {/* <md follows the 402px mobile frame (node 11911:36606): copy, the same diagram scaled to the column, caption */}
      <div
        className="mx-auto flex w-full max-w-360 flex-col gap-8 md:flex-row md:gap-[var(--gap48)]"
        style={{ ["--gap48" as string]: u(48) }}
      >
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
            Instead of simply counting workouts, Meddy measures how much
            training load you&apos;re putting on different areas of your body.
          </p>
        </div>

        {/* Diagram: 752 x 788 design px, scaled to the column on mobile and by --us from md up */}
        <div
          ref={diagramRef}
          className="relative shrink-0 [--u:calc((100vw_-_40px)*0.0013298)] md:[--u:var(--us)]"
          style={{ width: u(752), height: u(788) }}
        >
          {/* body illustration (+ muscle dots overlay) */}
          <div
            data-muscle-body
            className="absolute"
            style={{
              left: u(179.59),
              top: 0,
              width: u(359.23),
              height: u(788),
            }}
          >
            <Image
              src="/fitness/fitness-know-body-e5f944.png"
              alt="Human body, back view"
              fill
              sizes="360px"
              className="object-contain"
            />
          </div>
          <div
            data-muscle-body
            className="pointer-events-none absolute"
            style={{
              left: u(187.04),
              top: u(5.38),
              width: u(341.85),
              height: u(774.34),
            }}
          >
            <Image
              src="/fitness/fitness-know-muscle-overlay.svg"
              alt=""
              fill
              unoptimized
              className="max-w-none"
            />
          </div>

          {/* Inline paths allow each connector to draw from card to muscle. */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 752 788"
            fill="none"
            aria-hidden="true"
          >
            {CONNECTORS.map(({ label, points, width }) => (
              <g key={label} data-muscle-connector={label}>
                <path
                  data-connector-path
                  d={points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ")}
                  stroke="#46524B"
                  strokeWidth={width}
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={0}
                />
                <circle data-connector-start cx={points[0][0]} cy={points[0][1]} r={2.5} fill="#46524B" />
                <circle data-connector-end cx={points[2][0]} cy={points[2][1]} r={2.5} fill="#46524B" />
              </g>
            ))}
          </svg>

          {/* metric chips */}
          {CHIPS.map((c) => (
            <DesktopChip key={c.label} c={c} />
          ))}
        </div>

        <p className="text-right leading-[1.5] text-[#111110] text-[16px] md:hidden">
          Instead of simply counting workouts, Meddy measures how much training
          load you&apos;re putting on different areas of your body.
        </p>
      </div>
    </section>
  );
}
