import React from "react";
import WhyMeddyHeroSection from "../components/sections/WhyMeddyHeroSection";
import WhyMeddySecondSection from "../components/sections/WhyMeddySecondSection";
import WhyMeddyThirdSection from "../components/sections/WhyMeddyThirdSection";
import WhyMeddyFourthSection from "../components/sections/WhyMeddyFourthSection";
import WhyMeddyFooterSection from "../components/sections/WhyMeddyFooter";

export const WhyMeddyPage = () => {
  return (
    <main>
      <WhyMeddyHeroSection />
      <WhyMeddySecondSection />
      <WhyMeddyThirdSection />
      <WhyMeddyFourthSection />
      <WhyMeddyFooterSection/>
    </main>
  );
};
