"use client";

import Link from "next/link";
import { Check, LockKeyhole } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import TextField from "../form/TextField";
import SelectField from "../form/SelectField";

export default function AboutYouStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  const hasMedicare = watch("hasMedicare");

  const box = (checked: boolean) => (
    <span
      className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[5px] border border-solid transition-colors ${
        checked ? "border-[#17925a] bg-[#17925a]" : "border-[#7b7b7b] bg-white"
      }`}
    >
      <Check
        size={18}
        strokeWidth={3}
        className={`text-white transition-opacity ${checked ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
  const textReminders = watch("textReminders");
  const is18OrOlder = watch("is18OrOlder");

  return (
    <div className="flex w-full flex-col items-center gap-[32px]">
      <div className="flex w-full flex-col items-center gap-[24px]">
        <div className="flex flex-col items-center gap-[8px] text-center leading-[1.5]">
          <h1 className="text-[32px] font-medium text-[#17925a]">Book your free consultation</h1>
          <p className="text-[16px] font-normal text-[#7b7b7b]">
            30 minute video visit with a board certified internal medicine physician.
          </p>
        </div>

        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex w-full flex-col gap-[24px]">
            <div className="grid w-full grid-cols-1 items-start gap-[24px] sm:grid-cols-2 sm:gap-[16px]">
              <TextField
                label="First Name"
                placeholder="Enter first name"
                autoComplete="given-name"
                register={register("firstName", { required: "First name is required." })}
                error={errors.firstName}
              />
              <TextField
                label="Last Name"
                placeholder="Enter last name"
                autoComplete="family-name"
                register={register("lastName", { required: "Last name is required." })}
                error={errors.lastName}
              />
            </div>

            <div className="grid w-full grid-cols-1 items-start gap-[24px] sm:grid-cols-2 sm:gap-[16px]">
              <TextField
                label="Email"
                placeholder="example@gmail.com"
                type="email"
                autoComplete="email"
                helper="We'll send your confirmation and visit link here."
                register={register("email", {
                  required: "Email is required.",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
                })}
                error={errors.email}
              />
              <TextField
                label="Mobile Number"
                placeholder="(555) 123-4567"
                type="tel"
                autoComplete="tel"
                helper="So we can reach you about your appointment."
                register={register("mobileNumber", {
                  required: "Mobile number is required.",
                  pattern: {
                    value: /^(\+?1[\s.-]?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    message: "Enter a valid US phone number.",
                  },
                })}
                error={errors.mobileNumber}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-[8px]">
              <input type="checkbox" {...register("textReminders")} className="sr-only" />
              {box(!!textReminders)}
              <span className="flex flex-col leading-[1.5]">
                <span className="text-[16px] text-[#46524b]">
                  Text me appointment reminders at the number I provided.
                </span>
                <span className="text-[12px] text-[#7b7b7b]">
                  Msg &amp; data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.
                </span>
              </span>
            </label>

            <SelectField
              label="State of Residence"
              options={["New York"]}
              disabled
              helper="Meddy is available in New York only for now. Leave your email and we'll let you know when we launch in your state."
              register={register("stateOfResidence", { required: "Select your state." })}
              error={errors.stateOfResidence}
            />

            <div className="flex flex-col gap-[4px]">
              <label className="flex cursor-pointer items-start gap-[8px]">
                <input
                  type="checkbox"
                  {...register("is18OrOlder", {
                    validate: (v) => v === true || "You must be 18 or older to book.",
                  })}
                  className="sr-only"
                />
                {box(!!is18OrOlder)}
                <span className="text-[16px] leading-[1.5] text-[#46524b]">I&apos;m 18 or older</span>
              </label>
              {errors.is18OrOlder ? (
                <p className="pl-[32px] text-[12px] leading-[1.5] text-[#d92d20]">{errors.is18OrOlder.message}</p>
              ) : null}
            </div>

            <div className="flex w-full flex-col items-start gap-[16px]">
              <div className="flex flex-col items-start gap-[8px] leading-[1.5]">
                <p className="text-[16px] text-[#46524b]">Do you have Medicare?</p>
                <div className="flex items-start gap-[16px]">
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setValue("hasMedicare", v)}
                      aria-pressed={hasMedicare === v}
                      className="flex items-start gap-[8px]"
                    >
                      {box(hasMedicare === v)}
                      <span className="text-[16px] text-[#46524b]">{v === "yes" ? "Yes" : "No"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {hasMedicare === "yes" ? (
                <div className="w-full sm:w-[calc(50%-8px)]">
                  <TextField
                    label="Medicare Number"
                    placeholder="Enter Medicare number"
                    register={register("medicareNumber", {
                      validate: (v) => (v?.trim() ? true : "Medicare number is required."),
                    })}
                    error={errors.medicareNumber}
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex w-full justify-end">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-[35px] sm:w-auto bg-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-white transition-opacity hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[8px] text-[16px] leading-[1.5] text-[#7b7b7b]">
        <LockKeyhole className="h-[20px] w-[20px] shrink-0" strokeWidth={1.5} />
        <span>
          Your information is private and protected.{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#17925a] underline underline-offset-2"
          >
            Privacy Policy
          </Link>
        </span>
      </div>
    </div>
  );
}
