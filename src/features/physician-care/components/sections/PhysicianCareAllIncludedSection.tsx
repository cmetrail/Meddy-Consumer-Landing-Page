"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Item = {
  number: string;
  title: string;
  description: string;
  small?: boolean;
};

const ITEMS: Item[] = [
  {
    number: "01",
    title: "Physician visits",
    description:
      "A conversation with room for your priorities, informed by the context of your ongoing care.",
  },
  {
    number: "02",
    title: "Secure messaging",
    description:
      "A way to stay connected with your care team between visits. Service availability and response expectations are confirmed before enrollment. Not for emergencies.",
    small: true,
  },
  {
    number: "03",
    title: "Personalized care plans",
    description:
      "Physician-guided plans shaped by your individual health, everyday habits, and goals—and revisited as your needs change.",
  },
  {
    number: "04",
    title: "Physician-directed lab testing",
    description:
      "Testing guided by your physician, with results considered as part of your broader health picture. Specific tests and any additional costs are confirmed with your care team.",
  },
  {
    number: "05",
    title: "Longitudinal biomarker tracking",
    description:
      "A view of your biomarkers over time, helping your physician put individual results into context rather than treating them as isolated snapshots.",
  },
];

export default function PhysicianCareAllIncludedSection() {
  return (
    <section className="w-full bg-[#F9F9F9]">
      <div className="mx-auto w-full max-w-360">
        <motion.div
          className="flex flex-col gap-[10px] px-5 pt-16 lg:px-[75px] lg:pt-[61px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="font-medium uppercase leading-[1.26] text-[#A1AAA3] text-[28px] sm:text-[40px] lg:text-[48px]">
            Thoughtful care.
          </p>
          <h2 className="font-dm-serif italic leading-[1.371] text-[#46524B] text-[36px] sm:text-[52px] lg:text-[64px]">
            All included.
          </h2>
        </motion.div>

        <div className="mt-12 border-t border-[#E6E6E6] lg:mt-[42px]">
          {ITEMS.map((item) => (
            <div
              key={item.number}
              className="group border-b border-[#E6E6E6] transition-colors duration-300 hover:bg-[#96B984]"
            >
              <div className="flex flex-col gap-4 px-5 py-7 lg:min-h-[145px] lg:flex-row lg:items-center lg:justify-between lg:gap-[131px] lg:px-[68px] lg:py-0 lg:pl-[292px]">
                <div className="flex items-baseline gap-4 lg:gap-[100px]">
                  <span className="font-normal uppercase leading-[1.26] text-[#46524B] text-[16px] sm:text-[18px] lg:text-[20px] transition-colors group-hover:text-white">
                    {item.number}
                  </span>
                  <span className="font-semibold uppercase leading-[1.26] text-[#46524B] text-[22px] sm:text-[26px] lg:text-[32px] transition-colors group-hover:text-white">
                    {item.title}
                  </span>
                </div>
                <p
                  className={`font-normal leading-[1.26] text-[#8B928E] transition-colors group-hover:text-white lg:max-w-[420px] ${
                    item.small ? "text-[13px] lg:text-[14px]" : "text-[14px] lg:text-[16px]"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-16 lg:h-24" />
      </div>
    </section>
  );
}
