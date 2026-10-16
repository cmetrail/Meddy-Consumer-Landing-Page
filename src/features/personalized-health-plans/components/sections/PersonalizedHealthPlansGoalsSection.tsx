"use client";

import Image from "next/image";
import { useHealthPlanGoalsMotion } from "./useHealthPlanGoalsMotion";

// Figma: desktop node 12613:16124 (1440 x 1691, page bg #FFFFF9). Heading row (two columns), then a 2-column grid:
// "Your Goals" (photo as tall as its row) | "Your Preferences" (497px photo), then "Your plan should fit your life" |
// "Your Health" (442px photo). Each card = photo + title + pill chips. Mobile (node 12721:16088): one left-aligned column —
// heading, the three cards, then the statement last.
const A = "/personalized-health-plans/goals";

// photo = the Figma layer cropped inside its rounded frame (height / top as %)
const PHOTOS = {
  goals: { src: `${A}/goals.jpg`, alt: "Your Goals", img: { height: "151.39%", top: "-20.84%" } },
  preferences: { src: `${A}/preferences.jpg`, alt: "Your Preferences", img: { height: "100%", top: "0%" } },
  health: { src: `${A}/health.jpg`, alt: "Your Health", img: { height: "193.85%", top: "-27.44%" } },
};

function Photo({ photo, className }: { photo: (typeof PHOTOS)[keyof typeof PHOTOS]; className: string }) {
  return (
    <div data-goals-photo className={`relative w-full overflow-hidden rounded-[8.497px] lg:rounded-[15px] ${className}`}>
      <div data-goals-parallax className="absolute inset-0">
        <div data-goals-pointer className="absolute inset-0">
          <Image
            data-goals-image
            src={photo.src}
            alt={photo.alt}
            width={1400}
            height={1400}
            sizes="(min-width: 1024px) 656px, 100vw"
            className="pointer-events-none absolute left-0 w-full max-w-none"
            style={{ height: photo.img.height, top: photo.img.top }}
          />
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span data-goals-chip className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-[31px] border border-solid border-[#6e7a72] px-[10px] py-[5px] text-[12px] font-normal leading-[1.5] text-[#6e7a72] lg:text-[16px]">
      {children}
    </span>
  );
}

/** title + two rows of chips; `right` aligns everything to the right edge */
function Caption({ title, rows, right, dim }: { title: string; rows: string[][]; right?: boolean; dim?: boolean }) {
  return (
    <div className={`flex w-full shrink-0 flex-col items-start gap-2 lg:w-auto ${right ? "lg:items-end" : ""} ${dim ? "opacity-80 lg:opacity-100" : ""}`}>
      <p data-goals-caption className="whitespace-nowrap text-[20px] font-medium leading-[1.5] text-[#46524b] lg:text-[32px]">{title}</p>
      <div className={`flex flex-col items-start gap-[10px] ${right ? "lg:items-end" : ""}`}>
        {rows.map((row, i) => (
          <div key={i} className={`flex flex-wrap items-center gap-[10px] ${right ? "lg:justify-end" : ""}`}>
            {row.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PersonalizedHealthPlansGoalsSection() {
  const sectionRef = useHealthPlanGoalsMotion();
  return (
    <section ref={sectionRef} id="personalized-health-plans-goals" aria-labelledby="health-plan-goals-heading" className="relative w-full overflow-hidden bg-[#FFFFF9]">
      {/* same container as the header */}
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-8 px-5 py-16 lg:gap-12 lg:px-10 lg:py-[120px]">
        {/* heading row */}
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-0">
          <div className="min-w-px lg:flex-1">
            <h2 id="health-plan-goals-heading" className="whitespace-nowrap text-[24px] font-medium leading-[1.5] text-[#46524b] lg:text-[40px]">
              <span className="block overflow-hidden"><span data-goals-heading className="block">Everything starts with</span></span>
              <span className="block overflow-hidden"><span data-goals-heading className="comprehensive-serif block text-[32px] font-normal italic text-[#17925a] lg:text-[40px]">your goals.</span></span>
            </h2>
          </div>
          <div data-goals-intro className="flex min-w-px flex-col gap-2 leading-[1.5] lg:flex-1">
            <p className="w-full text-[20px] font-medium text-[#46524b] lg:text-[32px]">Tell us where you want to go.</p>
            <p className="w-full text-[14px] font-normal text-[#6e7a72] lg:text-[20px]">
              Your plan begins with what matters to you and the realities of your everyday life.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          {/* row 1: goals | preferences */}
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div data-goals-card className="flex min-w-px flex-col gap-4 lg:flex-1 lg:self-stretch">
              <Photo photo={PHOTOS.goals} className="h-[332.5px] lg:h-auto lg:min-h-px lg:flex-1" />
              <Caption title="Your Goals" rows={[["Lose weight", "Improve fitness", "Sleep better"], ["Improve metabolic health", "Stay healthy"]]} />
            </div>
            <div data-goals-card className="flex min-w-px flex-col items-start gap-4 lg:flex-1 lg:items-end lg:gap-[25px]">
              <Photo photo={PHOTOS.preferences} className="h-[322.5px] shrink-0 lg:h-[497px]" />
              <Caption title="Your Preferences" right dim rows={[["Foods you enjoy", "Exercises you like", "Schedule"], ["Equipment", "Lifestyle"]]} />
            </div>
          </div>

          {/* row 2: statement | health */}
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div data-goals-statement className="order-2 flex min-w-px flex-col gap-2 leading-[1.5] lg:order-none lg:flex-1">
              <p className="comprehensive-serif w-full text-[32px] font-normal italic text-[#17925a] lg:w-[364px] lg:text-[64px]">
                {"Your plan should fit your life".split(" ").map((word, index) => (
                  <span key={index} className="comprehensive-serif"><span data-goals-word className="comprehensive-serif inline-block">{word}</span>{index < 5 ? " " : ""}</span>
                ))}
              </p>
              <p data-goals-statement-detail className="whitespace-nowrap text-[16px] font-normal text-[#46524b] lg:text-[20px]">Not the other way around.</p>
            </div>
            <div data-goals-card className="order-1 flex min-w-px flex-col items-start gap-4 lg:order-none lg:flex-1 lg:items-end lg:gap-2">
              <Photo photo={PHOTOS.health} className="h-[277px] shrink-0 lg:h-[442px]" />
              <Caption title="Your Health" right rows={[["Medical history", "Medications", "Injuries"], ["Conditions", "Biomarkers"]]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
