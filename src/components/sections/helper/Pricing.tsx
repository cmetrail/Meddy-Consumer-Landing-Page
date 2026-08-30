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
      className={`relative flex flex-col backdrop-blur-xl ${
        highlighted
          ? "border-[5px] border-[#17925A] bg-[#D9D9D9]/20 p-8 lg:-translate-y-16"
          : "bg-[#CDCDCD]/20 p-8"
      }`}
    >
      {badge && (
        <span className="absolute bottom-full -left-1.25 inline-flex items-center gap-2 bg-[#17925A] px-4 py-3 text-white" style={{ fontSize: 18 }}>
          <Crown size={20} strokeWidth={1.5} /> {badge}
        </span>
      )}

      <h3 className="text-white font-semibold" style={{ fontSize: 48, lineHeight: "60px" }}>{name}</h3>
      <p className="text-white" style={{ fontSize: 24, lineHeight: "30px", letterSpacing: "0.02em" }}>{tagline}</p>

      <div className="mt-6 h-px w-full bg-white" />

      <ul className="mt-[30px] flex-1 space-y-[15px]">
        {features.map((f) => (
          <li key={f.text} className="flex items-center gap-[23px]">
            <Check size={24} className={f.highlight ? "text-[#E1FF8D]" : "text-white"} strokeWidth={2.5} />
            <span
              className={f.highlight ? "text-[#E1FF8D] font-bold" : "text-white"}
              style={{
                fontSize: f.highlight ? 24 : 20,
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
        <div className="mt-6 flex items-baseline gap-2.5">
          <span className="text-white font-bold" style={{ fontSize: 48, letterSpacing: "0.5px" }}>$</span>
          <span className="text-white font-bold leading-none" style={{ fontSize: 64, letterSpacing: "0.5px" }}>{price}</span>
          {period && <span className="text-white font-semibold" style={{ fontSize: 18, letterSpacing: "0.5px" }}>{period}</span>}
        </div>
      )}

      <button
        className={`mt-8 py-2.5 w-full text-white text-center transition-colors duration-200 ${
          highlighted
            ? "bg-[#17925A] shadow-[3px_4px_4px_rgba(78,191,68,0.25)] hover:bg-[#1BA867]"
            : "border border-white hover:bg-white/10"
        }`}
        style={{ fontSize: 32, lineHeight: "40px" }}
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
      <div data-reveal className="flex flex-col  lg:flex-row lg:items-end lg:justify-between gap-8">
        <div>
          <p className="text-[#F4F4F5] font-medium uppercase tracking-[0.02em]" style={{ fontSize: 24, lineHeight: "30px" }}>
            Pricing
          </p>
          <p className="text-white font-semibold" style={{ fontSize: 48, lineHeight: "60px" }}>
            Care designed
          </p>
          <p className="text-white font-semibold" style={{ fontSize: 96, lineHeight: "121px" }}>
            Around you
          </p>
        </div>
        <p className="text-white lg:text-right lg:pb-4 tracking-[0.02em]" style={{ fontSize: 24, lineHeight: "30px", maxWidth: 542 }}>
          Simple transparent plans, physician-guided care that adapts to your life.
        </p>
      </div>

      {/* Plans */}
      <div className="mt-28 grid lg:grid-cols-3 gap-8 lg:gap-6 items-start lg:mt-36">
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
        <div data-reveal className="pt-14 lg:pt-0">
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
