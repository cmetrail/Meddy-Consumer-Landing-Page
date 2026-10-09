import React from "react";
import LongevityHeroSection from "../components/sections/LongevityHeroSection";
import LongevityKnowWhereYouStandSection from "../components/sections/LongevityKnowWhereYouStandSection";
import LongevityPhysicianSection from "../components/sections/LongevityPhysicianSection";
import LongevityPhysicianPreventionSection from "../components/sections/LongevityPhysicianPreventionSection";
import LongevityChangesSection from "../components/sections/LongevityChangesSection";
import LongevityFAQSection from "../components/sections/LongevityFAQSection";
import LongevityFooterSection from "../components/sections/LongevityFooterSection";

export const LongevityPage = () => {
  return (
    <main>
      <LongevityHeroSection />
      <LongevityKnowWhereYouStandSection />
      <LongevityChangesSection />
      <LongevityPhysicianSection />
      <LongevityPhysicianPreventionSection />
      <LongevityFAQSection />
      <LongevityFooterSection />
    </main>
  );
};
