"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_MOTION } from "@/lib/motion";
import TrendOrbs from "./TrendOrbs";
import styles from "./LineTrend.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Marker = { x: number; y: number; green: boolean; week: number; label: string; value: string; width: number };
type Trend = {
  title: string; subtitle: string; whitePath: string; greenPath: string;
  markers: Marker[]; whiteLabel: string; greenLabel: string;
  whiteLabelX: number; whiteLabelY: number; greenLabelX: number; greenLabelY: number;
  headline: string; metrics: { label: string; change: string; range: string; green: boolean }[];
  description: string;
};

// Coordinates share one SVG space so callouts remain attached to their series at every size.
const risingDriver = "M8 137 C62 104 100 124 155 135 C225 161 260 156 312 107 C367 55 395 51 443 50 C510 47 551 65 610 73 C654 80 679 68 712 29";
const fallingOutcome = "M8 57 C35 42 62 61 95 72 C166 94 184 107 222 100 C272 91 287 65 336 58 C399 43 457 54 511 68 C583 98 630 137 681 166";

const trends: Record<"nutrition" | "fitness" | "sleep", Trend> = {
  nutrition: {
    title: "See how your nutrition affects your health.", subtitle: "Sodium Intake & Blood Pressure",
    whitePath: "M8 74 C50 99 108 72 163 55 C225 37 265 91 312 116 C366 147 417 139 483 128 C573 111 619 102 680 174",
    greenPath: "M8 76 C40 44 81 80 139 105 C221 143 258 112 303 88 C354 60 381 62 435 70 C536 85 625 121 680 188",
    markers: [
      { x: 51, y: 65.13, green: true, week: 1, label: "Sodium:", value: "3400 mg", width: 83 },
      { x: 205, y: 53.24, green: false, week: 1, label: "SBP:", value: "138", width: 63 },
      { x: 482, y: 78.75, green: true, week: 8, label: "Sodium:", value: "2400 mg", width: 83 },
      { x: 483, y: 128.0, green: false, week: 8, label: "SBP:", value: "130", width: 63 },
    ],
    whiteLabel: "Blood Pressure", greenLabel: "Sodium Intake", whiteLabelX: 199, whiteLabelY: 76, greenLabelX: 40, greenLabelY: 102,
    headline: "Lower sodium intake coincided with lower blood pressure.",
    metrics: [{ label: "Daily sodium", change: "−29%", range: "3,400 → 2,400 mg", green: true }, { label: "Systolic blood pressure", change: "−8 mmHg", range: "138 → 130 mmHg", green: false }],
    description: "Over 8 weeks, your average daily sodium intake fell 29% while systolic blood pressure decreased by 8 mmHg.",
  },
  fitness: {
    title: "See how your workouts affect your health.", subtitle: "Heart Rate Zone 3 Minutes & Body Weight",
    whitePath: fallingOutcome, greenPath: risingDriver,
    markers: [
      { x: 96, y: 72.31, green: false, week: 1, label: "Weight:", value: "185 lb", width: 62 },
      { x: 61, y: 119.11, green: true, week: 1, label: "HR ZONE 3:", value: "80 MIN", width: 107 },
      { x: 610, y: 73.0, green: true, week: 8, label: "HR ZONE 3:", value: "128 MIN", width: 110 },
      { x: 632, y: 135.5, green: false, week: 8, label: "Weight:", value: "170 lb", width: 62 },
    ],
    whiteLabel: "Body Weight", greenLabel: "Zone 3 Activity", whiteLabelX: 118, whiteLabelY: 74, greenLabelX: 68, greenLabelY: 138,
    headline: "More Zone 3 activity coincided with lower body weight.",
    metrics: [{ label: "Zone 3 activity", change: "+60%", range: "80 → 128 min", green: true }, { label: "Body weight", change: "−15 lb", range: "185 → 170 lb", green: false }],
    description: "Over 8 weeks, Zone 3 activity increased by 60%, while body weight decreased by 15 lb.",
  },
  sleep: {
    title: "See how your daily habits affect your sleep.", subtitle: "Caffeine Intake & Deep Sleep",
    whitePath: fallingOutcome, greenPath: risingDriver,
    markers: [
      { x: 61, y: 58.81, green: false, week: 1, label: "Deep Sleep:", value: "18%", width: 62 },
      { x: 74, y: 118.99, green: true, week: 1, label: "Caffeine:", value: "165 mg", width: 95 },
      { x: 610, y: 73.0, green: true, week: 4, label: "Caffeine:", value: "172 mg", width: 95 },
      { x: 623, y: 129.65, green: false, week: 4, label: "Deep Sleep:", value: "14%", width: 62 },
    ],
    whiteLabel: "Deep Sleep (KPI)", greenLabel: "Caffeine (Driver)", whiteLabelX: 113, whiteLabelY: 69, greenLabelX: 60, greenLabelY: 146,
    headline: "Higher caffeine intake coincided with less deep sleep.",
    metrics: [{ label: "Caffeine Intake", change: "+4%", range: "165 → 172 mg", green: true }, { label: "Deep Sleep (KPI)", change: "−4 pts", range: "18% → 14%", green: false }],
    description: "Over 4 weeks, caffeine intake increased by approximately 4%, while deep sleep decreased by 4 percentage points.",
  },
};

