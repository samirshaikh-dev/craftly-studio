import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().trim().max(20, "Phone number is too long").optional().or(z.literal("")),
  company: z.string().trim().max(100, "Company name is too long").optional().or(z.literal("")),
  projectType: z.string().trim().max(100, "Project type is too long").optional().or(z.literal("")),
  priorityLevel: z.string().trim().min(1, "Please select a priority level"),
  budgetRange: z.string().trim().min(1, "Please select a budget range"),
  timeline: z.string().trim().min(1, "Please select a timeline"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  slug: z.string().trim().min(1, "Slug is required").max(200, "Slug is too long").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().trim().min(1, "Excerpt is required").max(500, "Excerpt is too long"),
  content: z.string().trim().min(10, "Content must be at least 10 characters"),
  coverImage: z.string().trim().url("Cover image must be a valid URL").or(z.literal("")),
  category: z.string().trim().min(1, "Category is required").max(100, "Category is too long"),
  tags: z.string().trim().max(200, "Tags string is too long"),
  author: z.string().trim().min(1, "Author is required").max(100, "Author name is too long"),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().trim().max(200, "SEO title is too long"),
  seoDescription: z.string().trim().max(500, "SEO description is too long"),
  seoKeywords: z.string().trim().max(300, "SEO keywords string is too long"),
});
