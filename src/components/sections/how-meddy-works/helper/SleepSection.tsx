import ChartCard from "./ChartCard";
import FeatureCopy from "./FeatureCopy";
import FeatureRow from "./FeatureRow";
import Photo from "./Photo";

export default function SleepSection() {
  return (
    <FeatureRow
      number="03"
      chart={
        <ChartCard
          titleA="Deep Sleep"
          titleB="· Caffeine Intake"
          subtitle="Sleep Trend"
          lines={[
            { label: "Deep Sleep", color: "#191762", points: "0,160 100,150 200,120 300,140 400,90 500,110 600,80" },
            { label: "Caffeine", color: "#621717", points: "0,80 100,100 200,90 300,60 400,110 500,70 600,90" },
          ]}
          callouts={[
            { text: "Deep Sleep: 18%", color: "rgba(25,23,98,0.6)" },
            { text: "Deep Sleep: 14%", color: "rgba(25,23,98,0.6)" },
            { text: "Caffeine: 172 mg", color: "rgba(98,23,23,0.6)" },
          ]}
        />
      }
      content={
        <>
          <FeatureCopy
            eyebrow="Sleep Monitoring"
            headline="Track your sleep. See how it affects your recovery, performance, and health."
            accent="recovery, performance, and health."
            sub="Scores your sleep. Never connects it to your training load, caloric deficit, or HRV dip."
          />
          <div className="mt-10 relative h-[520px] lg:h-[640px]">
            <Photo src="/home/sleep-photo.png" alt="Sleep monitoring" className="h-full w-full" />
            <div className="absolute left-0 top-10 w-[260px] rounded-2xl bg-[#0f1d16] p-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70" style={{ fontSize: 13 }}>Score</span>
                <span className="rounded-full bg-[#57E6FF]/20 px-2 py-0.5 text-[#57E6FF]" style={{ fontSize: 11 }}>Very Stable</span>
              </div>
              <p className="mt-1 text-white font-bold" style={{ fontSize: 28 }}>93%</p>
              <div className="mt-3 flex items-end gap-1" style={{ height: 40 }}>
                {[40, 60, 35, 55, 70, 45, 65, 50, 75, 55, 40, 60, 70, 50, 65].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-[#4DC1FF]/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
