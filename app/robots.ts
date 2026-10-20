import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "cohere-ai",
  "Bytespider",
  "CCBot",
  "Amazonbot",
  "YouBot",
  "meta-externalagent",
  "facebookexternalhit",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
