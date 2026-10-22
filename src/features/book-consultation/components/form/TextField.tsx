"use client";

import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type TextFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  helper?: string;
  error?: FieldError;
  type?: "text" | "email" | "tel" | "number";
  autoComplete?: string;
};

export default function TextField({
  label,
  register,
  placeholder,
  helper,
  error,
  type = "text",
  autoComplete,
}: TextFieldProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[6px]">
      <label className="text-[16px] font-normal leading-[1.5] text-[#46524b] lg:text-[16px] lg:font-medium">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register}
        className={`h-[50px] w-full rounded-[10px] border border-solid bg-white px-[16px] text-[14px] leading-[1.5] text-[#46524b] outline-none transition-colors placeholder:text-[14px] placeholder:text-[#afafaf] focus:border-[#17925a] lg:px-[14px] lg:text-[16px] ${
          error ? "border-[#d92d20]" : "border-[#d9d9d9]"
        }`}
      />
      {error ? (
        <p className="text-[12px] leading-[1.5] text-[#d92d20]">{error.message}</p>
      ) : helper ? (
        <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">{helper}</p>
      ) : null}
    </div>
  );
}
