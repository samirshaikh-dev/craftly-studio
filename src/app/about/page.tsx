import type { Metadata } from "next";
import Image from "next/image";
import FinalCta from "@/components/sections/FinalCta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { personSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildMetadata({
  title: "About Craftly Studio - Web Development Agency in Vapi, Gujarat",
  description:
    "Craftly Studio is a web development agency based in Vapi, Gujarat. We bring Silicon Valley-grade engineering to local businesses in Vapi, Daman, Silvassa & surrounding areas.",
  path: "/about",
  keywords: [
    "about Craftly Studio",
    "web development agency Vapi",
    "digital agency Gujarat",
    "website company Vapi",
    "Vapi web developers",
    "web design team Vapi",
    "founder Craftly Studio",
    "our story Craftly Studio",
    "who we are digital agency Vapi",
    "engineering-first web agency",
    "Silicon Valley engineering India",
    "boutique web agency Gujarat",
    "web development studio Vapi",
    "top rated digital agency south Gujarat",
    "trusted web developer Vapi",
    "experienced Next.js developer India",
    "why hire Craftly Studio",
    "Craftly Studio mission",
    "Craftly Studio values",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <section className="pt-48 pb-24 bg-bg-inverse text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-8 text-balance">
              Building the digital infrastructure for <span className="text-accent">tomorrow&apos;s</span> industry leaders.
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We are a team of engineers, designers, and strategists based in Vapi, Gujarat, dedicated to transforming how businesses operate and scale online across Vapi, Daman, Silvassa, and beyond.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-on-surface-variant mb-6 leading-relaxed">
                Craftly Studio started with a simple observation: most businesses in industrial hubs like Vapi, Daman, and Silvassa were being held back by outdated digital presence. Manufacturing companies, clinics, restaurants, and professional services in the Valsad district needed modern websites that actually generate business.
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                We set out to change that by bringing Silicon Valley-grade web engineering to local businesses in Gujarat. We don&apos;t just build websites; we build digital assets that generate leads, automate workflows, and drive revenue for businesses across Vapi, Daman, Silvassa, Dadra and Nagar Haveli, and surrounding regions.
              </p>
            </div>
            <div className="aspect-square bg-surface rounded-3xl overflow-hidden relative border border-outline">
              <Image
                src="/craftly-studio-digital-agency-vapi-gujarat.jpg"
                alt="The Craftly Studio team - digital agency based in Vapi, Gujarat"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-display text-4xl font-bold mb-12 text-center">Why Local Businesses Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-outline">
              <h3 className="font-display text-xl font-bold mb-4">Local Expertise</h3>
              <p className="text-on-surface-variant">Based in Vapi, we understand the unique challenges and opportunities of businesses in Gujarat&apos;s industrial corridor. From manufacturing companies to healthcare providers, we know your market.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-outline">
              <h3 className="font-display text-xl font-bold mb-4">Modern Technology</h3>
              <p className="text-on-surface-variant">We use React, Next.js, TypeScript, and AI-powered tools to build fast, scalable, SEO-friendly websites that outperform templates and WordPress sites.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-outline">
              <h3 className="font-display text-xl font-bold mb-4">Results-Driven</h3>
              <p className="text-on-surface-variant">Every project is measured by business outcomes: more leads, more customers, more revenue. We don&apos;t just build pretty websites — we build growth engines.</p>
            </div>
          </div>
        </div>
      </section>
      
      <FinalCta />
    </>
  );
}
