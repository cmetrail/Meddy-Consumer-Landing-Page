import React from "react";
import MedicationHeroSection from "../components/sections/MedicationHeroSection";
import MedicationTreatmentChangesSection from "../components/sections/MedicationTreatmentChangesSection";
import MedicationWholeResponseSection from "../components/sections/MedicationWholeResponseSection";
import MedicationConnectSection from "../components/sections/MedicationConnectSection";
import MedicationOrbitalSection from "../components/sections/MedicationOrbitalSection";
import MedicationFaqSection from "../components/sections/MedicationFaqSection";

export const MedicationPage = () => {
  return (
    <main>
      <MedicationHeroSection />
      <MedicationConnectSection />
      <MedicationTreatmentChangesSection />
      <MedicationWholeResponseSection />
      <MedicationOrbitalSection />
      <MedicationFaqSection />
    </main>
  );
};
