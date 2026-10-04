"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import type { CareModel } from "@/features/physician-care/components/helper/createCareModel";
import styles from "./MedicationTreatmentChangesSection.module.css";

const chapters = [
  { label: "01 / BEFORE TREATMENT", title: "Start with the before.", text: "A baseline gives your physician a clear starting point: what to follow, and what your treatment is intended to improve." },
  { label: "02 / MEDICATION INTRODUCED", title: "A new chapter in your care.", text: "Medication becomes part of your physician-guided plan. Marking the start connects your treatment to the health measures you follow." },
  { label: "03 / FOLLOW THE RESPONSE", title: "See what changes over time.", text: "Compare your baseline with follow-up results over the following weeks, so your physician can review how you respond." },
];

export default function MedicationTreatmentChangesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const penRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current!;
    const pen = penRef.current!;
    const host = hostRef.current!;
    const media = gsap.matchMedia();
    media.add("(min-height: 800px) and (prefers-reduced-motion: no-preference)", () => {
      let disposed = false;
      let model: CareModel | undefined;
      let progress = 0;
      let started = false;
      root.dataset.animated = "true";
      root.dataset.stage = "0";
      const select = gsap.utils.selector(root);
      const response = root.querySelector<SVGPathElement>("[data-response]")!;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
        onUpdate: () => {
          progress = timeline.progress();
          root.dataset.stage = progress < 0.22 ? "0" : progress < 0.6 ? "1" : "2";
          model?.update(progress);
        },
      });
      timeline
        .set(pen, { opacity: 0, left: "56%", top: -36, width: 240, height: 330 })
        .set(response, { strokeDasharray: 1, strokeDashoffset: 1 })
        .set(select("[data-after], [data-start], [data-connector]"), { opacity: 0 })
        .to({}, { duration: 0.2 })
        .to(pen, { opacity: 1, duration: 0.13 })
        .to(pen, { left: "calc(38% - 60px)", top: -36, width: 120, height: 140, duration: 0.25, ease: "power2.inOut" })
        .to(select("[data-start], [data-connector]"), { opacity: 1, duration: 0.08 })
        .to(response, { strokeDashoffset: 0, duration: 0.25, ease: "none" })
        .to(select("[data-after]"), { opacity: 1, duration: 0.09 });
      const observer = new IntersectionObserver(async ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        try {
          const { createCareModel } = await import("@/features/physician-care/components/helper/createCareModel");
          if (disposed) return;
          const loaded = await createCareModel(host);
          if (disposed) { loaded.dispose(); return; }
          model = loaded;
          model.update(progress);
          pen.dataset.loaded = "true";
        } catch {
          // The poster follows the same transition if WebGL is unavailable.
        }
      }, { rootMargin: "400px" });
      observer.observe(root);
      return () => {
        disposed = true;
        observer.disconnect();
        timeline.scrollTrigger?.kill();
        timeline.revert();
        model?.dispose();
        delete pen.dataset.loaded;
        delete root.dataset.animated;
        delete root.dataset.stage;
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section id="treatment" ref={rootRef} className={styles.section} aria-labelledby="treatment-heading">
      <div className={styles.scene}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>TREATMENT, WITH A POINT OF REFERENCE</p>
          <h2 id="treatment-heading">A medication starts.<br /><em>What happens next?</em></h2>
          <p>Connect the treatment to the change you&apos;re following.</p>
        </header>
        <div className={styles.story}>
          <div className={styles.chapters}>
            {chapters.map((chapter, index) => (
              <div key={chapter.label} className={styles.chapter} data-chapter={index}>
                <p className={styles.eyebrow}>{chapter.label}</p>
                <h3>{chapter.title}</h3><p>{chapter.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.metrics}>
            <div><span>Baseline A1c</span><strong>6.4<span>%</span></strong><small>Before medication</small></div>
            <div data-after><span>12-week follow-up</span><strong>5.9<span>%</span></strong><small>A response to review</small></div>
          </div>
        </div>
        <div className={styles.chart}>
          <div className={styles.chartTitle}><span>A1c · Illustrative journey</span><span>Measured over time</span></div>
          <div className={styles.plot}>
            <svg viewBox="0 0 1000 340" preserveAspectRatio="none" role="img" aria-label="Illustrative A1c trend: baseline 6.4 percent, medication started, then a gradual decline to 5.9 percent at the 12-week follow-up.">
              <defs><linearGradient id="medication-response-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#83c080" stopOpacity="0.25" /><stop offset="100%" stopColor="#83c080" stopOpacity="0" /></linearGradient></defs>
              {[70, 130, 190, 250, 310].map(y => <line key={y} x1="35" x2="965" y1={y} y2={y} stroke="#46524b" strokeOpacity="0.09" />)}
              <rect x="35" y="225" width="930" height="50" rx="8" fill="#83c080" fillOpacity="0.12" />
              <path d="M35 144 C80 128 105 152 150 136 S210 148 250 129 S330 140 380 130" fill="none" stroke="#b69769" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              <path data-after d="M380 130 C440 133 465 160 510 177 S575 195 620 207 S700 227 755 237 S850 253 940 250 L940 310 L380 310 Z" fill="url(#medication-response-fill)" />
              <path data-response pathLength="1" d="M380 130 C440 133 465 160 510 177 S575 195 620 207 S700 227 755 237 S850 253 940 250" fill="none" stroke="#17925a" strokeWidth="4" vectorEffect="non-scaling-stroke" />
              <g data-start><line x1="380" x2="380" y1="130" y2="310" stroke="#6e7a72" strokeDasharray="4 6" /><circle cx="380" cy="130" r="7" fill="#17925a" stroke="#fffef2" strokeWidth="4" /></g>
              <line data-connector x1="380" x2="380" y1="65" y2="118" stroke="#17925a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <circle data-after cx="940" cy="250" r="7" fill="#17925a" stroke="#fffef2" strokeWidth="4" />
            </svg>
            <div ref={penRef} className={styles.pen} aria-hidden="true">
              <Image src="/models/care-pen.webp" alt="" width={720} height={960} sizes="240px" className={styles.poster} />
              <div ref={hostRef} className={styles.canvas} />
            </div>
            <span data-start className={styles.startLabel}>Medication started<span>Week 0</span></span>
            <span className={styles.bandLabel}>Intended direction</span>
          </div>
          <div className={styles.axis}><span>Before treatment</span><span data-after>12 weeks after</span></div>
        </div>
        <footer className={styles.footer}><span>Illustrative example. Individual responses vary. Your physician reviews results alongside your wider care plan.</span><span className={styles.scrollHint}>SCROLL TO FOLLOW THE CHANGE ↓</span></footer>
      </div>
    </section>
  );
}
