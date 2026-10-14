"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { useWearablesHeroMotion } from "./useWearablesHeroMotion";
import styles from "./WearablesHeroSection.module.css";

// Everything below is authored in Figma px at a 1440 wide frame and scaled by `--u`
// The desktop canvas scales to both the available width and display height.
const u = (n: number) => `calc(${n} * var(--u))`;

const DEVICES = [
  { src: "/wearables/apple-watch.png", ring: "/wearables/apple-watch-ring.svg", alt: "Apple Watch", cx: 476, cy: 160, ringSize: 160, w: 73, h: 86, ringRot: 4.13, rot: 25.68 },
  { src: "/wearables/oura-ring.png", ring: "/wearables/oura-ring.svg", alt: "Oura Ring", cx: 1127, cy: 179, ringSize: 153, w: 80, h: 83, ringRot: -21.55, rot: 0 },
  { src: "/wearables/fitbit.png", ring: "/wearables/fitbit-ring.svg", alt: "Fitbit", cx: 1192, cy: 681, ringSize: 175, w: 113, h: 93, ringRot: -81.53, rot: -22.65 },
];

// [src, left, top, width, height, flipX] — connector lines from the frame
const LINES: [string, number, number, number, number, boolean][] = [
  ["line-watch", 528, 181, 124, 76, false],
  ["line-oura", 990, 278, 131, 107.5, true],
  ["line-fitbit", 991, 516, 189, 54, true],
];

const CONNECTOR_PATHS = [
  { viewBox: "0 0 124.625 76.351", path: "M124.209 76.0742L77.015 5.07422H0.208984", cap: "M0.5 0V10.9761" },
  { viewBox: "0 0 131.414 108.28", path: "M130.999 108L83.0496 37H5.01367V0.5", cap: "M0 0.5H9.71531" },
  { viewBox: "0 0 189.254 54.9302", path: "M188.999 0.430164L128.238 36.4302H6.60938V53.9302", cap: "M0 54.4302H12.5289" },
];

// frame corner/edge handles
const HANDLES: [number, number][] = [
  [655, 194], [803, 194], [979, 194], [979, 421.75],
  [653, 425], [978, 648.66], [654, 648.66], [898, 650.33],
];

function WearableDevice({ src, ring, alt, cx, cy, ringSize, w, h, ringRot, rot }: (typeof DEVICES)[number]) {
  return (
    <>
      <Image
        data-ring
        src={ring}
        alt=""
        width={ringSize}
        height={ringSize}
        unoptimized
        className="pointer-events-none absolute opacity-25"
        style={{ left: u(cx - ringSize / 2), top: u(cy - ringSize / 2), width: u(ringSize), height: u(ringSize), rotate: `${ringRot}deg` }}
      />
      <Image
        data-device
        src={src}
        alt={alt}
        width={w * 2}
        height={h * 2}
        className="absolute object-contain"
        style={{ left: u(cx - w / 2), top: u(cy - h / 2 + 3), width: u(w), height: u(h), rotate: `${rot}deg` }}
      />
    </>
  );
}

