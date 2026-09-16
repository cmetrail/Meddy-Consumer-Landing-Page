"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Extracted from /public/Line.svg (viewBox 0 0 1440 634) + graph.md ────────
const W = 1440;
const H = 634;
// Crop the SVG to the data region (cards start ~157, grid ends ~494) so the
// title (above) and legend (below) sit tight against the chart with no dead space.
const VIEW_Y = 150;
const VIEW_H = 350;
const VIEW_X = 45;
const VIEW_W = 1350;

// Exact bezier paths from Line.svg
const SOD_PATH =
  "M54.5 278.279C97.1397 229.928 176.5 269.781 302.607 327.218" +
  "C472.839 404.752 562.591 319.052 606.415 295.79" +
  "C792 197.28 1177.88 324.951 1319.5 494.784";

const BP_PATH =
  "M50.1953 240.521C94.6903 281.697 195.238 302.714 331 262.499" +
  "C528.5 203.997 558.235 291.074 645 345.78" +
  "C731.765 400.485 797.86 409.462 1018.5 374.78" +
  "C1203 345.78 1225.5 377.31 1324.5 483.78";

// Grid line y-coords from Line.svg (x spans 119.213 → 1389.803)
const GX1 = 119.213;
const GX2 = 1389.803;
const GYS = [182.287, 213.48, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716, 462.893, 494.069];

// Dot centres in SVG space (from ellipse transforms in Line.svg)
const DOTS = [
  { cx: 448.5, cy: 241.503, rOuter: 13.5, rInner: 10.5, green: true, filterId: "gbd-f0" },
  { cx: 160.5, cy: 266.503, rOuter: 6.5, rInner: 5.055, green: false, filterId: "gbd-f1" },
  { cx: 1087.5, cy: 334.503, rOuter: 6.5, rInner: 5.055, green: false, filterId: "gbd-f2" },
  { cx: 1218.5, cy: 384.503, rOuter: 13.5, rInner: 10.5, green: true, filterId: "gbd-f3" },
] as const;

type Variant = "bp" | "sodium";

// Callout cards (graph.md Frame 2147225684) — % positions match Line.svg rect coords
const CALLS: {
  variant: Variant;
  week: string;
  label?: string;
  value: string;
  left: string;
  top: string;
}[] = [
    { variant: "sodium", week: "Week 1", label: "Sodium:", value: "3400 mg", left: "3.96%", top: "12.14%" },
    { variant: "bp", week: "Week 1", value: "BP:138", left: "25.81%", top: "2.14%" },
    { variant: "sodium", week: "Week 8", label: "Sodium:", value: "2400 mg", left: "72.63%", top: "31.57%" },
    { variant: "bp", week: "Week 8", value: "BP:130", left: "82.85%", top: "43.00%" },
  ];

// Outlined callout card — transparent bg, 1px border, radius 5px
function CalloutCard({
  variant,
  week,
  label,
  value,
  tail = false,
}: {
  variant: Variant;
  week: string;
  label?: string;
  value: string;
  tail?: boolean;
}) {
  const color = variant === "bp" ? "#FFFFFF" : "#17925A";
  const isBp = variant === "bp";
  return (
    <div className={tail ? "flex flex-col items-center" : "flex flex-col items-start"}>
      <div
        className="rounded-[5px] border bg-transparent px-[10px] py-[4px] text-left"
        style={{ borderColor: color, borderWidth: 1 }}
      >
        <span
          className="block text-[#ADADAD]"
          style={{ fontSize: "clamp(9px,0.83vw,12px)", fontWeight: 500, lineHeight: "15px" }}
        >
          {week}
        </span>
        <div className="mt-[4px] flex items-center gap-[5px]">
          {label && (
            <span
              className="text-[#ADADAD]"
              style={{ fontSize: "clamp(8px,0.69vw,10px)", fontWeight: 400, lineHeight: "13px" }}
            >
              {label}
            </span>
          )}
          <span
            className={isBp ? "uppercase text-white" : "text-[#17925A]"}
            style={{
              fontSize: isBp ? "clamp(12px,1.11vw,16px)" : "clamp(10px,0.97vw,14px)",
              fontWeight: 700,
              lineHeight: isBp ? "20px" : "18px",
            }}
          >
            {value}
          </span>
        </div>
      </div>
      {tail && (
        <span
          style={{
            width: 0,
            height: 0,
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderTop: `12px solid ${color}`,
          }}
        />
      )}
    </div>
  );
}

