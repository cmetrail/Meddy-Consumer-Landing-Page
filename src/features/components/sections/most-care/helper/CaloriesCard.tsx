import {
  Flame,
  Footprints,
  Activity,
} from "lucide-react";

export default function CaloriesCard() {
  const stats = [
    { icon: Footprints, label: "Steps", value: "6,842" },
    { icon: Flame, label: "Burned", value: "320" },
    { icon: Activity, label: "Net", value: "920" },
  ];
  return (
    <div
      className="relative w-full overflow-hidden rounded-[10px] shadow-[6px_8px_8px_rgba(0,0,0,0.2)]"
      style={{ background: "linear-gradient(150deg, #1A3D2B 7.74%, #1E4A33 50%, #163322 92.26%)" }}
    >
      {/* glow */}
      <div className="absolute -top-[53px] -right-[46px] h-[168px] w-[168px] rounded-full bg-[#17925A] blur-[75px]" />

      {/* header */}
      <div className="relative flex items-start justify-between px-6 pt-6">
        <div>
          <p className="text-[#6EE7A0] text-[10px] uppercase">Calories today</p>
          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-white text-[48px] font-medium leading-none tracking-[-0.015em]">1,240</span>
            <span className="pb-1 text-white text-xs font-semibold">kcal</span>
          </div>
        </div>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[13px] border border-[#17925A]/22 bg-[#17925A]/12">
          <Flame size={17} className="text-[#00D48C]" />
        </div>
      </div>

      {/* divider + stats */}
      <div className="relative mt-4 border-t border-white/5">
        <div className="grid grid-cols-3">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 px-6 py-4"
              style={{
                background: i === 2 ? "rgba(255,255,255,0.05)" : undefined,
                borderLeft: i === 2 ? "1px solid rgba(0,0,0,0.07)" : undefined,
                borderRight:
                  i < 2
                    ? i === 0
                      ? "1px solid rgba(244,244,245,0.07)"
                      : "1px solid rgba(255,255,255,0.05)"
                    : undefined,
              }}
            >
              <div className="flex items-center gap-1.5">
                <Icon size={13} className="text-white" />
                <span className="text-white text-[10px]">{label}</span>
              </div>
              <span className="text-white text-[18px] font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
