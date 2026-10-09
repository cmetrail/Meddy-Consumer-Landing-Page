import PersonalizedHealthPlansPhysicianSection from "./PersonalizedHealthPlansPhysicianSection";
import PersonalizedHealthPlansFaqSection from "./PersonalizedHealthPlansFaqSection";

// One section for the Physician + FAQ pair (Figma node 12613:16047): the physician photo fades into the FAQ's pale top band and a
// cloud bank sits across the seam, so the two have to share a surface. Clouds / full-bleed fade overhang between the two blocks.
export default function PersonalizedHealthPlansPhysicianFaqSection() {
  return (
    <section className="relative w-full overflow-x-clip">
      <PersonalizedHealthPlansPhysicianSection />
      <PersonalizedHealthPlansFaqSection />
    </section>
  );
}
