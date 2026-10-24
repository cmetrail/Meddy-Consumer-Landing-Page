"use client";

import Script, { type ScriptProps } from "next/script";
import { useConsent } from "./ConsentProvider";

/**
 * Loads a non-essential script only when the visitor allowed its category (and never on
 * medication / weight-management pages). Use instead of <Script> for analytics and ad tags:
 *   <ConsentScript category="analytics" src="https://..." strategy="afterInteractive" />
 */
export function ConsentScript({ category, ...props }: { category: "analytics" | "marketing" } & ScriptProps) {
  const { allows } = useConsent();
  return allows(category) ? <Script {...props} /> : null;
}
