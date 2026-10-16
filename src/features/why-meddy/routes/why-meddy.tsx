"use client";

import { useRef } from "react";
import { useWhyMeddyStory } from "../components/useWhyMeddyStory";
import styles from "./why-meddy.module.css";
import WhyMeddyHeroSection from "../components/sections/WhyMeddyHeroSection";
import WhyMeddySecondSection from "../components/sections/WhyMeddySecondSection";
import WhyMeddyThirdSection from "../components/sections/WhyMeddyThirdSection";
import WhyMeddyFourthSection from "../components/sections/WhyMeddyFourthSection";
import WhyMeddyFooterSection from "../components/sections/WhyMeddyFooter";

export const WhyMeddyPage = () => {
  const scope = useRef<HTMLElement>(null);
  useWhyMeddyStory(scope);

  return (
    <main ref={scope} className={styles.page}>
      <div data-why-progress className={styles.progress} aria-hidden="true" />
      <WhyMeddyHeroSection />
      <WhyMeddySecondSection />
      <WhyMeddyThirdSection />
      <WhyMeddyFourthSection />
      <WhyMeddyFooterSection/>
    </main>
  );
};
