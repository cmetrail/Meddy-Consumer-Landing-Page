"use client";

import Image from "next/image";

// Figma: desktop node 11274:1390 (1440 x 1024), mobile node 12318:31246 (402 x 785).
// lg+: `u` scales the 1440 frame to the viewport (fits one screen). <lg: `m` scales the 402 frame.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const PHOTO = "/medication/orbital/d-photo.png"; // 1080 x 1350 cut-out
const RING_TEXT = "PRESCRIBE OR ADJUST - FOLLOW YOUR RESPONSE - REVIEW SYMPTOMS + HEALTH DATA + LABS - ";

// Ring geometry in the Figma "text circle" frame (1014.36 x 322.45)
const RX = 430;
const RY = 110;
const CX = 512;
const CY = 150;
// Ramanujan ellipse perimeter
const PERIM = Math.PI * (3 * (RX + RY) - Math.sqrt((3 * RX + RY) * (RX + 3 * RY)));
// clockwise from the bottom, so the copy reads upright across the top
const RING_PATH = `M ${CX} ${CY + RY} A ${RX} ${RY} 0 1 1 ${CX} ${CY - RY} A ${RX} ${RY} 0 1 1 ${CX} ${CY + RY}`;

/** Elliptical text ring (front) + blurred, flattened reflection; the copy slowly travels along the path. */
function Ring({ id }: { id: string }) {
  const dur = "60s";
  const texts = (fill: string) => (
    <>
      {[0, -PERIM].map((from, i) => (
        <text key={i} fontSize="34" fontWeight="600" fill={fill} stroke={fill} strokeWidth="0.8" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          <textPath href={`#${id}`} startOffset={from} textLength={PERIM} lengthAdjust="spacing">
            {RING_TEXT}
            <animate attributeName="startOffset" from={from} to={from + PERIM} dur={dur} repeatCount="indefinite" />
          </textPath>
        </text>
      ))}
    </>
  );
  return (
    <svg viewBox="0 0 1014.36 322.45" className="block w-full overflow-visible" aria-hidden="true">
      <defs>
        <path id={id} d={RING_PATH} fill="none" />
        <filter id={`${id}-blur`} x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <g transform={`translate(0 206) scale(1 -0.4) translate(0 -${CY})`} filter={`url(#${id}-blur)`} opacity="0.3">
        {texts("#A9A9A9")}
      </g>
      {texts("#17925A")}
    </svg>
  );
}

/** physician cut-outs: lower body (with fade) behind the ring, head/shoulders in front of it */
function Body({ w, h, fadeTop, fadeH }: { w: string; h: string; fadeTop: string; fadeH: string }) {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden" style={{ width: w, height: h }}>
        <Image src={PHOTO} alt="" width={1080} height={1350} sizes="600px" className="absolute max-w-none" style={{ left: "-16.38%", top: 0, width: "127.32%", height: "115.05%" }} />
      </div>
      <div className="absolute inset-x-0" style={{ top: fadeTop, height: fadeH, background: "linear-gradient(180deg, rgba(255,254,242,0) 20.268%, #FFFEF2 101.53%)" }} />
    </>
  );
}

const BTN = "rounded-[35px] bg-[#17925A] text-white transition-opacity hover:opacity-90";