export default function LineTrend({ variant }: { variant: keyof typeof trends }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(SCROLL_MOTION, () => {
      const root = rootRef.current;
      if (!root) return;
      const mask = root.querySelector<SVGRectElement>("[data-graph-reveal]");
      const cards = Array.from(root.querySelectorAll<SVGElement | HTMLElement>("[data-reveal-x]"));
      // The mask, moving models, and cards all use the same reveal edge.
      const updateCards = () => {
        const edge = Number(mask?.getAttribute("width"));
        cards.forEach(card => {
          const x = Number(card.dataset.revealX);
          card.style.opacity = String(gsap.utils.clamp(0, 1, (edge - x) / 36));
        });
      };
      const observer = new MutationObserver(updateCards);
      if (mask) observer.observe(mask, { attributes: true, attributeFilter: ["width"] });
      gsap.set(cards, { opacity: 0 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          end: "top 10%",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      timeline.fromTo(mask, { attr: { width: 0 } }, {
        attr: { width: 720 }, duration: 1, ease: "none", lazy: false,
      });
      return () => {
        observer.disconnect();
        cards.forEach(card => card.style.removeProperty("opacity"));
      };
    });
    return () => media.revert();
  }, { scope: rootRef });
  const trend = trends[variant];
  const mobileMarkers = trend.markers.map((marker, index) => {
    // Spread the driver callouts across the mobile plot, as in the references.
    const positions = variant === "fitness"
      ? [{ x: 82, y: 67.23 }, { x: 185, y: 144.75 }, { x: 500, y: 52.45 }, { x: 610, y: 121.27 }]
      : variant === "sleep"
        ? [{ x: 61, y: 58.81 }, { x: 170, y: 140.26 }, { x: 520, y: 55.58 }, { x: 630, y: 134.2 }]
        : undefined;
    return { ...marker, ...positions?.[index] };
  });
  const id = useId().replace(/:/g, "");
  const refId = (name: string) => `${id}-${name}`;

  return (
    <div ref={rootRef} data-variant={variant} className={styles.scroll}>
      <div className={styles.sticky}>
        <div className={styles.content}>
          <header className={styles.heading}>
            <h3>{trend.title}</h3>
            <p>{trend.subtitle}</p>
          </header>
          <div className={styles.chart}>
            <svg viewBox="0 0 720 200" role="img" aria-labelledby={refId("title")}>
              <title id={refId("title")}>{`${trend.title}. ${trend.description}`}</title>
              <defs>
                <clipPath id={refId("reveal")}><rect data-graph-reveal x="0" y="0" width="720" height="200" /></clipPath>
                <linearGradient id={refId("line")} x1="0" x2="1">
                  <stop offset="0" stopColor="#17925a" stopOpacity="0" /><stop offset="0.13" stopColor="#278c4f" />
                  <stop offset="0.5" stopColor="#11935c" /><stop offset="0.84" stopColor="#398a51" /><stop offset="1" stopColor="#17925a" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id={refId("white")}><stop stopColor="#fff" stopOpacity="0" /><stop offset="0.13" stopColor="#fff" /><stop offset="0.85" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0.2" /></linearGradient>
                <radialGradient id={refId("dot")}><stop stopColor="#a1d18a" /><stop offset="0.5" stopColor="#68ad75" /><stop offset="1" stopColor="#17622b" /></radialGradient>
                <filter id={refId("glow")} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" /></filter>
              </defs>
              <g stroke="#e7e7e7" strokeOpacity="0.16" strokeWidth="0.6">
                {Array.from({ length: 11 }, (_, i) => <line key={i} x1="0" x2="720" y1={23 + i * 16.6} y2={23 + i * 16.6} />)}
              </g>
              <g clipPath={`url(#${refId("reveal")})`} fill="none" strokeLinecap="round">
                <path data-trend-path d={trend.whitePath} stroke={`url(#${refId("white")})`} strokeWidth="0.65" />
                <path data-trend-path d={trend.greenPath} stroke={`url(#${refId("line")})`} strokeWidth="5.2" />
              </g>
              {[trend.markers, mobileMarkers].map((markers, groupIndex) => (
                <g key={groupIndex} className={groupIndex === 0 ? styles.desktopMarkers : styles.mobileMarkers}>
                {markers.map((marker, index) => (
                <g key={index} data-marker={index} data-reveal-x={marker.x}>
                  <circle cx={marker.x} cy={marker.y} r={marker.green ? 9 : 5} fill={marker.green ? "#55c272" : "#fff"} opacity="0.65" filter={`url(#${refId("glow")})`} />
                  <circle cx={marker.x} cy={marker.y} r={marker.green ? 6.8 : 2.7} fill={marker.green ? `url(#${refId("dot")})` : "#fff"} />
                  <g transform={groupIndex === 1 ? `translate(${marker.x} ${marker.y}) scale(1.5) translate(${-marker.x} ${-marker.y})` : undefined}>
                  <path d={`M${marker.x - 7} ${marker.y - 16} L${marker.x} ${marker.y - 7} L${marker.x + 7} ${marker.y - 16}`} fill={marker.green ? "#1d4d32" : "#cad2ce"} />
                  <rect x={marker.x - marker.width / 2} y={marker.y - 41} width={marker.width} height="25" rx="2" fill={marker.green ? "#183225" : "#303b35"} stroke={marker.green ? "#17925a" : "#d4ddd7"} strokeWidth="0.65" />
                  <text x={marker.x - marker.width / 2 + 7} y={marker.y - 32} fill="#adadad" fontSize="6.3">Week {marker.week}</text>
                  <text x={marker.x - marker.width / 2 + 7} y={marker.y - 21} fill={marker.green ? "#17925a" : "#fff"} fontSize={marker.width > 90 ? 9 : 8}>
                    <tspan fontSize={marker.label === "SBP:" ? 8 : marker.green && marker.width > 90 ? undefined : 6} fontWeight={marker.label === "SBP:" ? 600 : undefined}>{marker.label} </tspan><tspan fontWeight="600">{marker.value}</tspan>
                  </text>
                  </g>
                </g>
              ))}
                </g>
              ))}
              <text data-reveal-x={trend.whiteLabelX} className={`${styles.seriesLabel} ${styles.whiteSeries}`} x={trend.whiteLabelX} y={trend.whiteLabelY} fill="#e7e7e7" fontSize="8.5">{trend.whiteLabel}</text>
              <text data-reveal-x={trend.greenLabelX} className={`${styles.seriesLabel} ${styles.greenSeries}`} x={trend.greenLabelX} y={trend.greenLabelY} fill="#17925a" fontSize="8.5">{trend.greenLabel}</text>
            </svg>
            <TrendOrbs />
            <div className={styles.chartMetrics}>
              {trend.metrics.map(metric => <div key={metric.label} data-reveal-x={metric.green ? 648 : 678} className={metric.green ? styles.driverMetric : styles.outcomeMetric}>
                <p className={styles.metricLabel}>{metric.label}</p>
                <p className={metric.green ? styles.green : styles.white}>{metric.change}</p>
                <p className={styles.range}>{metric.range}</p>
              </div>)}
            </div>
          </div>
          <div data-reveal-x="680" className={styles.summary}>
            <h4>{trend.headline}</h4>
            <div className={styles.metrics}>
              {trend.metrics.map(metric => <div key={metric.label}>
                <p className={styles.metricLabel}>{metric.label}</p>
                <p className={metric.green ? styles.green : styles.white}>{metric.change}</p>
                <p className={styles.range}>{metric.range}</p>
              </div>)}
            </div>
            <p className={styles.description}>{trend.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
