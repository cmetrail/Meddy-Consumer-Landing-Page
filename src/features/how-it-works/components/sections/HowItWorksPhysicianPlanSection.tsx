"use client";

import Image from "next/image";
import Link from "next/link";

// Figma: desktop node 12688:9490 (1440 x 1027). White section: text column (599px) vertically centred on the left,
// portrait photo (748 wide) flush right and filling the section height. The section is at least one screen tall and
// grows with its content; the photo covers whatever height results. Mobile: node 12765:15287 — photo on top fading to white,
// one 32px paragraph (green serif phrases), intro + button below.



const IMG = "/how-it-works/physician-plan/doctor-plan.png";
const ALT = "Physician reviewing a patient's health plan";

export default function HowItWorksPhysicianPlanSection() {
  return (
    // Keep position inline: Tailwind utilities are !important and would override
    // ScrollTrigger's inline position: fixed while this section is pinned.
    <section data-story-chapter="plan" style={{ position: "relative" }} className="flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-white">
      {/* Desktop photo: right edge, full section height (cover, anchored to the top so the head is never cut) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden overflow-hidden w-[52%] max-w-[748px] lg:block">
        <Image data-story-portrait src={IMG} alt={ALT} fill priority sizes="748px" className="object-cover" style={{ objectPosition: "50% 0%" }} />
      </div>

      {/* Mobile photo: full width, takes the spare height (never shorter than 420px so the head stays in), fades to white */}
      <div className="relative min-h-[420px] w-full flex-1 overflow-hidden lg:hidden">
        <Image data-story-portrait src={IMG} alt={ALT} fill priority sizes="402px" className="object-cover object-top" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[327px] max-h-full"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 29.59%, #FFFFFF 98.858%)" }}
        />
      </div>

      {/* same container as the header */}
      <div className="relative mx-auto flex w-full max-w-360 flex-col px-5 pb-16 pt-8 lg:px-10 lg:py-[120px]">
        <div className="flex w-full flex-col items-start gap-8 lg:w-[599px] lg:gap-4">
          <div className="flex w-full flex-col items-start" style={{ gap: 24 }}>
            {/* mobile: one paragraph, green serif phrases */}
            <p data-story-reveal
              className="w-full text-[32px] font-medium leading-[1.5] text-[#111110] lg:hidden"
            >
              Your <span className="comprehensive-serif italic text-[#17925A]">physician</span> builds the plan.{" "}
              <span className="comprehensive-serif italic text-[#17925A]">Your data. Your labs. Your goals.</span>
            </p>
            <div className="hidden w-full flex-col items-start lg:flex" style={{ gap: 8 }}>
              <h2 data-story-reveal
                className="w-full whitespace-pre-wrap text-[0px] font-normal leading-[0] text-[#111110]"
              >
                <span className="block">
                  <span className="text-[32px] font-medium leading-[1.5] lg:text-[56px]">Your</span>
                  <span className="text-[32px] leading-[1.5] lg:text-[55px]"> </span>
                  <span className="comprehensive-serif text-[36px] italic leading-[1.5] text-[#17925A] lg:text-[64px]">physician</span>
                  <span className="text-[32px] leading-[1.5] text-[#17925A] lg:text-[55px]"> </span>
                </span>
                <span className="block text-[32px] font-medium leading-[1.5] lg:text-[56px]">builds the plan</span>
              </h2>

              <p data-story-reveal
                className="comprehensive-serif w-full text-[32px] italic leading-[1.5] text-[#17925A] lg:text-[56px]"
              >
                Your data. Your labs. Your goals.
              </p>
            </div>

            <p data-story-reveal
              className="w-full text-[16px] font-normal leading-[1.5] text-[#111110] lg:text-[20px]"
            >
              Reviewed by a physician who knows you. One <br className="hidden lg:block" />plan that adapts as you do.
            </p>
          </div>

          <Link data-story-reveal
            href="/book-consultation"
            className="flex items-center justify-center rounded-[35px] bg-[#17925A] px-5 py-3 text-[16px] lg:px-6 lg:py-4 lg:text-[20px] font-normal leading-[normal] text-white transition-opacity hover:opacity-85"
          >
            Book Free Consultation
          </Link>
        </div>

      </div>
    </section>
  );
}
