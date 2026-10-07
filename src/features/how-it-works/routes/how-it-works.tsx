import React from "react";
import HowItWorksHeroSection from "../components/sections/HowItWorksHeroSection";
import HowItWorksTrackYourDaySection from "../components/sections/HowItWorksTrackYourDaySection";
import HowItWorksSignalSection from "../components/sections/HowItWorksSignalSection";
import HowItWorksPhysicianPlanSection from "../components/sections/HowItWorksPhysicianPlanSection";
import HowItWorksInsightsSection from "../components/sections/HowItWorksInsightsSection";
import HowItWorksProgressSection from "../components/sections/HowItWorksProgressSection";
import HowItWorksFooterSection from "../components/sections/HowItWorksFooterSection";

export const HowItWorksPage = () => {
  return (
    <main>
      <HowItWorksHeroSection />
      <HowItWorksTrackYourDaySection />
      <HowItWorksSignalSection />
      <HowItWorksInsightsSection />
      <HowItWorksPhysicianPlanSection />
      <HowItWorksProgressSection />
      <HowItWorksFooterSection />
    </main>
  );
};