function DeviceCluster({ className, style, mobile = false }: { className: string; style: React.CSSProperties; mobile?: boolean }) {
  return (
    <div data-cluster-desktop={mobile ? undefined : ""} data-cluster-mobile={mobile ? "" : undefined} className={`pointer-events-none absolute ${className}`} style={style}>
      <div data-pointer-layer className="absolute inset-0">
        {/* Phone: sharp inside the selection frame, blurred outside it */}
        {[
          { blur: "blur(18px) brightness(0.7)", clip: "polygon(evenodd, -25% -30%, 150% -30%, 150% 150%, -25% 150%, -25% -30%, -1% -9.7%, 81.8% -9.7%, 81.8% 80.8%, -1% 80.8%, -1% -9.7%)" },
          { blur: undefined, clip: "inset(0 18.2% 19.2% 0)" },
        ].map(({ blur, clip }) => (
          <div
            data-phone
            key={blur ?? "sharp"}
            className="absolute"
            style={{ left: u(661), top: u(246), width: u(395), height: u(505), filter: blur, clipPath: clip }}
          >
            <Image src="/wearables/iphone-frame.png" alt="" fill priority sizes="395px" className="object-contain" />
            <Image src="/wearables/iphone-screen.png" alt={blur ? "" : "Health data on iPhone"} fill priority sizes="395px" className="object-contain" />
          </div>
        ))}

        {/* Selection frame */}
        <div data-frame className="absolute border border-[#616161]" style={{ left: u(657), top: u(197.34), width: u(327), height: u(456.33) }} />
        {HANDLES.map(([x, y]) => (
          <div data-handle key={`${x}-${y}`} className="absolute bg-[#d9d9d9]" style={{ left: u(x), top: u(y), width: u(9), height: u(6.674) }} />
        ))}
        {LINES.map(([name, x, y, w, h, flip], index) => (
          <svg
            key={name}
            aria-hidden="true"
            viewBox={CONNECTOR_PATHS[index].viewBox}
            fill="none"
            preserveAspectRatio="none"
            className="absolute"
            style={{ left: u(x), top: u(y), width: u(w), height: u(h), transform: flip ? "scaleX(-1)" : undefined }}
          >
            <path data-connector d={CONNECTOR_PATHS[index].path} stroke="#696969" pathLength="1" strokeDasharray="1" strokeDashoffset="0" />
            <path d={CONNECTOR_PATHS[index].cap} stroke="white" />
          </svg>
        ))}

        {DEVICES.map((d) => (
          <WearableDevice key={d.src} {...d} />
        ))}
      </div>
    </div>
  );
}

