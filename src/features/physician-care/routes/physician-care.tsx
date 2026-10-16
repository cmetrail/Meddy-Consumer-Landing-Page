import PhysicianCareStory from "../components/PhysicianCareStory";
import PhysicianCareHeroSection from "../components/sections/PhysicianCareHeroSection";
import PhysicianCareSecondSection from "../components/sections/PhysicianCareSecondSection";
import PhysicianCareNewThirdSection from "../components/sections/PhysicianCareNewThirdSection";
import PhysicianCareJourneySection from "../components/sections/PhysicianCareJourneySection";
import PhysicianCareProfileSection from "../components/sections/PhysicianCareProfileSection";
import PhysicianCareAllIncludedSection from "../components/sections/PhysicianCareAllIncludedSection";
import PhysicianCareFooterSection from "../components/sections/PhysicianCareFooterSection";
import PhysicianCareFAQSection from "../components/sections/PhysicianCareFAQSection";

export const PhysicianCarePage = () => {
  return (
    <PhysicianCareStory>
      <PhysicianCareHeroSection />
      <PhysicianCareSecondSection />
      <PhysicianCareNewThirdSection />
      <PhysicianCareProfileSection />
      <PhysicianCareJourneySection />
      <PhysicianCareAllIncludedSection />
      <PhysicianCareFAQSection />
      <PhysicianCareFooterSection />
    </PhysicianCareStory>
  );
};
