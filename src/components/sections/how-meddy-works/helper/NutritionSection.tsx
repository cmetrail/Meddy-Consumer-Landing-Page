import Image from "next/image";
import GraphBand from "./GraphBand";
import FeatureCopy from "./FeatureCopy";
import GiantNumber from "./GiantNumber";
import Reveal from "./Reveal";

export default function NutritionSection() {
  return (
    <div>
      {/* Full-width graph band */}
      <Reveal>
        <GraphBand />
      </Reveal>

      {/* Nutrition — text left, salad right */}
      <div className="max-w-360 mx-auto px-6 lg:px-13 relative mt-16 lg:mt-24">
        <GiantNumber n="01" />
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <Reveal>
            <FeatureCopy
              eyebrow="Nutrition Intelligence"
              headline="Eat smarter, and give your doctor something to work with."
              accent="something to work with."
              sub="Log meals in seconds. Every entry feeds the nutrition picture your physician uses to guide your care."
            />
          </Reveal>

          <Reveal>
            <div className="relative h-[520px] lg:h-[600px]">
              <Image
                src="/home/nutrition-photo.png"
                alt="Nutrition tracking"
                fill
                className="object-contain"
              />

              {/* meal card — top right */}
              <div className="absolute right-0 top-4 w-[260px] rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/10 z-10">
                <p className="text-white font-semibold" style={{ fontSize: 15 }}>
                  Breakfast <span className="opacity-70">· 580 kcal</span>
                </p>
                {[
                  { name: "Iced Lemon Water", kcal: "180 kcal" },
                  { name: "Side Salad", kcal: "400 kcal" },
                ].map((m) => (
                  <div key={m.name} className="mt-3 flex items-center justify-between">
                    <span className="text-white/90" style={{ fontSize: 13 }}>{m.name}</span>
                    <span className="text-white/70" style={{ fontSize: 12 }}>{m.kcal}</span>
                  </div>
                ))}
                <div className="mt-4 flex gap-2">
                  {["40g", "30g", "6g"].map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-white/80" style={{ fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* nutrients card — left center */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[220px] rounded-2xl bg-[#0f1d16]/90 p-4 backdrop-blur-md border border-white/10 z-10">
                <p className="text-white font-semibold" style={{ fontSize: 14 }}>Nutrients</p>
                {[
                  { label: "Protein", pct: 40, color: "#E09A2A" },
                  { label: "Fat", pct: 30, color: "#8A8A82" },
                  { label: "Carbs", pct: 30, color: "#17925A" },
                ].map((n) => (
                  <div key={n.label} className="mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80" style={{ fontSize: 12 }}>{n.label}</span>
                      <span className="text-white/60" style={{ fontSize: 11 }}>{n.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{ width: `${n.pct}%`, background: n.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  );
}
