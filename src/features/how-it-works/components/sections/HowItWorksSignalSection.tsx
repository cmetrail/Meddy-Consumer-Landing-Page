"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { MoveHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import styles from "./HowItWorksSignalSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const motionPreference = "(prefers-reduced-motion: reduce)";

function subscribeMotionPreference(onChange: () => void) {
  const media = window.matchMedia(motionPreference);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// Use the same initial snapshot on the server and during hydration.
function useReducedMotionPreference() {
  return useSyncExternalStore(subscribeMotionPreference, () => window.matchMedia(motionPreference).matches, () => false);
}

function AnimatedValue({ fiber, visible, reducedMotion }: { fiber: boolean; visible: boolean; reducedMotion: boolean }) {
  const value = useMotionValue(fiber ? 16 : 5200);
  const formatted = useTransform(value, latest => fiber ? `${Math.round(latest)}g` : Math.round(latest).toLocaleString("en-US"));

  useEffect(() => {
    if (reducedMotion) {
      value.set(fiber ? 32 : 9100);
      return;
    }
    if (!visible) return;
    const animation = animate(value, fiber ? 32 : 9100, { duration: 1.4, delay: fiber ? 0.25 : 0.45, ease });
    return () => animation.stop();
  }, [fiber, visible, reducedMotion, value]);

  return <motion.span aria-hidden="true">{reducedMotion ? (fiber ? "32g" : "9,100") : formatted}</motion.span>;
}

function ComparisonChart({ fiber, visible, reducedMotion }: { fiber: boolean; visible: boolean; reducedMotion: boolean }) {
  const delay = fiber ? 0.35 : 0.55;
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
      <motion.path d={`${path} L220 100 H0 Z`} fill={`url(#${fiber ? "signal-fiber-fill" : "signal-steps-fill"})`}
        initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: visible || reducedMotion ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay + 0.45 }} />
      <motion.path d={path} fill="none" stroke={fiber ? "#17b4ff" : "#ffffff"} strokeWidth="1"
        initial={{ pathLength: reducedMotion ? 1 : 0 }} animate={{ pathLength: visible || reducedMotion ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.4, delay: reducedMotion ? 0 : delay, ease }} />
      <motion.g initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: visible || reducedMotion ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : delay + 1.15 }}>
        <path d={`M219 ${fiber ? 12 : 20} V92`} stroke="white" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="219" cy={fiber ? 12 : 20} r="2.5" fill="white" />
      </motion.g>
    </svg>
  );
}

function ComparisonCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotionPreference();
  const visible = inView || reducedMotion;
  return (
    <motion.div ref={cardRef} className={`${styles.card} mobile-glass-card`}
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 32 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 32 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, ease }}>
      {[true, false].map(fiber => (
        <motion.div className={styles.metric} key={fiber ? "fiber" : "steps"}
          initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : fiber ? 0.15 : 0.3, ease }}>
          <p className={styles.label}>{fiber ? "Daily Fiber" : "Daily Steps"} <span className={fiber ? styles.signal : styles.noise}>({fiber ? "Signal" : "Noise"})</span></p>
          <p className={styles.value} aria-label={fiber ? "32 grams" : "9,100 steps"}><AnimatedValue fiber={fiber} visible={visible} reducedMotion={reducedMotion} /></p>
          <p className={styles.change}><TrendingUp /> from {fiber ? "16 g/day" : "5,200/day"}</p>
          <p className={styles.result}>{fiber ? "A1c improved from: 7.8% to 6.4%" : "A1c barely changed: 7.8% to 7.7%"}{fiber ? <TrendingDown /> : <MoveHorizontal className={styles.flat} />}</p>
          <ComparisonChart fiber={fiber} visible={visible} reducedMotion={reducedMotion} />
          <p className={styles.label}>{fiber ? "Daily Fiber" : "Daily Steps"} <TrendingUp /></p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function HowItWorksSignalSection() {
  const reducedMotion = useReducedMotionPreference();
  const reveal = {
    initial: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
    animate: reducedMotion ? { opacity: 1, y: 0 } : undefined,
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease },
  };
  const lineReveal = {
    variants: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
    transition: { duration: reducedMotion ? 0 : 0.7, ease },
  };
  return (
    <section data-story-chapter="signal" className={styles.section} aria-labelledby="signal-heading">
      <div data-story-photo className={styles.backdrop}>
        <Image src="/how-it-works/signal/bg.png" alt="" fill sizes="(min-width: 1024px) 120vw, 1605px" className={styles.photo} />
      </div>
      <div className={styles.fade} />
      <div className={styles.content}>
        <motion.h2 id="signal-heading" className={styles.heading}
          initial={reducedMotion ? "visible" : "hidden"} whileInView="visible" animate={reducedMotion ? "visible" : undefined}
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.13 } } }}>
          <motion.span className={styles.firstLine} {...lineReveal}>See what <em>matters</em> with</motion.span>
          <motion.span {...lineReveal}>less noise and more</motion.span>
          <motion.span {...lineReveal}>signal</motion.span>
        </motion.h2>
        <div className={styles.bottomRow}>
          <div><ComparisonCard /></div>
          <motion.p className={styles.description} {...reveal}>
            Complex data doesn&apos;t have to be confusing. You and your physician see what&apos;s really driving your numbers.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
