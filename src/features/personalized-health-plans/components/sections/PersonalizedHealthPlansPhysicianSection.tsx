"use client";

import Image from "next/image";
import Link from "next/link";
import { useHealthPlanPhysicianMotion } from "./useHealthPlanPhysicianMotion";

// Figma: desktop node 12613:16643 (1440 x ~1026, page bg #FFFFF9) + mobile node 12721:16576 (402 wide).
// Desktop: right-aligned serif heading, a text column on the left (statement, bullets, "Built around your health" + CTA) and a
// 645 x 864 portrait on the right edge with six glass pills over it, fading to the page colour at the bottom.
// Mobile: the same copy stacked (serif-italic bullets, caps goals), then a 289 x 387 portrait with pills, fading out at the bottom.
const A = "/personalized-health-plans/physician";

// pill positions (left / top) measured from the portrait's top-left in Figma px
const PILLS_D = [
  { label: "Recovery", left: 79, top: 24.5 },
  { label: "Labs", left: 146, top: 270.5 },
  { label: "Medication", left: 434, top: 79.5 },
  { label: "Sleep", left: -25, top: 485.5 },
  { label: "Wearables", left: -46, top: 162.5 },
  { label: "Exercise", left: 429, top: 258.5 },
];
const PILLS_M = [
  { label: "Recovery", left: 57.66, top: -11.25, w: 75.255 },
  { label: "Labs", left: 65.28, top: 121.36, w: 53.02 },
  { label: "Medication", left: 198.78, top: 13.39, w: 84.662 },
  { label: "Sleep", left: -11.33, top: 217.68, w: 58.151 },
  { label: "Wearables", left: -20.74, top: 72.97, w: 81.241 },
  { label: "Exercise", left: 192.06, top: 115.98, w: 70.124 },
];

const BULLETS = ["Reviews what's changing.", "Understands what's working.", "Identifies what needs attention."];

function Bar() {
  return (
    <span className="relative block h-[25px] w-[7px] shrink-0 -scale-y-100">
      <Image src={`${A}/bar.svg`} alt="" fill unoptimized className="block max-w-none" />
    </span>
  );
}
function Dot() {
  return (
    <span className="relative block size-[8px] shrink-0">
      <Image src={`${A}/dot.svg`} alt="" fill unoptimized className="block max-w-none" />
    </span>
  );
}

const PILL = "flex items-center justify-center whitespace-nowrap rounded-[29px] border border-solid border-white bg-[rgba(23,146,90,0.3)] backdrop-blur-[10px]";

