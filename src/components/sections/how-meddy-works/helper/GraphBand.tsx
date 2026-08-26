const CALLOUTS = [
  { text: "Sodium: 3400 mg", left: "27%", top: "18%", tone: "bad" },
  { text: "Bp: 138", left: "40%", top: "30%", tone: "bad" },
  { text: "Sodium: 2400 mg", left: "62%", top: "58%", tone: "good" },
  { text: "Bp: 130", left: "78%", top: "44%", tone: "good" },
];

export default function GraphBand() {
  return (
    <div className="relative w-full overflow-hidden py-14 lg:py-20">
      <div className="max-w-360 mx-auto px-6 lg:px-13">

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold" style={{ fontSize: 18 }}>Blood pressure</span>
            <span className="text-white/50 font-semibold" style={{ fontSize: 18 }}>· Sodium intake</span>
          </div>
          <p className="text-[#7A9B82] mt-1" style={{ fontSize: 13 }}>Nutrition threshold</p>
        </div>

        {/* Chart */}
        <div className="relative w-full" style={{ aspectRatio: "1440 / 360" }}>
          <svg
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="gb-good" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4DC87A" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#4DC87A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gb-bad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8FBF6A" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#8FBF6A" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* faint vertical grid */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1={i * 240} y1="0" x2={i * 240} y2="360" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}

            {/* Line A — brighter green */}
            <path
              d="M0,200 C160,120 300,90 460,150 S760,250 920,170 S1200,80 1440,140 L1440,360 L0,360 Z"
              fill="url(#gb-good)"
            />
            <path
              d="M0,200 C160,120 300,90 460,150 S760,250 920,170 S1200,80 1440,140"
              fill="none" stroke="#4DC87A" strokeWidth="3.5" strokeLinecap="round"
            />

            {/* Line B — muted green */}
            <path
              d="M0,250 C180,280 340,260 480,210 S780,140 940,220 S1220,280 1440,230 L1440,360 L0,360 Z"
              fill="url(#gb-bad)"
            />
            <path
              d="M0,250 C180,280 340,260 480,210 S780,140 940,220 S1220,280 1440,230"
              fill="none" stroke="#5C7A4A" strokeWidth="3.5" strokeLinecap="round"
            />
          </svg>

          {/* Callout pills */}
          {CALLOUTS.map((c) => (
            <span
              key={c.text}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 font-medium whitespace-nowrap backdrop-blur-sm"
              style={{
                left: c.left,
                top: c.top,
                fontSize: 12,
                color: "#fff",
                background: c.tone === "good" ? "rgba(23,98,43,0.55)" : "rgba(98,76,23,0.55)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {c.text}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: "#4DC87A" }} />
            <span className="text-white/70" style={{ fontSize: 13 }}>Blood pressure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: "#5C7A4A" }} />
            <span className="text-white/70" style={{ fontSize: 13 }}>Sodium intake</span>
          </div>
        </div>

      </div>
    </div>
  );
}
