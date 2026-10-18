export function getAdminEmailTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  priorityLevel?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
}): string {
  // Escape message HTML to avoid XSS injections in email client
  const escapedMessage = data.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br />");

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Inquiry</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f9fafb;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #0f172a;
      padding: 32px;
      text-align: center;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      text-decoration: none;
      letter-spacing: -0.025em;
    }
    .logo-accent {
      color: #ff6b3d;
    }
    .content {
      padding: 32px;
    }
    h1 {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 24px;
    }
    p {
      font-size: 16px;
      line-height: 24px;
      color: #4b5563;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
    }
    .details-table th, .details-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #f3f4f6;
      font-size: 15px;
    }
    .details-table th {
      color: #4b5563;
      font-weight: 600;
      width: 130px;
    }
    .details-table td {
      color: #0f172a;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      background-color: #ffedd5;
      color: #c2410c;
    }
    .message-box {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-top: 24px;
      color: #1f2937;
      font-size: 15px;
      line-height: 24px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 12px;
      color: #9ca3af;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">
          Craftly<span class="logo-accent">Studio</span>
        </div>
      </div>
      <div class="content">
        <h1>New Project Inquiry</h1>
        <p>A new lead has been submitted through the contact form on your website:</p>
        
        <table class="details-table">
          <tr>
            <th>Name</th>
            <td>${data.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td><a href="mailto:${data.email}" style="color: #ff6b3d; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>${data.phone || '<span style="color: #9ca3af; font-style: italic;">Not provided</span>'}</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>${data.company || '<span style="color: #9ca3af; font-style: italic;">Not provided</span>'}</td>
          </tr>
          <tr>
            <th>Project Type</th>
            <td>${data.projectType || '<span style="color: #9ca3af; font-style: italic;">Not specified</span>'}</td>
          </tr>
          <tr>
            <th>Priority</th>
            <td><span class="badge">${data.priorityLevel || 'Medium Priority'}</span></td>
          </tr>
          <tr>
            <th>Budget Range</th>
            <td>${data.budgetRange || '<span style="color: #9ca3af; font-style: italic;">Not specified</span>'}</td>
          </tr>
          <tr>
            <th>Timeline</th>
            <td>${data.timeline || '<span style="color: #9ca3af; font-style: italic;">Not specified</span>'}</td>
          </tr>
          <tr>
            <th>Submitted At</th>
            <td>${formattedDate}</td>
          </tr>
        </table>
        
        <p style="font-weight: 600; color: #0f172a; margin-bottom: 8px; margin-top: 28px;">Project Details:</p>
        <div class="message-box">
          ${escapedMessage}
        </div>
      </div>
      <div class="footer">
        <p class="footer-text">This lead was automatically generated by the Craftly Studio Website CMS integration.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
