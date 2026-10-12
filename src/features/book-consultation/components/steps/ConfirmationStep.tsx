"use client";

import Image from "next/image";
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

/** the green "You're all set." panel (Figma 13281:18262), shown under the checkbox card once the visit link is requested */
export function AllSetPanel() {
  const { getValues } = useFormContext<BookConsultationForm>();
  const email = getValues("email");
  const date = getValues("date");
  const time = getValues("time");

  return (
      <div className="flex w-full flex-col items-start gap-[28px] rounded-[10px] bg-[rgba(23,146,90,0.1)] px-5 py-[26px] lg:px-[30px] lg:py-[33px]">
        <div className="flex w-full flex-col items-start gap-6 text-[#46524b]">
          <p className="w-full text-[20px] font-bold leading-[1.5]">You&rsquo;re all set.</p>
          <p className="w-full text-[14px] font-normal leading-[1.5] lg:text-[16px]">
            We&apos;ve emailed your Google Meet link to <b className="font-bold">{email || "your email"}</b>. Join from a private, quiet place with a camera, microphone and a steady internet connection.
          </p>
        </div>
        <a
          href={buildCalendarUrl(date, time)}
          target="_blank"
          rel="noreferrer"
          className="flex w-[180px] items-center justify-center rounded-[10px] border border-solid border-[#17925a] p-[10px] text-[16px] font-bold leading-[1.5] text-[#17925a] shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
        >
          Add to Calendar
        </a>
      </div>
  );
}

const A = "/book-consultation";

/** sparkle-framed tick: `k` scales the 152 x 97.5 desktop artwork (mobile uses ~0.62) */
function Tick({ k }: { k: number }) {
  const stars = [
    { src: "star1.svg", l: 129, t: 0, s: 13 },
    { src: "star3.svg", l: 4, t: 63, s: 16 },
    { src: "star4.svg", l: 0, t: 3, s: 19 },
    { src: "star4.svg", l: 123, t: 80, s: 19 },
  ];
  return (
    <div className="relative shrink-0" style={{ width: 152 * k, height: 97.5 * k }}>
      <span className="absolute flex items-center justify-center rounded-full bg-[rgba(23,146,90,0.1)]" style={{ left: 28.25 * k, top: 3 * k, width: 94.5 * k, height: 94.5 * k }}>
        <span className="relative block shrink-0" style={{ width: 54 * k, height: 54 * k }}><Image src={`${A}/check.svg`} alt="" fill unoptimized className="block max-w-none" /></span>
      </span>
      {stars.map((st, i) => (
        <span key={i} className="absolute block" style={{ left: st.l * k, top: st.t * k, width: st.s * k, height: st.s * k }}>
          <Image src={`${A}/${st.src}`} alt="" fill unoptimized className="block max-w-none" />
        </span>
      ))}
    </div>
  );
}

/** final card (Figma 13624:4916 desktop, 13683:5452 mobile): sparkle tick, "You're all set!", email, Add to Calendar */
export default function ConfirmationStep() {
  const { getValues } = useFormContext<BookConsultationForm>();
  const email = getValues("email");
  const date = getValues("date");
  const time = getValues("time");

  return (
    <div className="mx-auto flex w-full max-w-[729px] flex-col items-center gap-4 overflow-clip rounded-[10px] border border-solid border-[#979797] bg-white px-5 py-6 lg:gap-6 lg:px-6 lg:pb-6 lg:pt-[18px]">
      <div className="flex w-full flex-col items-center gap-4 lg:gap-2">
        <div className="flex w-full max-w-[399px] flex-col items-center gap-4 lg:gap-[23px]">
          <div className="lg:hidden"><Tick k={0.62} /></div>
          <div className="hidden lg:block"><Tick k={1} /></div>
          <h1 className="whitespace-nowrap text-center text-[24px] font-bold leading-[1.5] text-[#111110] lg:text-[40px] lg:text-[#46524b]">You&rsquo;re all set!</h1>
        </div>
        <p className="w-full max-w-[399px] text-center text-[14px] font-normal leading-[1.5] text-[#46524b] lg:text-[20px] lg:font-medium lg:text-[#7b7b7b]">
          We&apos;ve emailed your Google Meet link to <b className="break-words font-bold">{email || "your email"}</b>
        </p>
      </div>

      <div className="h-px w-full bg-[#e6e6e1] lg:hidden" />

      <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
        <p className="w-full max-w-[453px] text-left text-[12px] font-normal leading-[1.5] text-[#46524b] lg:text-center lg:text-[16px] lg:text-[#7b7b7b]">
          Join from a private, quiet place with a camera, microphone and a steady internet connection
        </p>
        <a
          href={buildCalendarUrl(date, time)}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-[10px] bg-[#17925a] px-12 py-3 text-[14px] font-bold uppercase leading-[1.5] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 lg:h-[65px] lg:py-[9px] lg:text-[20px] lg:font-medium"
        >
          Add to calendar
        </a>
      </div>
    </div>
  );
}
