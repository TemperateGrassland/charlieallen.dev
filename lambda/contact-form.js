// Lambda function for handling contact form submissions via AWS SES
// This function receives form data, validates it, and sends an email using AWS SES

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "eu-west-2" });

// CORS headers for API Gateway
const headers = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "https://charlieallen.dev",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event) => {
  // Extract HTTP method (supports both HTTP API v2.0 and REST API formats)
  const httpMethod = event.requestContext?.http?.method || event.httpMethod;

  // Handle preflight OPTIONS request
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse the request body (handle base64 encoding for HTTP API v2.0)
    let bodyString = event.body;
    if (event.isBase64Encoded) {
      bodyString = Buffer.from(event.body, 'base64').toString('utf-8');
    }
    const body = JSON.parse(bodyString);
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Validate field lengths (prevent abuse)
    if (name.length > 100) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Name is too long (max 100 characters)" }),
      };
    }

    if (message.length > 5000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Message is too long (max 5000 characters)" }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid email address" }),
      };
    }

    // Helper function to escape HTML (prevents HTML injection in emails)
    const escapeHtml = (text) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    // Prepare email parameters
    const params = {
      Source: process.env.SENDER_EMAIL, // Must be verified in SES
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL || "hello@charlieallen.dev"],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
        },
        Body: {
          Text: {
            Data: `
You have received a new message from your website contact form:

Name: ${name}
Email: ${email}

Message:
${message}

---
This email was sent from your portfolio website contact form.
            `.trim(),
          },
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .content { background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${escapeHtml(name)}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      </div>
    </div>
    <div class="footer">
      This email was sent from your portfolio website contact form.
    </div>
  </div>
</body>
</html>
            `.trim(),
          },
        },
      },
      ReplyToAddresses: [email], // Allow easy reply to sender
    };

    // Send email via SES
    const command = new SendEmailCommand(params);
    await ses.send(command);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Message sent successfully"
      }),
    };

  } catch (error) {
    console.error("Error sending email:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to send message",
        details: error.message
      }),
    };
  }
};
