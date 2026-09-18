"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Extracted from /public/Line (3).svg (viewBox 0 0 1439 534) ──────────────
// Single green metric line (A1c) with a dashed event marker and a dark-green
// dose card. Crop to the data region (event card starts ~124, grid ends ~494).
const VIEW_Y = 95;
const VIEW_H = 410;
const VIEW_X = 45;
const VIEW_W = 1350;

// Exact bezier path from Line (3).svg
const LINE_PATH =
  "M49.1953 275.784C93.7146 312.854 187.478 306.499 328 302.503" +
  "C539 296.503 560.399 338.989 659 323.503" +
  "C910.5 284.003 795.071 396.655 1018.03 396.655" +
  "C1219.5 396.655 1225.14 398.932 1324.2 494.784";

// Grid line y-coords (x spans 118.213 → 1388.803)
const GX1 = 118.213;
const GX2 = 1388.803;
const GYS = [182.287, 213.481, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716, 462.893, 494.069];

// Blur filters + dot centres (from ellipse transforms in Line (3).svg)
const FILTERS = [
  { id: "a1c-f0", x: 747.4, y: 293.403, s: 46.2 },
  { id: "a1c-f1", x: 158.4, y: 281.4, s: 46.2 },
  { id: "a1c-f2", x: 1186.4, y: 385.4, s: 46.2 },
];

const DOTS = [
  { cx: 770.5, cy: 316.503, filterId: "a1c-f0" },
  { cx: 181.5, cy: 304.5, filterId: "a1c-f1" },
  { cx: 1209.5, cy: 408.5, filterId: "a1c-f2" },
] as const;

// Dashed vertical event marker (semaglutide dose increase)
const MARKER = { x: 771, y1: 276.003, y2: 495.003 };

// Circular transition arrow (from Line (3).svg line 36, stroke #3EAE1C)
const ARROW_PATH =
  "M761.207 231.796C761.108 231.895 760.982 231.962 760.845 231.99" +
  "C760.708 232.017 760.566 232.003 760.436 231.949" +
  "C760.307 231.896 760.197 231.805 760.119 231.689" +
  "C760.041 231.573 760 231.436 760 231.296V228.003" +
  "C760 227.738 759.895 227.484 759.707 227.296" +
  "C759.52 227.108 759.265 227.003 759 227.003H753" +
  "C752.735 227.003 752.48 226.898 752.293 226.71" +
  "C752.105 226.523 752 226.268 752 226.003V222.003" +
  "C752 221.738 752.105 221.484 752.293 221.296" +
  "C752.48 221.108 752.735 221.003 753 221.003H759" +
  "C759.265 221.003 759.52 220.898 759.707 220.71" +
  "C759.895 220.523 760 220.268 760 220.003V216.71" +
  "C760 216.57 760.041 216.434 760.119 216.317" +
  "C760.197 216.201 760.307 216.11 760.436 216.057" +
  "C760.566 216.003 760.708 215.989 760.845 216.017" +
  "C760.982 216.044 761.108 216.111 761.207 216.21L768.147 223.15" +
  "C768.259 223.262 768.348 223.395 768.409 223.542" +
  "C768.469 223.688 768.501 223.845 768.501 224.004" +
  "C768.501 224.162 768.469 224.319 768.409 224.465" +
  "C768.348 224.612 768.259 224.745 768.147 224.857L761.207 231.796Z";

// Outlined callout card — "A1c: <value>", transparent bg, 1px white border
function CalloutCard({ value, tail = false }: { value: string; tail?: boolean }) {
  return (
    <div className={tail ? "flex flex-col items-center" : "flex flex-col items-start"}>
      <div className="rounded-[5px] border bg-transparent px-[10px] py-[4px]" style={{ borderColor: "#FFFFFF", borderWidth: 1 }}>
        <div className="flex items-center gap-[5px]">
          <span
            className="text-[#ADADAD]"
            style={{ fontSize: "clamp(8px,0.69vw,10px)", fontWeight: 400, lineHeight: "13px" }}
          >
            A1c:
          </span>
          <span
            className="text-white"
            style={{ fontSize: "clamp(10px,0.97vw,14px)", fontWeight: 700, lineHeight: "18px" }}
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
            borderTop: "12px solid #FFFFFF",
          }}
        />
      )}
    </div>
  );
}

