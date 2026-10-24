import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ACTIONS = ["accept_all", "reject_all", "custom", "withdraw"];
const SOURCES = ["banner", "settings_link"];

// ponytail: only prints the record. Replace the console.log with a POST to the real backend (append-only table, one row per decision).
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { visitorId, action, categories, policyVersion, source } = body as {
    visitorId?: string;
    action?: string;
    categories?: { analytics?: unknown; marketing?: unknown };
    policyVersion?: string;
    source?: string;
  };

  if (
    typeof visitorId !== "string" || visitorId.length === 0 || visitorId.length > 64 ||
    typeof policyVersion !== "string" || policyVersion.length > 40 ||
    !action || !ACTIONS.includes(action) ||
    !source || !SOURCES.includes(source) ||
    typeof categories?.analytics !== "boolean" || typeof categories?.marketing !== "boolean"
  ) {
    return NextResponse.json({ ok: false, error: "Invalid consent payload" }, { status: 400 });
  }

  // Never store the raw IP: keep an HMAC so repeat decisions can be matched without identifying anyone.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = crypto.createHmac("sha256", process.env.IP_SALT ?? "dev-only-salt").update(ip).digest("hex");

  const record = {
    id: crypto.randomUUID(),
    visitor_id: visitorId,
    action,
    // necessary is always on; analytics and marketing are what the visitor chose
    categories: { necessary: true, analytics: categories.analytics, marketing: categories.marketing },
    policy_version: policyVersion,
    source,
    created_at: new Date().toISOString(),
    ip_hash: ipHash,
    country: req.headers.get("x-vercel-ip-country") ?? null,
    user_agent: req.headers.get("user-agent")?.slice(0, 200) ?? null,
  };

  console.log("[consent]", JSON.stringify(record));

  return NextResponse.json({ ok: true, id: record.id });
}
