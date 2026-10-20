"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type CheckboxFieldProps = {
  label: ReactNode;
  register: UseFormRegisterReturn;
  helper?: ReactNode;
  error?: FieldError;
  boxClassName?: string;
  checkSize?: number;
  labelClassName?: string;
  borderClassName?: string;
};

export default function CheckboxField({
  label,
  register,
  helper,
  error,
  boxClassName,
  checkSize = 15,
  labelClassName,
  borderClassName,
}: CheckboxFieldProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[4px]">
      <label className="group flex w-full cursor-pointer items-start gap-[10px]">
        <input type="checkbox" {...register} className="absolute h-0 w-0 opacity-0" />
        <span
          className={`mt-[1px] flex shrink-0 items-center justify-center rounded-[4px] border border-solid bg-white transition-colors group-focus-within:ring-2 group-focus-within:ring-[#17925a]/40 group-has-[:checked]:border-[#17925a] group-has-[:checked]:bg-[#17925a] ${
            boxClassName ?? "h-[20px] w-[20px] lg:h-[24px] lg:w-[24px]"
          } ${error ? "border-[#d92d20]" : (borderClassName ?? "border-[#d9d9d9]")}`}
        >
          <Check
            size={checkSize}
            strokeWidth={3}
            className="text-white opacity-0 transition-opacity group-has-[:checked]:opacity-100"
          />
        </span>
        <span className={` text-[12px] sm:text-[16px] font-normal leading-[1.5] text-[#46524b] ${labelClassName ?? ""}`}>
          {label}
        </span>
      </label>
      {helper ? (
        <p className="pl-[30px] text-[12px] leading-[1.5] text-[#7b7b7b] lg:pl-[34px] lg:text-[14px]">{helper}</p>
      ) : null}
      {error ? (
        <p className="pl-[30px] text-[12px] leading-[1.5] text-[#d92d20] lg:pl-[34px]">{error.message}</p>
      ) : null}
    </div>
  );
}
