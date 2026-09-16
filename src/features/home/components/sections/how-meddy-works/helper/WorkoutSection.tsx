"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
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
      className="flex flex-col gap-1.5 rounded-2xl p-2"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "3px 4px 4px 0px rgba(0,0,0,0.25)",
      }}
    >
      {PROFILE.map((r) => (
        <div key={r.label} className="flex items-center justify-between gap-2">
          <span className="w-16 text-[9px] leading-[150%] text-white">{r.label}</span>
          <div className="flex flex-row gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="rounded-[1.5px]"
                style={{ width: 6, height: 3, background: i < r.active ? r.color : "#8A8A82" }}
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
    () => {
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
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} className="">
      <div className="max-w-360 mx-auto px-5 lg:px-10  relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div data-feature-image className="relative w-full md:w-fit md:mx-auto">
            <div data-feature-card className="absolute left-[48%] top-[10%] z-10 origin-top-left scale-[0.8] sm:scale-100 w-89.5" >
              <WorkoutCard />
            </div>
            <Image
              src="/home/workout-photo.png"
              alt="Workout tracking"
              height={874}
              width={633}
              priority
              className="object-contain  w-full h-auto md:w-158.25 md:h-218.5"
              style={{ filter: "drop-shadow(11px -4px 12.3px rgba(0,0,0,0.25))" }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-2.5 h-[27.6%] w-[104%]"
              style={{ background: "linear-gradient(190deg, rgba(38,38,38,0) 51%, rgba(24,34,29,1) 90%)" }}
            />
            <div data-feature-card className="absolute right-[-4.3%] top-[38.2%] z-10 origin-top-right scale-[0.8] sm:scale-100 w-49" >
              <ProfileCard />
            </div>
            <div data-feature-card className="absolute left-[5%] top-[74.3%] z-10 origin-top-left scale-[0.8] sm:scale-100 w-87.5" >
              <WorkoutStatsCard />
            </div>
          </div>
          <div className="flex flex-row  relative ">
            <GiantNumber n="02" className="left-0 lg:right-0" />
            <div className="flex flex-col flex-1 lg:pl-16 py-20 lg:pt-24 justify-center">
              <FeatureCopy
                eyebrow="Workouts"
                headline={["Train with a plan your"]}
                accent="doctor can actually see."
                sub="Save workouts and track progress — so your physician knows what's working, not just what you weigh."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
