"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { usePhysicianHeroMotion } from "./usePhysicianHeroMotion";
import styles from "./PhysicianCareHeroSection.module.css";

const AVATARS = [
  "/physician-care/avatar-1.png",
  "/physician-care/avatar-2.png",
  "/physician-care/avatar-3-36fb88.png",
];

export default function PhysicianCareHeroSection() {
  const sectionRef = usePhysicianHeroMotion();
  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.navigation}><Header /></div>
      <div className={styles.stage}>
        <div className={styles.artwork} data-care-depth>
          <div data-care-pointer>
            <div className={styles.portrait}>
              <div className={styles.portraitLayer} data-care-portrait>
                {/* Identical image bounds keep the sharp window aligned with the blur. */}
                <Image src="/physician-care/doctor.png" alt="" aria-hidden fill priority
                  sizes="(max-width: 599px) 80vw, 37vw" className={styles.blurred} data-care-blurred />
                <Image src="/physician-care/doctor.png" alt="Meddy physician" fill priority
                  sizes="(max-width: 599px) 80vw, 37vw" className={styles.focused} data-care-focused />
              </div>
              <svg aria-hidden className={styles.frame} width="100%" height="100%">
                <rect data-care-frame x="0" y="0" width="100%" height="100%"
                  fill="none" stroke="white" pathLength="1" strokeDasharray="1" />
              </svg>
              <div aria-hidden data-care-pulse className={styles.pulse}>
                <Image src="/physician-care/pulse.svg" alt="" fill unoptimized />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copy} data-care-copy>
          <h1 className={styles.headline}>
            {["Primary", "care"].map((word, index) => (
              <span key={word} className={styles.wordGroup}>
                {index > 0 && " "}
                <span className={styles.wordMask}><span data-care-word>{word}</span></span>
              </span>
            ))}
          </h1>
          <p data-care-subtitle className={styles.subtitle}>
            that knows you beyond<br className={styles.desktopBreak} /> the office visit.
          </p>
          <p data-care-description className={styles.description}>Care built around how you actually live.</p>
          <div data-care-cta className={styles.cta}>
            <button data-care-button className={styles.button}>
              <span aria-hidden data-care-shine className={styles.shine} />
              <span className={styles.buttonLabel}>Start Physician Care</span>
            </button>
          </div>
          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              {AVATARS.map(src => (
                <div key={src} data-care-avatar className={styles.avatar}>
                  <Image src={src} alt="Patient" fill sizes="54px" className={styles.avatarImage} />
                </div>
              ))}
            </div>
            <div className={styles.proofCopy} data-care-proof>
              <span>Now accepting our first 500 patients</span>
              <div className={styles.spots}><span className={styles.count}>327</span><span>remaining spots</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
