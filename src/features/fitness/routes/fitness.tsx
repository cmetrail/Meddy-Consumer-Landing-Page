import React from "react";
import FitnessHeroSection from "../components/sections/FitnessHeroSection";
import FitnessProgramsSection from "../components/sections/FitnessProgramsSection";
import FitnessKnowSection from "../components/sections/FitnessKnowSection";
import FitnessMeasurableSection from "../components/sections/FitnessMeasurableSection";
import FitnessRecoverySection from "../components/sections/FitnessRecoverySection";
import FitnessPlanSection from "../components/sections/FitnessPlanSection";
import FitnessFaqSection from "../components/sections/FitnessFaqSection";
import FitnessFooterSection from "../components/sections/FitnessFooterSection";

export const FitnessPage = () => {
  return (
    <main>
      <FitnessHeroSection />
      <FitnessProgramsSection />
      <FitnessKnowSection />
      <FitnessMeasurableSection />
      <FitnessRecoverySection />
      <FitnessPlanSection />
      <FitnessFaqSection />
      <FitnessFooterSection/>
    </main>
  );
};
