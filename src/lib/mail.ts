import nodemailer from "nodemailer";
import { getUserEmailTemplate } from "@/emails/user-template";
import { getAdminEmailTemplate } from "@/emails/admin-template";
import { config } from "@/config/config";

const { smtpHost, smtpPort, smtpUser, smtpPass, contactEmail } = config.mailConfig;

const createTransporter = () => {
  // If SMTP environment variables are missing, fallback to logging
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.warn("SMTP environment variables are missing. Emails will not be sent, only logged to console.");
    return null;
  }
  
  console.log(`[createTransporter] Creating SMTP transporter for ${smtpHost}:${smtpPort} (user: ${smtpUser})...`);
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // True for port 465, false for 587 or other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents certificate verification hangs on some platforms
    },
    connectionTimeout: 10000, // 10 seconds connection timeout
    greetingTimeout: 10000,   // 10 seconds greeting timeout
    socketTimeout: 15000,     // 15 seconds socket idle timeout
  });
};

export async function sendContactEmails(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  priorityLevel?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
}) {
  const transporter = createTransporter();
  
  const adminHtml = getAdminEmailTemplate(data);
  const userHtml = getUserEmailTemplate(data.name, data.message);
  
  const adminText = `
New Project Inquiry from ${data.name}
  
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Project Type: ${data.projectType || 'Not specified'}
Priority: ${data.priorityLevel || 'Medium Priority'}
Budget: ${data.budgetRange || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}

Message:
${data.message}
  `.trim();

  const userText = `
Hi ${data.name},

Thank you for reaching out to Craftly Studio.

We've received your inquiry and appreciate you taking the time to contact us.

Our team will review your project requirements and get back to you within 24 hours.

Here's a copy of your message:
-------------------------------------
${data.message}
-------------------------------------

If your request is urgent, feel free to reply directly to this email.

Best regards,
Craftly Studio Team
  `.trim();

  if (!transporter) {
    console.log("=== MOCK EMAIL SERVICE (SMTP_HOST / USER / PASS missing) ===");
    console.log(`[Admin Notification] Sending to: ${contactEmail}`);
    console.log(`Subject: New Project Inquiry from ${data.name}`);
    console.log(`Body:\n${adminText}`);
    console.log("-----------------------------------------");
    console.log(`[User Auto-Reply] Sending to: ${data.email}`);
    console.log(`Subject: Thank you for reaching out to Craftly Studio 🚀`);
    console.log(`Body:\n${userText}`);
    console.log("===========================================================");
    return { success: false, error: "SMTP settings not configured" };
  }

  try {
    console.log(`[sendContactEmails] Dispatching admin notification email to: ${contactEmail}...`);
    // 1. Send admin notification
    await transporter.sendMail({
      from: `"Craftly Studio Contact" <${smtpUser}>`,
      to: contactEmail,
      subject: `New Project Inquiry from ${data.name}`,
      text: adminText,
      html: adminHtml,
      replyTo: data.email, // Allows admin to click "Reply" to respond directly to the user
    });
    console.log("[sendContactEmails] Admin notification email sent successfully.");

    console.log(`[sendContactEmails] Dispatching user auto-reply email to: ${data.email}...`);
    // 2. Send user auto-reply
    await transporter.sendMail({
      from: `"Craftly Studio" <${smtpUser}>`,
      to: data.email,
      subject: `Thank you for reaching out to Craftly Studio 🚀`,
      text: userText,
      html: userHtml,
    });
    console.log("[sendContactEmails] User auto-reply email sent successfully.");

    return { success: true };
  } catch (error) {
    console.error("[sendContactEmails] Nodemailer error: Failed to send emails", error);
    throw error;
  }
}
