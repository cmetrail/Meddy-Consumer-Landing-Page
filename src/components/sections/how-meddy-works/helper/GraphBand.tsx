"use client";

// ─── Extracted from /public/Line.svg (viewBox 0 0 1440 634) ───────────────────
const W = 1440;
const H = 634;

// Exact bezier paths from Line.svg
const SOD_PATH =
  "M54.5 278.279C97.1397 229.928 176.5 269.781 302.607 327.218" +
  "C472.839 404.752 562.591 319.052 606.415 295.79" +
  "C792 197.28 1177.88 324.951 1319.5 494.784";

const BP_PATH =
  "M50.1953 240.521C94.6903 281.697 195.238 302.714 331 262.499" +
  "C528.5 203.997 558.235 291.074 645 345.78" +
  "C731.765 400.485 797.86 409.462 1018.5 374.78" +
  "C1203 345.78 1225.5 377.31 1324.5 483.78";

// Grid line y-coords from Line.svg (x spans 119.213 → 1389.803)
const GX1 = 119.213;
const GX2 = 1389.803;
const GYS = [182.287, 213.48, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716, 462.893, 494.069];

// Dot centres in SVG space (from ellipse transforms in Line.svg)
// W1 BP:  matrix(-1 0 0 1 462 228.003) + r=13.5 → cx=462-13.5=448.5, cy=228.003+13.5=241.503
// W1 Sod: matrix(-1 0 0 1 167 260.003) + r=6.5  → cx=160.5, cy=266.503
// W8 Sod: matrix(-1 0 0 1 1094 328.003)+ r=6.5  → cx=1087.5, cy=334.503
// W8 BP:  matrix(-1 0 0 1 1232 371.003)+ r=13.5 → cx=1218.5, cy=384.503
const DOTS = [
  { cx: 448.5,  cy: 241.503, rOuter: 13.5,  rInner: 10.5,  green: true,  filterId: "gbd-f0" },
  { cx: 160.5,  cy: 266.503, rOuter:  6.5,  rInner:  5.055, green: false, filterId: "gbd-f1" },
  { cx: 1087.5, cy: 334.503, rOuter:  6.5,  rInner:  5.055, green: false, filterId: "gbd-f2" },
  { cx: 1218.5, cy: 384.503, rOuter: 13.5,  rInner: 10.5,  green: true,  filterId: "gbd-f3" },
] as const;

// Card anchor positions as % of container (= SVG coord / viewBox dimension × 100)
// Derived from rect elements in Line.svg:
//   W1 Sod rect: x=98.5   y=192.503  → left=6.84%  top=30.37%
//   W1 BP  rect: x=393.5  y=157.503  → left=27.33% top=24.84%
//   W8 Sod rect: x=1025.5 y=260.503  → left=71.21% top=41.09%
//   W8 BP  rect: x=1163.5 y=300.503  → left=80.80% top=47.40%

function SodiumCard({ week, value }: { week: string; value: string }) {
  return (
    <div className="relative inline-block">
      <div
        style={{
          background: "rgba(248,250,248,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 10,
          padding: "7px 12px 8px",
          border: "1px solid rgba(255,255,255,0.9)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
          minWidth: 128,
        }}
      >
        <p style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", fontWeight: 500, marginBottom: 2, lineHeight: 1 }}>
          {week}
        </p>
        <p style={{ fontSize: 13, color: "#111", fontWeight: 600, lineHeight: 1.3 }}>
          Sodium: <strong style={{ fontWeight: 800 }}>{value}</strong>
          <span style={{ fontSize: 9, fontWeight: 400, color: "#777" }}> mg</span>
        </p>
      </div>
      <span
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -7, width: 0, height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderTop: "8px solid rgba(248,250,248,0.95)",
        }}
      />
    </div>
  );
}

function BpCard({ week, value }: { week: string; value: string }) {
  return (
    <div className="relative inline-block">
      <div
        style={{
          background: "rgba(10,26,12,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 10,
          padding: "7px 12px 8px",
          border: "1px solid #17925A",
          boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
          minWidth: 108,
        }}
      >
        <p style={{ fontSize: 10, color: "rgba(23,146,90,0.7)", fontWeight: 500, marginBottom: 2, lineHeight: 1 }}>
          {week}
        </p>
        <p style={{ fontSize: 16, color: "#17925A", fontWeight: 800, lineHeight: 1.2 }}>{value}</p>
      </div>
      <span
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -7, width: 0, height: 0,
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderTop: "8px solid rgba(10,26,12,0.95)",
        }}
      />
    </div>
  );
}

