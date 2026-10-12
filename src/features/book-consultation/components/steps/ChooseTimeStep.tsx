"use client";

import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";
import type { BookConsultationForm } from "../../types";
import Calendar from "../Calendar";
import TimeSlots from "../TimeSlots";
import CheckboxField from "../form/CheckboxField";

function formatDate(iso?: string) {
  if (!iso) return "Tuesday, October 14";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function ChooseTimeStep() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  const date = watch("date");

  return (
    <div className="flex w-full flex-col items-start gap-[20px]">
      <div className="flex w-full flex-col items-start gap-[8px]">
        <h1 className="text-left text-[24px] font-medium leading-[1.3] text-[#111110] lg:text-[40px] lg:text-[#46524b]">
          Choose a time for your free consultation
        </h1>
        <p className="w-full text-left text-[14px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-center lg:text-[20px] lg:font-medium">
          <span className="hidden lg:inline">
            Video visit on Google Meet · 30 minutes · Free · Times shown in Eastern Standard Time
          </span>
          <span className="lg:hidden">
            Video visit on Google Meet · 30 minutes
            <br />
            Free · Times shown in Eastern Time
          </span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-[24px] lg:flex-row lg:items-center lg:gap-[40px]">
        <div className="w-full lg:w-[416px] lg:shrink-0">
          <Calendar control={control} error={errors.date} />
        </div>
        <div className="hidden lg:block lg:h-[300px] lg:w-[1px] lg:bg-[#d9d9d9]" />
        <div className="flex w-full flex-col items-center gap-[24px] lg:w-[240px]">
          <p className="w-full text-left text-[16px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-[20px]">
            {formatDate(date)}
          </p>
          <TimeSlots control={control} error={errors.time} />
        </div>
      </div>

      <CheckboxField
        label={
          <span>
            I agree to the <a href="#" className="text-[#17925a] underline">Terms of Service</a> and{" "}
            <a href="#" className="text-[#17925a] underline">Privacy Policy</a>, and to receive notices and records
            electronically
          </span>
        }
        register={register("agreeTerms", { validate: (v) => v === true || "You must agree to continue." })}
        error={errors.agreeTerms}
      />

      <div className="flex items-start gap-[8px]">
        <Info size={16} className="mt-[2px] shrink-0 text-[#7b7b7b]" />
        <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">
          Your consultation is with a licensed board certified physician from Sameer Aggarwal Medical PLLC.
        </p>
      </div>
    </div>
  );
}
