import React from "react";
import SleepStory from "../components/SleepStory";
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
    <SleepStory>
      <SleepHeroSection />
      <SleepQualitySection />
      <SleepArchitectureSection />
      <div data-story-pin-shell>
        <SleepConsistencySection />
      </div>
      <SleepRecoveryScoreSection />
      <SleepRecoverySection />
      <SleepSamePictureSection />
      <SleepFooterSection />
    </SleepStory>
  );
};
