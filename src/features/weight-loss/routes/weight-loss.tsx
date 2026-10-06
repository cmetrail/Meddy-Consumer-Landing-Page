import React from "react";
import WeightLossHeroSection from "../components/sections/WeightLossHeroSection";
import WeightLossWholePictureSection from "../components/sections/WeightLossWholePictureSection";
import WeightLossPlanSection from "../components/sections/WeightLossPlanSection";
import ChangeInWeightSection from "../components/sections/ChangeInWeightSection";
import WeightLossProgressSection from "../components/sections/WeightLossProgressSection";
import WeightLossHealthMarkersSection from "../components/sections/WeightLossHealthMarkersSection";
import WeightLossFaqSection from "../components/sections/WeightLossFaqSection";
import WeightLossFooterSection from "../components/sections/WeightLossFooterSection";

export const WeightLossPage = () => {
  return (
    <main>
      <WeightLossHeroSection />
      <WeightLossWholePictureSection />
      <WeightLossProgressSection />
      <ChangeInWeightSection />
      <WeightLossPlanSection />
      <WeightLossHealthMarkersSection />
      <WeightLossFaqSection />
      <WeightLossFooterSection />
    </main>
  );
};
