"use client";

import { useRef } from "react";
import { useBiomarkersMotion } from "../components/useBiomarkersMotion";
import BiomarkersHeroSection from "../components/sections/BiomarkersHeroSection";
import BiomarkersAnnualLabsSection from "../components/sections/BiomarkersAnnualLabsSection";
import BiomarkersDepthSection from "../components/sections/BiomarkersDepthSection";
import BiomarkersBreadthSection from "../components/sections/BiomarkersBreadthSection";
import CauseEffectSection from "../components/sections/CauseEffectSection";
import BiomarkersPhysicianLedSection from "../components/sections/BiomarkersPhysicianLedSection";
import BiomarkersFooterSection from "../components/sections/BiomarkersFooterSection";

export const BiomarkersPage = () => {
  const rootRef = useRef<HTMLElement>(null);
  useBiomarkersMotion(rootRef);

  return (
    <main ref={rootRef}>
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
