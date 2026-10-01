import React from "react";
import WearablesHeroSection from "../components/sections/WearablesHeroSection";
import WearablesPlatformsSection from "../components/sections/WearablesPlatformsSection";
import WearablesHealthSignalsSection from "../components/sections/WearablesHealthSignalsSection";
import WearablesSignalSection from "../components/sections/WearablesSignalSection";
import WearablesPhysicianSection from "../components/sections/WearablesPhysicianSection";
import WearablesFAQSection from "../components/sections/WearablesFAQSection";

export const WearablesPage = () => {
  return (
    <main>
      <WearablesHeroSection />
      <WearablesPlatformsSection />
      <WearablesHealthSignalsSection />
      <WearablesSignalSection />
      <WearablesPhysicianSection />
      <WearablesFAQSection />
    </main>
  );
};
