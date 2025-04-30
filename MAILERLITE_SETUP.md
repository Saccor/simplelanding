# MailerLite Integration Setup

This project uses MailerLite for handling email signups through a serverless API route.

## Setup Steps

### 1. Create a MailerLite Account

- Sign up at [MailerLite](https://www.mailerlite.com)
- Confirm your email and complete the account setup

### 2. Create a Subscriber Group

- Go to **Subscribers** > **Groups** in the MailerLite dashboard
- Click **Create Group**
- Name your group something like "Website Signups"
- Copy the Group ID from the URL or from group settings (you'll need this later)

### 3. Generate an API Key

- Go to **Integrations** > **Developer API** in the MailerLite dashboard
- Click **Generate New Token**
- Give it a name (e.g., "Website Integration")
- Copy the API key (you'll only see this once)

### 4. Configure Environment Variables

- Add your API key and Group ID to the `.env.local` file:
  ```
  MAILERLITE_API_KEY=your_api_key_here
  MAILERLITE_GROUP_ID=your_group_id_here
  ```
- For production, add these same variables to your hosting platform's environment settings

### 5. Switch to Using the API Route

- Open `src/config/emailConfig.ts`
- Change the `EMAIL_SIGNUP_ENDPOINT` to use the internal API:
  ```javascript
  export const EMAIL_SIGNUP_ENDPOINT = INTERNAL_SUBSCRIBE_ENDPOINT;
  ```

## Testing Your Integration

1. Start your development server with `npm run dev`
2. Fill out and submit the email form on your site
3. Check the browser console and network tab for successful API responses
4. Verify that the subscriber appears in your MailerLite dashboard

## Troubleshooting

- **API Key Issues**: Ensure your API key is correctly copied and has proper permissions
- **CORS Errors**: The internal API route handles this automatically
- **Missing Subscribers**: Check that the Group ID is correct and that the API key has permission to add subscribers
- **Server Errors**: Check the server logs for details about any failures

## Additional Features

Once set up, you can use MailerLite's features:

- **Email Campaigns**: Send newsletters to your subscribers
- **Automation**: Create welcome emails and drip campaigns
- **Analytics**: Track email opens, clicks, and engagement
- **Segmentation**: Group subscribers based on behavior or preferences 