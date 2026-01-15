# AWS Lambda + SES Contact Form Setup

This guide will walk you through setting up the contact form backend using AWS Lambda and SES.

## Prerequisites

- AWS Account
- AWS CLI configured (optional but helpful)
- Domain/email verified in AWS SES

## Step 1: Verify Email in AWS SES

Before you can send emails, you need to verify your sender email address in SES.

### Using AWS Console:

1. Go to **AWS SES Console** → https://console.aws.amazon.com/ses/
2. Select your region (e.g., `eu-west-2` for London)
3. Click **Verified identities** → **Create identity**
4. Choose **Email address**
5. Enter `hello@charlieallen.dev` (or your preferred sender email)
6. Click **Create identity**
7. Check your inbox for the verification email and click the link

**Note:** If you're in SES Sandbox mode (default for new accounts), you can only send emails to verified addresses. To send to any email, you need to request production access (SES → Account dashboard → Request production access).

### Alternative: Verify Your Domain (Recommended for Production)

Instead of verifying individual emails, verify your entire domain:
1. Choose **Domain** instead of Email address
2. Enter `charlieallen.dev`
3. Add the provided DNS records to your domain registrar
4. Wait for verification (can take up to 72 hours)

## Step 2: Create IAM Role for Lambda

1. Go to **IAM Console** → **Roles** → **Create role**
2. Select **AWS service** → **Lambda**
3. Add permissions:
   - **AmazonSESFullAccess** (or create a custom policy with just `ses:SendEmail`)
   - **AWSLambdaBasicExecutionRole** (for CloudWatch logs)
4. Name the role: `lambda-contact-form-role`
5. Click **Create role**

### Custom Policy (More Secure - Recommended):

Instead of `AmazonSESFullAccess`, create a custom policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

## Step 3: Create Lambda Function

1. Go to **Lambda Console** → **Create function**
2. Choose **Author from scratch**
3. Function name: `contact-form-handler`
4. Runtime: **Node.js 20.x** (or latest)
5. Architecture: **x86_64**
6. Execution role: **Use an existing role** → Select `lambda-contact-form-role`
7. Click **Create function**

### Upload Function Code:

1. In the Lambda console, scroll to **Code source**
2. Click **Upload from** → **.zip file** or paste the code directly
3. Copy the contents of `lambda/contact-form.js`
4. Click **Deploy**

### Configure Environment Variables:

1. Go to **Configuration** → **Environment variables**
2. Add the following:
   - `AWS_REGION`: `eu-west-2` (or your region)
   - `SENDER_EMAIL`: `hello@charlieallen.dev` (must be verified in SES)
   - `RECIPIENT_EMAIL`: `hello@charlieallen.dev` (where you want to receive messages)
   - `ALLOWED_ORIGIN`: `https://charlieallen.dev` (your website URL)

### Configure Timeout:

1. Go to **Configuration** → **General configuration** → **Edit**
2. Set **Timeout** to **10 seconds** (default 3 seconds may be too short)
3. Save

## Step 4: Create API Gateway

1. Go to **API Gateway Console** → **Create API**
2. Choose **HTTP API** → **Build**
3. Click **Add integration** → **Lambda**
4. Select your region and Lambda function: `contact-form-handler`
5. API name: `contact-form-api`
6. Click **Next**

### Configure Routes:

1. Method: **POST**
2. Resource path: `/contact`
3. Integration target: Your Lambda function
4. Click **Next**

### Configure CORS:

1. Click **Configure CORS**
2. Access-Control-Allow-Origin: `https://charlieallen.dev`
3. Access-Control-Allow-Headers: `content-type`
4. Access-Control-Allow-Methods: `POST, OPTIONS`
5. Click **Next** → **Create**

### Get Your API Endpoint:

1. After creation, copy the **Invoke URL** (e.g., `https://abc123.execute-api.eu-west-2.amazonaws.com`)
2. Your full endpoint will be: `https://abc123.execute-api.eu-west-2.amazonaws.com/contact`

## Step 5: Add Environment Variable to Your Site

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_CONTACT_API_URL=https://abc123.execute-api.eu-west-2.amazonaws.com/contact
```

**Important:** Replace with your actual API Gateway URL.

For production deployment, add this environment variable to your AWS hosting configuration (e.g., in your deployment script or S3/CloudFront setup).

## Step 6: Deploy Lambda Dependencies

The Lambda function uses `@aws-sdk/client-ses`. You need to package this dependency:

### Option 1: Lambda Layer (Recommended)

1. Create a directory structure:
   ```bash
   mkdir -p nodejs
   cd nodejs
   npm init -y
   npm install @aws-sdk/client-ses
   cd ..
   zip -r layer.zip nodejs
   ```

2. In Lambda Console → **Layers** → **Create layer**
3. Name: `ses-client-layer`
4. Upload `layer.zip`
5. Compatible runtimes: Node.js 20.x
6. Click **Create**

7. Go back to your Lambda function → **Configuration** → **Layers** → **Add a layer**
8. Choose **Custom layers** → Select your layer → **Add**

### Option 2: Package with Function Code

```bash
cd lambda
npm init -y
npm install @aws-sdk/client-ses
zip -r function.zip .
```

Upload `function.zip` to Lambda instead of just the `.js` file.

## Step 7: Test the Setup

### Test Lambda Directly:

1. In Lambda console, click **Test** → **Create new event**
2. Event name: `test-contact-form`
3. Use this test payload:

```json
{
  "httpMethod": "POST",
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"This is a test message\"}"
}
```

4. Click **Test**
5. Check the execution results - you should receive an email

### Test via API Gateway:

```bash
curl -X POST https://your-api-gateway-url/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"This is a test message"}'
```

### Test from Your Website:

1. Build and deploy your site
2. Fill out the contact form
3. Submit and check for success message
4. Verify email arrives in your inbox

## Troubleshooting

### "Email address is not verified"
- Make sure you verified the sender email in SES
- Check you're in the correct AWS region
- If in sandbox mode, recipient must also be verified

### "CORS error" in browser
- Check CORS configuration in API Gateway
- Verify `ALLOWED_ORIGIN` matches your website URL exactly
- Ensure it includes `https://` and no trailing slash

### Lambda timeout
- Increase timeout in Lambda Configuration → General configuration
- Check CloudWatch logs for specific errors

### No email received
- Check CloudWatch logs: Lambda Console → Monitor → View logs in CloudWatch
- Verify SES sending statistics: SES Console → Account dashboard
- Check spam folder

## Production Checklist

Before going live:

- [ ] Request SES production access (removes sandbox limitations)
- [ ] Verify your domain (not just email) in SES
- [ ] Set up SPF, DKIM, and DMARC records for better deliverability
- [ ] Enable CloudWatch alarms for Lambda errors
- [ ] Set up SES bounce and complaint notifications
- [ ] Consider adding rate limiting to prevent spam
- [ ] Test form submission from production domain

## Cost Estimate

For a personal portfolio site:

- **AWS SES**: $0.10 per 1,000 emails (62,000 free/month if sending from Lambda)
- **Lambda**: Free tier covers 1M requests/month
- **API Gateway**: Free tier covers 1M API calls/month

**Expected monthly cost: $0** (well within free tier limits)

## Next Steps

- Consider adding honeypot field to prevent spam
- Add reCAPTCHA for additional protection
- Set up email templates in SES for consistent formatting
- Monitor deliverability in SES reputation dashboard
