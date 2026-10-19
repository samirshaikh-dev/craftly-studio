"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  initials?: string;
  gradient?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "Craftly Studio transformed our digital presence. We saw more high-value inquiries in the first month than we did the entire previous year. Their engineering depth is unmatched.",
    author: "Rajesh Mehta",
    role: "CEO, Vapi Industrial Group",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPhecCwmsxbNV5t8XbdjEtkqtI2nMb_CFO5XTNEQt0soXWKJH3zxNx68FwiGEEEfB1Lmmh-mfRMeJSjuD5rq147vx2gmLw-PeGVCBfAFAQZDcccYGqO_YlXmlbLv6jDXTDcVH4vNQBTg9yI_eK7LS9P40BPTjOA-jUMyXttvAZ2TaI9b2BorYubLAeKSJ3yRsoyZNi02EEzimgZ3tGpexieafAghws8_-bkCQfzKt6rfqd5eIdm6Xf",
  },
  {
    quote: "Our booking flow used to be slow and complicated. Craftly built an automated clinic scheduler that has simplified intake and boosted appointments by 60%.",
    author: "Dr. Amrita Sen",
    role: "Founder, Sen Care Clinic",
    avatar: "",
    initials: "AS",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    quote: "We needed a lead generation engine that actually worked for local B2B searches. Craftly Studio delivered a platform that ranks #1 on search results and drives consistent client calls.",
    author: "Karan Shah",
    role: "Marketing Director, Daman Biz Group",
    avatar: "",
    initials: "KS",
    gradient: "from-orange-400 to-red-500",
  },
];

export default function TestimonialSection() {
  const [items, setItems] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    let cancelled = false;
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials?featured=true");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.testimonials && data.testimonials.length > 0) {
          setItems(data.testimonials);
        }
      } catch {
        // Fallback to static defaults
      }
    }
    loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  const total = items.length;
  const activeIndex = index >= total ? 0 : index;

  const nextTestimonial = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  // Variants for slide and fade animation
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 200, damping: 20 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 200, damping: 20 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const current = items[activeIndex] || DEFAULT_TESTIMONIALS[0];
  const roleDisplay = current.company ? `${current.role}, ${current.company}` : current.role;

  return (
    <section className="py-24 md:py-32 bg-surface overflow-hidden relative">
      {/* Decorative Grid and glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Quote Icon container */}
          <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center text-accent mb-10 border border-accent/10">
            <Quote className="w-7 h-7 fill-accent/10" />
          </div>

          {/* Testimonial slider view */}
          <div className="min-h-[220px] flex items-center justify-center w-full mb-12 relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <h2 className="font-display text-xl md:text-3xl font-semibold leading-relaxed text-on-surface text-balance mb-8 italic">
                  &quot;{current.quote}&quot;
                </h2>

                <div className="flex flex-col items-center mt-6">
                  {/* Avatar wrapper */}
                  <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden relative mb-4 flex items-center justify-center shrink-0 bg-neutral-100">
                    {current.avatar ? (
                      <Image 
                        src={current.avatar} 
                        alt={current.author} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${current.gradient || "from-emerald-400 to-teal-500"} flex items-center justify-center text-white font-extrabold text-lg`}>
                        {current.initials || current.author.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  {/* Author detail */}
                  <p className="font-bold text-on-surface text-lg">{current.author}</p>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">{roleDisplay}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white border border-outline text-on-surface hover:text-accent hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer group"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex ? "bg-accent w-6" : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white border border-outline text-on-surface hover:text-accent hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer group"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
