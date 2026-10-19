import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { TestimonialFormData } from "@/types/testimonial";
import { getInitials, getRandomGradient } from "./utils";

const COLLECTION = "testimonials";

export async function createTestimonial(data: TestimonialFormData): Promise<string> {
  const initials = data.initials?.trim() || getInitials(data.author);
  const gradient = data.gradient?.trim() || getRandomGradient();
  const now = serverTimestamp();

  const docRef = await addDoc(collection(db, COLLECTION), {
    author: data.author.trim(),
    role: data.role.trim(),
    company: data.company?.trim() || "",
    quote: data.quote.trim(),
    rating: Number(data.rating) || 5,
    avatar: data.avatar?.trim() || "",
    initials,
    gradient,
    status: data.status || "published",
    featured: Boolean(data.featured),
    order: Number(data.order) || 0,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
}

export async function updateTestimonial(
  id: string,
  data: Partial<TestimonialFormData>
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const updatePayload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (data.author !== undefined) {
    updatePayload.author = data.author.trim();
    if (!data.initials) {
      updatePayload.initials = getInitials(data.author);
    }
  }
  if (data.role !== undefined) updatePayload.role = data.role.trim();
  if (data.company !== undefined) updatePayload.company = data.company.trim();
  if (data.quote !== undefined) updatePayload.quote = data.quote.trim();
  if (data.rating !== undefined) updatePayload.rating = Number(data.rating);
  if (data.avatar !== undefined) updatePayload.avatar = data.avatar.trim();
  if (data.initials !== undefined) updatePayload.initials = data.initials.trim();
  if (data.gradient !== undefined) updatePayload.gradient = data.gradient.trim();
  if (data.status !== undefined) updatePayload.status = data.status;
  if (data.featured !== undefined) updatePayload.featured = Boolean(data.featured);
  if (data.order !== undefined) updatePayload.order = Number(data.order);

  await updateDoc(docRef, updatePayload);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function toggleTestimonialStatus(
  id: string,
  currentStatus: "draft" | "published"
): Promise<"draft" | "published"> {
  const nextStatus: "draft" | "published" = currentStatus === "published" ? "draft" : "published";
  await updateTestimonial(id, { status: nextStatus });
  return nextStatus;
}

export async function toggleTestimonialFeatured(
  id: string,
  currentFeatured: boolean
): Promise<boolean> {
  const nextFeatured = !currentFeatured;
  await updateTestimonial(id, { featured: nextFeatured });
  return nextFeatured;
}
