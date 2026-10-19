import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: [
          // OpenAI & ChatGPT
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          // Anthropic Claude
          "ClaudeBot",
          "anthropic-ai",
          "Claude-Web",
          // Perplexity AI
          "PerplexityBot",
          // Google
          "Googlebot",
          "Google-Extended",
          // Apple
          "Applebot",
          "Applebot-Extended",
          // Microsoft / Bing
          "Bingbot",
          // Meta / Facebook
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "FacebookBot",
          // Amazon
          "Amazonbot",
          // ByteDance / TikTok
          "Bytespider",
          // Cohere & Other AI Crawlers
          "cohere-ai",
          "CCBot",
          "YouBot",
          "Diffbot",
          "DuckDuckBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
