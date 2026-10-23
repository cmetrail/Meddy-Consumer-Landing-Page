"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { STEPS } from "../constants";

type StepperProps = {
  step: number;
};

export default function Stepper({ step }: StepperProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Line runs from the first circle's center to the last; green fill ends at the current circle.
  const [line, setLine] = useState({ left: 34, right: 47, fill: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const dots = dotRefs.current;
      const first = dots[0];
      const last = dots[STEPS.length - 1];
      if (!list || !first || !last) return;
      const origin = list.getBoundingClientRect().left;
      const center = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.left - origin + r.width / 2;
      };
      const current = dots[Math.min(step, STEPS.length - 1)] ?? first;
      setLine({
        left: center(first),
        right: list.clientWidth - center(last),
        fill: center(current) - center(first),
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [step]);

  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <span
        aria-hidden
        className="absolute top-[18px] h-[3px] -translate-y-1/2 rounded-full bg-[#d9d9d9]"
        style={{ left: line.left, right: line.right }}
      />
      <span
        aria-hidden
        className="absolute top-[18px] h-[3px] -translate-y-1/2 rounded-full bg-[#17925a] transition-[width] duration-300"
        style={{ left: line.left, width: line.fill }}
      />
      <ol ref={listRef} className="relative flex w-full items-start justify-between">
        {STEPS.map((s, i) => {
          const reached = i <= step;
          return (
            <li key={s.label} className="flex flex-col items-center gap-[8px]">
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className={`flex h-[36px] w-[35px] items-center justify-center rounded-full text-[14px] font-normal leading-[1.5] transition-colors ${reached
                  ? "bg-[#17925a] text-white"
                  : "bg-[#f5f5f0] text-[#a6a6a6] ring-1 ring-inset ring-[#7b7b7b]"
                  }`}
              >
                {i + 1}
              </span>
              <span
                className={`whitespace-nowrap text-[14px] font-normal leading-[1.5] text-[#111110] ${reached ? "" : "opacity-50"
                  }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function MobileStepper({ step, onBack }: StepperProps & { onBack?: () => void }) {
  return (
    <div className="flex w-full flex-col items-start gap-[16px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="text-[#111110]" />
          </button>
          ) : (
            <span className="h-[28px] w-[28px]" />
          )}

          <p className="text-[16px] font-bold leading-[1.5] text-[#7b7b7b]">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <p className="text-[16px] font-medium leading-[1.5] text-[#111110]">{STEPS[step].label}</p>
      </div>

      <div className="flex w-full items-center gap-[8px]">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-[6px] flex-1 rounded-full ${i <= step ? "bg-[#17925a]" : "bg-[#d9d9d9]"}`}
          />
        ))}
      </div>

      {STEPS[step].next ? (
        <p className="text-[12px] font-normal leading-[1.5] text-[#7b7b7b]">Next: {STEPS[step].next}</p>
      ) : null}
    </div>
  );
}
