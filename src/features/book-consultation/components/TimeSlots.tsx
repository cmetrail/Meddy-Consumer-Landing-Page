"use client";

import type { Control, FieldError } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { BookConsultationForm } from "../types";
import { TIME_SLOTS } from "../constants";

type TimeSlotsProps = {
  control: Control<BookConsultationForm>;
  error?: FieldError;
};

export default function TimeSlots({ control, error }: TimeSlotsProps) {
  return (
    <Controller
      control={control}
      name="time"
      rules={{ required: "Select a time." }}
      render={({ field }) => (
        <div className="flex w-full flex-row flex-wrap items-center justify-start gap-[12px] lg:flex-col lg:items-center lg:gap-[16px]">
          {TIME_SLOTS.map((t) => {
            const on = field.value === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => field.onChange(t)}
                className={`flex h-[43px] w-[138px] items-center justify-center rounded-full transition-colors lg:h-[52px] lg:w-[184px] ${
                  on
                    ? "bg-[rgba(23,146,90,0.10)] text-[18px] font-medium leading-[1.5] text-[#17925a] lg:text-[24px]"
                    : "text-[14px] font-normal leading-[1.5] text-[#7b7b7b] hover:bg-[rgba(23,146,90,0.05)] hover:text-[#17925a] lg:text-[20px]"
                }`}
              >
                {t}
              </button>
            );
          })}
          {error ? (
            <p className="text-[12px] leading-[1.5] text-[#d92d20]">
              {error.message}
            </p>
          ) : null}
        </div>
      )}
    />
  );
}
