"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./NutritionSection.module.css";
import NutritionCard from "./NutritionCard";
import { MealCard } from "./MealCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function NutritionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        const root = sectionRef.current;
        if (!root) return;

        const image = root.querySelector("[data-feature-image]");

        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top 92%",
                end: "top 55%",
                scrub: true,
              },
            },
          );
        }
        gsap.utils
          .toArray<HTMLElement>("[data-feature-card]", root)
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 88%",
                  end: "top 60%",
                  scrub: true,
                },
              },
            );
          });
      }),
    { scope: sectionRef },
  );

  return (
    <div id="nutrition" ref={sectionRef} className={styles.section}>
      <div className={styles.intro}>
        <h2 className={styles.title}>
          <em
            className={styles.accent}
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            Meddy
          </em>{" "}
          connects your everyday health with your{" "}
          <em
            className={styles.accent}
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            medical care.
          </em>
        </h2>
        <p className={styles.summary}>
          Your nutrition, workouts, sleep, weight, wearable data, medications,
          and lab results can come together in one place.
        </p>
      </div>
      <div className={styles.content}>
          <div className={styles.copy}>
            <h3>Nutrition Intelligence</h3>
            <p className={styles.headline}>
              Eat smarter,<br />
              and give your doctor <em className={styles.accent}>something to<br className={styles.desktopBreak} /> work with.</em>
            </p>
            <p className={styles.description}>
              Log meals in seconds. Every entry feeds the nutrition
              picture your physician uses to guide your care.
            </p>
          </div>
          <div
            data-feature-image
            className={styles.visual}
          >
            <div
              data-feature-card
              className={styles.mealCard}
            >
              <MealCard nutrition />
            </div>
            <Image
              src="/home/nutrition-photos.png"
              alt="Hands holding a bowl of fresh salad"
              height={792}
              width={640}
              className={styles.photo}
              sizes="(min-width: 1024px) 440px, (min-width: 600px) 440px, 100vw"
            />
            <div
              data-feature-card
              className={styles.nutrients}
            >
              <NutritionCard />
            </div>
          </div>
      </div>
    </div>
  );
}