export default function GraphBand() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      });

      tl.fromTo("[data-graph-title]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo("[data-graph-chart]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .to(".gbd-sod", { strokeDashoffset: 0, duration: 1.8, ease: "power2.out" }, 0.5)
        .to(".gbd-bp", { strokeDashoffset: 0, duration: 2.2, ease: "power2.out" }, 0.2)
        .to(".gbd-dot", { opacity: 1, duration: 0.4, ease: "power1.out", stagger: 0.08 }, 2.2)
        .to(".gbd-card", { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.08 }, 2.4);
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      {/* Static initial states — GSAP animates these on scroll */}
      <style>{`
        .gbd-bp, .gbd-sod { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .gbd-dot { opacity: 0; }
        .gbd-card { opacity: 0; }
      `}</style>

      <div className="max-w-360 mx-auto px-5 flex flex-col gap-12.5 lg:px-10">
        {/* Title (graph.md Heading) */}
        <div data-graph-title className="">
          <div className="flex items-center gap-4.25">
            <span
              className="text-white text-xl font-medium tracking-[-2%] leading-[130%]"

            >
              Blood pressure
            </span>
            <span className="h-2 w-2 rounded-full bg-white" />
            <span
              className="text-white text-xl font-medium tracking-[-2%] leading-[130%]"

            >
              Sodium Intake
            </span>
          </div>
          <p
            className="mt-0.5 text-[15px] font-medium leading-[140%] text-[#E7E7E7]"

          >
            Nutrition threshold
          </p>
        </div>

        {/* Chart */}
        <div data-graph-chart className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          <svg
            viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              {/* Blur/glow filters for dots — exact from Line.svg */}
              {[
                { id: "gbd-f0", x: 425.4, y: 218.403, s: 46.2 },
                { id: "gbd-f1", x: 144.4, y: 250.403, s: 32.2 },
                { id: "gbd-f2", x: 1071.4, y: 318.403, s: 32.2 },
                { id: "gbd-f3", x: 1195.4, y: 361.403, s: 46.2 },
              ].map((f) => (
                <filter
                  key={f.id}
                  id={f.id}
                  x={f.x} y={f.y} width={f.s} height={f.s}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="bg" />
                  <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
                  <feGaussianBlur stdDeviation="4.8" result="blur" />
                </filter>
              ))}

              {/* Radial gradient — sodium line (white → transparent) */}
              <radialGradient
                id="gbd-sod-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-663.127 26.3921 -93.5053 -2452.47 699.205 270.867)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.812" stopColor="white" />
                <stop offset="0.951" stopColor="white" stopOpacity="0" />
              </radialGradient>

              {/* Radial gradient — BP line (bright green → dark green → transparent) */}
              <radialGradient
                id="gbd-bp-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-662.976 -23.6202 66.1771 -1633.67 713.171 278.591)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#61D253" />
                <stop offset="0.687" stopColor="#4C8935" />
                <stop offset="0.951" stopColor="#57A832" stopOpacity="0" />
              </radialGradient>

              {/* Dot fill gradients */}
              <radialGradient id="gbd-green-dot" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466)">
                <stop offset="0.016" stopColor="#68AD75" />
                <stop offset="1" stopColor="#17622B" />
              </radialGradient>
              <radialGradient id="gbd-red-dot" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(5.05548 5.05551) rotate(87.3975) scale(6.18534)">
                <stop offset="0.016" stopColor="#AD8068" />
                <stop offset="1" stopColor="#621717" />
              </radialGradient>
            </defs>

            {/* Grid lines — exact y-coords from Line.svg */}
            <g opacity="0.2">
              {GYS.map((y) => (
                <line
                  key={y}
                  x1={GX1} y1={y} x2={GX2} y2={y}
                  stroke="#E7E7E7" strokeWidth="0.784314"
                />
              ))}
            </g>

            {/* Sodium line — thin, white radial gradient */}
            <path
              d={SOD_PATH}
              stroke="url(#gbd-sod-grad)"
              strokeWidth="1.003"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="gbd-sod"
            />

            {/* BP line — thick, green radial gradient */}
            <path
              d={BP_PATH}
              stroke="url(#gbd-bp-grad)"
              strokeWidth="10.03"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="gbd-bp"
            />

            {/* Dots — fade in after lines finish drawing */}
            {DOTS.map((d) => (
              <g key={d.filterId} className="gbd-dot">
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={d.rOuter} ry={d.rOuter}
                  fill={d.green ? "#55C272" : "#C26E55"}
                  filter={`url(#${d.filterId})`}
                />
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={d.rInner} ry={d.rInner}
                  fill={d.green ? "url(#gbd-green-dot)" : "url(#gbd-red-dot)"}
                />
              </g>
            ))}
          </svg>

          {/* Outlined callout cards — absolute, desktop only */}
          {CALLS.map((c) => (
            <div
              key={`${c.week}-${c.value}`}
              className="gbd-card absolute hidden lg:block"
              style={{ left: c.left, top: c.top }}
            >
              <CalloutCard variant={c.variant} week={c.week} label={c.label} value={c.value} tail />
            </div>
          ))}
        </div>

        {/* Callout cards — flow grid, mobile/tablet */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
          {CALLS.map((c) => (
            <CalloutCard key={`${c.week}-${c.value}`} variant={c.variant} week={c.week} label={c.label} value={c.value} />
          ))}
        </div>

        {/* Legend (graph.md Frame 2147225696) */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-[9.41px]">
            <span
              className="rounded-[2.35px]"
              style={{ width: "14.9px", height: "14.9px", background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)" }}
            />
            <span className="text-white text-[15px] font-medium leading-[140%]" >
              Blood pressure
            </span>
          </div>
          <div className="flex items-center gap-[9.41px]">
            <span
              className="rounded-[2.35px]"
              style={{ width: "14.9px", height: "14.9px", background: "linear-gradient(180deg, #17925A 0%, rgba(23, 146, 90, 0.31) 100%)" }}
            />
            <span className="text-white text-[15px] font-medium leading-[140%]" >
              Sodium Intake
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