export default function MedicationOrbitalSection() {
  return (
    <section
      id="orbital"
      className="relative w-full overflow-hidden bg-[#FFFEF2] lg:h-[calc(1024*var(--u))]"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.0009765625))",
          "--m": "calc(min(100vw, 500px) / 402)",
        } as React.CSSProperties
      }
    >
      {/* Desktop (lg+) */}
      <div className="absolute inset-0 hidden lg:block">
        {/* Artwork on the 1440 frame, centred */}
        <div className="relative mx-auto h-full" style={{ width: u(1440) }}>
          <div className="absolute" style={{ left: u(456.56), top: u(195), width: u(573), height: u(792) }}>
            <Body w="100%" h="100%" fadeTop={u(579)} fadeH={u(215)} />
          </div>
          <div className="pointer-events-none absolute" style={{ left: u(232.7), top: u(453.8), width: u(1014.36) }}>
            <Ring id="ring-d" />
          </div>
          <div className="absolute overflow-hidden" style={{ left: u(456), top: u(195), width: u(552), height: u(459) }}>
            <Image src={PHOTO} alt="" width={1080} height={1350} sizes="600px" className="absolute max-w-none" style={{ left: "-16.9%", top: 0, width: "132.16%", height: "198.52%" }} />
          </div>
          <button
            type="button"
            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-[var(--px)] py-[var(--py)] ${BTN}`}
            style={{ top: u(824), fontSize: `max(15px, ${u(20)})`, ["--px" as string]: u(24), ["--py" as string]: u(16) }}
          >
            Start Physician Care
          </button>
        </div>

        {/* Copy inside the header container (max-w-360, px-10) */}
        <div className="absolute inset-0">
          <div className="mx-auto h-full max-w-360 px-10">
            <div className="relative h-full">
              <h2 className="absolute inset-x-0 text-center uppercase leading-[normal] text-[#46524B]" style={{ top: u(113) }}>
                <span className="block whitespace-nowrap" style={{ fontSize: `max(20px, ${u(30)})` }}>Medication management with a physician</span>
                <span className="comprehensive-serif block whitespace-nowrap italic text-[#17925A]" style={{ fontSize: `max(24px, ${u(34)})` }}>who knows your history.</span>
              </h2>
              <p className="absolute left-0 leading-[normal] text-[#46524B]" style={{ top: u(332), width: u(434), fontSize: `max(24px, ${u(40)})` }}>
                Treatment shouldn&apos;t reset every time you need a refill.
              </p>
              <p className="absolute right-0 text-right leading-[normal] text-[#46524B]" style={{ top: u(367), width: u(327), fontSize: `max(12px, ${u(16)})` }}>
                Your Meddy physician <strong>follows your medications</strong> alongside <strong>your labs, health metrics, lifestyle,</strong> and progress over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet (<lg) */}
      <div
        className="mx-auto flex max-w-[500px] flex-col items-center px-[var(--p20)] py-[var(--p64)] text-center lg:hidden"
        style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64), gap: m(48) } as React.CSSProperties}
      >
        <div className="flex w-full flex-col text-[#46524B]" style={{ gap: m(32) }}>
          <div className="flex flex-col" style={{ gap: m(8) }}>
            <h2 className="uppercase leading-[normal]">
              <span style={{ fontSize: m(24) }}>Medication management with a physician </span>
              <span className="comprehensive-serif block italic text-[#17925A]" style={{ fontSize: m(28) }}>who knows your history.</span>
            </h2>
            <p className="leading-[normal]" style={{ fontSize: m(16) }}>Treatment shouldn&apos;t reset every time you need a refill.</p>
          </div>
          <p className="leading-[normal]" style={{ fontSize: m(16) }}>
            Your Meddy physician <strong>follows your medications</strong> alongside <strong>your labs, health metrics, lifestyle,</strong> and progress over time.
          </p>
        </div>

        <div className="flex w-full flex-col items-center">
          <div className="relative w-full" style={{ height: m(313.4) }}>
            <div className="absolute" style={{ left: m(70.6), top: 0, width: m(226), height: m(312.6) }}>
              <Body w="100%" h="100%" fadeTop={m(228.4)} fadeH={m(84.8)} />
            </div>
            <div className="pointer-events-none absolute" style={{ left: m(-11), top: m(93.85), width: m(384.67) }}>
              <Ring id="ring-m" />
            </div>
            <div className="absolute overflow-hidden" style={{ left: m(72), top: 0, width: m(218), height: m(162) }}>
              <Image src={PHOTO} alt="" width={1080} height={1350} sizes="400px" className="absolute max-w-none" style={{ left: "-17.02%", top: "0.07%", width: "132.04%", height: "221.94%" }} />
            </div>
          </div>
          <button type="button" className={`px-[var(--px)] py-[var(--py)] ${BTN}`} style={{ fontSize: m(16), ["--px" as string]: m(20), ["--py" as string]: m(12) }}>
            Build My Health Plan
          </button>
        </div>
      </div>
    </section>
  );
}
