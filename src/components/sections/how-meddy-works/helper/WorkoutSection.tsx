import ChartCard from "./ChartCard";
import FeatureCopy from "./FeatureCopy";
import FeatureRow from "./FeatureRow";
import Photo from "./Photo";

export default function WorkoutSection() {
  return (
    <FeatureRow
      number="02"
      reverse
      chart={
        <ChartCard
          titleA="Body Weight"
          titleB="· HR Zone 3 Minutes"
          subtitle="Fitness Trend"
          lines={[
            { label: "Intensity", color: "#17622B", points: "0,180 100,160 200,170 300,120 400,140 500,80 600,100" },
            { label: "Body Weight", color: "#621717", points: "0,120 100,130 200,110 300,125 400,95 500,105 600,70" },
          ]}
          callouts={[
            { text: "Weight: 185 lb", color: "rgba(98,23,23,0.6)" },
            { text: "Weight: 170 lb", color: "rgba(23,98,43,0.6)" },
            { text: "min: 128", color: "rgba(255,255,255,0.08)" },
          ]}
        />
      }
      content={
        <>
          <FeatureCopy
            eyebrow="Workouts"
            headline="Train with a plan your doctor can actually see."
            accent="doctor can actually see."
            sub="Save workouts and track progress — so your physician knows what's working, not just what you weigh."
          />
          <div className="mt-10 relative h-[520px] lg:h-[640px]">
            <Photo src="/home/workout-photo.png" alt="Workout tracking" className="h-full w-full" />
            <div className="absolute right-0 top-8 w-[300px] rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <p className="text-white font-semibold" style={{ fontSize: 16 }}>01:30:33</p>
              <p className="text-white/60" style={{ fontSize: 12 }}>Total Workout Time</p>
              <div className="mt-3 h-px bg-white/10" />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-white/80" style={{ fontSize: 13 }}>Workouts done</span>
                <span className="text-[#6EE7A0]" style={{ fontSize: 13 }}>14/15</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-white/80" style={{ fontSize: 13 }}>Calories Burned</span>
                <span className="text-white" style={{ fontSize: 13 }}>500 Kcal</span>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
