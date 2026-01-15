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
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body);
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" }),
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
        <span class="label">Name:</span> ${name}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <p>${message.replace(/\n/g, '<br>')}</p>
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
