"use client";

import Image from "next/image";
import layoutStyles from "../../CareLayout.module.css";
import styles from "./CareKnowsSection.module.css";
import { useCareSectionMotion } from "./useCareSectionMotion";

export default function CareKnowsSection() {
  const sectionRef = useCareSectionMotion("knows");
  return (
    <section ref={sectionRef} data-care-story="knows" className={`${styles.section} relative min-h-dvh w-full overflow-hidden`}>
      <Image
        data-cs-landscape
        src="/247-care/section4-bg.png"
        alt=""
        fill
        sizes="(max-width: 767px) 300vw, 100vw"
        className={`${styles.background} object-cover`}
      />

      <div className={styles.shade} aria-hidden="true" />

      <div className={`${styles.content} ${layoutStyles.rail} relative z-10 flex min-h-dvh flex-col justify-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:pt-[121px]`}>
        <div
          className={`${styles.heading} flex flex-col`}
        >
          <h2 data-cs-reveal className={`${styles.title} font-dm-serif italic leading-[1.371] text-[#548958] text-[36px] sm:text-[52px] lg:text-[64px]`}>
            Your physician knows
          </h2>
          <p data-cs-reveal className={`${styles.subtitle} font-medium leading-[1.26] text-white text-[24px] sm:text-[32px] lg:text-[40px]`}>
            what&rsquo;s happening between visits.
          </p>
        </div>

        <p
          data-cs-reveal
          className={`${styles.caption} max-w-[554px] text-left text-[#F4F4F4] font-normal leading-[1.26] text-[16px] lg:text-right lg:text-[20px] lg:mt-[203px]`}
        >
          Your <b className="font-bold">nutrition, <span className={styles.desktopWord}>fitness</span><span className={styles.mobileWord}>workouts</span>, sleep, weight, wearable data, medications, labs,</b>{" "}
          and previous care stay connected.
        </p>
      </div>
    </section>
  );
}
