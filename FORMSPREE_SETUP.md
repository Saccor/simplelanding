# Formspree Integration Setup

This project uses [Formspree](https://formspree.io/) for handling email submissions. Formspree is a simple form backend service that allows you to set up form handling without any server-side code.

## Setup Instructions

1. Create a free account at [Formspree](https://formspree.io/register)

2. Create a new form:
   - Log in to your Formspree account
   - Click "New Form"
   - Enter a name for your form (e.g., "Arfve Email Signup")
   - Select the plan you want to use (Free plan allows 50 submissions per month)
   - Click "Create Form"

3. Get your form endpoint:
   - After creating the form, you'll see an endpoint URL like `https://formspree.io/f/xayzabcd`
   - Copy this URL

4. Update your project:
   - Open `src/config/emailConfig.ts`
   - Replace `YOUR_FORM_ID` in the `FORMSPREE_ENDPOINT` with the ID from your endpoint
   - Example: Change `https://formspree.io/f/YOUR_FORM_ID` to `https://formspree.io/f/xayzabcd`

## Features

Formspree provides several helpful features:

- Email notifications when someone submits the form
- Spam filtering
- Submission storage and export
- Webhook support for integrating with other services
- Custom thank you pages

## Testing

- To test your form, fill out and submit it on your site
- You should receive a confirmation in your Formspree dashboard
- You'll also receive an email notification at the address you used to sign up

## Customization

- You can customize email templates, redirects, and more from your Formspree dashboard
- For advanced functionality, consider upgrading to a paid plan

## Troubleshooting

If your form isn't working:

1. Check that the form endpoint in `emailConfig.ts` matches your Formspree form ID
2. Make sure your form includes an email field with `name="email"`
3. Check browser console for any JavaScript errors
4. Verify CORS settings in your Formspree dashboard if needed 