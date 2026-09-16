import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { BUSINESS_INFO, SERVICES, INDUSTRIES } from "@/lib/seo/constants";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-inverse text-white py-24 border-t border-white/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Top Section: Brand + Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-x-8 gap-y-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold">C</span>
              <span className="font-display font-extrabold text-xl tracking-tight">Craftly Studio</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-sm">
              Engineering growth from Vapi. We build specialized digital infrastructures to help industrial and commercial sectors dominate their market.
            </p>
            {/* NAP - Name, Address, Phone for Local SEO */}
            <address className="not-italic text-gray-400 text-sm mb-6 space-y-1">
              <p className="font-bold text-white">{BUSINESS_INFO.name}</p>
              <p>{BUSINESS_INFO.address.addressLocality}, {BUSINESS_INFO.address.addressRegion}, India - {BUSINESS_INFO.address.postalCode}</p>
              <p>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-accent transition-colors">{BUSINESS_INFO.email}</a></p>
              {BUSINESS_INFO.phone ? (
                <p>Phone: <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-accent transition-colors">{BUSINESS_INFO.phone}</a></p>
              ) : null}
            </address>
            <div className="flex gap-3">
              <Link 
                href={BUSINESS_INFO.socialLinks.linkedin} 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white text-gray-400 transition-all" 
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </Link>
              <Link 
                href={`mailto:${BUSINESS_INFO.email}`} 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white text-gray-400 transition-all" 
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Services</h5>
            <ul className="space-y-3 text-gray-400 text-sm">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="hover:text-white transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="hover:text-white transition-colors font-medium text-accent">
                  View All &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Industries</h5>
            <ul className="space-y-3 text-gray-400 text-sm">
              {INDUSTRIES.slice(0, 6).map((industry) => (
                <li key={industry.id}>
                  <Link href={`/industries/${industry.slug}`} className="hover:text-white transition-colors">
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Company</h5>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Subscribe Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3 flex flex-col items-start">
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Subscribe</h5>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Growth tips delivered to your inbox.
            </p>
            <div className="flex w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white/5 border border-white/10 rounded-l-2xl px-4 py-3 w-full text-sm focus:outline-none focus:border-accent focus:bg-white/[0.08] transition-all" 
              />
              <button 
                className="bg-accent hover:bg-accent/90 text-white px-5 rounded-r-2xl flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Send email subscription"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Craftly Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-white">Terms &amp; Policies</Link>
            <Link href="/sitemap" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
