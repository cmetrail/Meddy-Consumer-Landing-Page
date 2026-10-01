import React from "react";
import WearablesHeroSection from "../components/sections/WearablesHeroSection";
import WearablesPlatformsSection from "../components/sections/WearablesPlatformsSection";
import WearablesHealthSignalsSection from "../components/sections/WearablesHealthSignalsSection";

export const WearablesPage = () => {
  return (
    <main>
      <WearablesHeroSection />
      <WearablesPlatformsSection />
      <WearablesHealthSignalsSection />
    </main>
  );
};
