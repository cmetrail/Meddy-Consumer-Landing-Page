import { MacroBar } from "./macro-bar";

const ROWS = [
  { label: "Protein", value: "9g", color: "#E09A2A" },
  { label: "Fat", value: "18g", color: "bg-theme-textSecondary" },
  { label: "Carbs", value: "32g", color: "bg-theme-accent" },
  { label: "Fiber", value: "32g", color: "#C084FC" },
  { label: "Saturated Fat", value: "9g", color: "#C084FC" },
  { label: "Sodium", value: "32mg", color: "#C084FC" },
];

export default function NutritionCard() {
  return (
    <div
      className="bg-white/10 flex flex-col gap-3 max-w-62.5  rounded-2xl p-3"
      style={{
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      <h1 className="leading-[150%] text-sm text-white font-bold">Nutrients</h1>
      <MacroBar
        items={[
          { key: "protein", label: "Protein", shortLabel: "P", percentage: 40, color: "#E09A2A" },
          { key: "fats", label: "Fats", shortLabel: "F", percentage: 30, color: "#8A8A82" },
          { key: "carbs", label: "Carbs", shortLabel: "C", percentage: 30, color: "#17925A" },
        ]}
      />
      <div className="flex flex-col gap-2">
        {ROWS.map((row) => (
          <div key={row.label} className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-1">
              <div
                className={`h-2 w-2 rounded-full ${
                  row.color.startsWith("bg-") ? row.color : ""
                }`}
                style={row.color.startsWith("#") ? { background: row.color } : undefined}
              ></div>
              <p className="text-[10px] leading-[150%] text-white font-medium">{row.label}</p>
            </div>
            <p className="text-[10px] leading-[150%] text-white font-medium">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
