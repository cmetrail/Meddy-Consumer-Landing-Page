"use client";

import Image from "next/image";
import { MoonStar, HandHeart, Footprints, Dumbbell } from "lucide-react";

type HealthCard = {
  bg: string;
  icon: typeof MoonStar;
  title: string;
  left: string[];
  right: string[];
  image: string;
  imageAlt: string;
  imagePos: React.CSSProperties;
};

const CARDS: HealthCard[] = [
  {
    bg: "#F8F8F8",
    icon: MoonStar,
    title: "Sleep",
    left: ["Duration", "Efficiency"],
    right: ["Consistency", "Sleep stages"],
    image: "/wearables/apple-watch-sleep-3aed96.png",
    imageAlt: "Apple Watch tracking sleep",
    imagePos: { left: "67%", top: "17%", width: "31%" },
  },
  {
    bg: "#FFFBE6",
    icon: HandHeart,
    title: "Recovery",
    left: ["HRV", "Readiness"],
    right: ["Resting heart rate"],
    image: "/wearables/oura-ring-recovery-720861.png",
    imageAlt: "Oura Ring tracking recovery",
    imagePos: { left: "70%", top: "21%", width: "33%" },
  },
  {
    bg: "#E6FFF2",
    icon: Footprints,
    title: "Activity",
    left: ["Steps", "Active minutes"],
    right: ["Distance"],
    image: "/wearables/smartwatch-activity-5a6c38.png",
    imageAlt: "Smartwatch tracking activity",
    imagePos: { left: "68%", top: "17%", width: "32%" },
  },
  {
    bg: "#E6F0FF",
    icon: Dumbbell,
    title: "Workouts",
    left: ["Workouts", "Heart Rate Intensity"],
    right: ["VO₂ max"],
    image: "/wearables/fitbit-workouts-449d7c.png",
    imageAlt: "Fitbit tracking workouts",
    imagePos: { left: "61%", top: "8%", width: "41%" },
  },
];

const CARD_TOPS = [
  "top-0",
  "top-[64px] md:top-[82px]",
  "top-[128px] md:top-[165px]",
  "top-[192px] md:top-[248px]",
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#626262]" />
          <span className="font-medium leading-[1.3] text-[#7B7B7B] text-[12px] md:text-[16px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function HealthCard({ card, top, z }: { card: HealthCard; top: string; z: number }) {
  const Icon = card.icon;
  return (
    <div
      className={`absolute inset-x-0 h-[240px] rounded-[24px] p-5 shadow-[3px_5px_10.7px_rgba(0,0,0,0.25)] md:h-[281px] md:p-6 ${top}`}
      style={{ background: card.bg, zIndex: z }}
    >
      <Icon
        className="h-14 w-14 text-[#46524B] md:h-16 md:w-16"
        strokeWidth={1.5}
      />
      <div className="absolute" style={card.imagePos}>
        <Image
          src={card.image}
          alt={card.imageAlt}
          width={500}
          height={500}
          sizes="300px"
          className="h-auto w-full object-contain"
        />
      </div>
      <h3 className="mt-3 font-dm-serif italic uppercase leading-[1.1] text-[#46524B] text-[28px] md:mt-4 md:text-[36px]">
        {card.title}
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-x-3 md:mt-4">
        <BulletList items={card.left} />
        <BulletList items={card.right} />
      </div>
    </div>
  );
}


// ---- md+: absolute replica of Figma node 10817:2969, scaled by --u (= min(100vw,1440px)/1440) ----
const u = (n: number) => `calc(${n} * var(--u))`;

type Box = [number, number, number, number]; // left, top, width, height

type DesktopCard = {
  key: string;
  bg: string;
  title: string;
  left: string[];
  right: string[];
  pos: [number, number]; // card left, top in stage px
  titleLeft: number;
  iconLeft: number;
  iconTop: number;
  device: { src: string; alt: string; outer: Box; inner: [number, number]; scale?: string; rot: number };
  line: { src: string; outer: Box; inner?: [number, number]; rot?: number };
};

