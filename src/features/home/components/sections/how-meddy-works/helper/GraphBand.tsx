"use client";

import { useId, useRef } from "react";
import TrendOrbs from "./TrendOrbs";
import { DESKTOP_MOTION } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Extracted from /public/Line.svg (viewBox 0 0 1440 634) + graph.md ────────
// Crop the SVG to the data region (cards start ~157, grid ends ~494) so the
// title (above) and legend (below) sit tight against the chart with no dead space.
const VIEW_Y = 150;
const VIEW_H = 350;
const VIEW_X = 45;
const VIEW_W = 1350;

// Supplied SVG paths, fitted to the existing chart coordinate system.
const PATH_TRANSFORM = "translate(50 250) scale(1.3 1.12)";
const SOD_PATH =
  "M0.324219 0.303711C34.5813 36.8754 111.993 55.5424 216.518 19.8247" +
  "C368.575 -32.1354 391.468 45.204 458.269 93.792" +
  "C525.071 142.38 575.957 150.353 745.83 119.55" +
  "C887.878 93.792 905.2 121.796 981.422 216.36";
const BP_PATH =
  "M3.53906 23.6771C36.3677 -19.2669 97.4679 16.1296 194.559 67.1436" +
  "C325.621 136.007 394.723 59.8904 428.463 39.2297" +
  "C571.346 -48.2641 868.435 65.1303 977.473 215.971";

// Grid line y-coords from Line.svg (x spans 119.213 → 1389.803)
const GX1 = 119.213;
const GX2 = 1389.803;
const GYS = [
  182.287, 213.48, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716,
  462.893, 494.069,
];

