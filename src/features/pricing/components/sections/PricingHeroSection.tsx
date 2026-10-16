"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { usePricingHeroMotion } from "./usePricingHeroMotion";
import styles from "./PricingHeroSection.module.css";

function Portrait({ src }: { src: string }) {
  return (
    <span className={styles.portrait} data-pricing-portrait>
      <span className={styles.portraitFloat} data-pricing-float>
        <Image src={src} alt="" width={98} height={70}
          sizes="(max-width: 767px) 23vw, 98px" className={styles.portraitImage} data-pricing-portrait-image />
      </span>
    </span>
  );
}

export default function PricingHeroSection() {
  const sectionRef = usePricingHeroMotion();
  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.header}><Header /></div>
      <h1 className={styles.headline} aria-label="Choose the level of support that’s right for you">
        <span className={styles.row} aria-hidden="true">
          <span className={styles.textMask}><span data-pricing-word>Choose</span></span>
          <Portrait src="/pricing/hero/squiggle-1.png" />
          <span className={styles.textMask}><span data-pricing-word>The level of</span></span>
        </span>
        <span className={styles.row} aria-hidden="true">
          <span className={`${styles.textMask} ${styles.support}`}><span data-pricing-word>Support</span></span>
          <Portrait src="/pricing/hero/squiggle-2.png" />
          <span className={styles.textMask}><span data-pricing-word>That’s right</span></span>
        </span>
        <span className={`${styles.row} ${styles.lastRow}`} aria-hidden="true">
          <Portrait src="/pricing/hero/squiggle-3.png" />
          <span className={styles.textMask}><span data-pricing-word>For you</span></span>
        </span>
      </h1>
      <div className={styles.hands}>
        <div className={styles.handsLayer} data-pricing-hands-depth>
          <div className={styles.handsLayer} data-pricing-hands-pointer>
            <Image src="/pricing/hand.png" data-pricing-hands-reveal
              alt="A younger person gently holding an older person’s hand"
              fill priority sizes="(max-width: 767px) 180vw, 111vw" className={styles.handsImage} />
          </div>
        </div>
      </div>
    </section>
  );
}
