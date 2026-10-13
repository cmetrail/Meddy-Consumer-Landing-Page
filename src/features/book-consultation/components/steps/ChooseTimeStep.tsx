"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";
import type { BookConsultationForm } from "../../types";
import Calendar from "../Calendar";
import TimeSlots from "../TimeSlots";
import CheckboxField from "../form/CheckboxField";
import { useDaySlots, useMonthAvailability } from "../../hooks";
import { formatLongDate } from "../../datetime";

export default function ChooseTimeStep({ duration }: { duration: number }) {
  const {
    register,
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
    setView((prev) =>
      prev.year === year && prev.month === month ? prev : { year, month },
    );
  }, []);

  useEffect(() => {
    setValue("time", "");
    setValue("endTime", "");
  }, [date, setValue]);

  return (
    <div className="flex w-full flex-col items-start gap-6 sm:gap-11 lg:gap-6">
      <div className="flex w-full flex-col flex-1 gap-2 max-w-138.5 sm:mx-auto sm:items-center xl:max-w-none xl:flex-none">
        <h1 className="text-left text-[24px] font-medium leading-[1.3] text-[#111110] sm:text-center lg:text-[32px] lg:font-bold lg:leading-[1.5] lg:text-[#46524b] xl:whitespace-nowrap xl:text-[40px]">
          Choose a time for your free consultation
        </h1>
        <p className="w-full text-left text-[14px] font-normal leading-normal text-[#7b7b7b] sm:text-center lg:text-[20px] lg:font-medium">
          <span className="mx-auto hidden max-w-[433px] lg:block lg:text-center">
            Video visit on Google Meet
            <br />
            {duration} minutes · Availability shown in EST
          </span>
          <span className="lg:hidden">
            Video visit on Google Meet · {duration} minutes
            <br />
            Availability shown in EST
          </span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-[24px] lg:flex-row lg:items-center lg:justify-start lg:gap-[40px]">
        <div className="w-full lg:w-[416px] lg:shrink-0">
          <Calendar
            control={control}
            error={errors.date}
            availability={availability}
            onViewChange={handleViewChange}
          />
        </div>
        <div className="hidden lg:block lg:h-[299px] lg:w-[1px] lg:shrink-0 lg:bg-[#d9d9d9]" />
        <div className="flex w-full flex-col items-center gap-[24px] lg:w-[200px] lg:shrink-0 lg:gap-[56px]">
          <p className="w-full text-left text-[16px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-center lg:text-[20px] lg:font-bold">
            {formatLongDate(date)}
          </p>
          <TimeSlots
            control={control}
            error={errors.time}
            slots={slots}
            duration={duration}
            loading={loading}
            loadError={error}
          />
        </div>
      </div>

      <CheckboxField
        label={
          <span>
            I agree to the <a href="#" className="font-bold">Terms of Service</a> and{" "}
            <a href="#" className="font-bold">Privacy Policy</a>, and to receive notices and records
            electronically
          </span>
        }
        register={register("agreeTerms", { validate: (v) => v === true || "You must agree to continue." })}
        error={errors.agreeTerms}
      />

      <div className="flex w-full items-start gap-[8px] lg:items-center lg:justify-center">
        <Info size={16} className="mt-[2px] shrink-0 text-[#7b7b7b]" />
        <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">
          Medical services are provided by  Sameer Aggarwal Medical PLLC.
        </p>
      </div>
    </div>
  );
}
