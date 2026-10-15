"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import styles from "./HowItWorksTrackYourDaySection.module.css";

type Tab = { label: string; body: string; tags: string };
const TAB_INTERVAL_MS = 5000;

const TABS: Tab[] = [
  {
    label: "Nutrients",
    body: "Understand what you eat, monitor your nutrition, and build healthier eating habits.",
    tags: "Calories · Macros · Micronutrients · Hydration",
  },
  {
    label: "Fitness",
    body: "Track your training, exercise performance, and progress over time.",
    tags: "Workouts · Training load · Muscles trained · Heart rate zones",
  },
  {
    label: "Sleep",
    body: "Monitor your sleep patterns, duration, and quality to understand how well you're recovering overnight.",
    tags: "Duration · Efficiency · Sleep stages · Consistency",
  },
  {
    label: "Recovery",
    body: "Keep an eye on rest, readiness, and recovery so you know when to push harder or take it easier.",
    tags: "HRV · Resting heart rate · Readiness · Rest days",
  },
];

export default function HowItWorksTrackYourDaySection() {
  const [active, setActive] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.25 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const paused = hovered || focused;
  const current = TABS[active];

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!inView || paused || !pageVisible) return;
    // A fresh delay after each selection or pause gives every category time to be read.
    const timer = window.setTimeout(() => setActive(index => (index + 1) % TABS.length), TAB_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, inView, paused, pageVisible]);

  return (
    <section id="track-your-day" className={styles.section} aria-labelledby="track-your-day-heading">
      <div className={styles.backdrop}>
        <Image src="/how-it-works/track-your-day/track-day.png" alt="" fill sizes="(max-width: 767px) 1000px, 124vw" className={styles.photo} />
      </div>
      <div className={styles.content}>
        <h2 id="track-your-day-heading" className={styles.heading}>
          <span className={styles.serif}>Track</span><span>Your Day</span>
        </h2>
        <p className={styles.intro}>
          One place to understand your everyday health and wellness. Track the habits and activities that influence how you feel and perform throughout the day.
        </p>
        <div ref={cardRef} className={styles.card}
          onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <div className={styles.rail} aria-label="Daily health categories">
            {TABS.map((tab, index) => (
              <button key={tab.label} type="button" onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="daily-health-panel" className={`${styles.tab} ${active === index ? styles.active : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div id="daily-health-panel" className={styles.panel} aria-live={paused ? "polite" : "off"} aria-atomic="true">
            <h3 key={`${current.label}-title`} className={styles.panelTitle}>{current.label}</h3>
            <div key={`${current.label}-copy`} className={styles.panelCopy}>
              <p className={styles.body}>{current.body}</p>
              <p className={styles.tags}>{current.tags}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
