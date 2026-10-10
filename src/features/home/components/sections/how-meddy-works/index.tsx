"use client";

import { useRef } from "react";

import Hero from "./helper/Hero";
import NutritionSection from "./helper/NutritionSection";
import WorkoutSection from "./helper/WorkoutSection";
import SleepSection from "./helper/SleepSection";
import InsightsSection from "./helper/InsightsSection";
import GraphBand from "./helper/GraphBand";
import FitnessTrend from "./helper/FitnessTrend";
import SleepTrend from "./helper/SleepTrend";
import A1cTrend from "./helper/A1cTrend";
import SectionStack from "./SectionStack";
import MedicationStorySection from "@/features/physician-care/components/sections/MedicationStorySection";

export default function HowMeddyWorksSection() {
  const carePenDestinationRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#17231D] text-white overflow-clip"
    >
      {/* ── Hero: How Meddy works ── */}
      <Hero />

      {/* ── Feature blocks ── */}
      <div className="py-10 pb-20">
        <SectionStack>
          <NutritionSection />
          <GraphBand />
          <WorkoutSection />
          <FitnessTrend />
          <SleepSection />
          <SleepTrend />
          <InsightsSection />
          <div data-care-journey>
            <MedicationStorySection penDestinationRef={carePenDestinationRef} />
            <A1cTrend sharedPen penDestinationRef={carePenDestinationRef} />
          </div>
        </SectionStack>
      </div>
    </section>
  );
}
