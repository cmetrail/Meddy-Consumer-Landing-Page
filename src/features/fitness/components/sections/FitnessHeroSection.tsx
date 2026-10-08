import Image from "next/image";
import Header from "@/components/Header";
import styles from "./FitnessHeroSection.module.css";

export default function FitnessHeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.navigation}>
        <Header variant="dark" active="Fitness" />
      </div>
      <div className={styles.artwork} aria-hidden="true">
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
      <div className={styles.copy}>
        <h1 className={styles.headline}>
          <span>SEE WHAT WORKOUTS</span>
          <span>ARE DOING TO YOUR</span>
          <span>BODY</span>
        </h1>
        <p className={styles.description}>
          Track how you train, understand where you&apos;re improving, and get a
          physician built workout plan that adapts to your goals, preferences, and
          how your body responds.
        </p>
        <button type="button" className={styles.button}>Start Training</button>
      </div>
    </section>
  );
}
