"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Control, FieldError } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { BookConsultationForm } from "../types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

type CalendarProps = {
  control: Control<BookConsultationForm>;
  error?: FieldError;
};

export default function Calendar({ control, error }: CalendarProps) {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const goPrev = () => {
    if (!canGoPrev) return;
    let y = viewYear;
    let m = viewMonth - 1;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const goNext = () => {
    let y = viewYear;
    let m = viewMonth + 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Controller
      control={control}
      name="date"
      rules={{ required: "Select a date." }}
      render={({ field }) => (
        <div className="flex w-full flex-col items-start gap-[16px]">
          <div className="flex w-full items-center justify-between">
            <p className="text-[20px] font-medium leading-[1.5] text-[#212121] lg:text-[32px]">
              {MONTHS[viewMonth]} {viewYear}
            </p>
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                onClick={goPrev}
                disabled={!canGoPrev}
                aria-label="Previous month"
                className={`flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-white shadow-sm transition-colors lg:h-[36px] lg:w-[36px] ${
                  canGoPrev
                    ? "text-[#17925a] hover:bg-[#f0f0eb]"
                    : "cursor-not-allowed text-[#d9d9d9]"
                }`}
              >
                <ChevronLeft className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px]" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next month"
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] bg-white text-[#17925a] shadow-sm transition-colors hover:bg-[#f0f0eb] lg:h-[36px] lg:w-[36px]"
              >
                <ChevronRight className="h-[16px] w-[16px] lg:h-[20px] lg:w-[20px]" />
              </button>
            </div>
          </div>

          <div className="w-full rounded-[15px] bg-white p-[12px] lg:p-[20px]">
            <div className="grid w-full grid-cols-7 gap-y-[2px] lg:gap-y-[4px]">
              {WEEKDAYS.map((d) => (
                <p
                  key={d}
                  className="text-center text-[14px] font-normal leading-[1.5] text-[#212121] lg:text-[16px]"
                >
                  {d}
                </p>
              ))}
              {cells.map((d, i) => {
                if (d === null) return <span key={`empty-${i}`} />;
                const date = new Date(viewYear, viewMonth, d);
                const iso = toISODate(date);
                const isPast = date < today;
                const selected = field.value === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={isPast}
                    onClick={() => field.onChange(iso)}
                    className={`mx-auto flex h-[40px] w-[40px] items-center justify-center rounded-full text-[14px] leading-[1.5] transition-colors lg:h-[56px] lg:w-[56px] lg:text-[18px] ${
                      isPast
                        ? "cursor-not-allowed font-normal text-[#d9d9d9]"
                        : selected
                          ? "bg-[#17925a] font-normal text-white"
                          : "font-bold text-[#212121] hover:bg-[rgba(23,146,90,0.10)]"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

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
