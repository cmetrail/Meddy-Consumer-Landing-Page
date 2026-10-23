"use client";

import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import type { LeadBookingResult } from "../../api";

type ConfirmationStepProps = {
  booking?: LeadBookingResult | null;
};

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

function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
}

// Slot times are wall-clock ISO strings (see datetime.ts), so read the digits directly.
const STAMP = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

function wallStamp(iso: string) {
  const m = iso.match(STAMP);
  return m ? `${m[1]}${m[2]}${m[3]}T${m[4]}${m[5]}00` : null;
}

function calendarHref(booking: LeadBookingResult | null | undefined, start: string, end: string) {
  const s = wallStamp(start);
  const e = wallStamp(end);
  if (!s || !e) return null;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Meddy consultation",
    dates: `${s}/${e}`,
    ctz: "America/New_York",
  });
  if (booking?.meetUrl) {
    params.set("location", booking.meetUrl);
    params.set("details", `Join: ${booking.meetUrl}`);
  }
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Booked state (Figma 14837:48733). The appointment and Meet link are created server-side. */
export default function ConfirmationStep({ booking }: ConfirmationStepProps) {
  const { getValues } = useFormContext<BookConsultationForm>();
  const email = getValues("email");
  const start = booking?.startTime ?? getValues("time");
  const end = booking?.endTime ?? getValues("endTime");

  const day = start?.match(STAMP);
  const dateLabel = day
    ? `${ordinal(Number(day[3]))} ${MONTHS[Number(day[2]) - 1]}, ${day[1]}`
    : "";
  const href = calendarHref(booking, start, end);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-[8px] py-[32px]">
      <span className="flex h-[94.5px] w-[94.5px] shrink-0 items-center justify-center rounded-full bg-[#17925a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/book-consultation/booked-calendar.svg" alt="" className="h-[54px] w-[54px]" />
      </span>

      <div className="flex flex-col items-center gap-[16px] text-center leading-[1.5]">
        <div className="flex flex-col items-center gap-[8px]">
          <div className="flex flex-col items-center gap-[8px]">
            <div>
              <p className="text-[20px] text-[#111110]">You are booked for</p>
              {dateLabel ? <p className="text-[24px] text-[#17925a] sm:text-[32px]">{dateLabel}</p> : null}
            </div>
            <div className="text-[16px] text-[#7b7b7b]">
              <p>We’ve emailed your link to</p>
              <p className="break-all">{email}</p>
            </div>
          </div>
          <p className="text-[16px] text-[#7b7b7b]">
            Join from a private, quite place with a camera, microphone and a steady internet connection
          </p>
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-[35px] bg-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-white transition-opacity hover:opacity-90"
          >
            Add to calendar
          </a>
        ) : null}
      </div>
    </div>
  );
}
