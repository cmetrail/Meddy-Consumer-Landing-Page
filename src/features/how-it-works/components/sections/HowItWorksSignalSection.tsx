"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MoveHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import styles from "./HowItWorksSignalSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

function ComparisonChart({ fiber }: { fiber: boolean }) {
  const path = fiber
    ? "M0 77 C18 48 29 66 45 65 S65 57 73 43 S92 32 103 38 S124 44 131 29 S144 21 153 25 S171 31 178 19 S188 7 200 12 S214 15 220 12"
    : "M0 88 C17 92 37 86 48 72 S69 65 85 63 S102 48 121 51 S145 57 154 39 S179 28 193 31 S205 19 220 20";
  return (
    <svg className={styles.chart} viewBox="0 0 220 100" role="img" aria-label={fiber ? "Daily fiber increased from 16 to 32 grams" : "Daily steps increased from 5,200 to 9,100"}>
      <defs>
        <linearGradient id={fiber ? "signal-fiber-fill" : "signal-steps-fill"} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={fiber ? "#58c5ff" : "#ffffff"} stopOpacity={fiber ? ".95" : ".15"} />
          <stop offset="100%" stopColor={fiber ? "#58c5ff" : "#ffffff"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L220 100 H0 Z`} fill={`url(#${fiber ? "signal-fiber-fill" : "signal-steps-fill"})`} />
      <path d={path} fill="none" stroke={fiber ? "#17b4ff" : "#ffffff"} strokeWidth="1" />
      <path d={`M219 ${fiber ? 12 : 20} V92`} stroke="white" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="219" cy={fiber ? 12 : 20} r="2.5" fill="white" />
    </svg>
  );
}

function ComparisonCard() {
  return (
    <div className={`${styles.card} mobile-glass-card`}>
      {[true, false].map(fiber => (
        <div className={styles.metric} key={fiber ? "fiber" : "steps"}>
          <p className={styles.label}>{fiber ? "Daily Fiber" : "Daily Steps"} <span className={fiber ? styles.signal : styles.noise}>({fiber ? "Signal" : "Noise"})</span></p>
          <p className={styles.value}>{fiber ? "32g" : "9,100"}</p>
          <p className={styles.change}><TrendingUp /> from {fiber ? "16 g/day" : "5,200/day"}</p>
          <p className={styles.result}>{fiber ? "A1c improved from: 7.8% to 6.4%" : "A1c barely changed: 7.8% to 7.7%"}{fiber ? <TrendingDown /> : <MoveHorizontal className={styles.flat} />}</p>
          <ComparisonChart fiber={fiber} />
          <p className={styles.label}>{fiber ? "Daily Fiber" : "Daily Steps"} <TrendingUp /></p>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorksSignalSection() {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease },
  };
  return (
    <section className={styles.section} aria-labelledby="signal-heading">
      <div className={styles.backdrop}>
        <Image src="/how-it-works/signal/bg.png" alt="" fill sizes="(min-width: 1024px) 120vw, 1605px" className={styles.photo} />
      </div>
      <div className={styles.fade} />
      <div className={styles.content}>
        <motion.h2 id="signal-heading" className={styles.heading} {...reveal}>
          <span className={styles.firstLine}>See what <em>matters</em> with</span>
          <span>less noise and more</span>
          <span>signal</span>
        </motion.h2>
        <div className={styles.bottomRow}>
          <motion.div {...reveal}><ComparisonCard /></motion.div>
          <motion.p className={styles.description} {...reveal}>
            Complex data doesn&apos;t have to be confusing. You and your physician see what&apos;s really driving your numbers.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
