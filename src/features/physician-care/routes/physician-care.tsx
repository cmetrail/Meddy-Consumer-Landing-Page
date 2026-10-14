import React from "react";
import PhysicianCareHeroSection from "../components/sections/PhysicianCareHeroSection";
import PhysicianCareSecondSection from "../components/sections/PhysicianCareSecondSection";
import PhysicianCareNewThirdSection from "../components/sections/PhysicianCareNewThirdSection";
import PhysicianCareJourneySection from "../components/sections/PhysicianCareJourneySection";
import PhysicianCareProfileSection from "../components/sections/PhysicianCareProfileSection";
import PhysicianCareAllIncludedSection from "../components/sections/PhysicianCareAllIncludedSection";
import MedicationStorySection from "../components/sections/MedicationStorySection";
import PhysicianCareThirdSection from "../components/sections/PhysicianCareThirdSection";
import PhysicianCareForthSection from "../components/sections/PhysicianCareForthSection";
import PhysicianCareFifthSection from "../components/sections/PhysicianCareFifthSection";
import PhysicianCareFooterSection from "../components/sections/PhysicianCareFooterSection";
import PhysicianCareFAQSection from "../components/sections/PhysicianCareFAQSection";

export const PhysicianCarePage = () => {
  return (
    <main>
      <PhysicianCareHeroSection />
      <PhysicianCareSecondSection />
      <PhysicianCareNewThirdSection />
      <PhysicianCareProfileSection />
      <PhysicianCareJourneySection />
      {/* <MedicationStorySection /> */}
      <PhysicianCareAllIncludedSection />
      <PhysicianCareFAQSection />
      <PhysicianCareFooterSection />
    </main>
  );
};
