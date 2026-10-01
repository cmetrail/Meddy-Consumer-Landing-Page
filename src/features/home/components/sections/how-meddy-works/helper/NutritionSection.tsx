"use client";

import { useRef } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
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
    <div ref={sectionRef} className="">
      <div className="mx-auto max-w-360 px-5 pt-10 pb-10 text-center lg:px-10 lg:pt-16">
        <h2 className="text-2xl leading-snug font-medium text-[#17925A] lg:text-[30px]">
          <em
            className="font-normal text-white"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            Meddy
          </em>{" "}
          connects your everyday health with your{" "}
          <em
            className="font-normal text-white"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            medical care.
          </em>
        </h2>
        <p className="mx-auto mt-4 max-w-[620px] text-base leading-[1.25] text-white lg:text-[18px]">
          Your nutrition, workouts, sleep, weight, wearable data, medications,
          and lab results can come together in one place.
        </p>
      </div>
      <div className="max-w-360 mx-auto px-5 lg:px-10 relative">
        <GiantNumber n="01" />
        <div className="grid lg:grid-cols-2  gap-12 lg:gap-16 items-center">
          <div className="pt-24 pl-0  lg:pl-16">
            <FeatureCopy
              eyebrow="Nutrition Intelligence"
              headline={["Eat smarter,", "and give your doctor"]}
              accent="something to work with."
              sub="Log meals in seconds. Every entry feeds the nutrition picture your physician uses to guide your care."
            />
          </div>
          <div
            data-feature-image
            className="relative w-full md:w-fit md:mx-auto"
          >
            <div
              data-feature-card
              className="absolute z-[99] w-62.5 right-[3%] top-[10%] origin-top-right scale-[0.8] sm:scale-100"
            >
              <MealCard />
            </div>
            <Image
              src="/home/nutrition-photos.png"
              alt="Nutrition tracking"
              height={792}
              width={640}
              className="object-contain w-full h-auto md:w-160 md:h-198"
              style={{ filter: "drop-shadow(12px 16px 18px rgba(0,0,0,0.25))" }}
            />
            <div
              data-feature-card
              className="absolute w-62.5 left-0 bottom-[5%] origin-bottom-left scale-[0.8] sm:scale-100"
            >
              <NutritionCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
