"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import TextField from "../form/TextField";
import SelectField from "../form/SelectField";
import CheckboxField from "../form/CheckboxField";
import styles from "./AboutYouStep.module.css";

export default function AboutYouStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();

  return (
    <div className={`${styles.form} flex w-full flex-col items-start gap-6 sm:gap-11`}>
      <div className="flex w-full flex-col  flex-1 gap-2 max-w-138.5 sm:mx-auto sm:items-center">
        <h1 className="text-left text-[24px] font-medium leading-[1.3] text-[#111110] sm:text-center lg:text-[40px] lg:text-[#46524b]">
          Book your free consultation
        </h1>
        <p className="text-left text-[14px] font-normal leading-normal text-[#7b7b7b] sm:text-center lg:text-[20px] lg:font-medium">
          30 minute video visit with a board certified
          internal medicine physician.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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

      <TextField
        label="Email"
        placeholder="you@examplegmail.com"
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

      <CheckboxField
        label="Text me appointment reminders at the number I provided."
        boxClassName="h-[20px] w-[20px] lg:h-[28px] lg:w-[28px]"
        checkSize={20}
        labelClassName="lg:text-[20px]"
        helper="Texts aren’t encrypted and contain no medical details. Msg & data rates may apply. Reply STOP to opt out. Not required to book."
        register={register("textReminders")}
      />

      <SelectField
        label="State of Residence"
        options={["New York"]}
        disabled
        register={register("stateOfResidence", { required: "Select your state." })}
        error={errors.stateOfResidence}
      />

      <CheckboxField
        label="I'm 18 or older"
        boxClassName="h-[20px] w-[20px] lg:h-[28px] lg:w-[28px]"
        checkSize={20}
        labelClassName="lg:text-[20px] lg:font-medium"
        register={register("is18OrOlder", { validate: (v) => v === true || "You must be 18 or older to book." })}
        error={errors.is18OrOlder}
      />

      <button
        type="submit"
        className="flex h-[45px] w-full items-center justify-center rounded-[10px] bg-[#17925a] text-[14px] font-medium uppercase leading-[1.5] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 lg:h-[65px] lg:text-[20px]"
      >
        Continue
      </button>

      <div className="flex w-full items-center justify-center gap-[8px] text-[12px] leading-[1.5] text-[#7b7b7b] lg:text-[16px]">
        <Lock className="h-[14px] w-[14px] shrink-0 lg:h-[20px] lg:w-[20px]" />
        <span>
          Your information is private and protected.{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7b7b7b] font-bold underline"
          >
            Privacy Policy
          </Link>
        </span>
      </div>
    </div>
  );
}
