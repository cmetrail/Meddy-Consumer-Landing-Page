import React from "react";
import PricingHeroSection from "../components/sections/PricingHeroSection";
import PricingPlansSection from "../components/sections/PricingPlansSection";
import PricingStartSection from "../components/sections/PricingStartSection";

export const PricingPage = () => {
  return (
    <main>
      <PricingHeroSection />
      <PricingPlansSection />
      <PricingStartSection />
    </main>
  );
};
