"use client";

import { useRef } from "react";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const A1C_TREND_DATA = [
  { x: 0, a1c: 10 },
  { x: 30, a1c: 15 },
  { x: 60, a1c: 30 },
  { x: 90, a1c: 20 },
  { x: 120, a1c: 40 },
  { x: 150, a1c: 45 },
  { x: 200, a1c: 60 },
];

function NetCaloriesCard() {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-3"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <div>
        <p className="text-white/70 text-[10px] mb-1">Net Calories</p>
        <div className="flex items-baseline gap-2">
          <p className="text-white font-bold text-2xl leading-tight">235 kcal</p>
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#FF546B]">
            <TrendingDown size={10} />−20%
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Calories Intake", value: "235 kcal", trend: "+20%", up: true },
          { label: "Calories Burn", value: "235 kcal", trend: "−20%", up: false },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-1 rounded-xl p-2"
            style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
          >
            <p className="text-white/60 text-[9px]">{item.label}</p>
            <div className="flex items-baseline gap-1 flex-wrap">
              <p className="text-white font-bold text-[13px] leading-tight">{item.value}</p>
              <span className={`flex items-center gap-0.5 text-[9px] font-semibold ${item.up ? "text-[#1DC277]" : "text-[#FF546B]"}`}>
                {item.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function A1cTrendCard() {
  return (
    <div
      className="flex flex-col rounded-2xl p-3"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <p className="text-white text-[10px]">A1c Trend</p>
      <Image
        src="/home/a1c-trend.png"
        alt="Sleep chart"
        width={240}
        height={120}
        priority
        className="w-full rounded-lg object-cover"
      />
    </div>
  );
}

export default function InsightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const image = root.querySelector("[data-feature-image]");

      if (image) {
        gsap.fromTo(image, { opacity: 0, x: -40 }, {
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
        <GiantNumber n="04" />
        <div className="grid lg:grid-cols-2   gap-8 lg:gap-16 items-center">
          <div className="pt-24 lg:pt-40 lg:pl-14">
            <FeatureCopy
              eyebrow="Health Insights"
              headline={["Know what's actually"]}
              accent="moving your health."
              sub="See how changes affect your results — and which habits are driving them."
            />
          </div>
          <div data-feature-image className="relative w-full md:w-fit md:mx-auto">
            <div data-feature-card className="absolute right-[0%] top-[0%] z-10 origin-top-right scale-[0.8] sm:scale-100 w-67">
              <NetCaloriesCard />
            </div>
            <Image
              src="/home/heart.png"
              alt="Health insights"
              height={670}
              width={441}
              priority
              className="object-contain w-full h-auto md:w-110.25 md:h-167.5"
              style={{ filter: "drop-shadow(21px 16px 14.6px rgba(78,38,38,0.25))" }}
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(38,38,38,0) 10%, rgba(24,34,29,1) 77%)",
              }}
            />
            <div data-feature-card className="absolute left-[-4%] bottom-[14%] origin-bottom-left scale-[0.8] sm:scale-100 w-67">
              <A1cTrendCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
