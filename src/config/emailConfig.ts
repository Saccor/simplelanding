// Email configuration
export const EMAIL_SUBMISSION_ENABLED = true;

// Formspree endpoint - replace YOUR_FORM_ID with your actual Formspree form ID
// Create yours at: https://formspree.io/forms/
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnndjbrr';

// MailerLite configuration
// Get your API key from MailerLite dashboard -> Integrations -> Developer API
export const MAILERLITE_API_KEY = 'YOUR_API_KEY_HERE';

// Get your group ID from MailerLite dashboard -> Subscribers -> Groups
export const MAILERLITE_GROUP_ID = 'YOUR_GROUP_ID_HERE';

// MailerLite API endpoint for subscribers
export const MAILERLITE_ENDPOINT = 'https://connect.mailerlite.com/api/subscribers';

// Internal API endpoint for our Next.js API route
export const INTERNAL_SUBSCRIBE_ENDPOINT = '/api/subscribe';

// Switch between services by changing this line
// To use Formspree: export const EMAIL_SIGNUP_ENDPOINT = FORMSPREE_ENDPOINT;
// To use MailerLite directly: export const EMAIL_SIGNUP_ENDPOINT = MAILERLITE_ENDPOINT;
// To use our internal API: export const EMAIL_SIGNUP_ENDPOINT = INTERNAL_SUBSCRIBE_ENDPOINT;
export const EMAIL_SIGNUP_ENDPOINT = INTERNAL_SUBSCRIBE_ENDPOINT; 