export default function PersonalizedHealthPlansPhysicianSection() {
  const sectionRef = useHealthPlanPhysicianMotion();
  return (
    <div ref={sectionRef} id="personalized-health-plans-physician" className="relative w-full bg-[#FFFFF9]">
      {/* ---------------------------------------------------------------- mobile */}
      <div data-physician-mobile className="relative flex flex-col items-center gap-8 px-5 pt-16 lg:hidden">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-4">
            <div data-physician-copy className="flex w-full flex-col items-start gap-2">
              <p className="w-full text-[32px] font-medium leading-[1.5] text-[#6e7a72]">
                Not an <span className="comprehensive-serif font-normal italic text-[#17925a]">algorithm</span> handing you another generic plan.
              </p>
              <p className="w-full text-[12px] font-normal leading-[1.5] text-[#a1aaa3]">
                Your <b className="font-bold text-[#6e7a72]">Meddy physician has access to the information behind your progress</b>—not just what you remember to mention during an appointment.
              </p>
            </div>
            <div data-physician-bullets className="flex flex-col items-start gap-2">
              {BULLETS.map((t) => (
                <div data-physician-bullet key={t} className="flex items-center gap-2">
                  <Bar />
                  <p className="comprehensive-serif whitespace-nowrap text-[16px] font-normal italic leading-[1.5] text-[#6e7a72]">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-physician-cta-group className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-[5px]">
              <p className="w-full px-[2px] text-[16px] font-normal leading-[1.5] text-[#a1aaa3]">Built around your health,</p>
              <div className="flex items-center gap-2">
                {["YOUR GOALS", "YOUR LIFE"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <Dot />
                    <p className="whitespace-nowrap text-[20px] font-medium leading-[1.5] text-[#6e7a72]">{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link data-physician-cta href="/book-consultation" className="relative inline-flex items-center justify-center overflow-hidden rounded-[35px] bg-[#17925a] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#17925a] px-5 py-3 text-[16px] font-normal leading-[normal] text-white">
              <span data-physician-shine aria-hidden="true" className="pointer-events-none absolute -inset-y-1/2 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent" />
              <span className="relative">Build My Health Plan</span>
            </Link>
          </div>
        </div>

        {/* portrait stage: 310 x 400, centred, with the fade over its lower half */}
        <div data-physician-stage className="relative h-[398.5px] w-[309.6px] shrink-0">
          <div data-physician-depth className="absolute inset-0">
            <div data-physician-pointer className="absolute inset-0">
              <div data-physician-portrait className="absolute" style={{ left: 20.74, top: 11.25, width: 288.835, height: 387.247 }}>
                <Image src={`${A}/portrait-m.png`} alt="A Meddy physician" fill sizes="290px" className="pointer-events-none object-cover" />
              </div>
              {PILLS_M.map((p) => (
                <div data-physician-pill key={p.label} className="absolute h-[28.221px]" style={{ left: p.left + 20.74, top: p.top + 11.25, width: p.w }}>
                  <div data-physician-float className={`${PILL} h-full w-full`}>
                    <p className="text-[12px] font-normal leading-[normal] text-black">{p.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div data-physician-fade className="pointer-events-none absolute bottom-0 left-1/2 h-[381px] w-[401px] -translate-x-1/2">
          <Image src={`${A}/fade-m.png`} alt="" fill sizes="401px" className="object-cover" />
        </div>
      </div>

      {/* full-bleed fade into the FAQ: overhangs the section by 22.5px like the design */}
      <div data-physician-fade className="pointer-events-none absolute -bottom-[22.5px] left-0 right-0 hidden h-[373px] lg:block">
        <Image src={`${A}/fade.png`} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      {/* ---------------------------------------------------------------- desktop */}
      <div data-physician-desktop className="relative mx-auto hidden w-full max-w-360 lg:block">
        {/* portrait: 645 x 864 against the container's right edge, pills placed from its top-left */}
        <div data-physician-stage className="pointer-events-none absolute right-0 top-[160.5px] h-[864px] w-[645px]">
          <div data-physician-depth className="absolute inset-0">
            <div data-physician-pointer className="absolute inset-0">
              <div data-physician-portrait className="absolute inset-0">
                <Image src={`${A}/portrait.png`} alt="A Meddy physician reviewing a patient's progress" fill priority sizes="645px" className="object-cover" />
              </div>
              {PILLS_D.map((p) => (
                <div data-physician-pill key={p.label} className="absolute" style={{ left: p.left, top: p.top }}>
                  <div data-physician-float className={`${PILL} px-6 py-4`}>
                    <p className="text-[20px] font-normal leading-[1.5] text-black">{p.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* same container as the header */}
        <div className="relative flex h-[1038px] w-full flex-col items-end px-10 py-[100px]">
          <p data-physician-heading className="comprehensive-serif w-[462px] text-right text-[32px] font-normal italic leading-[1.5] text-[#46524b]">
            Personalized by a physician who sees the whole picture.
          </p>
          <div className="flex w-full items-center justify-between">
            <div className="flex w-[635px] shrink-0 flex-col items-start gap-[60px]">
              <div className="flex w-full flex-col items-start gap-[80px]">
                <div data-physician-copy className="flex w-full flex-col items-start gap-2">
                  <p className="w-full text-[40px] font-medium leading-[1.5] text-[#6e7a72]">
                    Not an <span className="comprehensive-serif font-normal italic text-[#17925a]">algorithm</span> handing you another generic plan.
                  </p>
                  <p className="w-[523px] text-[20px] font-normal leading-[1.5] text-[#a1aaa3]">
                    Your <span className="text-[#6e7a72]">Meddy physician has access to the information behind your progress</span>—not just what you remember to mention during an appointment.
                  </p>
                </div>
                <div data-physician-bullets className="flex flex-col items-start gap-2">
                  {BULLETS.map((t) => (
                    <div data-physician-bullet key={t} className="flex items-center gap-2">
                      <Bar />
                      <p className="whitespace-nowrap text-[20px] font-normal leading-[1.5] text-[#6e7a72]">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div data-physician-cta-group className="flex w-[339px] flex-col items-start gap-6">
                <div className="flex w-full flex-col items-start gap-[5px]">
                  <p className="w-full px-[2px] text-[20px] font-normal leading-[1.5] text-[#a1aaa3]">Built around your health,</p>
                  <div className="flex items-center gap-[15px]">
                    {["Your goals", "Your life."].map((t) => (
                      <div key={t} className="flex items-center gap-[10px]">
                        <Dot />
                        <p className="comprehensive-serif whitespace-nowrap text-[20px] font-normal italic leading-[1.5] text-[#6e7a72]">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link data-physician-cta href="/book-consultation" className="relative inline-flex items-center justify-center overflow-hidden rounded-[35px] bg-[#17925a] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#17925a] px-6 py-4 text-[20px] font-normal leading-[normal] text-white transition-opacity hover:opacity-85">
                  <span data-physician-shine aria-hidden="true" className="pointer-events-none absolute -inset-y-1/2 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent" />
                  <span className="relative">Build My Health Plan</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