const DESKTOP_CARDS: DesktopCard[] = [
  {
    key: "sleep", bg: "#F8F8F8", title: "Sleep", left: ["Duration", "Efficiency"], right: ["Consistency", "Sleep stages"],
    pos: [81, 255], titleLeft: 30, iconLeft: 14, iconTop: 16,
    device: { src: "/wearables/apple-watch-sleep-3aed96.png", alt: "Apple Watch tracking sleep", outer: [405, 47, 186.948, 203.43], inner: [186.424, 202.949], scale: "1 -1", rot: 179.85 },
    line: { src: "line-sleep", outer: [481, 237, 100, 20] },
  },
  {
    key: "recovery", bg: "#FFFBE6", title: "Recovery", left: ["HRV", "Readiness"], right: ["Resting heart rate"],
    pos: [81, 337], titleLeft: 23, iconLeft: 18, iconTop: 19,
    device: { src: "/wearables/oura-ring-recovery-720861.png", alt: "Oura Ring tracking recovery", outer: [421, 58, 199.641, 232.635], inner: [161.424, 203.998], rot: -11.77 },
    line: { src: "line-recovery", outer: [490, 227, 99.205, 34.332], inner: [97.166, 22.774], rot: 6.93 },
  },
  {
    key: "activity", bg: "#E6FFF2", title: "Activity", left: ["Steps", "Active minutes"], right: ["Distance"],
    pos: [81, 420], titleLeft: 23, iconLeft: 18, iconTop: 19,
    device: { src: "/wearables/smartwatch-activity-5a6c38.png", alt: "Smartwatch tracking activity", outer: [412, 48, 190.583, 215.013], inner: [172.546, 199.649], scale: "1 -1", rot: 174.6 },
    line: { src: "line-activity", outer: [484, 204.15, 103.625, 61.214], inner: [97.166, 44.035], rot: 10.64 },
  },
  {
    key: "workouts", bg: "#E6F0FF", title: "Workouts", left: ["Workouts", "Heart Rate Intensity"], right: ["VO₂ max"],
    pos: [82, 503], titleLeft: 23, iconLeft: 18, iconTop: 19,
    device: { src: "/wearables/fitbit-workouts-449d7c.png", alt: "Fitbit tracking workouts", outer: [368, 22, 245.915, 262.237], inner: [213.657, 233.081], scale: "1 -1", rot: -171.46 },
    line: { src: "line-workouts", outer: [467, 196.76, 86.673, 57.9], inner: [80.626, 46.297], rot: 8.65 },
  },
];

const CARD_PATH =
  "M95.7915 20.1539L104.586 29.5543C109.124 34.4053 115.469 37.1584 122.112 37.1584H585.7C598.955 37.1584 609.7 47.9036 609.7 61.1584V262.7C609.7 275.955 598.955 286.7 585.7 286.7H31.7C18.4452 286.7 7.7 275.955 7.7 262.7V29.7C7.7 16.4452 18.4452 5.7 31.7 5.7H72.4424C79.5121 5.7 86.2221 8.81699 90.7822 14.2193L95.7915 20.1539Z";

const absBox = ([l, t, w, h]: Box): React.CSSProperties => ({ left: u(l), top: u(t), width: u(w), height: u(h) });

