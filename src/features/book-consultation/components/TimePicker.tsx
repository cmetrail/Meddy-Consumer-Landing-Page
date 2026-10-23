"use client";

import { useEffect } from "react";
import type { Control, FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../types";
import type { SlotStartTime } from "../api";
import { addMinutes, wallClockParts } from "../datetime";

type TimePickerProps = {
  control: Control<BookConsultationForm>;
  error?: FieldError;
  slots: SlotStartTime[];
  duration: number;
  loading?: boolean;
  loadError?: string | null;
};

type Slot = { startTime: string; endTime: string | null; hour: string; minute: string; meridiem: "AM" | "PM" };

const pad = (n: number) => String(n).padStart(2, "0");
const unique = <T,>(items: T[]) => Array.from(new Set(items));

function Dropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative rounded-[8px] border border-solid border-[rgba(17,17,16,0.2)]">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer appearance-none bg-transparent py-[8px] pl-[8px] pr-[30px] text-[14px] font-normal leading-[1.5] text-[#212121] outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-[8px] top-1/2 flex h-[7px] w-[11.89px] -translate-y-1/2 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/book-consultation/cal-chevron-down.svg" alt="" className="h-[11.89px] w-[7px] max-w-none -rotate-90" />
      </span>
    </div>
  );
}

/**
 * Hour / minute / AM-PM dropdowns. Options are derived from the day's real
 * availability, so every combination maps to a bookable slot.
 */
function Picker({
  value,
  onSelect,
  slots,
  loading,
  loadError,
}: {
  value: string;
  onSelect: (slot: Slot) => void;
  slots: Slot[];
  loading?: boolean;
  loadError?: string | null;
}) {
  const selected = slots.find((s) => s.startTime === value);

  useEffect(() => {
    if (!selected && slots.length > 0) onSelect(slots[0]);
  }, [selected, slots, onSelect]);

  if (loading) return <p className="text-[14px] leading-[1.5] text-[#7b7b7b]">Loading available times…</p>;
  if (loadError) return <p className="text-[12px] leading-[1.5] text-[#d92d20]">{loadError}</p>;
  if (!selected) return <p className="text-[14px] leading-[1.5] text-[#7b7b7b]">No times available on this day.</p>;

  const pick = (next: Partial<Pick<Slot, "hour" | "minute" | "meridiem">>) => {
    const want = { hour: selected.hour, minute: selected.minute, meridiem: selected.meridiem, ...next };
    const byMeridiem = slots.filter((s) => s.meridiem === want.meridiem);
    const byHour = byMeridiem.filter((s) => s.hour === want.hour);
    const hourPool = byHour.length ? byHour : byMeridiem;
    const slot = hourPool.find((s) => s.minute === want.minute) ?? hourPool[0];
    if (slot) onSelect(slot);
  };

  const sameMeridiem = slots.filter((s) => s.meridiem === selected.meridiem);
  return (
    <div className="flex items-center gap-[8px]">
      <div className="flex items-center gap-[4px]">
        <Dropdown
          label="Hour"
          value={selected.hour}
          options={unique(sameMeridiem.map((s) => s.hour))}
          onChange={(hour) => pick({ hour })}
        />
        <span className="text-[16px] leading-[1.5] text-black">:</span>
        <Dropdown
          label="Minute"
          value={selected.minute}
          options={unique(sameMeridiem.filter((s) => s.hour === selected.hour).map((s) => s.minute))}
          onChange={(minute) => pick({ minute })}
        />
      </div>
      <Dropdown
        label="AM or PM"
        value={selected.meridiem}
        options={unique(slots.map((s) => s.meridiem))}
        onChange={(meridiem) => pick({ meridiem: meridiem as Slot["meridiem"] })}
      />
    </div>
  );
}

export default function TimePicker({ control, error, slots, duration, loading, loadError }: TimePickerProps) {
  const { setValue } = useFormContext<BookConsultationForm>();

  const parsed: Slot[] = slots.flatMap((s) => {
    const p = wallClockParts(s.startTime);
    if (!p) return [];
    return [
      {
        startTime: s.startTime,
        endTime: s.endTime,
        hour: pad(p.hour % 12 === 0 ? 12 : p.hour % 12),
        minute: pad(p.minute),
        meridiem: p.hour < 12 ? ("AM" as const) : ("PM" as const),
      },
    ];
  });

  return (
    <Controller
      control={control}
      name="time"
      rules={{ required: "Select a time." }}
      render={({ field }) => (
        <div className="flex flex-col items-center gap-[8px]">
          <Picker
            value={field.value}
            slots={parsed}
            loading={loading}
            loadError={loadError}
            onSelect={(slot) => {
              field.onChange(slot.startTime);
              setValue("endTime", slot.endTime ?? addMinutes(slot.startTime, duration), { shouldValidate: true });
            }}
          />
          {error ? <p className="text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p> : null}
        </div>
      )}
    />
  );
}
