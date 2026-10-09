import React from "react";
import PersonalizedHealthPlansHeroSection from "../components/sections/PersonalizedHealthPlansHeroSection";
import PersonalizedHealthPlansGoalsSection from "../components/sections/PersonalizedHealthPlansGoalsSection";
import PersonalizedHealthPlansOnePlanSection from "../components/sections/PersonalizedHealthPlansOnePlanSection";
import PersonalizedHealthPlansProgressSection from "../components/sections/PersonalizedHealthPlansProgressSection";
import PersonalizedHealthPlansPhysicianFaqSection from "../components/sections/PersonalizedHealthPlansPhysicianFaqSection";
import PersonalizedHealthPlansFooterSection from "../components/sections/PersonalizedHealthPlansFooterSection";

export const PersonalizedHealthPlansPage = () => {
  return (
    <main>
      <PersonalizedHealthPlansHeroSection />
      <PersonalizedHealthPlansGoalsSection />
      <PersonalizedHealthPlansOnePlanSection />
      <PersonalizedHealthPlansProgressSection />
      <PersonalizedHealthPlansPhysicianFaqSection />
      <PersonalizedHealthPlansFooterSection />
    </main>
  );
};
