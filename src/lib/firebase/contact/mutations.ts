import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendContactEmails } from "@/lib/mail";
import { contactFormSchema } from "@/utils/validation";

type ContactFormData = z.infer<typeof contactFormSchema>;

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
    createdAt: serverTimestamp(),
  };

  console.log("[contact-mutations] Storing lead in Firestore leads collection...");

  let docRef;
  try {
    const dbPromise = addDoc(collection(db, "leads"), leadData);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore database write timed out")), 4000)
    );
    docRef = await Promise.race([dbPromise, timeoutPromise]);
    console.log("[contact-mutations] Lead stored in Firestore successfully.");
  } catch (dbError) {
    console.error(
      "[contact-mutations] Warning: Firestore database write failed or timed out. Proceeding to email dispatch.",
      dbError instanceof Error ? dbError.message : dbError
    );
  }

  console.log("[contact-mutations] Dispatching contact emails...");
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
  console.log("[contact-mutations] Emails sent successfully.");

  return docRef?.id || "pending";
}
