"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Eyebrow from "./Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WEIGHT = {
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export default function FeatureCopy({
  eyebrow,
  headline,
  accent,
  sub,
  headlineWeight = "medium",
  headlineSize = "text-[28px] sm:text-[36px]",
  headlineColor = "#ABB1AD",
}: {
  eyebrow: string;
  headline: string[];
  accent: string;
  sub: string;
  headlineWeight?: keyof typeof WEIGHT;
  headlineSize?: string;
  headlineColor?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      gsap.utils.toArray<HTMLElement>("[data-feature-line]", root).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 48 }, {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 55%",
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="flex flex-col gap-20  lg:max-w-156.25 lg:gap-32.5">
      <div className="flex flex-col gap-10 lg:gap-22.5">
        <div data-feature-line>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h3
          data-feature-line
          className={`${WEIGHT[headlineWeight]} ${headlineSize} uppercase leading-[100%] tracking-[2%]`}
          style={{ color: headlineColor }}
        >
          {headline.map((item) => {
            return <div key={item}>{item}</div>
          })}
          <span className="text-[#578951]">{accent}</span>
        </h3>
      </div>
      <p data-feature-line className="text-[#ABB1AD]  max-w-xl text-[16px] sm:text-[24px] leading-[100%] tracking-[2%]" >
        {sub}
      </p>
    </div>
  );
}
