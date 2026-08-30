"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import MealCard from "./helper/MealCard";
import WorkoutCard from "./helper/WorkoutCard";
import CaloriesCard from "./helper/CaloriesCard";
import NutrientsCard from "./helper/NutrientsCard";
import A1cCard from "./helper/A1cCard";
import SleepCard from "./helper/SleepCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Node px → % of the 1445×1215 Figma frame (see mostcare.md). */
const POS = {
  meal: { left: "7.474%", top: "12.181%", width: "29.647%" },
  workout: { left: "40.069%", top: "7.407%", width: "35.433%" },
  calories: { left: "69.619%", top: "23.868%", width: "24.775%" },
  statement: { left: "28.374%", top: "43.457%", width: "46.367%" },
  nutrients: { left: "3.045%", top: "54.321%", width: "24.859%" },
  a1c: { left: "27.197%", top: "63.539%", width: "30.104%" },
  sleep: { left: "66.298%", top: "60.000%", width: "28.977%" },
};

function Abs({
  pos,
  className = "",
  children,
}: {
  pos: { left: string; top: string; width: string };
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      data-reveal
      className={`xl:absolute max-xl:w-full ${className}`}
      style={{ left: pos.left, top: pos.top, width: pos.width }}
    >
      {children}
    </div>
  );
}

export default function MostCareSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F2EEE3] overflow-hidden">
      <div className="mx-auto w-full py-10 sm:py-16 max-w-360 px-4">
        <div className="relative w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:block xl:aspect-1445/1215 xl:gap-0">
          <Abs pos={POS.meal}>
            <MealCard />
          </Abs>

          <Abs pos={POS.workout}>
            <WorkoutCard />
          </Abs>

          <Abs pos={POS.calories} className="md:max-xl:col-span-2 md:max-xl:!w-1/2 md:max-xl:mx-auto">
            <CaloriesCard />
          </Abs>

          <Abs pos={POS.statement} className="text-center md:max-xl:col-span-2 md:max-xl:flex md:max-xl:flex-col md:max-xl:justify-center">
            <p className="text-[#228755] uppercase" style={{ fontSize: "clamp(14px, 1.4vw, 20px)" }}>
              Always on-care
            </p>
            <p className="text-[#7B7B7B] font-medium mt-[15px]" style={{ fontSize: "clamp(22px, 2.2vw, 32px)" }}>
              Most care happens in 15-minute visits.
            </p>
            <p className="text-[#363636] font-semibold uppercase mt-[15px]" style={{ fontSize: "clamp(26px, 2.5vw, 36px)" }}>
              Meddy happens everyday
            </p>
          </Abs>

          <Abs pos={POS.nutrients} className="md:max-xl:col-span-2 md:max-xl:!w-1/2 md:max-xl:mx-auto">
            <NutrientsCard />
          </Abs>

          <Abs pos={POS.a1c}>
            <A1cCard />
          </Abs>

          <Abs pos={POS.sleep}>
            <SleepCard />
          </Abs>
        </div>
      </div>
    </section>
  );
}
