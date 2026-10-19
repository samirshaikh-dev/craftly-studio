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
          "Claude-Search",
          // Perplexity AI
          "PerplexityBot",
          "Perplexity-Search",
          // DeepSeek
          "DeepSeekBot",
          // Mistral AI
          "MistralBot",
          // xAI & Grok
          "GrokBot",
          "xAI",
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
          "cohere-training-data-crawler",
          "CCBot",
          "YouBot",
          "Diffbot",
          "DuckDuckBot",
          "Timpibot",
          "KagiBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/.well-known/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
