# MailerLite Integration Setup Guide

This guide will help you set up and configure the MailerLite integration for your React application. You have two options for integrating MailerLite: using their API directly or using their embedded form solution.

## Prerequisites

1. A MailerLite account (you can sign up for a free plan at [MailerLite.com](https://www.mailerlite.com/))
2. API key from your MailerLite account (for API integration)
3. Form ID and Account ID (for embedded form integration)

## Step 1: Choose Your Integration Method

There are two ways to integrate MailerLite with your application:

### Option 1: Direct API Integration 
- Uses our custom form UI
- Submits data directly to MailerLite's API
- Gives you more control over the form's look and behavior
- Requires an API key

### Option 2: Embedded Form Integration
- Uses MailerLite's pre-built forms
- May provide additional features like double opt-in and spam protection
- Less customizable but easier to set up
- Requires your MailerLite account ID and form ID

## Step 2: Get Your MailerLite Credentials

### For API Integration:

1. Log in to your MailerLite account
2. Go to **Integrations** > **MailerLite API** 
3. Generate a new API token or use an existing one
4. Copy the API key

Additionally, you might want to create a group to organize your subscribers:
1. Go to **Subscribers** > **Groups**
2. Create a new group (e.g., "Website Signups")
3. Copy the Group ID from the URL when viewing the group (it will look like `12345678`)

### For Embedded Form Integration:

1. Log in to your MailerLite account
2. Go to **Forms** > **Embedded Forms**
3. Create a new form or select an existing one
4. Click on **Get Embed Code**
5. From the code snippet, extract these values:
   - **Account ID**: Found in the `ml('account', 'YOUR_ACCOUNT_ID')` line
   - **Form ID**: Found in the `<div class="ml-embedded" data-form="YOUR_FORM_ID"></div>` line

## Step 3: Configure Your Application

### Update the Configuration Values

1. Open `src/services/mailerLite.ts` and set your API key:
   ```typescript
   const MAILERLITE_API_KEY = 'your_mailerlite_api_key';
   const MAILERLITE_GROUP_ID = 'your_group_id'; // Optional
   ```

2. Open `src/components/EmailSection.tsx` and set your credentials:
   ```typescript
   // Change to true to use embedded form, false to use API
   const USE_EMBEDDED_FORM = false; 
   
   // Replace with your actual values
   const MAILERLITE_ACCOUNT_ID = 'your_account_id';
   const MAILERLITE_FORM_ID = 'your_form_id';
   ```

## Step 4: Testing Your Integration

### Testing API Integration

1. Fill in the email form and submit
2. Check the browser console for confirmation messages
3. Log in to your MailerLite account and verify the subscriber was added
4. Check for any error messages in the console

### Testing Embedded Form Integration

1. Make sure `USE_EMBEDDED_FORM` is set to `true`
2. Refresh your page and verify the form loads correctly
3. Submit the form and verify it works as expected
4. Check your MailerLite dashboard to see if subscribers are being added

## Troubleshooting

### Common API Integration Issues

- **API Key Invalid**: Ensure your API key is correct and has not expired
- **Rate Limiting**: MailerLite has a rate limit of 120 requests per minute
- **CORS Issues**: Make sure your domain is authorized in MailerLite settings

### Common Embedded Form Issues

- **Form Not Appearing**: Check that your account ID and form ID are correct
- **Script Loading Error**: Ensure the MailerLiteScripts component is included
- **Styling Conflicts**: The embedded form might have styling conflicts with your site

## MailerLite Free Plan Features

MailerLite's free plan includes:
- Up to 1,000 subscribers
- 12,000 emails per month
- Built-in form hosting
- Automation capabilities
- Email templates
- Pop-ups and landing pages

For more information, check the [MailerLite pricing page](https://www.mailerlite.com/pricing).

## Additional Resources

- [MailerLite API Documentation](https://developers.mailerlite.com/docs/)
- [MailerLite Node.js SDK](https://www.npmjs.com/package/mailerlite-api-v2-node)
- [MailerLite Knowledge Base](https://www.mailerlite.com/help)

## Support

If you encounter any issues with the integration, please contact:
- MailerLite Support: [Contact MailerLite](https://www.mailerlite.com/contact-us)
- Your development team for application-specific issues 