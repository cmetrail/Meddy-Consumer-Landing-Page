"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { useHealthPlanHeroMotion } from "./useHealthPlanHeroMotion";
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
      <div className={styles.artworkLayer} data-plan-depth>
        <div className={styles.artworkLayer} data-plan-pointer>
          <Image src={`${ASSETS}/grid.svg`} alt="" width={810} height={1006} unoptimized className={styles.grid} />
          <Image src={`${ASSETS}/ellipse-a.png`} alt="" width={670} height={95} className={styles.ellipseA} />
          <Image src={`${ASSETS}/ellipse-b.svg`} alt="" width={669} height={83} unoptimized className={styles.ellipseB} />
          <div className={styles.portraitFrame}>
            <Image src={`${ASSETS}/photo.png`} alt="" width={1199} height={1495} preload sizes="(max-width: 767px) 440px, 813px" className={styles.portrait} />
          </div>
          <Image src={`${ASSETS}/dots.png`} alt="" width={412} height={269} unoptimized className={styles.dots} />
          <div className={styles.portraitFade} />
          {BADGES.map((badge) => (
            <div key={badge.label} className={`${styles.badge} ${badge.className}`} data-plan-badge>
              <div className={styles.badgeSurface} data-plan-float>
                <span className={styles.badgePhoto}>
                  <Image src={`${ASSETS}/${badge.image}`} alt="" width={1200} height={1200} sizes="57px" />
                </span>
                <span className={styles.badgeLabel}>{badge.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PersonalizedHealthPlansHeroSection() {
  const heroRef = useHealthPlanHeroMotion();
  return (
    <section ref={heroRef} id="personalized-health-plans-hero" className={styles.hero} aria-labelledby="health-plan-heading">
      <div className={styles.glow} data-plan-glow aria-hidden="true" />
      <div className={styles.header}><Header variant="dark" /></div>
      <div className={styles.content}>
        <div className={styles.copy} data-plan-copy>
          <h1 id="health-plan-heading" className={styles.heading}>
            <span className={styles.title} data-plan-line>A HEALTH PLAN BUILT</span>
            <span className={styles.serif} data-plan-line>around you.</span>
          </h1>
          <p className={styles.summary} data-plan-reveal>
            Your nutrition. Your Workouts. Your sleep. Your labs. Your medications.<br className={styles.desktopBreak} /> Your goals.
          </p>
          <p className={styles.description} data-plan-reveal>
            Meddy brings them together so your physician can build a plan around how<br className={styles.desktopBreak} /> you actually live—and adjust it as your health changes.
          </p>
          <div className={styles.ctaWrap} data-plan-reveal>
            <Link href="/book-consultation" className={styles.cta} data-plan-cta>
              <span className={styles.ctaShine} data-plan-shine aria-hidden="true" />
              <span className={styles.ctaLabel}>Build My Health Plan</span>
            </Link>
          </div>
        </div>
        <PortraitComposition />
      </div>
    </section>
  );
}
