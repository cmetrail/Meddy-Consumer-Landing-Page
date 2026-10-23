"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import ConfirmationStep from "../components/steps/ConfirmationStep";

const STEP_FIELDS: (keyof BookConsultationForm)[][] = [
  [
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "stateOfResidence",
    "is18OrOlder",
    "medicareNumber",
  ],
  ["goals"],
  ["date", "time", "agreeTerms", "telehealthConsent", "privacyPractices"],
];

const DEFAULT_VALUES: BookConsultationForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  textReminders: false,
  stateOfResidence: "New York",
  is18OrOlder: false,
  hasMedicare: "",
  medicareNumber: "",
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
    if (step === STEP_FIELDS.length - 1) {
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
        return <YourGoalsStep onBack={back} />;
      default:
        return (
          <ChooseTimeStep duration={duration} onBack={back} submitting={submitting} submitError={submitError} />
        );
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden bg-white lg:h-dvh lg:overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/book-consultation/bg-ellipse-blue.svg"
            className="absolute left-[-373px] top-[-486px] max-w-none rotate-[149.28deg]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src="/book-consultation/bg-ellipse-green.svg"
            className="absolute left-[-308px] top-[-778px] max-w-none rotate-[159.86deg]"
          />
        </div>

        <div
          ref={scrollRef}
          data-lenis-prevent
          className="relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-x-hidden overflow-y-auto"
        >
          <main className="mx-auto flex w-full max-w-[1328px] flex-1 flex-col px-5 py-6 lg:p-16">
            <div className="mb-8 flex w-full justify-center lg:mb-16">
              <Link href="/" aria-label="Meddy Health home">
                <Image
                  src="/meddy-emr-logo.svg"
                  alt="Meddy Health"
                  width={148}
                  height={24}
                  unoptimized
                  className="h-[24px] w-auto"
                />
              </Link>
            </div>

            <div className="mb-8 hidden lg:block">
              <Stepper step={submitted ? STEPS.length : step} />
            </div>
            <div className="mb-6 lg:hidden">
              <MobileStepper
                step={submitted ? STEPS.length - 1 : step}
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
              <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col">
                {renderStep()}
              </div>

            </form>
          </main>
        </div>
      </div>
    </FormProvider>
  );
};
