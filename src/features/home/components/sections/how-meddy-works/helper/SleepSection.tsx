"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./SleepSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STAGES = [
  { label: "Awake", percentage: 20, color: "#E3F9FF" },
  { label: "Light", percentage: 30, color: "#4DC1FF" },
  { label: "Deep", percentage: 15, color: "#A953FF" },
  { label: "REM", percentage: 35, color: "#FF4BA2" },
];

function SleepArchitectureCard() {
  return (
    <div className={`${styles.glassCard} ${styles.architectureCard}`}>
      <p className={styles.cardTitle}>Sleep Architecture</p>
      <div className={styles.days} aria-label="Weekly sleep overview">
        {["Week", "Mon", "Tue", "Wed", "Thu"].map((day, i) => (
          <span key={day} className={i === 0 ? styles.selectedDay : undefined}>{day}</span>
        ))}
      </div>
      <div className={styles.stageBar} aria-label="Awake 20%, Light 30%, Deep 15%, REM 35%">
        {STAGES.map(stage => (
          <div key={stage.label} style={{ flex: stage.percentage }}>
            <div style={{ background: stage.color }} />
            <span>{stage.percentage}%</span>
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        {STAGES.map(stage => (
          <span key={stage.label}><i style={{ background: stage.color }} />{stage.label}</span>
        ))}
      </div>
    </div>
  );
}

const NIGHT_STAGES = [
  { label: "Awake", color: "#E09A2A", value: "13m · 27%" },
  { label: "Light", color: "#148BD5", value: "3h 15m · 49%" },
  { label: "Deep", color: "#C084FC", value: "1h 15m · 10%" },
  { label: "REM", color: "#FF7043", value: "1h 07m · 5%" },
];

// Horizontal segments represent the sleep stages through the night.
const NIGHT_SEGMENTS = [
  [0, 16, 38], [16, 33, 58], [33, 42, 78], [42, 45, 24],
  [45, 65, 38], [65, 79, 58], [79, 88, 78], [88, 112, 38],
  [112, 123, 78], [123, 125, 19], [125, 142, 38],
  [142, 150, 58], [150, 162, 78], [162, 168, 38],
];

function SleepNightCard() {
  return (
    <div className={`${styles.glassCard} ${styles.nightCard}`}>
      <p className={styles.cardTitle}>Sleep Architecture</p>
      <p className={styles.timeLabel}>Time asleep</p>
      <p className={styles.timeValue}>5h 50m</p>
      <svg className={styles.nightChart} viewBox="0 0 201 115" role="img" aria-label="Sleep stages from 11 PM to 6 AM">
        {[24, 44, 64, 84].map(y => <path key={y} d={`M25 ${y}H195`} stroke="white" strokeOpacity=".035" />)}
        {NIGHT_SEGMENTS.map(([start, end, y], i) => {
          const color = y < 30 ? "#E09A2A" : y === 38 ? "#148BD5" : y === 58 ? "#C084FC" : "#FF7043";
          return <g key={start}>
            {i > 0 && <path d={`M${25 + start} ${NIGHT_SEGMENTS[i - 1][2]}V${y}`} stroke={color} strokeWidth=".6" />}
            <path d={`M${25 + start} ${y}H${25 + end}`} stroke={color} strokeWidth="6" />
          </g>;
        })}
        {["11 PM", "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM"].map((time, i) => (
          <text key={time} x={25 + i * 24} y="105" fill="#9CA29D" fontSize="5" textAnchor="middle">{time}</text>
        ))}
      </svg>
      <div className={styles.bedtime}><span>Bedtime 10:45 PM</span><span>Wake 4:35 AM</span></div>
      <div className={styles.nightLegend}>
        {NIGHT_STAGES.map(stage => (
          <div key={stage.label}><span><i style={{ background: stage.color }} />{stage.label}</span><span>{stage.value}</span></div>
        ))}
      </div>
    </div>
  );
}

export default function SleepSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => desktopMotion(() => {
    const root = sectionRef.current;
    if (!root) return;
    const image = root.querySelector("[data-feature-image]");
    if (image) gsap.fromTo(image, { opacity: 0, x: 40 }, {
      opacity: 1, x: 0, ease: "none",
      scrollTrigger: { trigger: image, start: "top 92%", end: "top 55%", scrub: true },
    });
    gsap.utils.toArray<HTMLElement>("[data-feature-card]", root).forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, ease: "none",
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 60%", scrub: true },
      });
    });
  }), { scope: sectionRef });

  return (
    <div id="sleep-monitoring" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <div className={styles.copy}>
          <h3>Sleep<br />monitoring</h3>
          <p className={styles.headline}>Track your sleep. See how<br className={styles.desktopBreak} /> it affects</p>
          <p className={styles.accent}>Your recovery, performance<br className={styles.desktopBreak} /> and health.</p>
          <p className={styles.description}>Scores your sleep. Never connects it to your<br className={styles.desktopBreak} /> training load, caloric deficit, or HRV dip.</p>
        </div>
        <div data-feature-image data-mobile-direction="from-right" className={styles.visual}>
          <Image src="/home/sleep-photo.png" alt="Woman holding a pillow" width={736} height={981} sizes="(min-width: 1024px) min(63svh, 40vw, 704px), (min-width: 600px) 440px, 75vw" className={styles.photo} />
          <div className={styles.fade} />
          <div data-feature-card className={styles.architecture}><SleepArchitectureCard /></div>
          <div data-feature-card className={styles.night}><SleepNightCard /></div>
        </div>
      </div>
    </div>
  );
}
