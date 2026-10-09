import NutritionHeroSection from "../components/sections/NutritionHeroSection";
import NutritionStepsSection from "../components/sections/NutritionStepsSection";
import NutritionFaqSection from "../components/sections/NutritionFaqSection";
import NutritionFooterSection from "../components/sections/NutritionFooterSection";

export const NutritionPage = () => {
  return (
    <main>
      <NutritionHeroSection />
      <NutritionStepsSection />
      <NutritionFaqSection />
      <NutritionFooterSection />
    </main>
  );
};
