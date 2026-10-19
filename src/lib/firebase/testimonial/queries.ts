import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Testimonial } from "@/types/testimonial";

const COLLECTION = "testimonials";

export async function getTestimonials(
  status?: "draft" | "published",
  featuredOnly?: boolean
): Promise<Testimonial[]> {
  try {
    const colRef = collection(db, COLLECTION);
    let q;

    if (status && featuredOnly) {
      q = query(
        colRef,
        where("status", "==", status),
        where("featured", "==", true),
        orderBy("order", "asc")
      );
    } else if (status) {
      q = query(
        colRef,
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );
    } else if (featuredOnly) {
      q = query(
        colRef,
        where("featured", "==", true),
        orderBy("order", "asc")
      );
    } else {
      q = query(colRef, orderBy("createdAt", "desc"));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
  } catch (error) {
    // Graceful fallback if compound index is pending in Firestore
    console.warn("Compound Firestore query failed, falling back to simple scan:", error);
    const snapshot = await getDocs(collection(db, COLLECTION));
    let items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial));
    if (status) {
      items = items.filter((item) => item.status === status);
    }
    if (featuredOnly) {
      items = items.filter((item) => item.featured === true);
    }
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const docSnap = await getDoc(doc(db, COLLECTION, id));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Testimonial;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return getTestimonials("published", true);
}

export async function getTestimonialsCount(): Promise<{
  total: number;
  published: number;
  draft: number;
  featured: number;
}> {
  try {
    const colRef = collection(db, COLLECTION);
    const [totalSnap, pubSnap, draftSnap, featSnap] = await Promise.allSettled([
      getCountFromServer(colRef),
      getCountFromServer(query(colRef, where("status", "==", "published"))),
      getCountFromServer(query(colRef, where("status", "==", "draft"))),
      getCountFromServer(query(colRef, where("featured", "==", true))),
    ]);

    return {
      total: totalSnap.status === "fulfilled" ? totalSnap.value.data().count : 0,
      published: pubSnap.status === "fulfilled" ? pubSnap.value.data().count : 0,
      draft: draftSnap.status === "fulfilled" ? draftSnap.value.data().count : 0,
      featured: featSnap.status === "fulfilled" ? featSnap.value.data().count : 0,
    };
  } catch (err) {
    console.warn("Failed to get count from server, falling back to full list:", err);
    const list = await getTestimonials();
    return {
      total: list.length,
      published: list.filter((t) => t.status === "published").length,
      draft: list.filter((t) => t.status === "draft").length,
      featured: list.filter((t) => t.featured).length,
    };
  }
}
