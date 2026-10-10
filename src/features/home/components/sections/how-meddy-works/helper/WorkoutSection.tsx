"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./WorkoutSection.module.css";
import WorkoutCard from "./WorkoutCard";
import WorkoutStatsCard from "./WorkoutStatsCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROFILE = [
  { label: "Joint Stress", active: 4, color: "#F97316", value: "High" },
  { label: "Avg Impact", active: 1, color: "#17925A", value: "Low" },
  { label: "Spinal Load", active: 1, color: "#17925A", value: "Min" },
  { label: "Balance", active: 1, color: "#17925A", value: "Low" },
];

function ProfileCard() {
  return (
    <div
      className={styles.profileCard}
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "3px 4px 4px 0px rgba(0,0,0,0.25)",
      }}
    >
      {PROFILE.map((r) => (
        <div key={r.label} className={styles.profileRow}>
          <span className={styles.profileLabel}>{r.label}</span>
          <div className="flex flex-row gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="rounded-[1.5px]"
                style={{ width: 4, height: 3, background: i < r.active ? r.color : "#8A8A82" }}
              />
            ))}
          </div>
          <span className="text-[9px] leading-[150%] text-[#F4F4F5]">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function WorkoutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => desktopMotion(() => {
      const root = sectionRef.current;
      if (!root) return;

      const image = root.querySelector("[data-feature-image]");

      if (image) {
        gsap.fromTo(image, { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, ease: "none",
          scrollTrigger: { trigger: image, start: "top 92%", end: "top 55%", scrub: true },
        });
      }
      gsap.utils.toArray<HTMLElement>("[data-feature-card]", root).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 60%", scrub: true },
        });
      });
    }),
    { scope: sectionRef },
  );

  return (
    <div id="workouts" ref={sectionRef} className={styles.section}>
      <div className={styles.content}>
        <div data-feature-image data-mobile-direction="from-right" className={styles.visual}>
          <Image
            src="/home/workout-photo.png"
            alt="Runner wearing earbuds and a fitness watch"
            height={874}
            width={633}
            className={styles.photo}
            sizes="(min-width: 1024px) 400px, (min-width: 540px) 400px, 100vw"
          />
          <div data-feature-card className={styles.summaryCard}>
            <WorkoutCard />
          </div>
          <div data-feature-card className={styles.profile}>
            <ProfileCard />
          </div>
          <div data-feature-card className={styles.statsCard}>
            <WorkoutStatsCard />
          </div>
        </div>
        <div className={styles.copy}>
          <h3>Workouts</h3>
          <p className={styles.headline}>
            Train with a plan your<br />
            <em className={styles.accent}>doctor can actually see.</em>
          </p>
          <p className={styles.description}>
            Save workouts and track progress &mdash; so your physician knows<br className={styles.desktopBreak} />
            {" "}what&apos;s working, not just what you weigh.
          </p>
        </div>
      </div>
    </div>
  );
}