export default function WearablesHeroSection() {
  const sectionRef = useWearablesHeroMotion();
  return (
    <section
      ref={sectionRef}
      id="wearables-hero"
      className={`relative flex w-full flex-col overflow-hidden text-white ${styles.hero}`}
      style={
        {
          "--copy-left": "calc(75 * var(--u))",
          "--copy-w": "calc(427 * var(--u))",
          "--copy-gap": "calc(200 * var(--u))",
          "--copy-gap2": "calc(50 * var(--u))",
          "--u10": "calc(10 * var(--u))",
          "--h1": "calc(64 * var(--u))",
          "--sub": "calc(24 * var(--u))",
          "--lead": "calc(32 * var(--u))",
          "--body": "max(11px, calc(16 * var(--u)))",
          "--works": "max(11px, calc(16 * var(--u)))",
          "--stage-h": "calc(913 * var(--u))",
          background: "linear-gradient(135deg, #2C2C2C 0%, #151416 61%)",
        } as React.CSSProperties
      }
    >
      <Image
        src="/wearables/bg-overlay.svg"
        alt=""
        width={1434}
        height={1235}
        unoptimized
        className="pointer-events-none absolute hidden max-w-none mix-blend-overlay md:block"
        style={{ left: `calc(50% - ${u(709)})`, top: u(-50), width: u(1434), height: u(1235) }}
      />

      {/* Sand ground under the phone */}
      <Image
        src="/wearables/sand.png"
        alt=""
        width={1604}
        height={393}
        priority
        className="pointer-events-none absolute hidden max-w-none md:block"
        style={{
          bottom: u(-9),
          left: `calc(50% - ${u(841)})`,
          width: u(1604),
          height: u(393),
          filter: "blur(20px)",
          maskImage: "linear-gradient(to bottom, transparent, black 45%)",
        }}
      />

      {/* Blur the area outside the 1440px content column */}
      {(["left-0", "right-0"] as const).map((side) => (
        <div
          key={side}
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 ${side} z-10 hidden w-[calc((100%-1440px)/2)] backdrop-blur-md min-[1441px]:block`}
        />
      ))}

      {/* Header */}
      <div className="relative z-30">
        <Header variant="dark" />
      </div>

      {/* Stage: stacked copy on mobile, scaled 1440 design from md up */}
      <div
        className={`relative z-20 mx-auto flex w-full max-w-360 flex-col items-start gap-12 px-5 pb-0 pt-5 md:absolute md:left-1/2 md:top-[var(--stage-top)] md:h-[var(--stage-h)] md:w-[var(--stage-w)] md:max-w-none md:-translate-x-1/2 md:flex-none md:flex-row md:items-center md:justify-start md:p-0 ${styles.stage}`}
        style={{ ["--stage-w" as string]: u(1440) } as React.CSSProperties}
      >
        {/* Left — copy */}
        <div className="relative z-10 flex w-full flex-col gap-4 md:left-[var(--copy-left)] md:w-[var(--copy-w)] md:gap-[var(--copy-gap)]">
          <div className="flex flex-col gap-[10px] md:gap-[var(--u10)]">
            <h1 className="comprehensive-serif uppercase leading-[normal] text-[44px] md:text-[length:var(--h1)]">
              <span data-hero-copy className="comprehensive-serif inline-block text-[#E2E2E2]">Your </span>
              <br className="hidden md:block" />
              <span data-hero-copy className="comprehensive-serif inline-block text-white">health data</span>
            </h1>
            <p data-hero-copy className="font-medium uppercase leading-[normal] text-[#9A9A9A] text-[24px] md:whitespace-nowrap md:text-[length:var(--sub)]">
              already knows a lot about you.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:max-w-none md:gap-[var(--copy-gap2)]">
            <p data-hero-copy className="font-medium uppercase leading-[1.2] text-[#9A9A9A]">
              <span className="text-[20px] md:text-[length:var(--sub)]">Now your</span>
              <br />
              <span className="text-[20px] italic leading-[1.2] text-white md:text-[length:var(--lead)]">
                physician can too.
              </span>
            </p>
            <p data-hero-copy className="leading-[normal] text-[#9A9A9A] text-[16px] md:font-medium md:leading-[1.5] md:text-[length:var(--body)]">
              Connect the devices you already use and bring your activity,
              sleep, heart rate, recovery, and fitness data into one connected
              picture of your health.
            </p>
          </div>
        </div>

        {/* Right — device cluster, absolute in 1440 design coords (md+) */}
        <DeviceCluster className="hidden md:block" style={{ left: 0, top: 0, width: u(1440), height: u(913) }} />
      </div>


      {/* Mobile: same device cluster, scaled so its widest extent (x 396-1280 in design px) fits inside px-5 */}
      <div
        className={`relative z-10 mt-0 w-full md:hidden ${styles.mobileDevices}`}
      >
        <Image
          src="/wearables/sand.png"
          alt=""
          width={1604}
          height={393}
          className="pointer-events-none absolute max-w-none"
          style={{
            left: "-30vw",
            top: "calc(380 * var(--u))",
            width: "160vw",
            height: "45vw",
            filter: "blur(12px)",
            maskImage: "linear-gradient(to bottom, transparent, black 45%)",
          }}
        />
        <DeviceCluster
          mobile
          className=""
          style={{ left: "calc(20px - 396 * var(--u))", top: u(-110), width: u(1440), height: u(913) }}
        />
      </div>
      <div data-hero-brands className={`relative z-10 flex flex-col items-center gap-[10px] px-5 pb-16 pt-6 text-center text-[16px] md:hidden ${styles.mobileBrands}`}>
        <span className="text-[#9A9A9A]">Works with</span>
        <span className="font-medium uppercase text-white">• Oura • Apple Watch • Google Pixel Watch • Fitbit</span>
      </div>

      {/* Works with */}
      <div data-hero-brands className="relative z-20 hidden flex-col items-center gap-[10px] md:absolute md:inset-x-0 md:bottom-[var(--works-bottom)] md:flex">
        <span className="text-[16px] text-[#9A9A9A] md:text-[length:var(--works)]">Works with</span>
        <span className="text-center font-medium uppercase text-[16px] text-white md:text-[length:var(--works)]">
          • Oura • Apple Watch • Google Pixel Watch • Fitbit
        </span>
      </div>
    </section>
  );
}
