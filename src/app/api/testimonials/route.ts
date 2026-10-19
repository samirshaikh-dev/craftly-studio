import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/firebase/testimonial/queries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";

    const testimonials = await getTestimonials("published", featuredOnly);
    return NextResponse.json({ success: true, testimonials });
  } catch (error: unknown) {
    console.error("Error fetching public testimonials:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch testimonials";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
