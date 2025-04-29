# MailerLite Integration Setup

This document provides instructions for setting up the MailerLite integration in your application.

## Current Implementation Status

✅ All components needed for MailerLite integration have been created:
- `MailerLiteForm.tsx` - Component for embedding MailerLite forms
- `MailerLiteScripts.tsx` - Component for loading MailerLite scripts
- `MailerLiteHeadScript.tsx` - Component for adding scripts to the document head
- `EmailSection.tsx` - Section component that displays the email subscription form
- `mailerLite.ts` - Service for interacting with the MailerLite API
- `config/mailerLite.ts` - Configuration file for MailerLite credentials

## Configuration

To set up MailerLite, you need to add your credentials to the environment variables:

1. Create or update a `.env.local` file in the root of your project with the following variables:

```
# For direct API integration
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=your_group_id_here

# For embedded form integration (visible from browser)
NEXT_PUBLIC_MAILERLITE_ACCOUNT_ID=your_account_id_here
NEXT_PUBLIC_MAILERLITE_FORM_ID=your_form_id_here
```

2. Choose which integration method to use by updating `src/config/mailerLite.ts`:
   - Set `USE_EMBEDDED_FORM = true` to use the embedded form method
   - Set `USE_EMBEDDED_FORM = false` to use the direct API method

## How It Works

### Embedded Form Method

This method uses MailerLite's embed forms feature:

1. The `MailerLiteHeadScript` component loads the MailerLite universal script in the document head.
2. The `MailerLiteForm` component creates the form container where the embedded form will be rendered.
3. When the page loads, MailerLite's script initializes and renders the form.

### Direct API Method

This method uses our custom form UI and sends data directly to MailerLite's API:

1. The `EmailSection` component renders a custom form UI.
2. When the form is submitted, the `addSubscriber` function from `mailerLite.ts` service is called.
3. The service makes a direct API request to MailerLite to add the subscriber.

## Testing Your Setup

1. Make sure your environment variables are properly set
2. Run your application
3. Navigate to the page with the EmailSection component
4. Submit the form with a test email address
5. Check your MailerLite account to verify that the subscriber was added

## Troubleshooting

If the embedded form is not appearing:
- Check that you've set the correct Account ID and Form ID
- Make sure the MailerLiteHeadScript component is included in the layout
- Check browser console for any JavaScript errors

If API submissions are failing:
- Verify your API key is correct and has the necessary permissions
- Check browser console for error messages
- Ensure your domain is authorized in MailerLite settings if experiencing CORS issues 