import type { ReactNode } from "react";

type Kind = "name" | "email" | "tel" | "url" | "address";

type Rule = { kind: Kind; re: RegExp };

const RULES: Rule[] = [
  { kind: "name", re: /Dr\. Sameer Aggarwal/ },
  { kind: "name", re: /Dr\. Aggarwal/ },
  { kind: "name", re: /Meddy Health LLC/ },
  { kind: "name", re: /Sameer Aggarwal Medical PLLC/ },
  { kind: "address", re: /2248 Broadway #1071, New York, NY 10024/ },
  { kind: "address", re: /307 W 38th St 16th Floor # 255 New York, NY 10018/ },
  { kind: "address", re: /200 Independence Avenue SW, Washington, DC 20201/ },
  { kind: "url", re: /www\.hhs\.gov\/ocr\/privacy\/hipaa\/complaints\/?/i },
  { kind: "url", re: /getmeddyhealth\.com/i },
  { kind: "email", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/ },
  { kind: "tel", re: /1-\d{3}-\d{3}-\d{4}/ },
  { kind: "tel", re: /\d{3}-\d{3}-\d{4}/ },
  { kind: "tel", re: /\b911\b/ },
  { kind: "tel", re: /\b988\b/ },
];

const COMBINED = new RegExp(RULES.map((r) => `(${r.re.source})`).join("|"), "gi");

const NAME_CLASS = "font-semibold text-[#f4f4f5]";
const LINK_CLASS =
  "font-semibold text-[#6ee7a0] underline-offset-2 transition-opacity hover:opacity-80 hover:underline";

function telHref(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return digits;
}

function urlHref(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function mapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function renderToken(value: string, kind: Kind, key: number): ReactNode {
  switch (kind) {
    case "name":
      return (
        <span key={key} className={NAME_CLASS}>
          {value}
        </span>
      );
    case "email":
      return (
        <a key={key} href={`mailto:${value}`} className={LINK_CLASS}>
          {value}
        </a>
      );
    case "tel":
      return (
        <a key={key} href={`tel:${telHref(value)}`} className={LINK_CLASS}>
          {value}
        </a>
      );
    case "url":
      return (
        <a
          key={key}
          href={urlHref(value)}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {value}
        </a>
      );
    case "address":
      return (
        <a
          key={key}
          href={mapsHref(value)}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {value}
        </a>
      );
  }
}

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
    let kind: Kind = "name";
    for (let i = 0; i < RULES.length; i++) {
      if (match[i + 1] !== undefined) {
        kind = RULES[i].kind;
        break;
      }
    }
    parts.push(renderToken(full, kind, key++));
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
