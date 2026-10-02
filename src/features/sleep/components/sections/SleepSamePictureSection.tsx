"use client";

import Image from "next/image";

// Figma: desktop node 11279:4312 "Desktop - 359" (1440 wide), mobile node 12223:24775.
// Section "06" — "Your physician sees the same picture": a headline with three
// inline photos, a subtitle, and a hub-spoke diagram (health data → Physician →
// Your plan), over a large portrait photo bleeding off the right edge.
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/sleep/same-picture";
const GREEN = "#17925A";

const DD = "/sleep/same-picture/d";

// headline words (Figma 11971:14559, group 622 x 292): [text, x, y, serif]
const WORDS: [string, number, number, boolean][] = [
  ["YOUR", 0, 0, false],
  ["PHYSICIAN", 314, 0, true],
  ["SEES", 0, 103, false],
  ["THE", 182, 103, false],
  ["SAME", 119, 204, true],
  ["PICTURE", 316, 204, true],
];
const THUMBS = [
  { src: "w1.png", x: 200, y: 0, h: 82, r: 5 },
  { src: "w2.png", x: 323, y: 105, h: 81, r: 6 },
  { src: "w3.png", x: 0, y: 204, h: 81, r: 6 },
];

// diagram lines inside the 593-wide group: [file, x, y, w, h, flipY, overflowX %]
const DLINES: [string, number, number, number, number, boolean, number][] = [
  ["v7487", 37.08, 39.64, 265.97, 189.25, false, 0.24],
  ["v7491", 300.49, 40.92, 249.34, 183.49, true, 0.26],
  ["v7488", 151.52, 39, 150.89, 190.52, false, 0.42],
  ["v7488", 300.49, 38.36, 150.89, 190.52, true, 0.42],
  ["v7489", 297.93, 40.28, 4.475, 188.61, false, 14.28],
];

const PILL = "absolute flex items-center justify-center bg-[#17925A]";

