import React from "react";
import CareHeroSection from "../components/sections/CareHeroSection";
import CareQuestionsSection from "../components/sections/CareQuestionsSection";
import CareHealthChangesSection from "../components/sections/CareHealthChangesSection";
import CareKnowsSection from "../components/sections/CareKnowsSection";
import CareAccessSection from "../components/sections/CareAccessSection";

export const CarePage = () => {
  return (
    <main>
      <CareHeroSection />
      <CareQuestionsSection />
      <CareHealthChangesSection />
      <CareKnowsSection />
      <CareAccessSection />
    </main>
  );
};
