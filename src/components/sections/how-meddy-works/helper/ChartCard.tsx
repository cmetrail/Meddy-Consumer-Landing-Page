export type Line = {
  label: string;
  color: string;
  points: string;
};

export default function ChartCard({
  titleA,
  titleB,
  subtitle,
  lines,
  callouts,
}: {
  titleA: string;
  titleB: string;
  subtitle: string;
  lines: Line[];
  callouts: { text: string; emphasis?: boolean; color?: string }[];
}) {
  return (
    <div className="relative rounded-[25px] border border-white/10 bg-white/[0.03] p-8 lg:p-12 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-white font-medium" style={{ fontSize: 20 }}>{titleA}</span>
            <span className="text-white font-medium opacity-70" style={{ fontSize: 20 }}>{titleB}</span>
          </div>
          <p className="text-[#E7E7E7] font-medium mt-1" style={{ fontSize: 14 }}>{subtitle}</p>
        </div>
        <div className="flex items-center gap-5">
          {lines.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
              <span className="text-white/80" style={{ fontSize: 13 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 h-56 w-full overflow-hidden">
        <svg viewBox="0 0 600 220" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            {lines.map((l, i) => (
              <linearGradient key={i} id={`line-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={l.color} stopOpacity="0.35" />
                <stop offset="100%" stopColor={l.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {lines.map((l, i) => (
            <polygon key={i} points={`0,220 ${l.points} 600,220`} fill={`url(#line-fill-${i})`} />
          ))}
          {lines.map((l, i) => (
            <polyline
              key={i}
              points={l.points}
              fill="none"
              stroke={l.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={i * 200} y1="0" x2={i * 200} y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {callouts.map((c) => (
          <span
            key={c.text}
            className="rounded-full px-4 py-1.5 font-medium"
            style={{
              fontSize: 13,
              background: c.color ? c.color : "rgba(255,255,255,0.08)",
              color: c.emphasis ? "#E1FF8D" : "#FFFFFF",
            }}
          >
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}
