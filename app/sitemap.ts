import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

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
  "/patient-terms-of-service",
  "/notice-of-privacy-practices",
  "/telehealth-consent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
