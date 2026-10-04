import React from "react";
import SleepHeroSection from "../components/sections/SleepHeroSection";
import SleepQualitySection from "../components/sections/SleepQualitySection";
import SleepArchitectureSection from "../components/sections/SleepArchitectureSection";
import SleepConsistencySection from "../components/sections/SleepConsistencySection";
import SleepRecoveryScoreSection from "../components/sections/SleepRecoveryScoreSection";
import SleepRecoverySection from "../components/sections/SleepRecoverySection";
import SleepSamePictureSection from "../components/sections/SleepSamePictureSection";
import SleepFooterSection from "../components/sections/SleepFooterSection";

export const SleepPage = () => {
  return (
    <main>
      <SleepHeroSection />
      <SleepQualitySection />
      <SleepArchitectureSection />
      <SleepConsistencySection />
      <SleepRecoveryScoreSection />
      <SleepRecoverySection />
      <SleepSamePictureSection />
      <SleepFooterSection />
    </main>
  );
};
