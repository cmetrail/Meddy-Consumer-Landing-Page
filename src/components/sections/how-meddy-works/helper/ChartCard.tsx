"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export type Series = {
  label: string;
  color: string;
  dataKey: string;
};

export default function ChartCard({
  titleA,
  titleB,
  subtitle,
  series,
  data,
  callouts,
}: {
  titleA: string;
  titleB: string;
  subtitle: string;
  series: Series[];
  data: Record<string, string | number>[];
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
          {series.map((s) => (
            <div key={s.dataKey} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              <span className="text-white/80" style={{ fontSize: 13 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.dataKey} id={`chart-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="label" tick={false} axisLine={false} tickLine={false} />
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <CartesianGrid vertical horizontal={false} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            {series.map((s, i) => (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={`url(#chart-fill-${i})`}
                dot={false}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
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
