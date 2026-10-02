"use client";

import Image from "next/image";

// lg+: Figma node 11264:9649 (1440 x 1043) scaled by --u so the section fits one viewport
const u = (n: number) => `calc(${n} * var(--u))`;

export default function BiomarkersAnnualLabsSection() {
  return (
    <section
      className="relative flex w-full items-center overflow-hidden bg-white py-[80px] lg:min-h-[calc(1043*var(--u))] lg:py-0"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000958773))" } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-360 px-5 lg:px-10">
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[var(--g41)]" style={{ ["--g41" as string]: u(41) }}>
          {/* Left column */}
          <div className="flex flex-col gap-[60px] lg:w-[var(--w)] lg:shrink-0 lg:gap-[var(--g155)]" style={{ ["--w" as string]: u(659), ["--g155" as string]: u(155) }}>
            <div className="flex flex-col uppercase">
              <h2
                className="font-medium leading-[1.416] text-[#81A972] text-[48px] sm:text-[64px] lg:text-[length:max(48px,var(--d))]"
                style={{ ["--d" as string]: u(100) }}
              >
                More Than <br className="hidden lg:block" />
                Annual Labs
              </h2>
              <p
                className="leading-[1.416] text-[#46524B] text-[16px] sm:text-[18px] lg:text-[length:max(14px,var(--d))]"
                style={{ ["--d" as string]: u(20) }}
              >
                Test when it matters
              </p>
            </div>

            <div className="flex max-w-[594px] flex-col gap-[37px] lg:max-w-[var(--w)] lg:gap-[var(--g37)]" style={{ ["--w" as string]: u(594), ["--g37" as string]: u(37) }}>
              <p className="uppercase leading-[1.416] text-[#46524B]">
                <span className="italic text-[18px] sm:text-[22px] lg:text-[length:max(15px,var(--s))]" style={{ ["--s" as string]: u(24) }}>
                  Your health doesn&apos;t change once a year.
                </span>{" "}
                <span className="font-bold text-[22px] sm:text-[26px] lg:text-[length:max(18px,var(--b))]" style={{ ["--b" as string]: u(32) }}>
                  Why test it that way?
                </span>
              </p>
              <p
                className="max-w-[436px] font-medium leading-[1.416] text-[16px] lg:max-w-[var(--w)] lg:text-[length:max(12px,var(--d))]"
                style={{ ["--w" as string]: u(436), ["--d" as string]: u(16) }}
              >
                <span className="text-[#8A8A82]">
                  Your physician can order testing when it&apos;s useful to understand your health,
                </span>{" "}
                <span className="text-[#111110]">
                  investigate a concern, establish a baseline, or measure whether an intervention is working.
                </span>
              </p>
            </div>
          </div>

          {/* Right: image (absolute on lg, as in Figma) */}
          <div className="relative mx-auto aspect-[723/829] w-full max-w-[420px] overflow-hidden lg:absolute lg:right-[var(--r)] lg:top-[var(--t)] lg:mx-0 lg:w-[var(--w)] lg:max-w-none" style={{ ["--w" as string]: u(723), ["--r" as string]: u(-48), ["--t" as string]: u(-121) }}>
            <Image
                src="/biomarkers/annual-labs-new.png"
                alt="Meddy clinically appropriate lab testing"
                width={736}
                height={1009}
                sizes="(min-width: 1024px) 840px, 100vw"
                className="absolute left-[-9.27%] top-0 h-[138.35%] w-[115.76%] max-w-none"
              />
          </div>

          <p
            className="max-w-[310px] leading-[1.416] text-[#46524B] text-[14px] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none lg:text-[length:max(11px,var(--d))]"
            style={{ ["--d" as string]: u(14), ["--l" as string]: u(684), ["--t" as string]: u(87), ["--w" as string]: u(310) }}
          >
            With <span className="font-semibold italic">Meddy,</span>{" "}
            clinically appropriate lab testing isn&apos;t limited to one annual panel.
          </p>
        </div>
      </div>
    </section>
  );
}
