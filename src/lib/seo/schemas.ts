import { SITE_URL, SITE_NAME, BUSINESS_INFO, NEARBY_LOCATIONS } from "./constants";

// ─── Organization Schema ─────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`,
    image: `${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`,
    description: BUSINESS_INFO.description,
    email: BUSINESS_INFO.email,
    ...(BUSINESS_INFO.phone ? { telephone: BUSINESS_INFO.phone } : {}),
    foundingDate: `${BUSINESS_INFO.foundingYear}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    sameAs: Object.values(BUSINESS_INFO.socialLinks),
    contactPoint: {
      "@type": "ContactPoint",
      ...(BUSINESS_INFO.phone ? { telephone: BUSINESS_INFO.phone } : {}),
      contactType: "customer service",
      email: BUSINESS_INFO.email,
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  };
}

// ─── LocalBusiness Schema ────────────────────────────────────────────────────

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    image: `${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`,
    logo: `${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`,
    description: BUSINESS_INFO.description,
    email: BUSINESS_INFO.email,
    ...(BUSINESS_INFO.phone ? { telephone: BUSINESS_INFO.phone } : {}),
    priceRange: BUSINESS_INFO.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: NEARBY_LOCATIONS.map((location) => ({
      "@type": "City",
      name: location,
    })),
    sameAs: Object.values(BUSINESS_INFO.socialLinks),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web Applications" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Solutions" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & UI/UX Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Pages" } },
      ],
    },
  };
}

// ─── WebSite Schema ──────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: BUSINESS_INFO.shortDescription,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

// ─── Service Schema ──────────────────────────────────────────────────────────

interface ServiceSchemaInput {
  name: string;
  description: string;
  slug: string;
}

export function serviceSchema(service: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}/#service`,
    name: service.name,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: "Vapi",
      containedInPlace: {
        "@type": "State",
        name: "Gujarat",
        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
    },
    serviceType: "Web Development",
  };
}

// ─── FAQ Schema ──────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── Breadcrumb Schema ───────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Article Schema ──────────────────────────────────────────────────────────

interface ArticleSchemaInput {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function articleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/blog/${article.slug}`,
    image: article.image || `${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@id": `${SITE_URL}/#organization`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}
