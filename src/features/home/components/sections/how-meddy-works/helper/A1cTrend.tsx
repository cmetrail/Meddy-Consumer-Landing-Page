"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import type { CareModel } from "@/features/physician-care/components/helper/createCareModel";
import { DESKTOP_MOTION } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Extracted from /public/Line (3).svg (viewBox 0 0 1439 534) ──────────────
// Single green metric line (A1c) with a dashed event marker and a dark-green
// medication pen. Crop to the data region (event card starts ~124, grid ends ~494).
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
const GYS = [
  182.287, 213.481, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716,
  462.893, 494.069,
];

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
const BEFORE_WIDTH = MARKER.x - VIEW_X;

// Outlined callout card — "A1c: <value>", transparent bg, 1px white border
function CalloutCard({
  value,
  tail = false,
}: {
  value: string;
  tail?: boolean;
}) {
  return (
    <div
      className={
        tail ? "flex flex-col items-center" : "flex flex-col items-start"
      }
    >
      <div
        className="rounded-[5px] border bg-transparent px-[10px] py-[4px]"
        style={{ borderColor: "#FFFFFF", borderWidth: 1 }}
      >
        <div className="flex items-center gap-[5px]">
          <span
            className="text-[#ADADAD]"
            style={{
              fontSize: "clamp(8px,0.69vw,10px)",
              fontWeight: 400,
              lineHeight: "13px",
            }}
          >
            A1c:
          </span>
          <span
            className="text-white"
            style={{
              fontSize: "clamp(10px,0.97vw,14px)",
              fontWeight: 700,
              lineHeight: "18px",
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
            borderTop: "12px solid #FFFFFF",
          }}
        />
      )}
    </div>
  );
}

