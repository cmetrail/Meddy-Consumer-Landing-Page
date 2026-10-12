"use client";

import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import type { BookConsultationForm } from "../types";
import { STEPS } from "../constants";
import Stepper, { MobileStepper } from "../components/Stepper";
import { toISODate } from "../components/Calendar";
import AboutYouStep from "../components/steps/AboutYouStep";
import YourGoalsStep from "../components/steps/YourGoalsStep";
import ChooseTimeStep from "../components/steps/ChooseTimeStep";
import BeforeYouVisitStep from "../components/steps/BeforeYouVisitStep";
import ConfirmationStep from "../components/steps/ConfirmationStep";

const STEP_FIELDS: (keyof BookConsultationForm)[][] = [
  ["firstName", "lastName", "email", "mobileNumber", "stateOfResidence", "is18OrOlder"],
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
  time: "10:00 AM",
  agreeTerms: false,
  telehealthConsent: false,
  privacyPractices: false,
};

export const BookConsultationPage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const methods = useForm<BookConsultationForm>({
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { trigger } = methods;

  const next = async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (!valid) return;
    if (step === STEPS.length - 1) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const renderStep = () => {
    if (submitted) return <ConfirmationStep />;
    switch (step) {
      case 0:
        return <AboutYouStep />;
      case 1:
        return <YourGoalsStep />;
      case 2:
        return <ChooseTimeStep />;
      default:
        return <BeforeYouVisitStep />;
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
                      className="hidden items-center gap-[8px] py-[12px] text-[16px] font-medium uppercase leading-[1.5] text-[#17925a] transition-colors hover:text-[#17925a]/80 lg:flex lg:py-[14px] lg:text-[20px]"
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
                    className="w-full rounded-[10px] bg-[#17925a] px-[20px] py-[12px] text-[16px] font-medium uppercase leading-[1.5] text-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90 lg:w-auto lg:min-w-[377px] lg:px-[24px] lg:py-[14px] lg:text-[20px]"
                  >
                    {step === STEPS.length - 1 ? "Get my visit link" : "Continue"}
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
