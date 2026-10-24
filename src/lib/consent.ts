/** Shared consent types + first-party cookie helpers (browser only for the cookie functions). */

export const POLICY_VERSION = "2026-10-v1"; // bump when the banner text or cookie policy changes to re-ask everyone
export const CONSENT_COOKIE = "meddy_consent";
export const VISITOR_COOKIE = "meddy_visitor_id";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 12 months, matches the Cookie Policy table; then we ask again
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365;

/** Pages where we never load analytics or advertising scripts, whatever the visitor chose. */
export const NO_TRACKING_PATHS = ["/medication", "/weight-loss"];

export type ConsentCategories = { necessary: true; analytics: boolean; marketing: boolean };
export type ConsentAction = "accept_all" | "reject_all" | "custom" | "withdraw";
export type ConsentSource = "banner" | "settings_link";

export type ConsentPayload = {
  visitorId: string;
  action: ConsentAction;
  categories: ConsentCategories;
  policyVersion: string;
  source: ConsentSource;
};

export type StoredConsent = { v: string; c: ConsentCategories };

export const ACCEPT_ALL: ConsentCategories = { necessary: true, analytics: true, marketing: true };
export const REJECT_ALL: ConsentCategories = { necessary: true, analytics: false, marketing: false };

function readCookie(name: string): string | null {
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

function writeCookie(name: string, value: string, maxAge: number) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

/** The saved choice, or null when missing, expired, malformed or made under an older policy version. */
export function readConsent(): StoredConsent | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.v !== POLICY_VERSION || typeof parsed.c?.analytics !== "boolean" || typeof parsed.c?.marketing !== "boolean") return null;
    return { v: parsed.v, c: { necessary: true, analytics: parsed.c.analytics, marketing: parsed.c.marketing } };
  } catch {
    return null;
  }
}

export function writeConsent(categories: ConsentCategories) {
  writeCookie(CONSENT_COOKIE, JSON.stringify({ v: POLICY_VERSION, c: categories } satisfies StoredConsent), CONSENT_MAX_AGE);
}

/** Random id kept in a first-party cookie; never an email or name. A new one is made if the cookie is deleted. */
export function getVisitorId(): string {
  const existing = readCookie(VISITOR_COOKIE);
  if (existing) return existing;
  const id = crypto.randomUUID();
  writeCookie(VISITOR_COOKIE, id, VISITOR_MAX_AGE);
  return id;
}
