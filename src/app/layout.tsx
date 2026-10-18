import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";

import PublicShell from "@/components/layout/PublicShell";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Analytics from "@/lib/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/seo/schemas";
import { SITE_URL, SITE_NAME, BUSINESS_INFO, KEYWORDS } from "@/lib/seo/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-display-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Best Website Development Company in Vapi, Gujarat`,
    template: `%s | ${SITE_NAME}`,
  },
  description: BUSINESS_INFO.shortDescription,
  keywords: [
    ...KEYWORDS.primary,
    ...KEYWORDS.local.slice(0, 12),
    ...KEYWORDS.commercial.slice(0, 6),
    ...KEYWORDS.service.slice(0, 8),
    ...KEYWORDS.brand.slice(0, 5),
  ].join(", "),
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Web Development & Digital Solutions in Vapi, Gujarat`,
    description: BUSINESS_INFO.shortDescription,
    images: [
      {
        url: `${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Website Development Company Vapi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Web Development Vapi`,
    description: BUSINESS_INFO.shortDescription,
    images: [`${SITE_URL}/craftly-studio-digital-agency-vapi-gujarat.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "H6Pq0eI_0M2sSwSWyHpuCbS7ufcyBMaw_r2k7VCv9Ok",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <Analytics />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-on-surface font-body">
        <VercelAnalytics />
        <SmoothScroll />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
