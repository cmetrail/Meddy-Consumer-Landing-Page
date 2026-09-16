"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Extracted from /public/Line (2).svg (viewBox 0 0 1440 634) ──────────────
const VIEW_Y = 150;
const VIEW_H = 350;
const VIEW_X = 45;
const VIEW_W = 1350;

const THIN_PATH =
  "M50.1953 303.869C92.835 261.233 172.195 296.376 298.302 347.024" +
  "C468.534 415.394 558.286 339.823 602.11 319.31" +
  "C787.695 232.444 1173.57 345.025 1315.2 494.784";

const THICK_PATH =
  "M57.8047 460.003C102.324 411.592 202.926 386.882 338.763 434.162" +
  "C536.37 502.944 566.121 400.567 652.934 336.25" +
  "C739.747 271.932 805.877 261.378 1026.64 302.154" +
  "C1211.24 336.25 1233.75 299.18 1332.8 174.003";

const GX1 = 119.213;
const GX2 = 1389.803;
const GYS = [182.287, 213.481, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716, 462.893, 494.069];

const FILTERS = [
  { id: "st-f0", x: 145.4, y: 278.403, s: 32.2 },
  { id: "st-f1", x: 1194.4, y: 399.403, s: 32.2 },
  { id: "st-f2", x: 845.4, y: 256.403, s: 46.2 },
];

const DOTS = [
  { cx: 161.5, cy: 294.503, rOuter: 6.4999, rInner: 5.05548, large: false, filterId: "st-f0" },
  { cx: 1210.5, cy: 415.503, rOuter: 6.4999, rInner: 5.05548, large: false, filterId: "st-f1" },
  { cx: 868.5, cy: 279.503, rOuter: 13.4999, rInner: 10.4999, large: true, filterId: "st-f2" },
] as const;

type Variant = "accent" | "plain" | "red";

const CALLS: {
  variant: Variant;
  week: string;
  label?: string;
  value: string;
  left: string;
  top: string;
}[] = [
  { variant: "plain", week: "Week 1", label: "Deep Sleep:", value: "18%", left: "4.19%", top: "20.43%" },
  { variant: "red", week: "Week 2", label: "Caffiene:", value: "172 mg", left: "55.67%", top: "13.00%" },
  { variant: "plain", week: "Week 4", label: "Deep Sleep:", value: "14%", left: "81.96%", top: "54.72%" },
];

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
  const color = variant === "accent" ? "#17925A" : variant === "red" ? "#D25753" : "#FFFFFF";
  const isAccent = variant === "accent";
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
            className={isAccent ? "uppercase text-[#17925A]" : variant === "red" ? "text-[#D25753]" : "text-white"}
            style={{
              fontSize: isAccent ? "clamp(12px,1.11vw,16px)" : "clamp(10px,0.97vw,14px)",
              fontWeight: 700,
              lineHeight: isAccent ? "20px" : "18px",
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

export default function SleepTrend() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 80%", once: true },
      });

      tl.fromTo("[data-graph-title]", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo("[data-graph-chart]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .to(".st-thin", { strokeDashoffset: 0, duration: 1.8, ease: "power2.out" }, 0.5)
        .to(".st-thick", { strokeDashoffset: 0, duration: 2.2, ease: "power2.out" }, 0.2)
        .to(".st-dot", { opacity: 1, duration: 0.4, ease: "power1.out", stagger: 0.08 }, 2.2)
        .to(".st-card", { opacity: 1, duration: 0.5, ease: "power1.out", stagger: 0.08 }, 2.4);
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden">
      <style>{`
        .st-thick, .st-thin { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .st-dot { opacity: 0; }
        .st-card { opacity: 0; }
      `}</style>

      <div className="max-w-360 mx-auto px-5 flex flex-col gap-12.5 lg:px-10">
        <div data-graph-title className="">
          <div className="flex items-center gap-4.25">
            <span
              className="text-white text-xl font-medium tracking-[-2%] leading-[130%]"

            >
              Deep Sleep
            </span>
            <span className="h-[8px] w-[8px] rounded-full bg-white" />
            <span
              className="text-white text-xl font-medium tracking-[-2%] leading-[130%]"

            >
              Caffeine Intake
            </span>
          </div>
          <p
            className="mt-0.5 text-[15px] font-medium leading-[140%] text-[#E7E7E7]"

          >
            Sleep Trend
          </p>
        </div>

        <div data-graph-chart className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
          <svg
            viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
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
                id="st-thin-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-663.127 23.2727 -93.5053 -2162.6 694.901 297.333)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.812" stopColor="white" />
                <stop offset="0.951" stopColor="white" stopOpacity="0" />
              </radialGradient>

              <radialGradient
                id="st-thick-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-663.337 27.7703 66.2132 1920.71 721.142 415.243)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#D25753" />
                <stop offset="0.687" stopColor="#893F35" />
                <stop offset="0.951" stopColor="#A83232" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="st-small-dot" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(5.05548 5.05551) rotate(87.3975) scale(6.18534 6.18529)">
                <stop offset="0.016" stopColor="#6886AD" />
                <stop offset="1" stopColor="#191762" />
              </radialGradient>
              <radialGradient id="st-large-dot" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466 12.8465)">
                <stop offset="0.016" stopColor="#AD6868" />
                <stop offset="1" stopColor="#621717" />
              </radialGradient>
            </defs>

            <g opacity="0.2">
              {GYS.map((y) => (
                <line
                  key={y}
                  x1={GX1} y1={y} x2={GX2} y2={y}
                  stroke="#E7E7E7" strokeWidth="0.784314"
                />
              ))}
            </g>

            <path
              d={THIN_PATH}
              stroke="url(#st-thin-grad)"
              strokeWidth="1.003"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="st-thin"
            />

            <path
              d={THICK_PATH}
              stroke="url(#st-thick-grad)"
              strokeWidth="10.03"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="st-thick"
            />

            {DOTS.map((d) => (
              <g key={d.filterId} className="st-dot">
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={d.rOuter} ry={d.rOuter}
                  fill={d.large ? "#C27B55" : "#5577C2"}
                  filter={`url(#${d.filterId})`}
                />
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={d.rInner} ry={d.rInner}
                  fill={d.large ? "url(#st-large-dot)" : "url(#st-small-dot)"}
                />
              </g>
            ))}
          </svg>

          {CALLS.map((c) => (
            <div
              key={`${c.week}-${c.value}`}
              className="st-card absolute hidden lg:block"
              style={{ left: c.left, top: c.top }}
            >
              <CalloutCard variant={c.variant} week={c.week} label={c.label} value={c.value} tail />
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
          {CALLS.map((c) => (
            <CalloutCard key={`${c.week}-${c.value}`} variant={c.variant} week={c.week} label={c.label} value={c.value} />
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-[9.41px]">
            <span
              className="rounded-[2.35px]"
              style={{ width: "14.9px", height: "14.9px", background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)" }}
            />
            <span className="text-white text-[15px] font-medium leading-[140%]" >
              Deep Sleep
            </span>
          </div>
          <div className="flex items-center gap-[9.41px]">
            <span
              className="rounded-[2.35px]"
              style={{ width: "14.9px", height: "14.9px", background: "linear-gradient(180deg, #621717 0%, rgba(98, 23, 23, 0.5) 100%)" }}
            />
            <span className="text-white text-[15px] font-medium leading-[140%]" >
              Caffeine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
