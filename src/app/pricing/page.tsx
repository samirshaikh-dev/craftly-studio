import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/sections/FinalCta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqSchema } from "@/lib/seo/schemas";
import { SITE_NAME, SITE_URL } from "@/lib/seo/constants";

export const metadata: Metadata = buildMetadata({
  title: "Website Development & Software Pricing in Vapi, Gujarat | Craftly Studio",
  description:
    "Transparent pricing for custom website development, e-commerce, and business software in Vapi, Gujarat. No hidden fees. Starting from ₹15,000.",
  path: "/pricing",
  keywords: [
    "website development cost Vapi",
    "web design price Vapi",
    "website development packages Gujarat",
    "custom software development cost Vapi GIDC",
    "ecommerce website cost Gujarat",
    "affordable website development Vapi",
    "how much does a website cost in Vapi",
    "web agency pricing Gujarat",
  ],
});

const PRICING_PLANS = [
  {
    name: "Foundational Presence",
    price: "₹15,000",
    period: "one-time",
    description: "Ideal for clinics, consultants, and local businesses establishing a professional web footprint.",
    delivery: "1 to 2 weeks",
    features: [
      "Custom Next.js & React engineering",
      "Mobile-first responsive design",
      "Sub-second load times & 90+ Lighthouse score",
      "Contact form with instant email alerts",
      "Local SEO & Google Maps optimization",
      "SSL Certificate & Vercel Edge hosting setup",
      "30 days post-launch technical support",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Growth & Corporate Hub",
    price: "₹45,000",
    period: "one-time",
    description: "Designed for Vapi GIDC manufacturing plants, corporate firms, and growing service brands.",
    delivery: "2 to 4 weeks",
    features: [
      "Full multi-page custom architecture",
      "Custom CMS for internal blog & content publishing",
      "Product catalog with technical spec PDF downloads",
      "Full JSON-LD structured schemas (LocalBusiness, Organization)",
      "Automated lead capture into Firestore database",
      "Speed optimization (LCP < 1.5s on mobile)",
      "Google Search Console & GA4 analytics tracking",
      "60 days dedicated maintenance & support",
    ],
    popular: true,
    cta: "Request Consultation",
  },
  {
    name: "E-Commerce & Custom App",
    price: "₹95,000+",
    period: "custom scope",
    description: "B2B wholesale portals, digital storefronts, internal CRMs, and factory ERP integrations.",
    delivery: "4 to 8 weeks",
    features: [
      "Bespoke full-stack web application",
      "Razorpay, Stripe & UPI payment integration",
      "Role-based access control (Admin, Staff, Customer)",
      "Automated WhatsApp & email transaction notifications",
      "Inventory management & quote generator pipelines",
      "Custom API routes & database architecture",
      "Priority SLA & quarterly performance reviews",
    ],
    popular: false,
    cta: "Discuss Custom Scope",
  },
];

const PRICING_FAQS = [
  {
    question: "How much does a website development project cost in Vapi, Gujarat?",
    answer:
      "At Craftly Studio, foundational business websites start at ₹15,000. Multi-page corporate and manufacturing platforms with CMS capabilities start at ₹45,000, while custom e-commerce and full-stack software portals range from ₹95,000 and above based on custom requirements.",
  },
  {
    question: "Why should we invest in a custom Next.js site rather than a ₹5,000 WordPress template?",
    answer:
      "Cheap template websites rely on dozens of unmaintained plugins that cause slow load times (5-8+ seconds), frequent malware vulnerabilities, and poor Google rankings. Craftly Studio hand-codes modern Next.js platforms that load in under 1.5 seconds, achieve 90+ Core Web Vitals, and generate measurable business leads.",
  },
  {
    question: "Are there any hidden recurring fees?",
    answer:
      "No. We maintain 100% transparent pricing. You own your code and domain. Ongoing hosting on Vercel is free for standard traffic, and optional maintenance plans are available only if you prefer our team to manage routine updates and backups.",
  },
  {
    question: "What are your payment milestones?",
    answer:
      "Projects typically follow a clear milestone structure: 40% upfront deposit upon contract signing, 40% upon design approval and staging deployment, and 20% upon final quality verification and production launch.",
  },
  {
    question: "Do you offer in-person discovery meetings in Vapi GIDC?",
    answer:
      "Yes. We regularly conduct in-person technical architecture sessions with business owners and management teams across Vapi GIDC, Daman, Silvassa, and Valsad.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(PRICING_FAQS)} />
      
      {/* Hero */}
      <section className="pt-48 pb-20 bg-bg-inverse text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <Breadcrumbs items={[{ label: "Pricing", href: "/pricing" }]} />
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent font-mono text-sm uppercase tracking-wider mb-4">
              Transparent Value-Based Pricing
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold mb-6 text-balance">
              Investment plans crafted for <span className="text-accent">tangible business ROI</span>.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              No generic templates, no hidden plugin subscriptions. Clean, high-performance web engineering built for South Gujarat businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col justify-between p-8 md:p-10 rounded-3xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-white border-accent shadow-2xl shadow-accent/10 ring-2 ring-accent/20"
                    : "bg-white/80 border-outline hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 py-1 px-4 rounded-full bg-accent text-white font-medium text-xs tracking-wider uppercase shadow-md">
                    Most Popular for GIDC & SMEs
                  </span>
                )}
                <div>
                  <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-on-surface-variant mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-display text-4xl md:text-5xl font-extrabold text-on-surface">
                      {plan.price}
                    </span>
                    <span className="text-sm text-on-surface-variant">/ {plan.period}</span>
                  </div>
                  <div className="text-xs font-medium text-emerald-600 bg-emerald-50 inline-block px-2.5 py-1 rounded-md mb-8">
                    Estimated delivery: {plan.delivery}
                  </div>

                  <ul className="space-y-3.5 mb-8 border-t border-outline/60 pt-6">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-on-surface">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`w-full text-center py-4 px-6 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20"
                      : "bg-surface hover:bg-gray-200 text-on-surface border border-outline"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions About Pricing
            </h2>
            <p className="text-lg text-on-surface-variant">
              Direct, transparent answers regarding investment, deliverables, and timelines.
            </p>
          </div>

          <div className="space-y-6">
            {PRICING_FAQS.map((faq) => (
              <div key={faq.question} className="p-6 md:p-8 rounded-2xl bg-surface border border-outline">
                <h3 className="font-display text-lg md:text-xl font-bold mb-3 text-on-surface">
                  {faq.question}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
