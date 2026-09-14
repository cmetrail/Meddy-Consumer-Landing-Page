import React from "react";
import PhysicianCareHeroSection from "../components/sections/PhysicianCareHeroSection";
import PhysicianCareSecondSection from "../components/sections/PhysicianCareSecondSection";
import PhysicianCareThirdSection from "../components/sections/PhysicianCareThirdSection";
import PhysicianCareForthSection from "../components/sections/PhysicianCareForthSection";
import PhysicianCareFifthSection from "../components/sections/PhysicianCareFifthSection";
import PhysicianCareFooterSection from "../components/sections/PhysicianCareFooterSection";

export const PhysicianCarePage = () => {
  return (
    <main>
      <PhysicianCareHeroSection />
      <PhysicianCareSecondSection />
      <PhysicianCareThirdSection />
      <PhysicianCareForthSection />
      <PhysicianCareFifthSection />
      <PhysicianCareFooterSection />
    </main>
  );
};
