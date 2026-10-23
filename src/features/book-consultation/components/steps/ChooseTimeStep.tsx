"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import type { ReactNode } from "react";
import type { BookConsultationForm } from "../../types";
import Calendar from "../Calendar";
import TimePicker from "../TimePicker";
import { useDaySlots, useMonthAvailability } from "../../hooks";

type ChooseTimeStepProps = {
  duration: number;
  onBack: () => void;
  submitting?: boolean;
  submitError?: string | null;
};

const linkClass = "text-[#17925a] underline underline-offset-2 hover:opacity-80";

function Consent({
  name,
  message,
  children,
}: {
  name: "agreeTerms" | "telehealthConsent" | "privacyPractices";
  message: string;
  children: ReactNode;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();
  const checked = !!watch(name);
  const error = errors[name];
  return (
    <div className="flex flex-col gap-[4px]">
      <label className="flex cursor-pointer items-center gap-[16px]">
        <input
          type="checkbox"
          {...register(name, { validate: (v) => v === true || message })}
          className="peer sr-only"
        />
        <span
          className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px] border border-solid transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#17925a]/40 ${
            checked ? "border-[#17925a] bg-[#17925a]" : error ? "border-[#d92d20]" : "border-[#7b7b7b]"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-[16px] w-[16px] text-white ${checked ? "" : "opacity-0"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span className="text-[16px] leading-[1.5] text-[#46524b]">{children}</span>
      </label>
      {error ? <p className="pl-[38px] text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p> : null}
    </div>
  );
}

export default function ChooseTimeStep({ duration, onBack, submitting, submitError }: ChooseTimeStepProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  const date = watch("date");

  const [view, setView] = useState(() => {
    const base = date ? new Date(`${date}T00:00:00`) : new Date();
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const availability = useMonthAvailability(view.year, view.month, duration);
  const { slots, loading, error } = useDaySlots(date, duration);

  const handleViewChange = useCallback((year: number, month: number) => {
    setView((prev) => (prev.year === year && prev.month === month ? prev : { year, month }));
  }, []);

  useEffect(() => {
    setValue("time", "");
    setValue("endTime", "");
  }, [date, setValue]);

  return (
    <div className="flex w-full flex-col items-center gap-[32px]">
      <div className="flex w-full flex-col items-end gap-[24px]">
        <div className="flex w-full flex-col items-center gap-[32px]">
          <div className="flex w-full flex-col items-center gap-[8px] text-center leading-[1.5]">
            <h1 className="text-[24px] font-medium text-[#17925a] sm:text-[32px]">Book your Medicare Visit</h1>
            <div className="text-[16px] font-normal text-[#111110]">
              <p>Video visit with a board certified internal medicine physician</p>
              <p>
                {duration} minutes · Covered by Medicare with no out-of-pocket cost if you’re eligible
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-[24px]">
            <div className="flex w-full max-w-[424px] flex-col items-center gap-[16px] rounded-[8px] bg-white p-[16px]">
              <Calendar
                control={control}
                error={errors.date}
                availability={availability}
                onViewChange={handleViewChange}
              />
              <TimePicker
                control={control}
                error={errors.time}
                slots={slots}
                duration={duration}
                loading={loading}
                loadError={error}
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <Consent name="agreeTerms" message="You must agree to continue.">
                I agree to Meddy’s{" "}
                <Link href="/terms-of-use" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Privacy Policy
                </Link>
                , and to receive notices and records electronically.
              </Consent>
              <Consent name="telehealthConsent" message="Please agree to the Telehealth Informed Consent.">
                I have read and agree to the{" "}
                <Link href="/telehealth-consent" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Telehealth Informed Consent.
                </Link>
              </Consent>
              <Consent name="privacyPractices" message="Please acknowledge the Notice of Privacy Practices.">
                I acknowledge that I received the Notice of{" "}
                <Link
                  href="/notice-of-privacy-practices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Privacy Practices of Sameer Aggarwal Medical PLLC.
                </Link>
              </Consent>
            </div>
          </div>
        </div>

        {submitError ? (
          <p className="w-full text-right text-[12px] leading-[1.5] text-[#d92d20]">{submitError}</p>
        ) : null}

        <div className="flex w-full items-start gap-[16px] sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="flex flex-1 items-center justify-center rounded-[35px] border border-solid border-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-[#111110] transition-colors hover:bg-[#17925a]/5 sm:flex-none"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex flex-1 items-center justify-center whitespace-nowrap rounded-[35px] bg-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
          >
            {submitting ? (
              <>
                <span
                  aria-hidden
                  className="mr-[8px] h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-white/40 border-t-white"
                />
                Booking…
              </>
            ) : (
              "Book my free consultation"
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-[8px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/book-consultation/info.svg" alt="" className="h-[16px] w-[16px] shrink-0" />
        <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">
          Medical services are provided by Sameer Aggarwal Medical PLLC.
        </p>
      </div>
    </div>
  );
}