// Dark-green event card — "Jan 4 · Semaglutide dose increased" + dose delta
function EventCard({ tail = false }: { tail?: boolean }) {
  return (
    <div className={tail ? "flex flex-col items-center" : "flex flex-col items-start"}>
      <div className="rounded-[5px] bg-[#003B1D] px-[12px] py-[8px] text-left">
        <span
          className="block text-[#ADADAD]"
          style={{ fontSize: "clamp(9px,0.83vw,12px)", fontWeight: 500, lineHeight: "15px" }}
        >
          Jan 4
        </span>
        <span
          className="block text-[#ADADAD]"
          style={{ fontSize: "clamp(9px,0.83vw,12px)", fontWeight: 500, lineHeight: "15px" }}
        >
          Semaglutide dose
        </span>
        <span
          className="block text-[#3EAE1C]"
          style={{ fontSize: "clamp(9px,0.83vw,12px)", fontWeight: 500, lineHeight: "15px" }}
        >
          increased
        </span>
        <div className="mt-[6px] flex items-center gap-[6px]">
          <span
            className="text-white"
            style={{ fontSize: "clamp(10px,0.97vw,14px)", fontWeight: 700, lineHeight: "18px" }}
          >
            1.7 mg
          </span>
          <svg viewBox="750 214 20 20" className="h-[15px] w-[15px] shrink-0" fill="none">
            <path d={ARROW_PATH} stroke="#3EAE1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className="text-[#3EAE1C]"
            style={{ fontSize: "clamp(10px,0.97vw,14px)", fontWeight: 700, lineHeight: "18px" }}
          >
            2.4 mg
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
            borderTop: "12px solid #003B1D",
          }}
        />
      )}
    </div>
  );
}

export default function A1cTrend() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      });

      tl.fromTo("[data-graph-title]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo("[data-graph-chart]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .to(".a1c-line", { strokeDashoffset: 0, duration: 2.2, ease: "power2.out" }, 0.2)
        .to(".a1c-marker", { opacity: 1, duration: 0.4, ease: "power1.out" }, 1.6)
        .to(".a1c-dot", { opacity: 1, duration: 0.4, ease: "power1.out", stagger: 0.08 }, 2.2)
        .to(".a1c-card", { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.08 }, 2.4);
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      <style>{`
        .a1c-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .a1c-marker { stroke-dasharray: 3 3; opacity: 0; }
        .a1c-dot { opacity: 0; }
        .a1c-card { opacity: 0; transform: translate(-50%, -100%); transform-origin: 50% 100%; }
        @media (max-width: 1023px) {
          .a1c-card { transform: translate(-50%, -100%) scale(0.75); }
        }
      `}</style>

      <div className="max-w-360 mx-auto px-5 flex flex-col gap-12.5 lg:px-10">
        {/* Title */}
        <div data-graph-title className="">
          <div className="flex items-center gap-4.25">
            <span className="text-white text-xl font-medium tracking-[-2%] leading-[130%]">
              A1c
            </span>
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="text-white text-xl font-medium tracking-[-2%] leading-[130%]">
              Semaglutide
            </span>
          </div>
          <p className="mt-0.5 text-[15px] font-medium leading-[140%] text-[#E7E7E7]">
            Health Insight Trend
          </p>
        </div>

        {/* Chart */}
        <div data-graph-chart className="relative w-full aspect-[1350/410] max-lg:aspect-[1350/620]">
          <svg
            viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              {FILTERS.map((f) => (
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

              <radialGradient
                id="a1c-line-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-663.337 -21.2647 66.2132 -1470.75 712.532 310.058)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#61D253" />
                <stop offset="0.687" stopColor="#4C8935" />
                <stop offset="0.951" stopColor="#57A832" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="a1c-dot-grad" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466)">
                <stop offset="0.016" stopColor="#68AD75" />
                <stop offset="1" stopColor="#17622B" />
              </radialGradient>
            </defs>

            {/* Grid lines */}
            <g opacity="0.2">
              {GYS.map((y) => (
                <line
                  key={y}
                  x1={GX1} y1={y} x2={GX2} y2={y}
                  stroke="#E7E7E7" strokeWidth="0.784314"
                />
              ))}
            </g>

            {/* A1c line — thick, green radial gradient */}
            <path
              d={LINE_PATH}
              stroke="url(#a1c-line-grad)"
              strokeWidth="10.03"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="a1c-line"
            />

            {/* Dashed event marker */}
            <line
              x1={MARKER.x} y1={MARKER.y1} x2={MARKER.x} y2={MARKER.y2}
              stroke="#3EAE1C" strokeWidth="2"
              className="a1c-marker"
            />

            {/* Dots */}
            {DOTS.map((d) => (
              <g key={d.filterId} className="a1c-dot">
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={13.4999} ry={13.4999}
                  fill="#55C272"
                  filter={`url(#${d.filterId})`}
                />
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={10.4999} ry={10.4999}
                  fill="url(#a1c-dot-grad)"
                />
              </g>
            ))}
          </svg>

          {/* Event card — absolute (tail tip touches marker top at y=276.003) */}
          <div
            className="a1c-card absolute flex"
            style={{ left: "53.67%", top: "44.15%" }}
          >
            <EventCard tail />
          </div>

          {/* Callout cards — absolute */}
          <div className="a1c-card absolute" style={{ left: "10.11%", top: "51.10%" }}>
            <CalloutCard value="7.5" tail />
          </div>
          <div className="a1c-card absolute" style={{ left: "86.26%", top: "76.46%" }}>
            <CalloutCard value="6.0" tail />
          </div>
        </div>
      </div>
    </div>
  );
}