export default function A1cTrend() {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealId = useId();
  const baselineId = useId();
  const penRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<CareModel | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    let disposed = false;
    const pen = penRef.current;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      // Keep a still poster for people who prefer reduced motion.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      try {
        const { createCareModel } = await import("@/features/physician-care/components/helper/createCareModel");
        if (disposed || !hostRef.current) return;
        const model = await createCareModel(hostRef.current);
        if (disposed) { model.dispose(); return; }
        modelRef.current = model;
        model.update(progressRef.current);
        if (pen) pen.dataset.loaded = "true";
      } catch {
        // The pen poster stays visible when WebGL or the asset cannot load.
      }
    }, { rootMargin: "300px" });
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      disposed = true;
      observer.disconnect();
      modelRef.current?.dispose();
      modelRef.current = null;
      if (pen) delete pen.dataset.loaded;
    };
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(DESKTOP_MOTION, () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            end: "top 10%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            progressRef.current = tl.progress();
            modelRef.current?.update(progressRef.current);
          },
        });

        // Baseline first. Pause at the treatment boundary while the pen docks.
        tl.fromTo("[data-path-reveal]", { attr: { width: 0 } },
          { attr: { width: BEFORE_WIDTH }, duration: 0.28 }, 0);
        tl.fromTo("[data-before]", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.04);
        tl.fromTo(".a1c-pen", { opacity: 0, xPercent: 45, yPercent: -20, scale: 1.65 },
          { opacity: 1, xPercent: 0, yPercent: 0, scale: 1, duration: 0.24, ease: "power2.out" }, 0.3);
        tl.fromTo(".a1c-marker, [data-treatment]", { opacity: 0 },
          { opacity: 1, duration: 0.1 }, 0.52);
        tl.to("[data-path-reveal]", { attr: { width: VIEW_W }, duration: 0.3 }, 0.65);
        tl.fromTo("[data-after]", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.88);
        gsap.utils.toArray<SVGGElement>(".a1c-dot").forEach((dot, index) => {
          const time = index === 1 ? 0.08 : index === 0 ? 0.54 : 0.9;
          tl.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.08 }, time);
        });
        tl.to({}, { duration: 0.12 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-mobile-reveal="card" className="a1c-scroll relative w-full">
      <style>{`
        .a1c-scroll { min-height: 100svh; }
        .a1c-sticky { position: relative; min-height: 100svh; display: flex; align-items: center; }
        .a1c-content { width: 100%; }
        .a1c-marker { stroke-dasharray: 3 3; }
        .a1c-pen { position: absolute; left: calc(53.78% - 70px); top: calc(44% - 195px); width: 140px; height: 190px; transform-origin: 50% 100%; pointer-events: none; }
        .a1c-poster, .a1c-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
        .a1c-poster { object-fit: contain; }
        .a1c-canvas { opacity: 0; }
        .a1c-canvas canvas { display: block; width: 100%; height: 100%; }
        .a1c-pen[data-loaded="true"] .a1c-poster { opacity: 0; }
        .a1c-pen[data-loaded="true"] .a1c-canvas { opacity: 1; }
        .a1c-treatment { position: absolute; left: 53.78%; top: 44%; transform: translate(-50%, -100%); white-space: nowrap; text-align: center; font-size: 11px; color: #bfe4b4; }
        .a1c-phases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; color: #adb9b0; font-size: 12px; }
        .a1c-phases span:nth-child(2) { text-align: center; color: #bfe4b4; }
        .a1c-phases span:last-child { text-align: right; color: #83d875; }
        .a1c-card { transform: translate(-50%, -100%); transform-origin: 50% 100%; }
        @media (max-width: 1023px), (pointer: coarse), (prefers-reduced-motion: reduce) {
          .a1c-scroll { min-height: 0; }
          .a1c-sticky { min-height: 0; }
        }
        @media (max-height: 600px) {
          .a1c-content { gap: 16px; }
          .a1c-content [data-graph-chart] { max-height: 45svh; }
        }
        @media (max-width: 1023px) {
          .a1c-card { transform: translate(-50%, -100%) scale(0.85); }
          .a1c-pen { left: calc(53.78% - 48px); top: calc(44% - 145px); width: 96px; height: 136px; }
          .a1c-treatment { font-size: 9px; }
          .a1c-phases { font-size: 10px; gap: 6px; }
        }
      `}</style>

      <div className="a1c-sticky">
      <div className="a1c-content max-w-360 mx-auto px-5 flex flex-col gap-6 lg:gap-10 lg:px-10">
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
            Before treatment. A change in care. Progress over time.
          </p>
        </div>

        {/* Chart */}
        <div
          data-graph-chart
          className="relative w-full aspect-[1350/540] max-lg:aspect-[1350/850] mt-8"
        >
          <svg
            viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Illustrative A1c trend: 7.5 percent before medication, semaglutide introduced, then a gradual improvement to 6.0 percent at follow-up."
          >
            <defs>
              <clipPath id={baselineId} clipPathUnits="userSpaceOnUse">
                <rect x={VIEW_X} y={VIEW_Y} width={BEFORE_WIDTH} height={VIEW_H} />
              </clipPath>
              <clipPath id={revealId} clipPathUnits="userSpaceOnUse">
                <rect
                  data-path-reveal
                  x={VIEW_X}
                  y={VIEW_Y}
                  width={VIEW_W}
                  height={VIEW_H}
                />
              </clipPath>
              {FILTERS.map((f) => (
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

              <radialGradient
                id="a1c-dot-grad"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466)"
              >
                <stop offset="0.016" stopColor="#68AD75" />
                <stop offset="1" stopColor="#17622B" />
              </radialGradient>
            </defs>

            {/* Grid lines */}
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

            {/* A1c line — thick, green radial gradient */}
            <path
              d={LINE_PATH}
              stroke="#72CC60"
              strokeWidth="10.03"
              fill="none"
              strokeLinecap="round"
              clipPath={`url(#${revealId})`}
              className="a1c-line"
            />

            <g clipPath={`url(#${revealId})`}>
              <path d={LINE_PATH} stroke="#C3A078" strokeWidth="10.03" fill="none" strokeLinecap="round" clipPath={`url(#${baselineId})`} />
            </g>

            {/* Dashed event marker */}
            <line
              x1={MARKER.x}
              y1={MARKER.y1}
              x2={MARKER.x}
              y2={MARKER.y2}
              stroke="#3EAE1C"
              strokeWidth="2"
              className="a1c-marker"
            />

            {/* Dots */}
            {DOTS.map((d) => (
              <g key={d.filterId} className="a1c-dot">
                <ellipse
                  cx={d.cx}
                  cy={d.cy}
                  rx={13.4999}
                  ry={13.4999}
                  fill="#55C272"
                  filter={`url(#${d.filterId})`}
                />
                <ellipse
                  cx={d.cx}
                  cy={d.cy}
                  rx={10.4999}
                  ry={10.4999}
                  fill="url(#a1c-dot-grad)"
                />
              </g>
            ))}
          </svg>

          <div ref={penRef} className="a1c-pen" aria-hidden="true">
            <Image src="/models/care-pen.webp" alt="" width={720} height={960} sizes="(max-width: 1023px) 96px, 230px" className="a1c-poster" />
            <div ref={hostRef} className="a1c-canvas" />
          </div>
          <div data-treatment className="a1c-treatment">Semaglutide introduced</div>

          {/* Callout cards — absolute */}
          <div
            data-before
            className="a1c-card absolute"
            style={{ left: "10.11%", top: "51.10%" }}
          >
            <CalloutCard value="7.5%" tail />
          </div>
          <div
            data-after
            className="a1c-card absolute"
            style={{ left: "86.26%", top: "76.46%" }}
          >
            <CalloutCard value="6.0%" tail />
          </div>
        </div>
        <div className="a1c-phases">
          <span>01 / Before treatment</span>
          <span>02 / Medication introduced</span>
          <span data-after>03 / Improved follow-up</span>
        </div>
        <p className="text-[11px] text-white/45">Illustrative trend over time. Individual results vary.</p>
      </div>
      </div>
    </div>
  );
}
