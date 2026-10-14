"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import styles from "./PersonalizedHealthPlansHeroSection.module.css";

const ASSETS = "/personalized-health-plans/hero";
const BADGES = [
  { label: "Nutrition", image: "card-nutrition.jpg", className: styles.nutrition },
  { label: "Fitness", image: "card-fitness.jpg", className: styles.fitness },
  { label: "Labs", image: "card-labs.jpg", className: styles.labs },
  { label: "Sleep", image: "card-sleep.jpg", className: styles.sleep },
];

function PortraitComposition() {
  return (
    <div className={styles.composition} aria-hidden="true">
      <Image src={`${ASSETS}/grid.svg`} alt="" width={810} height={1006} unoptimized className={styles.grid} />
      <Image src={`${ASSETS}/ellipse-a.png`} alt="" width={670} height={95} className={styles.ellipseA} />
      <Image src={`${ASSETS}/ellipse-b.svg`} alt="" width={669} height={83} unoptimized className={styles.ellipseB} />
      <div className={styles.portraitFrame}>
        <Image src={`${ASSETS}/photo.png`} alt="" width={1199} height={1495} preload sizes="(max-width: 767px) 440px, 813px" className={styles.portrait} />
      </div>
      <Image src={`${ASSETS}/dots.png`} alt="" width={412} height={269} unoptimized className={styles.dots} />
      <div className={styles.portraitFade} />
      {BADGES.map((badge) => (
        <div key={badge.label} className={`${styles.badge} ${badge.className}`}>
          <span className={styles.badgePhoto}>
            <Image src={`${ASSETS}/${badge.image}`} alt="" width={1200} height={1200} sizes="57px" />
          </span>
          <span className={styles.badgeLabel}>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function PersonalizedHealthPlansHeroSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="personalized-health-plans-hero" className={styles.hero} aria-labelledby="health-plan-heading">
      <div className={styles.header}><Header variant="dark" /></div>
      <div className={styles.content}>
        <motion.div className={styles.copy}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <h1 id="health-plan-heading" className={styles.heading}>
            <span className={styles.title}>A HEALTH PLAN BUILT</span>
            <span className={styles.serif}>around you.</span>
          </h1>
          <p className={styles.summary}>
            Your nutrition. Your Workouts. Your sleep. Your labs. Your medications.<br className={styles.desktopBreak} /> Your goals.
          </p>
          <p className={styles.description}>
            Meddy brings them together so your physician can build a plan around how<br className={styles.desktopBreak} /> you actually live—and adjust it as your health changes.
          </p>
          <Link href="/book-consultation" className={styles.cta}>Build My Health Plan</Link>
        </motion.div>
        <PortraitComposition />
      </div>
    </section>
  );
}
