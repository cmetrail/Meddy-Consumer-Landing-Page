"use client";

import { useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import styles from "./MedicationTreatmentTimelineSection.module.css";

const milestones = [
  { label: "Baseline", date: "Jan 2026", month: "2026-01" },
  { label: "Dose increased", date: "Mar 2026", month: "2026-03" },
  { label: "Follow up", date: "Jul 2026", month: "2026-07" },
  { label: "Physician Review", date: "Oct 2026", month: "2026-10" },
];

export default function MedicationTreatmentTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const id = useId().replace(/:/g, "");

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      gsap.from(select("[data-treatment-heading]"), {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: root.querySelector("[data-treatment-timeline]"), start: "top 85%", once: true },
      });
      timeline.fromTo(select("[data-timeline-reveal]"), { attr: { width: 0 } }, { attr: { width: 1440 }, duration: 1.8, ease: "none" });
      select("[data-treatment-milestone]").forEach((milestone, index) => {
        timeline.from(milestone, { opacity: 0, duration: 0.4 }, [0.185, 0.729, 1.321, 1.703][index]);
      });
      const chart = root.querySelector("[data-treatment-chart]");
      const chartTimeline = gsap.timeline({ scrollTrigger: { trigger: chart, start: "top 90%", once: true } });
      chartTimeline.from(chart, { opacity: 0, y: 30, duration: 0.75 })
        .fromTo(select("[data-chart-reveal]"), { attr: { width: 0 } }, { attr: { width: 440 }, duration: 1.65, ease: "power1.inOut" }, 0.25)
        .from(select("[data-treatment-result]"), { opacity: 0, y: 10, duration: 0.5 }, 1.4);
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="medication-treatment-timeline" className={styles.section} aria-labelledby={`${id}-heading`}>
      <div className={styles.scene}>
        <h2 id={`${id}-heading`} className={styles.heading} data-treatment-heading>
          <span>See what happens</span>
          <em>when your treatment changes.</em>
        </h2>
        <p className={styles.question} data-treatment-heading>
          A medication changed<br /><em>What happened next?</em>
        </p>

        <div className={styles.timeline} data-treatment-timeline>
          <svg viewBox="0 0 1440 210" preserveAspectRatio="none" className={styles.timelineCurve} aria-hidden="true">
            <defs><clipPath id={`${id}-timeline-clip`}><rect data-timeline-reveal width="1440" height="210" /></clipPath></defs>
            <g clipPath={`url(#${id}-timeline-clip)`} fill="none" stroke="#6e7a72" strokeWidth="1" strokeDasharray="7 7" vectorEffect="non-scaling-stroke">
              <path className={styles.desktopCurve} d="M0 173 C48 150 98 124 148 104 C300 44 455 4 583 21 C760 40 795 120 1057 124 C1180 128 1266 107 1362 59 C1390 45 1416 28 1440 16" vectorEffect="non-scaling-stroke" />
              <path className={styles.mobileCurve} d="M0 173 C60 150 120 124 187.2 104 C310 55 410 4 532.8 21 C660 40 715 120 878.4 124 C1010 128 1120 107 1209.6 59 C1300 15 1380 0 1440 -15" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
          <ol className={styles.milestones} aria-label="Treatment timeline">
            {milestones.map((milestone) => (
              <li key={milestone.month} className={styles.milestone} data-treatment-milestone>
                <span className={styles.dot} aria-hidden="true" />
                <span>{milestone.label}</span>
                <time dateTime={milestone.month}>{milestone.date}</time>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.card} data-treatment-chart>
          <div className={styles.metrics}>
            <div><span>Baseline</span><strong>6.4 %</strong></div>
            <div><span>12 weeks follow up</span><strong>5.9 %</strong></div>
          </div>
          <p className={styles.result} data-treatment-result><span aria-hidden="true">↓</span> A1C</p>
          <svg className={styles.chart} viewBox="0 0 440 140" preserveAspectRatio="none" role="img" aria-label="Illustrative A1C trend decreasing from a baseline of 6.4 percent to 5.9 percent at 12 weeks.">
            <defs>
              <linearGradient id={`${id}-baseline-fill`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#e3f0df" stopOpacity=".8" /><stop offset="1" stopColor="#e3f0df" stopOpacity="0" /></linearGradient>
              <linearGradient id={`${id}-response-fill`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#56d2ff" /><stop offset="1" stopColor="#56d2ff" stopOpacity="0" /></linearGradient>
              <clipPath id={`${id}-chart-clip`}><rect data-chart-reveal width="440" height="140" /></clipPath>
            </defs>
            <g clipPath={`url(#${id}-chart-clip)`}>
              <path d="M0 36 C8 10 9 24 18 17 S31 8 36 39 S47 81 57 54 S75 41 81 53 S92 60 106 64 S126 56 139 78 S159 101 179 99 S201 99 212 105 L212 140 H0Z" fill={`url(#${id}-baseline-fill)`} />
              <path d="M0 36 C8 10 9 24 18 17 S31 8 36 39 S47 81 57 54 S75 41 81 53 S92 60 106 64 S126 56 139 78 S159 101 179 99 S201 99 212 105" fill="none" stroke="#fffef2" strokeWidth="1.5" />
              <path d="M212 105 C236 115 244 118 258 115 S274 120 286 124 S321 125 350 125 S382 126 400 129 S423 130 440 130 V140 H212Z" fill={`url(#${id}-response-fill)`} />
              <path d="M212 105 C236 115 244 118 258 115 S274 120 286 124 S321 125 350 125 S382 126 400 129 S423 130 440 130" fill="none" stroke="#00a9ed" strokeWidth="1.5" />
              <path d="M212 30 V80" stroke="#fffef2" strokeDasharray="3 2" /><circle cx="212" cy="30" r="3.5" fill="#fffef2" />
            </g>
          </svg>
          <div className={styles.axis}><span>Baseline</span><span>12 weeks follow up</span></div>
        </div>
        <p className={styles.note}>Compare medication changes with the health measures they&apos;re<br className={styles.desktopBreak} /> intended to improve.</p>
      </div>
    </section>
  );
}
