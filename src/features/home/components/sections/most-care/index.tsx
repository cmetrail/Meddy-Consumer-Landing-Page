"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import MealCard from "./helper/MealCard";
import WorkoutCard from "./helper/WorkoutCard";
import CaloriesCard from "./helper/CaloriesCard";
import NutrientsCard from "./helper/NutrientsCard";
import A1cCard from "./helper/A1cCard";
import SleepCard from "./helper/SleepCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Node px → % of the 1445×1059 Figma frame (1445×1215 trimmed of top/bottom whitespace; see mostcare.md). */
const POS = {
  meal: { left: "7.474%", top: "5.477%", width: "29.647%" },
  workout: { left: "40.069%", top: "0%", width: "35.433%" },
  calories: { left: "69.619%", top: "18.886%", width: "24.775%" },
  statement: { left: "28.374%", top: "41.360%", width: "46.367%" },
  nutrients: { left: "3.045%", top: "53.824%", width: "24.859%" },
  a1c: { left: "27.197%", top: "64.400%", width: "30.104%" },
  sleep: { left: "66.298%", top: "60.340%", width: "28.977%" },
};

/* Scatter-in offsets (x/y px + rotate deg) — cards fly in from different directions. */
const SCATTER = [
  { x: -80, y: -60, r: -8 },
  { x: 0, y: -90, r: 6 },
  { x: 80, y: -50, r: 10 },
  { x: -70, y: 70, r: -10 },
  { x: -30, y: 90, r: 6 },
  { x: 70, y: 70, r: -6 },
];

function Abs({
  pos,
  className = "",
  scatter = false,
  statement = false,
  children,
}: {
  pos: { left: string; top: string; width: string };
  className?: string;
  scatter?: boolean;
  statement?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-scatter={scatter || undefined}
      data-statement={statement || undefined}
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
      const root = sectionRef.current;
      if (!root) return;

      gsap.utils.toArray<HTMLElement>("[data-scatter]", root).forEach((el, i) => {
        const s = SCATTER[i % SCATTER.length];
        gsap.fromTo(el, { x: s.x, y: s.y, rotate: s.r, opacity: 0 }, {
          x: 0, y: 0, rotate: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 60%", scrub: true },
        });
      });

      const statement = root.querySelector("[data-statement]");
      if (statement) {
        const lines = statement.querySelectorAll<HTMLElement>("[data-line]");
        const stl = gsap.timeline({
          scrollTrigger: { trigger: statement, start: "top 92%", end: "top 55%", scrub: true },
        });
        lines.forEach((el, i) => {
          stl.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, i * 0.15);
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="why-meddy" className="relative w-full bg-[#F2EEE3] overflow-hidden">
      <div className="mx-auto w-full px-5 lg:px-10 py-16 max-w-360">
        <div className="relative w-full grid grid-cols-1 gap-6 md:grid-cols-2 xl:block xl:aspect-1445/1059 xl:gap-0">
          <Abs pos={POS.meal} scatter>
            <MealCard />
          </Abs>

          <Abs pos={POS.workout} scatter>
            <WorkoutCard />
          </Abs>

          <Abs pos={POS.calories} scatter className="md:max-xl:col-span-2 md:max-xl:w-1/2! md:max-xl:mx-auto">
            <CaloriesCard />
          </Abs>

          <Abs pos={POS.statement} statement className="text-center flex flex-col gap-3.75 md:max-xl:col-span-2 md:max-xl:flex md:max-xl:flex-col md:max-xl:justify-center">
            <p data-line className="text-[#228755] uppercase text-[20px] leading-[100%]">
              Always on-care
            </p>
            <div className="flex flex-col gap-3.75">
              <p data-line className="text-[#7B7B7B] font-medium text-[32px] leading-[100%]" >
                Most care happens in 15-minute visits.
              </p>
              <p data-line className="text-[#363636] font-semibold uppercase text-[36px] leading-[100%]" >
                Meddy happens everyday
              </p>
            </div>
          </Abs>

          <Abs pos={POS.nutrients} scatter className="md:max-xl:col-span-2 md:max-xl:!w-1/2 md:max-xl:mx-auto">
            <NutrientsCard />
          </Abs>

          <Abs pos={POS.a1c} scatter>
            <A1cCard />
          </Abs>

          <Abs pos={POS.sleep} scatter>
            <SleepCard />
          </Abs>
        </div>
      </div>
    </section>
  );
}
