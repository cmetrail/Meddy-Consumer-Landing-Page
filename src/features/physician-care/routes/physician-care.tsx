import React from "react";
import PhysicianCareHeroSection from "../components/sections/PhysicianCareHeroSection";
import PhysicianCareSecondSection from "../components/sections/PhysicianCareSecondSection";
import PhysicianCareNewThirdSection from "../components/sections/PhysicianCareNewThirdSection";
import PhysicianCareJourneySection from "../components/sections/PhysicianCareJourneySection";
import PhysicianCareAllIncludedSection from "../components/sections/PhysicianCareAllIncludedSection";
import PhysicianCareThirdSection from "../components/sections/PhysicianCareThirdSection";
import PhysicianCareForthSection from "../components/sections/PhysicianCareForthSection";
import PhysicianCareFifthSection from "../components/sections/PhysicianCareFifthSection";
import PhysicianCareFooterSection from "../components/sections/PhysicianCareFooterSection";

export const PhysicianCarePage = () => {
  return (
    <main>
      <PhysicianCareHeroSection />
      <PhysicianCareSecondSection />
      <PhysicianCareNewThirdSection />
      <PhysicianCareJourneySection />
      <PhysicianCareAllIncludedSection />
      <PhysicianCareFooterSection />
    </main>
  );
};
