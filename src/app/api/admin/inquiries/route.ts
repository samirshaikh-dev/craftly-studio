import { NextResponse } from "next/server";
import { getLeads } from "@/lib/firebase/lead/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: unknown) {
    console.error("Error fetching inquiries:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch inquiries";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
