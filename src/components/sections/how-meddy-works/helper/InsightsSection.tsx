import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function InsightsSection() {
  return (
    <div className="max-w-360 mx-auto px-6 lg:px-13 relative">
      <GiantNumber n="05" />
      <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal>
          <FeatureCopy
            eyebrow="Health Insights"
            headline={["Know what's actually moving your health."]}
            accent="moving your health."
            sub="See how changes affect your results — and which habits are driving them."
          />
          <div className="mt-10 flex gap-4">
            <div className="flex-1 rounded-xl bg-white/10 p-4">
              <p className="text-white/70" style={{ fontSize: 12 }}>Net Calories</p>
              <p className="text-white font-bold" style={{ fontSize: 20 }}>235 kcal <span className="text-[#6EE7A0] text-sm">(−20%)</span></p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between"><span className="text-white/70" style={{ fontSize: 12 }}>Intake</span><span className="text-white" style={{ fontSize: 12 }}>235 kcal (+20%)</span></div>
                <div className="flex justify-between"><span className="text-white/70" style={{ fontSize: 12 }}>Burn</span><span className="text-white" style={{ fontSize: 12 }}>235 kcal</span></div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-white/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70" style={{ fontSize: 12 }}>KPI A1c</span>
                <span className="rounded-full bg-[#D98C0D]/30 px-2 py-0.5 text-[#F2A61A]" style={{ fontSize: 11 }}>12.8%</span>
              </div>
              <svg viewBox="0 0 200 80" className="mt-2 h-20 w-full" preserveAspectRatio="none">
                <polyline points="0,60 30,55 60,40 90,50 120,30 150,35 200,15" fill="none" stroke="#F2A61A" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="flex justify-between text-white/50" style={{ fontSize: 10 }}>
                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="relative h-[520px] lg:h-[640px]">
          <Photo src="/home/insights-photo.png" alt="Health insights" className="h-full w-full" />
        </Reveal>
      </div>
    </div>
  );
}