export default function GraphBand() {
  return (
    <div className="relative w-full overflow-hidden py-14 lg:py-20">
      {/* Draw-on animation keyframes */}
      <style>{`
        @keyframes gbd-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes gbd-fade {
          to { opacity: 1; }
        }
        .gbd-bp {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: gbd-draw 2.2s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;
        }
        .gbd-sod {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: gbd-draw 1.8s cubic-bezier(0.4,0,0.2,1) 0.5s forwards;
        }
        .gbd-dot {
          opacity: 0;
          animation: gbd-fade 0.4s ease 2.2s forwards;
        }
        .gbd-card {
          opacity: 0;
          animation: gbd-fade 0.5s ease 2.4s forwards;
        }
      `}</style>

      <div className="max-w-360 mx-auto px-6 lg:px-13">

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold" style={{ fontSize: 18 }}>Blood pressure</span>
            <span className="text-white/50 font-semibold" style={{ fontSize: 18 }}>• Sodium Intake</span>
          </div>
          <p style={{ fontSize: 13, color: "#7A9B82", marginTop: 4 }}>Nutrition threshold</p>
        </div>

        {/* Chart */}
        <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              {/* Blur/glow filters for dots — exact from Line.svg */}
              {[
                { id: "gbd-f0", x: 425.4,  y: 218.403, s: 46.2 },
                { id: "gbd-f1", x: 144.4,  y: 250.403, s: 32.2 },
                { id: "gbd-f2", x: 1071.4, y: 318.403, s: 32.2 },
                { id: "gbd-f3", x: 1195.4, y: 361.403, s: 46.2 },
              ].map((f) => (
                <filter
                  key={f.id}
                  id={f.id}
                  x={f.x} y={f.y} width={f.s} height={f.s}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="bg" />
                  <feBlend mode="normal" in="SourceGraphic" in2="bg" result="shape" />
                  <feGaussianBlur stdDeviation="4.8" result="blur" />
                </filter>
              ))}

              {/* Radial gradient — sodium line (white → transparent) */}
              <radialGradient
                id="gbd-sod-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-663.127 26.3921 -93.5053 -2452.47 699.205 270.867)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="0.812" stopColor="white" />
                <stop offset="0.951" stopColor="white" stopOpacity="0" />
              </radialGradient>

              {/* Radial gradient — BP line (bright green → dark green → transparent) */}
              <radialGradient
                id="gbd-bp-grad"
                cx="0" cy="0" r="1"
                gradientTransform="matrix(-662.976 -23.6202 66.1771 -1633.67 713.171 278.591)"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#61D253" />
                <stop offset="0.687" stopColor="#4C8935" />
                <stop offset="0.951" stopColor="#57A832" stopOpacity="0" />
              </radialGradient>

              {/* Dot fill gradients */}
              <radialGradient id="gbd-green-dot" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466)">
                <stop offset="0.016" stopColor="#68AD75" />
                <stop offset="1" stopColor="#17622B" />
              </radialGradient>
              <radialGradient id="gbd-red-dot" cx="0" cy="0" r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(5.05548 5.05551) rotate(87.3975) scale(6.18534)">
                <stop offset="0.016" stopColor="#AD8068" />
                <stop offset="1" stopColor="#621717" />
              </radialGradient>
            </defs>

            {/* Grid lines — exact y-coords from Line.svg */}
            <g opacity="0.2">
              {GYS.map((y) => (
                <line
                  key={y}
                  x1={GX1} y1={y} x2={GX2} y2={y}
                  stroke="#E7E7E7" strokeWidth="0.784314"
                />
              ))}
            </g>

            {/* Sodium line — thin, white radial gradient, draws in */}
            <path
              d={SOD_PATH}
              stroke="url(#gbd-sod-grad)"
              strokeWidth="1.003"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="gbd-sod"
            />

            {/* BP line — thick, green radial gradient, draws in first */}
            <path
              d={BP_PATH}
              stroke="url(#gbd-bp-grad)"
              strokeWidth="10.03"
              fill="none"
              strokeLinecap="round"
              pathLength="1"
              className="gbd-bp"
            />

            {/* Dots — fade in after lines finish drawing */}
            {DOTS.map((d) => (
              <g key={d.filterId} className="gbd-dot">
                {/* Outer glow blob */}
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={d.rOuter} ry={d.rOuter}
                  fill={d.green ? "#55C272" : "#C26E55"}
                  filter={`url(#${d.filterId})`}
                />
                {/* Inner filled dot */}
                <ellipse
                  cx={d.cx} cy={d.cy}
                  rx={d.rInner} ry={d.rInner}
                  fill={d.green ? "url(#gbd-green-dot)" : "url(#gbd-red-dot)"}
                />
              </g>
            ))}
          </svg>

          {/* HTML callout cards — % positions match SVG rect coords exactly */}
          <div className="gbd-card absolute" style={{ left: "6.84%", top: "30.37%" }}>
            <SodiumCard week="Week  1" value="3400" />
          </div>
          <div className="gbd-card absolute" style={{ left: "27.33%", top: "24.84%" }}>
            <BpCard week="Week  1" value="BP:138" />
          </div>
          <div className="gbd-card absolute" style={{ left: "71.21%", top: "41.09%" }}>
            <SodiumCard week="Week  8" value="2400" />
          </div>
          <div className="gbd-card absolute" style={{ left: "80.80%", top: "47.40%" }}>
            <BpCard week="Week  8" value="BP:130" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: "#4DC87A" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Blood pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: "#C85858" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Sodium Intake</span>
          </div>
        </div>

      </div>
    </div>
  );
}
