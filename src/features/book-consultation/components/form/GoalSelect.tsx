"use client";

import { Check } from "lucide-react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import { GOALS } from "../../constants";

type GoalSelectProps = {
  control: Control<BookConsultationForm>;
  error?: { message?: string };
};

export default function GoalSelect({ control, error }: GoalSelectProps) {
  return (
    <Controller
      control={control}
      name="goals"
      rules={{ validate: (v) => (Array.isArray(v) && v.length > 0) || "Select at least one goal." }}
      render={({ field }) => {
        const selected: string[] = field.value ?? [];
        const toggle = (g: string) => {
          const next = selected.includes(g) ? selected.filter((x) => x !== g) : [...selected, g];
          field.onChange(next);
        };
        return (
          <div className="flex w-full flex-col items-start gap-[8px]">
            <div className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2">
              {GOALS.map((g) => {
                const on = selected.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggle(g)}
                    aria-pressed={on}
                    className={`flex w-full items-center gap-[8px] overflow-clip rounded-[10px] border border-solid px-[8px] py-[12px] text-left transition-colors ${
                      on
                        ? "border-[rgba(51,103,79,0.5)] bg-[rgba(23,146,90,0.1)]"
                        : "border-[rgba(12,13,15,0.2)] bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-solid transition-colors ${
                        on ? "border-[#17925a] bg-[#17925a]" : "border-[#979797] bg-transparent"
                      }`}
                    >
                      <Check
                        size={20}
                        strokeWidth={2}
                        className={`text-white transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
                      />
                    </span>
                    <span
                      className={`text-[14px] font-normal leading-[1.5] ${on ? "text-[#111110]" : "text-[#979797]"}`}
                    >
                      {g}
                    </span>
                  </button>
                );
              })}
            </div>
            {error ? <p className="text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p> : null}
          </div>
        );
      }}
    />
  );
}
