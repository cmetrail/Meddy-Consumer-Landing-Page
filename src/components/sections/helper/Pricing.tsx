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
}) {
  return (
    <div
      className={`relative flex flex-col backdrop-blur-xl p-5 md:p-6 lg:p-8 ${
        highlighted
          ? "border-[5px] border-[#17925A] bg-[#D9D9D9]/20 lg:-translate-y-16"
          : "bg-[#CDCDCD]/20"
      }`}
    >
      {badge && (
        <span
          className="absolute -top-4 left-4 inline-flex items-center gap-[7px] rounded-full bg-[#17925A] px-4 py-1 text-white"
          style={{ fontSize: "clamp(13px,1.39vw,20px)" }}
        >
          <Crown size={24} /> {badge}
        </span>
      )}

      <h3 className="text-white font-semibold" style={{ fontSize: "clamp(26px,3.33vw,48px)", lineHeight: 1.25 }}>{name}</h3>
      <p className="text-white" style={{ fontSize: "clamp(15px,1.67vw,24px)", lineHeight: 1.3, letterSpacing: "0.02em" }}>{tagline}</p>

      <div className="mt-5 h-px w-full bg-white lg:mt-6" />

      <ul className="mt-6 flex-1 space-y-4 lg:mt-[30px] lg:space-y-[15px]">
        {features.map((f) => (
          <li key={f.text} className="flex items-center gap-4 lg:gap-[23px]">
            <Check
              size={24}
              className={f.highlight ? "text-[#E1FF8D]" : "text-white"}
              strokeWidth={2.5}
            />
            <span
              className={f.highlight ? "text-[#E1FF8D] font-bold" : "text-white"}
              style={{
                fontSize: f.highlight ? "clamp(15px,1.67vw,24px)" : "clamp(13px,1.39vw,20px)",
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
        <div className="mt-5 flex items-baseline gap-2.5 lg:mt-6">
          <span className="text-white font-bold" style={{ fontSize: "clamp(30px,3.33vw,48px)", letterSpacing: "0.5px" }}>$</span>
          <span className="text-white font-bold leading-none" style={{ fontSize: "clamp(40px,4.44vw,64px)", letterSpacing: "0.5px" }}>{price}</span>
          {period && <span className="text-white font-semibold" style={{ fontSize: "clamp(12px,1.25vw,18px)", letterSpacing: "0.5px" }}>{period}</span>}
        </div>
      )}

      <button
        className={`mt-6 w-full py-2.5 text-center text-white transition-colors duration-200 lg:mt-8 ${
          highlighted
            ? "bg-[#17925A] shadow-[3px_4px_4px_rgba(78,191,68,0.25)] hover:bg-[#1BA867]"
            : "border border-white hover:bg-white/10"
        }`}
        style={{ fontSize: "clamp(18px,2.22vw,32px)", lineHeight: 1.25 }}
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
          <p className="text-[#F4F4F5] font-medium uppercase tracking-[0.02em]" style={{ fontSize: "clamp(15px,1.67vw,24px)", lineHeight: 1.25 }}>
            Pricing
          </p>
          <p className="text-white font-semibold" style={{ fontSize: "clamp(30px,3.33vw,48px)", lineHeight: 1.25 }}>
            Care designed
          </p>
          <p className="text-white font-semibold" style={{ fontSize: "clamp(48px,6.67vw,96px)", lineHeight: 1.25 }}>
            Around you
          </p>
        </div>
        <p className="text-white lg:pb-4 lg:text-right tracking-[0.02em]" style={{ fontSize: "clamp(15px,1.67vw,24px)", lineHeight: 1.3, maxWidth: 542 }}>
          Simple transparent plans, physician-guided care that adapts to your life.
        </p>
      </div>

      {/* Plans */}
      <div className="mt-16 grid items-start gap-8 md:grid-cols-3 md:gap-4 lg:mt-36 lg:gap-6">
        <div data-reveal>
          <PlanCard
            name="Free"
            tagline="Track your health. Build better habits"
            features={[
              { text: "Track your Nutrition" },
              { text: "Workouts" },
              { text: "Sleep" },
              { text: "Progress in One Place" },
            ]}
            cta="Start for free"
          />
        </div>
        <div data-reveal>
          <PlanCard
            name="Meddy Care"
            tagline="Track your health. Build better habits"
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
        <div data-reveal>
          <PlanCard
            name="Complete"
            tagline="Track your health. Build better habits"
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
