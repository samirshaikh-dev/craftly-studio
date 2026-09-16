import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title:
    "Terms & Policies — Craftly Studio | Web Development Agency Vapi, Gujarat",
  description:
    "Read the Terms of Service, Privacy Policy, Cookie Policy, Refund Policy, Payment Terms, and Intellectual Property rights for Craftly Studio — a web development and digital solutions agency in Vapi, Gujarat, India.",
  path: "/terms",
  noIndex: false,
  keywords: [
    "Craftly Studio terms of service",
    "Craftly Studio privacy policy",
    "web development agency Vapi terms",
    "digital agency Gujarat terms and conditions",
    "website development company Vapi policy",
    "Craftly Studio refund policy",
    "Craftly Studio payment terms",
    "web design company Vapi Gujarat terms",
  ],
});

const lastUpdated = "July 15, 2025";

export default function TermsPage() {
  return (
    <div className="pt-48 pb-24 max-w-4xl mx-auto px-6">
      <Breadcrumbs
        items={[{ label: "Terms & Policies", href: "/terms" }]}
      />

      {/* H1 + Intro */}
      <h1 className="font-display text-4xl font-bold mb-4">
        Terms &amp; Policies
      </h1>
      <p className="text-on-surface-variant mb-4">
        Last updated: {lastUpdated}
      </p>
      <p className="text-on-surface-variant leading-relaxed mb-10">
        Welcome to Craftly Studio. These Terms &amp; Policies govern your use of
        our website at{" "}
        <strong>craftly-studio.vercel.app</strong> and all digital services
        provided by Craftly Studio, a web development and digital solutions
        agency based in{" "}
        <strong>Vapi, Gujarat, India</strong>. By accessing our website,
        submitting an inquiry, or engaging our services for{" "}
        <Link href="/services" className="text-accent hover:underline">
          website development
        </Link>
        ,{" "}
        <Link
          href="/services/ecommerce-development"
          className="text-accent hover:underline"
        >
          e-commerce solutions
        </Link>
        ,{" "}
        <Link
          href="/services/seo-services"
          className="text-accent hover:underline"
        >
          SEO services
        </Link>
        ,{" "}
        <Link
          href="/services/ai-solutions"
          className="text-accent hover:underline"
        >
          AI-powered solutions
        </Link>
        ,{" "}
        <Link
          href="/services/business-automation"
          className="text-accent hover:underline"
        >
          business automation
        </Link>
        , or{" "}
        <Link
          href="/services/branding-ui-ux"
          className="text-accent hover:underline"
        >
          branding &amp; UI/UX design
        </Link>
        , you agree to be bound by the terms outlined below.
      </p>

      {/* Table of Contents */}
      <nav className="bg-surface p-6 rounded-2xl border border-outline mb-12">
        <h2 className="font-display text-lg font-bold mb-4">
          Table of Contents
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-on-surface-variant text-sm columns-1 md:columns-2 gap-x-8">
          <li>
            <a href="#definitions" className="hover:text-accent transition-colors">
              Definitions
            </a>
          </li>
          <li>
            <a href="#services" className="hover:text-accent transition-colors">
              Services and Scope of Work
            </a>
          </li>
          <li>
            <a href="#payment" className="hover:text-accent transition-colors">
              Payment Terms and Pricing
            </a>
          </li>
          <li>
            <a href="#refund" className="hover:text-accent transition-colors">
              Refund and Cancellation Policy
            </a>
          </li>
          <li>
            <a href="#delivery" className="hover:text-accent transition-colors">
              Project Delivery and Timelines
            </a>
          </li>
          <li>
            <a href="#user-responsibilities" className="hover:text-accent transition-colors">
              User Responsibilities
            </a>
          </li>
          <li>
            <a href="#ip" className="hover:text-accent transition-colors">
              Intellectual Property
            </a>
          </li>
          <li>
            <a href="#privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#cookies" className="hover:text-accent transition-colors">
              Cookie Policy
            </a>
          </li>
          <li>
            <a href="#seo-disclaimer" className="hover:text-accent transition-colors">
              SEO and Performance Disclaimer
            </a>
          </li>
          <li>
            <a href="#ai-disclaimer" className="hover:text-accent transition-colors">
              AI Solutions Disclaimer
            </a>
          </li>
          <li>
            <a href="#limitation" className="hover:text-accent transition-colors">
              Limitation of Liability
            </a>
          </li>
          <li>
            <a href="#warranty" className="hover:text-accent transition-colors">
              Warranty and Disclaimer
            </a>
          </li>
          <li>
            <a href="#indemnification" className="hover:text-accent transition-colors">
              Indemnification
            </a>
          </li>
          <li>
            <a href="#confidentiality" className="hover:text-accent transition-colors">
              Confidentiality
            </a>
          </li>
          <li>
            <a href="#termination" className="hover:text-accent transition-colors">
              Termination
            </a>
          </li>
          <li>
            <a href="#governing-law" className="hover:text-accent transition-colors">
              Governing Law and Dispute Resolution
            </a>
          </li>
          <li>
            <a href="#force-majeure" className="hover:text-accent transition-colors">
              Force Majeure
            </a>
          </li>
          <li>
            <a href="#severability" className="hover:text-accent transition-colors">
              Severability
            </a>
          </li>
          <li>
            <a href="#changes" className="hover:text-accent transition-colors">
              Changes to These Policies
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact Information
            </a>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="prose prose-gray max-w-none space-y-12">
        {/* ========== 1. DEFINITIONS ========== */}
        <section id="definitions">
          <h2 className="font-display text-2xl font-bold mb-4">
            1. Definitions
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Throughout these Terms &amp; Policies, the following definitions apply:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              <strong>&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;</strong> refers to{" "}
              <strong>Craftly Studio</strong>, a digital agency registered in
              Vapi, Gujarat, India, providing web development, e-commerce
              development, custom web applications, SEO services, AI solutions,
              business automation, branding &amp; UI/UX design, and landing page
              development services.
            </li>
            <li>
              <strong>&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or
              &ldquo;your&rdquo;</strong> refers to any individual, business
              entity, or organization that accesses our website or engages our
              digital services.
            </li>
            <li>
              <strong>&ldquo;Website&rdquo;</strong> refers to{" "}
              <strong>craftly-studio.vercel.app</strong> and all associated
              pages, subdomains, and digital properties operated by Craftly
              Studio.
            </li>
            <li>
              <strong>&ldquo;Services&rdquo;</strong> refers to all digital
              solutions offered by Craftly Studio, including custom website
              development, e-commerce development, custom web applications, SEO
              optimization, AI-powered solutions, business automation, branding
              &amp; UI/UX design, landing pages, portfolio websites, and
              ongoing website maintenance.
            </li>
            <li>
              <strong>&ldquo;Project&rdquo;</strong> refers to any individual
              engagement, deliverable, or scope of work agreed upon between
              Craftly Studio and the Client through a written proposal,
              quotation, or contract.
            </li>
            <li>
              <strong>&ldquo;Deliverables&rdquo;</strong> refers to all work
              products, designs, source code, content, documentation, and
              materials produced as part of a Project.
            </li>
            <li>
              <strong>&ldquo;Client Materials&rdquo;</strong> refers to all
              content, data, images, branding assets, and information provided
              by the Client for use in a Project.
            </li>
          </ul>
        </section>

        {/* ========== 2. SERVICES AND SCOPE OF WORK ========== */}
        <section id="services">
          <h2 className="font-display text-2xl font-bold mb-4">
            2. Services and Scope of Work
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio provides professional digital solutions tailored to
            businesses across industries including manufacturing, healthcare,
            hospitality, real estate, education, CA firms, interior design, and
            professional services throughout{" "}
            <strong>Vapi, Daman, Silvassa, Valsad, Dadra and Nagar
            Haveli</strong>, and surrounding regions in Gujarat, India. Our
            core service offerings include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              <strong>
                <Link
                  href="/services/website-development"
                  className="text-accent hover:underline"
                >
                  Website Development
                </Link>
              </strong>{" "}
              — Custom websites built with React, Next.js, and TypeScript for
              businesses in Vapi and Gujarat
            </li>
            <li>
              <strong>
                <Link
                  href="/services/ecommerce-development"
                  className="text-accent hover:underline"
                >
                  E-commerce Development
                </Link>
              </strong>{" "}
              — Online stores with secure payment gateway integration,
              inventory management, and mobile-first design
            </li>
            <li>
              <strong>
                <Link
                  href="/services/custom-web-applications"
                  className="text-accent hover:underline"
                >
                  Custom Web Applications
                </Link>
              </strong>{" "}
              — CRM systems, business dashboards, client portals, and
              workflow management tools
            </li>
            <li>
              <strong>
                <Link
                  href="/services/seo-services"
                  className="text-accent hover:underline"
                >
                  SEO Services
                </Link>
              </strong>{" "}
              — Local SEO, technical SEO, on-page optimization, and content
              structuring to improve Google rankings for businesses in
              Gujarat
            </li>
            <li>
              <strong>
                <Link
                  href="/services/ai-solutions"
                  className="text-accent hover:underline"
                >
                  AI Solutions
                </Link>
              </strong>{" "}
              — AI-powered chatbots, content generation, workflow automation,
              and intelligent business solutions
            </li>
            <li>
              <strong>
                <Link
                  href="/services/business-automation"
                  className="text-accent hover:underline"
                >
                  Business Automation
                </Link>
              </strong>{" "}
              — Custom CRM development, process digitization, and automated
              workflow systems
            </li>
            <li>
              <strong>
                <Link
                  href="/services/branding-ui-ux"
                  className="text-accent hover:underline"
                >
                  Branding &amp; UI/UX Design
                </Link>
              </strong>{" "}
              — Strategic branding, logo design, wireframing, prototyping,
              and conversion-focused user experience design
            </li>
            <li>
              <strong>
                <Link
                  href="/services/landing-pages-portfolio"
                  className="text-accent hover:underline"
                >
                  Landing Pages &amp; Portfolio Websites
                </Link>
              </strong>{" "}
              — High-converting landing pages and stunning portfolio sites
              for professionals, freelancers, and agencies
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            The specific scope, deliverables, timeline, and pricing for each
            Project will be defined in a written proposal or quotation provided
            to the Client prior to the commencement of work. Any work requested
            beyond the agreed scope will be treated as additional work and billed
            separately. For details on how we work, visit our{" "}
            <Link href="/about" className="text-accent hover:underline">
              About page
            </Link>
            .
          </p>
        </section>

        {/* ========== 3. PAYMENT TERMS AND PRICING ========== */}
        <section id="payment">
          <h2 className="font-display text-2xl font-bold mb-4">
            3. Payment Terms and Pricing
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            All quotations provided by Craftly Studio are valid for a period of
            fifteen (15) calendar days from the date of issue, unless otherwise
            stated in writing. Pricing is based on the scope of work defined in
            the quotation and is subject to change if the scope is modified.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            3.1 Payment Schedule
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Unless otherwise agreed upon in writing, the standard payment
            schedule for web development and digital services is:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-2">
            <li>
              <strong>50% advance</strong> — Due upon acceptance of the
              quotation and prior to commencement of work on the website,
              e-commerce store, web application, or any digital project.
            </li>
            <li>
              <strong>50% on completion</strong> — Due upon delivery of the
              final deliverables and prior to the handover of source code,
              credentials, or deployment of the project to the Client&apos;s
              hosting environment.
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            For larger Projects exceeding ₹1,00,000 (Indian Rupees One Lakh),
            a milestone-based payment schedule may be agreed upon. For ongoing
            website maintenance, SEO retainer services, and business automation
            subscriptions, payment is due at the beginning of each billing
            cycle.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            3.2 Payment Methods
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Payments can be made via bank transfer (NEFT/RTGS/IMPS), UPI, or
            any other method mutually agreed upon. All payments shall be made in
            Indian Rupees (INR) unless explicitly agreed otherwise in writing.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            3.3 Late Payments
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Invoices not paid within the agreed timeframe will incur a late fee
            of 1.5% per month on the outstanding amount. Craftly Studio reserves
            the right to suspend work on any Project where payment is overdue by
            more than fifteen (15) calendar days until all outstanding dues are
            cleared. This applies to all services including website development,
            SEO campaigns, and AI solution deployments.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            3.4 Taxes
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Unless otherwise stated, all prices quoted are exclusive of
            applicable taxes including Goods and Services Tax (GST). GST will be
            charged at the prevailing rate as required by Indian law and will be
            added to all invoices for digital services provided from our Vapi,
            Gujarat office.
          </p>
        </section>

        {/* ========== 4. REFUND AND CANCELLATION POLICY ========== */}
        <section id="refund">
          <h2 className="font-display text-2xl font-bold mb-4">
            4. Refund and Cancellation Policy
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            We understand that business needs change. The following refund and
            cancellation terms apply to all digital services provided by
            Craftly Studio, including website development, e-commerce projects,
            custom web applications, SEO services, and AI solutions.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            4.1 Cancellation by the Client
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            The Client may cancel a Project at any time by providing written
            notice to Craftly Studio. Upon cancellation, the following terms
            apply:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-2">
            <li>
              <strong>Cancellation before work begins:</strong> A full refund of
              the advance payment will be issued, minus any non-recoverable
              third-party costs already incurred (such as domain registration,
              hosting setup, premium software licenses, or stock asset
              purchases).
            </li>
            <li>
              <strong>Cancellation after work has begun:</strong> The Client
              will be invoiced for the percentage of work completed up to the
              date of cancellation, calculated proportionally against the total
              project cost. Any advance payment in excess of the work completed
              will be refunded.
            </li>
            <li>
              <strong>Cancellation after delivery:</strong> No refund will be
              issued once the final deliverables have been delivered and accepted
              by the Client.
            </li>
            <li>
              <strong>SEO and retainer cancellations:</strong> For ongoing SEO
              services, business automation subscriptions, or website
              maintenance plans, the Client may cancel with fifteen (15) days&apos;
              written notice. No refund will be issued for the current billing
              cycle, but no further charges will be incurred.
            </li>
          </ul>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            4.2 Cancellation by Craftly Studio
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio reserves the right to cancel a Project if the Client
            breaches any material term of these Policies, fails to provide
            required Client Materials within a reasonable timeframe, or engages
            in conduct that makes the continuation of the Project impractical.
            In such cases, the Client will be billed for work completed to date,
            and any advance payment in excess of that amount will be refunded.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            4.3 Refund Processing
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Refunds, where applicable, will be processed within fifteen (15)
            business days from the date of cancellation approval. Refunds will
            be made to the original payment method or via bank transfer to the
            Client&apos;s designated account. No refund will be issued for work
            that has been completed and delivered, or for third-party costs
            (domain names, hosting fees, stock images, premium software
            licenses, API subscriptions) procured on the Client&apos;s behalf.
          </p>
        </section>

        {/* ========== 5. PROJECT DELIVERY AND TIMELINES ========== */}
        <section id="delivery">
          <h2 className="font-display text-2xl font-bold mb-4">
            5. Project Delivery and Timelines
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Estimated project timelines are communicated in the initial
            quotation and may vary depending on the complexity and scope. As a
            general guideline for our web development services in Vapi and
            Gujarat:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              <strong>Standard business websites:</strong> 2 to 4 weeks
            </li>
            <li>
              <strong>E-commerce websites:</strong> 3 to 6 weeks
            </li>
            <li>
              <strong>Custom web applications:</strong> 4 to 12 weeks
            </li>
            <li>
              <strong>SEO campaigns:</strong> Ongoing monthly engagement; initial
              audit and strategy delivered within the first two weeks
            </li>
            <li>
              <strong>AI solutions and automation:</strong> 2 to 8 weeks depending
              on integration complexity
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Timelines are contingent upon timely receipt of all Client Materials,
            feedback, and approvals; timely payments as per the agreed schedule;
            a reasonable number of revision rounds as defined in the project
            scope; and no significant changes to the project scope after work
            has commenced.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Delays caused by the Client, including delayed feedback, delayed
            content delivery, or scope changes, will result in corresponding
            extensions to the project timeline. Craftly Studio will communicate
            any such delays promptly and agree on revised timelines.
          </p>
        </section>

        {/* ========== 6. USER RESPONSIBILITIES ========== */}
        <section id="user-responsibilities">
          <h2 className="font-display text-2xl font-bold mb-4">
            6. User Responsibilities
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            When you engage Craftly Studio for website development, SEO
            services, AI solutions, or any digital service, the Client agrees
            to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              Provide all necessary Client Materials (content, images, branding
              assets, access credentials) in a timely manner to avoid project
              delays.
            </li>
            <li>
              Designate a primary point of contact with decision-making
              authority for the Project.
            </li>
            <li>
              Review and provide constructive feedback on deliverables within a
              reasonable timeframe (typically five to seven business days).
            </li>
            <li>
              Ensure that all Client Materials provided do not infringe upon the
              intellectual property rights of any third party.
            </li>
            <li>
              Obtain and maintain all necessary licenses, permits, and consents
              required for their business operations and online presence.
            </li>
            <li>
              Maintain the confidentiality of all login credentials, API keys,
              and access information shared by Craftly Studio during the course
              of a Project.
            </li>
            <li>
              Use the Website and services in compliance with all applicable
              local, state, and national laws of India.
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            For more information about how we work with clients, visit our{" "}
            <Link href="/about" className="text-accent hover:underline">
              About page
            </Link>
            . If you have any questions, feel free to{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>

        {/* ========== 7. INTELLECTUAL PROPERTY ========== */}
        <section id="ip">
          <h2 className="font-display text-2xl font-bold mb-4">
            7. Intellectual Property
          </h2>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            7.1 Client Ownership
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Upon full and final payment of all invoiced amounts, the Client
            receives full ownership of the Deliverables, including all custom
            designs, source code, and content created specifically for the
            Project. Craftly Studio assigns all rights, title, and interest in
            the Deliverables to the Client. This applies to all custom website
            development, e-commerce stores, web applications, landing pages,
            and branding work completed for businesses in Vapi, Gujarat, and
            surrounding areas.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            7.2 Third-Party Components
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Deliverables may incorporate third-party libraries, frameworks,
            plugins, stock images, fonts, or other materials subject to their
            own licenses. The Client acknowledges that such components are
            governed by their respective license terms and Craftly Studio makes
            no ownership claims over third-party materials.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            7.3 Portfolio and Marketing Rights
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Unless explicitly restricted in writing, Craftly Studio reserves
            the right to showcase completed Projects in its{" "}
            <Link href="/portfolio" className="text-accent hover:underline">
              portfolio
            </Link>
            , case studies, marketing materials, and on social media platforms.
            Client names and logos may be used for promotional purposes. If the
            Client wishes to restrict this right, they must notify Craftly
            Studio in writing before the commencement of the Project.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            7.4 Pre-Existing Intellectual Property
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Each party retains ownership of its pre-existing intellectual
            property. Any pre-existing materials, frameworks, tools, or
            methodologies owned by Craftly Studio that are used in a Project
            remain the property of Craftly Studio, and a non-exclusive license
            is granted to the Client for use as part of the Deliverables.
          </p>
        </section>

        {/* ========== 8. PRIVACY POLICY ========== */}
        <section id="privacy">
          <h2 className="font-display text-2xl font-bold mb-4">
            8. Privacy Policy
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio is committed to protecting the privacy and security
            of your personal information. This section outlines how we collect,
            use, store, share, and protect data when you visit our website or
            engage our digital services.
          </p>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.1 Information We Collect
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>
              <strong>Contact Information:</strong> Name, email address, phone
              number, company name, and business address when you submit an
              inquiry through our{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact form
              </Link>
              , request a consultation, or communicate with us.
            </li>
            <li>
              <strong>Project Information:</strong> Business details, project
              requirements, branding assets, content, and other materials you
              provide for website development, e-commerce, or custom web
              application projects.
            </li>
            <li>
              <strong>Payment Information:</strong> Billing name, billing
              address, and transaction details. We do not store credit card or
              debit card numbers on our servers; payment processing is handled
              by secure third-party payment processors.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent on pages,
              navigation paths, referral sources, browser type, operating
              system, device type, and language preferences collected
              automatically through cookies and analytics tools.
            </li>
            <li>
              <strong>Log Data:</strong> IP address, access times, referrer
              URLs, and error logs.
            </li>
          </ul>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.2 How We Use Your Information
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>
              To provide, operate, and maintain our digital services including
              website development, SEO, AI solutions, branding, and business
              automation
            </li>
            <li>
              To respond to your inquiries, provide consultation, and send
              project updates
            </li>
            <li>
              To manage ongoing projects, deliver milestones, and coordinate
              feedback
            </li>
            <li>
              To process invoices, collect payments, and maintain financial
              records
            </li>
            <li>
              To analyze usage patterns, optimize website performance, and
              improve user experience
            </li>
            <li>
              To send newsletters, growth tips, and promotional content about
              our services (you may opt out at any time)
            </li>
            <li>
              To detect, prevent, and address unauthorized access, fraud, and
              security threats
            </li>
            <li>
              To comply with applicable laws, regulations, and legal processes
              in India
            </li>
          </ul>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.3 How We Share Your Information
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            We do not sell, rent, or trade your personal information to third
            parties for their marketing purposes. We may share your information
            with trusted service providers (hosting via Vercel, database via
            Firebase, payment processors, email delivery, analytics) who have
            access only as needed to perform their services and are
            contractually obligated to protect your data. We may also disclose
            information when required by law or in connection with a business
            transfer.
          </p>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.4 Data Storage and Security
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Your information is stored on secure servers provided by Firebase
            (Google Cloud Platform) and is protected by industry-standard
            security measures including TLS/SSL encryption, Firebase
            Authentication with role-based access control, secure database
            rules, and limited access by authorized personnel only. While we
            implement robust security measures, no method of electronic
            transmission or storage is 100% secure.
          </p>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.5 Data Retention
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant">
            <li>
              <strong>Inquiry Data:</strong> Up to two (2) years from last
              communication
            </li>
            <li>
              <strong>Project Data:</strong> Duration of business relationship
              plus five (5) years for legal and accounting purposes
            </li>
            <li>
              <strong>Analytics Data:</strong> Aggregated and anonymized after
              twenty-six (26) months
            </li>
            <li>
              <strong>Admin CMS Accounts:</strong> Deleted within thirty (30)
              days of account deactivation
            </li>
          </ul>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.6 Your Rights
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            You have the right to access, correct, delete, or restrict
            processing of your personal information. You may also object to
            direct marketing and request data portability. To exercise any of
            these rights, contact us at{" "}
            <a
              href="mailto:craftly.studio.vapi@gmail.com"
              className="text-accent hover:underline"
            >
              craftly.studio.vapi@gmail.com
            </a>
            . We will respond within thirty (30) calendar days.
          </p>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.7 Children&apos;s Privacy
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Our website and services are not directed at individuals under the
            age of eighteen (18). We do not knowingly collect personal
            information from children.
          </p>

          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            8.8 International Data Transfers
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio is based in Vapi, Gujarat, India. Our service
            providers may operate data centers globally. By using our website or
            services, you consent to the transfer of your information to
            countries other than your own. We take appropriate steps to ensure
            your data receives adequate protection through contractual
            safeguards.
          </p>
        </section>

        {/* ========== 9. COOKIE POLICY ========== */}
        <section id="cookies">
          <h2 className="font-display text-2xl font-bold mb-4">
            9. Cookie Policy
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Our website uses cookies to enhance your browsing experience. Cookies
            are small text files placed on your device when you visit a website.
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              <strong>Essential Cookies:</strong> Required for the website to
              function correctly (session management, security tokens). These
              cannot be disabled.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how
              visitors interact with our website by collecting anonymous usage
              data. We use Google Analytics for this purpose.
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember your settings and
              preferences (language, region) to provide a personalized
              experience.
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            You can control and manage cookies through your browser settings.
            Disabling essential cookies may impair the functionality of the
            website. For more information on managing cookies, consult your
            browser&apos;s help documentation.
          </p>
        </section>

        {/* ========== 10. SEO AND PERFORMANCE DISCLAIMER ========== */}
        <section id="seo-disclaimer">
          <h2 className="font-display text-2xl font-bold mb-4">
            10. SEO and Performance Disclaimer
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio implements industry-standard best practices for
            search engine optimization, including technical SEO, on-page
            optimization, local SEO, and content structuring. Our SEO services
            are designed to improve online visibility for businesses in{" "}
            <strong>Vapi, Gujarat</strong>, and surrounding areas including{" "}
            <strong>Daman, Silvassa, Valsad, and Dadra and Nagar
            Haveli</strong>.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            However, search engine rankings are influenced by numerous factors
            outside our control, including competition, market conditions,
            search engine algorithm changes, and the Client&apos;s own business
            activities. <strong>Craftly Studio does not guarantee specific
            search engine rankings, positions, or traffic levels.</strong> Any
            references to past performance or results achieved for other clients
            are illustrative and should not be interpreted as a guarantee of
            future outcomes.
          </p>
        </section>

        {/* ========== 11. AI SOLUTIONS DISCLAIMER ========== */}
        <section id="ai-disclaimer">
          <h2 className="font-display text-2xl font-bold mb-4">
            11. AI Solutions Disclaimer
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio offers AI-powered solutions including chatbots,
            content generation tools, workflow automation, and intelligent
            business solutions. The Client acknowledges that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              AI-generated content may require human review for accuracy, tone,
              and compliance with applicable laws.
            </li>
            <li>
              AI model outputs are probabilistic and may not always be perfectly
              accurate or appropriate.
            </li>
            <li>
              Integration with third-party AI services (such as OpenAI, Google
              Gemini, or other providers) is subject to the terms and
              limitations of those providers.
            </li>
            <li>
              The Client is responsible for ensuring that the use of AI-generated
              content and automated communications complies with applicable laws
              and regulations in their jurisdiction.
            </li>
          </ul>
        </section>

        {/* ========== 12. LIMITATION OF LIABILITY ========== */}
        <section id="limitation">
          <h2 className="font-display text-2xl font-bold mb-4">
            12. Limitation of Liability
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            To the maximum extent permitted by applicable law, Craftly Studio
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to the
            use of the website or the services, including but not limited to
            loss of profits, data, business opportunities, or goodwill.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Craftly Studio&apos;s total aggregate liability for any claims
            arising out of or related to any single Project shall not exceed
            the total amount paid by the Client to Craftly Studio for that
            specific Project.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Craftly Studio is not responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-2">
            <li>
              Downtime or interruptions caused by third-party hosting providers
              or infrastructure.
            </li>
            <li>
              Loss of data resulting from hardware failure, software bugs, or
              malicious attacks beyond our reasonable control.
            </li>
            <li>
              Actions or omissions of third-party service providers integrated
              into the Deliverables.
            </li>
            <li>
              Business losses resulting from website downtime, search engine
              algorithm changes, or market conditions.
            </li>
          </ul>
        </section>

        {/* ========== 13. WARRANTY AND DISCLAIMER ========== */}
        <section id="warranty">
          <h2 className="font-display text-2xl font-bold mb-4">
            13. Warranty and Disclaimer
          </h2>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            13.1 Workmanship Warranty
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio warrants that all Deliverables will be free from
            material defects in workmanship and will conform to the
            specifications defined in the project proposal for a period of
            thirty (30) calendar days following final delivery. During this
            period, Craftly Studio will rectify, at no additional cost, any
            defects attributable to our work on the website, e-commerce store,
            web application, or any other digital deliverable.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            13.2 General Disclaimer
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            Except as expressly stated in Section 13.1, the website and all
            services are provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis without warranties of any kind, whether
            express or implied, including but not limited to implied warranties
            of merchantability, fitness for a particular purpose, and
            non-infringement. Craftly Studio does not warrant that the website
            will be uninterrupted, error-free, or free from harmful components.
          </p>
        </section>

        {/* ========== 14. INDEMNIFICATION ========== */}
        <section id="indemnification">
          <h2 className="font-display text-2xl font-bold mb-4">
            14. Indemnification
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            The Client agrees to indemnify, defend, and hold harmless Craftly
            Studio, its owners, employees, and affiliates from and against any
            and all claims, losses, liabilities, damages, costs, and expenses
            (including reasonable attorney fees) arising out of or related to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>The Client&apos;s use of the website or services.</li>
            <li>
              Any Client Materials that infringe the intellectual property
              rights of third parties.
            </li>
            <li>
              The Client&apos;s violation of any applicable law or regulation.
            </li>
            <li>
              Any dispute between the Client and a third party arising from the
              Client&apos;s business operations or online presence.
            </li>
          </ul>
        </section>

        {/* ========== 15. CONFIDENTIALITY ========== */}
        <section id="confidentiality">
          <h2 className="font-display text-2xl font-bold mb-4">
            15. Confidentiality
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Both parties agree to keep confidential all non-public information
            received from the other party in connection with a Project,
            including business strategies, proprietary data, login credentials,
            API keys, and technical details. This obligation survives the
            termination of the business relationship for a period of two (2)
            years.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Neither party will disclose the other party&apos;s confidential
            information to any third party without prior written consent, except
            as required by law or to employees and contractors who have a need
            to know and are bound by equivalent confidentiality obligations.
          </p>
        </section>

        {/* ========== 16. TERMINATION ========== */}
        <section id="termination">
          <h2 className="font-display text-2xl font-bold mb-4">
            16. Termination
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Either party may terminate the business relationship under the
            following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-on-surface-variant mt-4">
            <li>
              <strong>For cause:</strong> Either party may terminate immediately
              upon written notice if the other party materially breaches these
              Terms and fails to cure such breach within fifteen (15) calendar
              days of receiving written notice thereof.
            </li>
            <li>
              <strong>For convenience:</strong> Either party may terminate with
              thirty (30) calendar days&apos; written notice. In such cases,
              the Client will be billed for all work completed to date, and any
              excess advance payment will be refunded as per Section 4.
            </li>
          </ul>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Upon termination, all completed Deliverables for which payment has
            been received will be transferred to the Client. Craftly Studio
            will cooperate in good faith to ensure a smooth transition of
            website files, source code, hosting credentials, and any other
            project assets.
          </p>
        </section>

        {/* ========== 17. GOVERNING LAW AND DISPUTE RESOLUTION ========== */}
        <section id="governing-law">
          <h2 className="font-display text-2xl font-bold mb-4">
            17. Governing Law and Dispute Resolution
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            These Terms &amp; Policies shall be governed by and construed in
            accordance with the laws of India, specifically the Indian Contract
            Act, 1872, the Information Technology Act, 2000, the Digital
            Personal Data Protection Act, 2023, and other applicable central
            and state legislation.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            In the event of any dispute arising out of or relating to these
            Policies or the Services, the parties shall first attempt to resolve
            the dispute through good-faith negotiation. If the dispute cannot be
            resolved through negotiation within thirty (30) calendar days, either
            party may submit the dispute to arbitration in accordance with the
            Arbitration and Conciliation Act, 1996. The seat of arbitration
            shall be <strong>Vapi, Gujarat, India</strong>, and the proceedings
            shall be conducted in English.
          </p>
          <h3 className="font-display text-lg font-bold mt-6 mb-3">
            17.1 Grievance Officer
          </h3>
          <p className="text-on-surface-variant leading-relaxed">
            In accordance with the Information Technology Act, 2000 and the
            Information Technology (Reasonable Security Practices and Procedures
            and Sensitive Personal Data or Information) Rules, 2011, the
            designated Grievance Officer for Craftly Studio can be contacted at{" "}
            <a
              href="mailto:craftly.studio.vapi@gmail.com"
              className="text-accent hover:underline"
            >
              craftly.studio.vapi@gmail.com
            </a>
            . We will endeavor to resolve your grievance within thirty (30)
            calendar days.
          </p>
        </section>

        {/* ========== 18. FORCE MAJEURE ========== */}
        <section id="force-majeure">
          <h2 className="font-display text-2xl font-bold mb-4">
            18. Force Majeure
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Neither party shall be liable for any delay or failure in
            performance resulting from causes beyond its reasonable control,
            including but not limited to natural disasters, acts of government,
            power failures, internet outages, pandemics, labor disputes, or acts
            of terrorism. The affected party shall promptly notify the other
            party and take reasonable steps to mitigate the impact of the force
            majeure event.
          </p>
        </section>

        {/* ========== 19. SEVERABILITY ========== */}
        <section id="severability">
          <h2 className="font-display text-2xl font-bold mb-4">
            19. Severability
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            If any provision of these Terms &amp; Policies is held to be
            invalid, illegal, or unenforceable by a court of competent
            jurisdiction, the remaining provisions shall continue in full force
            and effect. The invalid provision will be modified to the minimum
            extent necessary to make it valid and enforceable while preserving
            the original intent of the parties.
          </p>
        </section>

        {/* ========== 20. CHANGES TO THESE POLICIES ========== */}
        <section id="changes">
          <h2 className="font-display text-2xl font-bold mb-4">
            20. Changes to These Policies
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Craftly Studio reserves the right to modify these Terms &amp;
            Policies at any time to reflect changes in our practices,
            technology, legal requirements, or business operations. When we make
            material changes, we will update the &ldquo;Last updated&rdquo; date
            at the top of this page and, where appropriate, notify you via
            email or a prominent notice on the website.
          </p>
          <p className="text-on-surface-variant leading-relaxed mt-4">
            Your continued use of the website or services after any such
            modifications constitutes your acceptance of the revised Policies.
            We encourage you to review this page periodically. These Policies,
            together with any project proposal, quotation, or written agreement
            signed by both parties, constitute the entire agreement between
            Craftly Studio and the Client regarding the subject matter herein
            and supersede all prior and contemporaneous agreements,
            representations, and understandings, whether written or oral.
          </p>
        </section>

        {/* ========== 21. CONTACT INFORMATION ========== */}
        <section id="contact">
          <h2 className="font-display text-2xl font-bold mb-4">
            21. Contact Information
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            If you have any questions, concerns, or requests regarding these
            Terms &amp; Policies, our privacy practices, or any of our digital
            services — whether it&apos;s website development, e-commerce
            solutions, SEO services, AI-powered tools, business automation, or
            branding &amp; UI/UX design — please reach out to us:
          </p>
          <div className="bg-surface p-6 rounded-2xl border border-outline mt-4">
            <p className="text-on-surface-variant">
              <strong>Craftly Studio</strong>
            </p>
            <p className="text-on-surface-variant">
              Vapi, Gujarat, India — 396191
            </p>
            <p className="text-on-surface-variant">
              Email:{" "}
              <a
                href="mailto:craftly.studio.vapi@gmail.com"
                className="text-accent hover:underline"
              >
                craftly.studio.vapi@gmail.com
              </a>
            </p>

            <p className="text-on-surface-variant mt-4">
              <Link
                href="/contact"
                className="text-accent hover:underline font-medium"
              >
                Visit our Contact Page &rarr;
              </Link>
            </p>
          </div>
          <p className="text-on-surface-variant leading-relaxed mt-6 text-sm">
            This document is provided for informational purposes and does not
            constitute legal advice. Craftly Studio recommends consulting with
            a qualified legal professional for advice specific to your business
            needs. For more about our company, visit our{" "}
            <Link href="/about" className="text-accent hover:underline">
              About page
            </Link>
            , or explore our{" "}
            <Link href="/services" className="text-accent hover:underline">
              services
            </Link>
            ,{" "}
            <Link href="/portfolio" className="text-accent hover:underline">
              portfolio
            </Link>
            , and{" "}
            <Link href="/blog" className="text-accent hover:underline">
              blog
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
