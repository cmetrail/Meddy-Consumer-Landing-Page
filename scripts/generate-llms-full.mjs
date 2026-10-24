#!/usr/bin/env node
// Regenerates public/llms-full.txt from the same page metadata (app/*/page.tsx)
// and FAQ constants (src/features/*/faqs.ts) used by the app, so the LLM-facing
// content cannot drift from the live source of truth.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://getmeddyhealth.com";
const OUT = join(root, "public", "llms-full.txt");

// Ordered list of routes ("" = home). Order mirrors public/llms.txt key pages.
const ROUTES = [
  "",
  "why-meddy",
  "how-it-works",
  "longevity",
  "biomarkers",
  "sleep",
  "fitness",
  "nutrition",
  "weight-loss",
  "medication",
  "physician-care",
  "personalized-health-plans",
  "wearables",
  "what-we-test",
  "247-care",
  "pricing",
  "book-consultation",
  "terms-of-use",
  "privacy-policy",
  "cookie-policy",
  "patient-terms-of-service",
  "notice-of-privacy-practices",
  "telehealth-consent",
];

// Feature folders that export a single `FAQS: Faq[]` from faqs.ts.
const FAQ_FEATURES = [
  "weight-loss",
  "longevity",
  "nutrition",
  "fitness",
  "medication",
  "personalized-health-plans",
  "wearables",
  "physician-care",
];

function readPage(route) {
  const file =
    route === "" ? join(root, "app", "page.tsx") : join(root, "app", route, "page.tsx");
  const src = readFileSync(file, "utf8");
  const title = src.match(/const TITLE = "([^"]*)";/)?.[1];
  const description = src.match(/const DESCRIPTION =\s*\n\s*"([\s\S]*?)";/)?.[1];
  if (!title || !description) throw new Error(`Missing TITLE/DESCRIPTION in ${file}`);
  return { path: route === "" ? "/" : `/${route}`, title, description };
}

function readFaqs(feature) {
  const src = readFileSync(join(root, "src", "features", feature, "faqs.ts"), "utf8");
  const items = [];
  const re = /\{\s*q:\s*"([^"]*)",\s*a:\s*"([^"]*)",?\s*\}/gs;
  let match;
  while ((match = re.exec(src)) !== null) {
    items.push({ q: match[1], a: match[2].replace(/\\n/g, "\n") });
  }
  if (items.length === 0) throw new Error(`No FAQs parsed from ${feature}/faqs.ts`);
  return items;
}

const pages = ROUTES.map(readPage);
const faqs = FAQ_FEATURES.map((feature) => ({ feature, items: readFaqs(feature) }));

const lines = [];
lines.push("# Meddy Health");
lines.push("");
lines.push("> Meddy Health is physician-guided primary care built around your nutrition, workouts, sleep, and labs. Now accepting our first 500 patients.");
lines.push("");
lines.push("Meddy connects your everyday health data — nutrition, workouts, sleep, and labs — into one personalized plan your physician can actually act on. All medical services are provided by Sameer Aggarwal Medical PLLC and its licensed clinicians.");
lines.push("");
lines.push("## Pages");
lines.push("");
for (const page of pages) {
  lines.push(`### ${page.title}`);
  lines.push("");
  lines.push(`URL: ${SITE_URL}${page.path}`);
  lines.push("");
  lines.push(page.description);
  lines.push("");
}
lines.push("## Frequently asked questions");
lines.push("");
for (const { feature, items } of faqs) {
  lines.push(`### ${feature.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`);
  lines.push("");
  for (const item of items) {
    lines.push(`Q: ${item.q}`);
    lines.push("");
    lines.push(`A: ${item.a}`);
    lines.push("");
  }
}
lines.push("## Contact");
lines.push("");
lines.push("- Email: support@meddyhealth.ai");
lines.push("- Phone: +1-516-925-3997");
lines.push("- Address: Meddy Health LLC, 515 W 38th Street, Apt 11J, New York, NY 10018");
lines.push("");

writeFileSync(OUT, lines.join("\n"), "utf8");
console.log(`Wrote ${OUT} (${pages.length} pages, ${faqs.reduce((n, f) => n + f.items.length, 0)} FAQs)`);
