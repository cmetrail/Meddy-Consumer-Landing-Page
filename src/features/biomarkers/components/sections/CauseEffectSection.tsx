"use client";

import { useState } from "react";
import Image from "next/image";
import CauseEffectCard from "../helper/CauseEffectCard";
import { CAUSE_EFFECT_VARIATIONS } from "../helper/causeEffectVariations";
import styles from "./CauseEffectSection.module.css";

export default function CauseEffectSection() {
  const [activeId, setActiveId] = useState(CAUSE_EFFECT_VARIATIONS[0].id);
  const active = CAUSE_EFFECT_VARIATIONS.find((variation) => variation.id === activeId) ?? CAUSE_EFFECT_VARIATIONS[0];

  return (
    <section id="cause-effect" className={styles.section} aria-labelledby="cause-effect-title">
      <div className={styles.background}>
        <Image src="/biomarkers/cause-effect-bg.png" alt="" fill unoptimized sizes="(max-width: 1440px) 112vw, 1612px" className={styles.photo} />
      </div>
      <div className={styles.shade} />
      <div className={styles.content}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Cause &amp; Effect</p>
          <h2 id="cause-effect-title" className={styles.title}>
            Your biomarkers<br />
            changed.<br />
            <span className="comprehensive-serif">Understand why.</span>
          </h2>
          <p className={styles.description}>
            Meddy connects changes in your health with the things that happened before them.
          </p>
        </div>
        <div className={styles.panel}>
          <div className={styles.tabs} role="group" aria-label="Health factors">
            {CAUSE_EFFECT_VARIATIONS.map((variation) => (
              <button key={variation.id} type="button" data-ce-tab aria-pressed={variation.id === activeId} aria-controls="cause-effect-chart" onClick={() => setActiveId(variation.id)} className={styles.tab}>
                {variation.tab}
              </button>
            ))}
          </div>
          <div id="cause-effect-chart" className={styles.chart} aria-live="polite" aria-label={`${active.tab} biomarker changes`}>
            <CauseEffectCard variation={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