// Dot centres in SVG space (from ellipse transforms in Line.svg)
const DOTS = [
  {
    cx: 448.5,
    cy: 356.476088,
    rOuter: 13.5,
    rInner: 10.5,
    green: true,
    filterId: "gbd-f0",
  },
  {
    cx: 160.5,
    cy: 292.036188,
    rOuter: 6.5,
    rInner: 5.055,
    green: false,
    filterId: "gbd-f1",
  },
  {
    cx: 1087.5,
    cy: 375.421467,
    rOuter: 6.5,
    rInner: 5.055,
    green: false,
    filterId: "gbd-f2",
  },
  {
    cx: 1218.5,
    cy: 402.737281,
    rOuter: 13.5,
    rInner: 10.5,
    green: true,
    filterId: "gbd-f3",
  },
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
  dotIndex: number;
}[] = [
  {
    variant: "sodium",
    week: "Week 1",
    label: "Sodium:",
    value: "3400 mg",
    left: "8.56%",
    top: "40.581768%",
    dotIndex: 1,
  },
  {
    variant: "bp",
    week: "Week 1",
    value: "BP:138",
    left: "29.89%",
    top: "58.993168%",
    dotIndex: 0,
  },
  {
    variant: "sodium",
    week: "Week 8",
    label: "Sodium:",
    value: "2400 mg",
    left: "77.22%",
    top: "64.406133%",
    dotIndex: 2,
  },
  {
    variant: "bp",
    week: "Week 8",
    value: "BP:130",
    left: "86.93%",
    top: "72.210652%",
    dotIndex: 3,
  },
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
    <div
      className={
        tail ? "flex flex-col items-center" : "flex flex-col items-start"
      }
    >
      <div
        className="rounded-[5px] border bg-transparent px-[10px] py-[4px] text-left"
        style={{ borderColor: color, borderWidth: 1 }}
      >
        <span
          className="block text-[#ADADAD]"
          style={{
            fontSize: "clamp(9px,0.83vw,12px)",
            fontWeight: 500,
            lineHeight: "15px",
          }}
        >
          {week}
        </span>
        <div className="mt-[4px] flex items-center gap-[5px]">
          {label && (
            <span
              className="text-[#ADADAD]"
              style={{
                fontSize: "clamp(8px,0.69vw,10px)",
                fontWeight: 400,
                lineHeight: "13px",
              }}
            >
              {label}
            </span>
          )}
          <span
            className={isBp ? "uppercase text-white" : "text-[#17925A]"}
            style={{
              fontSize: isBp
                ? "clamp(12px,1.11vw,16px)"
                : "clamp(10px,0.97vw,14px)",
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
  const revealId = useId();

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            // Wait until the chart is in view before drawing.
            start: "top 15%",
            end: () => `+=${window.innerHeight * 0.8}`,
            // Gently catch up to scrolling instead of snapping to each wheel step.
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // A shared horizontal mask keeps both paths at the same reveal position.
        tl.fromTo(
          "[data-graph-reveal]",
          { attr: { width: 0 } },
          { attr: { width: VIEW_W }, duration: 1 },
          0,
        );

        gsap.utils.toArray<SVGGElement>(".gbd-dot").forEach((dot, index) => {
          tl.fromTo(
            dot,
            { opacity: 0 },
            { opacity: 1, duration: 0.08, ease: "sine.out" },
            (DOTS[index].cx - VIEW_X) / VIEW_W,
          );
        });
        gsap.utils.toArray<HTMLElement>(".gbd-card").forEach((card, index) => {
          tl.fromTo(
            card,
            { opacity: 0 },
            { opacity: 1, duration: 0.08, ease: "sine.out" },
            // Match the marker's actual SVG x coordinate and the moving orb.
            (DOTS[CALLS[index].dotIndex].cx - VIEW_X) / VIEW_W,
          );
        });

        // Keep the finished graph in view briefly before the sticky section exits.
        tl.to({}, { duration: 0.15 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-mobile-reveal="card" className="gbd-scroll relative w-full">
      <style>{`
        .gbd-scroll { min-height: 100svh; }
        .gbd-sticky { position: relative; min-height: 100svh; display: flex; align-items: center; }
        .gbd-content { width: 100%; }
        @media (min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
          .gbd-scroll { min-height: 180svh; }
          .gbd-sticky { position: sticky; top: 0; }
        }
        .gbd-card { transform: translate(-50%, -100%); transform-origin: 50% 100%; }
        @media (max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce) {
          .gbd-scroll { min-height: 0; }
          .gbd-sticky { min-height: 0; }
        }
        @media (max-height: 600px) {
          .gbd-content { gap: 16px; }
          .gbd-content [data-nutrition-chart] { max-height: 45svh; }
        }
        @media (max-width: 1023px) {
          .gbd-card { transform: translate(-50%, -100%) scale(0.75); }
        }
      `}</style>

      <div className="gbd-sticky">
        <div className="gbd-content max-w-360 mx-auto px-5 flex flex-col gap-12.5 lg:px-10">
          {/* Title (graph.md Heading) */}
          <div>
            <div className="flex items-center gap-4.25">
              <span className="text-white text-xl font-medium tracking-[-2%] leading-[130%]">
                Blood pressure
              </span>
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="text-white text-xl font-medium tracking-[-2%] leading-[130%]">
                Sodium Intake
              </span>
            </div>
            <p className="mt-0.5 text-[15px] font-medium leading-[140%] text-[#E7E7E7]">
              Nutrition Trend
            </p>
          </div>

          {/* Chart */}
          <div
            data-nutrition-chart
            className="relative w-full aspect-[1350/350] max-lg:aspect-[1350/560]"
          >
            <svg
              viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <clipPath id={revealId} clipPathUnits="userSpaceOnUse">
                  <rect
                    data-graph-reveal
                    x={VIEW_X}
                    y={VIEW_Y}
                    width={VIEW_W}
                    height={VIEW_H}
                  />
                </clipPath>
                {/* Blur/glow filters for dots — exact from Line.svg */}
                {[
                  { id: "gbd-f0", x: 425.4, y: 333.376088, s: 46.2 },
                  { id: "gbd-f1", x: 144.4, y: 275.936188, s: 32.2 },
                  { id: "gbd-f2", x: 1071.4, y: 359.321467, s: 32.2 },
                  { id: "gbd-f3", x: 1195.4, y: 379.637281, s: 46.2 },
                ].map((f) => (
                  <filter
                    key={f.id}
                    id={f.id}
                    x={f.x}
                    y={f.y}
                    width={f.s}
                    height={f.s}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="bg" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="bg"
                      result="shape"
                    />
                    <feGaussianBlur stdDeviation="4.8" result="blur" />
                  </filter>
                ))}

                {/* Radial gradient — sodium line (white → transparent) */}
                <radialGradient
                  id="gbd-sod-grad"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(-510.43 -20.9789 50.9503 -1450.98 510.754 34.117)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="0.68711" stopColor="white" />
                  <stop offset="0.951034" stopColor="white" stopOpacity="0" />
                </radialGradient>

                {/* Radial gradient — BP line (bright green → dark green → transparent) */}
                <radialGradient
                  id="gbd-bp-grad"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="matrix(-510.547 23.4408 -71.9905 -2178.22 499.903 17.0936)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#17925A" />
                  <stop offset="0.812332" stopColor="#377B3F" />
                  <stop offset="0.951034" stopColor="#17925A" stopOpacity="0" />
                </radialGradient>

                {/* Dot fill gradients */}
                <radialGradient
                  id="gbd-green-dot"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466)"
                >
                  <stop offset="0.016" stopColor="#68AD75" />
                  <stop offset="1" stopColor="#17622B" />
                </radialGradient>
                <radialGradient
                  id="gbd-red-dot"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(5.05548 5.05551) rotate(87.3975) scale(6.18534)"
                >
                  <stop offset="0.016" stopColor="#AD8068" />
                  <stop offset="1" stopColor="#621717" />
                </radialGradient>
              </defs>

              {/* Grid lines — exact y-coords from Line.svg */}
              <g opacity="0.2">
                {GYS.map((y) => (
                  <line
                    key={y}
                    x1={GX1}
                    y1={y}
                    x2={GX2}
                    y2={y}
                    stroke="#E7E7E7"
                    strokeWidth="0.784314"
                  />
                ))}
              </g>

              {/* Sodium line — thin, white radial gradient */}
              <g clipPath={`url(#${revealId})`}>
              <path
                data-trend-path
                transform={PATH_TRANSFORM}
                pathLength="1"
                strokeDasharray="1 1"
                d={SOD_PATH}
                stroke="url(#gbd-sod-grad)"
                strokeWidth="0.888174"
                fill="none"
                strokeLinecap="round"
                className="gbd-sod"
              />
              </g>

              {/* BP line — thick, green radial gradient */}
              <g clipPath={`url(#${revealId})`}>
              <path
                data-trend-path
                transform={PATH_TRANSFORM}
                pathLength="1"
                strokeDasharray="1 1"
                d={BP_PATH}
                stroke="url(#gbd-bp-grad)"
                strokeWidth="8.90838"
                fill="none"
                strokeLinecap="round"
                className="gbd-bp"
              />
              </g>

              {/* Dots — fade in after lines finish drawing */}
              {DOTS.map((d) => (
                <g key={d.filterId} className="gbd-dot">
                  <ellipse
                    cx={d.cx}
                    cy={d.cy}
                    rx={d.rOuter}
                    ry={d.rOuter}
                    fill={d.green ? "#55C272" : "#C26E55"}
                    filter={`url(#${d.filterId})`}
                  />
                  <ellipse
                    cx={d.cx}
                    cy={d.cy}
                    rx={d.rInner}
                    ry={d.rInner}
                    fill={d.green ? "url(#gbd-green-dot)" : "url(#gbd-red-dot)"}
                  />
                </g>
              ))}
            </svg>
            <TrendOrbs />

            {/* Outlined callout cards — absolute, desktop only */}
            {CALLS.map((c) => (
              <div
                key={`${c.week}-${c.value}`}
                className="gbd-card absolute"
                style={{ left: c.left, top: c.top }}
              >
                <CalloutCard
                  variant={c.variant}
                  week={c.week}
                  label={c.label}
                  value={c.value}
                  tail
                />
              </div>
            ))}
          </div>

          {/* Legend (graph.md Frame 2147225696) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-[9.41px]">
              <span
                className="rounded-[2.35px]"
                style={{
                  width: "14.9px",
                  height: "14.9px",
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)",
                }}
              />
              <span className="text-white text-[15px] font-medium leading-[140%]">
                Blood pressure
              </span>
            </div>
            <div className="flex items-center gap-[9.41px]">
              <span
                className="rounded-[2.35px]"
                style={{
                  width: "14.9px",
                  height: "14.9px",
                  background:
                    "linear-gradient(180deg, #17925A 0%, rgba(23, 146, 90, 0.31) 100%)",
                }}
              />
              <span className="text-white text-[15px] font-medium leading-[140%]">
                Sodium Intake
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
