import React from "react";
import FitnessHeroSection from "../components/sections/FitnessHeroSection";
import FitnessProgramsSection from "../components/sections/FitnessProgramsSection";
import FitnessProgressReveal from "../components/sections/FitnessProgressReveal";
import FitnessKnowSection from "../components/sections/FitnessKnowSection";
import FitnessPlanSection from "../components/sections/FitnessPlanSection";
import FitnessFaqSection from "../components/sections/FitnessFaqSection";
import FitnessFooterSection from "../components/sections/FitnessFooterSection";

export const FitnessPage = () => {
  return (
    <main>
      <FitnessHeroSection />
      <FitnessProgramsSection />
      <FitnessKnowSection />
      <FitnessProgressReveal />
      <FitnessPlanSection />
      <FitnessFaqSection />
      <FitnessFooterSection/>
    </main>
  );
};
