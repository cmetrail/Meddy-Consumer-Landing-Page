import Image from "next/image";

// Figma node 11274:1266 "Desktop - 359" (1440 x ~1360) — static light section.
// Scaled by width only so it keeps its natural aspect ratio:
//   --u = min(100vw, 1440px) / 1440
const u = (n: number) => `calc(${n} * var(--u))`;

const grad = (deg: number) =>
  `linear-gradient(${deg}deg, rgb(227, 239, 223) 28.962%, rgb(246, 244, 237) 42.836%, rgb(246, 244, 237) 63.859%, rgb(240, 230, 207) 100.98%)`;
const CARD_BG = grad(155);
const CARD_BORDER = "1px solid #46524B";

// NB: the global reset zeroes inline padding, so padding goes through classes + vars
const PAD_PILL = "px-[var(--px)] py-[var(--py)]";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[31px] border border-[#6E7A72] ${PAD_PILL}`}
      style={{ ["--px" as string]: u(10), ["--py" as string]: u(5) }}
    >
      <span className="leading-[normal] text-[#6E7A72]" style={{ fontSize: `max(10px, ${u(14)})` }}>
        {children}
      </span>
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="comprehensive-serif italic leading-[normal] text-[#46524B]" style={{ fontSize: `max(26px, ${u(46)})` }}>
      {children}
    </span>
  );
}

function Number({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-[var(--px)] leading-[normal] text-[#A1AAA3]" style={{ fontSize: `max(16px, ${u(24)})`, ["--px" as string]: u(2) }}>
      {children}
    </span>
  );
}

/** glass card shell, absolutely placed on the 1440 frame */
function Card({ x, y, w, deg, className = "", children }: { x: number; y: number; w?: number; deg: number; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`absolute border border-[#46524B] p-[var(--cp)] ${className}`}
      style={{ left: u(x), top: u(y), width: w ? u(w) : undefined, background: grad(deg), borderRadius: u(10), ["--cp" as string]: u(15) }}
    >
      {children}
    </div>
  );
}

// mobile helpers: 1 Figma px = var(--m)
const m = (n: number) => `calc(${n} * var(--m))`;

