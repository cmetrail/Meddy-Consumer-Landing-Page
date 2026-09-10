import Image from "next/image";

function A1cChart() {
  const grid = [16, 14, 12, 10, 8, 6, 4, 2, 0];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const line = "26.37,90.49 51.54,95.29 74.91,100.09 91.09,103.68 136.64,110.27 166.01,113.27";
  const dots = [
    [26.37, 90.49],
    [51.54, 95.29],
    [74.91, 100.09],
    [91.09, 103.68],
    [136.64, 110.27],
    [166.01, 113.27],
  ];
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 214 187" className="w-full">
        {/* horizontal grid lines */}
        {grid.map((g, i) => {
          const y = 23.38 + i * 16.48;
          return (
            <g key={g}>
              <line x1={26.37} y1={y} x2={200.17} y2={y} stroke="#1F1F21" strokeWidth={0.3} />
              <text x={4.8} y={y + 2.6} fontSize={6} fill="#8A8A82" fontFamily="Plus Jakarta Sans">
                {g}%
              </text>
            </g>
          );
        })}
        {/* dashed average */}
        <line x1={26.37} y1={40.38} x2={200.17} y2={40.38} stroke="#F2A61A" strokeWidth={0.6} strokeDasharray="3.6 2.4" />
        {/* trend line */}
        <polyline points={line} fill="none" stroke="#F2A61A" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.8} fill="#F2A61A" />
        ))}
      </svg>

      {/* Avg badge */}
      <div className="absolute left-[12%] top-[13%] rounded-[2px] bg-[#D98C0D] px-1.5 py-0.5">
        <span className="text-[6px] font-bold text-black">Avg: 14.3%</span>
      </div>

      {/* KPI tooltip */}
      <div className="absolute right-0 top-[42%] w-[28%] rounded-[5px] border border-[#1F1F21] bg-[#232324] px-1.5 py-1">
        <span className="text-[6px] text-[#999999]">KPI</span>
        <div className="mt-1 flex items-center gap-1">
          <span className="h-[5px] w-[5px] rounded-full bg-[#E09A2A]" />
          <span className="text-[6px] text-[#F4F4F5]">A1c: 12.8%</span>
        </div>
      </div>

      {/* months */}
      <div className="mt-0.5 flex justify-between pl-[12%]">
        {months.map((m, i) => (
          <span key={i} className="text-[6px] text-[#8A8A82]">{m}</span>
        ))}
      </div>
    </div>
  );
}

export default function A1cCard() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "435/377" }}>
      <div className="absolute right-0 top-0 h-full w-[60%]">
        <Image src="/home/most-care-a1c.png" alt="A1c" fill className="object-cover rounded-[11px]" />
      </div>
      <div className="absolute left-0 bottom-4 w-[56%] rounded-[7px] border border-[#E2E2E2] bg-white p-2">
        <p className="text-[9px] font-medium text-[#111110]">A1c Trend</p>
        <div className="mt-1">
          <A1cChart />
        </div>
      </div>
    </div>
  );
}
