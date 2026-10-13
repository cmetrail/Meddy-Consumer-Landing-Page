import React from "react";
import layoutStyles from "../CareLayout.module.css";
import CareHeroSection from "../components/sections/CareHeroSection";
import CareQuestionsSection from "../components/sections/CareQuestionsSection";
import CareHealthChangesSection from "../components/sections/CareHealthChangesSection";
import CareKnowsSection from "../components/sections/CareKnowsSection";
import CareAccessSection from "../components/sections/CareAccessSection";

export const CarePage = () => {
  return (
    <main className={layoutStyles.page}>
      <CareHeroSection />
      <CareQuestionsSection />
      <CareHealthChangesSection />
      <CareKnowsSection />
      <CareAccessSection />
    </main>
  );
};
