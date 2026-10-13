"use client";

import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type { BookConsultationForm } from "../types";
import { STEPS } from "../constants";
import Stepper, { MobileStepper } from "../components/Stepper";
import { toISODate } from "../components/Calendar";
import { useBookingContext } from "../hooks";
import { bookConsultation, type LeadBookingResult } from "../api";
import AboutYouStep from "../components/steps/AboutYouStep";
import YourGoalsStep from "../components/steps/YourGoalsStep";
import ChooseTimeStep from "../components/steps/ChooseTimeStep";
import BeforeYouVisitStep from "../components/steps/BeforeYouVisitStep";
import ConfirmationStep from "../components/steps/ConfirmationStep";

const STEP_FIELDS: (keyof BookConsultationForm)[][] = [
  [
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "stateOfResidence",
    "is18OrOlder",
  ],
  ["goals"],
  ["date", "time", "agreeTerms"],
  ["telehealthConsent", "privacyPractices"],
];

const DEFAULT_VALUES: BookConsultationForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  textReminders: false,
  stateOfResidence: "New York",
  is18OrOlder: false,
  goals: [],
  additionalNotes: "",
  date: toISODate(new Date()),
  time: "",
  endTime: "",
  agreeTerms: false,
  telehealthConsent: false,
  privacyPractices: false,
};

export const BookConsultationPage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState<LeadBookingResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { context } = useBookingContext();
  const allowedDurations = context?.allowedDurations ?? [];
  // The public consultation is a 30-minute visit; fall back to the provider's
  // default duration only when 30 minutes isn't offered.
  const duration = allowedDurations.includes(30) ? 30 : (context?.defaultDuration ?? 30);
  const methods = useForm<BookConsultationForm>({
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { trigger, getValues } = methods;

  const submitBooking = async () => {
    const values = getValues();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await bookConsultation({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.mobileNumber,
        state: values.stateOfResidence,
        goals: values.goals,
        notes: values.additionalNotes,
        textReminders: values.textReminders,
        startTime: values.time,
        endTime: values.endTime,
      });
      setBooking(result);
      setSubmitted(true);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "We couldn't confirm your booking. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    if (step === STEPS.length - 1) {
      await submitBooking();
    } else {
      setStep((s) => s + 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setSubmitError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const renderStep = () => {
    if (submitted) return <ConfirmationStep booking={booking} />;
    switch (step) {
      case 0:
        return <AboutYouStep />;
      case 1:
        return <YourGoalsStep />;
      case 2:
        return <ChooseTimeStep duration={duration} />;
      default:
        return <BeforeYouVisitStep submitting={submitting} error={submitError} />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex min-h-dvh w-full flex-col bg-[#f5f5f0] lg:h-dvh lg:overflow-hidden">
        <main className="flex min-h-0 w-full flex-1 flex-col lg:flex-row">
          <aside
            data-lenis-prevent
            className="hidden shrink-0 lg:flex lg:h-dvh lg:w-[444px] lg:flex-col lg:items-center lg:overflow-y-auto lg:bg-[rgba(23,146,90,0.10)] lg:px-10"
          >
            <Stepper step={submitted ? STEPS.length : step} />
          </aside>

          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto px-5 py-6 lg:px-10 lg:py-14"
          >
            <div className="mb-8 lg:hidden">
              <MobileStepper
                step={step}
                onBack={() => {
                  if (submitted) setSubmitted(false);
                  else if (step === 0) window.history.back();
                  else back();
                }}
              />
            </div>

            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                next();
              }}
              className="flex w-full flex-1 flex-col"
            >
              <div className="mx-auto flex w-full max-w-[824px] flex-1 flex-col justify-center">
                {renderStep()}
              </div>

              {!submitted && step > 0 && step < 3 && (
                <div className="mx-auto mt-10 flex w-full max-w-[824px] items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={back}
                      className="hidden items-center gap-[8px] py-[12px] text-[16px] font-medium uppercase leading-[1.5] text-[#17925a] transition-colors hover:text-[#17925a]/80 lg:flex lg:h-[65px] lg:px-6 lg:py-[9px] xl:px-12 lg:text-[20px] lg:underline"
                    >
                      <ArrowLeft size={20} className="lg:hidden" />
                      <ArrowLeft size={24} className="hidden lg:block" />
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={next}
                    className="w-full rounded-[10px] bg-[#17925a] px-[20px] py-[12px] text-[16px] font-medium uppercase leading-[1.5] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 lg:w-auto lg:h-[65px] lg:min-w-[280px] xl:min-w-[377px] lg:px-[24px] lg:py-[9px] lg:text-[20px] lg:font-bold"
                  >
                    {step === STEPS.length - 1
                      ? "Get my visit link"
                      : "Continue"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </FormProvider>
  );
};
