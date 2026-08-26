import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import clsx from "clsx"
function Trend({ value, direction }: { value: string; direction: "up" | "down" }) {
  return (
    <span className={`flex items-center gap-0.5 text-[8px] font-medium ${direction === "up" ? "text-[#6EE7A0]" : "text-[#F87171]"}`}>
      {direction === "up" ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {value}
    </span>
  );
}

function StatCell({ label, value, trend, className }: { label: string; value: string; trend?: { value: string; direction: "up" | "down" }, className?: string }) {
  return (
    <div className={clsx("rounded-xl bg-[#F8F8F8]/10 p-3 border-[0.1px] border-white flex flex-col gap-1", className)}>
      <p className="text-white text-[9px] leading-[150%]">{label}</p>
      <div className="flex flex-row items-baseline gap-1.5">
        <p className="text-white whitespace-nowrap font-bold text-[13px] leading-[150%]">{value}</p>
        {trend && <Trend value={trend.value} direction={trend.direction} />}
      </div>
    </div>
  );
}

export default function WorkoutStatsCard() {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-4"
      style={{

        backdropFilter: "blur(14px)",
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "0.1px solid rgba(255,255,255,1)",
        boxShadow: "0px 0.75px 2.25px 0px #0000000D, 0px 1.5px 9px 0px #00000014",
      }}
    >
      {/* Header */}
      <div>
        <p className="text-[#D8D8D8] text-[9px] mb-1">Total Duration</p>
        <div className="flex items-baseline gap-2">
          <p className="text-white font-bold text-2xl leading-tight">210 <span className="text-[#D8D8D8]">mins</span></p>
          <span className="flex items-center gap-0.5  text-[10px] font-semibold text-[#F87171]">
            <TrendingDown size={10} />
            -2%
          </span>
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-2 gap-2">
        <StatCell label="Session Days" value="3" trend={{ value: "-2", direction: "down" }} />
        <StatCell label="Average HR" value="142 bpm" trend={{ value: "-2%", direction: "down" }} />
      </div>

      {/* Row 2 */}
      <div className="flex flex-row gap-2 overflow-hidden">
        <StatCell label="Avg. Pace" value="6 min/mi" className="w-28.75" trend={{ value: "+1%", direction: "up" }} />
        <StatCell label="Avg. Incline" value="3.5 %" className="w-28.75" trend={{ value: "-2%", direction: "down" }} />
        <StatCell label="Distance" value="3 kms" className="w-28.75" />
      </div>
    </div>
  );
}
