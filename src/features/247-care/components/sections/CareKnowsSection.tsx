"use client";

import Image from "next/image";
import layoutStyles from "../../CareLayout.module.css";
import styles from "./CareKnowsSection.module.css";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CareKnowsSection() {
  return (
    <section className={`${styles.section} relative min-h-dvh w-full overflow-hidden`}>
      <Image
        src="/247-care/section4-bg.png"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 300vw, 100vw"
        className={`${styles.background} object-cover`}
      />

      <div className={styles.shade} aria-hidden="true" />

      <div className={`${styles.content} ${layoutStyles.rail} relative z-10 flex min-h-dvh flex-col justify-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:pt-[121px]`}>
        <motion.div
          className={`${styles.heading} flex flex-col`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className={`${styles.title} font-dm-serif italic leading-[1.371] text-[#548958] text-[36px] sm:text-[52px] lg:text-[64px]`}>
            Your physician knows
          </h2>
          <p className={`${styles.subtitle} font-medium leading-[1.26] text-white text-[24px] sm:text-[32px] lg:text-[40px]`}>
            what&rsquo;s happening between visits.
          </p>
        </motion.div>

        <motion.p
          className={`${styles.caption} max-w-[554px] text-left text-[#F4F4F4] font-normal leading-[1.26] text-[16px] lg:text-right lg:text-[20px] lg:mt-[203px]`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          Your <b className="font-bold">nutrition, <span className={styles.desktopWord}>fitness</span><span className={styles.mobileWord}>workouts</span>, sleep, weight, wearable data, medications, labs,</b>{" "}
          and previous care stay connected.
        </motion.p>
      </div>
    </section>
  );
}
