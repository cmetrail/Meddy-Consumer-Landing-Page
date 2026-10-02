"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function WhatWeTestHeroSection() {
  return (
    // lg+: exactly one viewport tall (min 640px); the photo card takes whatever height is left.
    <section className="flex w-full flex-col bg-[#FEF9EF] lg:h-dvh lg:min-h-[640px]">
      <div className="relative z-20 shrink-0">
        <Header variant="light" active="Labs" />
      </div>

      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-[50px] px-5 pb-[80px] pt-[40px] lg:min-h-0 lg:flex-1 lg:gap-[clamp(16px,3vh,50px)] lg:px-[100px] lg:pb-[clamp(16px,4vh,48px)] lg:pt-[clamp(8px,2vh,24px)]">
        {/* Heading */}
        <div className="flex shrink-0 flex-col items-center gap-[10px] text-center">
          <h1 className="font-normal leading-[0.925] text-[#6E7A72] text-[40px] sm:text-[52px] lg:text-[length:clamp(40px,7vh,64px)]">
            <span className="block">What we</span>
            <span className="block">
              commonly{" "}
              <span className="comprehensive-serif italic text-[#17925A]">TEST</span>
            </span>
          </h1>
          <p className="max-w-[636px] text-[14px] leading-[normal] text-[#6E7A72] sm:text-[15px] lg:text-[16px]">
            Your physician orders labs based on your health, history, and goals.
            These are the tests we most often use to understand your health. Not
            every test is right for everyone.
          </p>
        </div>

        {/* Card */}
        <div className="relative h-[280px] w-full overflow-hidden rounded-[10px] sm:h-[400px] lg:h-auto lg:min-h-[260px] lg:flex-1">
          <Image
            src="/what-we-test/labs-hero-card-5060b1.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1240px"
            className="object-cover object-center"
          />

          {/* Silhouette from the design, drawn as a dot grid (static stand-in for the Figma particle shader) */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: "31.3%",
              top: "1%",
              width: "41.3%",
              aspectRatio: "512 / 845",
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.5) 1.4px, transparent 1.9px)",
              backgroundSize: "12px 12px",
              WebkitMaskImage: "url(/what-we-test/labs-hero-art.svg)",
              maskImage: "url(/what-we-test/labs-hero-art.svg)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          <div className="absolute left-[4.2%] top-[clamp(20px,13%,77px)] flex flex-col gap-[10px] text-white">
            <span className="font-medium leading-[normal] text-[20px] sm:text-[28px] lg:text-[36px]">
              Ignored by most
            </span>
            <span className="comprehensive-serif italic leading-[normal] text-[20px] sm:text-[28px] lg:text-[36px]">
              Tested by us.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
