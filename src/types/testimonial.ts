export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  quote: string;
  rating: number; // 1 to 5
  avatar?: string;
  initials?: string;
  gradient?: string;
  status: "draft" | "published";
  featured: boolean;
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface TestimonialFormData {
  author: string;
  role: string;
  company?: string;
  quote: string;
  rating: number;
  avatar?: string;
  initials?: string;
  gradient?: string;
  status: "draft" | "published";
  featured: boolean;
  order: number;
}
