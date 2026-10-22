"use client";

import { useRef } from "react";
import type { Control, FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../types";
import type { SlotStartTime } from "../api";
import { addMinutes, formatSlotTime } from "../datetime";

type TimeSlotsProps = {
  control: Control<BookConsultationForm>;
  error?: FieldError;
  slots: SlotStartTime[];
  duration: number;
  loading?: boolean;
  loadError?: string | null;
};

export default function TimeSlots({
  control,
  error,
  slots,
  duration,
  loading,
  loadError,
}: TimeSlotsProps) {
  const { setValue } = useFormContext<BookConsultationForm>();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Controller
      control={control}
      name="time"
      rules={{ required: "Select a time." }}
      render={({ field }) => (
        <div className="flex w-full flex-col gap-[8px]">
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex max-h-[176px] w-full flex-col items-center gap-[10px] overflow-x-hidden overflow-y-auto pr-1 [scrollbar-width:thin] lg:max-h-[232px] lg:gap-[16px]"
          >
            {loading ? (
              <p className="text-[14px] leading-[1.5] text-[#7b7b7b] lg:text-[16px]">
                Loading available times…
              </p>
            ) : loadError ? (
              <p className="text-[12px] leading-[1.5] text-[#d92d20]">{loadError}</p>
            ) : slots.length === 0 ? (
              <p className="text-[14px] leading-[1.5] text-[#7b7b7b] lg:text-[16px]">
                No times available on this day.
              </p>
            ) : (
              slots.map((slot) => {
                const on = field.value === slot.startTime;
                return (
                  <button
                    key={slot.startTime}
                    type="button"
                    onClick={() => {
                      field.onChange(slot.startTime);
                      setValue(
                        "endTime",
                        slot.endTime ?? addMinutes(slot.startTime, duration),
                        { shouldValidate: true },
                      );
                    }}
                    className={`flex h-[43px] w-[138px] shrink-0 items-center justify-center rounded-full transition-colors lg:h-auto lg:w-auto lg:px-[24px] lg:py-1 ${
                      on
                        ? "bg-[rgba(23,146,90,0.10)] text-[18px] font-medium leading-[1.5] text-[#17925a] lg:text-[16px]"
                        : "text-[14px] font-normal leading-[1.5] text-[#7b7b7b] hover:bg-[rgba(23,146,90,0.05)] hover:text-[#17925a] lg:text-[16px]"
                    }`}
                  >
                    {formatSlotTime(slot.startTime)}
                  </button>
                );
              })
            )}
          </div>
          {error ? (
            <p className="text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}
