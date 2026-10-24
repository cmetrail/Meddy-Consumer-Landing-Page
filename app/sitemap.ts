import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Truthful per-route last-modified dates (sourced from git history of each
// page file). Update a route's date here whenever its content actually changes;
// never use `new Date()` (that lies by claiming every page changed on each build).
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-10-23",
};

const DEFAULT_LAST_MODIFIED = "2026-10-20";

const ROUTES = [
  "/",
  "/why-meddy",
  "/how-it-works",
  "/longevity",
  "/biomarkers",
  "/sleep",
  "/fitness",
  "/nutrition",
  "/weight-loss",
  "/medication",
  "/physician-care",
  "/pricing",
  "/wearables",
  "/what-we-test",
  "/247-care",
  "/book-consultation",
  "/personalized-health-plans",
  "/terms-of-use",
  "/privacy-policy",
  "/cookie-policy",
  "/patient-terms-of-service",
  "/notice-of-privacy-practices",
  "/telehealth-consent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: LAST_MODIFIED[route] ?? DEFAULT_LAST_MODIFIED,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