function MCard({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return (
    <div
      className="absolute flex items-start border-solid border-[#46524B] p-[var(--cp)]"
      style={{ background: CARD_BG, ["--cp" as string]: style.padding, ...style, padding: undefined } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
const MNum = ({ children }: { children: string }) => (
  <span className="leading-[normal] text-[#A1AAA3]" style={{ fontSize: m(16), paddingLeft: 0 }}>{children}</span>
);
const MTitle = ({ children }: { children: string }) => (
  <span className="comprehensive-serif italic leading-[normal] text-[#46524B]" style={{ fontSize: m(18.6) }}>{children}</span>
);
function MPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[22px] border-[0.7px] border-solid border-[#6E7A72] px-[var(--px)] py-[var(--py)]" style={{ ["--px" as string]: m(8), ["--py" as string]: m(4) }}>
      <span className="leading-[normal] text-[#6E7A72]" style={{ fontSize: m(12) }}>{children}</span>
    </span>
  );
}
function MImg({ src, w, h, style, crop }: { src: string; w: number; h: number; style: React.CSSProperties; crop?: React.CSSProperties }) {
  return (
    <div className="relative shrink-0 overflow-hidden" style={style}>
      <Image src={`/medication/connect/${src}`} alt="" width={w} height={h} sizes="200px" className={crop ? "absolute max-w-none" : "h-full w-full object-cover"} style={crop} />
    </div>
  );
}

export default function MedicationConnectSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#FFFEF2]"
      style={{ ["--u" as string]: "calc(min(100vw, 1440px) * 0.000694444)" }}
    >
      {/* Desktop (lg+) — Figma node 11274:1266 (1440 x 1550) absolute layout */}
      <div className="relative mx-auto hidden max-w-360 lg:block" style={{ height: u(1550) }}>
        {/* Connector lines (drawn under the cards) */}
        <div className="absolute" style={{ left: u(512), top: u(456), width: u(595), height: u(114) }}>
          <Image src="/medication/connect/d-line-1.svg" alt="" width={608} height={127} unoptimized className="absolute max-w-none" style={{ left: "-1.12%", top: "-5.85%", width: "102.24%", height: "111.7%" }} />
        </div>
        <div className="absolute" style={{ left: u(306), top: u(676), width: u(536), height: u(181), transform: "scaleX(-1)" }}>
          <Image src="/medication/connect/d-line-2.svg" alt="" width={549} height={194} unoptimized className="absolute max-w-none" style={{ left: "-1.24%", top: "-3.68%", width: "102.48%", height: "107.36%" }} />
        </div>

        {/* Heading (left) */}
        <div className="absolute flex flex-col leading-[normal]" style={{ left: u(75), top: u(74) }}>
          <span className="whitespace-nowrap text-[#A1AAA3]" style={{ fontSize: `max(22px, ${u(36)})` }}>Keep your medications</span>
          <span className="comprehensive-serif whitespace-nowrap italic text-[#46524B]" style={{ fontSize: `max(24px, ${u(38)})` }}>
            connected to your care.
          </span>
        </div>

        {/* Statement (right) */}
        <div className="absolute flex flex-col uppercase leading-[normal]" style={{ left: u(800), top: u(189), width: u(565), gap: u(10), fontSize: `max(20px, ${u(36)})` }}>
          <span className="text-right text-[#A1AAA3]">One place to understand</span>
          <span className="whitespace-nowrap font-medium italic text-[#6E7A72]">what you&apos;re taking and why.</span>
        </div>

        {/* Card 01 — Vitamin D */}
        <Card x={75} y={355} deg={156.85}>
          <div className="flex items-start" style={{ gap: u(47) }}>
            <div className="flex flex-col" style={{ width: u(234) }}>
              <Number>01</Number>
              <div className="flex flex-col" style={{ gap: u(9) }}>
                <CardTitle>Vitamin D</CardTitle>
                <div className="flex flex-wrap" style={{ gap: u(5) }}>
                  <Pill>50,000 IU</Pill>
                  <Pill>Once Weekly</Pill>
                  <Pill>Oral</Pill>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 overflow-hidden" style={{ width: u(118), height: u(110), borderRadius: u(5) }}>
              <Image src="/medication/connect/d-card-01.png" alt="" fill sizes="240px" className="object-cover" />
            </div>
          </div>
        </Card>

        {/* Card 02 — Why you're taking it */}
        <Card x={848} y={576} w={517} deg={157.22}>
          <div className="flex items-start justify-between">
            <div className="flex flex-col" style={{ width: u(344), gap: u(5) }}>
              <Number>02</Number>
              <div className="flex flex-col" style={{ gap: u(9) }}>
                <CardTitle>Why you&apos;re taking it</CardTitle>
                <div className="flex flex-wrap" style={{ gap: u(5) }}>
                  <Pill>Type II Diabetes</Pill>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 overflow-hidden" style={{ width: u(118), height: u(110), borderRadius: u(5) }}>
              <Image src="/medication/connect/d-card-02.png" alt="" width={736} height={1104} sizes="240px" className="absolute max-w-none" style={{ left: 0, top: "-61%", width: "100%", height: "160.91%" }} />
            </div>
          </div>
        </Card>

        {/* Card 03 — What we're following */}
        <Card x={75} y={863} w={519} deg={139.49}>
          <div className="flex flex-col" style={{ gap: u(34) }}>
            <div className="relative overflow-hidden" style={{ height: u(234), borderRadius: u(5) }}>
              <Image src="/medication/connect/d-card-03.png" alt="" width={1057} height={670} sizes="520px" className="absolute max-w-none" style={{ left: 0, top: "-0.18%", width: "100%", height: "131.92%" }} />
            </div>
            <div className="flex flex-col" style={{ gap: u(20) }}>
              <div className="flex flex-col">
                <Number>03</Number>
                <CardTitle>What we&apos;re following</CardTitle>
              </div>
              <div className="flex flex-col" style={{ gap: u(10) }}>
                <div className="flex" style={{ gap: u(5) }}>
                  <Pill>Fasting Blood Glucose</Pill>
                  <Pill>A1c</Pill>
                </div>
                <div className="flex" style={{ gap: u(5) }}>
                  <Pill>Post Prandial Glucose</Pill>
                  <Pill>Vitamin D Levels</Pill>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Closing note */}
        <div className="absolute flex items-center justify-end" style={{ left: u(828), top: u(1253), gap: u(8) }}>
          <span className="whitespace-pre text-right uppercase leading-[normal] text-[#6E7A72]" style={{ fontSize: `max(20px, ${u(36)})` }}>
            {"Your physician sees the \nsame connected picture."}
          </span>
          <Image src="/medication/connect/d-bar.svg" alt="" width={12} height={90} unoptimized style={{ width: u(12), height: u(90), transform: "scaleY(-1)" }} />
        </div>
      </div>

      {/* Mobile / tablet (<lg) — Figma node 12306:29654 (402 wide); 1 design px = --m */}
      <div
        className="mx-auto flex max-w-[500px] flex-col items-center px-[var(--p20)] py-[var(--p64)] lg:hidden"
        style={{ ["--m" as string]: "calc(min(100vw, 500px) / 402)", ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(32) } as React.CSSProperties}
      >
        {/* Heading */}
        <div className="flex flex-col items-center whitespace-nowrap text-center leading-[normal]" style={{ gap: m(16) }}>
          <div className="flex flex-col items-center">
            <span className="text-[#A1AAA3]" style={{ fontSize: m(24) }}>Keep your medications</span>
            <span className="comprehensive-serif italic text-[#46524B]" style={{ fontSize: m(32) }}>connected to your care.</span>
          </div>
          <div className="flex flex-col items-center uppercase" style={{ gap: m(5), fontSize: m(16) }}>
            <span className="text-[#A1AAA3]">One place to understand</span>
            <span className="font-medium italic text-[#6E7A72]">what you&apos;re taking and why.</span>
          </div>
        </div>

        {/* Diagram: three cards joined by two connector lines */}
        <div className="relative" style={{ width: m(364), height: m(538.6) }}>
          <div className="absolute" style={{ left: m(272), top: m(70.5), width: m(60), height: m(101) }}>
            <Image src="/medication/connect/m-line-1.svg" alt="" width={71} height={112} unoptimized className="absolute max-w-none" style={{ left: "-8.89%", top: "-5.28%", width: "117.78%", height: "110.56%" }} />
          </div>
          <div className="absolute" style={{ left: m(34), top: m(249.5), width: m(63), height: m(101), transform: "scaleX(-1)" }}>
            <Image src="/medication/connect/m-line-2.svg" alt="" width={76} height={115} unoptimized className="absolute max-w-none" style={{ left: "-10.58%", top: "-6.6%", width: "121.16%", height: "113.2%" }} />
          </div>

          {/* 01 */}
          <MCard style={{ left: 0, top: 0, width: m(272.5), height: m(142.8), padding: m(16.7), borderRadius: m(7.12), borderWidth: m(0.712) }}>
            <div className="flex items-center justify-between" style={{ width: "100%" }}>
              <div className="flex flex-col" style={{ width: m(155) }}>
                <MNum>01</MNum>
                <MTitle>Vitamin D</MTitle>
                <div className="flex flex-wrap" style={{ gap: m(8), marginTop: m(6.4) }}>
                  <MPill>50,000 IU</MPill>
                  <MPill>Once Weekly</MPill>
                  <MPill>Oral</MPill>
                </div>
              </div>
              <MImg src="m-card-01.png" w={1080} h={1350} style={{ width: m(84), height: m(78.35), borderRadius: m(3.56) }} />
            </div>
          </MCard>

          {/* 02 */}
          <MCard style={{ left: m(95), top: m(171.5), width: m(269), height: m(147), padding: m(17), borderRadius: m(10), borderWidth: 1 }}>
            <div className="flex items-start justify-between" style={{ width: "100%" }}>
              <div className="flex flex-col" style={{ width: m(120), gap: m(5) }}>
                <MNum>02</MNum>
                <div className="flex flex-col items-start" style={{ gap: m(9) }}>
                  <MTitle>Why you&apos;re taking it</MTitle>
                  <MPill>Type II Diabetes</MPill>
                </div>
              </div>
              <MImg src="m-card-02.png" w={736} h={1104} style={{ width: m(100), height: m(93), borderRadius: m(5) }} crop={{ left: "0", top: "-61%", width: "100%", height: "160.91%" }} />
            </div>
          </MCard>

          {/* 03 */}
          <MCard style={{ left: m(4), top: m(350.6), width: m(356), height: m(188), padding: m(17), borderRadius: m(10), borderWidth: 1 }}>
            <div className="flex items-start justify-between" style={{ width: "100%" }}>
              <div className="flex flex-col" style={{ width: m(184), gap: m(8) }}>
                <MNum>03</MNum>
                <div className="flex flex-col" style={{ gap: m(8) }}>
                  <MTitle>What we&apos;re following</MTitle>
                  <div className="flex flex-wrap" style={{ gap: m(4) }}>
                    <MPill>Fasting Blood Glucose</MPill>
                    <div className="flex" style={{ gap: m(4) }}>
                      <MPill>A1c</MPill>
                      <MPill>Post Prandial Glucose</MPill>
                    </div>
                    <MPill>Vitamin D Levels</MPill>
                  </div>
                </div>
              </div>
              <MImg src="m-card-03.png" w={1948} h={936} style={{ width: m(123), height: m(114), borderRadius: m(5) }} />
            </div>
          </MCard>
        </div>

        {/* Closing note */}
        <div className="flex items-center justify-between" style={{ width: m(335) }}>
          <Image src="/medication/connect/m-bar.svg" alt="" width={5} height={20} unoptimized style={{ width: m(5), height: m(20), transform: "scaleY(-1)" }} />
          <span className="whitespace-pre uppercase leading-[normal] text-[#6E7A72]" style={{ fontSize: m(12) }}>
            Your physician sees the same connected picture.
          </span>
        </div>
      </div>
    </section>
  );
}
