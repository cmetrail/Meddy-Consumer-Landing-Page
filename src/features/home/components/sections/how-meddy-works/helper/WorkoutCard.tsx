import Image from "next/image";

const STATS = [
  { icon: "/home/time.svg", value: "01:30:33", label: "Total Workout Time", valueSuffix: null },
  { icon: "/home/workout.svg", value: "14 / 15", label: "Workouts done", valueSuffix: null },
  { icon: "/home/workout-burned.svg", value: "500", label: "Calories Burned", valueSuffix: "Kcal" },
];

export default function WorkoutCard() {
  return (
    <div
      className=" flex flex-row rounded-2xl px-3 py-3"
      style={{
        backdropFilter: "blur(14px)",
        backgroundColor:"rgba(255,255,255,0.04)",
        border: "0.75px solid #FFFFFF1A",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      {STATS.map((stat, i) => (
        <div key={stat.label} className="flex flex-1 items-stretch">
          {i > 0 && <div className="w-px bg-white mx-4 self-stretch" />}
          <div className="flex flex-col gap-1 flex-1">
            <Image src={stat.icon} alt="" width={22} height={22} />
            <div className="flex items-baseline text-lg gap-1 mt-1">
              <p className="text-white font-bold leading-tight">{stat.value}</p>
              {stat.valueSuffix && (
                <span className="text-white font-normal ">{stat.valueSuffix}</span>
              )}
            </div>
            <p className="text-white text-[10px] leading-tight">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
