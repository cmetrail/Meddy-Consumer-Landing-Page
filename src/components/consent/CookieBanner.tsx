"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConsent } from "./ConsentProvider";
import type { ConsentCategories } from "@/lib/consent";

// Three actions, identical size and styling on purpose: no option is nudged over the others.
const ACTION_BTN =
  "flex w-full items-center justify-center whitespace-nowrap rounded-[35px] border border-solid border-[#17925a] bg-white px-[20px] py-[12px] text-[14px] font-normal leading-[1.5] text-[#17925a] transition-colors hover:bg-[#17925a]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17925a]";
const ACCEPT_BTN = ACTION_BTN.replace("bg-white", "bg-[#17925a]").replace("text-[#17925a]", "text-white").replace("hover:bg-[#17925a]/10", "hover:opacity-90");
const ACTION_ROW = "grid w-full grid-cols-1 gap-[10px] sm:w-auto sm:grid-cols-[repeat(3,minmax(140px,1fr))]";
const POLICY_LINK = "text-[16px] leading-[1.5] text-[#17925a] underline underline-offset-2 [text-underline-position:from-font]";

function CloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="absolute right-[16px] top-[14px] flex h-[24px] w-[24px] items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#17925a]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/consent-close.svg" alt="" className="h-[12px] w-[12px]" />
    </button>
  );
}

const CATEGORY_COPY = [
  { key: "necessary", title: "Necessary", text: "Keep the site working: security, forms, and remembering your cookie choice. Always on." },
  { key: "analytics", title: "Analytics", text: "Help us understand how visitors use the site so we can improve it." },
  { key: "marketing", title: "Marketing", text: "Used to measure and personalize our ads." },
] as const;

function Switch({ checked, disabled, onChange, label }: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-[24px] w-[44px] shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17925a] ${
        checked ? "bg-[#17925a]" : "bg-[#d9d9d9]"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span className={`absolute left-[2px] top-[2px] h-[20px] w-[20px] rounded-full bg-white transition-transform ${checked ? "translate-x-[20px]" : ""}`} />
    </button>
  );
}

function SettingsDialog() {
  const { categories, closeSettings, acceptAll, rejectAll, saveCustom } = useConsent();
  const [draft, setDraft] = useState<ConsentCategories>(categories ?? { necessary: true, analytics: false, marketing: false });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeSettings();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSettings]);

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-4" onMouseDown={(e) => e.target === e.currentTarget && closeSettings()}>
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        data-lenis-prevent
        className="relative max-h-[90dvh] w-full max-w-[560px] overflow-y-auto rounded-[8px] bg-white p-[32px] text-[#111110] shadow-xl outline-none"
      >
        <CloseButton onClick={closeSettings} label="Close cookie settings" />
        <h2 id="cookie-settings-title" className="text-center text-[24px] font-medium leading-[1.5] text-[#17925a]">Cookie settings</h2>
        <p className="mt-2 text-center text-[16px] leading-[1.5] text-[#46524b]">
          Choose which cookies we may use. We don&rsquo;t use analytics or advertising cookies on our medication or weight-management pages.
        </p>

        <ul className="mt-5 flex flex-col gap-4">
          {CATEGORY_COPY.map((c) => (
            <li key={c.key} className="flex items-start justify-between gap-4 border-b border-solid border-[#e6e6e1] pb-4 last:border-b-0">
              <div>
                <p className="text-[16px] font-medium leading-[1.5]">{c.title}</p>
                <p className="text-[14px] leading-[1.5] text-[#7b7b7b]">{c.text}</p>
              </div>
              {c.key === "necessary" ? (
                <Switch checked disabled label="Necessary cookies (always on)" />
              ) : (
                <Switch checked={draft[c.key]} onChange={(v) => setDraft({ ...draft, [c.key]: v })} label={`${c.title} cookies`} />
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-center">
          <div className={ACTION_ROW}>
            <button type="button" className={ACCEPT_BTN} onClick={acceptAll}>Accept all</button>
            <button type="button" className={ACTION_BTN} onClick={rejectAll}>Reject all</button>
            <button type="button" className={ACTION_BTN} onClick={() => saveCustom(draft)}>Save choices</button>
          </div>
        </div>
        <p className="mt-8 text-center">
          <Link href="/cookie-policy" className={POLICY_LINK} onClick={closeSettings}>Read our Cookie Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function CookieBanner() {
  const { bannerOpen, settingsOpen, acceptAll, rejectAll, openSettings, dismissBanner } = useConsent();
  const pathname = usePathname();
  const isCookiePolicyPage = pathname === "/cookie-policy";

  return (
    <>
      {bannerOpen && !settingsOpen && !isCookiePolicyPage && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[1000] mx-auto flex max-w-[880px] flex-col items-center gap-[32px] rounded-[8px] bg-white p-[32px] text-[#111110] shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
        >
          <CloseButton onClick={dismissBanner} label="Close cookie banner without saving a choice" />
          <div className="flex w-full flex-col items-center gap-[16px] text-center">
            <h2 className="text-[20px] font-medium leading-[1.5] text-[#17925a]">We use cookies</h2>
            <p className="text-[16px] leading-[1.5]">
              We use cookies to keep this site working and, with your permission, to understand how visitors use it and to measure and personalize our ads. We don’t use analytics or advertising cookies on our medication or weight-management pages. You can change your choice at any time using the “Cookie settings” link at the bottom of every page.
            </p>
            <div className={ACTION_ROW}>
              <button type="button" className={ACCEPT_BTN} onClick={acceptAll}>Accept all</button>
              <button type="button" className={ACTION_BTN} onClick={rejectAll}>Reject all</button>
              <button type="button" className={ACTION_BTN} onClick={() => openSettings("banner")}>Manage settings</button>
            </div>
          </div>
          <Link href="/cookie-policy" className={POLICY_LINK} onClick={dismissBanner}>Read our Cookie Policy</Link>
        </div>
      )}
      {settingsOpen && !isCookiePolicyPage && <SettingsDialog />}
    </>
  );
}
