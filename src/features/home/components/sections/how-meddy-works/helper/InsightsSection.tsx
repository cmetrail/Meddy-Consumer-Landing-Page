"use client";

import { useRef } from "react";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./InsightsSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function NetCaloriesCard() {
  return (
    <div className={`${styles.glassCard} ${styles.caloriesCard}`}>
      <p className={styles.cardLabel}>Net Calories</p>
      <div className={styles.netValue}>
        <p>1130 <span>kcal</span></p>
        <span className={styles.down}><TrendingDown size={9} /> −15%</span>
      </div>
      <div className={styles.calorieDetails}>
        {[
          { label: "Calories Intake", value: "1980", trend: "+20%", up: true },
          { label: "Calories Burn", value: "850", trend: "−8%", up: false },
        ].map((item) => (
          <div key={item.label}>
            <p className={styles.cardLabel}>{item.label}</p>
            <div className={styles.detailValue}>
              <p>{item.value} <span>kcal</span></p>
              <span className={item.up ? styles.up : styles.down}>
                {item.up ? <TrendingUp size={8} /> : <TrendingDown size={8} />}{item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function A1cTrendCard() {
  return (
    <div className={`${styles.glassCard} ${styles.trendCard}`}>
      <p className={styles.chartTitle}>A1c Trend</p>
      <svg viewBox="0 0 244 194" className={styles.chart} role="img" aria-label="A1c decreasing from 8.2% to 5.2% over twelve months, with an average of 6.6%.">
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <text x="0" y={12 + i * 20}>{16 - i * 2}%</text>
            <line x1="27" x2="237" y1={8 + i * 20} y2={8 + i * 20} stroke="#ffffff55" strokeWidth="0.6" />
          </g>
        ))}
        <line x1="27" x2="237" y1="104" y2="104" stroke="#e6a316" strokeDasharray="4 3" strokeWidth="1" />
        <path d="M29 87 L47 92 L64 94 L82 99 L99 103 L117 105 L135 109 L153 111 L171 113 L189 115 L207 117 L237 119" fill="none" stroke="#f5af11" strokeWidth="2" />
        {[[29,87], [64,94], [82,99], [99,103], [163,112], [197,116]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="2.3" fill="#ffbf23" />)}
        <rect x="27" y="98" width="47" height="16" rx="3" fill="#e9a611" />
        <text x="33" y="109" className={styles.average}>Avg: 6.6%</text>
        <rect x="174" y="73" width="72" height="32" rx="6" fill="#f7f7f7" />
        <text x="181" y="85">KPI</text>
        <circle cx="183" cy="95" r="3" fill="#e6a316" />
        <text x="190" y="98" className={styles.average}>A1c: 6.2%</text>
        {"JFMAMJJASOND".split("").map((month, i) => (
          <g key={i}>
            <line x1={33 + i * 18} x2={33 + i * 18} y1="174" y2="180" stroke="#ffffff66" strokeWidth="0.6" />
            <text x={33 + i * 18} y="190" textAnchor="middle">{month}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(() => desktopMotion(() => {
    const root = sectionRef.current;
    if (!root) return;
    gsap.utils.toArray<HTMLElement>("[data-feature-image], [data-feature-line], [data-feature-card]", root).forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: el, start: "top 92%", end: "top 60%", scrub: true },
      });
    });
  }), { scope: sectionRef });

  return (
    <section ref={sectionRef} id="health-insights" className={styles.section} aria-labelledby="health-insights-title">
      <div className={styles.content}>
        <span className={styles.number} aria-hidden="true">04</span>
        <div data-feature-image className={styles.visual}>
          <Image src="/home/heart.png" alt="Anatomical heart illustrating health insights" width={441} height={670} sizes="(max-width: 599px) 80vw, 441px" className={styles.heart} />
          <div data-feature-card className={styles.calories}><NetCaloriesCard /></div>
          <div data-feature-card className={styles.trend}><A1cTrendCard /></div>
        </div>
        <div className={styles.copy}>
          <h3 data-feature-line id="health-insights-title">Health Insights</h3>
          <p data-feature-line className={styles.headline}>Know what&apos;s actually</p>
          <p data-feature-line className={styles.accent}>moving your health.</p>
          <p data-feature-line className={styles.description}>See how changes affect your results — and which habits are driving them.</p>
        </div>
      </div>
    </section>
  );
}
