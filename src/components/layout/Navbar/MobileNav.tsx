"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu automatically on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/portfolio", label: "Work" },
    { href: "/industries/manufacturing", label: "Industries" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  // Animation variants for the full screen menu overlay
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  } as const;

  // Animation variants for individual menu items
  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  } as const;

  return (
    <div className="md:hidden flex items-center">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-on-surface hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full transition-colors cursor-pointer"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Drawer Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-40 flex flex-col justify-between pt-28 pb-10 px-margin-mobile shadow-2xl"
          >
            {/* Nav links */}
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className={`text-3xl font-extrabold flex items-center justify-between group py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1.5 ${
                        isActive ? "text-accent" : "text-on-surface hover:text-accent"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA Button */}
            <motion.div variants={itemVariants} className="w-full">
              <Link
                href="/contact"
                className="flex items-center justify-center bg-accent text-white w-full py-4 rounded-full font-bold text-base transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Start Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