export default function SleepSamePictureSection() {
  return (
    <section
      id="sleep-same-picture"
      className="relative w-full overflow-hidden bg-[#FAF9F5] lg:h-[calc(1024*var(--u))]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000976562))", "--m": "calc(min(100vw, 500px) / 402)" } as React.CSSProperties}
    >
      {/* ─── Desktop: Figma 11971:14555 (1440 x 1024); left column inside the header container ─── */}
      <div className="absolute inset-0 hidden lg:block">
        <span
          className="pointer-events-none absolute select-none font-bold italic leading-none text-[rgba(216,216,216,0.5)]"
          style={{ left: `calc(50% - ${u(720)} + ${u(1069)})`, top: u(164.4), fontSize: u(200), letterSpacing: u(4), transform: "rotate(-0.31deg)" }}
        >
          06
        </span>
        <Image src={`${DD}/photo.png`} alt="Smiling Meddy physician" width={843} height={1054} priority sizes="760px" className="absolute object-cover" style={{ left: `calc(50% - ${u(720)} + ${u(723)})`, top: u(223), width: u(719), height: u(898) }} />

        <div className="absolute inset-0">
          <div className="mx-auto h-full max-w-360 px-10">
            <div className="relative h-full" style={{ ["--t" as string]: u(50.5) }}>
              {/* headline */}
              <div className="absolute left-0" style={{ top: u(50.5), width: u(622), height: u(292) }}>
                {WORDS.map(([t, x, y, serif]) => (
                  <span
                    key={t}
                    className={`absolute whitespace-nowrap leading-[normal] uppercase ${serif ? "comprehensive-serif italic text-[#17925A]" : "font-medium text-[#111110]"}`}
                    style={{ left: u(x), top: u(y), fontSize: `max(30px, ${u(serif ? 62 : 64)})` }}
                  >
                    {t}
                  </span>
                ))}
                {THUMBS.map((th) => (
                  <Image key={th.src} src={`${DD}/${th.src}`} alt="" width={100} height={th.h} unoptimized className="absolute object-cover" style={{ left: u(th.x), top: u(th.y), width: u(100), height: u(th.h), borderRadius: u(th.r) }} />
                ))}
              </div>

              <p className="absolute left-0 leading-[1.5] text-[#111110] opacity-70" style={{ top: u(366.5), width: u(657), fontSize: `max(14px, ${u(20)})` }}>
                Your Meddy physician can follow your <strong className="font-bold text-[#17925A]">sleep, recovery, exercise, nutrition, and health trends</strong> together and use that context when adjusting your plan.
              </p>

              {/* diagram */}
              <div className="absolute left-0" style={{ top: u(546.5), width: u(593), height: u(427) }}>
                <span className="absolute left-0 whitespace-nowrap text-center leading-[1.5] tracking-[0.02em] text-[#0C0D0F]" style={{ top: 0, width: u(593), fontSize: `max(14px, ${u(25.574)})` }}>
                  Sleep + Recovery + Exercise + Nutrition + Health
                </span>
                {DLINES.map(([f, x, y, w, h, flip, ox], i) => (
                  <div key={i} className="absolute" style={{ left: u(x), top: u(y), width: u(w), height: u(h), transform: flip ? "scaleY(-1)" : undefined }}>
                    <Image src={`${DD}/${f}.svg`} alt="" width={Math.round(w)} height={Math.round(h)} unoptimized loading="eager" className="absolute max-w-none" style={{ left: `-${ox}%`, top: 0, width: `${100 + 2 * ox}%`, height: "100%" }} />
                  </div>
                ))}
                <div className="absolute" style={{ left: u(300.5), top: u(274), width: 0, height: u(81) }}>
                  <Image src={`${DD}/v7492.svg`} alt="" width={7} height={88} unoptimized loading="eager" className="absolute max-w-none" style={{ left: u(-3.41), top: "-4.21%", width: u(6.82), height: "108.4%" }} />
                </div>
                <div className={PILL} style={{ left: u(209.7), top: u(202.03), width: u(180.3), height: u(71.6), borderRadius: u(84.4) }}>
                  <span className="whitespace-nowrap leading-[1.2] tracking-[0.02em] text-white" style={{ fontSize: `max(14px, ${u(25.574)})` }}>Physician</span>
                </div>
                <div className={PILL} style={{ left: u(210), top: u(355.34), width: u(181.57), height: u(71.6), borderRadius: u(84.4) }}>
                  <span className="whitespace-nowrap leading-[1.2] tracking-[0.02em] text-white" style={{ fontSize: `max(14px, ${u(25.574)})` }}>Your plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Mobile / tablet (<lg): Figma 12223:24775 (402 x 715) ─── */}
      <div className="relative mx-auto min-h-[calc(715*var(--m))] max-w-[500px] overflow-hidden lg:hidden">
        <Image src="/sleep/same-picture/m/photo.png" alt="Smiling Meddy physician" width={843} height={1054} sizes="300px" loading="eager" className="absolute object-cover" style={{ left: m(196), top: m(415.5), width: m(277), height: m(346) }} />

        <div className="relative px-[var(--p20)] py-[var(--p64)]" style={{ ["--p20" as string]: m(20), ["--p64" as string]: m(64) } as React.CSSProperties}>
          <div className="flex flex-col" style={{ gap: m(16) }}>
            <div className="flex flex-col uppercase leading-[normal]" style={{ gap: m(8), fontSize: m(32) }}>
              <div className="flex items-center justify-center" style={{ gap: m(10), height: m(50) }}>
                <span className="font-medium text-[#46524B]">Your</span>
                <Image src="/sleep/same-picture/m/w1.png" alt="" width={61} height={50} unoptimized className="object-cover" style={{ width: m(61), height: m(50), borderRadius: m(5) }} />
                <span className="comprehensive-serif italic text-[#17925A]">Physician</span>
              </div>
              <div className="flex items-center justify-center" style={{ gap: m(10), height: m(50) }}>
                <span className="font-medium text-[#46524B]">Sees</span>
                <span className="font-medium text-[#46524B]">The</span>
                <Image src="/sleep/same-picture/m/w2.png" alt="" width={62} height={50} unoptimized className="object-cover" style={{ width: m(62), height: m(50), borderRadius: m(6) }} />
              </div>
              <div className="flex items-center justify-center" style={{ gap: m(10), height: m(50) }}>
                <Image src="/sleep/same-picture/m/w3.png" alt="" width={62} height={50} unoptimized className="object-cover" style={{ width: m(62), height: m(50), borderRadius: m(6) }} />
                <span className="comprehensive-serif whitespace-nowrap italic text-[#17925A]">Same Picture</span>
              </div>
            </div>
            <p className="text-center leading-[1.5] text-[#111110] opacity-70" style={{ fontSize: m(16) }}>
              Your Meddy physician can follow your <strong className="font-bold text-[#17925A]">sleep, recovery, exercise, nutrition, and health trends</strong> together and use that context when adjusting your plan.
            </p>
          </div>

          {/* diagram (283 x 277) */}
          <div className="relative mt-[var(--mt)]" style={{ width: m(283), height: m(277), ["--mt" as string]: m(32) } as React.CSSProperties}>
            <span className="absolute left-0 top-0 text-center leading-[1.5] tracking-[0.02em] text-[#0C0D0F]" style={{ width: m(283), fontSize: m(12) }}>Sleep + Recovery + Exercise + Nutrition + Health</span>
            <Image src="/sleep/same-picture/m/lines.svg" alt="" width={240} height={113} unoptimized loading="eager" className="absolute max-w-none" style={{ left: m(24), top: m(28), width: m(239.9), height: m(113.3) }} />
            <Image src="/sleep/same-picture/m/vline.svg" alt="" width={5} height={91} unoptimized loading="eager" className="absolute max-w-none" style={{ left: m(146.87 - 2.41), top: m(131 + 29.69 - 2.4), width: m(4.81), height: m(91.5) }} />
            <div className="absolute flex items-center justify-center bg-[#17925A]" style={{ left: m(101.5), top: m(131), width: m(88), height: m(30), borderRadius: m(59.6) }}>
              <span className="leading-[1.2] tracking-[0.02em] text-white" style={{ fontSize: m(12) }}>Physician</span>
            </div>
            <div className="absolute flex items-center justify-center bg-[#17925A]" style={{ left: m(101), top: m(247), width: m(88), height: m(30), borderRadius: m(59.6) }}>
              <span className="leading-[1.2] tracking-[0.02em] text-white" style={{ fontSize: m(12) }}>Your plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
