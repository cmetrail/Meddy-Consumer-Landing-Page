"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  ACCEPT_ALL,
  NO_TRACKING_PATHS,
  POLICY_VERSION,
  REJECT_ALL,
  getVisitorId,
  readConsent,
  writeConsent,
  type ConsentAction,
  type ConsentCategories,
  type ConsentSource,
} from "@/lib/consent";

type ConsentContextValue = {
  /** the saved choice, null until the visitor decides */
  categories: ConsentCategories | null;
  bannerOpen: boolean;
  settingsOpen: boolean;
  /** opens the preferences panel; the footer link uses the default source */
  openSettings: (source?: ConsentSource) => void;
  closeSettings: () => void;
  /** hides the banner for this visit only: nothing is saved or logged, so non-essential cookies stay off and we ask again next time */
  dismissBanner: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (categories: ConsentCategories) => void;
  /** true only when the visitor allowed the category and the page is not a no-tracking page */
  allows: (category: "analytics" | "marketing") => boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ConsentCategories | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsSource, setSettingsSource] = useState<ConsentSource>("settings_link");

  // Read the cookie after mount. No saved (or expired / older-policy) choice means ask again.
  useEffect(() => {
    // document.cookie only exists in the browser, so this has to run after mount (reading it during render would break hydration)
    const saved = readConsent();
    /* eslint-disable react-hooks/set-state-in-effect */
    if (saved) setCategories(saved.c);
    else setBannerOpen(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const decide = useCallback(
    (action: ConsentAction, next: ConsentCategories, source: ConsentSource) => {
      writeConsent(next);
      // a reject after a previous opt-in is a withdrawal
      const withdrew = categories && (categories.analytics || categories.marketing) && !next.analytics && !next.marketing;
      const logged: ConsentAction = source === "settings_link" && withdrew && action === "reject_all" ? "withdraw" : action;
      setCategories(next);
      setBannerOpen(false);
      setSettingsOpen(false);
      // Rejections are logged exactly like acceptances: one append-only row per decision.
      fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({ visitorId: getVisitorId(), action: logged, categories: next, policyVersion: POLICY_VERSION, source }),
      }).catch(() => {});
    },
    [categories],
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      categories,
      bannerOpen,
      settingsOpen,
      openSettings: (source = "settings_link") => {
        setSettingsSource(source);
        setSettingsOpen(true);
      },
      closeSettings: () => setSettingsOpen(false),
      dismissBanner: () => setBannerOpen(false),
      acceptAll: () => decide("accept_all", ACCEPT_ALL, settingsOpen ? settingsSource : "banner"),
      rejectAll: () => decide("reject_all", REJECT_ALL, settingsOpen ? settingsSource : "banner"),
      saveCustom: (next) => decide("custom", next, settingsOpen ? settingsSource : "banner"),
      allows: (category) => !!categories?.[category] && !NO_TRACKING_PATHS.some((p) => pathname?.startsWith(p)),
    }),
    [categories, bannerOpen, settingsOpen, settingsSource, decide, pathname],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}
