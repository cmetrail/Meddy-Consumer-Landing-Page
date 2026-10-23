"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "../../faqs";

export default function FitnessFaqSection() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="relative z-10 w-full bg-[#171718] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-5 py-16 lg:flex-row lg:gap-12 lg:px-[100px] lg:py-[clamp(48px,calc((100dvh-530px)/2),120px)]">
        {/* Left title */}
        <div className="lg:w-[307px] lg:shrink-0">
          <h2 className="text-[32px] font-medium leading-[normal] text-white lg:text-[36px]">
            Frequently Asked <br className="hidden lg:block" />
            <span className="comprehensive-serif font-normal italic">Questions</span>
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:h-[530px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`border-b border-white pb-4 lg:min-h-0 ${isOpen ? "" : "lg:flex-1"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-2 text-left"
                >
                  <span className="text-[18px] font-normal leading-[normal] text-white lg:text-[20px]">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 pr-7 text-[16px] font-light leading-[normal] text-white opacity-60">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
