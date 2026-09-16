import { CircleCheckBig, Crown } from "lucide-react";

const GREEN = "#17925A";
const LIGHT_GREEN = "#8ABE85";
const MINT = "#B9FFB3";
const GRAY = "#DADADA";
const WHITE = "#FFFFFF";

type PlanCardProps = {
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  titleColor: string;
  titleSize: number;
  description: string;
  descriptionColor: string;
  planName?: string;
  price?: string;
  period?: string;
  priceColor?: string;
  subheader?: string;
  subheaderSize?: number;
  features: string[];
  featureColor: string;
  checkColor: string;
  variant: "free" | "care" | "complete";
  badge?: string;
};

function PlanCard({
  eyebrow,
  eyebrowColor,
  title,
  titleColor,
  titleSize,
  description,
  descriptionColor,
  planName,
  price,
  period,
  priceColor = WHITE,
  subheader,
  subheaderSize = 16,
  features,
  featureColor,
  checkColor,
  variant,
  badge,
}: PlanCardProps) {
  const cardClass =
    variant === "complete"
      ? "bg-[#17925A]"
      : variant === "care"
        ? "border-[3px] border-[#17925A] bg-[#CDCDCD]/20 backdrop-blur-xl"
        : "bg-[#CDCDCD]/20 backdrop-blur-xl";

  const btnClass =
    variant === "complete"
      ? "bg-white text-[#17925A] shadow-[0px_3px_3px_rgba(0,0,0,0.25)] hover:bg-[#F4F4F5]"
      : variant === "care"
        ? "bg-[#17925A] text-white shadow-[0px_3px_3px_rgba(0,0,0,0.25)] hover:bg-[#1BA867]"
        : "border border-white text-white hover:bg-white/10";

  return (
    <div className={`relative flex h-full flex-col p-6 lg:p-7 ${cardClass}`}>
      {badge && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 bg-[#17925A] px-3.5 py-1 text-[15px] font-medium leading-[100%] text-white">
          <Crown size={22} /> {badge}
        </span>
      )}

      <p className="text-[32px] font-medium uppercase leading-[100%]" style={{ color: eyebrowColor }}>
        {eyebrow}
      </p>

      <h3 className="mt-1 font-bold leading-[100%]" style={{ color: titleColor, fontSize: titleSize }}>
        {title}
      </h3>

      <p className="mt-4 text-[14px] leading-[1.4]" style={{ color: descriptionColor }}>
        {description}
      </p>

      <div className={planName ? "mt-2" : "mt-4"}>
        {planName ? (
          <p className="text-[48px] font-semibold uppercase leading-[100%]" style={{ color: titleColor }}>
            {planName}
          </p>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="text-[36px] font-semibold uppercase leading-[100%]" style={{ color: priceColor }}>
              ${price}
            </span>
            <span className="text-[18px] font-normal leading-[100%]" style={{ color: WHITE }}>
              {period}
            </span>
          </div>
        )}
      </div>

      {subheader && (
        <p className="mt-5 font-semibold leading-[100%]" style={{ color: WHITE, fontSize: subheaderSize }}>
          {subheader}
        </p>
      )}

      <ul className={`flex flex-1 flex-col gap-[14px] ${subheader ? "mt-[22px]" : "mt-[30px]"}`}>
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <CircleCheckBig size={18} className="mt-[2px] shrink-0" style={{ color: checkColor }} strokeWidth={2} />
            <span className="text-[14px] leading-[1.3]" style={{ color: featureColor }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 flex h-[50px] w-full items-center justify-center rounded-[7px] text-[18px] font-semibold transition-colors duration-200 ${btnClass}`}
      >
        Join the waitlist
      </button>
    </div>
  );
}

export function Pricing() {
  return (
    <>
      {/* Header */}
      <div data-pricing-head className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p data-line className="text-[#F4F4F5] mb-3.75  uppercase leading-[100%] text-[24px] font-medium">
            Pricing
          </p>
          <p data-line className="text-white font-semibold leading-[100%] text-[48px] ">
            Care designed
          </p>
          <p data-line className="text-white font-semibold leading-[100%] text-[96px] ">
            Around you
          </p>
        </div>
        <p
          data-line
          className="text-white lg:pb-4 max-w-135.5 lg:text-right tracking-[2%] leading-[100%] text-[24px] whitespace-pre-line"
        >
          {"Simple transparent plans,\nphysician-guided care that adapts to your life."}
        </p>
      </div>

      {/* Plans */}
      <div className="mt-16 grid items-stretch gap-20 md:grid-cols-3 md:gap-4 lg:mt-36 lg:gap-[35px]">
        <div data-plan-card className="h-full">
          <PlanCard
            variant="free"
            eyebrow="Meddy"
            eyebrowColor={LIGHT_GREEN}
            title="Understand your health."
            titleColor={WHITE}
            titleSize={20}
            description="Everything you need to track nutrition, workouts, sleep, recovery, and progress in one place."
            descriptionColor={GRAY}
            planName="Free"
            features={[
              "AI nutrition tracking",
              "Workout planning and logging",
              "Weight trends",
              "Progress dashboards",
              "Habit and lifestyle tracking",
            ]}
            featureColor={GRAY}
            checkColor={LIGHT_GREEN}
          />
        </div>

        <div data-plan-card className="h-full">
          <PlanCard
            variant="care"
            badge="Most popular"
            eyebrow="Meddy Care"
            eyebrowColor={LIGHT_GREEN}
            title="Add physician guidance."
            titleColor={WHITE}
            titleSize={20}
            description="For people who want medical insight, lab interpretation, and personalized recommendations."
            descriptionColor={GRAY}
            price="169"
            period="/month"
            subheader="Everything in Meddy, plus:"
            features={[
              "Physician access (monthly)",
              "Secure messaging",
              "Phone and video appointments",
              "Quarterly comprehensive lab testing included",
              "Biomarker tracking",
              "Personalized adjustments",
            ]}
            featureColor={WHITE}
            checkColor={WHITE}
          />
        </div>

        <div data-plan-card className="h-full">
          <PlanCard
            variant="complete"
            eyebrow="Meddy Complete"
            eyebrowColor={WHITE}
            title="Your health team."
            titleColor={MINT}
            titleSize={17.77}
            description="For patients who want ongoing physician support and a more comprehensive healthcare experience."
            descriptionColor={WHITE}
            price="249"
            period="/month"
            priceColor={MINT}
            subheader="Everything in Meddy care, plus:"
            subheaderSize={15}
            features={[
              "Physician access (biweekly)",
              "Secure messaging",
              "Unlimited physician-directed lab testing as clinically appropriate",
              "Biomarker tracking",
              "Personalized adjustments",
              "Continuous care coordination",
              "Priority scheduling",
            ]}
            featureColor={WHITE}
            checkColor={WHITE}
          />
        </div>
      </div>
    </>
  );
}
