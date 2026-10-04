"use client";

import Image from "next/image";
import Header from "@/components/Header";

// md+: Figma node 11271:12183 (1440 x 1028) scaled by --u so the hero always fits one viewport:
//   --u = min(100vw, 1440px) / 1440  vs  100dvh / 1028, whichever is smaller
const u = (n: number) => `calc(${n} * var(--u))`;

// radial-gradient from the design: centre (720, 514), radii 1212 x 866 of the 1440 x 1028 frame
const BG =
  "radial-gradient(ellipse 84.2% 84.2% at 50% 50%, rgb(90,137,114) 0%, rgb(73,112,92) 25%, rgb(57,86,71) 50%, rgb(40,61,50) 75%, rgb(23,35,29) 100%)";

function Copy() {
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-[var(--gap32)]">
        <h1 className="leading-[normal] text-[40px] sm:text-[52px] md:text-[length:var(--h1)]">
          SEE WHAT WORKOUTS ARE DOING TO YOUR BODY
        </h1>
        <p className="max-w-[543px] leading-[normal] text-[16px] md:max-w-[calc(543*var(--u))] md:text-[length:max(13px,var(--p))]">
          Track how you train, understand where you&apos;re improving, and get a
          physician built workout plan that adapts to your goals, preferences,
          and how your body responds.
        </p>
      </div>
      <button
        type="button"
        className="w-fit rounded-[49px] bg-white px-5 py-3 text-[16px] md:px-6 md:py-4 leading-[normal] text-[#17925A] transition-transform duration-300 hover:scale-[1.03] md:text-[length:max(14px,var(--p))]"
      >
        Start Training
      </button>
    </>
  );
}

export default function FitnessHeroSection() {
  return (
    <section
      className="relative flex min-h-[212vw] w-full flex-col overflow-hidden  text-white md:pt-0 md:h-[calc(1028*var(--u))] md:min-h-0"
      style={
        {
          "--u":
            "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000972763))",
          "--h1": "calc(64 * var(--u))",
          "--p": "calc(20 * var(--u))",
          "--gap32": "calc(32 * var(--u))",
          background: BG,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className="relative z-30 shrink-0">
        <Header variant="dark" active="Fitness" />
      </div>

      {/* md+: copy on the left, muscle photo flush to the right edge (positions from Figma) */}
      <div
        className="pointer-events-none absolute hidden overflow-hidden md:block"
        style={{ right: 0, bottom: 0, width: u(1149), height: u(996) }}
      >
        <Image
          src="/fitness/fitness-hero-muscle-fb16b.png"
          alt=""
          width={2752}
          height={1536}
          priority
          sizes="1200px"
          className="absolute max-w-none"
          style={{
            left: "-30.92%",
            top: "-8.76%",
            width: "201.93%",
            height: "130.54%",
          }}
        />
      </div>

      {/* Same container as the Header (max-w-360, px-5 / lg:px-10) so the copy lines up with the logo */}
      <div
        className="absolute inset-x-0 z-10 mx-auto hidden w-full max-w-360 px-5 md:block lg:px-10"
        style={{ top: u(500), transform: "translateY(-50%)" }}
      >
        <div className="flex flex-col" style={{ width: u(933), gap: u(30) }}>
          <Copy />
        </div>
      </div>

      {/* <md (Figma node 11892:35802, 402 wide): copy on top, photo pinned to the bottom edge and slightly overlapped by the copy */}
      <div className="relative z-10 flex flex-col items-start gap-4 px-5 pb-8 pt-6 md:hidden">
        <Copy />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-full overflow-hidden md:hidden"
        style={{ aspectRatio: "402 / 348" }}
      >
        <Image
          src="/fitness/fitness-hero-muscle-fb16b.png"
          alt=""
          width={2752}
          height={1536}
          priority
          sizes="100vw"
          className="absolute max-w-none"
          style={{
            left: "-30.92%",
            top: "-8.76%",
            width: "201.93%",
            height: "130.54%",
          }}
        />
      </div>
    </section>
  );
}
