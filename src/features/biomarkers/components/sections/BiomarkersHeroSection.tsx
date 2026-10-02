"use client";

import Image from "next/image";
import Header from "@/components/Header";

// lg+: Figma node 11264:9616 (1440 x 1025) scaled by --u so the hero fits one viewport
const u = (n: number) => `calc(${n} * var(--u))`;

export default function BiomarkersHeroSection() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden lg:min-h-[calc(1025*var(--u))]"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000975609))" } as React.CSSProperties}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(230.71deg, rgb(255,255,255) 8.906%, rgb(178,197,208) 60.179%, rgb(119,160,185) 100%)",
        }}
      />
      <Image
        src="/biomarkers/biomarkers-hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />

      <div className="relative z-10">
        <Header variant="light" active="Biomarkers" />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-360 flex-1 flex-col gap-16 px-5 pb-[80px] pt-[56px] lg:px-10 lg:pb-[var(--p120)] lg:gap-[var(--g156)] lg:pt-[var(--p110)]"
        style={{ ["--p100" as string]: u(100), ["--p120" as string]: u(120), ["--p110" as string]: u(130), ["--g156" as string]: u(156) }}
      >
        <div className="flex flex-col gap-4 lg:gap-[var(--g16)]" style={{ ["--g16" as string]: u(16) }}>
          <div className="flex flex-col gap-8 lg:gap-[var(--g32)]" style={{ ["--g32" as string]: u(32) }}>
            <div className="flex flex-col gap-[5px]">
              <h1
                className="comprehensive-serif uppercase leading-[1.1] text-[#17925A] text-[52px] sm:text-[72px] lg:text-[length:max(56px,var(--d))]"
                style={{ ["--d" as string]: u(96) }}
              >
                Go beyond
              </h1>
              <p
                className="font-bold italic uppercase leading-[1.12] text-[#6C6C6C] text-[24px] sm:text-[30px] lg:text-[length:max(24px,var(--d))]"
                style={{ ["--d" as string]: u(36) }}
              >
                the annual Blood test
              </p>
            </div>
            <p
              className="max-w-[591px] text-[16px] leading-[1.5] text-[#6E7A72] sm:text-[18px] lg:max-w-[var(--w)] lg:text-[length:max(15px,var(--d))] lg:leading-[normal]"
              style={{ ["--d" as string]: u(20), ["--w" as string]: u(591) }}
            >
              Get comprehensive{" "}
              <span className="font-bold">
                lab testing, track your biomarkers over time,
              </span>{" "}
              and understand what is actually changing your health.
              <br className="hidden lg:block" />
              <br className="hidden lg:block" />
            </p>
          </div>

          <button
            className="w-fit rounded-[35px] bg-[#17925A] px-[24px] py-[16px] text-[16px] leading-none text-white sm:text-[18px] lg:text-[length:max(15px,var(--d))]"
            style={{ ["--d" as string]: u(20) }}
          >
            Commonly Ordered Tests
          </button>
        </div>

        <p
          className="max-w-[540px] uppercase leading-[1.42] text-[#46524B] text-[20px] sm:text-[22px] lg:max-w-[var(--w)] lg:text-[length:max(16px,var(--d))]"
          style={{ ["--d" as string]: u(24), ["--w" as string]: u(540) }}
        >
          See what&apos;s improving, what needs attention, and where to focus
          next.
        </p>
      </div>
    </section>
  );
}
