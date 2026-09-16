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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-8">
              Let&apos;s build something <span className="text-accent">great</span>.
            </h1>
            <p className="text-xl text-on-surface-variant mb-12">
              Whether you need a complete digital transformation or targeted SEO improvements, we&apos;re here to help you dominate your market.
            </p>
            
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Email Us</h4>
                        <a href={`mailto:${BUSINESS_INFO.email}`} className="text-on-surface-variant hover:text-accent transition-colors">{BUSINESS_INFO.email}</a>
                    </div>
                </div>
                {BUSINESS_INFO.phone ? (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <span className="material-symbols-outlined">phone</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`} className="text-on-surface-variant hover:text-accent transition-colors">{BUSINESS_INFO.phone}</a>
                    </div>
                  </div>
                ) : null}
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                        <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Visit Us</h4>
                        <p className="text-on-surface-variant">Vapi, Gujarat, India</p>
                    </div>
                </div>
            </div>
          </div>
          
          <div className="bg-surface p-10 rounded-3xl border border-outline shadow-xl">
            <h3 className="font-display text-2xl font-bold mb-6">Send us a message</h3>
            <ContactForm />
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
