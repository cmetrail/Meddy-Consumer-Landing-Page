"use client";

import Hero from "./helper/Hero";
import NutritionSection from "./helper/NutritionSection";
import WorkoutSection from "./helper/WorkoutSection";
import SleepSection from "./helper/SleepSection";
import InsightsSection from "./helper/InsightsSection";
import GraphBand from "./helper/GraphBand";
import FitnessTrend from "./helper/FitnessTrend";
import SleepTrend from "./helper/SleepTrend";
import A1cTrend from "./helper/A1cTrend";

export default function HowMeddyWorksSection() {
  return (
    <section className="relative w-full bg-[#16231d] text-white overflow-hidden">
      {/* ── Hero: How Meddy works ── */}
      <Hero />

      {/* ── Feature blocks ── */}
      <div className="flex flex-col py-10 gap-36">
        <NutritionSection />
        <GraphBand />
        <WorkoutSection />
        <FitnessTrend />
        <SleepSection />
        <SleepTrend />
        <InsightsSection />
        <A1cTrend />
      </div>
    </section>
  );
}
