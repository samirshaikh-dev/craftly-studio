import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { BUSINESS_INFO } from "@/lib/seo/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contact Craftly Studio | Web Development Agency Vapi, Gujarat",
  description:
    "Contact Craftly Studio for website development, SEO & digital solutions in Vapi, Gujarat. Get a free quote for your business website.",
  path: "/contact",
  keywords: [
    "contact web developer Vapi",
    "hire website developer Gujarat",
    "web development quote Vapi",
    "Craftly Studio contact",
    "website company Vapi phone",
    "get in touch Craftly Studio",
    "free website consultation Vapi",
    "request website quote Gujarat",
    "discuss project web agency Vapi",
    "talk to web designer Vapi",
    "website developer email Vapi",
    "digital agency Vapi contact number",
    "schedule meeting web developer",
    "start a project Craftly Studio",
    "Vapi web developer whatsapp",
    "work with Craftly Studio",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <section className="pt-48 pb-24 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* ── Left column ── */}
            <div>
              {/* Live response badge */}
              <div className="inline-flex items-center gap-2 bg-accent/5 border border-accent/20 text-accent text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Typically replies within 24 hours
              </div>

              <h1 className="font-display text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Let&apos;s build something <span className="text-accent">great</span>.
              </h1>
              <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                Whether you need a complete digital transformation or targeted SEO improvements, we&apos;re here to help you dominate your market.
              </p>

              {/* Trust stats */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  { label: "Projects delivered", value: "50+" },
                  { label: "Happy clients", value: "40+" },
                  { label: "Avg. response time", value: "< 24h" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col bg-surface border border-outline rounded-2xl px-5 py-3 min-w-[100px]"
                  >
                    <span className="font-display text-2xl font-extrabold text-accent">{value}</span>
                    <span className="text-xs text-on-surface-variant mt-0.5">{label}</span>
                  </div>
                ))}
              </div>

              {/* Contact info cards */}
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-0.5">
                      Email Us
                    </p>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-on-surface font-semibold hover:text-accent transition-colors text-sm"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                {BUSINESS_INFO.phone ? (
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">phone</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-0.5">
                        Call Us
                      </p>
                      <a
                        href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`}
                        className="text-on-surface font-semibold hover:text-accent transition-colors text-sm"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-0.5">
                      Based In
                    </p>
                    <p className="text-on-surface font-semibold text-sm">Vapi, Gujarat, India</p>
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <p className="mt-8 text-xs text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Your information is private and never shared with third parties.
              </p>
            </div>

            {/* ── Right column: Form card ── */}
            <div className="bg-surface border border-outline rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-white border-b border-outline px-8 py-6">
                <h2 className="font-display text-xl font-bold text-on-surface">Start your project</h2>
                <p className="text-on-surface-variant text-sm mt-1">
                  Fill in the details below — takes under 2 minutes.
                </p>
              </div>
              <div className="px-8 py-7">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
