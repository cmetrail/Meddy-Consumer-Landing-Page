import React from "react";
import PricingHeroSection from "../components/sections/PricingHeroSection";
import PricingPlansSection from "../components/sections/PricingPlansSection";
import PricingStartSection from "../components/sections/PricingStartSection";
import PricingLevelSection from "../components/sections/PricingLevelSection";
import PricingFooterSection from "../components/sections/PricingFooterSection";

export const PricingPage = () => {
  return (
    <main>
      <PricingHeroSection />
      <PricingPlansSection />
      <PricingStartSection />
      <PricingLevelSection />
      <PricingFooterSection />
    </main>
  );
};
