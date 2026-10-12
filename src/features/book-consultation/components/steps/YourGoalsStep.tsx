"use client";

import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import GoalSelect from "../form/GoalSelect";

export default function YourGoalsStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  return (
    <div className="flex w-full flex-col items-start gap-6 sm:gap-11">
      <div className="flex w-full flex-col flex-1 gap-2 max-w-138.5 sm:mx-auto sm:items-center xl:max-w-none xl:flex-none">
        <h1 className="text-left text-[24px] font-medium leading-[1.3] text-[#111110] sm:text-center lg:text-[32px] xl:whitespace-nowrap xl:text-[40px] lg:font-bold lg:leading-[1.5] lg:text-[#46524b]">
          What would you most like help with?
        </h1>
        <p className="text-left text-[14px] font-normal leading-normal text-[#7b7b7b] sm:text-center lg:text-[20px] lg:font-medium">
          <span className="lg:hidden">Select that apply</span>
          <span className="hidden lg:inline">Select all that apply</span>
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
      <GoalSelect control={control} error={errors.goals} />
        <div className="flex flex-col gap-2">
      <div className="flex w-full flex-col items-start gap-[6px]">
        <label className="text-[16px] font-normal leading-[1.5] text-[#46524b] lg:text-[20px] lg:font-medium">
          Anything you&apos;d like us to know?
        </label>
        <textarea
          {...register("additionalNotes")}
          placeholder="For example, a goal you're working toward or a question for your clinician."
              className="field-sizing-content min-h-[50px] w-full resize-none rounded-[10px] border border-solid border-[#979797] bg-white px-[16px] py-[12px] text-[16px] leading-[1.5] text-[#46524b] outline-none transition-colors placeholder:text-[14px] placeholder:text-[#afafaf] focus:border-[#17925a] lg:min-h-[86px] lg:px-[24px]"
        />
      </div>

      <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">
        No need to share your full medical history. Your clinician will go over it with you.
      </p>
        </div>
      <div className="flex w-full items-center justify-center mt-10 gap-[8px]">
        <Info size={20} className="shrink-0 text-[#7b7b7b]" />
        <p className="text-[14px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-[16px]">
          Meddy isn&apos;t for emergencies. If you have a medical emergency, call <span className="font-bold underline">911.</span>
        </p>
        </div>
      </div>
    </div>
  );
}
