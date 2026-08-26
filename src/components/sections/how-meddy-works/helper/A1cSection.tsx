import ChartCard from "./ChartCard";
import GiantNumber from "./GiantNumber";
import Reveal from "./Reveal";

export default function A1cSection() {
  return (
    <div className="max-w-360 mx-auto px-6 lg:px-13 relative">
      <GiantNumber n="04" />
      <Reveal className="relative">
        <ChartCard
          titleA="A1c"
          titleB="· Semaglutide"
          subtitle="Health Insight Trend"
          lines={[
            { label: "A1c", color: "#F2A61A", points: "0,80 120,110 240,70 360,90 480,50 600,60" },
          ]}
          callouts={[
            { text: "A1c: 7.5", color: "rgba(242,166,26,0.4)" },
            { text: "A1c: 6.0", color: "rgba(62,174,28,0.4)" },
          ]}
        />
        <div className="mt-4 ml-auto w-fit rounded-xl bg-white/10 p-3">
          <p className="text-white/70" style={{ fontSize: 12 }}>Jan 4 · Semaglutide dose increased</p>
          <p className="text-[#3EAE1C] font-semibold" style={{ fontSize: 14 }}>1.7 mg → 2.4 mg</p>
        </div>
      </Reveal>
    </div>
  );
}
