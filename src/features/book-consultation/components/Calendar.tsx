"use client";

import { useEffect, useState } from "react";
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
  availability?: Record<string, boolean>;
  onViewChange?: (year: number, month: number) => void;
};

export default function Calendar({ control, error, availability, onViewChange }: CalendarProps) {
  const today = startOfDay(new Date());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  useEffect(() => {
    onViewChange?.(viewYear, viewMonth);
  }, [viewYear, viewMonth, onViewChange]);

  const hasAvailability = Boolean(availability && Object.keys(availability).length > 0);

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

  const navArrow = "h-[27.6px] w-[29.19px] transition-opacity";

  return (
    <Controller
      control={control}
      name="date"
      rules={{ required: "Select a date." }}
      render={({ field }) => (
        <div className="flex w-full flex-col items-center gap-[8px]">
          <div className="flex items-center justify-center gap-[16px]">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className={canGoPrev ? "hover:opacity-80" : "cursor-not-allowed opacity-40"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/book-consultation/cal-prev.svg" alt="" className={navArrow} />
            </button>
            <p className="text-[16px] font-normal leading-[1.5] text-[#212121]">
              {MONTHS[viewMonth]} {viewYear}
            </p>
            <button type="button" onClick={goNext} aria-label="Next month" className="hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/book-consultation/cal-next.svg" alt="" className={navArrow} />
            </button>
          </div>

          <div className="w-full border-b border-solid border-[rgba(23,23,24,0.2)] px-[8px] py-[16px]">
            <div className="mb-[24px] grid grid-cols-7">
              {WEEKDAYS.map((d) => (
                <p key={d} className="text-center text-[14px] font-normal leading-[1.5] text-[#212121]">
                  {d}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-[10px]">
              {cells.map((d, i) => {
                if (d === null) return <span key={`empty-${i}`} />;
                const date = new Date(viewYear, viewMonth, d);
                const iso = toISODate(date);
                const isPast = date < today;
                const isBookable = hasAvailability
                  ? availability?.[iso] === true
                  : date.getDay() !== 0 && date.getDay() !== 6; // fallback before availability loads
                const disabled = isPast || !isBookable;
                const selected = field.value === iso;
                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={disabled && !selected}
                    onClick={() => field.onChange(iso)}
                    aria-pressed={selected}
                    className={`group relative flex h-[56px] w-full items-center justify-center text-[14px] font-normal leading-[1.5] ${
                      selected
                        ? "text-white"
                        : disabled
                          ? "cursor-not-allowed text-[#212121] opacity-40"
                          : "text-[#3f6262]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-1/2 top-1/2 h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors ${
                        selected ? "bg-[#17925a]" : disabled ? "" : "group-hover:bg-[rgba(23,146,90,0.10)]"
                      }`}
                    />
                    <span className="relative">{d}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error ? <p className="text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p> : null}
        </div>
      )}
    />
  );
}
