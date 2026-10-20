"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { STEPS } from "../constants";

type StepperProps = {
  step: number;
};

export default function Stepper({ step }: StepperProps) {
  return (
    <div className="mx-auto flex w-full max-w-[280px] flex-1 flex-col items-start">
      <Link href="/" aria-label="Meddy Health home" className="shrink-0 pt-10">
        <Image
          src="/meddy-emr-logo.svg"
          alt="Meddy Health"
          width={148}
          height={24}
          unoptimized
          className="h-[24px] w-auto"
        />
      </Link>

      <div className="flex w-full flex-1 flex-col items-start pb-20 pt-20">
        <ol className="flex h-full w-full flex-col items-start">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            const lineColor =
              i < step - 1
                ? "bg-[#17925a]"
                : i <= step
                  ? "bg-[rgba(23,146,90,0.10)]"
                  : "bg-[#d9d9d9]";
            return (
              <li
                key={s.label}
                className={`flex flex-col items-start ${i < STEPS.length - 1 ? "flex-1" : ""}`}
              >
                <div className="flex items-center gap-[20px]">
                  <span
                    className={`flex h-[63px] w-[63px] shrink-0 items-center justify-center rounded-full ${
                      done
                        ? "bg-[#17925a]"
                        : active
                          ? "bg-[rgba(23,146,90,0.10)]"
                          : "bg-[#d9d9d9]"
                    }`}
                  >
                    {done ? (
                      <Check size={36} strokeWidth={3} className="text-white" />
                    ) : (
                      <span
                        className={`text-[24px] font-medium leading-none ${
                          active ? "text-[#17925a]" : "text-[#8a8a82]"
                        }`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-[24px] font-medium leading-[1.5] ${
                      done ? "text-[#111110]" : "text-[#8a8a82]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    className={`ml-[28.5px] my-[8px] min-h-[40px] w-[6px] flex-1 rounded-full ${lineColor}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function MobileStepper({ step, onBack }: StepperProps & { onBack?: () => void }) {
  return (
    <div className="flex w-full flex-col items-start gap-[16px]">
      <Link href="/" aria-label="Meddy Health home">
        <Image
          src="/meddy-emr-logo.svg"
          alt="Meddy Health"
          width={148}
          height={24}
          unoptimized
          className="h-[24px] w-auto"
        />
      </Link>

      <div className="flex w-full flex-col items-start gap-[12px]">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
            aria-label="Go back"
          >
            <ArrowLeft size={16} className="text-[#111110]" />
          </button>
        ) : null}

        <div className="flex w-full items-center justify-between">
          <p className="text-[16px] font-bold  leading-[1.5] text-[#7b7b7b]">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-[16px] font-medium leading-[1.5] text-[#111110]">{STEPS[step].label}</p>
        </div>

        <div className="flex w-full items-center gap-[8px]">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-[6px] flex-1 rounded-full ${i <= step ? "bg-[#17925a]" : "bg-[rgba(23,146,90,0.10)]"}`}
            />
          ))}
        </div>

        {STEPS[step].next ? (
          <p className="text-[12px] font-normal leading-[1.5] text-[#7b7b7b]">Next: {STEPS[step].next}</p>
        ) : null}
      </div>
    </div>
  );
}
