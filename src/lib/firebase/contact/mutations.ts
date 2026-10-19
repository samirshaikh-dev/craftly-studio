import { z } from "zod";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendContactEmails } from "@/lib/mail";
import { contactFormSchema } from "@/utils/validation";

type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Persists a contact form submission to Firestore (via Admin SDK so it runs
 * correctly in server-side API routes) and dispatches notification emails as
 * a non-fatal side effect.
 *
 * The Firestore write is the source of truth. Email failure does NOT roll back
 * or prevent a successful response.
 */
export async function createContactSubmission(data: ContactFormData): Promise<string> {
  const { firstName, lastName, email, phone, company, projectType, priorityLevel, budgetRange, timeline, message } = data;
  const name = `${firstName} ${lastName}`.trim();

  console.log("[contact-mutations] Validated contact submission received");

  const leadData = {
    name,
    email,
    phone: phone || "",
    company: company || "",
    projectType: projectType || "",
    priorityLevel: priorityLevel || "Medium Priority",
    budgetRange: budgetRange || "",
    timeline: timeline || "",
    message,
    source: "contact_form",
    status: "new",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  // --- Firestore write (critical — must succeed) ---
  console.log("[contact-mutations] Storing lead in Firestore leads collection...");
  const docRef = await adminDb.collection("leads").add(leadData);
  console.log("[contact-mutations] Lead stored successfully. ID:", docRef.id);

  // --- Email dispatch (non-critical — failure is logged but does not throw) ---
  console.log("[contact-mutations] Dispatching contact emails...");
  try {
    await sendContactEmails({
      name,
      email,
      phone,
      company,
      projectType,
      priorityLevel,
      budgetRange,
      timeline,
      message,
    });
    console.log("[contact-mutations] Emails dispatched successfully.");
  } catch (emailError) {
    console.error(
      "[contact-mutations] Non-fatal: email dispatch failed after successful Firestore write.",
      emailError instanceof Error ? emailError.message : emailError
    );
  }

  return docRef.id;
}
