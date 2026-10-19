"use client";

import { Fragment } from "react";
import Image from "next/image";
import styles from "./WeightLossProgressSection.module.css";
import { useWeightLossProgressMotion } from "./useWeightLossProgressMotion";

const ASSETS = "/weight-loss/progress";
const LEGEND = ["Calories", "Total Steps", "Total Workout Time", "Sleep Duration", "Insulin"];

// Figma's 730.994 x 428.533 plot scales as one composition, preserving alignment.
const MILESTONES = [
  { week: 0, weight: 214, x: 0, y: 0, captionX: 11.5, captionWidth: 91.953, title: "STARTING POINT", description: "Build better habits", crop: "start" },
  { week: 4, weight: 207, x: 163.09, y: 45.69, captionX: 211.09, captionWidth: 145.158, title: "-7 LBS", description: "Early progress from nutrition and activity changes." },
  { week: 8, weight: 201, x: 407.14, y: 117.98, captionX: 435.47, captionWidth: 108.145, title: "-13 LBS", description: "Steady progress with consistent health." },
  { week: 16, weight: 194, x: 619.38, y: 204.15, captionX: 640.2, captionWidth: 87.326, title: "-20 LBS", description: "A healthier more sustainable you.", crop: "end" },
] as const;

export default function WeightLossProgressSection() {
  const sectionRef = useWeightLossProgressMotion();
  return (
    <section ref={sectionRef} id="weight-loss-progress" aria-labelledby="weight-loss-progress-title" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 id="weight-loss-progress-title" className={styles.title}>
            <span className={styles.lineMask}><span data-progress-line>Know whether you&rsquo;re actually</span></span>
            <span className={styles.lineMask}><em data-progress-line className="comprehensive-serif">making progress.</em></span>
          </h2>
          <div data-progress-intro className={styles.intro}>
            <p className={styles.subtitle}>Look beyond today&rsquo;s<br />number on the scale.</p>
            <p className={styles.description}>See your weight, energy balance, activity, and metabolic markers change over weeks and months&mdash;not just day to day.</p>
          </div>
        </div>
        <div data-progress-plot className={styles.plot} role="group" aria-label="Weight progress over 16 weeks, from 214 to 194 pounds">
          <div className={styles.plotCanvas}>
            <Image data-progress-curve className={styles.curve} src={`${ASSETS}/milestone-curve.svg`} width={682.415} height={306.721} alt="" unoptimized />
            {MILESTONES.map((milestone) => (
              <Fragment key={milestone.week}>
                <div data-progress-card className={styles.card} style={{ left: milestone.x, top: milestone.y }}>
                  <figure data-progress-surface className={styles.cardSurface}>
                    <div className={styles.photo}>
                      <Image src={`${ASSETS}/week-${milestone.week}.png`} alt={`Week ${milestone.week} of the weight loss journey`} width={101} height={94} className={`${styles.photoImage} ${"crop" in milestone ? styles[milestone.crop] : ""}`} />
                    </div>
                    <figcaption className={styles.cardLabel}>
                      <span>Week {milestone.week}</span><span>{milestone.weight} LBS</span>
                    </figcaption>
                    <span data-progress-shine aria-hidden="true" className={styles.shine} />
                  </figure>
                </div>
                <div data-progress-caption className={styles.milestone} style={{ left: milestone.captionX, width: milestone.captionWidth }}>
                  <p>{milestone.title}</p><p>{milestone.description}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div data-progress-footer className={styles.footer}>
          <div className={styles.alongside}>
            <h3>What changed alongside?</h3>
            <ul className={styles.legend}>
              {LEGEND.map((label, index) => (
                <li key={label}>
                  {index > 0 && <Image src={`${ASSETS}/milestone-bullet.svg`} width={8} height={8} alt="" unoptimized />}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.calories}>
            <p>Calories</p>
            <p className={styles.values} aria-label="2,300 to 1,950 calories per day">
              <span data-progress-number="2300" aria-hidden="true">2,300</span>
              <Image data-progress-arrow src={`${ASSETS}/milestone-arrow.svg`} width={48} height={48} alt="" unoptimized />
              <span data-progress-number="1950" aria-hidden="true">1,950</span>
            </p>
            <p className={styles.calorieNote}>Kcal/day across the same 16 weeks</p>
          </div>
        </div>
      </div>
    </section>
  );
}
