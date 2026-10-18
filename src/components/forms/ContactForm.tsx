"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/utils/validation";
import { ContactFormData } from "@/types/lead";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to submit inquiry");
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-surface p-8 md:p-12 rounded-3xl border border-outline shadow-xl text-center space-y-6 max-w-xl mx-auto">
        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-extrabold text-on-surface">
          Message Sent!
        </h3>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Thank you for reaching out to Craftly Studio. We&apos;ve sent an auto-reply to your email address and will review your project details shortly.
        </p>
        <p className="text-accent font-semibold text-lg">
          We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-accent hover:bg-accent/90 focus:outline-none transition duration-150 ease-in-out cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700 text-sm">
          <p className="font-bold">Submission Failed</p>
          <p>{submitError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-bold text-on-surface mb-2">
            First Name <span className="text-accent">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            disabled={isSubmitting}
            {...register("firstName")}
            className={`w-full bg-white border ${
              errors.firstName ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-colors`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-bold text-on-surface mb-2">
            Last Name <span className="text-accent">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            disabled={isSubmitting}
            {...register("lastName")}
            className={`w-full bg-white border ${
              errors.lastName ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-colors`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-on-surface mb-2">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          type="email"
          disabled={isSubmitting}
          {...register("email")}
          className={`w-full bg-white border ${
            errors.email ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-colors`}
          placeholder="john@company.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-on-surface mb-2">
            Phone Number <span className="text-on-surface-variant font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            type="text"
            disabled={isSubmitting}
            {...register("phone")}
            className={`w-full bg-white border ${
              errors.phone ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-colors`}
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-bold text-on-surface mb-2">
            Company Name <span className="text-on-surface-variant font-normal">(Optional)</span>
          </label>
          <input
            id="company"
            type="text"
            disabled={isSubmitting}
            {...register("company")}
            className={`w-full bg-white border ${
              errors.company ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-colors`}
            placeholder="Acme Corp"
          />
          {errors.company && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.company.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="projectType" className="block text-sm font-bold text-on-surface mb-2">
            Project Type <span className="text-on-surface-variant font-normal">(Optional)</span>
          </label>
          <select
            id="projectType"
            disabled={isSubmitting}
            {...register("projectType")}
            className={`w-full bg-white border ${
              errors.projectType ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface focus:outline-none transition-colors cursor-pointer`}
          >
            <option value="">Select project type</option>
            <option value="Website Development">Website Development</option>
            <option value="E-commerce Development">E-commerce Development</option>
            <option value="Website Redesign">Website Redesign</option>
            <option value="Local SEO & Growth">Local SEO & Growth</option>
            <option value="AI Automation & Chatbots">AI Automation & Chatbots</option>
            <option value="Website Maintenance & Support">Website Maintenance & Support</option>
            <option value="Custom Web Application">Custom Web Application</option>
            <option value="Other / Consultation">Other / Consultation</option>
          </select>
          {errors.projectType && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.projectType.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="priorityLevel" className="block text-sm font-bold text-on-surface mb-2">
            Priority Level <span className="text-accent">*</span>
          </label>
          <select
            id="priorityLevel"
            disabled={isSubmitting}
            {...register("priorityLevel")}
            className={`w-full bg-white border ${
              errors.priorityLevel ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface focus:outline-none transition-colors cursor-pointer`}
          >
            <option value="Low Priority">Low Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="High Priority">High Priority</option>
            <option value="Urgent / Critical">Urgent / Critical</option>
          </select>
          {errors.priorityLevel && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.priorityLevel.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-bold text-on-surface mb-2">
            Budget Range <span className="text-accent">*</span>
          </label>
          <select
            id="budgetRange"
            disabled={isSubmitting}
            {...register("budgetRange")}
            className={`w-full bg-white border ${
              errors.budgetRange ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface focus:outline-none transition-colors cursor-pointer`}
          >
            <option value="">Select budget range</option>
            <option value="Under ₹25,000 (< $300)">Under ₹25,000 (&lt; $300)</option>
            <option value="₹25,000 - ₹50,000 ($300 - $600)">₹25,000 - ₹50,000 ($300 - $600)</option>
            <option value="₹50,000 - ₹1,00,000 ($600 - $1,200)">₹50,000 - ₹1,00,000 ($600 - $1,200)</option>
            <option value="₹1,00,000 - ₹2,50,000 ($1,200 - $3,000)">₹1,00,000 - ₹2,50,000 ($1,200 - $3,000)</option>
            <option value="₹2,50,000+ ($3,000+)">₹2,50,000+ ($3,000+)</option>
            <option value="Flexible / Custom">Flexible / Custom</option>
          </select>
          {errors.budgetRange && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.budgetRange.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="timeline" className="block text-sm font-bold text-on-surface mb-2">
            Timeline <span className="text-accent">*</span>
          </label>
          <select
            id="timeline"
            disabled={isSubmitting}
            {...register("timeline")}
            className={`w-full bg-white border ${
              errors.timeline ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
            } rounded-lg px-4 py-3 text-on-surface focus:outline-none transition-colors cursor-pointer`}
          >
            <option value="">Select timeline</option>
            <option value="Urgent (< 2 weeks)">Urgent (&lt; 2 weeks)</option>
            <option value="2 - 4 weeks">2 - 4 weeks</option>
            <option value="1 - 2 months">1 - 2 months</option>
            <option value="3+ months">3+ months</option>
            <option value="Flexible / Open discussion">Flexible / Open discussion</option>
          </select>
          {errors.timeline && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.timeline.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-on-surface mb-2">
          Project Details <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          disabled={isSubmitting}
          {...register("message")}
          className={`w-full bg-white border ${
            errors.message ? "border-red-500 focus:border-red-500" : "border-outline focus:border-accent"
          } rounded-lg px-4 py-3 text-on-surface placeholder-gray-400 focus:outline-none transition-colors min-h-[150px] resize-y`}
          placeholder="Tell us about your goals, timelines, and budget..."
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white font-bold py-4 rounded-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 transition-all shadow-lg shadow-accent/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Submitting Inquiry...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  );
}
