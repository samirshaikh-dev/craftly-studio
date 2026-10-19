import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, type FaqItem } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { INDUSTRIES, SERVICES, SITE_URL, type IndustryData } from "@/lib/seo/constants";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return {};

  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
    keywords: industry.keywords,
  });
}

// ─── FAQ Data per Industry ───────────────────────────────────────────────────

const INDUSTRY_FAQS: Record<string, FaqItem[]> = {
  manufacturing: [
    {
      question: "Why do manufacturing companies in Vapi need a website?",
      answer:
        "Manufacturing companies in Vapi's industrial area need websites to showcase product catalogs to B2B buyers globally, generate qualified leads, establish credibility with international clients, and streamline procurement processes. A professional website positions your factory as a modern, trustworthy supplier.",
    },
    {
      question: "What features should a manufacturing company website have?",
      answer:
        "Essential features include detailed product catalogs with specifications, inquiry/quote request forms, company certifications display, factory tour galleries, export documentation, quality standards pages, and integration with existing ERP systems for inventory visibility.",
    },
    {
      question: "How much does a manufacturing website cost in Vapi?",
      answer:
        "Manufacturing websites in Vapi range from ₹30,000 for basic product showcase sites to ₹2,00,000+ for comprehensive B2B portals with ERP integration, multi-language support, and buyer dashboards.",
    },
    {
      question: "Can you build a B2B portal for our manufacturing business?",
      answer:
        "Yes, we specialize in B2B portals for manufacturers in Vapi's industrial area. Features include buyer dashboards, bulk ordering, custom pricing tiers, RFQ management, and integration with your existing systems.",
    },
    {
      question: "Do you have experience with industrial websites in Vapi?",
      answer:
        "Absolutely. Being based in Vapi — one of India's largest industrial hubs — we understand manufacturing businesses intimately. We've worked with chemical companies, pharmaceutical manufacturers, plastic processors, and engineering firms in GIDC and surrounding areas.",
    },
  ],
  "healthcare-clinics": [
    {
      question: "Why does my clinic need a website in Vapi?",
      answer:
        "Patients in Vapi increasingly search online for doctors and clinics. A professional website with online appointment booking, service descriptions, and patient testimonials builds trust and captures patients who would otherwise go to competitors listed on Google.",
    },
    {
      question: "Can you add online appointment booking to my clinic website?",
      answer:
        "Yes! We build custom appointment booking systems with calendar integration, SMS/WhatsApp reminders, doctor availability management, and patient management portals. Patients can book 24/7 without calling your clinic.",
    },
    {
      question: "How much does a clinic website cost?",
      answer:
        "Clinic websites in Vapi start from ₹20,000 for informational sites to ₹1,00,000+ for comprehensive platforms with appointment booking, patient portals, and telemedicine features.",
    },
    {
      question: "Will my clinic website appear in Google search for 'doctor near me'?",
      answer:
        "Yes! We optimize your clinic website for local SEO including 'doctor near me', 'clinic in Vapi', and specialty-specific searches. Combined with Google Business Profile optimization, your clinic will appear in local search results and Google Maps.",
    },
    {
      question: "Do you build websites for dental clinics and hospitals?",
      answer:
        "Yes, we serve all healthcare providers in Vapi — dental clinics, eye hospitals, multi-specialty hospitals, physiotherapy centers, diagnostic labs, and pharmacy chains. Each website is designed for your specific patient flow.",
    },
  ],
  "restaurants-cafes": [
    {
      question: "Why does my restaurant need a website in Vapi?",
      answer:
        "A restaurant website showcases your menu, enables online ordering, captures reservations, and builds your brand beyond food delivery apps. It reduces commission costs from Zomato/Swiggy and builds direct customer relationships.",
    },
    {
      question: "Can you build an online ordering system for my restaurant?",
      answer:
        "Yes! We build custom online ordering systems with menu management, order tracking, delivery zone setup, and integration with kitchen display systems. Accept orders directly without paying 25-30% commission to third-party apps.",
    },
    {
      question: "How much does a restaurant website cost in Vapi?",
      answer:
        "Restaurant websites start from ₹15,000 for menu showcase sites to ₹80,000+ for full online ordering platforms with payment integration, delivery management, and loyalty programs.",
    },
    {
      question: "Can the website show my menu with prices?",
      answer:
        "Absolutely. We build interactive digital menus with categories, food photos, prices, allergen information, and special offers. You can easily update prices and add new items through a simple admin panel.",
    },
    {
      question: "Will my restaurant appear on Google Maps?",
      answer:
        "Yes! We optimize your restaurant's Google Business Profile and website for local searches like 'restaurant near me in Vapi', 'best restaurant Vapi', and cuisine-specific searches. This drives foot traffic and online orders.",
    },
  ],
  "hotels-resorts": [
    {
      question: "Why do hotels near Daman need a direct booking website?",
      answer:
        "Hotels near Daman and Vapi pay 15-25% commission to OTAs like MakeMyTrip and Goibibo. A direct booking website lets you capture bookings commission-free, build guest relationships, and offer exclusive rates that incentivize direct reservations.",
    },
    {
      question: "Can you build a room booking engine for my hotel?",
      answer:
        "Yes! We develop custom booking engines with real-time availability, rate management, seasonal pricing, package deals, and integration with channel managers to sync inventory across all platforms.",
    },
    {
      question: "How much does a hotel website cost?",
      answer:
        "Hotel websites range from ₹40,000 for showcase sites to ₹2,00,000+ for full booking platforms with payment processing, channel manager integration, and guest portal features.",
    },
    {
      question: "Can you add virtual tours to my hotel website?",
      answer:
        "Yes, we integrate 360° virtual tours, high-quality photo galleries, video showcases, and interactive floor plans that let guests experience your property before booking — significantly increasing conversion rates.",
    },
    {
      question: "Will my hotel website rank for searches like 'hotels near Daman'?",
      answer:
        "We optimize your hotel website for searches like 'hotels near Daman', 'resorts in Silvassa', 'Vapi hotels', and similar queries. Combined with review management and local SEO, your property will capture organic bookings.",
    },
  ],
  "real-estate": [
    {
      question: "Why do real estate agents in Vapi need a website?",
      answer:
        "With Vapi's growing real estate market, a professional website with property listings, virtual tours, and lead capture helps agents stand out. It establishes credibility, showcases inventory 24/7, and generates qualified buyer leads without depending solely on property portals.",
    },
    {
      question: "Can you build a property listing website for my agency?",
      answer:
        "Yes! We build custom property listing platforms with advanced search filters, map integration, virtual tours, EMI calculators, comparison tools, and lead management systems tailored for Vapi's real estate market.",
    },
    {
      question: "How much does a real estate website cost?",
      answer:
        "Real estate websites start from ₹35,000 for basic listing sites to ₹1,50,000+ for comprehensive platforms with advanced search, map integration, CRM, and automated follow-ups.",
    },
    {
      question: "Can the website show properties on a map?",
      answer:
        "Absolutely. We integrate interactive maps showing property locations, nearby amenities (schools, hospitals, markets), connectivity, and neighborhood information — helping buyers make informed decisions.",
    },
    {
      question: "Do you build websites for builders and developers?",
      answer:
        "Yes, we create project microsites and corporate websites for builders in Vapi. Features include project galleries, floor plans, pricing tables, construction progress updates, and lead capture forms optimized for home buyer conversions.",
    },
  ],
  education: [
    {
      question: "Why does my school in Vapi need a professional website?",
      answer:
        "A professional school website attracts new admissions, communicates with parents, showcases achievements, and positions your institution as modern and progressive. Parents extensively research schools online before admission decisions.",
    },
    {
      question: "Can you build a student portal or LMS?",
      answer:
        "Yes! We develop Learning Management Systems (LMS) with course content delivery, assignment submission, online exams, grade tracking, attendance management, and parent communication tools.",
    },
    {
      question: "How much does a school website cost in Vapi?",
      answer:
        "School websites start from ₹25,000 for informational sites to ₹1,50,000+ for comprehensive platforms with student portals, fee payment integration, and LMS capabilities.",
    },
    {
      question: "Can parents pay fees online through the website?",
      answer:
        "Yes, we integrate secure payment gateways for online fee collection with receipt generation, payment reminders, fee structure display, and installment options — reducing administrative burden significantly.",
    },
    {
      question: "Do you build websites for coaching institutes?",
      answer:
        "Yes, we serve coaching institutes, tuition centers, and online learning platforms in Vapi. Features include course catalogs, online enrollment, demo class booking, student progress tracking, and result showcases.",
    },
  ],
  "ca-firms": [
    {
      question: "Why does a CA firm in Vapi need a website?",
      answer:
        "A professional website establishes credibility, showcases your services (ITR filing, GST, audit, company registration), captures client inquiries 24/7, and positions your firm as modern and accessible — crucial for attracting business clients in Vapi's industrial area.",
    },
    {
      question: "What features should a CA firm website have?",
      answer:
        "Essential features include service pages (tax, audit, compliance), client login portal for document sharing, EMI/tax calculators, blog for tax updates, appointment booking, and testimonials from existing clients.",
    },
    {
      question: "How much does a CA firm website cost?",
      answer:
        "CA firm websites start from ₹15,000 for basic service showcase sites to ₹75,000+ for comprehensive platforms with client portals, document management, and appointment scheduling.",
    },
    {
      question: "Can clients submit documents through the website?",
      answer:
        "Yes, we build secure client portals where clients can upload documents, download reports, track service progress, and communicate with your team — streamlining your workflow and improving client experience.",
    },
    {
      question: "Will the website help me get more clients?",
      answer:
        "Absolutely. With local SEO optimization for searches like 'CA firm Vapi', 'tax consultant Vapi', combined with Google Business Profile and content marketing, your website will attract qualified business clients from Vapi and surrounding areas.",
    },
  ],
  "interior-designers": [
    {
      question: "Why do interior designers in Vapi need a portfolio website?",
      answer:
        "Your portfolio is your best sales tool. A stunning website showcases completed projects, demonstrates your style and capability, and attracts high-value clients. It works 24/7 as your visual resume — far more effective than Instagram alone.",
    },
    {
      question: "What should an interior designer's website include?",
      answer:
        "Essential elements include a project gallery with before/after images, service descriptions (residential, commercial, turnkey), design process explanation, client testimonials, about page with qualifications, and inquiry forms.",
    },
    {
      question: "How much does a portfolio website cost?",
      answer:
        "Interior designer portfolio websites range from ₹20,000 for elegant single-page sites to ₹80,000+ for comprehensive portfolios with project filtering, 3D visualization integration, and client testimonial videos.",
    },
    {
      question: "Can you add before/after project comparisons?",
      answer:
        "Yes! We build interactive before/after sliders, project galleries with room-by-room breakdowns, 360° room views, and mood board showcases that help potential clients visualize your transformation capabilities.",
    },
    {
      question: "Will the website help me get clients in Vapi and Daman?",
      answer:
        "Yes, we optimize your portfolio website for searches like 'interior designer Vapi', 'home interior Daman', and similar queries. Combined with stunning visuals and local SEO, your website will attract clients from Vapi, Daman, Silvassa, and surrounding areas.",
    },
  ],
};

