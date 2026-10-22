"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import CheckboxField from "../form/CheckboxField";
import { formatLongDate, formatSlotTime } from "../../datetime";

type BeforeYouVisitStepProps = {
  submitting?: boolean;
  error?: string | null;
};

export default function BeforeYouVisitStep({ submitting, error }: BeforeYouVisitStepProps) {
  const {
    register,
    watch,
  } = useFormContext<BookConsultationForm>();

  const date = watch("date");
  const time = watch("time");
  const consent = watch("telehealthConsent");
  const privacy = watch("privacyPractices");
  const canSubmit = consent && privacy && !submitting;

  return (
    <div className="flex w-full flex-col items-center gap-6 sm:gap-11">
      <div className="flex w-full flex-col items-center gap-6">
        <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#17925a] lg:h-[72px] lg:w-[72px]">
          <Check size={33} strokeWidth={3} className="text-white lg:size-[40px]" />
        </span>

        <div className="flex w-full flex-col items-center gap-2 max-w-138.5 sm:mx-auto lg:max-w-none">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-[24px] font-medium leading-[1.5] text-[#7b7b7b] lg:text-[32px]">You&apos;re booked for</h1>
            <p className="text-center text-[24px] font-medium leading-[1.5] text-[#111110] lg:text-[32px] lg:text-[#46524b]">
              {formatLongDate(date)}
              <span className="lg:hidden">{time ? ` at ${formatSlotTime(time)}` : ""}</span>
            </p>
          </div>
          <p className="text-center text-[14px] font-normal leading-normal text-[#7b7b7b] lg:text-[16px] lg:font-medium">
            Two quick steps before you visit.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[16px] rounded-[10px] border border-solid border-[#979797] bg-white p-[20px] lg:gap-[24px] lg:px-[27px] lg:py-[27px]">
        <div className="flex w-full flex-col gap-2">
          <CheckboxField
            label={
              <span>
                I&apos;ve read and agree to the{" "}
                <Link
                  href="/telehealth-consent"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#46524B] underline underline-offset-2 hover:opacity-80"
                >
                  Telehealth Informed Consent
                </Link>
                .
              </span>
            }
            boxClassName="h-[20px] w-[20px] lg:h-[22px] lg:w-[22px]"
            borderClassName="border-[#7b7b7b]"
            checkSize={20}
            register={register("telehealthConsent")}
          />
          <CheckboxField
            label={
              <span>
                I acknowledge I&apos;ve received the{" "}
                <Link
                  href="/notice-of-privacy-practices"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#46524B] underline underline-offset-2 hover:opacity-80"
                >
                  Notice of Privacy Practices
                </Link>{" "}
                of Sameer Aggarwal Medical PLLC.
              </span>
            }
            boxClassName="h-[20px] w-[20px] lg:h-[22px] lg:w-[22px]"
            borderClassName="border-[#7b7b7b]"
            checkSize={20}
            register={register("privacyPractices")}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`flex h-[45px] w-full items-center justify-center rounded-[10px] text-[14px] font-bold uppercase leading-[1.5] shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-colors lg:h-[48px] lg:text-[16px] ${
            canSubmit ? "cursor-pointer bg-[#17925a] text-white hover:opacity-90" : "cursor-not-allowed bg-[#8a8a82] text-white"
          }`}
        >
          {submitting ? "Booking…" : "Get my visit link"}
        </button>

        {error ? (
          <p className="text-center text-[12px] leading-[1.5] text-[#d92d20] lg:text-[14px]">{error}</p>
        ) : null}
      </div>
    </div>
  );
}
