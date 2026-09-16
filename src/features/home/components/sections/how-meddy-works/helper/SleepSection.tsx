"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
import { SleepArchitectureBar, type ISleepStage } from "./SleepArchitectureBar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SLEEP_STAGES: ISleepStage[] = [
  { key: "awake", label: "Awake", shortLabel: "Awake", percentage: 10, color: "bg-[#E3F9FF]", badgeBg: "bg-[#E3F9FF]" },
  { key: "light", label: "Light", shortLabel: "Light", percentage: 30, color: "bg-[#4DC1FF]", badgeBg: "bg-[#4DC1FF]" },
  { key: "deep", label: "Deep", shortLabel: "Deep", percentage: 28, color: "bg-[#A953FF]", badgeBg: "bg-[#A953FF]" },
  { key: "rem", label: "REM", shortLabel: "REM", percentage: 32, color: "bg-[#FF4BA2]", badgeBg: "bg-[#FF4BA2]" },
];

const DAYS = ["Week", "Mon", "Tue", "Wed", "Thu"];

function SleepArchitectureCard() {
  return (
    <div
      className="flex flex-col gap-3 rounded-[9px] p-3"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <p className="text-white text-sm font-semibold">Sleep Architecture</p>

      {/* Week day tabs */}
      <div className="flex gap-1 mb-2">
        {DAYS.map((d, i) => (
          <span
            key={d}
            className={`rounded-full px-3 py-1.5 text-[12px] font-semibold ${i === 0 ? "bg-[#848484]/14 border border-white text-white" : "border border-transparent bg-[#848484]/14"}`}
          >
            {d}
          </span>
        ))}
      </div>

      <SleepArchitectureBar items={SLEEP_STAGES} />
    </div>
  );
}

function SleepScoreCard() {
  return (
    <div
      className="flex flex-col gap-2 rounded-md p-3 overflow-hidden"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <div className="flex flex-col items-end gap-1">
        <span className="text-white text-[7px] font-medium">Score</span>
        <p className="text-white font-bold text-base leading-tight">93%</p>
        <span className="flex items-center gap-1 rounded-full bg-[#57E6FF] px-2 py-0.5 text-[#0C0D0F] text-[7px] font-semibold">
          Very Stable
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4.5" stroke="#0C0D0F" strokeWidth="1" />
            <text x="5" y="7.5" textAnchor="middle" fontSize="6" fill="#0C0D0F" fontWeight="700">i</text>
          </svg>
        </span>
      </div>
      <Image
        src="/home/sleep-graph-image.png"
        alt="Sleep chart"
        width={240}
        height={140}
        priority
        className="w-full rounded-lg object-cover"
      />
    </div>
  );
}

export default function SleepSection() {
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
      <div className="max-w-360 mx-auto px-4  relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div data-feature-image className="relative w-full md:w-fit md:mx-auto">
            <div data-feature-card className="absolute right-0 top-0 origin-top-right scale-[0.8] sm:scale-100 md:right-[-18%] md:top-[4%] w-72.5">
              <SleepArchitectureCard />
            </div>
            <Image
              src="/home/sleep-photo.png"
              alt="Sleep monitoring"
              width={522}
              height={695}
              priority
              className="object-contain w-full h-auto md:w-130.5 md:h-173.75"
            />
            <div data-feature-card className="absolute left-[-2%] bottom-0 origin-bottom-left scale-[0.8] sm:scale-100  md:bottom-0 lg:bottom-[0%] w-52">
              <SleepScoreCard />
            </div>
          </div>

          <div className="flex flex-row relative">
            <GiantNumber n="03" className="left-0 lg:right-0" />
            <div className="flex flex-col flex-1 lg:pl-16 pt-20 lg:pt-42 justify-center">
              <FeatureCopy
                eyebrow="Sleep Monitoring"
                headline={["TRACK YOUR SLEEP. SEE HOW IT AFFECTS"]}
                accent="YOUR RECOVERY, PERFORMANCE, AND HEALTH."
                sub="Scores your sleep. Never connects it to your training load, caloric deficit, or HRV dip."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
