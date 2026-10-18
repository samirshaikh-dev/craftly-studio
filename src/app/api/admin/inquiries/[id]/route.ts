import { NextResponse } from "next/server";
import { updateLead, deleteLead, getLeadById } from "@/lib/firebase/lead/queries";
import { updateLeadSchema } from "@/utils/validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const existing = await getLeadById(id);
    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const body = await request.json();
    const validationResult = updateLeadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await updateLead(id, validationResult.data);
    return NextResponse.json({ success: true, message: "Inquiry updated successfully" });
  } catch (error: unknown) {
    console.error("Error updating inquiry:", error);
    const message = error instanceof Error ? error.message : "Failed to update inquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const existing = await getLeadById(id);
    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    await deleteLead(id);
    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting inquiry:", error);
    const message = error instanceof Error ? error.message : "Failed to delete inquiry";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
