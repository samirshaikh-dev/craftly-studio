import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/firebase/testimonial/queries";
import { createTestimonial } from "@/lib/firebase/testimonial/mutations";
import { testimonialSchema } from "@/utils/validation";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = statusParam === "draft" || statusParam === "published" ? statusParam : undefined;
    const featuredOnly = searchParams.get("featured") === "true";

    const testimonials = await getTestimonials(status, featuredOnly);
    return NextResponse.json({ success: true, testimonials });
  } catch (error: unknown) {
    console.error("Error fetching testimonials:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch testimonials";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = testimonialSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const id = await createTestimonial(validated.data);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating testimonial:", error);
    const message = error instanceof Error ? error.message : "Failed to create testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
