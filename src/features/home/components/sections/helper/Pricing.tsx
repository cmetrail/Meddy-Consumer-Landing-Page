import { Check, Crown } from "lucide-react";

function PlanCard({
  name,
  tagline,
  price,
  period,
  features,
  cta,
  highlighted = false,
  badge,
  featureWeight = 400,
  tagline2,
}: {
  name: string;
  tagline: string;
  price?: string;
  period?: string;
  features: { text: string; highlight?: boolean }[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
  featureWeight?: 400 | 600;
    tagline2: string;
}) {
  return (
    <div
      className={`relative flex h-full flex-col backdrop-blur-xl p-5 md:p-6 lg:p-8 ${highlighted
        ? "border-[5px] border-[#17925A] bg-[#D9D9D9]/20 lg:scale-110 lg:-translate-y-6"
        : "bg-[#CDCDCD]/20"
        }`}
    >
      {badge && (
        <span
          className="absolute -top-10 -left-1.25 inline-flex text-[20px] leading-[100%] items-center gap-1.75 h-9.5 bg-[#17925A] px-4 py-1 text-white"

        >
          <Crown size={24} /> {badge}
        </span>
      )}
      <div className="flex flex-col gap-4.75">
        <h3 className="text-white font-semibold text-[48px] leading-[100%]">{name}</h3>
        <div className="flex flex-col gap-2.5">
          <p className="text-white text-[24px] leading-[100%] tracking-[2%]" >{tagline}</p>
          <p className="text-white text-[24px] leading-[100%] tracking-[2%]" >{tagline2}</p>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-white lg:mt-6" />

      <ul className="mt-6 flex-1 space-y-4 lg:mt-7.5 lg:space-y-3.75">
        {features.map((f) => (
          <li key={f.text} className="flex items-center gap-4 lg:gap-[23px]">
            <Check
              size={24}
              className={f.highlight ? "text-[#E1FF8D]" : "text-white"}
              strokeWidth={2.5}
            />
            <span
              className={`text-[20px] tracking-[2%] leading-[100%] ${f.highlight ? "text-[#E1FF8D] font-bold" : "text-white"}`}
              style={{
                fontWeight: f.highlight ? 700 : featureWeight,
                letterSpacing: "0.02em",
              }}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {price && (
        <div className="mt-5 flex items-baseline gap-1 lg:mt-6">
          <span className="text-white font-bold leading-[100%] text-[48px] tracking-[0.5px]">$</span>
          <span className="text-white font-bold leading-[100%] text-[64px] tracking-[0.5px]" >{price}</span>
          {period && <span className="text-white font-semibold leading-[100%] text-[18px] tracking-[0.5px]" >{period}</span>}
        </div>
      )}

      <button
        className={`mt-6 w-full h-15 py-2.5 text-center text-[32px] leading-[100%] text-white transition-colors duration-200 lg:mt-8 ${highlighted
          ? "bg-[#17925A] shadow-[3px_4px_4px_rgba(78,191,68,0.25)] hover:bg-[#1BA867]"
          : "border border-white hover:bg-white/10"
          }`}

      >
        {cta}
      </button>
    </div>
  );
}

export function Pricing() {
  return (
    <>
      {/* Header */}
      <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[#F4F4F5] mb-3.75  uppercase leading-[100%] text-[24px] font-medium" >
            Pricing
          </p>
          <p className="text-white font-semibold leading-[100%] text-[48px] " >
            Care designed
          </p>
          <p className="text-white font-semibold leading-[100%] text-[96px] ">
            Around you
          </p>
        </div>
        <p className="text-white lg:pb-4 max-w-135.5 lg:text-right tracking-[2%] leading-[100%] text-[24px]">
          Simple transparent plans, physician-guided care that adapts to your life.
        </p>
      </div>

      {/* Plans */}
      <div className="mt-16 grid items-stretch gap-20 md:grid-cols-3 md:gap-4 lg:mt-36 lg:gap-10">
        <div data-reveal className="h-full">
          <PlanCard
            name="Free"
            tagline="Track your health"
            tagline2="Build better habits"
            features={[
              { text: "Track your Nutrition" },
              { text: "Workouts" },
              { text: "Sleep" },
              { text: "Progress in One Place" },
            ]}
            cta="Start for free"
          />
        </div>
        <div data-reveal className="h-full">
          <PlanCard
            name="Meddy Care"
            tagline="Track your health"
            tagline2="Build better habits"
            price="249"
            period="/Month"
            badge="Premium Plan"
            highlighted
            featureWeight={600}
            features={[
              { text: "UNLIMITED LABS", highlight: true },
              { text: "Bi-weekly Physician Access" },
              { text: "Secure Messaging" },
              { text: "Your Health Team" },
            ]}
            cta="Choose Care"
          />
        </div>
        <div data-reveal className="h-full">
          <PlanCard
            name="Complete"
            tagline="Track your health"
            tagline2="Build better habits"
            price="169"
            period="/Month"
            features={[
              { text: "Add Physician Guidance" },
              { text: "Secure Messaging" },
              { text: "Quarterly Labs" },
            ]}
            cta="Choose complete"
          />
        </div>
      </div>
    </>
  );
}
