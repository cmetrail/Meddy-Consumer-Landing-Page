"use client";

import { ChevronDown } from "lucide-react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type SelectFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  options: readonly string[];
  helper?: string;
  error?: FieldError;
  disabled?: boolean;
};

export default function SelectField({ label, register, options, helper, error, disabled }: SelectFieldProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[6px]">
      <label className="text-[16px] font-normal leading-[1.5] text-[#46524b] lg:text-[20px] lg:font-medium">
        {label}
      </label>
      <div className="relative w-full">
        <select
          {...register}
          disabled={disabled}
          className={`h-[50px] w-full appearance-none rounded-[10px] border border-solid bg-white px-[16px] pr-[40px] text-[14px] leading-[1.5] text-[#46524b] outline-none transition-colors focus:border-[#17925a] lg:px-[14px] lg:text-[16px] ${
            error ? "border-[#d92d20]" : "border-[#d9d9d9]"
          } ${disabled ? "cursor-not-allowed bg-[#f0f0eb] text-[#7b7b7b]" : ""}`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[#444444]" />
      </div>
      {error ? (
        <p className="text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p>
      ) : helper ? (
        <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">{helper}</p>
      ) : null}
    </div>
  );
}
