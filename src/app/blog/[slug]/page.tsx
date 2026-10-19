import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_URL } from "@/lib/seo/constants";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog/posts";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
        })}
      />
      {post.faqs.length > 0 && <JsonLd data={faqSchema(post.faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ])}
      />

      {/* Article Header */}
      <section className="pt-48 pb-16 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-accent uppercase tracking-widest mb-6">
              <Link
                href={`/services/${post.serviceSlug}`}
                className="px-3 py-1 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
              >
                {post.category}
              </Link>
              <span className="text-on-surface-variant">
                {new Date(post.datePublished).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-on-surface-variant">•</span>
              <span className="text-on-surface-variant">{post.readTime} min read</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-balance">
              {post.title}
            </h1>
            <p className="text-xl text-on-surface-variant leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-outline text-sm text-on-surface-variant"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-0">
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="bg-surface border border-outline rounded-2xl p-6 md:p-8 mb-12">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold text-accent uppercase tracking-widest">
                <span className="material-symbols-outlined text-base">bolt</span>
                <span>Key Takeaways &amp; Summary</span>
              </div>
              <ul className="space-y-3">
                {post.takeaways.map((point, tIndex) => (
                  <li key={tIndex} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent text-lg mt-0.5 shrink-0">
                      check_circle
                    </span>
                    <span className="text-base md:text-lg text-on-surface font-medium leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {post.content.map((block, index) => (
            <div key={`${block.heading}-${index}`} className="mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-5">
                {block.heading}
              </h2>
              {block.paragraphs?.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-lg text-on-surface-variant leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
              {block.list && (
                <ul className="space-y-3 mt-2">
                  {block.list.map((item, liIndex) => (
                    <li key={liIndex} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-accent mt-1">
                        check_circle
                      </span>
                      <span className="text-lg text-on-surface-variant leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Service CTA */}
          <div className="bg-surface border border-outline rounded-2xl p-8 md:p-10 text-center mb-12">
            <h3 className="font-display text-2xl font-bold mb-3">
              Need {post.category.toLowerCase()} in Vapi?
            </h3>
            <p className="text-on-surface-variant mb-6 max-w-xl mx-auto">
              Craftly Studio is the web development, branding and digital agency
              in Vapi that builds websites and systems designed to bring you leads.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/services/${post.serviceSlug}`}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-bold transition-all"
              >
                View {post.category}
              </Link>
              <Link
                href="/contact"
                className="bg-white border border-outline hover:border-accent px-8 py-3 rounded-full font-bold transition-all"
              >
                Get Free Quote
              </Link>
            </div>
          </div>

          {/* About the author / publisher */}
          <div className="flex items-center gap-4 border-t border-outline pt-8">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-display font-extrabold">
              C
            </div>
            <div>
              <p className="font-bold">{post.author}</p>
              <p className="text-sm text-on-surface-variant">
                Digital experiences crafted for business — websites, branding,
                SEO and software in Vapi, Gujarat.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ */}
      {post.faqs.length > 0 && (
        <FaqSection
          title="Frequently Asked Questions"
          subtitle={`Common questions about ${post.category.toLowerCase()} in Vapi, Gujarat`}
          faqs={post.faqs}
        />
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col bg-white border border-outline rounded-2xl p-6 hover:border-accent transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-xs font-bold text-accent uppercase tracking-widest mb-3">
                    <span>{related.category}</span>
                    <span className="text-on-surface-variant">•</span>
                    <span className="text-on-surface-variant">{related.readTime} min read</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {related.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-4 flex-1">
                    {related.excerpt}
                  </p>
                  <span className="text-sm font-bold flex items-center gap-2 group-hover:text-accent">
                    Read Article
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
