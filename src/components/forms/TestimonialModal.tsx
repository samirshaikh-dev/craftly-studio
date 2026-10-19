"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Star, X, Check, AlertCircle } from "lucide-react";
import { testimonialSchema } from "@/utils/validation";
import type { Testimonial, TestimonialFormData } from "@/types/testimonial";
import { GRADIENTS, getInitials } from "@/lib/firebase/testimonial/utils";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  initialData?: Testimonial | null;
}

export default function TestimonialModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: TestimonialModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isEditMode = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      author: "",
      role: "",
      company: "",
      quote: "",
      rating: 5,
      avatar: "",
      initials: "",
      gradient: GRADIENTS[0],
      status: "published",
      featured: false,
      order: 0,
    },
  });

  const currentAuthor = watch("author");
  const currentAvatar = watch("avatar");
  const currentRating = watch("rating") ?? 5;
  const currentGradient = watch("gradient") || GRADIENTS[0];
  const currentQuote = watch("quote") || "";

  // Reset or initialize values when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setSubmitError(null);
      if (initialData) {
        reset({
          author: initialData.author,
          role: initialData.role,
          company: initialData.company || "",
          quote: initialData.quote,
          rating: initialData.rating || 5,
          avatar: initialData.avatar || "",
          initials: initialData.initials || getInitials(initialData.author),
          gradient: initialData.gradient || GRADIENTS[0],
          status: initialData.status,
          featured: initialData.featured,
          order: initialData.order || 0,
        });
      } else {
        reset({
          author: "",
          role: "",
          company: "",
          quote: "",
          rating: 5,
          avatar: "",
          initials: "",
          gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
          status: "published",
          featured: false,
          order: 0,
        });
      }
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload: TestimonialFormData = {
        ...data,
        initials: data.initials?.trim() || getInitials(data.author),
        rating: Number(data.rating),
        order: Number(data.order) || 0,
      };
      await onSubmit(payload);
      onClose();
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      const message = err instanceof Error ? err.message : "Failed to save testimonial";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewInitials = getInitials(currentAuthor);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-outline rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline pb-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-on-surface">
              {isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {isEditMode
                ? "Update client endorsement details, rating, and showcase status."
                : "Create a verified client testimonial for public social proof."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-outline/20 hover:bg-outline text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-semibold">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Author & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Client / Author Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("author")}
                placeholder="e.g. Rajesh Mehta"
                className={`w-full bg-white border ${
                  errors.author ? "border-red-500" : "border-outline focus:border-accent"
                } rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none transition-colors`}
              />
              {errors.author && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.author.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Role / Title <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("role")}
                placeholder="e.g. CEO & Managing Director"
                className={`w-full bg-white border ${
                  errors.role ? "border-red-500" : "border-outline focus:border-accent"
                } rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none transition-colors`}
              />
              {errors.role && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.role.message}</p>
              )}
            </div>
          </div>

          {/* Company & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Company / Organization
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                {...register("company")}
                placeholder="e.g. Vapi Industrial Group"
                className="w-full bg-white border border-outline focus:border-accent rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-2 h-[42px] px-3 bg-white border border-outline rounded-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star, { shouldValidate: true })}
                    className="cursor-pointer focus:outline-none transition-transform hover:scale-110"
                    title={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= currentRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-on-surface">
                  {currentRating}.0 / 5.0
                </span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                Testimonial Quote <span className="text-accent">*</span>
              </label>
              <span className="text-[11px] text-on-surface-variant font-mono">
                {currentQuote.length} / 1000
              </span>
            </div>
            <textarea
              disabled={isSubmitting}
              rows={4}
              {...register("quote")}
              placeholder="What did the client say about working with Craftly Studio? Highlight the impact and results..."
              className={`w-full bg-white border ${
                errors.quote ? "border-red-500" : "border-outline focus:border-accent"
              } rounded-xl p-3.5 text-sm text-on-surface focus:outline-none transition-colors leading-relaxed`}
            />
            {errors.quote && (
              <p className="mt-1 text-xs text-red-500 font-medium">{errors.quote.message}</p>
            )}
          </div>

          {/* Avatar and Visual styling preview */}
          <div className="bg-white border border-outline rounded-2xl p-4 space-y-4">
            <span className="block text-xs font-extrabold uppercase tracking-wider text-on-surface-variant">
              Visual Presentation &amp; Avatar
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Live Avatar Preview */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-outline overflow-hidden relative flex items-center justify-center shrink-0 bg-neutral-100 shadow-sm">
                  {currentAvatar ? (
                    <Image
                      src={currentAvatar}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-br ${currentGradient} flex items-center justify-center text-white font-extrabold text-base`}
                    >
                      {previewInitials}
                    </div>
                  )}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-on-surface">
                    {currentAuthor || "Client Preview"}
                  </p>
                  <p className="text-on-surface-variant text-[11px]">
                    {currentAvatar ? "Photo URL active" : "Initials fallback gradient"}
                  </p>
                </div>
              </div>

              {/* Avatar Image URL input */}
              <div className="flex-1">
                <input
                  type="url"
                  disabled={isSubmitting}
                  {...register("avatar")}
                  placeholder="https://images.example.com/client.jpg (optional)"
                  className="w-full bg-surface border border-outline focus:border-accent rounded-xl px-3.5 py-2 text-xs text-on-surface focus:outline-none transition-colors"
                />
                {errors.avatar && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.avatar.message}</p>
                )}
              </div>
            </div>

            {/* Gradient Selector (for initials fallback) */}
            <div>
              <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Fallback Gradient (When photo is absent)
              </label>
              <div className="flex flex-wrap gap-2">
                {GRADIENTS.map((grad) => (
                  <button
                    key={grad}
                    type="button"
                    onClick={() => setValue("gradient", grad, { shouldValidate: true })}
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${grad} transition-all cursor-pointer flex items-center justify-center shadow-sm ${
                      currentGradient === grad
                        ? "ring-2 ring-accent ring-offset-2 scale-110"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    title={grad}
                  >
                    {currentGradient === grad && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Publishing Controls: Status, Featured, Order */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Publication Status
              </label>
              <select
                disabled={isSubmitting}
                {...register("status")}
                className="w-full bg-white border border-outline focus:border-accent rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="published">Published</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                disabled={isSubmitting}
                {...register("order", { valueAsNumber: true })}
                placeholder="0"
                className="w-full bg-white border border-outline focus:border-accent rounded-xl px-3 py-2 text-xs text-on-surface focus:outline-none"
              />
            </div>

            <div className="flex items-center sm:pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={isSubmitting}
                  {...register("featured")}
                  className="w-4 h-4 rounded text-accent focus:ring-accent border-outline cursor-pointer accent-accent"
                />
                <span className="text-xs font-bold text-on-surface">
                  Feature on Homepage
                </span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-outline">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-outline text-xs font-bold text-on-surface hover:bg-outline/20 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-accent/90 transition-all shadow-md shadow-accent/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isEditMode ? "Save Changes" : "Create Testimonial"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
