import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, type FaqItem } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICES, INDUSTRIES, SITE_URL, type ServiceData } from "@/lib/seo/constants";

// ─── Static Params ───────────────────────────────────────────────────────────

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

// ─── FAQ Data per Service ────────────────────────────────────────────────────

const SERVICE_FAQS: Record<string, FaqItem[]> = {
  "website-development": [
    {
      question: "How much does website development cost in Vapi?",
      answer:
        "Website development costs in Vapi typically range from ₹15,000 for a basic business website to ₹2,00,000+ for complex custom websites. The cost depends on features, number of pages, design complexity, and integrations needed. Contact us for a free, detailed quote.",
    },
    {
      question: "How long does it take to build a website?",
      answer:
        "A standard business website takes 2-4 weeks from design to launch. More complex sites with custom features may take 4-8 weeks. We follow agile development to deliver quickly without compromising on quality.",
    },
    {
      question: "Do you use WordPress or custom development?",
      answer:
        "We specialize in custom website development using React and Next.js, which offers superior performance, security, and SEO compared to WordPress. Our sites load 3-5x faster and rank better on Google.",
    },
    {
      question: "Will my website be mobile-friendly?",
      answer:
        "Absolutely. Every website we build is mobile-first and fully responsive. With over 70% of web traffic coming from mobile devices in India, we ensure your site looks and works perfectly on all screen sizes.",
    },
    {
      question: "Do you provide website hosting?",
      answer:
        "Yes, we deploy websites on high-performance cloud infrastructure (Vercel/AWS) that ensures 99.9% uptime, fast loading speeds globally, and automatic SSL certificates for security.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes! We offer complete website redesign services. We'll analyze your current site, identify improvements, and rebuild it with modern technology for better performance, SEO, and user experience.",
    },
  ],
  "ecommerce-development": [
    {
      question: "How much does an e-commerce website cost in Vapi?",
      answer:
        "E-commerce website development in Vapi starts from ₹50,000 for basic online stores and can go up to ₹3,00,000+ for custom marketplaces with advanced features. Pricing depends on product catalog size, payment integrations, and custom features.",
    },
    {
      question: "Which payment gateways do you integrate?",
      answer:
        "We integrate all major Indian payment gateways including Razorpay, Paytm, PhonePe, Google Pay, UPI, and international options like Stripe. We ensure secure, PCI-compliant payment processing.",
    },
    {
      question: "Can you migrate my existing store to a custom platform?",
      answer:
        "Yes, we handle complete e-commerce migrations from Shopify, WooCommerce, or any platform. We transfer products, customers, and order history with zero downtime and improved performance.",
    },
    {
      question: "Do you provide inventory management features?",
      answer:
        "Yes, our e-commerce solutions include inventory tracking, stock alerts, multi-warehouse support, and automated restock notifications. We can also integrate with existing ERP systems.",
    },
    {
      question: "Will my online store rank on Google?",
      answer:
        "Every e-commerce site we build includes built-in SEO optimization: product schema markup, fast loading speeds, mobile-friendly design, optimized product descriptions, and local SEO for Vapi and Gujarat.",
    },
  ],
  "custom-web-applications": [
    {
      question: "What types of web applications do you build?",
      answer:
        "We build CRM systems, ERP solutions, inventory management, project management tools, customer portals, employee dashboards, booking systems, and any custom business software. Each application is tailored to your specific workflow.",
    },
    {
      question: "How much does a custom web application cost?",
      answer:
        "Custom web applications start from ₹1,00,000 for basic tools and can range to ₹10,00,000+ for enterprise-grade systems. We provide detailed project estimates after understanding your requirements.",
    },
    {
      question: "What technologies do you use for web applications?",
      answer:
        "We use React/Next.js for the frontend, Node.js for backend APIs, and Firebase/PostgreSQL for databases. This modern stack ensures scalability, security, and maintainability.",
    },
    {
      question: "Can you integrate with our existing systems?",
      answer:
        "Yes, we specialize in API integrations. We can connect your web application with existing ERP systems, accounting software, CRMs, payment gateways, and third-party services.",
    },
    {
      question: "Do you provide training for the web application?",
      answer:
        "Absolutely. We provide comprehensive training for your team, detailed documentation, and ongoing support to ensure everyone can use the application effectively.",
    },
  ],
  "seo-services": [
    {
      question: "How long does SEO take to show results?",
      answer:
        "SEO typically takes 3-6 months to show significant results. Local SEO for Vapi and surrounding areas often shows improvement within 1-3 months due to lower competition. We provide monthly reports tracking progress.",
    },
    {
      question: "Do you guarantee first page rankings?",
      answer:
        "While no ethical SEO provider can guarantee specific rankings, we have a strong track record of achieving top 3 positions for local keywords in Vapi, Daman, and Gujarat. We focus on strategies proven to deliver results.",
    },
    {
      question: "What does your SEO service include?",
      answer:
        "Our SEO services include technical SEO audits, on-page optimization, local SEO (Google Business Profile), content strategy, link building, site speed optimization, and monthly reporting with clear metrics.",
    },
    {
      question: "Do you offer SEO for Google and AI search engines?",
      answer:
        "Yes! We optimize for both traditional Google search and AI-powered engines like ChatGPT, Perplexity, and Google AI Overviews. This includes structured data, FAQ content, entity optimization, and authoritative content creation.",
    },
    {
      question: "What is Local SEO and why is it important for Vapi businesses?",
      answer:
        "Local SEO helps your business appear in 'near me' searches and Google Maps results for Vapi, Daman, Silvassa, and surrounding areas. It's crucial because 46% of Google searches have local intent, and most users choose businesses on the first page.",
    },
    {
      question: "Why choose a local SEO company in Vapi?",
      answer:
        "A local SEO company in Vapi understands the regional market, competition, and search behavior better than a distant agency. We know the industries that dominate GIDC Vapi — manufacturing, clinics, and local services — and optimize your business to rank above them in Google Maps and organic results for Vapi and surrounding areas.",
    },
  ],
  "ai-solutions": [
    {
      question: "What AI solutions do you offer for businesses?",
      answer:
        "We offer AI chatbots, automated content generation, intelligent workflow automation, predictive analytics, AI-powered customer support, and custom AI integrations. Each solution is designed to save time and reduce costs.",
    },
    {
      question: "How can AI help my business in Vapi?",
      answer:
        "AI can automate customer inquiries (24/7 chatbot), generate content, streamline data entry, predict inventory needs, personalize customer experiences, and reduce manual work by up to 70% — freeing your team for high-value tasks.",
    },
    {
      question: "Is AI integration expensive?",
      answer:
        "AI solutions start from ₹30,000 for basic chatbots to ₹2,00,000+ for comprehensive automation systems. The ROI is typically realized within 2-3 months through reduced labor costs and improved efficiency.",
    },
    {
      question: "Do you use ChatGPT or custom AI models?",
      answer:
        "We leverage both — OpenAI's GPT models for conversational AI and content generation, plus custom-trained models for industry-specific tasks. We choose the best approach based on your specific needs and budget.",
    },
    {
      question: "Can AI replace my customer service team?",
      answer:
        "AI augments rather than replaces your team. Chatbots handle 60-80% of routine inquiries automatically, while complex questions are routed to your human team. This dramatically reduces response time and workload.",
    },
  ],
  "business-automation": [
    {
      question: "What business processes can be automated?",
      answer:
        "We automate lead management, invoicing, appointment scheduling, email marketing, inventory alerts, report generation, data entry, customer follow-ups, and workflow approvals. Any repetitive task can likely be automated.",
    },
    {
      question: "How much does business automation cost?",
      answer:
        "Business automation solutions start from ₹50,000 for basic workflow automation to ₹3,00,000+ for comprehensive CRM systems with multiple integrations. We provide ROI projections showing cost savings.",
    },
    {
      question: "Can you build a custom CRM for my business?",
      answer:
        "Yes, we specialize in custom CRM development tailored to your industry. Whether you're a manufacturing company, clinic, or service business in Vapi, we build CRMs that match your exact workflow.",
    },
    {
      question: "How long does automation implementation take?",
      answer:
        "Basic automation setups take 2-4 weeks. Custom CRM development takes 6-12 weeks. We implement in phases so you start seeing benefits early while we continue adding features.",
    },
    {
      question: "Will automation work with my existing software?",
      answer:
        "Yes, we specialize in integrating with existing tools — Tally, WhatsApp Business, Google Workspace, email systems, and industry-specific software. We ensure seamless data flow between all your systems.",
    },
  ],
  "branding-ui-ux": [
    {
      question: "What's included in your branding services?",
      answer:
        "Our branding services include logo design, brand identity systems (colors, typography, patterns), brand guidelines, business card design, letterhead, social media templates, and brand strategy consulting.",
    },
    {
      question: "How much does branding cost in Vapi?",
      answer:
        "Branding packages start from ₹25,000 for logo and basic identity to ₹1,50,000+ for comprehensive brand strategy and design systems. UI/UX design for websites and apps starts from ₹40,000.",
    },
    {
      question: "What is UI/UX design and why does it matter?",
      answer:
        "UI (User Interface) is how your website looks; UX (User Experience) is how it feels and works. Good UI/UX increases conversions by 200-400%, reduces bounce rates, and builds trust with visitors — directly impacting revenue.",
    },
    {
      question: "Do you conduct user research?",
      answer:
        "Yes, our UX process includes competitor analysis, user persona development, user journey mapping, and usability testing. We design based on data and real user behavior, not just aesthetics.",
    },
    {
      question: "Can you redesign my existing brand?",
      answer:
        "Absolutely. We offer brand refresh and complete rebranding services. We'll analyze your current brand, market position, and competition to create a modern identity that resonates with your target audience.",
    },
    {
      question: "What makes Craftly the best branding company in Vapi?",
      answer:
        "We're a full-service branding company in Vapi that combines strategy with design. Instead of just delivering a logo, we build a complete brand system — strategy, identity, guidelines, and UI/UX — so your business looks consistent and trustworthy across every touchpoint. That end-to-end approach is why Vapi businesses rate our branding services among the best.",
    },
  ],
  "landing-pages-portfolio": [
    {
      question: "How much does a landing page cost?",
      answer:
        "Landing pages start from ₹10,000 for a single conversion-focused page to ₹50,000+ for multi-section pages with animations, forms, and A/B testing. Portfolio websites range from ₹20,000 to ₹80,000.",
    },
    {
      question: "What makes a high-converting landing page?",
      answer:
        "High-converting landing pages have a clear value proposition, compelling headlines, social proof, minimal distractions, strong CTAs, fast load time, and mobile optimization. We design every element to maximize conversions.",
    },
    {
      question: "Do you build portfolio websites for freelancers?",
      answer:
        "Yes! We build stunning portfolio websites for interior designers, architects, photographers, artists, consultants, and professionals in Vapi who want to showcase their work and attract clients.",
    },
    {
      question: "How fast will my landing page load?",
      answer:
        "Our landing pages achieve sub-2-second load times with perfect Lighthouse scores. We use Next.js static generation, optimized images, and edge deployment for the fastest possible user experience.",
    },
    {
      question: "Can you help with ad campaign landing pages?",
      answer:
        "Yes, we create dedicated landing pages optimized for Google Ads, Facebook Ads, and Instagram campaigns. Each page is designed to match ad messaging and maximize conversion rates for your specific audience.",
    },
  ],
  "software-development": [
    {
      question: "What does a software company in Vapi do?",
      answer:
        "A software company in Vapi designs and builds custom business software — CRMs, ERPs, management systems, client portals, and internal tools. At Craftly Studio we tailor every system to your exact workflows rather than forcing you into off-the-shelf software that doesn't fit.",
    },
    {
      question: "How much does custom software development cost in Vapi?",
      answer:
        "Custom software development in Vapi starts from ₹1,00,000 for basic business tools and ranges to ₹10,00,000+ for enterprise-grade systems. The cost depends on features, integrations, and complexity. Contact us for a free, detailed estimate.",
    },
    {
      question: "Why choose a local software company instead of a big vendor?",
      answer:
        "A local software company like Craftly Studio gives you direct access to the developers, faster turnaround, on-site support, and solutions priced for Indian businesses. Big vendors add overhead and disconnect you from the people actually building your software.",
    },
    {
      question: "Which technologies do you use for software development?",
      answer:
        "We build with React and Next.js for the frontend, Node.js for backend APIs, and Firebase or PostgreSQL for databases. This modern stack delivers fast, secure, and scalable software that's easy to maintain and extend.",
    },
    {
      question: "Can you integrate custom software with our existing tools?",
      answer:
        "Yes. We integrate with Tally, WhatsApp Business, Google Workspace, ERP systems, payment gateways, and third-party APIs so your new software works seamlessly with the tools your team already uses.",
    },
  ],
};