// ─── Industry Content Data ───────────────────────────────────────────────────

interface IndustryContent {
  intro: string;
  painPoints: string[];
  solutions: { title: string; description: string }[];
}

const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  manufacturing: {
    intro:
      "Vapi is home to one of India's largest industrial estates with 3,000+ manufacturing units across chemicals, pharmaceuticals, plastics, engineering, and textiles. Yet most manufacturers still rely on outdated websites or none at all. Craftly Studio builds modern, B2B-focused websites that help manufacturing companies in Vapi showcase products, generate international leads, and digitize operations.",
    painPoints: [
      "Outdated or no website, missing out on B2B buyer searches",
      "Inability to showcase full product catalogs to global buyers",
      "No lead capture or inquiry management system",
      "Competitors gaining visibility through better digital presence",
      "Manual processes for quotations and order tracking",
    ],
    solutions: [
      { title: "Product Catalog Websites", description: "Comprehensive digital catalogs with specifications, certifications, and inquiry forms for B2B buyers." },
      { title: "B2B Portals", description: "Buyer dashboards, bulk ordering, custom pricing, and RFQ management for your industrial clients." },
      { title: "ERP Integration", description: "Connect your website with Tally, SAP, or custom ERP for real-time inventory and order visibility." },
      { title: "Lead Generation", description: "SEO-optimized pages that rank for product-specific searches and capture qualified buyer inquiries." },
    ],
  },
  "healthcare-clinics": {
    intro:
      "Healthcare in Vapi is growing rapidly with new clinics, dental practices, and multi-specialty hospitals serving the industrial population. Patients increasingly research online before choosing a doctor. Craftly Studio builds trust-building medical websites with appointment booking that help clinics in Vapi attract and retain patients.",
    painPoints: [
      "Patients choosing competitors who appear in Google search",
      "No online appointment booking causing missed consultations",
      "Difficulty communicating services and specializations",
      "No patient review management or trust-building online",
      "Manual appointment and record management",
    ],
    solutions: [
      { title: "Appointment Booking", description: "Online scheduling with doctor availability, SMS reminders, and automated confirmations." },
      { title: "Patient Portals", description: "Secure access to reports, prescriptions, and medical history for patient convenience." },
      { title: "Service Pages", description: "Detailed service descriptions with doctor profiles that build trust and educate patients." },
      { title: "Local SEO", description: "Rank for 'doctor near me', 'clinic in Vapi', and specialty-specific searches on Google Maps." },
    ],
  },
  "restaurants-cafes": {
    intro:
      "Vapi's restaurant scene is booming with new cafes, fine-dining restaurants, and cloud kitchens. While food delivery apps take 25-30% commission, a direct-ordering website lets you own the customer relationship. Craftly Studio builds appetizing restaurant websites with online ordering that reduce dependency on aggregators.",
    painPoints: [
      "Paying 25-30% commission on every order to Zomato/Swiggy",
      "No direct customer relationship or repeat order incentives",
      "Outdated menu information across platforms",
      "No table reservation or event booking system",
      "Inability to run own promotions and loyalty programs",
    ],
    solutions: [
      { title: "Online Ordering", description: "Direct ordering system with payment processing, delivery zones, and kitchen integration." },
      { title: "Digital Menu", description: "Interactive, easily updatable menus with photos, prices, allergens, and daily specials." },
      { title: "Table Reservations", description: "Online booking with capacity management, special occasion handling, and confirmation." },
      { title: "Loyalty Programs", description: "Customer rewards, referral systems, and promotional campaigns to drive repeat business." },
    ],
  },
  "hotels-resorts": {
    intro:
      "Hotels and resorts near Vapi, Daman, and Silvassa attract tourists and business travelers year-round. While OTAs charge 15-25% commission per booking, a direct booking website lets you keep more revenue. Craftly Studio builds premium hospitality websites with booking engines for properties near Daman and Vapi.",
    painPoints: [
      "Losing 15-25% revenue per booking to OTAs",
      "No direct booking capability for walk-in guests",
      "Poor online presence compared to chain hotels",
      "No way to showcase property uniqueness and experiences",
      "Manual reservation management causing overbooking",
    ],
    solutions: [
      { title: "Booking Engine", description: "Real-time availability, instant confirmation, seasonal pricing, and package deals." },
      { title: "Virtual Tours", description: "360° room tours, photo galleries, and video showcases that drive booking decisions." },
      { title: "Revenue Management", description: "Dynamic pricing, channel manager integration, and occupancy analytics." },
      { title: "Guest Experience", description: "Pre-arrival portals, concierge services, and post-stay review collection." },
    ],
  },
  "real-estate": {
    intro:
      "Vapi's real estate market is growing with new residential projects, commercial developments, and industrial properties. Builders and agents need professional websites to showcase listings and capture buyer leads. Craftly Studio builds property platforms that convert property seekers into qualified leads.",
    painPoints: [
      "Depending solely on property portals for lead generation",
      "No way to showcase full project details and amenities",
      "Missing leads from website visitors who don't call",
      "No automated follow-up for interested buyers",
      "Difficulty showcasing multiple projects simultaneously",
    ],
    solutions: [
      { title: "Property Listings", description: "Advanced search with filters, map view, comparison tools, and detailed project pages." },
      { title: "Lead Management", description: "Automated capture, scoring, follow-ups, and CRM integration for your sales team." },
      { title: "Project Microsites", description: "Dedicated landing pages for each project with floor plans, pricing, and virtual tours." },
      { title: "EMI Calculator", description: "Interactive tools that help buyers understand affordability and drive form submissions." },
    ],
  },
  education: {
    intro:
      "Schools, colleges, and coaching institutes in Vapi compete for admissions every year. A professional website with student portals and online services positions your institution as modern and trustworthy. Craftly Studio builds educational platforms that attract admissions and streamline administration.",
    painPoints: [
      "Losing potential admissions to schools with better online presence",
      "Manual fee collection causing administrative overhead",
      "No online communication channel with parents",
      "Difficulty showcasing achievements, events, and infrastructure",
      "No learning management system for digital education",
    ],
    solutions: [
      { title: "Admission Portal", description: "Online application forms, document upload, fee payment, and admission tracking." },
      { title: "Student/Parent Portal", description: "Attendance, grades, homework, and communication in one secure platform." },
      { title: "LMS Integration", description: "Course content delivery, video classes, assignments, and online examinations." },
      { title: "Event Showcase", description: "Photo galleries, achievement displays, and news updates that build institutional pride." },
    ],
  },
  "ca-firms": {
    intro:
      "Chartered Accountant firms in Vapi serve thousands of businesses in the industrial area. A professional website with client portals establishes credibility and streamlines document exchange. Craftly Studio builds CA firm websites that attract new clients and improve service delivery.",
    painPoints: [
      "Relying only on referrals with no online lead generation",
      "Manual document collection via WhatsApp and email",
      "No way to showcase full service range to potential clients",
      "Difficulty managing client communications at scale",
      "Missing out on digital-savvy business clients",
    ],
    solutions: [
      { title: "Service Showcase", description: "Detailed pages for tax, audit, GST, company registration, and advisory services." },
      { title: "Client Portal", description: "Secure document upload, report delivery, and communication platform for clients." },
      { title: "Tax Calculators", description: "Interactive tools (income tax, GST) that attract organic traffic and demonstrate expertise." },
      { title: "Blog & Updates", description: "Tax deadline reminders, budget analysis, and compliance updates that build authority." },
    ],
  },
  "interior-designers": {
    intro:
      "Interior designers in Vapi, Daman, and Silvassa need stunning portfolio websites that showcase their creative work. While Instagram helps, a dedicated portfolio website establishes professionalism and allows detailed project storytelling. Craftly Studio builds visual-first portfolio websites that attract premium clients.",
    painPoints: [
      "Relying solely on Instagram with no professional web presence",
      "No way to tell complete project stories with details",
      "Difficulty showcasing different design styles and specialties",
      "Missing out on Google searches for 'interior designer Vapi'",
      "No professional inquiry management system",
    ],
    solutions: [
      { title: "Portfolio Gallery", description: "Stunning project showcases with room-by-room breakdowns, before/after sliders, and filtering." },
      { title: "Process Page", description: "Design process explanation that sets client expectations and builds confidence." },
      { title: "Inquiry System", description: "Project brief forms, budget range selection, and automated response for new leads." },
      { title: "Testimonials", description: "Client reviews with project photos that provide social proof and build trust." },
    ],
  },
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();

  const faqs = INDUSTRY_FAQS[slug] || [];
  const content = INDUSTRY_CONTENT[slug];
  const relatedServices = SERVICES.filter((s) =>
    industry.relatedServices.includes(s.slug)
  );

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${industry.name} Website Development`,
          description: industry.shortDescription,
          path: `/industries/${industry.slug}`,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Industries", url: `${SITE_URL}/industries` },
          { name: industry.name, url: `${SITE_URL}/industries/${industry.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="pt-48 pb-24 bg-bg-inverse text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <Breadcrumbs
            items={[
              { label: "Industries", href: "/industries" },
              { label: industry.name, href: `/industries/${industry.slug}` },
            ]}
          />
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              {industry.h1}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {industry.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-accent/20"
              >
                Get Free Consultation
              </Link>
              <Link
                href="/portfolio"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction & Pain Points */}
      {content && (
        <section className="py-24 bg-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  {industry.name} in Vapi Deserve Better Websites
                </h2>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  {content.intro}
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold mb-6">
                  Common Challenges We Solve
                </h3>
                <ul className="space-y-4">
                  {content.painPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-red-500 mt-0.5 text-sm">
                        close
                      </span>
                      <span className="text-on-surface-variant">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solutions Grid */}
      {content && (
        <section className="py-24 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              Our Solutions for {industry.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="p-8 bg-white rounded-2xl border border-outline hover:border-accent transition-colors"
                >
                  <h3 className="font-display text-xl font-bold mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-on-surface-variant">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="py-24 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-display text-3xl font-bold mb-8">
            Recommended Services for {industry.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="p-6 bg-surface border border-outline rounded-2xl hover:border-accent transition-colors group"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <FaqSection
          title={`${industry.name} Website FAQ`}
          subtitle={`Common questions about website development for ${industry.name.toLowerCase()} in Vapi`}
          faqs={faqs}
        />
      )}

      {/* CTA */}
      <section className="py-24 bg-bg-inverse text-white text-center">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your {industry.name} Business Online?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join other {industry.name.toLowerCase()} businesses in Vapi who trust Craftly Studio for their digital presence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent hover:bg-accent/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg shadow-accent/20"
          >
            Get Your Free Quote
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
