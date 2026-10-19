import { BLOG_POSTS } from "@/lib/blog/posts";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/seo/constants";

export async function GET(): Promise<Response> {
  const feedItems = BLOG_POSTS.map((post) => {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = new Date(post.datePublished).toUTCString();

    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
      <author><![CDATA[${post.author}]]></author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}</link>
    <description>${SITE_TAGLINE} — Web Development, Local SEO, and AI Automation in Vapi, Gujarat.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`.trim();

  return new Response(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
