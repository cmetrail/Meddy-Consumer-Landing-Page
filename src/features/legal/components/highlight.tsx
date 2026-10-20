import type { ReactNode } from "react";

type Rule = { cls: "name" | "contact"; re: RegExp };

const RULES: Rule[] = [
  { cls: "name", re: /Dr\. Sameer Aggarwal/ },
  { cls: "name", re: /Dr\. Aggarwal/ },
  { cls: "name", re: /Meddy Health LLC/ },
  { cls: "name", re: /Sameer Aggarwal Medical PLLC/ },
  { cls: "contact", re: /515 W 38th Street, Apt 11J, New York, NY 10018/ },
  { cls: "contact", re: /200 Independence Avenue SW, Washington, DC 20201/ },
  { cls: "contact", re: /www\.hhs\.gov\/ocr\/privacy\/hipaa\/complaints\/?/i },
  { cls: "contact", re: /getmeddyhealth\.com/i },
  { cls: "contact", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/ },
  { cls: "contact", re: /1-\d{3}-\d{3}-\d{4}/ },
  { cls: "contact", re: /\d{3}-\d{3}-\d{4}/ },
  { cls: "contact", re: /\b911\b/ },
  { cls: "contact", re: /\b988\b/ },
];

const COMBINED = new RegExp(RULES.map((r) => `(${r.re.source})`).join("|"), "gi");

const CLASSES: Record<Rule["cls"], string> = {
  name: "font-semibold text-[#f4f4f5]",
  contact: "font-semibold text-[#6ee7a0]",
};

export function highlightText(text: string): ReactNode {
  if (!text) return text;

  const re = new RegExp(COMBINED.source, "gi");
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    const full = match[0];
    if (full.length === 0) {
      re.lastIndex++;
      continue;
    }
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    let cls: Rule["cls"] = "name";
    for (let i = 0; i < RULES.length; i++) {
      if (match[i + 1] !== undefined) {
        cls = RULES[i].cls;
        break;
      }
    }
    parts.push(
      <span key={key++} className={CLASSES[cls]}>
        {full}
      </span>,
    );
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
