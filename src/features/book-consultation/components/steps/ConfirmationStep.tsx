"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import type { LeadBookingResult } from "../../api";

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

type ConfirmationStepProps = {
  booking?: LeadBookingResult | null;
};

/**
 * Final card (Figma 13624:4916 desktop, 13683:5452 mobile).
 *
 * The appointment — including the Google Calendar event and Meet link — is
 * created server-side by the booking API, so instead of asking the visitor to
 * add it to their own calendar we surface the generated Meet link directly.
 */
export default function ConfirmationStep({ booking }: ConfirmationStepProps) {
  const { getValues } = useFormContext<BookConsultationForm>();
  const email = getValues("email");
  const meetUrl = booking?.meetUrl ?? null;

  const ctaBase =
    "flex w-full items-center justify-center rounded-[10px] px-12 py-3 text-[14px] font-bold uppercase leading-[1.5] lg:h-[65px] lg:py-[9px] lg:text-[20px] lg:font-medium";
  const ctaPrimary =
    "bg-[#17925a] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90";
  const ctaSecondary =
    "border border-solid border-[#17925a] bg-transparent text-[#17925a] transition-colors hover:bg-[rgba(23,146,90,0.06)]";

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
        <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
          {meetUrl ? (
            <a
              href={meetUrl}
              target="_blank"
              rel="noreferrer"
              className={`${ctaBase} ${ctaPrimary}`}
            >
              Join Google Meet
            </a>
          ) : null}
          <Link
            href="/"
            className={`${ctaBase} ${meetUrl ? ctaSecondary : ctaPrimary}`}
          >
            Done
          </Link>
        </div>
      </div>
    </div>
  );
}
