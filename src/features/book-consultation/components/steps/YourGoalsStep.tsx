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
    <div className="flex w-full flex-col items-start gap-[20px]">
      <div className="flex w-full flex-col items-center gap-[8px]">
        <h1 className="text-center text-[24px] font-medium leading-[1.3] text-[#111110] lg:text-[40px] lg:text-[#46524b]">
          What would you most like help with?
        </h1>
        <p className="text-[14px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-[20px] lg:font-medium">
          <span className="lg:hidden">Select that apply</span>
          <span className="hidden lg:inline">Select all that apply</span>
        </p>
      </div>

      <GoalSelect control={control} error={errors.goals} />

      <div className="flex w-full flex-col items-start gap-[6px]">
        <label className="text-[16px] font-normal leading-[1.5] text-[#46524b] lg:text-[20px] lg:font-medium">
          Anything you&apos;d like us to know?
        </label>
        <textarea
          {...register("additionalNotes")}
          placeholder="For example, a goal you're working toward or a question for your clinician."
          className="h-[50px] w-full resize-none rounded-[10px] border border-solid border-[#d9d9d9] bg-white px-[16px] py-[12px] text-[16px] leading-[1.5] text-[#46524b] outline-none transition-colors placeholder:text-[14px] placeholder:text-[#afafaf] focus:border-[#17925a] lg:h-[86px] lg:px-[24px]"
        />
      </div>

      <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">
        No need to share your full medical history. Your clinician will go over it with you.
      </p>

      <div className="flex w-full items-center justify-center mt-10 gap-[8px]">
        <Info size={20} className="shrink-0 text-[#7b7b7b]" />
        <p className="text-[14px] font-normal leading-[1.5] text-[#7b7b7b] lg:text-[16px]">
          Meddy isn&apos;t for emergencies. If you have a medical emergency, call <span className="font-bold">911.</span>
        </p>
      </div>
    </div>
  );
}
