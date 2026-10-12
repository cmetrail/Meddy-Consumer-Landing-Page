"use client";

import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import CheckboxField from "../form/CheckboxField";

function formatDate(iso?: string) {
  if (!iso) return "Tuesday, October 14";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function BeforeYouVisitStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  const date = watch("date");
  const time = watch("time");
  const consent = watch("telehealthConsent");
  const privacy = watch("privacyPractices");
  const canSubmit = consent && privacy;

  return (
    <div className="flex w-full flex-col items-center gap-[24px]">
      <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#17925a] lg:h-[94px] lg:w-[94px]">
        <Check size={33} strokeWidth={3} className="text-white lg:size-[54px]" />
      </span>

      <div className="flex w-full flex-col items-center gap-[8px]">
        <h1 className="text-center text-[24px] font-medium leading-[1.3] text-[#7b7b7b] lg:text-[40px]">
          You&apos;re booked for
        </h1>
        <p className="text-center text-[24px] font-medium leading-[1.3] text-[#111110] lg:text-[40px] lg:text-[#46524b]">
          {formatDate(date)}
          {time ? ` at ${time}` : ""}
        </p>
        <p className="text-center text-[14px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-[20px] lg:font-medium">
          Two quick steps before you visit.
        </p>
      </div>

      <div className="flex w-full flex-col gap-[16px] rounded-[10px] bg-white p-[20px] lg:gap-[24px] lg:p-[28px]">
        <CheckboxField
          label="I've read and agree to the Telehealth Informed Consent."
          boxClassName="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]"
          checkSize={20}
          register={register("telehealthConsent", { validate: (v) => v === true || "Please agree to continue." })}
          error={errors.telehealthConsent}
        />

        <CheckboxField
          label="I acknowledge I've received Meddy's Notice of Privacy Practices."
          boxClassName="h-[20px] w-[20px] lg:h-[30px] lg:w-[30px]"
          checkSize={20}
          register={register("privacyPractices", { validate: (v) => v === true || "Please acknowledge to continue." })}
          error={errors.privacyPractices}
        />

        <button
          type="submit"
          className={`flex h-[45px] w-full items-center justify-center rounded-[10px] text-[14px] font-medium uppercase leading-[1.5] transition-colors lg:h-[65px] lg:text-[20px] ${
            canSubmit ? "bg-[#17925a] text-white hover:opacity-90" : "cursor-not-allowed bg-[#8a8a82] text-white"
          }`}
        >
          Get my visit link
        </button>
      </div>
    </div>
  );
}