// ─── Service Content Data ────────────────────────────────────────────────────

interface ServiceContent {
  intro: string;
  features: { title: string; description: string }[];
  benefits: string[];
}

const SERVICE_CONTENT: Record<string, ServiceContent> = {
  "website-development": {
    intro:
      "Looking for professional website development in Vapi, Gujarat? Craftly Studio builds high-performance, SEO-optimized websites using modern technologies like React and Next.js. Whether you're a manufacturing company, clinic, restaurant, or professional service provider, we create custom websites that generate leads and grow your business.",
    features: [
      { title: "Custom Design", description: "Unique, brand-aligned designs that stand out from template websites. No cookie-cutter solutions." },
      { title: "Mobile-First", description: "Responsive websites that work flawlessly on all devices — phones, tablets, and desktops." },
      { title: "SEO-Optimized", description: "Built-in technical SEO ensuring your business ranks high on Google for local searches in Vapi." },
      { title: "Fast Performance", description: "Sub-2-second load times using Next.js and modern optimization techniques." },
      { title: "Secure & Scalable", description: "Enterprise-grade security with SSL, HTTPS, and architecture that grows with your business." },
      { title: "Analytics Integration", description: "Google Analytics, Search Console, and conversion tracking to measure your ROI." },
    ],
    benefits: [
      "Custom-built websites that reflect your brand identity",
      "3-5x faster than WordPress or template websites",
      "Optimized for local SEO in Vapi, Daman, and Gujarat",
      "Mobile-first design for India's mobile-heavy market",
      "Ongoing support and maintenance included",
    ],
  },
  "ecommerce-development": {
    intro:
      "Launch your online store with Craftly Studio's e-commerce development services in Vapi, Gujarat. We build secure, scalable online stores with Indian payment gateways, inventory management, and mobile-optimized shopping experiences that convert visitors into customers.",
    features: [
      { title: "Payment Integration", description: "Razorpay, Paytm, UPI, Google Pay, and credit card processing with secure checkout." },
      { title: "Inventory Management", description: "Real-time stock tracking, multi-warehouse support, and automated restock alerts." },
      { title: "Product Catalog", description: "Beautiful product pages with zoom, variants, reviews, and comparison features." },
      { title: "Order Management", description: "Complete order lifecycle from placement to delivery with customer notifications." },
      { title: "Analytics Dashboard", description: "Sales reports, customer insights, and revenue tracking in real-time." },
      { title: "Shipping Integration", description: "Shiprocket, Delhivery, and other logistics partner integrations for seamless delivery." },
    ],
    benefits: [
      "Sell products 24/7 to customers across India",
      "Secure payment processing with all Indian gateways",
      "Mobile-optimized for India's smartphone shoppers",
      "SEO-optimized product pages for organic traffic",
      "Scalable architecture for growing product catalogs",
    ],
  },
  "custom-web-applications": {
    intro:
      "Craftly Studio develops custom web applications for businesses in Vapi, Gujarat. From CRM systems and business portals to inventory management and workflow tools — we build scalable, secure software tailored to your exact business processes.",
    features: [
      { title: "CRM Systems", description: "Custom customer relationship management with lead tracking, pipeline management, and automation." },
      { title: "Business Portals", description: "Client portals, vendor portals, and employee dashboards with role-based access." },
      { title: "Workflow Automation", description: "Automated approval flows, task assignment, and process management tools." },
      { title: "Data Dashboards", description: "Real-time analytics, reporting, and visualization of your business metrics." },
      { title: "API Integration", description: "Connect with Tally, WhatsApp, email, and any third-party service via APIs." },
      { title: "Cloud Deployment", description: "Scalable cloud infrastructure with 99.9% uptime and global accessibility." },
    ],
    benefits: [
      "Software built exactly for your business workflow",
      "Eliminate manual processes and reduce errors",
      "Secure, role-based access for your team",
      "Integrate with existing tools and software",
      "Scale as your business grows",
    ],
  },
  "seo-services": {
    intro:
      "Dominate local search results with Craftly Studio's SEO services in Vapi, Gujarat. As the SEO company in Vapi that businesses trust, we help you rank #1 on Google for high-intent local searches, drive organic traffic, and convert visitors into customers through technical SEO, content optimization, and local SEO strategies.",
    features: [
      { title: "Technical SEO", description: "Site speed, core web vitals, schema markup, crawlability, and indexation optimization." },
      { title: "Local SEO", description: "Google Business Profile, local citations, map pack optimization for Vapi and surrounding areas." },
      { title: "On-Page SEO", description: "Keyword research, meta optimization, content structure, and internal linking strategy." },
      { title: "Content Strategy", description: "Blog planning, FAQ optimization, and content creation for AI search visibility." },
      { title: "Link Building", description: "Quality backlink acquisition through outreach, local directories, and industry partnerships." },
      { title: "Monthly Reporting", description: "Transparent ranking reports, traffic analytics, and ROI tracking every month." },
    ],
    benefits: [
      "Rank in top 3 for local Vapi searches",
      "Appear in Google Maps and AI search results",
      "Drive qualified organic traffic 24/7",
      "Outrank competitors in your industry",
      "Measurable ROI with monthly reports",
    ],
  },
  "ai-solutions": {
    intro:
      "Transform your business operations with AI solutions from Craftly Studio in Vapi, Gujarat. We implement intelligent chatbots, automated workflows, and AI-powered tools that reduce manual work by up to 70% while improving customer experience and business efficiency.",
    features: [
      { title: "AI Chatbots", description: "24/7 customer support bots that handle inquiries, bookings, and FAQs automatically." },
      { title: "Content Automation", description: "AI-powered content generation for product descriptions, social media, and marketing." },
      { title: "Workflow AI", description: "Intelligent automation for data entry, document processing, and decision support." },
      { title: "Predictive Analytics", description: "AI models for demand forecasting, customer behavior, and business insights." },
      { title: "Voice Assistants", description: "Voice-enabled interfaces for hands-free operations in factories and businesses." },
      { title: "Custom AI Models", description: "Industry-specific AI trained on your data for specialized tasks and predictions." },
    ],
    benefits: [
      "Reduce customer response time to under 30 seconds",
      "Automate 60-80% of routine inquiries",
      "Save 20+ hours per week on repetitive tasks",
      "Make data-driven decisions with AI insights",
      "Available 24/7 without additional staff costs",
    ],
  },
  "business-automation": {
    intro:
      "Streamline your business operations with custom automation solutions from Craftly Studio in Vapi, Gujarat. We build CRM systems, workflow automation tools, and process digitization solutions that eliminate manual work and boost productivity for manufacturing, healthcare, and service businesses.",
    features: [
      { title: "Custom CRM", description: "Lead management, customer tracking, sales pipeline, and relationship management tailored to your business." },
      { title: "Invoice Automation", description: "Automated invoicing, payment reminders, GST calculation, and financial reporting." },
      { title: "Appointment Scheduling", description: "Online booking systems with calendar sync, reminders, and capacity management." },
      { title: "Email Automation", description: "Drip campaigns, follow-up sequences, and transactional emails on autopilot." },
      { title: "Document Management", description: "Digital document storage, e-signatures, and automated filing systems." },
      { title: "Reporting Dashboards", description: "Auto-generated business reports and KPI dashboards updated in real-time." },
    ],
    benefits: [
      "Eliminate data entry and manual paperwork",
      "Never miss a follow-up or appointment",
      "Real-time visibility into business performance",
      "Integrate all your tools into one system",
      "Scale operations without hiring more staff",
    ],
  },
  "branding-ui-ux": {
    intro:
      "Build a powerful brand identity with Craftly Studio's branding services in Vapi, Gujarat. As a branding company in Vapi, we create memorable logos, cohesive brand systems, and intuitive user interfaces that build trust, attract customers, and convert visitors into loyal clients. Whether you need a new brand or a refresh, we deliver some of the best branding services in Vapi.",
    features: [
      { title: "Logo Design", description: "Professional, memorable logos that represent your business values and industry." },
      { title: "Brand Identity", description: "Complete visual systems including colors, typography, patterns, and usage guidelines." },
      { title: "UI Design", description: "Beautiful, modern interface designs that align with your brand and delight users." },
      { title: "UX Research", description: "User persona development, journey mapping, and usability testing for optimal experiences." },
      { title: "Design Systems", description: "Scalable component libraries ensuring consistency across all touchpoints." },
      { title: "Print & Digital", description: "Business cards, letterheads, social media templates, and marketing collateral." },
    ],
    benefits: [
      "Stand out from competitors with unique branding",
      "Build instant trust and professionalism",
      "Increase conversions by 200-400% with good UX",
      "Consistent brand experience across all channels",
      "Attract your ideal customers with targeted design",
    ],
  },
  "landing-pages-portfolio": {
    intro:
      "Get high-converting landing pages and stunning portfolio websites from Craftly Studio in Vapi, Gujarat. Perfect for interior designers, freelancers, agencies, and businesses running ad campaigns. We design pages that capture attention and convert visitors into leads.",
    features: [
      { title: "Conversion-Focused", description: "Every element designed to maximize form fills, calls, and sign-ups." },
      { title: "A/B Testing Ready", description: "Built with variant testing capability to continuously improve conversion rates." },
      { title: "Portfolio Galleries", description: "Beautiful project showcases with filtering, lightbox, and before/after comparisons." },
      { title: "Lead Capture", description: "Optimized forms, chatbots, and call-to-action elements for maximum lead generation." },
      { title: "Speed Optimized", description: "Sub-1.5-second loads for better ad quality scores and user experience." },
      { title: "Ad Integration", description: "Pixel tracking, UTM support, and conversion tracking for Google & Meta ads." },
    ],
    benefits: [
      "Landing pages that convert at 5-15% (vs 2% average)",
      "Perfect for Google Ads and social media campaigns",
      "Showcase your work with stunning portfolios",
      "Fast loading for better ad quality scores",
      "Mobile-optimized for India's smartphone users",
    ],
  },
  "software-development": {
    intro:
      "Looking for a software company in Vapi? Craftly Studio is a custom software development company near you, building CRMs, ERPs, management systems, and business applications for companies across Vapi GIDC and Gujarat. We design, build, and support software tailored to your exact processes — so your business can automate operations, cut manual work, and scale without limits.",
    features: [
      { title: "Custom CRM", description: "Sales pipelines, lead tracking, and customer relationship management built around your workflow." },
      { title: "ERP Systems", description: "Manufacturing and business ERP with production, inventory, purchase, and finance modules." },
      { title: "Business Portals", description: "Client, vendor, and employee portals with role-based access and self-service features." },
      { title: "Web Applications", description: "Scalable React and Next.js applications that run fast on every device." },
      { title: "API Integration", description: "Connect with Tally, WhatsApp, payment gateways, and any third-party service." },
      { title: "Cloud & Security", description: "Enterprise-grade hosting with 99.9% uptime, backups, and access control." },
    ],
    benefits: [
      "Software built for your exact business processes",
      "One software company that also handles your website",
      "Save hours of manual data entry every week",
      "Real-time visibility into business performance",
      "Ongoing support, training, and maintenance included",
    ],
  },
};

