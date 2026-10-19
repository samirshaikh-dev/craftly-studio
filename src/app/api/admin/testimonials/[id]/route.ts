import { NextResponse } from "next/server";
import { getTestimonialById } from "@/lib/firebase/testimonial/queries";
import { updateTestimonial, deleteTestimonial } from "@/lib/firebase/testimonial/mutations";
import { testimonialSchema } from "@/utils/validation";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await getTestimonialById(id);
    if (!item) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, testimonial: item });
  } catch (error: unknown) {
    console.error("Error fetching testimonial:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const partialSchema = testimonialSchema.partial();
    const validated = partialSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await updateTestimonial(id, validated.data);
    return NextResponse.json({ success: true, message: "Testimonial updated" });
  } catch (error: unknown) {
    console.error("Error updating testimonial:", error);
    const message = error instanceof Error ? error.message : "Failed to update testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteTestimonial(id);
    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (error: unknown) {
    console.error("Error deleting testimonial:", error);
    const message = error instanceof Error ? error.message : "Failed to delete testimonial";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
