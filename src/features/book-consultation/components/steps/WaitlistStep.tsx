"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { BookConsultationForm } from "../../types";
import { joinWaitlist } from "../../api";

/**
 * Shown when the visitor picks a state Meddy doesn't serve yet (Figma 14837:48577).
 * The email input is the booking form's own `email` field, so whatever was typed on
 * step 1 shows up here and whatever is typed here is still there when they return.
 */
export default function WaitlistStep({ onReturn }: { onReturn: () => void }) {
  const {
    register,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useFormContext<BookConsultationForm>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const notify = async () => {
    if (!(await trigger("email"))) return;
    const { email, stateOfResidence } = getValues();
    setSubmitting(true);
    setError(null);
    try {
      await joinWaitlist({ email, state: stateOfResidence });
      reset();
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't add you to the list. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        notify();
      }}
      className="flex w-full flex-1 flex-col items-center justify-center gap-[16px]"
    >
      <div className="flex w-full max-w-[500px] flex-col items-center gap-[24px]">
        <div className="flex w-full flex-col items-center gap-[8px] text-center leading-[1.5]">
          <h1 className="text-[24px] font-medium text-[#17925a] sm:text-[32px]">Join our waiting list</h1>
          <p className="text-[16px] text-[#7b7b7b]">
            Meddy is available only in <b className="font-bold">New York</b> for now. Leave your email and we&apos;ll let
            you know when we launch in your state.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-[8px]">
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-label="Email"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
            })}
            className={`h-[50px] w-full rounded-[10px] border border-solid bg-white px-[16px] py-[8px] text-[14px] leading-[1.5] text-[#46524b] outline-none transition-colors [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#fff] [&:-webkit-autofill]:[-webkit-text-fill-color:#46524b] placeholder:text-[rgba(17,17,16,0.4)] focus:border-[#17925a] ${
              errors.email ? "border-[#d92d20]" : "border-[rgba(12,13,15,0.2)]"
            }`}
          />
          {errors.email ? <p className="text-[12px] leading-[1.5] text-[#d92d20]">{errors.email.message}</p> : null}
          {done ? (
            <p className="text-[14px] leading-[1.5] text-[#17925a]" role="status">
              You&apos;re on the list. We&apos;ll email you when Meddy launches in your state.
            </p>
          ) : null}
        </div>
      </div>

      {error ? <p className="max-w-[500px] text-center text-[12px] leading-[1.5] text-[#d92d20]">{error}</p> : null}

      <div className="flex items-start gap-[16px]">
        <button
          type="button"
          onClick={onReturn}
          className="flex items-center justify-center rounded-[35px] border border-solid border-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-[#111110] transition-colors hover:bg-[#17925a]/5"
        >
          Return
        </button>
        <button
          type="submit"
          disabled={submitting || done}
          className="flex items-center justify-center whitespace-nowrap rounded-[35px] bg-[#17925a] px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span
                aria-hidden
                className="mr-[8px] h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-white/40 border-t-white"
              />
              Sending…
            </>
          ) : (
            "Notify me"
          )}
        </button>
      </div>
    </form>
  );
}
