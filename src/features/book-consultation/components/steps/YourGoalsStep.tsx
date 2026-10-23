"use client";

import { LockKeyhole } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import GoalSelect from "../form/GoalSelect";

export default function YourGoalsStep({ onBack }: { onBack: () => void }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  return (
    <div className="flex w-full flex-col items-center gap-[32px]">
      <div className="flex w-full flex-col items-center gap-[24px]">
        <div className="flex flex-col items-center gap-[8px] text-center leading-[1.5]">
          <h1 className="text-[24px] font-medium text-[#17925a] sm:text-[32px]">
            What would you most like help with?
          </h1>
          <p className="text-[16px] font-normal text-[#7b7b7b]">Select all that apply</p>
        </div>

        <div className="flex w-full flex-col items-end gap-[24px]">
          <div className="flex w-full flex-col gap-[16px]">
            <GoalSelect control={control} error={errors.goals} />

            <div className="flex w-full flex-col gap-[8px]">
              <div className="flex w-full flex-col gap-[8px]">
                <label htmlFor="additionalNotes" className="px-[2px] text-[16px] leading-[1.5] text-[#46524b]">
                  Anything you&apos;d like us to know?
                </label>
                <textarea
                  id="additionalNotes"
                  {...register("additionalNotes")}
                  placeholder="For example, a goal you're working toward or a question for your clinician."
                  className="h-[147px] w-full resize-none rounded-[10px] border border-solid border-[rgba(12,13,15,0.2)] bg-white px-[16px] py-[8px] text-[14px] leading-[1.5] text-[#46524b] outline-none transition-colors placeholder:text-[#afafaf] focus:border-[#17925a]"
                />
              </div>
              <p className="px-[2px] text-[12px] leading-[1.5] text-[#7b7b7b]">
                No need to share your full medical history. Your clinician will go over it with you.
              </p>
            </div>
          </div>

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
              className="flex flex-1 items-center justify-center rounded-[35px] bg-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-white transition-opacity hover:opacity-90 sm:flex-none"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[8px] text-[14px] leading-[1.5] text-[#7b7b7b]">
        <LockKeyhole className="h-[20px] w-[20px] shrink-0" strokeWidth={1.5} />
        <span>
          Meddy isn&apos;t for emergencies. If you have a medical emergency, <span className="text-[#111110]">call 911.</span>
        </span>
      </div>
    </div>
  );
}
