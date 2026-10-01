"use client";

import Image from "next/image";

// md+: Figma node 10817:3184 (card 1409x972 inside a 1440x1024 frame), scaled by --s so the
// whole section (card + fixed 26px top/bottom margin) never exceeds one viewport:
//   --s = min(100vw, 1440px) / 1440  vs  (100dvh - 52px) / 972, whichever is smaller (52px = 26px margin top + bottom)
const s = (n: number) => `calc(${n} * var(--s))`;

const GRADIENT =
  "linear-gradient(240.79deg, rgb(151,192,196) 11.38%, rgb(244,244,244) 58.34%, rgb(198,214,224) 69.63%, rgb(249,255,232) 99.5%)";

function GetStarted({ scaled }: { scaled?: boolean }) {
  const v = (n: number) => (scaled ? s(n) : `${n}px`);
  return (
    <button
      type="button"
      className="relative shrink-0 rounded-[40px] bg-[#148350]"
      style={{
        width: v(236),
        height: v(64),
        borderRadius: v(40),
        filter: "drop-shadow(0 5px 2px rgba(44,44,44,0.25))",
      }}
    >
      <span
        className="absolute whitespace-nowrap font-medium leading-[normal] text-[#F4F4F5]"
        style={{ left: v(15), top: v(17), fontSize: v(24) }}
      >
        Get Started
      </span>
      <span
        className="absolute flex items-center justify-center bg-[#F4F4F5]"
        style={{ left: v(176), top: v(4), width: v(56), height: v(56), borderRadius: v(28) }}
      >
        <Image
          src="/wearables/physician-arrow.svg"
          alt=""
          width={29}
          height={29}
          style={{ width: v(29), height: v(29) }}
        />
      </span>
    </button>
  );
}

function DesktopCard() {
  return (
    <div
      className="relative mx-auto hidden overflow-hidden md:block"
      style={{ height: s(972), maxWidth: 1409, borderRadius: s(15), background: GRADIENT }}
    >
      {/* decorative orbit icons */}
      <Image
        src="/wearables/physician-abstract.svg"
        alt=""
        width={466}
        height={478}
        className="pointer-events-none absolute max-w-none"
        style={{ right: s(68), top: s(9), width: s(466), height: s(478) }}
      />

      {/* person cutout */}
      <Image
        src="/wearables/physician-person-38a9d1.png"
        alt="Physician"
        width={680}
        height={1104}
        priority
        className="pointer-events-none absolute max-w-none"
        style={{
          right: s(22),
          top: s(-25),
          width: s(645),
          height: s(1047),
          filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.25))",
        }}
      />

      {/* heading */}
      <p
        className="absolute whitespace-nowrap uppercase leading-[normal] text-[#7690A6]"
        style={{ left: s(46), top: s(84), fontSize: s(40) }}
      >
        Give your <span className="font-medium italic text-[#5D7181]">physician</span>
      </p>
      <h2
        className="comprehensive-serif absolute whitespace-nowrap uppercase leading-[normal] text-[#5D7181]"
        style={{ left: s(46), top: s(146), fontSize: s(64) }}
      >
        the bigger picture.
      </h2>

      {/* copy */}
      <div className="absolute flex flex-col" style={{ left: s(54), top: s(499), width: s(456), gap: s(48) }}>
        <p className="leading-[normal] text-[#6E7A72]" style={{ width: s(440), fontSize: `max(12px, ${s(20)})` }}>
          Your physician can see your{" "}
          <span className="font-bold">
            sleep, activity, heart rate, HRV, workouts, weight, nutrition, labs,
          </span>{" "}
          and other health trends together.
        </p>
        <div className="flex flex-col font-medium uppercase leading-[normal]" style={{ gap: s(5), fontSize: `max(13px, ${s(24)})` }}>
          <span className="text-[#A9A9A9]">The data was already there.</span>
          <span className="italic text-[#6E7A72]">Now it can help inform your care.</span>
        </div>
      </div>

      {/* CTA */}
      <div className="absolute" style={{ left: s(46), top: s(760) }}>
        <GetStarted scaled />
      </div>
    </div>
  );
}

export default function WearablesPhysicianSection() {
  return (
    <section
      className="bg-[#FAFAFA]"
      style={
        {
          "--s": "min(calc(min(100vw, 1440px) * 0.000694444), calc((100dvh - 52px) * 0.001028807))",
        } as React.CSSProperties
      }
    >
      {/* md+: scaled replica of the Figma card */}
      <div className="hidden md:block md:px-[15.5px] md:py-[26px]">
        <DesktopCard />
      </div>

      {/* <md: stacked */}
      <div className="px-5 py-5 md:hidden">
        <div className="relative overflow-hidden rounded-[15px]" style={{ background: GRADIENT }}>
          <div className="relative z-10 flex flex-col px-6 pt-14">
            <h2 className="text-[24px] uppercase leading-[1.2] text-[#7690A6]">
              Give your <em className="font-medium italic text-[#5D7181]">physician</em>
            </h2>
            <p className="comprehensive-serif mt-2 text-[36px] uppercase leading-[1.1] text-[#5D7181]">
              the bigger picture.
            </p>

            <div className="mt-10 flex max-w-[456px] flex-col gap-8">
              <p className="text-[16px] leading-[1.5] text-[#6E7A72]">
                Your physician can see your{" "}
                <span className="font-bold">
                  sleep, activity, heart rate, HRV, workouts, weight, nutrition, labs,
                </span>{" "}
                and other health trends together.
              </p>
              <div className="flex flex-col gap-[5px]">
                <span className="text-[18px] font-medium uppercase text-[#A9A9A9]">
                  The data was already there.
                </span>
                <span className="text-[18px] font-medium uppercase italic text-[#6E7A72]">
                  Now it can help inform your care.
                </span>
              </div>
            </div>

            <div className="mt-8">
              <GetStarted />
            </div>
          </div>

          <div className="relative mt-6">
            <Image
              src="/wearables/physician-abstract.svg"
              alt=""
              width={466}
              height={478}
              className="pointer-events-none absolute right-[-10%] top-0 w-[90%] max-w-[420px]"
            />
            <Image
              src="/wearables/physician-person-38a9d1.png"
              alt="Physician"
              width={680}
              height={1104}
              className="relative mx-auto h-auto w-[80%] max-w-[340px]"
              style={{ filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.25))" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
