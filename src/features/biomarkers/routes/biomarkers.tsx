import React from "react";
import BiomarkersHeroSection from "../components/sections/BiomarkersHeroSection";
import BiomarkersAnnualLabsSection from "../components/sections/BiomarkersAnnualLabsSection";
import BiomarkersDepthSection from "../components/sections/BiomarkersDepthSection";
import BiomarkersBreadthSection from "../components/sections/BiomarkersBreadthSection";
import CauseEffectSection from "../components/sections/CauseEffectSection";
import BiomarkersPhysicianLedSection from "../components/sections/BiomarkersPhysicianLedSection";
import BiomarkersFooterSection from "../components/sections/BiomarkersFooterSection";

export const BiomarkersPage = () => {
  return (
    <main>
      <BiomarkersHeroSection />
      <BiomarkersAnnualLabsSection />
      <BiomarkersBreadthSection />
      <BiomarkersDepthSection/>
      <CauseEffectSection />
      <BiomarkersPhysicianLedSection />
      <BiomarkersFooterSection />
    </main>
  );
};
