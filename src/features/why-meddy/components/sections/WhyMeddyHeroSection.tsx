"use client";

import Image from "next/image";
import Header from "@/components/Header";
import styles from "./WhyMeddyHeroSection.module.css";

export default function WhyMeddyHeroSection() {
  return (
    <section className={`${styles.hero} relative flex min-h-[max(720px,var(--dvh))] w-full flex-col gap-8 overflow-hidden md:min-h-[max(780px,var(--dvh))] md:gap-12`}>
      <Image
        src="/why-meddy/hero.jpg"
        alt=""
        fill
        priority
        sizes="(max-width: 767px) 180vh, 100vw"
        className={`${styles.photo} object-cover`}
      />

      <div className={`${styles.shade} absolute inset-0 bg-black/20`} />

      <div className={`${styles.navigation} relative z-20`}>
        <Header variant="dark" active="WHY MEDDY" />
      </div>
      <div className={`${styles.content} relative z-10 mx-auto! min-h-[640px] w-full max-w-360 flex-1 md:min-h-[740px]`}>
        <h1 className="absolute top-0 left-5 font-sans text-[clamp(32px,7.5vw,56px)] leading-[1.4] font-normal tracking-[-0.02em] text-white md:text-[clamp(48px,7.5vw,108px)] md:leading-[1.45] lg:left-10">
          <span className="block whitespace-nowrap">Healthcare</span>{" "}
          <span className="block whitespace-nowrap">wasn&apos;t designed</span>{" "}
          <span className="block whitespace-nowrap">
            to <em className="font-dm-serif! font-normal text-[#8CDDA8] italic">see everyday</em>
          </span>{" "}
          <em className="block whitespace-nowrap font-dm-serif! font-normal text-[#8CDDA8] italic">life.</em>
        </h1>
        <p className="absolute right-[5%] bottom-[8%] w-[90%] max-w-[374px] text-[18px] leading-[1.5] font-normal text-white md:right-[8.333333%] md:bottom-[12.3%] md:w-[374px] md:text-[20px]">
          Most medical decisions are made from occasional appointments and a handful of lab results even though your health is shaped by what happens between visits.
        </p>
      </div>
    </section>
  );
}
