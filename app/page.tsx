import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/problem";
import HowMeddyWorksSection from "@/components/sections/how-meddy-works";
import MostCareSection from "@/components/sections/most-care";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PhysicianRaySection from "@/components/sections/PhysicianRaySection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <HowMeddyWorksSection />
      <MostCareSection />
      <TestimonialsSection />
      <PhysicianRaySection />
      <FooterSection />
    </main>
  );
}
