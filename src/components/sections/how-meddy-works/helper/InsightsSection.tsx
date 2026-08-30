"use client";

import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";

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
        border: "1px solid rgba(255,255,255,1)",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <div>
        <p className="text-white/70 text-[10px] mb-1">Net Calories</p>
        <div className="flex items-baseline gap-2">
          <p className="text-white font-bold text-2xl leading-tight">235 kcal</p>
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#F87171]">
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
              <span className={`flex items-center gap-0.5 text-[9px] font-semibold ${item.up ? "text-[#6EE7A0]" : "text-[#F87171]"}`}>
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
      className="flex flex-col gap-2 rounded-2xl p-3"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "0.1px solid rgba(255,255,255,1)",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <p className="text-white/60 text-[9px]">A1c Trend</p>
      <div className="relative h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={A1C_TREND_DATA} margin={{ top: 4, right: 2, left: 2, bottom: 4 }}>
            <XAxis dataKey="x" type="number" domain={[0, 200]} hide />
            <YAxis type="number" domain={[0, 70]} hide />
            <Line
              type="monotone"
              dataKey="a1c"
              stroke="#F2A61A"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm px-1 py-0.5 font-semibold"
          style={{ left: "23%", top: "67%", fontSize: 5.5, color: "#F2A61A", background: "rgba(242,166,26,0.25)" }}
        >
          Avg: 14.3%
        </span>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm px-1 py-0.5 font-semibold"
          style={{ left: "78%", top: "27%", fontSize: 5.5, color: "#F2A61A", background: "rgba(242,166,26,0.25)" }}
        >
          Avg: 13.8%
        </span>
      </div>
      <div className="flex justify-between text-white/40" style={{ fontSize: 8 }}>
        {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </div>
  );
}

export default function InsightsSection() {
  return (
    <div className="">

      <div className="max-w-360 mx-auto px-4  pb-20 relative">
        <GiantNumber n="05" />
        <div className="grid lg:grid-cols-2   gap-8 lg:gap-16 items-center">
          <div className="pt-24 lg:pt-40 lg:pl-14">
          <FeatureCopy
            eyebrow="Health Insights"
              headline={["Know what's actually"]}
            accent="moving your health."
            sub="See how changes affect your results — and which habits are driving them."
            />
          </div>
          <div className="relative w-full md:w-fit md:mx-auto">
            <div className="absolute right-[0%] top-[0%] origin-top-right scale-[0.8] sm:scale-100 w-67">
              <NetCaloriesCard />
            </div>
            <Image
              src="/home/heart.png"
              alt="Health insights"
              height={670}
              width={441}
              priority
              className="object-contain w-full h-auto md:w-110.25 md:h-167.5"

            />
            <div className="absolute left-[0%] bottom-[0%] origin-bottom-left scale-[0.8] sm:scale-100 w-67">
              <A1cTrendCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
