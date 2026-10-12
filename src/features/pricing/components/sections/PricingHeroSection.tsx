import Image from "next/image";
import Header from "@/components/Header";
import styles from "./PricingHeroSection.module.css";

function Portrait({ src }: { src: string }) {
  return (
    <Image src={src} alt="" width={98} height={70}
      sizes="(max-width: 767px) 23vw, 98px" className={styles.portrait} />
  );
}

export default function PricingHeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.header}><Header /></div>
      <h1 className={styles.headline} aria-label="Choose the level of support that’s right for you">
        <span className={styles.row} aria-hidden="true">
          <span>Choose</span>
          <Portrait src="/pricing/hero/squiggle-1.png" />
          <span>The level of</span>
        </span>
        <span className={styles.row} aria-hidden="true">
          <span className={styles.support}>Support</span>
          <Portrait src="/pricing/hero/squiggle-2.png" />
          <span>That’s right</span>
        </span>
        <span className={`${styles.row} ${styles.lastRow}`} aria-hidden="true">
          <Portrait src="/pricing/hero/squiggle-3.png" />
          <span>For you</span>
        </span>
      </h1>
      <div className={styles.hands}>
        <Image src="/pricing/hand.png"
          alt="A younger person gently holding an older person’s hand"
          fill priority sizes="(max-width: 767px) 180vw, 111vw" className={styles.handsImage} />
      </div>
    </section>
  );
}
