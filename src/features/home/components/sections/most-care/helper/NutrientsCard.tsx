import { MacroBar } from "../../how-meddy-works/helper/macro-bar";

export default function NutrientsCard() {
  return (
    <div className="w-full rounded-[12px] border border-[#E2E2E2] bg-white p-4 shadow-[2.4px_3.6px_9.5px_rgba(0,0,0,0.2)]">
      <p className="text-[#111110] text-base font-semibold">Nutrients</p>

      <div className="mt-6">
        <MacroBar
          variant="light"
          items={[
            { key: "protein", label: "Protein", shortLabel: "P", percentage: 40, color: "#E09A2A" },
            { key: "fats", label: "Fats", shortLabel: "F", percentage: 30, color: "#8A8A82" },
            { key: "carbs", label: "Carbs", shortLabel: "C", percentage: 30, color: "#17925A" },
          ]}
        />
      </div>
    </div>
  );
}
