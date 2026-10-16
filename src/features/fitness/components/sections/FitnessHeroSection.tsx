"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { useFitnessHeroMotion } from "./useFitnessHeroMotion";
import styles from "./FitnessHeroSection.module.css";

export default function FitnessHeroSection() {
  const sectionRef = useFitnessHeroMotion();

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.navigation}>
        <Header variant="dark" />
      </div>
      <div className={styles.glow} data-fitness-glow aria-hidden="true" />
      <div className={styles.artwork} data-fitness-depth aria-hidden="true">
        <div className={styles.artworkLayer} data-fitness-pointer>
          <div className={styles.artworkLayer} data-fitness-reveal>
            <Image
              src="/fitness/fitness-hero-muscle-fb16b.png"
              alt=""
              width={2752}
              height={1536}
              priority
              unoptimized
              sizes="133vw"
              className={styles.muscle}
            />
          </div>
        </div>
      </div>
      <div className={styles.copy} data-fitness-copy>
        <h1 className={styles.headline}>
          {["SEE WHAT WORKOUTS", "ARE DOING TO YOUR", "BODY"].map((line) => (
            <span className={styles.lineMask} key={line}>
              <span data-fitness-line>{line}</span>
            </span>
          ))}
        </h1>
        <p className={styles.description} data-fitness-description>
          Track how you train, understand where you&apos;re improving, and get a
          physician built workout plan that adapts to your goals, preferences, and
          how your body responds.
        </p>
        <div className={styles.buttonReveal} data-fitness-cta>
          <button type="button" className={styles.button} data-fitness-button>
            <span className={styles.buttonShine} data-fitness-shine aria-hidden="true" />
            <span className={styles.buttonLabel}>Start Training</span>
          </button>
        </div>
      </div>
    </section>
  );
}
