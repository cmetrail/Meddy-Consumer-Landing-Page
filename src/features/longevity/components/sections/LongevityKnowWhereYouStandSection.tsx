"use client";

import { useState } from "react";
import Image from "next/image";
import { useKnowWhereYouStandMotion } from "./useKnowWhereYouStandMotion";

// Figma: desktop node 12613:14359 (1440 wide, #FAFFF9, 120px padding) + variants 12613:13564.
// Top row: photo (left half, as tall as the text column) | right-aligned copy. Below: five DM Serif italic tabs
// (active = 64px dark, others 40px grey) with the matching pills bottom-right. One tab is active at a time.

const CATEGORIES = [
  { label: "Heart & Metabolic Health", rows: [["Blood pressure", "Cholesterol"], ["A1C", "Glucose"]] },
  { label: "Body & Nutrition", rows: [["Weight", "BMI", "Nutrition"], ["Vitamins", "Minerals", "Elements"]] },
  { label: "Fitness", rows: [["Strength", "Cardiovascular activity"], ["VO₂ max"]] },
  { label: "Sleep & Recovery", rows: [["Sleep quality", "Sleep Architecture"], ["Resting heart rate", "Readiness"]] },
  { label: "Labs & Biomarkers", rows: [["Comprehensive physician-directed testing"]] },
];

export default function LongevityKnowWhereYouStandSection() {
  const [active, setActive] = useState(0);
  const current = CATEGORIES[active];
  const sectionRef = useKnowWhereYouStandMotion(active, setActive, CATEGORIES.length);

  return (
    <section ref={sectionRef} id="longevity-know-stand" className="w-full bg-[#FAFFF9]">
      {/* same container as the header. Mobile (node 12721:17790): copy, tabs + pills, then a 244px photo; block A uses `contents` so its children reorder */}
      <div className="mx-auto flex w-full max-w-360 flex-col gap-12 px-5 py-16 lg:px-10 lg:py-[120px]">
        <div className="contents lg:flex lg:flex-row lg:items-center">
          {/* photo: fills its half, as tall as the copy beside it (Figma draws it 100% wide x 205% tall, mirrored) */}
          <div
            data-stand-photo
            className="relative order-3 h-[244px] w-full overflow-hidden lg:order-none lg:h-auto lg:min-w-px lg:flex-1 lg:self-stretch"
          >
            <div data-stand-image className="absolute inset-0">
              <Image
                src="/longevity/know-stand.png"
                alt="A comprehensive view of the factors that shape your long-term health"
                width={1076}
                height={1462}
                sizes="(min-width: 1024px) 680px, 100vw"
                className="pointer-events-none absolute left-0 top-[-14.6%] h-[205.2%] w-full max-w-none -scale-x-100"
              />
            </div>
          </div>

          <div
            className="order-1 flex w-full flex-col items-end gap-8 text-right lg:order-none lg:min-w-px lg:flex-1 lg:gap-[211px]"
          >
            <h2 data-stand-reveal className="comprehensive-serif text-[32px] font-normal italic leading-[1.5] text-[#46524B] lg:whitespace-nowrap lg:text-[36px] lg:leading-[normal]">
              Know where you stand.
            </h2>

            <div className="flex w-full flex-col items-end gap-4 leading-[1.5] lg:gap-[90px]">
              <div data-stand-reveal className="flex flex-col items-end lg:gap-2.5">
                <p className="max-w-[200px] text-[20px] font-medium text-[#6E7A72] lg:max-w-[204px] lg:font-normal">Prevention starts with understanding</p>
                <p className="comprehensive-serif hidden whitespace-nowrap text-[32px] italic text-[#17925A] lg:block">your health today.</p>
                <p className="whitespace-nowrap text-[20px] font-medium italic uppercase text-[#46524B] lg:hidden">Your health today</p>
              </div>
              <p data-stand-reveal className="max-w-[338px] text-[14px] font-normal text-[#6E7A72] lg:max-w-[565px] lg:text-[16px]">
                Meddy gives your physician a comprehensive view of the factors that{" "}
                <b className="font-bold lg:font-normal">shape your long-term health.</b>
              </p>
            </div>
          </div>
        </div>

        <div className="order-2 flex flex-col gap-4 lg:order-none lg:flex-row lg:items-end lg:justify-between lg:gap-0">
          <div data-stand-categories className="flex flex-col items-start gap-2 lg:gap-[15px]">
            {CATEGORIES.map((category, i) => {
              const isActive = i === active;
              return (
                <div key={category.label} data-stand-category>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-controls="longevity-health-factors"
                    className={`comprehensive-serif cursor-pointer text-left italic leading-[1.5] transition-all duration-500 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#17925A] ${
                      isActive ? "text-[20px] text-[#46524B] lg:text-[64px]" : "text-[16px] text-[#A1AAA3] hover:text-[#6E7A72] lg:text-[40px]"
                    }`}
                  >
                    {category.label}
                  </button>
                </div>
              );
            })}
          </div>

          <div data-stand-pills-reveal>
            <div
              id="longevity-health-factors"
              aria-live="polite"
              aria-atomic="true"
              className="flex flex-wrap items-start gap-2 lg:flex-col lg:items-end lg:gap-2.5"
            >
              {current.rows.map((row, r) => (
                <div key={r} className="contents lg:flex lg:flex-wrap lg:items-center lg:justify-end lg:gap-2.5">
                  {row.map((pill) => (
                    <span
                      key={pill}
                      data-stand-pill
                      className="whitespace-nowrap rounded-[31px] border border-[#6E7A72] px-2 py-1 text-[12px] font-normal leading-[1.5] text-[#6E7A72] lg:px-2.5 lg:py-[5px] lg:text-[16px]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
