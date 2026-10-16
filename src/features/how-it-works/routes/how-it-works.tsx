"use client";

import { useRef } from "react";
import { useHowItWorksStory } from "../components/useHowItWorksStory";
import HowItWorksHeroSection from "../components/sections/HowItWorksHeroSection";
import HowItWorksTrackYourDaySection from "../components/sections/HowItWorksTrackYourDaySection";
import HowItWorksSignalSection from "../components/sections/HowItWorksSignalSection";
import HowItWorksPhysicianPlanSection from "../components/sections/HowItWorksPhysicianPlanSection";
import HowItWorksInsightsSection from "../components/sections/HowItWorksInsightsSection";
import HowItWorksProgressSection from "../components/sections/HowItWorksProgressSection";
import HowItWorksFooterSection from "../components/sections/HowItWorksFooterSection";
import styles from "./how-it-works.module.css";

export const HowItWorksPage = () => {
  const pageRef = useRef<HTMLElement>(null);
  useHowItWorksStory(pageRef);

  return (
    <main ref={pageRef} className={styles.page}>
      <HowItWorksHeroSection />
      <HowItWorksTrackYourDaySection />
      <HowItWorksSignalSection />
      <HowItWorksInsightsSection />
      <HowItWorksPhysicianPlanSection />
      <HowItWorksProgressSection />
      <HowItWorksFooterSection />
    </main>
  );
};
