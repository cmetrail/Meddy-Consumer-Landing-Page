"use client";

import Image from "next/image";
import styles from "./WhyMeddySecondSection.module.css";

export default function WhyMeddySecondSection() {
  return (
    <section data-why-chapter="habits" className={`${styles.section} relative w-full overflow-hidden bg-[#2B2B2B] py-8! md:pt-10! md:pb-9!`}>
      <div className={`${styles.inner} mx-auto! flex w-full max-w-360 flex-col items-center gap-8 px-5! md:gap-12 lg:px-10!`}>
        {/* Heading */}
        <div className="w-full max-w-5xl">
          <h2 data-why-heading
            className="text-center font-dm-serif! text-[clamp(32px,4.45vw,64px)] leading-[1.5] font-normal text-[#FAF8F8]"
          >
            Your{" "}
            <em className="font-dm-serif! font-normal text-[#8CDDA8] italic">daily habits</em>{" "}
            need <span className={styles.clinicalLine}>clinical{" "}
            <span className={`${styles.lastWord} block font-dm-serif!`}>attention.</span></span>
          </h2>
        </div>

        {/* Single image strip (matches Group 48095806.svg layout) */}
        <div
          data-why-habits-desktop
          className={`${styles.desktopCollage} relative w-full max-w-[1240px]`}
        >
          <Image
            src="/why-meddy/habits/images.png"
            alt="Overlapping photos showing nutrition, workouts, sleep, medications, and a chest X-ray"
            width={1394}
            height={512}
            sizes="(min-width: 1280px) 1240px, calc(100vw - 40px)"
            className="h-auto w-full"
          />
        </div>

        <div data-why-habits-mobile className={styles.mobileCollage} role="img" aria-label="Overlapping photos of nutrition, workouts, medication, sleep, and a chest X-ray">
          {["18192", "18193", "18195", "18194", "18196"].map((number, index) => (
            <Image key={number} src={`/why-meddy/habits/Rectangle ${number}.png`} alt="" width={1887} height={1777} sizes="(max-width: 767px) 50vw, 1px" className={styles[`photo${index + 1}`]} />
          ))}
        </div>

        {/* Body text */}
        <p data-why-copy
          className={`${styles.copy} max-w-[900px] text-center text-[16px] leading-[1.5] font-normal text-[#FAF8F8] sm:text-[18px] lg:text-[20px]`}
        >
          Nutrition, workouts, sleep, recovery, medications, and lab results aren&apos;t separate parts of
          your health. They&apos;re connected, and understanding those relationships leads to better care.
        </p>
      </div>
    </section>
  );
}