// ─── Related Industries ──────────────────────────────────────────────────────

function getRelatedIndustries(serviceSlug: string) {
  return INDUSTRIES.filter((industry) =>
    industry.relatedServices.includes(serviceSlug)
  ).slice(0, 4);
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const faqs = SERVICE_FAQS[slug] || [];
  const content = SERVICE_CONTENT[slug];
  const relatedIndustries = getRelatedIndustries(slug);
  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.shortDescription,
          slug: service.slug,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
          { name: service.name, url: `${SITE_URL}/services/${service.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="pt-48 pb-24 bg-bg-inverse text-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.name, href: `/services/${service.slug}` },
            ]}
          />
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              {service.h1}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-accent/20"
              >
                Get Free Quote
              </Link>
              <Link
                href="/portfolio"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction & AEO Direct Answer Summary */}
      {content && (
        <section className="py-24 bg-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  {service.name} for Businesses in Vapi & Gujarat
                </h2>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  {content.intro}
                </p>
              </div>

              {/* AEO / GEO Direct Answer Callout */}
              <div className="lg:col-span-5 p-6 md:p-8 bg-surface rounded-3xl border border-outline shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-accent font-semibold text-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  Quick Direct Answer
                </div>
                <h3 className="font-display text-xl font-bold mb-4 text-on-surface">
                  {service.name} at a Glance
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-on-surface-variant font-medium">Primary Focus & Regions</dt>
                    <dd className="text-on-surface font-semibold">Vapi, Daman, Silvassa, Valsad, Surat & South Gujarat</dd>
                  </div>
                  <div>
                    <dt className="text-on-surface-variant font-medium">Typical Turnaround</dt>
                    <dd className="text-on-surface font-semibold">2–4 Weeks (Agile Sprint Delivery)</dd>
                  </div>
                  <div>
                    <dt className="text-on-surface-variant font-medium">Core Architecture</dt>
                    <dd className="text-on-surface font-semibold">Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS</dd>
                  </div>
                  <div>
                    <dt className="text-on-surface-variant font-medium">Standard Inclusions</dt>
                    <dd className="text-on-surface font-semibold">Mobile-First, 90+ Lighthouse Score, Local & FAQ JSON-LD Schema</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {content && (
        <section className="py-24 bg-surface">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              What&apos;s Included
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-8 bg-white rounded-2xl border border-outline hover:border-accent transition-colors"
                >
                  <h3 className="font-display text-xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-on-surface-variant">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {content && (
        <section className="py-24 bg-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
                  Why Choose Craftly Studio for {service.name}?
                </h2>
                <ul className="space-y-4">
                  {content.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-accent mt-0.5">
                        check_circle
                      </span>
                      <span className="text-lg text-on-surface-variant">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-square bg-surface rounded-3xl border border-outline flex items-center justify-center text-gray-400">
                Service Illustration
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Industries */}
      {relatedIndustries.length > 0 && (
        <section className="py-24 bg-bg-inverse text-white">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
              Industries We Serve
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.id}
                  href={`/industries/${industry.slug}`}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-accent transition-colors group"
                >
                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {industry.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FaqSection
          title={`${service.name} FAQ`}
          subtitle={`Common questions about ${service.name.toLowerCase()} in Vapi, Gujarat`}
          faqs={faqs}
        />
      )}

      {/* Related Services */}
      <section className="py-24 bg-white">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-display text-3xl font-bold mb-8">
            Other Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="p-6 bg-surface border border-outline rounded-2xl hover:border-accent transition-colors group"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {s.name}
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {s.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
