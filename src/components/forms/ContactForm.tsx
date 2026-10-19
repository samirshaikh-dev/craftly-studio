"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/utils/validation";
import { ContactFormData } from "@/types/lead";

const STEPS = ["Your Details", "Project Info"] as const;

type Step = 0 | 1;

const inputBase =
  "w-full bg-white border rounded-xl px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-all duration-200 text-sm";
const inputNormal = `${inputBase} border-outline focus:border-accent focus:ring-2 focus:ring-accent/10`;
const inputError = `${inputBase} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100`;

export default function ContactForm() {
  const [step, setStep] = useState<Step>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      priorityLevel: "Medium Priority",
      budgetRange: "",
      timeline: "",
      message: "",
    },
  });

  const handleNext = async () => {
    const valid = await trigger(["firstName", "lastName", "email"]);
    if (valid) setStep(1);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("API error:", result);
        throw new Error("submission_failed");
      }

      setIsSuccess(true);
      reset();
      setStep(0);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setSubmitError("submission_failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success state ── */
  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-5 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-2xl font-extrabold text-on-surface">Message received!</h3>
          <p className="text-on-surface-variant mt-2 text-sm leading-relaxed max-w-xs mx-auto">
            Thanks for reaching out. We&apos;ve sent a confirmation to your email and will reply within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline underline-offset-2 transition-colors cursor-pointer"
        >
          Send another message
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  }

  /* ── Error banner ── */
  const ErrorBanner = submitError ? (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm space-y-1">
      <p className="font-bold">Oops, something went wrong</p>
      <p className="text-red-700">We couldn&apos;t send your message right now. Please try again in a moment.</p>
      <p className="text-red-600 pt-1">
        Or email us directly at{" "}
        <a
          href="mailto:craftly.studio.vapi@gmail.com"
          className="underline font-semibold hover:text-red-800 transition-colors"
        >
          craftly.studio.vapi@gmail.com
        </a>
      </p>
    </div>
  ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ── Step indicator ── */}
      <div className="flex items-center gap-3 mb-8">
        {STEPS.map((label, i) => {
          const isActive = step === i;
          const isDone = step > i;
          return (
            <div key={label} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isDone
                      ? "bg-accent text-white"
                      : isActive
                      ? "bg-accent text-white ring-4 ring-accent/20"
                      : "bg-outline text-on-surface-variant"
                  }`}
                >
                  {isDone ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs font-semibold transition-colors ${
                    isActive ? "text-on-surface" : "text-on-surface-variant"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-8 transition-all duration-500 ${step > i ? "bg-accent" : "bg-outline"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Step 1: Contact details ── */}
      {step === 0 && (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
          {ErrorBanner}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                First Name <span className="text-accent">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName")}
                className={errors.firstName ? inputError : inputNormal}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Last Name <span className="text-accent">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName")}
                className={errors.lastName ? inputError : inputNormal}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? inputError : inputNormal}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Phone <span className="text-on-surface-variant font-normal normal-case">(Optional)</span>
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone")}
                className={errors.phone ? inputError : inputNormal}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="company" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Company <span className="text-on-surface-variant font-normal normal-case">(Optional)</span>
              </label>
              <input
                id="company"
                type="text"
                {...register("company")}
                className={errors.company ? inputError : inputNormal}
                placeholder="Acme Corp"
              />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.company.message}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full mt-2 bg-accent text-white font-bold py-3.5 rounded-xl hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            Continue to Project Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Step 2: Project details ── */}
      {step === 1 && (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
          {ErrorBanner}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectType" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Project Type <span className="text-on-surface-variant font-normal normal-case">(Optional)</span>
              </label>
              <select
                id="projectType"
                {...register("projectType")}
                className={`${errors.projectType ? inputError : inputNormal} cursor-pointer`}
              >
                <option value="">Select type…</option>
                <option value="Website Development">Website Development</option>
                <option value="E-commerce Development">E-commerce Development</option>
                <option value="Website Redesign">Website Redesign</option>
                <option value="Local SEO & Growth">Local SEO &amp; Growth</option>
                <option value="AI Automation & Chatbots">AI Automation &amp; Chatbots</option>
                <option value="Website Maintenance & Support">Website Maintenance &amp; Support</option>
                <option value="Custom Web Application">Custom Web Application</option>
                <option value="Other / Consultation">Other / Consultation</option>
              </select>
              {errors.projectType && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.projectType.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="priorityLevel" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Priority <span className="text-accent">*</span>
              </label>
              <select
                id="priorityLevel"
                {...register("priorityLevel")}
                className={`${errors.priorityLevel ? inputError : inputNormal} cursor-pointer`}
              >
                <option value="Low Priority">Low Priority</option>
                <option value="Medium Priority">Medium Priority</option>
                <option value="High Priority">High Priority</option>
                <option value="Urgent / Critical">Urgent / Critical</option>
              </select>
              {errors.priorityLevel && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.priorityLevel.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="budgetRange" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Budget Range <span className="text-accent">*</span>
              </label>
              <select
                id="budgetRange"
                {...register("budgetRange")}
                className={`${errors.budgetRange ? inputError : inputNormal} cursor-pointer`}
              >
                <option value="">Select budget…</option>
                <option value="Under ₹25,000 (< $300)">Under ₹25,000 (&lt; $300)</option>
                <option value="₹25,000 - ₹50,000 ($300 - $600)">₹25,000 – ₹50,000</option>
                <option value="₹50,000 - ₹1,00,000 ($600 - $1,200)">₹50,000 – ₹1,00,000</option>
                <option value="₹1,00,000 - ₹2,50,000 ($1,200 - $3,000)">₹1,00,000 – ₹2,50,000</option>
                <option value="₹2,50,000+ ($3,000+)">₹2,50,000+</option>
                <option value="Flexible / Custom">Flexible / Custom</option>
              </select>
              {errors.budgetRange && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.budgetRange.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="timeline" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
                Timeline <span className="text-accent">*</span>
              </label>
              <select
                id="timeline"
                {...register("timeline")}
                className={`${errors.timeline ? inputError : inputNormal} cursor-pointer`}
              >
                <option value="">Select timeline…</option>
                <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
                <option value="2 - 4 weeks">2 – 4 weeks</option>
                <option value="1 - 2 months">1 – 2 months</option>
                <option value="3+ months">3+ months</option>
                <option value="Flexible / Open discussion">Flexible</option>
              </select>
              {errors.timeline && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.timeline.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-on-surface mb-1.5 uppercase tracking-wide">
              Project Details <span className="text-accent">*</span>
            </label>
            <textarea
              id="message"
              {...register("message")}
              className={`${errors.message ? inputError : inputNormal} min-h-[130px] resize-y`}
              placeholder="Tell us about your goals, current challenges, and what success looks like for you…"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex-1 border border-outline text-on-surface-variant font-semibold py-3.5 rounded-xl hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all duration-200 text-sm cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-accent text-white font-bold py-3.5 rounded-xl hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Submit Inquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
