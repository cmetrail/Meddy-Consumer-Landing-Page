"use client";

import { CalendarPlus, Check, Sparkles } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";

function parseTime(t: string) {
  const [hm, ap] = t.split(" ");
  const [hRaw, m] = hm.split(":").map(Number);
  let h = hRaw;
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return { h, m };
}

const pad = (n: number) => String(n).padStart(2, "0");

function buildCalendarUrl(date: string, time: string) {
  const dateStr = date.replace(/-/g, "");
  const { h, m } = parseTime(time || "10:00 AM");
  const start = `${dateStr}T${pad(h)}${pad(m)}00`;
  const endH = m + 30 >= 60 ? h + 1 : h;
  const endM = (m + 30) % 60;
  const end = `${dateStr}T${pad(endH)}${pad(endM)}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Meddy Free Consultation",
    dates: `${start}/${end}`,
    details: "30 minute video visit on Google Meet with a licensed board certified physician.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function ConfirmationStep() {
  const { getValues } = useFormContext<BookConsultationForm>();
  const email = getValues("email");
  const date = getValues("date");
  const time = getValues("time");

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-[16px] rounded-[10px] bg-white p-[20px] lg:gap-[24px] lg:p-[32px]">
        <div className="relative flex items-center justify-center">
          <Sparkles size={13} className="absolute -left-[22px] top-[6px] text-[#17925a]" />
          <Sparkles size={19} className="absolute -right-[26px] top-[24px] text-[#17925a]" />
          <Sparkles size={13} className="absolute -left-[24px] bottom-[4px] text-[#17925a]" />
          <Sparkles size={13} className="absolute -right-[18px] bottom-[2px] text-[#17925a]" />
          <span className="flex h-[59px] w-[59px] items-center justify-center rounded-full bg-[#17925a] lg:h-[94px] lg:w-[94px]">
            <Check size={33} strokeWidth={3} className="text-white lg:hidden" />
            <Check size={54} strokeWidth={3} className="hidden text-white lg:block" />
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-[12px] lg:gap-[16px]">
          <h1 className="text-center text-[24px] font-medium leading-[1.3] text-[#111110] lg:text-[40px] lg:text-[#46524b]">
            You&apos;re all set!
          </h1>
          <p className="text-center text-[14px] font-normal leading-[1.5] text-[#46524b] lg:text-[20px] lg:font-medium lg:text-[#7b7b7b]">
            We&apos;ve emailed your Google Meet link to {email || "your email"}.
          </p>
        </div>

        <div className="h-[1px] w-full bg-[#d9d9d9] lg:hidden" />

        <p className="text-center text-[12px] font-normal leading-[1.5] text-[#46524b] lg:text-[16px] lg:text-[#7b7b7b]">
          Join from a private, quiet place with a camera, microphone and a steady internet
          connection.
        </p>

        <a
          href={buildCalendarUrl(date, time)}
          target="_blank"
          rel="noreferrer"
          className="flex h-[45px] w-full items-center justify-center gap-[8px] rounded-[10px] bg-[#17925a] text-[14px] font-medium uppercase leading-[1.5] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 lg:h-[65px] lg:text-[20px]"
        >
          <CalendarPlus size={18} className="lg:hidden" />
          <CalendarPlus size={24} className="hidden lg:block" />
          Add to calendar
        </a>
      </div>
    </div>
  );
}