function DesktopBullets({ items, gap, width }: { items: string[]; gap: number; width: number }) {
  return (
    <ul className="flex flex-col" style={{ gap: u(10), width: u(width) }}>
      {items.map((item) => (
        <li key={item} className="flex items-center" style={{ gap: u(gap) }}>
          <Image src="/wearables/signals/dot.svg" alt="" width={9} height={9} unoptimized style={{ width: u(9), height: u(9) }} className="shrink-0" />
          <span className="whitespace-nowrap font-medium leading-[normal] text-[#7B7B7B]" style={{ fontSize: u(16) }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function DesktopCardView({ c, z }: { c: DesktopCard; z: number }) {
  const [dl, dt, dw, dh] = c.device.outer;
  return (
    <div className="absolute" style={{ ...absBox([c.pos[0], c.pos[1], 602, 281]), zIndex: z }}>
      {/* tabbed card shape + shadow (path from Figma "Union", 602x281) */}
      <svg
        viewBox="7.7 5.7 602 281"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
        style={{ filter: `drop-shadow(${u(3)} ${u(5)} ${u(5.35)} rgba(0,0,0,0.25))` }}
        aria-hidden
      >
        <path d={CARD_PATH} fill={c.bg} />
      </svg>
      <Image
        src={`/wearables/signals/icon-${c.key}.svg`}
        alt=""
        width={64}
        height={64}
        unoptimized
        className="absolute"
        style={{ left: u(c.iconLeft), top: u(c.iconTop), width: u(64), height: u(64) }}
      />
      <p
        className="comprehensive-serif absolute uppercase italic leading-[normal] text-[#46524B]"
        style={{ left: u(c.titleLeft), top: u(105), fontSize: u(36) }}
      >
        {c.title}
      </p>
      <div className="absolute flex items-start" style={{ left: u(33), top: u(197), gap: u(9) }}>
        <DesktopBullets items={c.left} gap={8} width={135} />
        <DesktopBullets items={c.right} gap={6} width={165} />
      </div>

      {/* squiggle line */}
      <div className="absolute flex items-center justify-center" style={absBox(c.line.outer)}>
        <div className="relative" style={{ width: c.line.inner ? u(c.line.inner[0]) : "100%", height: c.line.inner ? u(c.line.inner[1]) : "100%", rotate: c.line.rot ? `${c.line.rot}deg` : undefined }}>
          <Image
            src={`/wearables/signals/${c.line.src}.svg`}
            alt=""
            fill
            unoptimized
            className="max-w-none"
          />
        </div>
      </div>

      {/* device */}
      <div className="absolute flex items-center justify-center" style={{ left: u(dl), top: u(dt), width: u(dw), height: u(dh) }}>
        <div className="relative" style={{ width: u(c.device.inner[0]), height: u(c.device.inner[1]), scale: c.device.scale, rotate: `${c.device.rot}deg` }}>
          <Image src={c.device.src} alt={c.device.alt} fill sizes="300px" className="object-contain" />
        </div>
      </div>
    </div>
  );
}

function DesktopStage() {
  return (
    <div className="relative mx-auto hidden md:block" style={{ width: u(1440), height: u(1024) }}>
      {/* Phones */}
      <div className="absolute overflow-hidden" style={absBox([683, 348, 829, 663])}>
        <Image
          src="/wearables/iphone-15-pro-6b08e7.png"
          alt="Meddy health data on iPhone"
          fill
          sizes="829px"
          className="object-cover object-left"
        />
      </div>

      {/* Heading */}
      <div className="absolute flex flex-col uppercase leading-[normal]" style={{ left: u(81), top: u(96), width: u(567), gap: u(5) }}>
        <h2 className="comprehensive-serif whitespace-nowrap text-[#46524B]" style={{ fontSize: u(48) }}>
          One place for the signals
        </h2>
        <p className="font-medium italic text-[#A9A9A9]" style={{ fontSize: u(32) }}>
          your body generates every day.
        </p>
      </div>

      {/* Right copy */}
      <div className="absolute flex flex-col items-end text-right" style={{ left: u(934), top: u(230), width: u(408), gap: u(58) }}>
        <p className="font-medium uppercase leading-[normal] text-[#9A9A9A]" style={{ fontSize: u(24) }}>
          Stop looking at your health{" "}
          <em className="font-medium italic text-[#46524B]" style={{ fontSize: u(32) }}>
            one app at a time.
          </em>
        </p>
        <p className="text-[#6E7A72]" style={{ width: u(376), fontSize: u(20), lineHeight: "normal" }}>
          <em>Meddy brings your wearable data together</em> with the rest of your health.
        </p>
      </div>

      {/* Cards */}
      {DESKTOP_CARDS.map((c, i) => (
        <DesktopCardView key={c.key} c={c} z={i + 1} />
      ))}

      {/* Footer */}
      <div className="absolute flex flex-col" style={{ left: u(82), top: u(839), width: u(382), gap: u(17) }}>
        <div className="flex items-center" style={{ gap: u(10) }}>
          <Image src="/wearables/history-accent.svg" alt="" width={9} height={35} style={{ width: u(9), height: u(35) }} />
          <span className="whitespace-nowrap font-medium uppercase text-[#7B7B7B]" style={{ fontSize: u(20) }}>
            One connected health history.
          </span>
        </div>
        <p className="text-[#6E7A72]" style={{ paddingLeft: u(23), width: u(382), fontSize: u(14), lineHeight: "normal" }}>
          Your wearable data lives alongside your{" "}
          <span className="font-bold">nutrition, weight, workouts, labs, medications, and medical history.</span>
        </p>
      </div>
    </div>
  );
}

export default function WearablesHealthSignalsSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={
        {
          "--u": "calc(min(100vw, 1440px) * 0.000694444)",
          background: "linear-gradient(124.75deg, rgb(249,249,249) 10.12%, rgb(203,229,195) 97.97%)",
        } as React.CSSProperties
      }
    >
      <DesktopStage />
      <div className="mx-auto max-w-360 px-5 py-16 md:hidden">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-12 lg:gap-[88px]">
            <div>
              <h2 className="font-dm-serif uppercase leading-[1.05] text-[#46524B] text-[34px] sm:text-[40px] lg:text-[48px]">
                One place for the signals
              </h2>
              <p className="mt-[5px] font-medium uppercase italic text-[#A9A9A9] text-[22px] sm:text-[26px] lg:text-[32px]">
                your body generates every day.
              </p>
            </div>

            {/* Stacked cards */}
            <div className="relative h-[440px] md:h-[529px]">
              {CARDS.map((card, i) => (
                <HealthCard key={card.title} card={card} top={CARD_TOPS[i]} z={i} />
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-[17px]">
              <div className="flex items-center gap-[10px]">
                <Image
                  src="/wearables/history-accent.svg"
                  alt=""
                  width={9}
                  height={35}
                  className="h-[35px] w-[9px]"
                />
                <span className="font-medium uppercase text-[#7B7B7B] text-[16px] lg:text-[20px]">
                  One connected health history.
                </span>
              </div>
              <p className="max-w-[359px] pl-[23px] text-[#6E7A72] text-[13px] lg:text-[14px]">
                Your wearable data lives alongside your{" "}
                <span className="font-bold">
                  nutrition, weight, workouts, labs, medications, and medical
                  history.
                </span>
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="relative flex flex-col">
            <div className="flex flex-col items-end gap-[58px] text-right">
              <p className="max-w-[408px] font-medium uppercase text-[#9A9A9A] text-[18px] sm:text-[20px] lg:text-[24px]">
                Stop looking at your health{" "}
                <em className="font-medium italic text-[#46524B]">
                  one app at a time.
                </em>
              </p>
              <p className="max-w-[376px] text-[#6E7A72] text-[16px] lg:text-[20px]">
                <em className="italic">
                  Meddy brings your wearable data together
                </em>{" "}
                with the rest of your health.
              </p>
            </div>

            <div className="relative mt-10 lg:-mr-[120px] lg:mt-auto">
              <Image
                src="/wearables/iphone-15-pro-6b08e7.png"
                alt="Meddy health data on iPhone"
                width={829}
                height={663}
                sizes="(max-width: 1024px) 100vw, 800px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
