"use client";

import Hero from "./helper/Hero";
import NutritionSection from "./helper/NutritionSection";
import WorkoutSection from "./helper/WorkoutSection";
import SleepSection from "./helper/SleepSection";
import A1cSection from "./helper/A1cSection";
import InsightsSection from "./helper/InsightsSection";
import GraphBand from "./helper/GraphBand";
import FitnessTrend from "./helper/FitnessTrend";
import SleepTrend from "./helper/SleepTrend";

export default function HowMeddyWorksSection() {
  return (
    <section className="relative w-full bg-[#16231d] text-white overflow-hidden">
      {/* ── Hero: How Meddy works ── */}
      <Hero />

      {/* ── Feature blocks ── */}
      <div className="flex flex-col pt-10 gap-40">
        <GraphBand />
        <NutritionSection />
        <FitnessTrend />
        <WorkoutSection />
        <SleepTrend />
        <SleepSection />
        <InsightsSection />
      </div>
    </section>
  );
}
